import "../../src/components/dialog/mi-action-dialog";
import "../../src/components/button/mi-neutral-button";
import "../../src/components/button/mi-danger-button";
import "../../src/components/avatar/mi-avatar";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiActionDialog } from "../../src/components/dialog/mi-action-dialog";

const meta = {
  component: "mi-action-dialog",
  title: "Components/Dialog/ActionDialog",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: false,
      table: { disable: true },
      description: "開閉状態（制御用）。Storyでは内部で管理します",
    },
    headerText: { type: "string" },
    cancelLabel: { type: "string" },
    actionLabel: { type: "string" },
    danger: {
      control: "boolean",
      description: "破壊的アクション（削除等）の場合は true",
    },
  },
  args: {
    headerText: "操作の確認",
    cancelLabel: "キャンセル",
    actionLabel: "実行する",
  },
} satisfies Meta<MiActionDialog>;

export default meta;
type Story = StoryObj<MiActionDialog>;

const openDialog = (e: Event) => {
  const container = (e.target as HTMLElement).closest(".story-container");
  const dialog = container?.querySelector("mi-action-dialog") as MiActionDialog;
  if (dialog) dialog.open = true;
};

const handleOpenChange = (e: CustomEvent) => {
  const dialog = e.target as MiActionDialog;
  dialog.open = e.detail.open;
};

/**
 * 基本的な確認ダイアログ。
 * Figma サンプルに準拠。キャンセル（ghost）とアクション（primary）の2つのボタン。
 */
export const Default: Story = {
  render: (args) => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>開く</button>
      <mi-action-dialog
        header-text=${args.headerText}
        cancel-label=${args.cancelLabel}
        action-label=${args.actionLabel}
        ?danger=${args.danger}
        @open-change=${handleOpenChange}
        @action=${() => console.log("action")}
      >
        この操作を実行してもよろしいですか？
      </mi-action-dialog>
    </div>
  `,
};

/**
 * ステータス削除の確認ダイアログ。
 * Figma _status-delete サンプルに準拠。破壊的アクションのため mi-danger-button を使用。
 */
export const StatusDelete: Story = {
  args: {
    headerText: "ステータスの削除",
    cancelLabel: "キャンセル",
    actionLabel: "削除",
    danger: true,
  },
  render: (args) => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>ステータスを削除</button>
      <mi-action-dialog
        header-text=${args.headerText}
        cancel-label=${args.cancelLabel}
        action-label=${args.actionLabel}
        ?danger=${args.danger}
        @open-change=${handleOpenChange}
        @action=${() => console.log("delete")}
      >
        <p style="margin: 0 0 8px 0; font-weight: 700; font-size: 16px;">
          「{ステータス名}」を削除しますか？
        </p>
        <p style="margin: 0; font-size: 14px;">
          削除したステータスは元に戻せません。
        </p>
      </mi-action-dialog>
    </div>
  `,
};

/**
 * キャンセルボタンなし、閉じるボタンのみのダイアログ。
 * 通知など、確認のみが必要な場合に使用。
 */
export const CloseOnly: Story = {
  args: { cancelLabel: "" },
  render: (args) => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>開く</button>
      <mi-action-dialog
        header-text="お知らせ"
        cancel-label=${args.cancelLabel}
        action-label="閉じる"
        @open-change=${handleOpenChange}
        @action=${() => console.log("close")}
      >
        処理が完了しました。
      </mi-action-dialog>
    </div>
  `,
};

/**
 * 管理者権限付与の確認ダイアログ。
 * Figma _administrator-add サンプルに準拠。ユーザー情報を表示して確認を求める。
 */
export const AdministratorAdd: Story = {
  args: {
    headerText: "管理者権限付与の確認",
    cancelLabel: "キャンセル",
    actionLabel: "管理者権限を付与",
  },
  render: (args) => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>管理者権限を付与</button>
      <mi-action-dialog
        header-text=${args.headerText}
        cancel-label=${args.cancelLabel}
        action-label=${args.actionLabel}
        @open-change=${handleOpenChange}
        @action=${() => console.log("grant")}
      >
        <p style="margin: 0 0 24px 0; font-size: 14px;">
          管理者権限を付与すると、スピーダの利用に関する権限設定やユーザーの各種設定変更を行うことができます。<br />
          このユーザーに管理者権限を付与してもよろしいですか？
        </p>
        <p style="margin: 0 0 4px 0; font-weight: 700; font-size: 12px;">
          名前
        </p>
        <p style="margin: 0 0 24px 0; font-size: 14px;">ai.anzai</p>
        <p style="margin: 0 0 4px 0; font-weight: 700; font-size: 12px;">
          ログインID
        </p>
        <p style="margin: 0; font-size: 14px;">ai.anzai@uzabase.com</p>
      </mi-action-dialog>
    </div>
  `,
};

