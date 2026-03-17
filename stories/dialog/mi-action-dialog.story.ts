import "../../src/components/dialog/mi-action-dialog";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiActionDialog } from "../../src/components/dialog/mi-action-dialog";

const meta = {
  component: "mi-action-dialog",
  title: "Dialog/mi-action-dialog",
  parameters: {
    docs: {
      description: {
        component:
          "確認や削除など、ユーザーの意思決定を求めるダイアログです。Desktop: 560px。Phone: 横余白あり、高さは広がらない。",
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
    headerText: "操作の確認",
    cancelLabel: "キャンセル",
    actionLabel: "実行する",
  },
  render: (args) => html`
    <mi-action-dialog
      ?open=${args.open}
      header-text=${args.headerText}
      cancel-label=${args.cancelLabel}
      action-label=${args.actionLabel}
      @mi-action=${action("mi-action")}
      @mi-cancel=${action("mi-cancel")}
    >
      <p style="margin: 0;">この操作を実行してもよろしいですか？</p>
    </mi-action-dialog>
  `,
} satisfies Meta<MiActionDialog>;

export default meta;
type Story = StoryObj<MiActionDialog>;

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
          ?.querySelector("mi-action-dialog");
        if (dialog) dialog.open = true;
      }}
    >
      ダイアログを開く
    </mi-neutral-button>
    <mi-action-dialog
      header-text="データの削除"
      cancel-label="キャンセル"
      action-label="削除する"
      @mi-action=${action("mi-action")}
      @mi-cancel=${action("mi-cancel")}
    >
      <p style="margin: 0;">
        選択したデータを削除します。この操作は取り消せません。
      </p>
    </mi-action-dialog>
  `,
  decorators: [
    (story) => html`<div>${story()}</div>`,
  ],
  parameters: {
    docs: {
      description: {
        story:
          "ボタンをクリックしてダイアログを表示する、実際の使用パターンです。",
      },
    },
  },
};

export const WithoutCancel: Story = {
  name: "キャンセルなし",
  render: () => html`
    <mi-action-dialog
      open
      header-text="通知"
      action-label="OK"
      @mi-action=${action("mi-action")}
    >
      <p style="margin: 0;">処理が完了しました。</p>
    </mi-action-dialog>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "`cancel-label` を省略すると、キャンセルボタンが非表示になります。",
      },
    },
  },
};

export const LongContent: Story = {
  name: "長いコンテンツ（スクロール）",
  render: () => html`
    <mi-action-dialog
      open
      header-text="利用規約の確認"
      cancel-label="キャンセル"
      action-label="同意する"
      @mi-action=${action("mi-action")}
      @mi-cancel=${action("mi-cancel")}
    >
      ${Array.from(
        { length: 20 },
        (_, i) => html`
          <p style="margin: 0 0 8px;">
            これはダイアログ本文の段落 ${i + 1}
            です。コンテンツが多い場合、本文エリアがスクロール可能になります。スクロール位置に応じて、ヘッダーとフッターに仕切り線が表示されます。
          </p>
        `,
      )}
    </mi-action-dialog>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "本文が長い場合、スクロール可能になります。スクロール位置に応じてヘッダー・フッターに仕切り線が動的に表示されます。",
      },
    },
  },
};
