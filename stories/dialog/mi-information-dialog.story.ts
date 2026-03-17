import "../../src/components/dialog/mi-information-dialog";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiInformationDialog } from "../../src/components/dialog/mi-information-dialog";

const meta = {
  component: "mi-information-dialog",
  title: "Dialog/mi-information-dialog",
  parameters: {
    docs: {
      description: {
        component:
          "利用規約など、重要な情報を表示するダイアログです。Desktop: small (560px) / medium (800px) / large (1280px)。Phone: small は横余白あり、medium 以上はフルスクリーン。",
      },
    },
  },
  argTypes: {
    open: { type: "boolean" },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    headerText: { type: "string" },
    cancelLabel: { type: "string" },
    actionLabel: { type: "string" },
  },
  args: {
    open: false,
    size: "medium",
    headerText: "利用規約",
    cancelLabel: "",
    actionLabel: "閉じる",
  },
  render: (args) => html`
    <mi-information-dialog
      ?open=${args.open}
      size=${args.size}
      header-text=${args.headerText}
      cancel-label=${args.cancelLabel}
      action-label=${args.actionLabel}
      @mi-action=${action("mi-action")}
      @mi-cancel=${action("mi-cancel")}
    >
      <p style="margin: 0;">ここに利用規約の内容が表示されます。</p>
    </mi-information-dialog>
  `,
} satisfies Meta<MiInformationDialog>;

export default meta;
type Story = StoryObj<MiInformationDialog>;

export const Basic: Story = {
  tags: ["!dev-only"],
  args: {
    open: true,
  },
};

export const SizeSmall: Story = {
  name: "size=small",
  render: () => html`
    <mi-information-dialog
      open
      size="small"
      header-text="お知らせ"
      action-label="閉じる"
      @mi-action=${action("mi-action")}
    >
      <p style="margin: 0;">
        システムメンテナンスのため、3月15日 0:00〜6:00
        の間、サービスをご利用いただけません。
      </p>
    </mi-information-dialog>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "small サイズ (max-width: 560px) のダイアログです。Phone では横余白付きで表示されます。",
      },
    },
  },
};

export const SizeMedium: Story = {
  name: "size=medium",
  render: () => html`
    <mi-information-dialog
      open
      size="medium"
      header-text="利用規約"
      action-label="閉じる"
      @mi-action=${action("mi-action")}
    >
      <div style="margin: 0;">
        <h3 style="margin: 0 0 8px; font-size: 16px;">第1条（適用）</h3>
        <p style="margin: 0 0 16px;">
          本規約は、本サービスの利用に関する条件を定めるものであり、利用者と当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。
        </p>
        <h3 style="margin: 0 0 8px; font-size: 16px;">第2条（利用登録）</h3>
        <p style="margin: 0 0 16px;">
          登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。
        </p>
        <h3 style="margin: 0 0 8px; font-size: 16px;">第3条（禁止事項）</h3>
        <p style="margin: 0;">
          利用者は、本サービスの利用にあたり、法令または公序良俗に違反する行為、犯罪行為に関連する行為、その他当社が不適切と判断する行為を行ってはなりません。
        </p>
      </div>
    </mi-information-dialog>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "medium サイズ (max-width: 800px) のダイアログです。Phone ではフルスクリーンで表示されます。",
      },
    },
  },
};

export const SizeLarge: Story = {
  name: "size=large",
  render: () => html`
    <mi-information-dialog
      open
      size="large"
      header-text="詳細情報"
      action-label="閉じる"
      @mi-action=${action("mi-action")}
    >
      <div style="margin: 0;">
        <p style="margin: 0 0 16px;">
          これは large サイズ (max-width: 1280px) のダイアログです。
          テーブルやグラフなど、広い表示領域が必要なコンテンツに適しています。
        </p>
        <table
          style="width: 100%; border-collapse: collapse; font-size: 14px;"
        >
          <thead>
            <tr style="border-bottom: 2px solid rgba(0,0,0,0.1);">
              <th style="text-align: left; padding: 8px;">項目</th>
              <th style="text-align: left; padding: 8px;">値</th>
              <th style="text-align: left; padding: 8px;">説明</th>
            </tr>
          </thead>
          <tbody>
            ${Array.from(
              { length: 5 },
              (_, i) => html`
                <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
                  <td style="padding: 8px;">項目 ${i + 1}</td>
                  <td style="padding: 8px;">値 ${i + 1}</td>
                  <td style="padding: 8px;">
                    説明テキスト ${i + 1} がここに入ります
                  </td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
    </mi-information-dialog>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "large サイズ (max-width: 1280px) のダイアログです。Phone ではフルスクリーンで表示されます。",
      },
    },
  },
};

export const LongContent: Story = {
  name: "長いコンテンツ（スクロール）",
  render: () => html`
    <mi-information-dialog
      open
      size="medium"
      header-text="プライバシーポリシー"
      action-label="閉じる"
      @mi-action=${action("mi-action")}
    >
      ${Array.from(
        { length: 30 },
        (_, i) => html`
          <p style="margin: 0 0 12px;">
            第${i + 1}条 -
            ここにプライバシーポリシーの条文が入ります。コンテンツが多い場合、本文エリアがスクロール可能になります。スクロール位置に応じて、ヘッダーとフッターに仕切り線が動的に表示されます。
          </p>
        `,
      )}
    </mi-information-dialog>
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

export const ALL: Story = {
  name: "全サイズ一覧",
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${(["small", "medium", "large"] as const).map(
        (size) => html`
          <div>
            <mi-neutral-button
              variant="secondary"
              size="large"
              @click=${(e: Event) => {
                const dialog = (e.target as HTMLElement)
                  .closest("div")
                  ?.querySelector("mi-information-dialog");
                if (dialog) dialog.open = true;
              }}
            >
              ${size} ダイアログを開く
            </mi-neutral-button>
            <mi-information-dialog
              size=${size}
              header-text="${size} サイズのダイアログ"
              action-label="閉じる"
              @mi-action=${action("mi-action")}
            >
              <p style="margin: 0;">
                これは ${size} サイズ (${size === "small"
                  ? "560px"
                  : size === "medium"
                    ? "800px"
                    : "1280px"})
                のダイアログです。
              </p>
            </mi-information-dialog>
          </div>
        `,
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "全サイズバリアントのダイアログをそれぞれ開いて確認できます。",
      },
    },
  },
};
