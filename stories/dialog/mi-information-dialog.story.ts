import "../../src/components/dialog/mi-information-dialog";
import "../../src/components/button/mi-neutral-button";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { DialogOpenChangeDetail } from "../../src/components/dialog/base";
import type { MiInformationDialog } from "../../src/components/dialog/mi-information-dialog";

/** Storybook Actions 用（コンポーネントの公開 API 外） */
type MiInformationDialogStory = MiInformationDialog & {
  onAction?: (e: Event) => void;
  onOpenChange?: (e: CustomEvent<DialogOpenChangeDetail>) => void;
};

const meta = {
  component: "mi-information-dialog",
  title: "Dialog/mi-information-dialog",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "フッターの閉じるボタンで閉じたときは `action` のみ。`mi-cancel` はありません。Esc・ホストが `open` を false にしたとき・`dialog.close()` などでは `open-change` のみ（その場合 `action` は発火しません）。オーバーレイのクリックでは閉じません。",
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
      options: ["small", "medium"],
      description: "ダイアログのサイズ（Desktop 時）",
    },
    headerText: { type: "string" },
    actionLabel: { type: "string" },
    onAction: {
      action: "action",
      description:
        "閉じるボタンが押されたとき（cancelable。`preventDefault()` で閉じない）",
      table: { category: "Events" },
    },
    onOpenChange: {
      action: "open-change",
      description:
        '閉じるボタン以外で閉じたとき（Esc・`open` を false・`dialog.close()` 等。背景クリックでは閉じない）。detail: { open: false, reason: "escape" | null }（Esc は "escape"、それ以外は null）',
      table: { category: "Events" },
    },
  },
  args: {
    size: "medium",
    headerText: "利用規約",
    actionLabel: "閉じる",
    onAction: action("action"),
    onOpenChange: action("open-change"),
  },
} satisfies Meta<MiInformationDialogStory>;

export default meta;
type Story = StoryObj<MiInformationDialogStory>;

const openDialog = (e: Event) => {
  const container = (e.target as HTMLElement).closest(".story-container");
  const dialog = container?.querySelector(
    "mi-information-dialog",
  ) as MiInformationDialog;
  if (dialog) dialog.open = true;
};

const handleOpenChange = (e: CustomEvent) => {
  const dialog = e.target as MiInformationDialog;
  dialog.open = false;
};

function bindOpenChange(args: Partial<MiInformationDialogStory> | undefined) {
  return (e: CustomEvent) => {
    handleOpenChange(e);
    args?.onOpenChange?.(e as CustomEvent<DialogOpenChangeDetail>);
  };
}

/**
 * 基本的な情報表示ダイアログ。
 * 利用規約など、重要な情報を表示するために使用。
 * Desktop: size=small / medium。Phone: small は横余白ありのモーダル、medium はフルスクリーン。
 */
export const Default: Story = {
  render: (args) => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>利用規約を表示</button>
      <mi-information-dialog
        size=${args.size}
        header-text=${args.headerText}
        action-label=${args.actionLabel}
        @open-change=${bindOpenChange(args)}
        @action=${args.onAction}
      >
        <p>
          ここに利用規約の本文が入ります。重要な情報を表示するダイアログです。
        </p>
        <p>
          Phone では
          ${args.size === "small"
            ? "横余白ありのモーダル表示（角丸、中央）です。"
            : "横余白なし・画面端まで表示され、高さも広がります（フルスクリーン）。"}
        </p>
      </mi-information-dialog>
    </div>
  `,
};

/**
 * 小サイズ（small）の情報ダイアログ。
 * 短い情報やお知らせを表示する場合に使用。
 */
export const Small: Story = {
  args: { size: "small" },
  render: (args) => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>お知らせ（小）</button>
      <mi-information-dialog
        size=${args.size}
        header-text="お知らせ"
        action-label="閉じる"
        @open-change=${bindOpenChange(args)}
        @action=${args.onAction}
      >
        <p>短いお知らせ内容がここに表示されます。</p>
      </mi-information-dialog>
    </div>
  `,
};

/**
 * 中サイズ（medium）の情報ダイアログ。
 * 標準的な情報量のコンテンツに使用（デフォルト）。
 */
