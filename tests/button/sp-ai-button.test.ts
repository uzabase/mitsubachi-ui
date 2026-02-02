import { beforeEach, describe, expect, it } from "vitest";

import "../../src/components/button/sp-ai-button";

import type { SpAiButton } from "../../src/components/button/sp-ai-button";

describe("sp-ai-button", () => {
  let element: SpAiButton;

  beforeEach(() => {
    element = document.createElement("sp-ai-button");
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
  });

  describe("基本的なレンダリング", () => {
    it("コンポーネントが正しくレンダリングされる", async () => {
      element.textContent = "AIで生成";
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector("button");
      expect(button).toBeTruthy();
      expect(button?.textContent?.trim()).toBe("AIで生成");
    });

    it("デフォルトでprimaryバリアントが適用される", async () => {
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector("button");
      expect(button?.classList.contains("primary")).toBe(true);
    });

    it("mode-aiクラスが適用される", async () => {
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector("button");
      expect(button?.classList.contains("mode-ai")).toBe(true);
    });
  });

  describe("バリアント", () => {
    it("primaryバリアントが適用される", async () => {
      element.variant = "primary";
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector("button");
      expect(button?.classList.contains("primary")).toBe(true);
    });

    it("secondaryバリアントが適用される", async () => {
      element.variant = "secondary";
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector("button");
      expect(button?.classList.contains("secondary")).toBe(true);
    });
  });

  describe("サイズ", () => {
    it("mediumサイズが適用される", async () => {
      element.size = "medium";
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector("button");
      expect(button?.classList.contains("medium")).toBe(true);
    });

    it("largeサイズが適用される", async () => {
      element.size = "large";
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector("button");
      expect(button?.classList.contains("large")).toBe(true);
    });

    it("xLargeサイズが適用される", async () => {
      element.size = "xLarge";
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector("button");
      expect(button?.classList.contains("x-large")).toBe(true);
    });
  });

  describe("状態", () => {
    it("disabledが正しく機能する", async () => {
      element.disabled = true;
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector("button");
      expect(button?.disabled).toBe(true);
    });

    it("loadingが正しく機能する", async () => {
      element.loading = true;
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector("button");
      const loading = element.shadowRoot?.querySelector("sp-loading");

      expect(button?.classList.contains("loading")).toBe(true);
      expect(loading).toBeTruthy();
      expect(button?.disabled).toBe(true);
    });
  });

  describe("アイコン", () => {
    it("アイコンが表示される", async () => {
      element.iconType = "magic-fill";
      await element.updateComplete;

      const icon = element.shadowRoot?.querySelector("sp-icon");
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute("type")).toBe("magic-fill");
    });

    it("loadingの場合はアイコンが表示されない", async () => {
      element.iconType = "magic-fill";
      element.loading = true;
      await element.updateComplete;

      const icon = element.shadowRoot?.querySelector("sp-icon");
      expect(icon).toBeNull();
    });
  });

  describe("フォーム統合", () => {
    it("name属性が設定される", async () => {
      element.name = "ai-button";
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector("button");
      expect(button?.getAttribute("name")).toBe("ai-button");
    });

    it("value属性が設定される", async () => {
      element.value = "generate";
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector("button");
      expect(button?.getAttribute("value")).toBe("generate");
    });

    it("type属性が設定される", async () => {
      element.type = "button";
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector("button");
      expect(button?.getAttribute("type")).toBe("button");
    });
  });
});
