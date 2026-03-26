import "../../src/components/dialog/mi-form-dialog";
import "../../src/components/button/mi-neutral-button";
import "../../src/components/label-unit";
import "../../src/components/text-field/text-field";
import "../../src/components/text-field/text-field-unit";
import "../../src/components/radio-button/mi-radio-button-text";
import "../../src/components/checkbox/mi-checkbox-text";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { DialogOpenChangeDetail } from "../../src/components/dialog/base";
import type { MiFormDialog } from "../../src/components/dialog/mi-form-dialog";
import type { MiRadioButtonText } from "../../src/components/radio-button/mi-radio-button-text";

/** Storybook Actions 用（コンポーネントの公開 API 外） */
type MiFormDialogStory = MiFormDialog & {
  onMiCancel?: (e: Event) => void;
  onAction?: (e: Event) => void;
  onOpenChange?: (e: CustomEvent<DialogOpenChangeDetail>) => void;
};

const meta = {
  component: "mi-form-dialog",
  title: "Dialog/mi-form-dialog",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "フッターのキャンセル／確定で閉じたときは `mi-cancel` または `action` のみ。Esc・ホストが `open` を false にしたとき・`dialog.close()` などでは `open-change` のみ（その場合 `mi-cancel` / `action` は発火しません）。オーバーレイのクリックでは閉じません。",
      },
    },
  },
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    open: {
      control: false,
      table: { disable: true },
      description: "開閉状態（制御用）。Storyでは内部で管理します",
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      description: "small=560px, medium=800px, large=1280px",
    },
    headerText: { type: "string" },
    cancelLabel: { type: "string" },
    actionLabel: { type: "string" },
    onMiCancel: {
      action: "mi-cancel",
      description: "キャンセル（ghost）ボタンが押されたとき",
      table: { category: "Events" },
    },
    onAction: {
      action: "action",
      description:
        "アクション（primary）ボタンが押されたとき（cancelable。バリデーション失敗時は `preventDefault()` で閉じない）",
      table: { category: "Events" },
    },
    onOpenChange: {
      action: "open-change",
      description:
        'フッターボタン以外で閉じたとき（Esc・`open` を false・`dialog.close()` 等。背景クリックでは閉じない）。detail: { open: false, reason: "escape" | null }（Esc は "escape"、それ以外は null）',
      table: { category: "Events" },
    },
  },
  args: {
    size: "medium",
    headerText: "新規作成",
    cancelLabel: "キャンセル",
    actionLabel: "作成する",
    onMiCancel: action("mi-cancel"),
    onAction: action("action"),
    onOpenChange: action("open-change"),
  },
} satisfies Meta<MiFormDialogStory>;

export default meta;
type Story = StoryObj<MiFormDialogStory>;

const openDialog = (e: Event) => {
  const container = (e.target as HTMLElement).closest(".story-container");
  const dialog = container?.querySelector("mi-form-dialog") as MiFormDialog;
  if (dialog) dialog.open = true;
};

const handleOpenChange = (e: CustomEvent) => {
  const dialog = e.target as MiFormDialog;
  dialog.open = false;
};

function bindOpenChange(args: Partial<MiFormDialogStory> | undefined) {
  return (e: CustomEvent) => {
    handleOpenChange(e);
    args?.onOpenChange?.(e as CustomEvent<DialogOpenChangeDetail>);
  };
}

/** Shadow DOM 内の radio はネイティブの相互排他が効かないため、1つ選択したら他を外す */
const handleGenderChange = (e: Event) => {
  const clicked = e.currentTarget as MiRadioButtonText;
  const form = clicked.closest("form");
  const allRadios =
    form?.querySelectorAll<MiRadioButtonText>(
      'mi-radio-button-text[name="gender"]',
    ) ?? [];
  allRadios.forEach((radio) => {
    radio.checked = radio === clicked;
  });
};

const formLayoutStyle = html`
  <style>
    .form-layout {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .form-layout--grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .form-fieldset {
      border: none;
      padding: 0;
      margin: 0;
    }
    .form-fieldset-legend {
      font-weight: 700;
      margin-block-end: 8px;
    }
    .form-radio-group,
    .form-fieldset-fields {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .form-radio-group {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 16px;
    }
  </style>
`;

