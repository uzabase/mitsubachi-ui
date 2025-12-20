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

type FigmaResponseImages = {
  [id: string]: string;
};

type Logo = {
  name: string;
  svg: string;
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

async function fetchSvg(url: string): Promise<string> {
  const response = await fetch(url).then((r) => r.text());
  return response.replace(/\n|\r/g, "");
}

const parseVariantProperties = (name: string): Record<string, string> => {
  const props: Record<string, string> = {};

  name.split(",").forEach((segment) => {
    const [key, value] = segment.split("=").map((s) => s.trim());
    if (key && value) {
      props[key] = value;
    }
  });

  return props;
};

function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

type LogoVariant = {
  rawName: string;
  props: Record<string, string>;
  svg: string;
};

async function writeLogos(logos: LogoVariant[]) {
  const allKeys = new Set<string>();
  logos.forEach((l) => Object.keys(l.props).forEach((k) => allKeys.add(k)));
  const sortedKeys = Array.from(allKeys).sort();

  const logosContent = logos
    .map((logo) => {
      const key = Object.entries(logo.props)
        .map(([k, v]) => `${toCamelCase(k)}:${v}`)
        .sort()
        .join("|");
      const escapedSvg = logo.svg.replace(/'/g, "\\'");
      return `  '${key}': '${escapedSvg}',`;
    })
    .join("\n");

  const keyBuilderLogic = sortedKeys
    .map((rawKey, index) => {
      const camelKey = toCamelCase(rawKey);
      const separator = index === sortedKeys.length - 1 ? "" : "|";
      const accessor = `input.${camelKey}`;
      return `    \`${camelKey}:\${${accessor} ?? 'null'}${separator}\``;
    })
    .join(" +\n");

  const fileContent = `// Auto-generated. DO NOT EDIT.

const LOGO_MAP: Record<string, string> = {
${logosContent}
};

export const resolveLogo = (input: Record<string, unknown>): string | undefined => {
  const key = 
${keyBuilderLogic};

  return LOGO_MAP[key] ?? undefined;
};
`;

  await writeFile(
    path.resolve(__dirname, "../src/components/logo/logos.ts"),
    fileContent,
  );
  console.log("Successfully generated logos.ts");
}

async function main() {
  const nodes = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/component_sets`,
    {
      headers: {
        "X-FIGMA-TOKEN": TOKEN,
      },
    },
  ).then((response) => response.json());

  const logo = await fetch(
    `https://api.figma.com/v1/component_sets/${nodes.meta.component_sets[0].key}`,
    {
      headers: {
        "X-FIGMA-TOKEN": TOKEN,
      },
    },
  ).then((response) => response.json());

  const logoNode = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${logo.meta.node_id}`,
    {
      headers: {
        "X-FIGMA-TOKEN": TOKEN,
      },
    },
  ).then((response) => response.json());

  const logoComponents = logoNode.nodes["1:13"].components;

  const images: FigmaResponseImages[] = await fetchFigma(
    "images",
    FIGMA_FILE_KEY,
    "ids=" + Object.keys(logoComponents).join(",") + "&format=svg",
  ).then((response) => response.images);

  const logos: Logo[] = [];

  await Promise.all(
    Object.entries(images).map(async ([key, value]) => {
      const svg = await fetchSvg(String(value));
      logos.push({
        name: logoComponents[key].name,
        svg,
      });
    }),
  );

  logos.sort((a, b) => (a.name > b.name ? 1 : -1));

  await writeLogos(
    logos.map((logo) => ({
      rawName: logo.name,
      props: parseVariantProperties(logo.name),
      svg: logo.svg,
    })),
  );

  console.log("DONE");
}

main();
