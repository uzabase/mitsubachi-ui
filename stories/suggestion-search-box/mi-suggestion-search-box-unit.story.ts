import "../../src/components/suggestion-search-box/mi-suggestion-search-box-unit";
import "../../src/components/suggestion-search-box/mi-suggestion-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiSuggestionSearchBoxUnit } from "../../src/components/suggestion-search-box/mi-suggestion-search-box-unit";

/** Storybook Actions 用（コンポーネントの公開 API 外） */
type MiSuggestionSearchBoxUnitStory = MiSuggestionSearchBoxUnit & {
  "support-text"?: string;
  onInput?: (...args: unknown[]) => void;
  onChange?: (...args: unknown[]) => void;
  onSelect?: (...args: unknown[]) => void;
};

const meta = {
  component: "mi-suggestion-search-box-unit",
  title: "Components/SuggestionSearchBox/mi-suggestion-search-box-unit",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "ラベル付きのサジェスト付き検索ボックスです。mi-label-unit と mi-suggestion-search-box を組み合わせたラッパーコンポーネントです。",
          "",
          "- 候補は `mi-suggestion-item` を直接の子として並べます。候補の絞り込み・キー操作・日本語入力のふるまいは `mi-suggestion-search-box` と同じです",
          "- ラベルをクリックすると入力欄にフォーカスします（候補があれば開きます）",
          "- `text` は入力欄と候補リストの読み上げ名にもなります",
          "- イベント（`input` / `change` / `select`）は `mi-suggestion-search-box` と同じものが、この要素から発火します",
        ].join("\n"),
      },
      source: { excludeDecorators: true },
    },
  },
  // 候補リストは入力欄の下に重なって表示されるため、Docs の枠内に収まるよう下に余白を確保する
  decorators: [
    (story) =>
      html`<div style="width: 320px; padding-bottom: 160px;">${story()}</div>`,
  ],
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    text: {
      control: "text",
      description: "ラベルテキスト。入力欄と候補リストの読み上げ名にもなります",
    },
    "support-text": {
      control: "text",
      description:
        "ラベルの下に表示する補足テキスト。入力欄の説明としても読み上げられます",
    },
    required: {
      control: "boolean",
      description:
        "ラベルに「必須」バッジを表示し、入力欄に aria-required を付与します",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "見た目のバリアント",
    },
    placeholder: { control: "text", description: "プレースホルダー" },
    value: {
      control: "text",
      description: "入力値。候補を選んでも変わりません",
    },
    name: { control: "text", description: "フォーム送信時の名前" },
    disabled: { control: "boolean", description: "無効化状態" },
    autocomplete: {
      control: "text",
      description: "ブラウザの自動補完。既定は `off`",
    },
    autofocus: { control: "boolean", description: "自動でフォーカスする" },
    onInput: {
      name: "input",
      description:
        "入力値が変わったとき。日本語入力の変換中は発火せず、確定時に1回だけ発火します。`mi-suggestion-search-box` と同じです。",
      table: { category: "Events", type: { summary: "InputEvent" } },
    },
    onChange: {
      name: "change",
      description:
        "値が確定したとき（主にフォーカスが外れたとき）。`mi-suggestion-search-box` と同じです。",
      table: { category: "Events", type: { summary: "Event" } },
    },
    onSelect: {
      name: "select",
      description:
        "候補が選ばれたとき。`detail.value` に候補の value が入ります。bubbles / composed / cancelable はすべて false です。`mi-suggestion-search-box` と同じです。",
      table: {
        category: "Events",
        type: { summary: "CustomEvent<{ value: string }>" },
      },
    },
  },
  args: {
    text: "企業検索",
    "support-text": "",
    required: false,
    variant: "primary",
    placeholder: "企業名で検索",
    value: "",
    name: "company",
    disabled: false,
    autocomplete: "off",
    autofocus: false,
    onInput: action("input"),
    onChange: action("change"),
    onSelect: action("select"),
  },
  render: (args) => html`
    <mi-suggestion-search-box-unit
      text="${args.text}"
      support-text="${args["support-text"]}"
      ?required="${args.required}"
      variant="${args.variant}"
      placeholder="${args.placeholder}"
      .value="${args.value}"
      name="${args.name}"
      autocomplete="${args.autocomplete}"
      ?disabled="${args.disabled}"
      ?autofocus="${args.autofocus}"
      @input=${(e: Event) =>
        args.onInput?.({
          value: (e.currentTarget as MiSuggestionSearchBoxUnit).value,
        })}
      @change=${(e: Event) =>
        args.onChange?.({
          value: (e.currentTarget as MiSuggestionSearchBoxUnit).value,
        })}
      @select=${(e: Event) => args.onSelect?.((e as CustomEvent).detail)}
    >
      <mi-suggestion-item value="7203">トヨタ自動車</mi-suggestion-item>
      <mi-suggestion-item value="6758">ソニーグループ</mi-suggestion-item>
      <mi-suggestion-item value="7974">任天堂</mi-suggestion-item>
    </mi-suggestion-search-box-unit>
  `,
} satisfies Meta<MiSuggestionSearchBoxUnitStory>;

export default meta;
type Story = StoryObj<MiSuggestionSearchBoxUnitStory>;

/** デフォルト。ラベルをクリックすると入力欄にフォーカスし、候補が開きます */
export const Default: Story = {};

/** 入力済み */
export const WithValue: Story = {
  args: { value: "トヨタ" },
};

/** 補足テキストあり（入力欄の説明としても読み上げられます） */
export const WithSupportText: Story = {
  args: { "support-text": "上場企業のみ検索できます" },
};

/** 必須（ラベルに「必須」バッジを表示し、入力欄に aria-required を付与します） */
export const Required: Story = {
  args: { required: true },
};

/** Secondary バリアント */
export const Secondary: Story = {
  args: { variant: "secondary" },
};

/** 無効状態 */
export const Disabled: Story = {
  args: { disabled: true },
};

/**
 * ラベルなし（text が空のときはラベルを表示しない）。
 * この場合は入力欄の読み上げ名も無くなるため、ラベルを出さないなら `mi-suggestion-search-box` に `label` 属性を付けて使ってください。
 */
export const WithoutLabel: Story = {
  args: { text: "" },
};