/**
 * フォーム入力を行うダイアログ。
 * Desktop: size=small(560px) / medium(800px) / large(1280px)。
 * Phone: 横余白なし・画面端まで、高さも広がる（フルスクリーン）。
 */
export const Default: Story = {
  render: (args) => html`
    <div class="story-container">
      ${formLayoutStyle}
      <button type="button" @click=${openDialog}>新規作成</button>
      <mi-form-dialog
        size=${args.size}
        header-text=${args.headerText}
        cancel-label=${args.cancelLabel}
        action-label=${args.actionLabel}
        @open-change=${bindOpenChange(args)}
        @mi-cancel=${args.onMiCancel}
        @action=${args.onAction}
      >
        <form
          id="form-dialog-form"
          class="form-layout"
          @submit=${(e: Event) => e.preventDefault()}
        >
          <mi-text-field-unit
            text="タイトル"
            name="title"
            placeholder="タイトルを入力"
          ></mi-text-field-unit>
          <mi-text-field-unit
            text="説明"
            name="description"
            support-text="任意の説明文を入力してください"
            placeholder="説明を入力"
          ></mi-text-field-unit>
        </form>
      </mi-form-dialog>
    </div>
  `,
};

/**
 * 小サイズ（560px）のフォームダイアログ。
 */
export const Small: Story = {
  args: { size: "small" },
  render: (args) => html`
    <div class="story-container">
      ${formLayoutStyle}
      <button type="button" @click=${openDialog}>新規作成（小）</button>
      <mi-form-dialog
        size=${args.size}
        header-text="新規作成"
        cancel-label="キャンセル"
        action-label="作成する"
        @open-change=${bindOpenChange(args)}
        @mi-cancel=${args.onMiCancel}
        @action=${args.onAction}
      >
        <form
          id="form-dialog-form-small"
          class="form-layout"
          @submit=${(e: Event) => e.preventDefault()}
        >
          <mi-text-field-unit
            text="名前"
            name="name"
            placeholder="名前を入力"
          ></mi-text-field-unit>
        </form>
      </mi-form-dialog>
    </div>
  `,
};

/**
 * 大サイズ（1280px）のフォームダイアログ。
 * 複数カラムのフォームなど、広いレイアウトに適しています。
 */
export const Large: Story = {
  args: { size: "large" },
  render: (args) => html`
    <div class="story-container">
      ${formLayoutStyle}
      <button type="button" @click=${openDialog}>広いフォームを開く</button>
      <mi-form-dialog
        size=${args.size}
        header-text="詳細入力"
        cancel-label="キャンセル"
        action-label="保存する"
        @open-change=${bindOpenChange(args)}
        @mi-cancel=${args.onMiCancel}
        @action=${args.onAction}
      >
        <form
          id="form-dialog-form-large"
          class="form-layout form-layout--grid"
          @submit=${(e: Event) => e.preventDefault()}
        >
          <mi-text-field-unit
            text="姓"
            name="lastName"
            placeholder="山田"
          ></mi-text-field-unit>
          <mi-text-field-unit
            text="名"
            name="firstName"
            placeholder="太郎"
          ></mi-text-field-unit>
          <mi-text-field-unit
            text="メールアドレス"
            name="email"
            placeholder="email@example.com"
          ></mi-text-field-unit>
          <mi-text-field-unit
            text="電話番号"
            name="phone"
            placeholder="090-1234-5678"
          ></mi-text-field-unit>
        </form>
      </mi-form-dialog>
    </div>
  `,
};

/**
 * mi-text-field-unit、mi-radio-button-text、mi-checkbox-text を使ったフォームサンプル。
 */
