import "../../src/components/select-box/mi-select-box";
import "../../src/components/menu/mi-select-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiSelectBox } from "../../src/components/select-box/mi-select-box";

/** Storybook の Actions / ドキュメント表示用（コンポーネントの公開 API 外） */
type MiSelectBoxStory = MiSelectBox & {
  onChange?: (...args: unknown[]) => void;
  /** Events テーブルに載せるためだけの項目（プロパティではない） */
  nativeEvents?: unknown;
  internalEvents?: unknown;
};

/** args に登録されたハンドラ（既定は Actions パネルへのログ出力）へ橋渡しする */
const onChangeOf =
  (args: { onChange?: (...args: unknown[]) => void }) => (e: Event) => {
    const el = e.target as MiSelectBox;
    args.onChange?.({ value: el.value, displayText: el.displayText });
  };

const options = html`
  <mi-select-menu-item value="sales">営業</mi-select-menu-item>
  <mi-select-menu-item value="marketing">マーケティング</mi-select-menu-item>
  <mi-select-menu-item value="engineering"
    >エンジニアリング</mi-select-menu-item
  >
`;

const meta = {
  component: "mi-select-box",
  title: "Components/SelectBox/mi-select-box",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "セレクトボックスです。ネイティブの `<select>` / `<option>` と同じように、`mi-select-menu-item` を直接の子として並べます。`mi-menu` で囲む必要はありません。",
      },
    },
  },
  decorators: [
    (story) => html`<div style="padding-bottom: 240px;">${story()}</div>`,
  ],
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "バリアント。primary は枠線付き全幅、secondary はコンパクト",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description:
        "サイズ。small は secondary バリアントでのみ有効（primary では常に medium 扱い）",
    },
    placeholder: {
      control: "text",
      description: "未選択時のプレースホルダー",
    },
    value: {
      control: "text",
      description:
        "選択中の値（mi-select-menu-item の value に対応する識別子）",
    },
    name: {
      control: "text",
      description: "フォーム送信時の名前",
    },
    error: {
      control: "text",
      description: "エラーメッセージ（空でなければエラー状態）",
    },
    disabled: {
      control: "boolean",
      description: "無効状態",
    },
    displayText: {
      table: { disable: true },
    },
    onChange: {
      name: "change",
      description: [
        "選択値が変更されたときに発火します。**利用側が使う公開イベントはこれだけです。**",
        "",
        "`bubbles: false` / `composed: false` のため祖先要素では拾えません。`mi-select-box` 自身にリスナーを付けてください。",
        "",
        "```js",
        "selectBox.addEventListener('change', (e) => {",
        "  e.target.value;       // 'sales'",
        "  e.target.displayText; // '営業'",
        "});",
        "```",
      ].join("\n"),
      table: { category: "Events", type: { summary: "Event" } },
    },
    nativeEvents: {
      name: "click / mousedown / focusin / keydown など",
      control: false,
      description:
        "ブラウザ標準のイベントです。`composed: true` のため Shadow DOM を越えてそのまま届きます。選択肢をクリックした場合、`event.target` は `mi-select-menu-item` になります。",
      table: { category: "Events", type: { summary: "ネイティブ" } },
    },
    internalEvents: {
      name: "menu-item-activate（内部用）",
      control: false,
      description:
        "メニューを閉じるための内部連絡用イベントです。`mi-select-box` が外へ漏らさないよう止めているため、**利用側には届きません**。`mi-select-menu-item` を `mi-menu` と直接組み合わせて使う場合のみ観測できます。",
      table: { category: "Events", type: { summary: "内部用" } },
    },
  },
  args: {
    variant: "primary",
    size: "medium",
    placeholder: "部署を選択",
    value: "",
    name: "department",
    error: "",
    disabled: false,
    onChange: action("change"),
  },
  render: (args) => html`
    <mi-select-box
      variant="${args.variant}"
      size="${args.size}"
      placeholder="${args.placeholder}"
      .value="${args.value}"
      name="${args.name}"
      error="${args.error}"
      ?disabled="${args.disabled}"
      @change=${onChangeOf(args)}
    >
      ${options}
    </mi-select-box>
  `,
} satisfies Meta<MiSelectBoxStory>;

export default meta;
type Story = StoryObj<MiSelectBoxStory>;

/** Primary（デフォルト） */
export const Default: Story = {};

/** 初期値を指定した状態。表示テキストは選択肢から自動的に決まります。 */
export const WithValue: Story = {
  args: { value: "sales" },
};

