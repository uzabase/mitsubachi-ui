import * as fs from "fs/promises";
import * as path from "path";

const TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_DESIGN_FILE_KEY;

if (!TOKEN) throw new Error("FIGMA_TOKENが設定されていません");
if (!FIGMA_FILE_KEY)
  throw new Error("FIGMA_DESIGN_FILE_KEYが設定されていません");

const figmaFetch = async (endpoint: string): Promise<any> => {
  const response = await fetch(`https://api.figma.com/v1/${endpoint}`, {
    headers: { "X-FIGMA-TOKEN": TOKEN },
  });
  if (!response.ok) {
    throw new Error(`Figma API error: ${response.statusText}`);
  }
  return response.json();
};

const fetchComponentSets = () =>
  figmaFetch(`files/${FIGMA_FILE_KEY}/component_sets`);

const fetchNodes = (nodeIds: string) =>
  figmaFetch(`files/${FIGMA_FILE_KEY}/nodes?ids=${nodeIds}`);

const fetchSvgUrls = (ids: string[]) =>
  figmaFetch(`images/${FIGMA_FILE_KEY}?ids=${ids.join(",")}&format=svg`);

const fetchSvgContent = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const text = await response.text();
  return text.replace(/\n|\r/g, "");
};

type ComponentSet = { name: string; node_id: string };
type Component = { name: string };

const findComponentSetByName = async (name: string): Promise<ComponentSet> => {
  const res = await fetchComponentSets();
  const set = res.meta.component_sets.find(
    (s: ComponentSet) => s.name === name,
  );
  if (!set) throw new Error(`Component set '${name}' not found`);
  return set;
};

const fetchNodeById = async (nodeId: string) => {
  const res = await fetchNodes(nodeId);
  return res.nodes[nodeId];
};

type LogoVariant = {
  props: Record<string, string>;
  svg: string;
};

const parseVariantName = (name: string): Record<string, string> => {
  return Object.fromEntries(
    name
      .split(",")
      .map((s) => s.trim().split("="))
      .filter(([k, v]) => k && v),
  );
};

const toCamelCase = (str: string): string =>
  str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

const generateLogoMapEntries = (logos: LogoVariant[]): string => {
  return logos
    .map((logo) => {
      const key = Object.entries(logo.props)
        .map(([k, v]) => `${toCamelCase(k)}:${v}`)
        .sort()
        .join("|");
      const escapedSvg = logo.svg.replace(/'/g, "\\'");
      return { key, entry: `  '${key}': '${escapedSvg}',` };
    })
    .sort((a, b) => a.key.localeCompare(b.key))
    .map(({ entry }) => entry)
    .join("\n");
};

const generateKeyBuilder = (propKeys: string[]): string => {
  return propKeys
    .sort()
    .map((rawKey, i, arr) => {
      const camelKey = toCamelCase(rawKey);
      const sep = i === arr.length - 1 ? "" : "|";
      return `    \`${camelKey}:\${input.${camelKey} ?? 'null'}${sep}\``;
    })
    .join(" +\n");
};

const generateLogosModule = (logos: LogoVariant[]): string => {
  const allKeys = [...new Set(logos.flatMap((l) => Object.keys(l.props)))];

  return `// Auto-generated. DO NOT EDIT.

const LOGO_MAP: Record<string, string> = {
${generateLogoMapEntries(logos)}
};

export const resolveLogo = (input: Record<string, unknown>): string | undefined => {
  const key =
${generateKeyBuilder(allKeys)};

  return LOGO_MAP[key] ?? undefined;
};
`;
};

async function main() {
  const logoSet = await findComponentSetByName("logo");
  const logoNode = await fetchNodeById(logoSet.node_id);
  const components: Record<string, Component> = logoNode.components;

  const svgUrls = await fetchSvgUrls(Object.keys(components));
  const logos: LogoVariant[] = await Promise.all(
    Object.entries(svgUrls.images).map(async ([id, url]) => ({
      props: parseVariantName(components[id].name),
      svg: await fetchSvgContent(url as string),
    })),
  );

  const outputPath = path.resolve(__dirname, "../src/components/logo/logos.ts");
  await fs.writeFile(outputPath, generateLogosModule(logos));
  console.log(`Generated: ${outputPath}`);
}

main().catch(console.error);
