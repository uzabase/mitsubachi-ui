import "../../src/components/select-box/mi-select-box";
import "../../src/components/menu/mi-select-menu-item";

import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import type { MiSelectBox } from "../../src/components/select-box/mi-select-box";

const setup = async (html: string) => {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-select-box");
  await customElements.whenDefined("mi-select-menu-item");

  const element = document.querySelector("mi-select-box") as MiSelectBox;
  await element.updateComplete;

  return {
    element,
    button: element.shadowRoot!.querySelector("button")!,
    items: Array.from(document.querySelectorAll("mi-select-menu-item")),
  };
};

const withItems = (attrs = "") => `
  <mi-select-box ${attrs}>
    <mi-select-menu-item value="sales">営業</mi-select-menu-item>
    <mi-select-menu-item value="marketing">マーケティング</mi-select-menu-item>
  </mi-select-box>
`;

describe("mi-select-box", () => {
  test("デフォルトプロパティが正しく設定される", async () => {
    const { element } = await setup(`<mi-select-box></mi-select-box>`);

    expect(element.variant).toBe("primary");
    expect(element.size).toBe("medium");
    expect(element.placeholder).toBe("");
    expect(element.value).toBe("");
    expect(element.name).toBe("");
    expect(element.error).toBe("");
    expect(element.disabled).toBe(false);
  });

  describe("選択肢を子要素として受け取る", () => {
    test("mi-menu で囲まなくても単体でドロップダウンを持つ", async () => {
      const { element } = await setup(withItems());

      expect(element.shadowRoot!.querySelector("mi-menu")).not.toBeNull();
      expect(
        element.shadowRoot!.querySelector("mi-menu-dropdown"),
      ).not.toBeNull();
      expect(
        element.shadowRoot!.querySelector("mi-menu-radio-group"),
      ).not.toBeNull();
    });

    test("項目を選ぶと value と表示テキストが更新される", async () => {
      const { element, items } = await setup(withItems());

      items[1].click();
      await element.updateComplete;

      expect(element.value).toBe("marketing");
      expect(element.displayText).toBe("マーケティング");

      const text = element.shadowRoot!.querySelector(".text")!;
      expect(text.textContent?.trim()).toBe("マーケティング");
    });

    test("value を指定すると対応する項目のテキストが表示される", async () => {
      const { element } = await setup(withItems(`value="sales"`));

      expect(element.displayText).toBe("営業");

      const text = element.shadowRoot!.querySelector(".text")!;
      expect(text.textContent?.trim()).toBe("営業");
      expect(text.classList.contains("placeholder")).toBe(false);
    });

    test("選択中の項目にチェックが付く（slot 越しに selected が解決される）", async () => {
      const { element, items } = await setup(withItems());

      items[0].click();
      await element.updateComplete;
      await (items[0] as HTMLElement & { updateComplete: Promise<unknown> })
        .updateComplete;

      expect(items[0].hasAttribute("selected")).toBe(true);
      expect(items[0].getAttribute("aria-selected")).toBe("true");
      expect(items[1].hasAttribute("selected")).toBe(false);
    });

    test("選択肢が listbox の子として正しい role を持つ", async () => {
      const { items } = await setup(withItems(`value="sales"`));

      for (const item of items) {
        await (item as HTMLElement & { updateComplete: Promise<unknown> })
          .updateComplete;
      }

      // ドロップダウンは role="listbox" なので、子は option でなければならない
      // （menuitemradio は menu 用）
      expect(items[0].getAttribute("role")).toBe("option");
      expect(items[1].getAttribute("role")).toBe("option");
      expect(items[0].getAttribute("aria-selected")).toBe("true");
      expect(items[1].getAttribute("aria-selected")).toBe("false");
      expect(items[0].hasAttribute("aria-checked")).toBe(false);
    });

    test("value を後から書き換えると表示テキストが追従する", async () => {
      const { element } = await setup(withItems(`value="sales"`));
      expect(element.displayText).toBe("営業");

      element.value = "marketing";
      await element.updateComplete;

      expect(element.displayText).toBe("マーケティング");
      expect(
        element.shadowRoot!.querySelector(".text")!.textContent?.trim(),
      ).toBe("マーケティング");
    });

    test("選択肢を後から追加すると表示テキストが追従する", async () => {
      const { element } = await setup(withItems(`value="hr"`));
      // まだ対応する選択肢が無いので placeholder のまま
      expect(element.displayText).toBe("");

      const item = document.createElement("mi-select-menu-item");
      item.setAttribute("value", "hr");
      item.textContent = "人事";
      element.appendChild(item);
      await element.updateComplete;

      expect(element.displayText).toBe("人事");
    });

    test("value が空のとき placeholder が表示される", async () => {
      const { element } = await setup(
        withItems(`placeholder="選択してください"`),
      );

      const text = element.shadowRoot!.querySelector(".text")!;
      expect(text.textContent?.trim()).toBe("選択してください");
      expect(text.classList.contains("placeholder")).toBe(true);
    });
  });

  describe("ドロップダウンの開閉", () => {
    test("トリガーをクリックすると開き、aria-expanded が true になる", async () => {
      const { element, button } = await setup(withItems());

      expect(button.getAttribute("aria-expanded")).toBe("false");

      button.click();
      const menu = element.shadowRoot!.querySelector("mi-menu")!;
      await menu.updateComplete;
      await element.updateComplete;

      expect(menu.open).toBe(true);
      expect(
        element
          .shadowRoot!.querySelector("button")!
          .getAttribute("aria-expanded"),
      ).toBe("true");
    });

    test("secondary ではドロップダウンが中身の幅に合わせる", async () => {
      const { element, button } = await setup(withItems(`variant="secondary"`));

      button.click();
      await element.shadowRoot!.querySelector("mi-menu")!.updateComplete;

      const dropdown = element.shadowRoot!.querySelector("mi-menu-dropdown")!;
      // width=0 は mi-menu-dropdown 側で fit-content として扱われる
      expect(dropdown.width).toBe(0);

      const popup = dropdown.shadowRoot!.querySelector(".popup") as HTMLElement;
      expect(popup.hasAttribute("data-fit-content")).toBe(true);
      // トリガーが狭くても、選択肢に合わせてトリガーより広がる（上限 320px）
      expect(popup.offsetWidth).toBeGreaterThan(button.offsetWidth);
      expect(popup.offsetWidth).toBeLessThanOrEqual(320);
    });

    test("primary は全幅になり、ドロップダウンも同じ幅になる", async () => {
      document.body.innerHTML = `
        <div style="width: 600px;">
          ${withItems(`variant="primary"`)}
        </div>
      `;
      await customElements.whenDefined("mi-select-box");
      await customElements.whenDefined("mi-select-menu-item");

      const element = document.querySelector("mi-select-box") as MiSelectBox;
      await element.updateComplete;

      const button = element.shadowRoot!.querySelector("button")!;
      button.click();
      await element.shadowRoot!.querySelector("mi-menu")!.updateComplete;

      const popup = element
        .shadowRoot!.querySelector("mi-menu-dropdown")!
        .shadowRoot!.querySelector(".popup") as HTMLElement;

      // 選択肢は短いが、トリガー幅が最小幅として効くので 320px の上限を超えて広がる
      expect(button.offsetWidth).toBe(600);
      expect(popup.offsetWidth).toBe(600);
    });

    test("項目を選ぶと閉じる", async () => {
      const { element, button, items } = await setup(withItems());

      button.click();
      const menu = element.shadowRoot!.querySelector("mi-menu")!;
      await menu.updateComplete;

      items[0].click();
      await menu.updateComplete;

      expect(menu.open).toBe(false);
    });
  });

  // element.click() は mousedown を伴わないため、外側クリック判定の不具合を見逃す。
  // 実際のポインタ操作でも一連の流れが成立することを確認する。
  describe("実際のマウス操作", () => {
    test("トリガーを押して項目を選ぶと value と表示テキストが更新される", async () => {
      const { element } = await setup(withItems());

      const button = element.shadowRoot!.querySelector("button")!;
      await page.elementLocator(button).click();

      const menu = element.shadowRoot!.querySelector("mi-menu")!;
      await menu.updateComplete;
      expect(menu.open).toBe(true);

      const item = document.querySelector(
        'mi-select-menu-item[value="sales"]',
      ) as HTMLElement;
      await page.elementLocator(item).click();
      await element.updateComplete;

      expect(element.value).toBe("sales");
      expect(element.displayText).toBe("営業");
      expect(
        element.shadowRoot!.querySelector(".text")!.textContent?.trim(),
      ).toBe("営業");
    });

    test("外側をクリックすると閉じ、値は変わらない", async () => {
      document.body.innerHTML = `<div id="outside" style="height: 80px;">外</div>${withItems()}`;
      await customElements.whenDefined("mi-select-box");
      await customElements.whenDefined("mi-select-menu-item");

      const element = document.querySelector("mi-select-box") as MiSelectBox;
      await element.updateComplete;

      const menu = element.shadowRoot!.querySelector("mi-menu")!;
      await page
        .elementLocator(element.shadowRoot!.querySelector("button")!)
        .click();
      await menu.updateComplete;
      expect(menu.open).toBe(true);

      await page.elementLocator(document.querySelector("#outside")!).click();
      await menu.updateComplete;

      expect(menu.open).toBe(false);
      expect(element.value).toBe("");
    });
  });

  // イベントハンドラ系は「正常系 / デフォルト動作 / エッジケース」の3観点で確認する。
  // mi-menu-dropdown の矢印キー処理は slot 越しでも動く必要があるため、実キー操作で検証する。
  describe("キーボード操作", () => {
    const tick = () => new Promise((r) => setTimeout(r, 80));

    const openByKeyboard = async () => {
      const { element } = await setup(`
        <mi-select-box placeholder="選択">
          <mi-select-menu-item value="a">A</mi-select-menu-item>
          <mi-select-menu-item value="b">B</mi-select-menu-item>
          <mi-select-menu-item value="c">C</mi-select-menu-item>
        </mi-select-box>
      `);
      const items = Array.from(
        document.querySelectorAll("mi-select-menu-item"),
      );
      (element.shadowRoot!.querySelector("button") as HTMLElement).focus();
      await userEvent.keyboard("{Enter}");
      await tick();

      return {
        element,
        items,
        menu: element.shadowRoot!.querySelector("mi-menu")!,
        focusedIndex: () => items.findIndex((i) => i.matches(":focus")),
      };
    };

    test("Enter で開き、先頭の項目にフォーカスが移る", async () => {
      const { menu, focusedIndex } = await openByKeyboard();

      expect(menu.open).toBe(true);
      expect(focusedIndex()).toBe(0);
    });

    test("↓ で次、↑ で前の項目にフォーカスが移る", async () => {
      const { focusedIndex } = await openByKeyboard();

      await userEvent.keyboard("{ArrowDown}");
      await tick();
      expect(focusedIndex()).toBe(1);

      await userEvent.keyboard("{ArrowDown}");
      await tick();
      expect(focusedIndex()).toBe(2);

      await userEvent.keyboard("{ArrowUp}");
      await tick();
      expect(focusedIndex()).toBe(1);
    });

    test("Enter で項目を選択できる", async () => {
      const { element } = await openByKeyboard();

      await userEvent.keyboard("{ArrowDown}");
      await tick();
      await userEvent.keyboard("{Enter}");
      await tick();

      expect(element.value).toBe("b");
      expect(element.displayText).toBe("B");
    });

    test("Escape で閉じ、トリガーにフォーカスが戻る", async () => {
      const { element, menu } = await openByKeyboard();

      await userEvent.keyboard("{Escape}");
      await tick();

      expect(menu.open).toBe(false);
      expect(element.shadowRoot!.activeElement).toBe(
        element.shadowRoot!.querySelector("button"),
      );
    });

    test("disabled のときはトリガーを押しても開かない", async () => {
      const { element, button } = await setup(withItems("disabled"));

      button.click();
      const menu = element.shadowRoot!.querySelector("mi-menu")!;
      await menu.updateComplete;

      expect(menu.open).toBe(false);
    });
  });

  describe("フォーム連携", () => {
    test("name を指定すると FormData に値が含まれる", async () => {
      document.body.innerHTML = `
        <form>
          ${withItems(`name="department"`)}
        </form>
      `;
      await customElements.whenDefined("mi-select-box");
      await customElements.whenDefined("mi-select-menu-item");

      const element = document.querySelector("mi-select-box") as MiSelectBox;
      await element.updateComplete;

      document.querySelectorAll("mi-select-menu-item")[0].click();
      await element.updateComplete;

      const formData = new FormData(document.querySelector("form")!);
      expect(formData.get("department")).toBe("sales");
    });

    test("disabled のときは送信値に含まれない", async () => {
      document.body.innerHTML = `
        <form>
          ${withItems(`name="enabled" value="sales"`)}
          ${withItems(`name="disabledOne" value="sales" disabled`)}
        </form>
      `;
      await customElements.whenDefined("mi-select-box");
      await customElements.whenDefined("mi-select-menu-item");

      for (const el of document.querySelectorAll("mi-select-box")) {
        await el.updateComplete;
      }

      const formData = new FormData(document.querySelector("form")!);
      expect(formData.get("enabled")).toBe("sales");
      expect(formData.get("disabledOne")).toBeNull();
    });
  });

  describe("イベント", () => {
    test("選択時に change が1回だけ発火する", async () => {
      const { element, items } = await setup(withItems());

      const handler = vi.fn();
      element.addEventListener("change", handler);

      items[1].click();

      expect(handler).toHaveBeenCalledTimes(1);
      expect(element.value).toBe("marketing");
    });

    // ネイティブの <select> の change と同じ値にする（bubbles: true / composed: false）
    test("change はネイティブの select と同じ bubbles / composed を持つ", async () => {
      const { element, items } = await setup(withItems());

      const handler = vi.fn();
      element.addEventListener("change", handler);

      items[0].click();

      const event = handler.mock.calls[0][0] as Event;
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(false);
    });

    test("change は祖先要素でも受け取れる", async () => {
      document.body.innerHTML = `<form id="outer">${withItems()}</form>`;
      await customElements.whenDefined("mi-select-box");
      await customElements.whenDefined("mi-select-menu-item");

      const element = document.querySelector("mi-select-box") as MiSelectBox;
      await element.updateComplete;

      const formHandler = vi.fn();
      document.querySelector("#outer")!.addEventListener("change", formHandler);

      document.querySelectorAll("mi-select-menu-item")[0].click();

      // ネイティブの <select> と同じく、form でまとめて拾える
      expect(formHandler).toHaveBeenCalledTimes(1);
    });

    test("同じ値を選び直したときは change が発火しない", async () => {
      const { element, items } = await setup(withItems(`value="sales"`));

      const handler = vi.fn();
      element.addEventListener("change", handler);

      // すでに選択済みの項目をもう一度選ぶ（ネイティブの select と同じ挙動）
      items[0].click();

      expect(handler).not.toHaveBeenCalled();
      expect(element.value).toBe("sales");
    });

    test("内部連絡用の menu-item-activate が外に漏れない", async () => {
      document.body.innerHTML = `<div id="outer">${withItems()}</div>`;
      await customElements.whenDefined("mi-select-box");
      await customElements.whenDefined("mi-select-menu-item");

      const element = document.querySelector("mi-select-box") as MiSelectBox;
      await element.updateComplete;

      const outerHandler = vi.fn();
      document
        .querySelector("#outer")!
        .addEventListener("menu-item-activate", outerHandler);

      // 内部では機能している（選択でメニューが閉じる）ことも確認する
      const menu = element.shadowRoot!.querySelector("mi-menu")!;
      element.shadowRoot!.querySelector("button")!.click();
      await menu.updateComplete;

      document.querySelectorAll("mi-select-menu-item")[0].click();
      await menu.updateComplete;

      expect(menu.open).toBe(false);
      expect(outerHandler).not.toHaveBeenCalled();
    });

    test("外側に届く change は mi-select-box 自身のものだけ（内部の radio-group は漏れない）", async () => {
      const { element, items } = await setup(withItems());

      const outerHandler = vi.fn();
      document.body.addEventListener("change", outerHandler);

      items[0].click();

      // radio-group の change も止めずにいると 2 回発火してしまう
      expect(outerHandler).toHaveBeenCalledTimes(1);
      expect(outerHandler.mock.calls[0][0].target).toBe(element);
      document.body.removeEventListener("change", outerHandler);
    });
  });

  describe("表示", () => {
    test("disabled が設定されると button が disabled になる", async () => {
      const { button } = await setup(withItems("disabled"));

      expect(button.disabled).toBe(true);
    });

    test("error が設定されると mi-helper-text でエラーが表示される", async () => {
      const { element, button } = await setup(
        withItems(`error="選択は必須です"`),
      );

      expect(button.classList.contains("error")).toBe(true);
      expect(button.getAttribute("aria-invalid")).toBe("true");

      const helperText = element.shadowRoot!.querySelector("mi-helper-text")!;
      expect(helperText.getAttribute("status")).toBe("error");
      expect(helperText.textContent).toContain("選択は必須です");
    });

    test("エラーが aria-describedby でボタンに紐付く", async () => {
      const { element, button } = await setup(
        withItems(`error="選択は必須です"`),
      );

      const describedBy = button.getAttribute("aria-describedby")!;
      expect(describedBy).not.toBe("");

      const described = element.shadowRoot!.getElementById(describedBy)!;
      expect(described.textContent).toContain("選択は必須です");
    });

    test("エラーがないときは aria-describedby が空になる", async () => {
      const { button } = await setup(withItems());

      expect(button.getAttribute("aria-describedby")).toBe("");
      expect(button.getAttribute("aria-invalid")).toBe("false");
    });

    test.each(["primary", "secondary"])(
      "%s のエラー中に hover すると枠線が濃くなる",
      async (variant) => {
        const { button } = await setup(
          withItems(`variant="${variant}" error="エラー"`),
        );

        // border/error-default
        expect(getComputedStyle(button).borderColor).toBe("rgb(219, 53, 31)");

        await page.elementLocator(button).hover();
        // border/error-hover
        expect(getComputedStyle(button).borderColor).toBe("rgb(176, 36, 18)");
      },
    );

    test("disabled 中は error が設定されてもエラー表示されない", async () => {
      const { element, button } = await setup(
        withItems(`disabled error="エラー"`),
      );

      expect(button.classList.contains("error")).toBe(false);
      expect(element.shadowRoot!.querySelector("mi-helper-text")).toBeNull();
    });

    test("chevron-down-small アイコンが表示される", async () => {
      const { element } = await setup(withItems());

      const icon = element.shadowRoot!.querySelector("mi-icon.chevron")!;
      expect(icon.getAttribute("type")).toBe("chevron-down-small");
    });

    test("button に type='button' と aria-haspopup が設定されている", async () => {
      const { button } = await setup(withItems());

      expect(button.type).toBe("button");
      expect(button.getAttribute("aria-haspopup")).toBe("listbox");
    });

    test("ドロップダウンの role が listbox になる", async () => {
      const { element } = await setup(withItems());

      expect(
        element
          .shadowRoot!.querySelector("mi-menu-dropdown")!
          .getAttribute("popup-role"),
      ).toBe("listbox");
    });

    test("variant / size が reflect される", async () => {
      const { element } = await setup(
        withItems(`variant="secondary" size="small"`),
      );

      expect(element.getAttribute("variant")).toBe("secondary");
      expect(element.getAttribute("size")).toBe("small");
    });

    test("primary バリアントでは size=small を指定しても medium として扱われる", async () => {
      const { button } = await setup(
        withItems(`variant="primary" size="small"`),
      );

      expect(button.classList.contains("medium")).toBe(true);
      expect(button.classList.contains("small")).toBe(false);
    });

    test("secondary バリアントでは size=small が有効になる", async () => {
      const { button } = await setup(
        withItems(`variant="secondary" size="small"`),
      );

      expect(button.classList.contains("small")).toBe(true);
    });
  });
});
