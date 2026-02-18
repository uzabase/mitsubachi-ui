/**
 * テスト用モックコンポーネントの生成スクリプト
 *
 * dist/custom-elements.json から dist/mock.js を生成します。
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");

interface CustomElementExport {
  kind: string;
  name: string;
}

interface Module {
  exports?: CustomElementExport[];
}

interface Manifest {
  modules: Module[];
}

function main() {
  const manifest: Manifest = JSON.parse(
    readFileSync(resolve(distDir, "custom-elements.json"), "utf-8"),
  );

  const tagNames = manifest.modules
    .flatMap((m) => m.exports || [])
    .filter((e) => e.kind === "custom-element-definition")
    .map((e) => e.name);

  const mockCode = `${JSON.stringify(tagNames)}.forEach((name) => {
  if (!customElements.get(name)) {
    customElements.define(name, class extends HTMLElement {});
  }
});
`;

  writeFileSync(resolve(distDir, "mock.js"), mockCode);

  console.log(
    `Generated dist/mock.js with ${tagNames.length} custom elements:`,
  );
  console.log(tagNames.join(", "));
}

main();
