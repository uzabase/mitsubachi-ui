import "../../src/components/button/mi-neutral-button";

import { describe, expect, test } from "vitest";

import type { MiButton } from "../../src/components/button/mi-neutral-button";

function getMiButton() {
  return document.querySelector("mi-button") as MiButton;
}

function getButton(): HTMLButtonElement | undefined | null {
  return getMiButton().shadowRoot?.querySelector("button");
}

function getAnchor(): HTMLAnchorElement | undefined | null {
  return getMiButton().shadowRoot?.querySelector("a");
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

      const miButton = getMiButton();
      miButton.setAttribute("name", "cancel");
      await miButton.updateComplete;

      const button = getButton();
      expect(button?.getAttribute("name")).toBe("cancel");
    });

    test("name属性を設定しない場合、buttonのname属性は付与されない", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.getAttribute("name")).toBeNull();
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

      const miButton = getMiButton();
      miButton.setAttribute("value", "cancel");
      await miButton.updateComplete;

      const button = getButton();
      expect(button?.getAttribute("value")).toBe("cancel");
    });

    test("value属性を設定しない場合、buttonのvalue属性は付与されない", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.getAttribute("value")).toBeNull();
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

      const miButton = getMiButton();
      miButton.setAttribute("type", "reset");
      await miButton.updateComplete;

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

      const miButton = getMiButton();
      miButton.removeAttribute("disabled");
      await miButton.updateComplete;

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
    test("loading属性を設定すると、ローディングが表示され、buttonが無効になる", async () => {
      document.body.innerHTML = `<mi-button loading>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getLoading()).toBeTruthy();
      expect(getButton()?.disabled).toBe(true);
    });

    test("loading属性を削除すると、ローディングが非表示になり、buttonが有効になる", async () => {
      document.body.innerHTML = `<mi-button loading>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const miButton = getMiButton();
      miButton.removeAttribute("loading");
      await miButton.updateComplete;

      expect(getLoading()).toBeFalsy();
      expect(getButton()?.disabled).toBe(false);
    });

    test("loading属性を設定しない場合、ローディングが非表示でbuttonが有効になる", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getLoading()).toBeFalsy();
      expect(getButton()?.disabled).toBe(false);
    });

    test("loading属性を設定した場合、iconが表示されない", async () => {
      document.body.innerHTML = `<mi-button loading icon-type="download">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const icon = getMiButton().shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeFalsy();
    });

    test("loading属性を設定すると、aria-busy='true' が付与される", async () => {
      document.body.innerHTML = `<mi-button loading>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getButton()?.getAttribute("aria-busy")).toBe("true");
    });

    test("loading属性を設定しない場合、aria-busy属性は付与されない", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getButton()?.getAttribute("aria-busy")).toBeNull();
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

      const miButton = getMiButton();
      miButton.setAttribute("variant", "secondary");
      await miButton.updateComplete;

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

      const miButton = getMiButton();
      miButton.setAttribute("size", "xLarge");
      await miButton.updateComplete;

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
    test("danger属性を設定すると、buttonにdangerクラスが適用される", async () => {
      document.body.innerHTML = `<mi-button danger>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const button = getButton();
      expect(button?.classList.contains("danger")).toBe(true);
      expect(button?.classList.contains("normal")).toBe(false);
    });

    test("danger属性を削除すると、buttonにnormalクラスが適用される", async () => {
      document.body.innerHTML = `<mi-button danger>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const miButton = getMiButton();
      miButton.removeAttribute("danger");
      await miButton.updateComplete;

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

      const icon = getMiButton().shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute("type")).toBe("check");
    });

    test("icon-type属性を更新すると、mi-iconのtype属性が更新される", async () => {
      document.body.innerHTML = `<mi-button icon-type="check">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const miButton = getMiButton();
      miButton.setAttribute("icon-type", "cross");
      await miButton.updateComplete;

      const icon = miButton.shadowRoot?.querySelector("mi-icon");
      expect(icon?.getAttribute("type")).toBe("cross");
    });

    test("icon-type属性を削除すると、mi-iconが非表示になる", async () => {
      document.body.innerHTML = `<mi-button icon-type="check">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const miButton = getMiButton();
      miButton.removeAttribute("icon-type");
      await miButton.updateComplete;

      const icon = miButton.shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeFalsy();
    });

    test("icon-type属性を設定しない場合、mi-iconが表示されない", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const icon = getMiButton().shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeFalsy();
    });

    test("icon-type属性に無効な値を設定すると、mi-iconが表示されない", async () => {
      document.body.innerHTML = `<mi-button icon-type="invalid-icon">ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const icon = getMiButton().shadowRoot?.querySelector("mi-icon");
      expect(icon).toBeFalsy();
    });
  });

  describe("selected属性", () => {
    test("selected属性を設定すると、buttonにselectedクラスが付与される", async () => {
      document.body.innerHTML = `<mi-button selected>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getButton()?.classList.contains("selected")).toBe(true);
    });

    test("selected属性を削除すると、selectedクラスが除去される", async () => {
      document.body.innerHTML = `<mi-button selected>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const miButton = getMiButton();
      miButton.removeAttribute("selected");
      await miButton.updateComplete;

      expect(getButton()?.classList.contains("selected")).toBe(false);
    });

    test("selected属性を設定しない場合、selectedクラスは付与されない", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getButton()?.classList.contains("selected")).toBe(false);
    });
  });

  describe("toggle属性・aria-pressed", () => {
    test("toggle属性を設定しない場合、aria-pressed属性は付与されない", async () => {
      document.body.innerHTML = `<mi-button selected>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getButton()?.getAttribute("aria-pressed")).toBeNull();
    });

    test("toggle=true かつ selected=false の場合、aria-pressed='false' が付与される", async () => {
      document.body.innerHTML = `<mi-button toggle>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getButton()?.getAttribute("aria-pressed")).toBe("false");
    });

    test("toggle=true かつ selected=true の場合、aria-pressed='true' が付与される", async () => {
      document.body.innerHTML = `<mi-button toggle selected>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getButton()?.getAttribute("aria-pressed")).toBe("true");
    });

    test("toggle=true の状態で selected を変更すると、aria-pressed が更新される", async () => {
      document.body.innerHTML = `<mi-button toggle>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const miButton = getMiButton();
      miButton.setAttribute("selected", "");
      await miButton.updateComplete;

      expect(getButton()?.getAttribute("aria-pressed")).toBe("true");
    });
  });

  describe("クリックイベント", () => {
    test("ボタンをクリックすると、clickイベントが1回だけ発火する", async () => {
      document.body.innerHTML = `<mi-button>ダウンロード</mi-button>`;
      await customElements.whenDefined("mi-button");

      const miButton = getMiButton();
      let clickCount = 0;
      miButton.addEventListener("click", () => {
        clickCount++;
      });

      getButton()?.click();
      expect(clickCount).toBe(1);
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

      const miButton = getMiButton();
      miButton.setAttribute("variants", "tertiary");
      await miButton.updateComplete;

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

  describe("href属性（リンクとしてのレンダリング）", () => {
    test("href属性を設定すると、<a>タグがレンダリングされ<button>はレンダリングされない", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com">リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getAnchor()).toBeTruthy();
      expect(getButton()).toBeFalsy();
    });

    test("href属性を設定しない場合、<button>タグがレンダリングされ<a>はレンダリングされない", async () => {
      document.body.innerHTML = `<mi-button>ボタン</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getButton()).toBeTruthy();
      expect(getAnchor()).toBeFalsy();
    });

    test("href属性の値が<a>のhref属性に反映される", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com">リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getAnchor()?.getAttribute("href")).toBe("https://example.com");
    });

    test("href属性を更新すると、<a>のhref属性も更新される", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com">リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      const miButton = getMiButton();
      miButton.setAttribute("href", "https://other.com");
      await miButton.updateComplete;

      expect(getAnchor()?.getAttribute("href")).toBe("https://other.com");
    });

    test("target属性を設定すると、<a>のtarget属性に反映される", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com" target="_blank">リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getAnchor()?.getAttribute("target")).toBe("_blank");
    });

    test('target="_blank"の場合、rel="noopener noreferrer"が自動で付与される', async () => {
      document.body.innerHTML = `<mi-button href="https://example.com" target="_blank">リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getAnchor()?.getAttribute("rel")).toBe("noopener noreferrer");
    });

    test("target属性を設定しない場合、rel属性は付与されない", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com">リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getAnchor()?.getAttribute("rel")).toBeNull();
    });

    test("rel属性を明示的に設定すると、その値が使われる", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com" target="_blank" rel="noopener">リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getAnchor()?.getAttribute("rel")).toBe("noopener");
    });

    test("<a>にはrole='button'が付与されない", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com">リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      expect(getAnchor()?.getAttribute("role")).toBeNull();
    });

    test("variant・sizeのクラスが<a>にも適用される", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com" variant="secondary" size="large">リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      const anchor = getAnchor();
      expect(anchor?.classList.contains("secondary")).toBe(true);
      expect(anchor?.classList.contains("large")).toBe(true);
    });

    test("disabled時はhref属性が削除され、aria-disabled='true'が付与される", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com" disabled>リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      const anchor = getAnchor();
      expect(anchor?.getAttribute("href")).toBeNull();
      expect(anchor?.getAttribute("aria-disabled")).toBe("true");
    });

    test("loading時はhref属性が削除され、aria-disabled='true'とaria-busy='true'が付与される", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com" loading>リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      const anchor = getAnchor();
      expect(anchor?.getAttribute("href")).toBeNull();
      expect(anchor?.getAttribute("aria-disabled")).toBe("true");
      expect(anchor?.getAttribute("aria-busy")).toBe("true");
    });

    test("disabled時にクリックしてもclickイベントが発火しない", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com" disabled>リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      const miButton = getMiButton();
      let clickCount = 0;
      miButton.addEventListener("click", () => {
        clickCount++;
      });

      getAnchor()?.click();
      expect(clickCount).toBe(0);
    });

    test("loading時にクリックしてもclickイベントが発火しない", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com" loading>リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      const miButton = getMiButton();
      let clickCount = 0;
      miButton.addEventListener("click", () => {
        clickCount++;
      });

      getAnchor()?.click();
      expect(clickCount).toBe(0);
    });

    test("リンクボタンをクリックすると、clickイベントが1回だけ発火する", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com">リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      const miButton = getMiButton();
      let clickCount = 0;
      miButton.addEventListener("click", () => {
        clickCount++;
      });

      getAnchor()?.click();
      expect(clickCount).toBe(1);
    });

    test("消費者がpreventDefaultするとナビゲーションがキャンセルされる", async () => {
      document.body.innerHTML = `<mi-button href="https://example.com">リンク</mi-button>`;
      await customElements.whenDefined("mi-button");

      const miButton = getMiButton();
      miButton.addEventListener("click", (e) => {
        e.preventDefault();
      });

      const anchor = getAnchor()!;
      let defaultPrevented = false;
      anchor.addEventListener("click", (e) => {
        defaultPrevented = e.defaultPrevented;
      });

      anchor.click();
      expect(defaultPrevented).toBe(true);
    });
  });

  describe("フォーム連携", () => {
    test("type=reset であれば input.value が初期値に戻る", async () => {
      document.body.innerHTML = `
        <form>
          <input name="surname" value="initial">
          <mi-button type="reset">Reset</mi-button>
        </form>
      `;
      await customElements.whenDefined("mi-button");

      const input = document.querySelector("input")!;
      input.value = "Smith";
      getButton()?.click();
      expect(input.value).toBe("initial");
    });

    test("type=submit かつ name が設定されている場合、formData に name と value が含まれる", async () => {
      document.body.innerHTML = `
        <form>
          <mi-button name="foo" value="bar" type="submit">Submit</mi-button>
        </form>
      `;
      await customElements.whenDefined("mi-button");

      const form = document.querySelector("form") as HTMLFormElement;
      let submittedData: FormData | null = null;
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        submittedData = new FormData(form);
      });
      getButton()?.click();
      expect(submittedData!.get("foo")).toBe("bar");
    });
  });
});