/**
 * プロフィール写真削除の確認ダイアログ。
 * Figma _profile-image-delete サンプルに準拠。削除前後のアバターを表示。
 */
export const ProfileImageDelete: Story = {
  args: {
    headerText: "プロフィール写真の削除",
    cancelLabel: "キャンセル",
    actionLabel: "削除",
    danger: true,
  },
  render: (args) => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>プロフィール写真を削除</button>
      <mi-action-dialog
        header-text=${args.headerText}
        cancel-label=${args.cancelLabel}
        action-label=${args.actionLabel}
        ?danger=${args.danger}
        @open-change=${handleOpenChange}
        @action=${() => console.log("delete profile image")}
      >
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <p style="margin: 0 0 8px 0; font-weight: 700; font-size: 16px;">
              プロフィール写真を削除しますか？
            </p>
            <p style="margin: 0; font-size: 14px;">
              プロフィール写真を削除すると、代わりにこの画像が使用されます。
            </p>
          </div>
          <div
            style="display: flex; gap: 24px; align-items: center; justify-content: center;"
          >
            <mi-avatar size="2x-large" initials="Y" color="plum"></mi-avatar>
            <span style="font-size: 24px;">→</span>
            <mi-avatar size="2x-large" initials="?" color="plum"></mi-avatar>
          </div>
        </div>
      </mi-action-dialog>
    </div>
  `,
};

/**
 * 長いコンテンツを含むダイアログ。
 * Header と Footer は固定され、Body のみスクロール可能。
 */
export const LongContent: Story = {
  render: () => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>長いコンテンツを開く</button>
      <mi-action-dialog
        header-text="管理者権限付与の確認"
        cancel-label="キャンセル"
        action-label="付与する"
        @open-change=${handleOpenChange}
        @action=${() => console.log("grant admin")}
      >
        <p style="margin-top: 0">
          管理者権限を付与すると、スピーダの利用に関する権限設定やユーザーの各種設定変更を行うことができます。<br />
          このユーザーに管理者権限を付与してもよろしいですか？
        </p>
        <p>
          <strong>名前</strong><br />
          山田 太郎
        </p>
        <p>
          <strong>ログインID</strong><br />
          yamada.taro@example.com
        </p>
        <p>
          <strong>所属部署</strong><br />
          営業本部 第一営業部 企画グループ
        </p>
        <p>
          <strong>現在の権限</strong><br />
          一般ユーザー
        </p>
        <p><strong>付与される権限の詳細</strong></p>
        <ul style="margin-top: 0">
          <li>
            ユーザー管理：新規ユーザーの追加、既存ユーザーの編集・削除が可能
          </li>
          <li>権限管理：各ユーザーの権限設定、グループ権限の変更が可能</li>
          <li>組織管理：部署・グループの作成、編集、削除が可能</li>
          <li>システム設定：全体設定の変更、機能の有効化・無効化が可能</li>
          <li>
            データ管理：全ユーザーのデータへのアクセス、エクスポートが可能
          </li>
          <li>ログ閲覧：システムログ、操作ログの閲覧が可能</li>
          <li>
            セキュリティ設定：パスワードポリシー、アクセス制限の設定が可能
          </li>
        </ul>
        <p><strong>注意事項</strong></p>
        <ul style="margin-top: 0">
          <li>
            管理者権限を付与すると、機密情報を含むすべてのデータにアクセスできるようになります
          </li>
          <li>
            管理者による操作はすべて監査ログに記録され、定期的に確認されます
          </li>
          <li>
            不適切な権限使用が確認された場合、権限の剥奪および懲戒処分の対象となる場合があります
          </li>
          <li>管理者権限の付与には、上位管理者による承認が必要です</li>
          <li>
            管理者権限は定期的に見直しが行われ、必要に応じて変更または取り消される場合があります
          </li>
        </ul>
      </mi-action-dialog>
    </div>
  `,
};

