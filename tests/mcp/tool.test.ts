import { describe, expect, test } from "vitest";

import { loadDefaultManifest } from "../../tools/mcp/manifest";
import { makeWebComponentContent } from "../../tools/mcp/tool";
import { z } from "zod";

describe("カスタム要素の概要を提供する", async () => {
  test("説明文にはカスタム要素の名前がある", async () => {
    const actual = makeWebComponentContent(loadDefaultManifest());

    const tags = new Set(["sp-icon", "sp-logo", 'sp-text-field-unit']);

    for (const element of actual) {
      const tag = element.text.match(/カスタム要素 <(.+)>/)![1];
      expect(
        tags.has(tag),
        `${tag}は未知タグです。custom-elements.jsonが古いかもしれません。`,
      ).toBe(true);
      tags.delete(tag);
    }

    if (tags.size > 0) {
      throw new Error(
        `説明に含まれないカスタム要素がありました。${Array.from(tags).join(",")}`,
      );
    }
  });


});


