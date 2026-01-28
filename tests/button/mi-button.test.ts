import "../../src/components/button/mi-button";

import { describe, expect, test } from "vitest";

import type { MiButton } from "../../src/components/button/mi-button";

function getMiButton() {
  return document.querySelector("mi-button") as MiButton;
}

function getButton(): HTMLButtonElement | undefined | null {
  return getMiButton().shadowRoot?.querySelector("button");
}

function getLoading() {
  return getMiButton().shadowRoot?.querySelector("mi-loading");
}

describe("mi-button", () => {
  describe("テキストのslot", () => {
    test("slotに文字列を渡すと、ボタンにその文字列が表示される", async () => {
      document.body.innerHTML = "<mi-button>ダウンロード</mi-button>";
      await customElements.whenDefined("mi-button");

      const button = getMiButton();

      expect(button.textContent).toBe("ダウンロード");
    });
  });

  describe("name属性", () => {
    test("name属性を設定すると、buttonのname属性にも反映される", async () => {
      document.body.innerHTML = `<mi-button name="submit">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.getAttribute("name")).toBe("submit");
    });

    test("name属性を更新すると、buttonのname属性にも反映される", async () => {
      document.body.innerHTML = `<mi-button name="submit">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.setAttribute("name", "cancel");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.getAttribute("name")).toBe("cancel");
    });

    test("name属性を設定しない場合、buttonのname属性は空文字になる", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.getAttribute("name")).toBe("");
    });
  });

  describe("value属性", () => {
    test("value属性を設定すると、buttonのvalue属性にも反映される", async () => {
      document.body.innerHTML = `<mi-button value="submit">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.getAttribute("value")).toBe("submit");
    });

    test("value属性を更新すると、buttonのvalue属性にも反映される", async () => {
      document.body.innerHTML = `<mi-button value="submit">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.setAttribute("value", "cancel");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.getAttribute("value")).toBe("cancel");
    });

    test("value属性を設定しない場合、buttonのvalue属性は空文字になる", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.getAttribute("value")).toBe("");
    });
  });

  describe("type属性", () => {
    test("type属性を設定すると、buttonのtype属性にも反映される", async () => {
      document.body.innerHTML = `<mi-button type="submit">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.getAttribute("type")).toBe("submit");
    });

    test("type属性を更新すると、buttonのtype属性にも反映される", async () => {
      document.body.innerHTML = `<mi-button type="submit">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.setAttribute("type", "reset");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.getAttribute("type")).toBe("reset");
    });

    test("type属性を設定しない場合、buttonのtype属性はbuttonになる", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.getAttribute("type")).toBe("button");
    });
  });

  describe("disabled属性", () => {
    test("disabled属性にtrueを設定すると、buttonが無効になる", async () => {
      document.body.innerHTML = `<mi-button disabled="true">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.disabled).toBe(true);
    });

    test("disabled属性に空文字列を設定すると、buttonが無効になる", async () => {
      document.body.innerHTML = `<mi-button disabled>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.disabled).toBe(true);
    });

    test("disabled属性を削除すると、buttonが有効になる", async () => {
      document.body.innerHTML = `<mi-button disabled>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.removeAttribute("disabled");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.disabled).toBe(false);
    });

    test("disabled属性を更新（削除）すると、buttonには更新後の状態が反映される", async () => {
      document.body.innerHTML = `<mi-button disabled="true">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.removeAttribute("disabled");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.disabled).toBe(false);
    });

    test("disabled属性を設定しない場合、buttonが有効になる", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.disabled).toBe(false);
    });
  });

  describe("loading属性", () => {
    test("loading属性にtrueを設定すると、ローディングが表示され、buttonが無効になる", async () => {
      document.body.innerHTML = `<mi-button loading="true">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const loading = getLoading();
      expect(loading).toBeTruthy();

      const button = getButton();
      expect(button?.disabled).toBe(true);
    });

    test("loading属性に空文字列を設定すると、ローディングが表示され、buttonが無効になる", async () => {
      document.body.innerHTML = `<mi-button loading>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const loading = getLoading();
      expect(loading).toBeTruthy();

      const button = getButton();
      expect(button?.disabled).toBe(true);
    });

    test("loading属性を削除すると、ローディングが非表示になり、buttonが有効になる", async () => {
      document.body.innerHTML = `<mi-button loading>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.removeAttribute("loading");
      await spButton.updateComplete;

      const loading = getLoading();
      expect(loading).toBeFalsy();

      const button = getButton();
      expect(button?.disabled).toBe(false);
    });

    test("loading属性を更新（削除）すると、buttonには更新後の状態が反映される", async () => {
      document.body.innerHTML = `<mi-button loading="true">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.removeAttribute("loading");
      await spButton.updateComplete;

      const loading = getLoading();
      expect(loading).toBeFalsy();

      const button = getButton();
      expect(button?.disabled).toBe(false);
    });

    test("loading属性を設定しない場合、ローディングが非表示になり、buttonが有効になる", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const loading = getLoading();
      expect(loading).toBeFalsy();

      const button = getButton();
      expect(button?.disabled).toBe(false);
    });

    test("loading属性を設定した場合、iconが表示されない", async () => {
      document.body.innerHTML = `<mi-button loading="true" icon-type="download">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      const icon = spButton.shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeFalsy();
    });
  });

  describe("variant属性", () => {
    test("variant属性を設定すると、buttonに適切なクラスが適用される", async () => {
      document.body.innerHTML = `<mi-button variant="secondary">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("secondary")).toBe(true);
    });

    test("variant属性を更新すると、buttonのクラスが更新される", async () => {
      document.body.innerHTML = `<mi-button variant="primary">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.setAttribute("variant", "secondary");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.classList.contains("secondary")).toBe(true);
      expect(button?.classList.contains("primary")).toBe(false);
    });

    test("variant属性を設定しない場合、デフォルト値（primary）が使用される", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("primary")).toBe(true);
    });

    test("variant属性に無効な値を設定すると、デフォルト値（primary）が使用される", async () => {
      document.body.innerHTML = `<mi-button variant="invalid">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("primary")).toBe(true);
      expect(button?.classList.contains("invalid")).toBe(false);
    });
  });

  describe("variant属性", () => {
    test("variant属性を設定すると、buttonに適切なクラスが適用される", async () => {
      document.body.innerHTML = `<mi-button variant="secondary">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("secondary")).toBe(true);
    });

    test("variant属性を更新すると、buttonのクラスが更新される", async () => {
      document.body.innerHTML = `<mi-button variant="primary">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.setAttribute("variant", "tertiary");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.classList.contains("tertiary")).toBe(true);
      expect(button?.classList.contains("primary")).toBe(false);
    });

    test("variant属性を設定しない場合、デフォルト値（primary）が使用される", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("primary")).toBe(true);
    });

    test("variant属性に無効な値を設定すると、デフォルト値（primary）が使用される", async () => {
      document.body.innerHTML = `<mi-button variant="invalid">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("primary")).toBe(true);
      expect(button?.classList.contains("invalid")).toBe(false);
    });
  });

  describe("size属性", () => {
    test("size属性を設定すると、buttonに適切なクラスが適用される", async () => {
      document.body.innerHTML = `<mi-button size="large">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("large")).toBe(true);
    });

    test("size属性を更新すると、buttonのクラスが更新される", async () => {
      document.body.innerHTML = `<mi-button size="medium">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.setAttribute("size", "xLarge");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.classList.contains("x-large")).toBe(true);
      expect(button?.classList.contains("medium")).toBe(false);
    });

    test("size属性を設定しない場合、デフォルト値（medium）が使用される", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("medium")).toBe(true);
    });

    test("size属性に無効な値を設定すると、デフォルト値（medium）が使用される", async () => {
      document.body.innerHTML = `<mi-button size="invalid">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("medium")).toBe(true);
      expect(button?.classList.contains("invalid")).toBe(false);
    });
  });

  describe("danger属性", () => {
    test("danger属性にtrueを設定すると、buttonにdangerクラスが適用される", async () => {
      document.body.innerHTML = `<mi-button danger="true">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("danger")).toBe(true);
      expect(button?.classList.contains("normal")).toBe(false);
    });

    test("danger属性に空文字列を設定すると、buttonにdangerクラスが適用される", async () => {
      document.body.innerHTML = `<mi-button danger>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("danger")).toBe(true);
    });

    test("danger属性を削除すると、buttonにnormalクラスが適用される", async () => {
      document.body.innerHTML = `<mi-button danger>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.removeAttribute("danger");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.classList.contains("normal")).toBe(true);
      expect(button?.classList.contains("danger")).toBe(false);
    });

    test("danger属性を設定しない場合、buttonにnormalクラスが適用される", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("normal")).toBe(true);
    });
  });

  describe("icon-type属性", () => {
    test("icon-type属性に有効な値を設定すると、mi-iconが表示される", async () => {
      document.body.innerHTML = `<mi-button icon-type="check">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      const icon = spButton.shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute("type")).toBe("check");
    });

    test("icon-type属性を更新すると、mi-iconのtype属性が更新される", async () => {
      document.body.innerHTML = `<mi-button icon-type="check">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.setAttribute("icon-type", "cross");
      await spButton.updateComplete;

      const icon = spButton.shadowRoot?.querySelector("mi-icon");
      expect(icon?.getAttribute("type")).toBe("cross");
    });

    test("icon-type属性を削除すると、mi-iconが非表示になる", async () => {
      document.body.innerHTML = `<mi-button icon-type="check">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.removeAttribute("icon-type");
      await spButton.updateComplete;

      const icon = spButton.shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeFalsy();
    });

    test("icon-type属性を設定しない場合、mi-iconが表示されない", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      const icon = spButton.shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeFalsy();
    });

    test("icon-type属性に無効な値を設定すると、mi-iconが表示されない", async () => {
      document.body.innerHTML = `<mi-button icon-type="invalid-icon">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      const icon = spButton.shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeFalsy();
    });
  });

  describe("variants属性（非推奨）", () => {
    test("variants属性を設定すると、buttonに適切なクラスが適用される", async () => {
      document.body.innerHTML = `<mi-button variants="secondary">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("secondary")).toBe(true);
    });

    test("variants属性を更新すると、buttonのクラスが更新される", async () => {
      document.body.innerHTML = `<mi-button variants="primary">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const spButton = getMiButton();
      spButton.setAttribute("variants", "tertiary");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.classList.contains("tertiary")).toBe(true);
      expect(button?.classList.contains("primary")).toBe(false);
    });

    test("variants属性に無効な値を設定すると、デフォルト値（primary）が使用される", async () => {
      document.body.innerHTML = `<mi-button variants="invalid">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("primary")).toBe(true);
      expect(button?.classList.contains("invalid")).toBe(false);
    });

    test("variants属性が設定されていない場合、variant属性が使用される", async () => {
      document.body.innerHTML = `<mi-button variant="tertiary">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("tertiary")).toBe(true);
    });
  });
});
