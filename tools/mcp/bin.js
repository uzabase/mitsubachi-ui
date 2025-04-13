// tools/mcp/index.ts
import "@custom-elements-manifest/analyzer";
import { readFile } from "node:fs/promises";
import * as path from "node:path";
var __dirname = import.meta.dirname;
async function main() {
  const text = (await readFile(path.join(__dirname, "custom-elements.json"), "utf-8")).toString();
  const manifestObject = JSON.parse(text);
  console.log(manifestObject);
}
main().catch((error) => {
  console.log(error);
});
export {
  main
};