/** Secondary バリアント */
export const Secondary: Story = {
  args: { variant: "secondary", value: "sales" },
  render: (args) => html`
    <mi-select-box
      variant="${args.variant}"
      size="${args.size}"
      placeholder="${args.placeholder}"
      .value="${args.value}"
      @change=${onChangeOf(args)}
    >
      ${options}
    </mi-select-box>
  `,
};

/** Small サイズ（secondary のみ） */
export const Small: Story = {
  args: { variant: "secondary", size: "small", value: "engineering" },
  render: meta.render,
};

/** エラー状態 */
export const WithError: Story = {
  args: { error: "部署を選択してください" },
};

/** 無効状態 */
export const Disabled: Story = {
  args: { disabled: true, value: "sales" },
};

/**
 * 選択すると `value` と表示テキストが更新される様子を確認できます。
 * 選択結果を画面上に表示しているのはこの Story 専用の仕掛けで、コンポーネントの機能ではありません。
 */
export const Interactive: Story = {
  render: (args) => {
    // change は bubbles: false のため、mi-select-box 自身で受け取る
    const showResult = (e: Event) => {
      onChangeOf(args)(e);
      const el = e.target as MiSelectBox;
      const result = el.parentElement?.querySelector(".result");
      if (result) {
        result.textContent = el.displayText;
      }
    };

    return html`
      <div>
        <p
          class="result"
          style="margin: 0 0 8px; font-size: 12px; color: #666; min-height: 18px;"
        >
          未選択
        </p>
        <mi-select-box placeholder="${args.placeholder}" @change=${showResult}>
          ${options}
        </mi-select-box>
      </div>
    `;
  },
};

/**
 * 幅の決まり方です。
 *
 * - **primary** … コンテナいっぱいに広がります（既定）
 * - **secondary** … 中身に合わせた幅になります
 *
 * ドロップダウンはトリガーより狭くならず、選択肢が長ければトリガーより広がります
 * （ネイティブの `<select>` と同じ考え方）。
 *
 * flex コンテナの中では、どちらも中身に合わせた幅になります。
 * 伸ばしたい場合は利用側で `flex: 1` を指定してください。
 */
export const Width: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          primary（コンテナいっぱい）
        </p>
        <mi-select-box
          placeholder="${args.placeholder}"
          @change=${onChangeOf(args)}
        >
          ${options}
        </mi-select-box>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          secondary（中身に合わせた幅）
        </p>
        <mi-select-box
          variant="secondary"
          placeholder="${args.placeholder}"
          @change=${onChangeOf(args)}
        >
          ${options}
        </mi-select-box>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          flex コンテナ内（左は flex: 1、右は指定なし）
        </p>
        <div style="display: flex; gap: 8px;">
          <mi-select-box
            style="flex: 1;"
            placeholder="${args.placeholder}"
            @change=${onChangeOf(args)}
          >
            ${options}
          </mi-select-box>
          <mi-select-box
            placeholder="${args.placeholder}"
            @change=${onChangeOf(args)}
          >
            ${options}
          </mi-select-box>
        </div>
      </div>
    </div>
  `,
};

/**
 * 長いテキスト（省略表示）。コンテナに収まらないラベルは末尾が省略されます。
 *
 * 省略されていることが分かるよう、この Story だけコンテナを 300px に狭めています。
 */
export const LongText: Story = {
  render: (args) => html`
    <div style="width: 300px;">
      <mi-select-box
        variant="${args.variant}"
        size="${args.size}"
        placeholder="${args.placeholder}"
        .value="${"long"}"
        @change=${onChangeOf(args)}
      >
        <mi-select-menu-item value="long">
          コンテナの幅に収まらないほど長いラベルは末尾が省略されます
        </mi-select-menu-item>
        <mi-select-menu-item value="short">短いラベル</mi-select-menu-item>
      </mi-select-box>
    </div>
  `,
};

/** バリアント・サイズ一覧 */
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          primary / medium
        </p>
        <mi-select-box placeholder="部署を選択">${options}</mi-select-box>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          secondary / medium
        </p>
        <mi-select-box variant="secondary" value="sales"
          >${options}</mi-select-box
        >
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          secondary / small
        </p>
        <mi-select-box variant="secondary" size="small" value="sales"
          >${options}</mi-select-box
        >
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          primary / error
        </p>
        <mi-select-box placeholder="部署を選択" error="部署を選択してください"
          >${options}</mi-select-box
        >
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          secondary / error（通常は枠線なし、エラー時のみ枠線が付く）
        </p>
        <mi-select-box
          variant="secondary"
          placeholder="部署を選択"
          error="部署を選択してください"
          >${options}</mi-select-box
        >
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">disabled</p>
        <mi-select-box disabled value="sales">${options}</mi-select-box>
      </div>
    </div>
  `,
};
