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

type IconColor = {
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
  const url = `https://api.figma.com/v1/${target}/${figmaFileKey}${options ? `?${options}` : ""}`;
  const response = await fetch(url, {
    headers: {
      "X-FIGMA-TOKEN": TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Figma API error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

async function fetchImageAndExtractPath(url: string): Promise<string> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
  }
  
  const text = await response.text();
  const match = /<svg.*?>([\s\S]*?)<\/svg>/.exec(text);
  
  if (!match) {
    throw new Error("SVGが見つかりません");
  }
  
  // カラーアイコンはfill属性を保持する（色情報が重要）
  return match[1].replace(/\n|\r/g, "");
}

async function writeIconColors(icons: IconColor[]) {
  await writeFile(
    path.resolve(__dirname, "../src/components/icon-color/icons.ts"),
    "// Do not edit directly\n// Generated on " +
      new Date().toUTCString() +
      "\n\n" +
      "export const iconColorTypes = [\n" +
      icons.map((value) => '  "' + value.name + '",').join("\n") +
      "\n" +
      "] as const;\n\n" +
      "export type IconColorType = (typeof iconColorTypes)[number];\n\n" +
      "export const iconColorPaths = {\n" +
      icons
        .map((value) => "  '" + value.name + "': '" + value.path + "',")
        .join("\n") +
      "\n" +
      "} satisfies {[key in IconColorType]: string};\n",
  );
}

async function main() {
  console.log("Figmaからカラーアイコンを取得しています...");
  
  const fileResponse = await fetchFigma("files", FIGMA_FILE_KEY);
  const components: FigmaResponseComponent = fileResponse.components;

  const icons: IconColor[] = [];
  const ids: string[] = [];

  Object.entries(components).forEach(([key, value]) => {
    const name = String(value.name);
    // icon-color/ で始まるコンポーネント名を検索（*dummyは除外）
    const isPublishedColorIcon = /^icon-color\/(?!\*dummy$).*/.test(name);
    if (isPublishedColorIcon) {
      ids.push(key);
      icons.push({
        id: key,
        name: name.split("/")[1],
        path: "",
      });
    }
  });

  if (icons.length === 0) {
    console.warn("⚠️  カラーアイコンが見つかりませんでした");
    console.warn("Figmaで 'icon-color/' で始まるコンポーネント名を確認してください");
    return;
  }

  console.log(`${icons.length}個のカラーアイコンを見つけました`);

  const imagesResponse = await fetchFigma(
    "images",
    FIGMA_FILE_KEY,
    "ids=" + ids.join(",") + "&format=svg",
  );
  const images: FigmaResponseImages = imagesResponse.images;

  await Promise.all(
    Object.entries(images).map(async ([key, value]) => {
      const svgPath = await fetchImageAndExtractPath(String(value));
      const icon = icons.find((icon) => icon.id === key);
      if (icon) {
        icon.path = svgPath;
      }
    }),
  );

  icons.sort((a, b) => (a.name > b.name ? 1 : -1));

  await writeIconColors(icons);

  console.log("✅ カラーアイコンの取得が完了しました");
  console.log(`   生成されたアイコン: ${icons.map((i) => i.name).join(", ")}`);
}

main().catch((error) => {
  console.error("❌ エラーが発生しました:", error.message);
  process.exit(1);
});
