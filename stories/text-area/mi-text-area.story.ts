import "../../src/components/text-area/mi-text-area";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import type { TemplateResult } from "lit";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import {
  type MiTextArea,
  sizes,
} from "../../src/components/text-area/mi-text-area";

/** Storybook Actions / Slots 用（コンポーネントの公開 API 外） */
type MiTextAreaStory = MiTextArea & {
  onChange?: (...args: unknown[]) => void;
  errorSlot: TemplateResult | typeof nothing;
};

const meta: Meta<MiTextAreaStory> = {
  component: "mi-text-area",
  title: "Components/TextArea/mi-text-area",
  args: {
    value: "",
    placeholder: "テキストを入力してください",
    label: "",
    description: "",
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
    size: {
      control: { type: "select" },
      options: [...sizes],
    },
    minRows: {
      control: { type: "number" },
      description:
        "入力エリアの最小の行数。デザイン仕様上 2 行が下限のため、2 未満を指定すると 2 に正規化されます",
    },
    maxRows: {
      control: { type: "number" },
      description:
        "自動で伸びる上限の行数。未指定なら伸び続けます。指定するとその行数で止まり、以降はテキストエリア内がスクロールします",
    },
    maxLength: {
      control: { type: "number" },
      description:
        "文字数カウンターの上限値。ネイティブの `maxlength` と違い**入力自体は制限しません**（超過時はカウンターを強調表示するのみ）。文字数はコードポイント単位で数えるため絵文字（😀）は1文字です。改行はカウンター上1文字ですが、フォーム送信時は `\r\n` になるためサーバーが受け取る文字数は改行の数だけ多くなります",
    },
    showCount: {
      description:
        "文字数カウンターを表示します。`max-length` と併用すると `現在値 / 上限` の形式になります",
    },
    required: {
      description:
        '入力欄に `aria-required="true"` を付与します。ネイティブの `required` は付けないため、ブラウザによる送信時バリデーションは行いません',
    },
    description: {
      description:
        "スクリーンリーダーに読み上げる欄の説明。視覚的には表示されず `aria-describedby` から参照されます（mi-text-area-unit が support-text をここに渡します）",
    },
    label: {
      description:
        "内部の `textarea` に設定する aria-label。Shadow DOM の外から `<label for>` では紐付けられないため、スクリーンリーダー向けの名前はこの属性で渡します",
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
    onChange: {
      name: "change",
      description:
        "入力が確定したとき（ネイティブの `change` と同じタイミング）。新しい値は `event.target.value` で取得します",
      table: { category: "Events" },
    },
  },
  render: ({
    value,
    placeholder,
    label,
    description,
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
    <mi-text-area
      .value=${value}
      placeholder=${placeholder}
      label=${label}
      description=${description}
      size=${size}
      name=${name}
      .minRows=${minRows}
      .maxRows=${maxRows}
      ?disabled=${disabled}
      ?required=${required}
      ?show-count=${showCount}
      .maxLength=${maxLength}
      @change=${onChange}
    >
      ${errorSlot}
    </mi-text-area>
  `,
  tags: ["!dev-only"],
};
export default meta;

type Story = StoryObj<MiTextAreaStory>;

export const Default: Story = {};

/** 文字数カウンターを表示します。上限を超えても入力は制限されず、現在値が強調表示されます。 */
export const WithCount: Story = {
  args: {
    showCount: true,
    maxLength: 100,
  },
};

/** 上限を超えた状態です。カウンターの現在値のみが赤字・太字になります。 */
export const OverMaxLength: Story = {
  args: {
    showCount: true,
    maxLength: 10,
    value: "上限を超えた入力の例です。",
  },
};

/** `slot="error"` に渡した要素が、エラーメッセージとして下部に表示されます。 */
export const WithError: Story = {
  render: ({ placeholder, size, minRows, onChange }) => html`
    <mi-text-area
      placeholder=${placeholder}
      size=${size}
      .minRows=${minRows}
      @change=${onChange}
    >
      <span slot="error">入力内容に誤りがあります。</span>
      <span slot="error">詳しくは<a href="#">こちら</a>をご確認ください。</span>
    </mi-text-area>
  `,
};

/**
 * `required` を指定すると入力欄に `aria-required="true"` が付きます。
 * ラベルを持たないコンポーネントのため、見た目は変わりません。
 */
export const Required: Story = {
  args: {
    required: true,
  },
};

/**
 * 入力量に応じて高さが伸びます。`max-rows` に達すると止まり、以降はスクロールします。`min-rows` と同じ値にすると高さが固定され、自動伸縮を止められます。
 * 下限は `min-rows`（デフォルト2行）です。
 */
export const AutoGrow: Story = {
  args: {
    maxRows: 6,
    placeholder: "入力すると6行分まで高さが伸びます",
  },
};

/** `min-rows` で下限を広げた状態です。2 未満を指定しても2行分になります。 */
export const MinRows: Story = {
  args: {
    minRows: 4,
    maxRows: 8,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "入力できません",
    showCount: true,
    maxLength: 100,
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
              <mi-text-area
                size=${size}
                placeholder="通常"
                show-count
                .maxLength=${100}
              ></mi-text-area>
              <mi-text-area size=${size} placeholder="エラー">
                <span slot="error">エラーメッセージ</span>
              </mi-text-area>
              <mi-text-area
                size=${size}
                placeholder="無効"
                disabled
              ></mi-text-area>
            </div>
          </div>
        `,
      )}
    </div>
  `,
};
