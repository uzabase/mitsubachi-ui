import * as fs from "fs/promises";
import * as path from "path";

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_LOGO_FILE_KEY;

if (!TOKEN) throw new Error("FIGMA_TOKENが設定されていません");
if (!FILE_KEY) throw new Error("FIGMA_LOGO_FILE_KEYが設定されていません");

const figmaFetch = async (endpoint: string): Promise<any> => {
  const response = await fetch(`https://api.figma.com/v1/${endpoint}`, {
    headers: { "X-FIGMA-TOKEN": TOKEN },
  });
  if (!response.ok) {
    throw new Error(`Figma API error: ${response.statusText}`);
  }
  return response.json();
};

const fetchComponentSets = () => figmaFetch(`files/${FILE_KEY}/component_sets`);

const fetchNodes = (nodeIds: string) =>
  figmaFetch(`files/${FILE_KEY}/nodes?ids=${nodeIds}`);

const fetchSvgUrls = (ids: string[]) =>
  figmaFetch(`images/${FILE_KEY}?ids=${ids.join(",")}&format=svg`);

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

const convertSpeedaProps = (
  props: Record<string, string>,
): Record<string, string> => {
  const { brand, "sub-brand": subBrand, language, ...rest } = props;

  if (language === "zh") {
    return { type: "shibida", ...rest };
  }

  const type = subBrand && subBrand !== "null" ? subBrand : "speeda";
  return { type, ...rest };
};

const convertUzabaseProps = (
  props: Record<string, string>,
): Record<string, string> => {
  return { inverse: props.inverse };
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
      return { key, entry: `  "${key}":\n    '${escapedSvg}',` };
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
      return `    \`${camelKey}:\${input.${camelKey} ?? "null"}${sep}\``;
    })
    .join(" +\n");
};

const generateLogosModule = (
  logos: LogoVariant[],
  propKeys: string[],
): string => {
  return `// Auto-generated. DO NOT EDIT.

const LOGO_MAP: Record<string, string> = {
${generateLogoMapEntries(logos)}
};

export const resolveLogo = (
  input: Record<string, unknown>,
): string | undefined => {
  const key =
${generateKeyBuilder(propKeys)};

  return LOGO_MAP[key] ?? undefined;
};
`;
};

async function main() {
  const logoSet = await findComponentSetByName("logo");
  const logoNode = await fetchNodeById(logoSet.node_id);
  const components: Record<string, Component> = logoNode.components;

  const svgUrls = await fetchSvgUrls(Object.keys(components));

  const allLogos = await Promise.all(
    Object.entries(svgUrls.images).map(async ([id, url]) => ({
      rawProps: parseVariantName(components[id].name),
      svg: await fetchSvgContent(url as string),
    })),
  );

  const speedaRawLogos = allLogos.filter((l) => l.rawProps.brand === "speeda");
  const uzabaseRawLogos = allLogos.filter(
    (l) => l.rawProps.brand === "uzabase",
  );

  const speedaLogos: LogoVariant[] = speedaRawLogos.map((l) => ({
    props: convertSpeedaProps(l.rawProps),
    svg: l.svg,
  }));
  const speedaPropKeys = ["type", "inverse", "symbol"];

  const uzabaseLogos: LogoVariant[] = uzabaseRawLogos.map((l) => ({
    props: convertUzabaseProps(l.rawProps),
    svg: l.svg,
  }));
  const uzabasePropKeys = ["inverse"];

  const outputDir = path.resolve(__dirname, "../src/components/logo");

  await fs.writeFile(
    path.join(outputDir, "speeda-logos.ts"),
    generateLogosModule(speedaLogos, speedaPropKeys),
  );
  console.log(`Generated: speeda-logos.ts (${speedaLogos.length} variants)`);

  await fs.writeFile(
    path.join(outputDir, "uzabase-logos.ts"),
    generateLogosModule(uzabaseLogos, uzabasePropKeys),
  );
  console.log(`Generated: uzabase-logos.ts (${uzabaseLogos.length} variants)`);
}

main().catch(console.error);
