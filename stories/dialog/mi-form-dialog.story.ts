import "../../src/components/dialog/mi-form-dialog";
import "../../src/components/text-field/text-field-unit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiFormDialog } from "../../src/components/dialog/mi-form-dialog";

const meta = {
  component: "mi-form-dialog",
  title: "Dialog/mi-form-dialog",
  parameters: {
    docs: {
      description: {
        component:
          "フォーム入力を行うダイアログです。Desktop: medium (800px)。Phone: フルスクリーン。",
      },
    },
  },
  argTypes: {
    open: { type: "boolean" },
    headerText: { type: "string" },
    cancelLabel: { type: "string" },
    actionLabel: { type: "string" },
  },
  args: {
    open: false,
    headerText: "プロフィール編集",
    cancelLabel: "キャンセル",
    actionLabel: "保存",
  },
  render: (args) => html`
    <mi-form-dialog
      ?open=${args.open}
      header-text=${args.headerText}
      cancel-label=${args.cancelLabel}
      action-label=${args.actionLabel}
      @mi-action=${action("mi-action")}
      @mi-cancel=${action("mi-cancel")}
    >
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <mi-text-field-unit label="名前"></mi-text-field-unit>
        <mi-text-field-unit label="メールアドレス"></mi-text-field-unit>
      </div>
    </mi-form-dialog>
  `,
} satisfies Meta<MiFormDialog>;

export default meta;
type Story = StoryObj<MiFormDialog>;

export const Basic: Story = {
  tags: ["!dev-only"],
  args: {
    open: true,
  },
};

export const WithTrigger: Story = {
  name: "トリガーボタン付き",
  render: () => html`
    <mi-neutral-button
      variant="primary"
      size="large"
      @click=${(e: Event) => {
        const dialog = (e.target as HTMLElement)
          .closest("div")
          ?.querySelector("mi-form-dialog");
        if (dialog) dialog.open = true;
      }}
    >
      フォームを開く
    </mi-neutral-button>
    <mi-form-dialog
      header-text="新規作成"
      cancel-label="キャンセル"
      action-label="作成"
      @mi-action=${action("mi-action")}
      @mi-cancel=${action("mi-cancel")}
    >
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <mi-text-field-unit label="タイトル"></mi-text-field-unit>
        <mi-text-field-unit label="説明"></mi-text-field-unit>
      </div>
    </mi-form-dialog>
  `,
  decorators: [(story) => html`<div>${story()}</div>`],
  parameters: {
    docs: {
      description: {
        story:
          "ボタンをクリックしてフォームダイアログを表示する、実際の使用パターンです。",
      },
    },
  },
};

export const ManyFields: Story = {
  name: "多数のフィールド（スクロール）",
  render: () => html`
    <mi-form-dialog
      open
      header-text="詳細設定"
      cancel-label="キャンセル"
      action-label="保存"
      @mi-action=${action("mi-action")}
      @mi-cancel=${action("mi-cancel")}
    >
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${Array.from(
          { length: 15 },
          (_, i) => html`
            <mi-text-field-unit
              label="フィールド ${i + 1}"
            ></mi-text-field-unit>
          `,
        )}
      </div>
    </mi-form-dialog>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "フォームフィールドが多い場合、本文エリアがスクロール可能になります。スクロール位置に応じてヘッダー・フッターに仕切り線が動的に表示されます。",
      },
    },
  },
};
