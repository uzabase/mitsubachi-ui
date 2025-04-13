import * as path from "node:path";

import { describe, expect, test } from "vitest";

import { readManifest } from "../../tools/mcp/manifest";

describe("wip", () => {

  test("temp", async () => {

    const text = await readManifest(path.join(__dirname, "custom-elements.json"));
    console.log(text);
  });

});
