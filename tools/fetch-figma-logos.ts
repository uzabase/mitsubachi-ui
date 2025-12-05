import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";

if (!process.env.FIGMA_TOKEN) {
  throw new Error("FIGMA_TOKENが設定されていません");
}

if (!process.env.FIGMA_DESIGN_FILE_KEY) {
  throw new Error("FIGMA_DESIGN_FILE_KEYが設定されていません");
}

const TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_DESIGN_FILE_KEY;

type FigmaResponseComponent = {
  [id: string]: {
    key: string;
    name: string;
    description: string;
    remote: boolean;
    documentationLinks: any[];
  };
};
type FigmaResponseImages = {
  [id: string]: string;
};

type Icon = {
  id: string;
  name: string;
  path: string;
};

const writeFile = promisify(fs.writeFile);

async function fetchFigma(
  target: string,
  figmaFileKey: string,
  options?: string,
): Promise<any> {
  const response = await fetch(
    `https://api.figma.com/v1/${target}/${figmaFileKey}?${options}`,
    {
      headers: {
        "X-FIGMA-TOKEN": TOKEN,
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch Figma: ${response.statusText}`);
  }
  return response.json();
}

async function fetchImageAndExtractPath(url: string): Promise<string> {
  const response: any = await fetch(url).then((response) => response.text());
  const match = /<svg.*?>([\s\S]*?)<\/svg>/.exec(response);
  if (!match) {
    throw new Error("SVGが見つかりません");
  }
  return match[1].replace(/\sfill=".*"/, "").replace(/\n|\r/g, "");
}

async function writeIcons(icons: Icon[]) {
  await writeFile(
    path.resolve(__dirname, "../src/components/icon/icons.ts"),
    "// Do not edit directly\n// Generated on " +
      new Date().toUTCString() +
      "\n\n" +
      "export const iconTypes = [\n" +
      icons.map((value) => '  "' + value.name + '",').join("\n") +
      "\n" +
      "] as const;\n\n" +
      "export type IconType = (typeof iconTypes)[number];\n\n" +
      "export const iconPaths = {\n" +
      icons
        .map((value) => "  '" + value.name + "': '" + value.path + "',")
        .join("\n") +
      "\n" +
      "} satisfies {[key in IconType]: string};\n",
  );
}

async function main() {
  const a = await fetchFigma("files", FIGMA_FILE_KEY);
  console.log({ a: a });

  return;

  const components: FigmaResponseComponent[] = await fetchFigma(
    "files",
    FIGMA_FILE_KEY,
  ).then((response) => response.components);
  // console.log({ components });

  let icons: Icon[] = [];
  const ids: string[] = [];

  Object.entries(components).map(([key, value]) => {
    const name = String(value.name);
    const isPublishedIcon = /^icon\/(?!\*dummy$).*/.test(name);
    if (isPublishedIcon) {
      ids.push(key);
      icons.push({
        id: key,
        name: name.split("/")[1],
        path: "",
      });
    }
  });

  const images: FigmaResponseImages[] = await fetchFigma(
    "images",
    FIGMA_FILE_KEY,
    "ids=" + ids.join() + "&format=svg",
  ).then((response) => response.images);
  console.log({ images });

  await Promise.all(
    Object.entries(images).map(async ([key, value]) => {
      const path = await fetchImageAndExtractPath(String(value)); // TODO:型がよくわからん
      const icon = icons.find((icon) => icon.id === key);
      if (icon) {
        icon.path = path;
      }
    }),
  );

  icons.sort((a, b) => (a.name > b.name ? 1 : -1));

  await writeIcons(icons);

  console.log("DONE");
}

main();
