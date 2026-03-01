/**
 * テスト用モックコンポーネントの生成スクリプト
 *
 * dist/custom-elements.json から dist/mock.js を生成します。
 * コンポーネントが slot を持つ場合、Shadow DOM 付きのモックを生成します。
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

function buildSlotHtml(slots: Slot[]): string {
  return slots
    .map((s) => (s.name ? `<slot name="${s.name}"></slot>` : "<slot></slot>"))
    .join("");
}

function generateMockClass(info: ComponentInfo): string {
  if (info.slots.length === 0) {
    return `    customElements.define("${info.tagName}", class extends HTMLElement {});`;
  }
  const slotHtml = buildSlotHtml(info.slots);
  return [
    `    customElements.define("${info.tagName}", class extends HTMLElement {`,
    `      constructor() {`,
    `        super();`,
    `        this.attachShadow({ mode: "open" }).innerHTML = "${slotHtml}";`,
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