export const MultipleFields: Story = {
  render: (args) => html`
    <div class="story-container">
      ${formLayoutStyle}
      <button type="button" @click=${openDialog}>プロフィール編集</button>
      <mi-form-dialog
        size=${args.size}
        header-text="プロフィール編集"
        cancel-label="キャンセル"
        action-label="保存する"
        @open-change=${bindOpenChange(args)}
        @mi-cancel=${args.onMiCancel}
        @action=${args.onAction}
      >
        <form
          id="profile-form"
          class="form-layout"
          @submit=${(e: Event) => e.preventDefault()}
        >
          <mi-text-field-unit
            text="メールアドレス"
            name="email"
            support-text="複数の宛先を指定する場合は、「,（カンマ）」で区切って入力してください"
            placeholder="example@xyz.com"
          ></mi-text-field-unit>
          <fieldset class="form-fieldset">
            <legend class="form-fieldset-legend">性別</legend>
            <div class="form-radio-group">
              <mi-radio-button-text
                name="gender"
                value="male"
                @change=${handleGenderChange}
              >
                男性
              </mi-radio-button-text>
              <mi-radio-button-text
                name="gender"
                value="female"
                @change=${handleGenderChange}
              >
                女性
              </mi-radio-button-text>
              <mi-radio-button-text
                name="gender"
                value="other"
                @change=${handleGenderChange}
              >
                その他
              </mi-radio-button-text>
            </div>
          </fieldset>
          <mi-checkbox-text
            text="利用規約に同意する"
            name="agree"
            value="agree"
          ></mi-checkbox-text>
        </form>
      </mi-form-dialog>
    </div>
  `,
};

/**
 * 多数のフィールドを持つ長いフォーム。
 * mi-text-field-unit を使用。Header と Footer は固定され、Body のみスクロール可能。
 */
export const LongForm: Story = {
  render: (args) => html`
    <div class="story-container">
      ${formLayoutStyle}
      <button type="button" @click=${openDialog}>
        詳細な登録フォームを開く
      </button>
      <mi-form-dialog
        size=${args.size}
        header-text="ユーザー登録"
        cancel-label="キャンセル"
        action-label="登録する"
        @open-change=${bindOpenChange(args)}
        @mi-cancel=${args.onMiCancel}
        @action=${args.onAction}
      >
        <form
          id="long-form"
          class="form-layout"
          @submit=${(e: Event) => e.preventDefault()}
        >
          <fieldset class="form-fieldset">
            <legend class="form-fieldset-legend">基本情報</legend>
            <div class="form-fieldset-fields">
              <mi-text-field-unit
                text="姓"
                name="lastName"
                placeholder="山田"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="名"
                name="firstName"
                placeholder="太郎"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="メールアドレス"
                name="email"
                placeholder="email@example.com"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="電話番号"
                name="phone"
                placeholder="090-1234-5678"
              ></mi-text-field-unit>
            </div>
          </fieldset>

          <fieldset class="form-fieldset">
            <legend class="form-fieldset-legend">住所</legend>
            <div class="form-fieldset-fields">
              <mi-text-field-unit
                text="郵便番号"
                name="postalCode"
                placeholder="123-4567"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="都道府県"
                name="prefecture"
                placeholder="東京都"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="市区町村"
                name="city"
                placeholder="渋谷区"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="番地・建物名"
                name="address"
                placeholder="〇〇1-2-3"
              ></mi-text-field-unit>
            </div>
          </fieldset>

          <fieldset class="form-fieldset">
            <legend class="form-fieldset-legend">職業情報</legend>
            <div class="form-fieldset-fields">
              <mi-text-field-unit
                text="職業"
                name="occupation"
                placeholder="会社員"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="会社名"
                name="company"
                placeholder="株式会社〇〇"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="部署"
                name="department"
                placeholder="営業部"
              ></mi-text-field-unit>
            </div>
          </fieldset>

          <mi-checkbox-text
            text="利用規約に同意する"
            name="agreeTerms"
            value="agree"
          ></mi-checkbox-text>
        </form>
      </mi-form-dialog>
    </div>
  `,
};

/**
 * Phone表示でのフォームダイアログ。
 * 横余白なし・画面端まで表示され、高さも広がります（フルスクリーン）。
 */
