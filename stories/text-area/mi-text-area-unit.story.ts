import "../../src/components/text-area/mi-text-area-unit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import type { TemplateResult } from "lit";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import { sizes } from "../../src/components/text-area/mi-text-area";
import type { MiTextAreaUnit } from "../../src/components/text-area/mi-text-area-unit";

/** Storybook Actions / Slots 用（コンポーネントの公開 API 外） */
type MiTextAreaUnitStory = MiTextAreaUnit & {
  onChange?: (...args: unknown[]) => void;
  errorSlot: TemplateResult | typeof nothing;
};

const meta: Meta<MiTextAreaUnitStory> = {
  component: "mi-text-area-unit",
  title: "Components/TextArea/mi-text-area-unit",
  args: {
    text: "自己紹介",
    supportText: "",
    value: "",
    placeholder: "テキストを入力してください",
    size: "medium",
    minRows: 2,
    maxRows: null,
    disabled: false,
    required: false,
    showCount: false,
    maxLength: null,
    name: "body",
    onChange: action("change"),
    errorSlot: "none" as unknown as TemplateResult,
  },
  argTypes: {
    text: {
      description:
        "テキストエリアを説明するラベル。内側の `textarea` の `aria-label` にも渡されます",
    },
    supportText: {
      description: "ラベルの下に表示する補足テキスト",
    },
    size: {
      control: { type: "select" },
      options: [...sizes],
    },
    minRows: {
      control: { type: "number" },
      description:
        "入力エリアの最小の行数。2 未満を指定すると 2 に正規化されます",
    },
    maxRows: {
      control: { type: "number" },
      description:
        "自動で伸びる上限の行数。未指定なら伸び続けます。指定するとその行数で止まり、以降はスクロールします。`min-rows` と同じ値にすると高さが固定され、自動伸縮を止められます",
    },
    maxLength: {
      control: { type: "number" },
      description:
        "文字数カウンターの上限値。ネイティブの `maxlength` と違い**入力自体は制限しません**",
    },
    required: {
      description:
        "ラベルに「必須」バッジを表示し、入力欄に `aria-required` を付与します",
    },
    onChange: {
      name: "change",
      description:
        "入力が確定したとき（ネイティブの `change` と同じタイミング）。新しい値は `event.target.value` で取得します",
      table: { category: "Events" },
    },
    errorSlot: {
      name: 'slot="error"',
      control: "radio",
      options: ["none", "text", "withLink", "multiple"],
      mapping: {
        none: nothing,
        text: html`<span slot="error">エラーテキストが入ります</span>`,
        withLink: html`<span slot="error"
          >エラーが発生しました。詳しくは<a href="#">こちら</a
          >をご覧ください。</span
        >`,
        multiple: html`<span slot="error">入力内容に誤りがあります</span>
          <span slot="error">使用できない文字が含まれています</span>
          <span slot="error">1000文字以内で入力してください</span>`,
      },
      table: { category: "Slots" },
    },
  },
  render: ({
    text,
    supportText,
    value,
    placeholder,
    size,
    minRows,
    maxRows,
    disabled,
    required,
    showCount,
    maxLength,
    name,
    onChange,
    errorSlot,
  }) => html`
    <mi-text-area-unit
      text=${text}
      support-text=${supportText}
      .value=${value}
      placeholder=${placeholder}
      size=${size}
      name=${name}
      .minRows=${minRows}
      .maxRows=${maxRows}
      .maxLength=${maxLength}
      ?disabled=${disabled}
      ?required=${required}
      ?show-count=${showCount}
      @change=${onChange}
    >
      ${errorSlot}
    </mi-text-area-unit>
  `,
  tags: ["!dev-only"],
};
export default meta;

type Story = StoryObj<MiTextAreaUnitStory>;

export const Default: Story = {};

/** `required` を指定すると、ラベルの横に「必須」バッジが表示されます。 */
export const Required: Story = {
  args: {
    required: true,
  },
};

/** ラベルの下に補足テキストを表示できます。 */
export const WithSupportText: Story = {
  args: {
    supportText: "500文字以内で入力してください",
    required: true,
  },
};

/** 文字数カウンターは入力エリアの外側（下）に表示されます。 */
export const WithCount: Story = {
  args: {
    showCount: true,
    maxLength: 100,
  },
};

/** エラーメッセージも入力エリアの外側に表示され、入力エリアの高さは変わりません。 */
export const WithError: Story = {
  args: {
    showCount: true,
    maxLength: 10,
    value: "上限を超えた入力の例です。",
    errorSlot: "multiple" as unknown as TemplateResult,
  },
};

/** 入力量に応じて高さが伸び、`max-rows` で止まります。 */
export const AutoGrow: Story = {
  args: {
    maxRows: 6,
    placeholder: "入力すると6行分まで高さが伸びます",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "入力できません",
  },
};

export const All: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      ${sizes.map(
        (size) => html`
          <div>
            <strong>${size}</strong>
            <div
              style="display: flex; flex-direction: column; gap: 16px; margin-block-start: 8px;"
            >
              <mi-text-area-unit
                text="通常"
                size=${size}
                placeholder="プレースホルダー"
              ></mi-text-area-unit>
              <mi-text-area-unit
                text="必須"
                size=${size}
                placeholder="プレースホルダー"
                required
              ></mi-text-area-unit>
              <mi-text-area-unit
                text="文字数カウンターあり"
                size=${size}
                show-count
                .maxLength=${100}
              ></mi-text-area-unit>
              <mi-text-area-unit text="エラー" size=${size}>
                <span slot="error">エラーメッセージ</span>
              </mi-text-area-unit>
              <mi-text-area-unit
                text="無効"
                size=${size}
                value="入力できません"
                disabled
              ></mi-text-area-unit>
            </div>
          </div>
        `,
      )}
    </div>
  `,
};
