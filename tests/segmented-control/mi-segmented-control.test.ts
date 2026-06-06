import "../../src/components/segmented-control/mi-segmented-control";

import { describe, expect, test, vi } from "vitest";

import type { MiSegment } from "../../src/components/segmented-control/mi-segment";
import type { MiSegmentedControl } from "../../src/components/segmented-control/mi-segmented-control";

function getControl() {
  return document.querySelector("mi-segmented-control") as MiSegmentedControl;
}

function getSegments(): MiSegment[] {
  return Array.from(document.querySelectorAll("mi-segment"));
}

function getSegmentInner(segment: MiSegment): HTMLElement | null | undefined {
  return segment.shadowRoot?.querySelector(".segment");
}

async function setup(html: string) {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-segmented-control");
  await customElements.whenDefined("mi-segment");
  const control = getControl();
  await control.updateComplete;
  for (const segment of getSegments()) {
    await segment.updateComplete;
  }
  return control;
}

describe("mi-segmented-control", () => {
  describe("value属性", () => {
    test("value属性を設定すると、対応するセグメントが選択される", async () => {
      await setup(`
        <mi-segmented-control value="item2">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
          <mi-segment value="item3" variant="text">Label3</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      expect(segments[0].selected).toBe(false);
      expect(segments[1].selected).toBe(true);
      expect(segments[2].selected).toBe(false);
    });

    test("value属性を更新すると、選択状態が変わる", async () => {
      const control = await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
        </mi-segmented-control>
      `);

      control.value = "item2";
      await control.updateComplete;

      const segments = getSegments();
      expect(segments[0].selected).toBe(false);
      expect(segments[1].selected).toBe(true);
    });
  });

  describe("disabled属性", () => {
    test("disabled属性を設定すると、全セグメントが無効化される", async () => {
      await setup(`
        <mi-segmented-control value="item1" disabled>
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      expect(segments[0].disabled).toBe(true);
      expect(segments[1].disabled).toBe(true);
    });
  });

  describe("セグメントのクリック", () => {
    test("セグメントをクリックすると、valueが更新されchangeイベントが発火する", async () => {
      const control = await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
        </mi-segmented-control>
      `);

      const changeSpy = vi.fn();
      control.addEventListener("change", changeSpy);

      const segments = getSegments();
      const inner = getSegmentInner(segments[1]);
      inner?.click();

      expect(control.value).toBe("item2");
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail.value).toBe("item2");
    });

    test("既に選択中のセグメントをクリックしても、changeイベントは発火しない", async () => {
      const control = await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
        </mi-segmented-control>
      `);

      const changeSpy = vi.fn();
      control.addEventListener("change", changeSpy);

      const segments = getSegments();
      const inner = getSegmentInner(segments[0]);
      inner?.click();

      expect(changeSpy).not.toHaveBeenCalled();
    });

    test("disabledなセグメントをクリックしても、changeイベントは発火しない", async () => {
      const control = await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text" disabled>Label2</mi-segment>
        </mi-segmented-control>
      `);

      const changeSpy = vi.fn();
      control.addEventListener("change", changeSpy);

      const segments = getSegments();
      const inner = getSegmentInner(segments[1]);
      inner?.click();

      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe("アクセシビリティ", () => {
    test("role='radiogroup'が設定される", async () => {
      const control = await setup(`
        <mi-segmented-control value="item1" aria-label="テスト">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
        </mi-segmented-control>
      `);

      const radiogroup = control.shadowRoot?.querySelector(
        '[role="radiogroup"]',
      );
      expect(radiogroup).toBeTruthy();
    });

    test("aria-label属性がradiogroupに反映される", async () => {
      const control = await setup(`
        <mi-segmented-control value="item1" aria-label="表示切り替え">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
        </mi-segmented-control>
      `);

      const radiogroup = control.shadowRoot?.querySelector(
        '[role="radiogroup"]',
      );
      expect(radiogroup?.getAttribute("aria-label")).toBe("表示切り替え");
    });

    test("各セグメントにrole='radio'が設定される", async () => {
      await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      for (const segment of segments) {
        const inner = getSegmentInner(segment);
        expect(inner?.getAttribute("role")).toBe("radio");
      }
    });

    test("選択中のセグメントはaria-checked='true'になる", async () => {
      await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      expect(getSegmentInner(segments[0])?.getAttribute("aria-checked")).toBe(
        "true",
      );
      expect(getSegmentInner(segments[1])?.getAttribute("aria-checked")).toBe(
        "false",
      );
    });

    test("disabledなセグメントはaria-disabled='true'になる", async () => {
      await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text" disabled>Label2</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      expect(getSegmentInner(segments[1])?.getAttribute("aria-disabled")).toBe(
        "true",
      );
    });
  });

  describe("キーボード操作", () => {
    test("ArrowRightで次のセグメントにフォーカスが移動し選択される", async () => {
      const control = await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
          <mi-segment value="item3" variant="text">Label3</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      const inner = getSegmentInner(segments[0]);
      inner?.focus();

      inner?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowRight",
          bubbles: true,
          composed: true,
        }),
      );
      await control.updateComplete;

      expect(control.value).toBe("item2");
      expect(document.activeElement).toBe(segments[1]);
    });

    test("ArrowLeftで前のセグメントにフォーカスが移動し選択される", async () => {
      const control = await setup(`
        <mi-segmented-control value="item2">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
          <mi-segment value="item3" variant="text">Label3</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      const inner = getSegmentInner(segments[1]);
      inner?.focus();

      inner?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowLeft",
          bubbles: true,
          composed: true,
        }),
      );
      await control.updateComplete;

      expect(control.value).toBe("item1");
    });

    test("末尾でArrowRightを押すと先頭にループする", async () => {
      const control = await setup(`
        <mi-segmented-control value="item3">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
          <mi-segment value="item3" variant="text">Label3</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      const inner = getSegmentInner(segments[2]);
      inner?.focus();

      inner?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowRight",
          bubbles: true,
          composed: true,
        }),
      );
      await control.updateComplete;

      expect(control.value).toBe("item1");
    });

    test("Homeで先頭のセグメントに移動し選択される", async () => {
      const control = await setup(`
        <mi-segmented-control value="item3">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
          <mi-segment value="item3" variant="text">Label3</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      const inner = getSegmentInner(segments[2]);
      inner?.focus();

      inner?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Home",
          bubbles: true,
          composed: true,
        }),
      );
      await control.updateComplete;

      expect(control.value).toBe("item1");
    });

    test("Endで末尾のセグメントに移動し選択される", async () => {
      const control = await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
          <mi-segment value="item3" variant="text">Label3</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      const inner = getSegmentInner(segments[0]);
      inner?.focus();

      inner?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "End",
          bubbles: true,
          composed: true,
        }),
      );
      await control.updateComplete;

      expect(control.value).toBe("item3");
    });

    test("disabledなセグメントはキーボードナビゲーションでスキップされる", async () => {
      const control = await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text" disabled>Label2</mi-segment>
          <mi-segment value="item3" variant="text">Label3</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      const inner = getSegmentInner(segments[0]);
      inner?.focus();

      inner?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowRight",
          bubbles: true,
          composed: true,
        }),
      );
      await control.updateComplete;

      expect(control.value).toBe("item3");
    });

    test("Space/Enterキーでセグメントが選択される", async () => {
      const control = await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
        </mi-segmented-control>
      `);

      const changeSpy = vi.fn();
      control.addEventListener("change", changeSpy);

      const segments = getSegments();
      const inner = getSegmentInner(segments[1]);
      inner?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          bubbles: true,
          composed: true,
        }),
      );

      expect(control.value).toBe("item2");
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("roving tabindex", () => {
    test("選択中のセグメントだけがtabindex='0'になる", async () => {
      await setup(`
        <mi-segmented-control value="item2">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text">Label2</mi-segment>
          <mi-segment value="item3" variant="text">Label3</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      expect(getSegmentInner(segments[0])?.getAttribute("tabindex")).toBe("-1");
      expect(getSegmentInner(segments[1])?.getAttribute("tabindex")).toBe("0");
      expect(getSegmentInner(segments[2])?.getAttribute("tabindex")).toBe("-1");
    });

    test("disabledなセグメントはtabindex='-1'になる", async () => {
      await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text" disabled>Label2</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      expect(getSegmentInner(segments[1])?.getAttribute("tabindex")).toBe("-1");
    });
  });

  describe("disabled復元", () => {
    test("親のdisabledを解除すると、個別disabledのセグメントだけが無効のままになる", async () => {
      const control = await setup(`
        <mi-segmented-control value="item1" disabled>
          <mi-segment value="item1" variant="text">Label1</mi-segment>
          <mi-segment value="item2" variant="text" disabled>Label2</mi-segment>
          <mi-segment value="item3" variant="text">Label3</mi-segment>
        </mi-segmented-control>
      `);

      const segments = getSegments();
      expect(segments[0].disabled).toBe(true);
      expect(segments[1].disabled).toBe(true);
      expect(segments[2].disabled).toBe(true);

      control.disabled = false;
      await control.updateComplete;

      expect(segments[0].disabled).toBe(false);
      expect(segments[1].disabled).toBe(true);
      expect(segments[2].disabled).toBe(false);
    });
  });
});

describe("mi-segment", () => {
  describe("variant属性", () => {
    test("variant='text'の場合、text-variantクラスが適用される", async () => {
      await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label</mi-segment>
        </mi-segmented-control>
      `);

      const segment = getSegments()[0];
      const inner = getSegmentInner(segment);
      expect(inner?.classList.contains("text-variant")).toBe(true);
    });

    test("variant='icon'の場合、icon-variantクラスが適用される", async () => {
      await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="icon" aria-label="テスト">
            <mi-icon type="search"></mi-icon>
          </mi-segment>
        </mi-segmented-control>
      `);

      const segment = getSegments()[0];
      const inner = getSegmentInner(segment);
      expect(inner?.classList.contains("icon-variant")).toBe(true);
    });
  });

  describe("チェックマークアイコン", () => {
    test("選択中のセグメントにチェックマークアイコンが表示される", async () => {
      await setup(`
        <mi-segmented-control value="item1">
          <mi-segment value="item1" variant="text">Label</mi-segment>
        </mi-segmented-control>
      `);

      const segment = getSegments()[0];
      const checkIcon = segment.shadowRoot?.querySelector("mi-icon");
      expect(checkIcon).toBeTruthy();
      expect(checkIcon?.getAttribute("type")).toBe("check-small");
    });
  });
});
