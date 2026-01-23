import "../../src/components/avatar/sp-avatar";

import { describe, expect, test } from "vitest";

import type { SpAvatar } from "../../src/components/avatar/sp-avatar";

function getSpAvatar() {
  return document.querySelector("sp-avatar") as SpAvatar;
}

function getBase(): HTMLElement | undefined | null {
  return getSpAvatar().shadowRoot?.querySelector(".base");
}

function getImage(): HTMLImageElement | undefined | null {
  return getSpAvatar().shadowRoot?.querySelector(".image");
}

function getInitials(): HTMLElement | undefined | null {
  return getSpAvatar().shadowRoot?.querySelector(".initials");
}

function getIcon(): HTMLElement | undefined | null {
  return getSpAvatar().shadowRoot?.querySelector(".icon");
}

describe("sp-avatar", () => {
  describe("画像表示", () => {
    test("src属性が指定された場合、画像を表示する", async () => {
      document.body.innerHTML = `<sp-avatar src="https://example.com/avatar.jpg" alt="ユーザー"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const img = getImage();
      expect(img).toBeTruthy();
      expect(img?.getAttribute("src")).toBe("https://example.com/avatar.jpg");
    });

    test("alt属性が画像に正しく適用される", async () => {
      document.body.innerHTML = `<sp-avatar src="https://example.com/avatar.jpg" alt="田中太郎"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const img = getImage();
      expect(img?.getAttribute("alt")).toBe("田中太郎");
    });
  });

  describe("イニシャル表示", () => {
    test("initials属性が指定された場合、イニシャルを表示する", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const initials = getInitials();
      expect(initials).toBeTruthy();
      expect(initials?.textContent).toBe("TA");
    });

    test("initialsは大文字に変換される", async () => {
      document.body.innerHTML = `<sp-avatar initials="ta"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const initials = getInitials();
      expect(initials?.textContent).toBe("TA");
    });

    test("initialsは最大2文字に制限される", async () => {
      document.body.innerHTML = `<sp-avatar initials="TARO"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const initials = getInitials();
      expect(initials?.textContent).toBe("TA");
    });

    test("slotのテキストからイニシャルを生成する", async () => {
      document.body.innerHTML = `<sp-avatar>John</sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const initials = getInitials();
      expect(initials?.textContent).toBe("JO");
    });

    test("initials属性はslotより優先される", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA">John</sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const initials = getInitials();
      expect(initials?.textContent).toBe("TA");
    });
  });

  describe("アイコン表示", () => {
    test("src属性もinitials属性もslotも指定されていない場合、アイコンを表示する", async () => {
      document.body.innerHTML = `<sp-avatar></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const icon = getIcon();
      expect(icon).toBeTruthy();
      expect(icon?.querySelector("sp-icon")).toBeTruthy();
    });
  });

  describe("size属性", () => {
    test("size属性が正しく適用される（small）", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA" size="small"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("size-small")).toBe(true);
    });

    test("size属性が正しく適用される（medium）", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA" size="medium"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("size-medium")).toBe(true);
    });

    test("size属性が正しく適用される（large）", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA" size="large"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("size-large")).toBe(true);
    });

    test("size属性が正しく適用される（x-large）", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA" size="x-large"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("size-x-large")).toBe(true);
    });

    test("size属性が正しく適用される（2x-large）", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA" size="2x-large"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("size-2x-large")).toBe(true);
    });

    test("デフォルトサイズはmedium", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("size-medium")).toBe(true);
    });

    test("無効なsize属性の場合、フォールバック値（medium）を使用する", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA" size="invalid"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("size-medium")).toBe(true);
    });
  });

  describe("color属性", () => {
    test("有効な色名が指定された場合、対応するカラークラスが適用される（plum）", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA" color="plum"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("color-plum")).toBe(true);
    });

    test("有効な色名が指定された場合、対応するカラークラスが適用される（violet）", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA" color="violet"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("color-violet")).toBe(true);
    });

    test("有効な色名が指定された場合、対応するカラークラスが適用される（red）", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA" color="red"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("color-red")).toBe(true);
    });

    test("空文字の場合、カラークラスは適用されない", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA" color=""></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.className).toMatch(/^base size-medium$/);
    });

    test("無効な色名の場合、カラークラスは適用されない", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA" color="invalid"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("color-invalid")).toBe(false);
    });

    test("画像表示時はcolor属性が無視される", async () => {
      document.body.innerHTML = `<sp-avatar src="https://example.com/avatar.jpg" color="plum"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("color-plum")).toBe(false);
    });

    test("アイコン表示時はcolor属性が無視される", async () => {
      document.body.innerHTML = `<sp-avatar color="plum"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("color-plum")).toBe(false);
    });
  });

  describe("inactive属性", () => {
    test("inactive属性がtrueの場合、inactiveクラスが適用される", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA" inactive></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("inactive")).toBe(true);
    });

    test("inactive属性がfalseの場合、inactiveクラスは適用されない", async () => {
      document.body.innerHTML = `<sp-avatar initials="TA"></sp-avatar>`;
      await customElements.whenDefined("sp-avatar");

      const base = getBase();
      expect(base?.classList.contains("inactive")).toBe(false);
    });
  });
});