export const Medium: Story = {
  args: { size: "medium" },
  render: (args) => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>
        プライバシーポリシー（中）
      </button>
      <mi-information-dialog
        size=${args.size}
        header-text="プライバシーポリシー"
        action-label="閉じる"
        @open-change=${bindOpenChange(args)}
        @action=${args.onAction}
      >
        <p>プライバシーポリシーの本文がここに表示されます。</p>
        <p>中程度の長さの情報を表示するのに適したサイズです。</p>
        <p>複数の段落を含むことができます。</p>
      </mi-information-dialog>
    </div>
  `,
};

const longTermsContent = html`
  <h2>第1章 総則</h2>
  <h3>第1条（目的）</h3>
  <p>
    本規約は、当社が提供するサービス（以下「本サービス」といいます。）の利用に関する条件を定めるものです。
    本サービスの利用者（以下「ユーザー」といいます。）は、本規約に同意した上で、本サービスを利用するものとします。
  </p>
  <h3>第2条（定義）</h3>
  <p>本規約において使用する用語の定義は、以下の通りとします。</p>
  <ol>
    <li>「当社」とは、本サービスを提供する事業者を指します。</li>
    <li>「ユーザー」とは、本サービスを利用する個人または法人を指します。</li>
    <li>「本サービス」とは、当社が提供するすべてのサービスを指します。</li>
    <li>
      「登録情報」とは、ユーザーが本サービスの利用にあたり登録した情報を指します。
    </li>
    <li>「個人情報」とは、個人情報保護法に定める個人情報を指します。</li>
  </ol>

  <h2>第2章 アカウント</h2>
  <h3>第3条（アカウント登録）</h3>
  <p>
    ユーザーは、本サービスの利用にあたり、当社所定の方法によりアカウント登録を行うものとします。
    登録情報は正確かつ最新の内容を保つ義務があります。登録情報に虚偽、誤記または記載漏れがあった場合、
    当社はユーザーに対する本サービスの提供を停止することができるものとします。
  </p>
  <h3>第4条（アカウント管理）</h3>
  <p>
    ユーザーは、自己の責任において、本サービスに関するアカウント情報を適切に管理および保管するものとし、
    これを第三者に利用させ、または貸与、譲渡、名義変更、売買等をしてはならないものとします。
  </p>
  <p>
    アカウント情報の管理不十分、使用上の過誤、第三者の使用等によって生じた損害に関する責任は
    ユーザーが負うものとし、当社は一切の責任を負いません。
  </p>

  <h2>第3章 サービスの利用</h2>
  <h3>第5条（禁止事項）</h3>
  <p>ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
  <ol>
    <li>法令または公序良俗に違反する行為</li>
    <li>犯罪行為に関連する行為</li>
    <li>
      当社、本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
    </li>
    <li>当社のサービスの運営を妨害するおそれのある行為</li>
    <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
    <li>不正アクセスをし、またはこれを試みる行為</li>
    <li>他のユーザーに成りすます行為</li>
    <li>
      当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
    </li>
    <li>
      当社、本サービスの他のユーザーまたは第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
    </li>
    <li>その他、当社が不適切と判断する行為</li>
  </ol>

  <h3>第6条（サービスの停止・中断）</h3>
  <p>
    当社は、以下のいずれかに該当する場合には、ユーザーに事前に通知することなく、
    本サービスの全部または一部の提供を停止または中断することができるものとします。
  </p>
  <ol>
    <li>本サービスに係るコンピュータシステムの保守点検または更新を行う場合</li>
    <li>
      地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
    </li>
    <li>コンピュータまたは通信回線等が事故により停止した場合</li>
    <li>その他、当社が本サービスの提供が困難と判断した場合</li>
  </ol>

  <h2>第4章 免責・損害賠償</h2>
  <h3>第7条（免責事項）</h3>
  <p>
    当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた
    取引、連絡または紛争等について一切責任を負いません。
  </p>
  <p>
    当社は、本サービスに関して、ユーザーが被った損害について、当社に故意または重過失がある場合を除き、
    一切の責任を負わないものとします。
  </p>

  <h3>第8条（損害賠償）</h3>
  <p>
    ユーザーが本規約に違反したことにより当社に損害を与えた場合、
    当社はユーザーに対して損害賠償を請求することができるものとします。
  </p>

  <h2>第5章 その他</h2>
  <h3>第9条（利用規約の変更）</h3>
  <p>
    当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
    変更後の本規約は、本サービス上に表示した時点より効力を生じるものとします。
  </p>

  <h3>第10条（準拠法・裁判管轄）</h3>
  <p>本規約の解釈にあたっては、日本法を準拠法とします。</p>
  <p>
    本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を
    専属的合意管轄とします。
  </p>

  <p style="margin-block-start: 32px; text-align: right">以上</p>
`;

/**
 * 長い利用規約を含むダイアログ。
 * Header と Footer は固定され、Body のみスクロール可能。
 * 各サイズ（small, medium）で確認できます。
 */
export const LongContent: Story = {
  render: (args) => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>長い利用規約を開く</button>
      <mi-information-dialog
        size=${args.size}
        header-text="サービス利用規約"
        action-label="閉じる"
        @open-change=${bindOpenChange(args)}
        @action=${args.onAction}
      >
        ${longTermsContent}
      </mi-information-dialog>
    </div>
  `,
};

/**
 * Phone表示での基本的な情報ダイアログ。
 * 横余白なし・画面端まで表示され、高さも広がる（フルスクリーン）。
 */
export const PhoneDefault: Story = {
  render: (args) => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>利用規約を表示</button>
      <mi-information-dialog
        size=${args.size}
        header-text="利用規約"
        action-label="閉じる"
        @open-change=${bindOpenChange(args)}
        @action=${args.onAction}
      >
        <p>
          ここに利用規約の本文が入ります。重要な情報を表示するダイアログです。
        </p>
        <p>
          Phone では
          ${args.size === "small"
            ? "横余白ありのモーダル表示（角丸、中央）です。"
            : "横余白なし・画面端まで表示され、高さも広がります（フルスクリーン）。"}
        </p>
      </mi-information-dialog>
    </div>
  `,
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};

/**
 * Phone表示での長いコンテンツを含むダイアログ。
 * フルスクリーン表示で、Body のみスクロール可能。
 */
export const PhoneLongContent: Story = {
  render: (args) => html`
    <div class="story-container">
      <button type="button" @click=${openDialog}>長い利用規約を開く</button>
      <mi-information-dialog
        size=${args.size}
        header-text="サービス利用規約"
        action-label="閉じる"
        @open-change=${bindOpenChange(args)}
        @action=${args.onAction}
      >
        ${longTermsContent}
      </mi-information-dialog>
    </div>
  `,
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};
