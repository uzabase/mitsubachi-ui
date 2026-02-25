import "../../src/components/button/mi-icon-button";

import { describe, expect, test } from "vitest";

import type { MiIconButton } from "../../src/components/button/mi-icon-button";

function getMiIconButton() {
  return document.querySelector("mi-icon-button") as MiIconButton;
}

function getButton(): HTMLButtonElement | undefined | null {
  return getMiIconButton().shadowRoot?.querySelector("button");
}

function getLoading() {
  return getMiIconButton().shadowRoot?.querySelector("mi-loading");
}

describe("mi-icon-button", () => {
  describe("variant属性", () => {
    test("variant属性を設定すると、buttonに適切なクラスが適用される", async () => {
      document.body.innerHTML = `<mi-icon-button variant="primary" icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.classList.contains("primary")).toBe(true);
    });

    test("variant属性を更新すると、buttonのクラスが更新される", async () => {
      document.body.innerHTML = `<mi-icon-button variant="primary" icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const el = getMiIconButton();
      el.setAttribute("variant", "secondary");
      await el.updateComplete;

      expect(getButton()?.classList.contains("secondary")).toBe(true);
      expect(getButton()?.classList.contains("primary")).toBe(false);
    });

    test("variant属性を設定しない場合、デフォルト値（ghost）が使用される", async () => {
      document.body.innerHTML = `<mi-icon-button icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.classList.contains("ghost")).toBe(true);
    });
  });

  describe("size属性", () => {
    test.each([
      ["small", "small"],
      ["medium", "medium"],
      ["large", "large"],
    ])(
      "size='%s' を設定すると、'%s' クラスが適用される",
      async (size, expectedClass) => {
        document.body.innerHTML = `<mi-icon-button size="${size}" icon-type="search"></mi-icon-button>`;
        await customElements.whenDefined("mi-icon-button");

        expect(getButton()?.classList.contains(expectedClass)).toBe(true);
      },
    );

    test("size属性を設定しない場合、デフォルト値（medium）が使用される", async () => {
      document.body.innerHTML = `<mi-icon-button icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.classList.contains("medium")).toBe(true);
    });
  });

  describe("icon-type属性", () => {
    test("icon-type属性に有効な値を設定すると、mi-iconが表示される", async () => {
      document.body.innerHTML = `<mi-icon-button icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const icon = getMiIconButton().shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute("type")).toBe("search");
    });

    test("icon-type属性を更新すると、mi-iconのtype属性が更新される", async () => {
      document.body.innerHTML = `<mi-icon-button icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const el = getMiIconButton();
      el.setAttribute("icon-type", "cross");
      await el.updateComplete;

      const icon = el.shadowRoot?.querySelector("mi-icon");
      expect(icon?.getAttribute("type")).toBe("cross");
    });

    test("icon-type属性を設定しない場合、mi-iconが表示されない", async () => {
      document.body.innerHTML = `<mi-icon-button></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const icon = getMiIconButton().shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeFalsy();
    });

    test("icon-type属性に無効な値を設定すると、mi-iconが表示されない", async () => {
      document.body.innerHTML = `<mi-icon-button icon-type="invalid-icon"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const icon = getMiIconButton().shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeFalsy();
    });
  });

  describe("disabled属性", () => {
    test("disabled属性を設定すると、buttonが無効になる", async () => {
      document.body.innerHTML = `<mi-icon-button disabled icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.disabled).toBe(true);
    });

    test("disabled属性を設定しない場合、buttonが有効になる", async () => {
      document.body.innerHTML = `<mi-icon-button icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.disabled).toBe(false);
    });
  });

  describe("loading属性", () => {
    test("loading属性を設定すると、ローディングが表示される", async () => {
      document.body.innerHTML = `<mi-icon-button loading icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getLoading()).toBeTruthy();
    });

    test("loading属性を設定しても、disabled属性は付与されない（aria-disabled で代替）", async () => {
      document.body.innerHTML = `<mi-icon-button loading icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.disabled).toBe(false);
      expect(getButton()?.getAttribute("aria-disabled")).toBe("true");
    });

    test("loading属性を設定すると、iconが非表示になる", async () => {
      document.body.innerHTML = `<mi-icon-button loading icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const icon = getMiIconButton().shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeFalsy();
    });

    test("loading属性を設定すると、aria-busy='true' が付与される", async () => {
      document.body.innerHTML = `<mi-icon-button loading icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.getAttribute("aria-busy")).toBe("true");
    });

    test("loading属性を設定しない場合、aria-busy属性は付与されない", async () => {
      document.body.innerHTML = `<mi-icon-button icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.getAttribute("aria-busy")).toBeNull();
    });

    test("loading中にクリックしても、clickイベントが発火しない", async () => {
      document.body.innerHTML = `<mi-icon-button loading icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const el = getMiIconButton();
      let clickCount = 0;
      el.addEventListener("click", () => {
        clickCount++;
      });

      getButton()?.click();
      expect(clickCount).toBe(0);
    });
  });

  describe("selected属性", () => {
    test("selected属性を設定すると、buttonにselectedクラスが付与される", async () => {
      document.body.innerHTML = `<mi-icon-button selected icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.classList.contains("selected")).toBe(true);
    });

    test("selected属性を設定しない場合、selectedクラスは付与されない", async () => {
      document.body.innerHTML = `<mi-icon-button icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.classList.contains("selected")).toBe(false);
    });
  });

  describe("toggle属性・aria-pressed", () => {
    test("toggle属性を設定しない場合、aria-pressed属性は付与されない", async () => {
      document.body.innerHTML = `<mi-icon-button selected icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.getAttribute("aria-pressed")).toBeNull();
    });

    test("toggle=true かつ selected=false の場合、aria-pressed='false' が付与される", async () => {
      document.body.innerHTML = `<mi-icon-button toggle icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.getAttribute("aria-pressed")).toBe("false");
    });

    test("toggle=true かつ selected=true の場合、aria-pressed='true' が付与される", async () => {
      document.body.innerHTML = `<mi-icon-button toggle selected icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.getAttribute("aria-pressed")).toBe("true");
    });
  });

  describe("スロット（テキストなし）", () => {
    test("テキストを渡してもslotが存在しない", async () => {
      document.body.innerHTML = `<mi-icon-button icon-type="search">テキスト</mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const slot = getMiIconButton().shadowRoot?.querySelector("slot");
      expect(slot).toBeFalsy();
    });
  });

  describe("aria-label属性", () => {
    test("aria-label属性を設定すると、buttonのaria-label属性に反映される", async () => {
      document.body.innerHTML = `<mi-icon-button aria-label="検索" icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.getAttribute("aria-label")).toBe("検索");
    });

    test("aria-label属性を設定すると、mi-tooltipがレンダリングされる", async () => {
      document.body.innerHTML = `<mi-icon-button aria-label="検索" icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const tooltip = getMiIconButton().shadowRoot?.querySelector("mi-tooltip");
      expect(tooltip).toBeTruthy();
      expect(tooltip?.getAttribute("text")).toBe("検索");
    });

    test("aria-label属性を設定しない場合、mi-tooltipはレンダリングされない", async () => {
      document.body.innerHTML = `<mi-icon-button icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const tooltip = getMiIconButton().shadowRoot?.querySelector("mi-tooltip");
      expect(tooltip).toBeFalsy();
    });
  });

  describe("tooltip-disabled属性", () => {
    test("tooltip-disabledを設定すると、mi-tooltipがレンダリングされない", async () => {
      document.body.innerHTML = `<mi-icon-button aria-label="検索" icon-type="search" tooltip-disabled></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const tooltip = getMiIconButton().shadowRoot?.querySelector("mi-tooltip");
      expect(tooltip).toBeFalsy();
    });

    test("tooltip-disabledを設定すると、buttonにtitle属性が付与される", async () => {
      document.body.innerHTML = `<mi-icon-button aria-label="検索" icon-type="search" tooltip-disabled></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.getAttribute("title")).toBe("検索");
    });

    test("tooltip-disabledなしのとき、title属性は付与されない", async () => {
      document.body.innerHTML = `<mi-icon-button aria-label="検索" icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      expect(getButton()?.getAttribute("title")).toBeNull();
    });
  });

  describe("tooltip-placement属性", () => {
    test("tooltip-placement属性がmi-tooltipのplacement属性に反映される", async () => {
      document.body.innerHTML = `<mi-icon-button aria-label="検索" icon-type="search" tooltip-placement="bottom"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const tooltip = getMiIconButton().shadowRoot?.querySelector("mi-tooltip");
      expect(tooltip?.getAttribute("placement")).toBe("bottom");
    });

    test("tooltip-placement属性を設定しない場合、デフォルト値（top）が使用される", async () => {
      document.body.innerHTML = `<mi-icon-button aria-label="検索" icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const tooltip = getMiIconButton().shadowRoot?.querySelector("mi-tooltip");
      expect(tooltip?.getAttribute("placement")).toBe("top");
    });
  });

  describe("クリックイベント", () => {
    test("ボタンをクリックすると、clickイベントが1回だけ発火する", async () => {
      document.body.innerHTML = `<mi-icon-button icon-type="search"></mi-icon-button>`;
      await customElements.whenDefined("mi-icon-button");

      const el = getMiIconButton();
      let clickCount = 0;
      el.addEventListener("click", () => {
        clickCount++;
      });

      getButton()?.click();
      expect(clickCount).toBe(1);
    });
  });
});