/**
 * Phone表示での基本的なダイアログ。
 * 横に余白を持ち、高さは広がらない（max-height: min(80dvh, 560px)）。
 */
export const PhoneDefault: Story = {
  render: (args) => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>開く</button>
      <mi-action-dialog
        header-text=${args.headerText}
        cancel-label=${args.cancelLabel}
        action-label=${args.actionLabel}
        ?danger=${args.danger}
        @open-change=${handleOpenChange}
        @action=${() => console.log("action")}
      >
        この操作を実行してもよろしいですか？
      </mi-action-dialog>
    </div>
  `,
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};

/**
 * Phone表示での長いコンテンツを含むダイアログ。
 * 横に余白があり、高さは制限される（スクロール可能）。
 */
export const PhoneLongContent: Story = {
  render: () => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>長いコンテンツを開く</button>
      <mi-action-dialog
        header-text="管理者権限付与の確認"
        cancel-label="キャンセル"
        action-label="付与する"
        @open-change=${handleOpenChange}
        @action=${() => console.log("grant admin")}
      >
        <p style="margin-top: 0">
          管理者権限を付与すると、スピーダの利用に関する権限設定やユーザーの各種設定変更を行うことができます。<br />
          このユーザーに管理者権限を付与してもよろしいですか？
        </p>
        <p>
          <strong>名前</strong><br />
          山田 太郎
        </p>
        <p>
          <strong>ログインID</strong><br />
          yamada.taro@example.com
        </p>
        <p>
          <strong>所属部署</strong><br />
          営業本部 第一営業部 企画グループ
        </p>
        <p>
          <strong>現在の権限</strong><br />
          一般ユーザー
        </p>
        <p><strong>付与される権限の詳細</strong></p>
        <ul style="margin-top: 0">
          <li>
            ユーザー管理：新規ユーザーの追加、既存ユーザーの編集・削除が可能
          </li>
          <li>権限管理：各ユーザーの権限設定、グループ権限の変更が可能</li>
          <li>組織管理：部署・グループの作成、編集、削除が可能</li>
          <li>システム設定：全体設定の変更、機能の有効化・無効化が可能</li>
          <li>
            データ管理：全ユーザーのデータへのアクセス、エクスポートが可能
          </li>
          <li>ログ閲覧：システムログ、操作ログの閲覧が可能</li>
          <li>
            セキュリティ設定：パスワードポリシー、アクセス制限の設定が可能
          </li>
        </ul>
        <p><strong>注意事項</strong></p>
        <ul style="margin-top: 0">
          <li>
            管理者権限を付与すると、機密情報を含むすべてのデータにアクセスできるようになります
          </li>
          <li>
            管理者による操作はすべて監査ログに記録され、定期的に確認されます
          </li>
          <li>
            不適切な権限使用が確認された場合、権限の剥奪および懲戒処分の対象となる場合があります
          </li>
          <li>管理者権限の付与には、上位管理者による承認が必要です</li>
          <li>
            管理者権限は定期的に見直しが行われ、必要に応じて変更または取り消される場合があります
          </li>
        </ul>
      </mi-action-dialog>
    </div>
  `,
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};