export const PhoneDefault: Story = {
  render: (args) => html`
    <div class="story-container">
      ${formLayoutStyle}
      <button type="button" @click=${openDialog}>新規作成</button>
      <mi-form-dialog
        size=${args.size}
        header-text="新規作成"
        cancel-label="キャンセル"
        action-label="作成する"
        @open-change=${bindOpenChange(args)}
        @mi-cancel=${args.onMiCancel}
        @action=${args.onAction}
      >
        <form
          id="form-dialog-form-phone"
          class="form-layout"
          @submit=${(e: Event) => e.preventDefault()}
        >
          <mi-text-field-unit
            text="タイトル"
            name="title"
            placeholder="タイトルを入力"
          ></mi-text-field-unit>
          <mi-text-field-unit
            text="説明"
            name="description"
            placeholder="説明を入力"
          ></mi-text-field-unit>
        </form>
      </mi-form-dialog>
    </div>
  `,
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};

/**
 * Phone表示での長いフォーム。
 * フルスクリーン表示で、Body のみスクロール可能。
 */
export const PhoneLongForm: Story = {
  render: (args) => html`
    <div class="story-container">
      ${formLayoutStyle}
      <button type="button" @click=${openDialog}>
        詳細な登録フォームを開く
      </button>
      <mi-form-dialog
        size=${args.size}
        header-text="ユーザー登録"
        cancel-label="キャンセル"
        action-label="登録する"
        @open-change=${bindOpenChange(args)}
        @mi-cancel=${args.onMiCancel}
        @action=${args.onAction}
      >
        <form
          id="long-form-phone"
          class="form-layout"
          @submit=${(e: Event) => e.preventDefault()}
        >
          <fieldset class="form-fieldset">
            <legend class="form-fieldset-legend">基本情報</legend>
            <div class="form-fieldset-fields">
              <mi-text-field-unit
                text="姓"
                name="lastName"
                placeholder="山田"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="名"
                name="firstName"
                placeholder="太郎"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="メールアドレス"
                name="email"
                placeholder="email@example.com"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="電話番号"
                name="phone"
                placeholder="090-1234-5678"
              ></mi-text-field-unit>
            </div>
          </fieldset>

          <fieldset class="form-fieldset">
            <legend class="form-fieldset-legend">住所</legend>
            <div class="form-fieldset-fields">
              <mi-text-field-unit
                text="郵便番号"
                name="postalCode"
                placeholder="123-4567"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="都道府県"
                name="prefecture"
                placeholder="東京都"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="市区町村"
                name="city"
                placeholder="渋谷区"
              ></mi-text-field-unit>
              <mi-text-field-unit
                text="番地・建物名"
                name="address"
                placeholder="〇〇1-2-3"
              ></mi-text-field-unit>
            </div>
          </fieldset>

          <mi-checkbox-text
            text="利用規約に同意する"
            name="agreeTerms"
            value="agree"
          ></mi-checkbox-text>
        </form>
      </mi-form-dialog>
    </div>
  `,
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};

/**
 * form-id を指定することで Enter キーによる送信が有効になることを確認する Story。
 * 1. 「ダイアログを開く」ボタンをクリック
 * 2. テキスト入力欄に何か入力する
 * 3. Enter キーを押す →「フォームが送信されました（Enter）」のアラートが表示されれば OK
 * 4. 「送信」ボタンをクリック → 「送信ボタンが押されました」のアラートが表示されれば OK
 */
export const EnterSubmit: Story = {
  render: (args) => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>ダイアログを開く</button>
      <mi-form-dialog
        form-id="demo-form"
        header-text="Enter 送信デモ"
        cancel-label="キャンセル"
        action-label="送信"
        @open-change=${bindOpenChange(args)}
        @mi-cancel=${args.onMiCancel}
        @action=${(e: Event) => {
          args.onAction?.(e);
          alert("送信ボタンが押されました");
        }}
      >
        <form
          id="demo-form"
          @submit=${(e: SubmitEvent) => {
            e.preventDefault();
            alert("フォームが送信されました（Enter）");
          }}
        >
          <div style="display:flex;flex-direction:column;gap:8px;">
            <mi-label-unit text="テキスト"></mi-label-unit>
            <mi-text-field
              name="demo"
              type="text"
              ?submit-on-enter=${true}
            ></mi-text-field>
          </div>
        </form>
      </mi-form-dialog>
    </div>
  `,
};
