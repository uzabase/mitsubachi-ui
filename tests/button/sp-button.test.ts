import "../../src/components/button/sp-button";

import { describe, expect, test } from "vitest";

import type { SpButton } from "../../src/components/button/sp-button";

function getSpButton() {
  return document.querySelector("sp-button") as SpButton;
}

function getButton(): HTMLButtonElement | undefined | null {
  return getSpButton().shadowRoot?.querySelector("button");
}

function getLoading() {
  return getSpButton().shadowRoot?.querySelector("sp-loading");
}

describe("sp-button", () => {
  describe("テキストのslot", () => {
    test("slotに文字列を渡すと、ボタンにその文字列が表示される", async () => {
      document.body.innerHTML = "<sp-button>ダウンロード</sp-button>";
      await customElements.whenDefined("sp-button");

      const button = getSpButton();

      expect(button.textContent).toBe("ダウンロード");
    });
  });

  describe("name属性", () => {
    test("name属性を設定すると、buttonのname属性にも反映される", async () => {
      document.body.innerHTML = `<sp-button name="submit">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.getAttribute("name")).toBe("submit");
    });

    test("name属性を更新すると、buttonのname属性にも反映される", async () => {
      document.body.innerHTML = `<sp-button name="submit">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      spButton.setAttribute("name", "cancel");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.getAttribute("name")).toBe("cancel");
    });

    test("name属性を設定しない場合、buttonのname属性は空文字になる", async () => {
      document.body.innerHTML = `<sp-button>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.getAttribute("name")).toBe("");
    });
  });

  describe("value属性", () => {
    test("value属性を設定すると、buttonのvalue属性にも反映される", async () => {
      document.body.innerHTML = `<sp-button value="submit">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.getAttribute("value")).toBe("submit");
    });

    test("value属性を更新すると、buttonのvalue属性にも反映される", async () => {
      document.body.innerHTML = `<sp-button value="submit">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      spButton.setAttribute("value", "cancel");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.getAttribute("value")).toBe("cancel");
    });

    test("value属性を設定しない場合、buttonのvalue属性は空文字になる", async () => {
      document.body.innerHTML = `<sp-button>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.getAttribute("value")).toBe("");
    });
  });

  describe("type属性", () => {
    test("type属性を設定すると、buttonのtype属性にも反映される", async () => {
      document.body.innerHTML = `<sp-button type="submit">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.getAttribute("type")).toBe("submit");
    });

    test("type属性を更新すると、buttonのtype属性にも反映される", async () => {
      document.body.innerHTML = `<sp-button type="submit">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      spButton.setAttribute("type", "reset");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.getAttribute("type")).toBe("reset");
    });

    test("type属性を設定しない場合、buttonのtype属性はbuttonになる", async () => {
      document.body.innerHTML = `<sp-button>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.getAttribute("type")).toBe("button");
    });
  });

  describe("disabled属性", () => {
    test("disabled属性にtrueを設定すると、buttonが無効になる", async () => {
      document.body.innerHTML = `<sp-button disabled="true">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.disabled).toBe(true);
    });

    test("disabled属性に空文字列を設定すると、buttonが無効になる", async () => {
      document.body.innerHTML = `<sp-button disabled>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.disabled).toBe(true);
    });

    test("disabled属性を削除すると、buttonが有効になる", async () => {
      document.body.innerHTML = `<sp-button disabled>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      spButton.removeAttribute("disabled");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.disabled).toBe(false);
    });

    test("disabled属性を更新（削除）すると、buttonには更新後の状態が反映される", async () => {
      document.body.innerHTML = `<sp-button disabled="true">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      spButton.removeAttribute("disabled");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.disabled).toBe(false);
    });

    test("disabled属性を設定しない場合、buttonが有効になる", async () => {
      document.body.innerHTML = `<sp-button>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.disabled).toBe(false);
    });
  });

  describe("loading属性", () => {
    test("loading属性にtrueを設定すると、ローディングが表示され、buttonが無効になる", async () => {
      document.body.innerHTML = `<sp-button loading="true">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const loading = getLoading();
      expect(loading).toBeTruthy();

      const button = getButton();
      expect(button?.disabled).toBe(true);
    });

    test("loading属性に空文字列を設定すると、ローディングが表示され、buttonが無効になる", async () => {
      document.body.innerHTML = `<sp-button loading>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const loading = getLoading();
      expect(loading).toBeTruthy();

      const button = getButton();
      expect(button?.disabled).toBe(true);
    });

    test("loading属性を削除すると、ローディングが非表示になり、buttonが有効になる", async () => {
      document.body.innerHTML = `<sp-button loading>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      spButton.removeAttribute("loading");
      await spButton.updateComplete;

      const loading = getLoading();
      expect(loading).toBeFalsy();

      const button = getButton();
      expect(button?.disabled).toBe(false);
    });

    test("loading属性を更新（削除）すると、buttonには更新後の状態が反映される", async () => {
      document.body.innerHTML = `<sp-button loading="true">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      spButton.removeAttribute("loading");
      await spButton.updateComplete;

      const loading = getLoading();
      expect(loading).toBeFalsy();

      const button = getButton();
      expect(button?.disabled).toBe(false);
    });

    test("loading属性を設定しない場合、ローディングが非表示になり、buttonが有効になる", async () => {
      document.body.innerHTML = `<sp-button>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const loading = getLoading();
      expect(loading).toBeFalsy();

      const button = getButton();
      expect(button?.disabled).toBe(false);
    });
  });

  describe("variants属性", () => {
    test("variants属性を設定すると、buttonに適切なクラスが適用される", async () => {
      document.body.innerHTML = `<sp-button variants="secondary">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.classList.contains("secondary")).toBe(true);
    });

    test("variants属性を更新すると、buttonのクラスが更新される", async () => {
      document.body.innerHTML = `<sp-button variants="primary">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      spButton.setAttribute("variants", "secondary");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.classList.contains("secondary")).toBe(true);
      expect(button?.classList.contains("primary")).toBe(false);
    });

    test("variants属性を設定しない場合、デフォルト値（primary）が使用される", async () => {
      document.body.innerHTML = `<sp-button>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.classList.contains("primary")).toBe(true);
    });

    test("variants属性に無効な値を設定すると、デフォルト値（primary）が使用される", async () => {
      document.body.innerHTML = `<sp-button variants="invalid">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.classList.contains("primary")).toBe(true);
      expect(button?.classList.contains("invalid")).toBe(false);
    });
  });

  describe("variant属性", () => {
    test("variant属性を設定すると、buttonに適切なクラスが適用される", async () => {
      document.body.innerHTML = `<sp-button variant="secondary">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.classList.contains("secondary")).toBe(true);
    });

    test("variant属性を更新すると、buttonのクラスが更新される", async () => {
      document.body.innerHTML = `<sp-button variant="primary">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      spButton.setAttribute("variant", "tertiary");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.classList.contains("tertiary")).toBe(true);
      expect(button?.classList.contains("primary")).toBe(false);
    });

    test("variant属性を設定しない場合、デフォルト値（primary）が使用される", async () => {
      document.body.innerHTML = `<sp-button>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.classList.contains("primary")).toBe(true);
    });

    test("variant属性に無効な値を設定すると、デフォルト値（primary）が使用される", async () => {
      document.body.innerHTML = `<sp-button variant="invalid">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.classList.contains("primary")).toBe(true);
      expect(button?.classList.contains("invalid")).toBe(false);
    });
  });

  describe("size属性", () => {
    test("size属性を設定すると、buttonに適切なクラスが適用される", async () => {
      document.body.innerHTML = `<sp-button size="large">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.classList.contains("large")).toBe(true);
    });

    test("size属性を更新すると、buttonのクラスが更新される", async () => {
      document.body.innerHTML = `<sp-button size="medium">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      spButton.setAttribute("size", "xLarge");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.classList.contains("x-large")).toBe(true);
      expect(button?.classList.contains("medium")).toBe(false);
    });

    test("size属性を設定しない場合、デフォルト値（medium）が使用される", async () => {
      document.body.innerHTML = `<sp-button>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.classList.contains("medium")).toBe(true);
    });

    test("size属性に無効な値を設定すると、デフォルト値（medium）が使用される", async () => {
      document.body.innerHTML = `<sp-button size="invalid">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.classList.contains("medium")).toBe(true);
      expect(button?.classList.contains("invalid")).toBe(false);
    });
  });

  describe("danger属性", () => {
    test("danger属性にtrueを設定すると、buttonにdangerクラスが適用される", async () => {
      document.body.innerHTML = `<sp-button danger="true">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.classList.contains("danger")).toBe(true);
      expect(button?.classList.contains("normal")).toBe(false);
    });

    test("danger属性に空文字列を設定すると、buttonにdangerクラスが適用される", async () => {
      document.body.innerHTML = `<sp-button danger>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.classList.contains("danger")).toBe(true);
    });

    test("danger属性を削除すると、buttonにnormalクラスが適用される", async () => {
      document.body.innerHTML = `<sp-button danger>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      spButton.removeAttribute("danger");
      await spButton.updateComplete;

      const button = getButton();
      expect(button?.classList.contains("normal")).toBe(true);
      expect(button?.classList.contains("danger")).toBe(false);
    });

    test("danger属性を設定しない場合、buttonにnormalクラスが適用される", async () => {
      document.body.innerHTML = `<sp-button>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const button = getButton();
      expect(button?.classList.contains("normal")).toBe(true);
    });
  });

  describe("icon-type属性", () => {
    test("icon-type属性に有効な値を設定すると、sp-iconが表示される", async () => {
      document.body.innerHTML = `<sp-button icon-type="check">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      const icon = spButton.shadowRoot?.querySelector("sp-icon");
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute("type")).toBe("check");
    });

    test("icon-type属性を更新すると、sp-iconのtype属性が更新される", async () => {
      document.body.innerHTML = `<sp-button icon-type="check">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      spButton.setAttribute("icon-type", "cross");
      await spButton.updateComplete;

      const icon = spButton.shadowRoot?.querySelector("sp-icon");
      expect(icon?.getAttribute("type")).toBe("cross");
    });

    test("icon-type属性を削除すると、sp-iconが非表示になる", async () => {
      document.body.innerHTML = `<sp-button icon-type="check">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      spButton.removeAttribute("icon-type");
      await spButton.updateComplete;

      const icon = spButton.shadowRoot?.querySelector("sp-icon");
      expect(icon).toBeFalsy();
    });

    test("icon-type属性を設定しない場合、sp-iconが表示されない", async () => {
      document.body.innerHTML = `<sp-button>ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      const icon = spButton.shadowRoot?.querySelector("sp-icon");
      expect(icon).toBeFalsy();
    });

    test("icon-type属性に無効な値を設定すると、sp-iconが表示されない", async () => {
      document.body.innerHTML = `<sp-button icon-type="invalid-icon">ダウンロード</sp-button>`;
      await customElements.whenDefined("sp-button");

      const spButton = getSpButton();
      const icon = spButton.shadowRoot?.querySelector("sp-icon");
      expect(icon).toBeFalsy();
    });
  });
});
