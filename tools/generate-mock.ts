/**
 * テスト用モックコンポーネントの生成スクリプト
 *
 * dist/custom-elements.json から dist/mock.js を生成します。
 * 各コンポーネントはタグ名を表示する共通の視覚的モック表現を持ち、
 * Selenide の visible チェック等で検出可能です。
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");

interface Slot {
  name: string;
}

interface Declaration {
  kind: string;
  name: string;
  slots?: Slot[];
}

interface DeclarationRef {
  name: string;
  module: string;
}

interface Export {
  kind: string;
  name: string;
  declaration?: DeclarationRef;
}

interface Module {
  path: string;
  declarations?: Declaration[];
  exports?: Export[];
}

interface Manifest {
  modules: Module[];
}

interface ComponentInfo {
  tagName: string;
  slots: Slot[];
}

function resolveComponents(manifest: Manifest): ComponentInfo[] {
  const declarationMap = new Map<string, Declaration>();
  for (const mod of manifest.modules) {
    for (const decl of mod.declarations ?? []) {
      declarationMap.set(`${mod.path}::${decl.name}`, decl);
    }
  }

  return manifest.modules
    .flatMap((m) => m.exports ?? [])
    .filter((e) => e.kind === "custom-element-definition")
    .map((e) => {
      const key = `${e.declaration?.module}::${e.declaration?.name}`;
      const decl = declarationMap.get(key);
      return { tagName: e.name, slots: decl?.slots ?? [] };
    });
}

function toJSString(html: string): string {
  return html
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

const MOCK_STYLE = toJSString(`
  :host { display: inline-block; }
  .m { display: inline-flex; align-items: center; gap: 4px;
       border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px;
       background: #fafafa; font: 11px monospace; color: #999;
       min-height: 20px; box-sizing: border-box; }
`);

function buildSlotHtml(slots: Slot[]): string {
  return slots
    .map((s) => (s.name ? `<slot name="${s.name}"></slot>` : "<slot></slot>"))
    .join("");
}

function generateMockClass(info: ComponentInfo): string {
  const slotHtml = buildSlotHtml(info.slots);
  const innerHTML = `<style>${MOCK_STYLE}</style><div class=\\"m\\">${info.tagName}${slotHtml}</div>`;

  return [
    `    customElements.define("${info.tagName}", class extends HTMLElement {`,
    `      constructor() {`,
    `        super();`,
    `        this.attachShadow({ mode: "open" }).innerHTML = "${innerHTML}";`,
    `      }`,
    `    });`,
  ].join("\n");
}

function main() {
  const manifest: Manifest = JSON.parse(
    readFileSync(resolve(distDir, "custom-elements.json"), "utf-8"),
  );

  const components = resolveComponents(manifest);

  const definitions = components
    .map(
      (c) =>
        `  if (!customElements.get("${c.tagName}")) {\n${generateMockClass(c)}\n  }`,
    )
    .join("\n");

  const mockCode = `${definitions}\n`;

  writeFileSync(resolve(distDir, "mock.js"), mockCode);

  const withSlots = components.filter((c) => c.slots.length > 0);
  console.log(
    `Generated dist/mock.js with ${components.length} custom elements (${withSlots.length} with slots):`,
  );
  console.log(components.map((c) => c.tagName).join(", "));
}

main();
