import "../../src/components/snackbar/mi-snackbar";
import "../../src/components/snackbar/mi-snackbar-viewport";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { css, html, LitElement, nothing, render } from "lit";
import { property } from "lit/decorators.js";
import { action } from "storybook/actions";

import {
  MiSnackbar,
  type SnackbarSize,
  snackbarSizes,
} from "../../src/components/snackbar/mi-snackbar";

/** Storybook 用: 全トリガーで共有する `mi-snackbar-viewport`（複数件は縦にずれて表示） */
const SHARED_SNACKBAR_VIEWPORT_ID = "mitsubachi-snackbar-story-shared-viewport";

/** 画面上に同時に出す Snackbar の上限（超えた分は古いものから DOM から外す） */
const MAX_STORY_SNACKBARS = 5;

/** 追加順（古いほど先頭）。全 `snackbar-story-trigger` で共有 */
const storySnackbarMountOrder: HTMLElement[] = [];

const storySnackMountToTrigger = new WeakMap<
  HTMLElement,
  SnackbarStoryTrigger
>();

/** Storybook Actions パネル用（`mi-snackbar` の `close`） */
const logSnackbarClose = action("close");

function getOrCreateSharedSnackbarStoryViewport(): HTMLElement {
  if (typeof document === "undefined") {
    throw new Error("document is not available");
  }
  let el = document.getElementById(SHARED_SNACKBAR_VIEWPORT_ID);
  if (!el) {
    el = document.createElement("mi-snackbar-viewport");
    el.id = SHARED_SNACKBAR_VIEWPORT_ID;
    document.body.appendChild(el);
  }
  return el;
}

/** ストーリー用の args 型（React 版 Snackbar.stories.tsx に準拠） */
interface SnackbarStoryArgs {
  size: SnackbarSize;
  /** `mi-snackbar` の既定スロットに投影する文言（Controls 用。`text` 属性ではない） */
  message: string;
}

/**
 * Snackbar を発火させるストーリー用トリガー（React 版 SnackbarTrigger に相当）。
 * 共有の `mi-snackbar-viewport` へポータルし、クリックのたびに 1 件追加（連打で縦に積む）。
 * 同時表示は最大 5 件で、それを超えた分は古いものから取り除く。
 * Storybook ラッパーの transform 等に引っ張られないよう fixed の基準をビューポートに揃える。
 */
class SnackbarStoryTrigger extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .trigger {
      padding: 8px 16px;
      border-radius: 6px;
      border: 1px solid #ccc;
      background: #fff;
      cursor: pointer;
      font-size: 14px;
    }
  `;

  @property({ type: String })
  size: SnackbarSize = "small";

  @property({ type: String })
  message = "Message";

  /** 共有 viewport 内の Lit マウント点（クリックのたびに 1 つ追加） */
  private readonly snackbarMounts: HTMLElement[] = [];

  /** マウントを DOM から外し、グローバル順・WeakMap・該当トリガーの配列を同期する */
  private static removeMountForAny(mount: HTMLElement) {
    const run = () => {
      const oi = storySnackbarMountOrder.indexOf(mount);
      if (oi >= 0) storySnackbarMountOrder.splice(oi, 1);
      const owner = storySnackMountToTrigger.get(mount);
      storySnackMountToTrigger.delete(mount);
      if (owner) {
        const idx = owner.snackbarMounts.indexOf(mount);
        if (idx >= 0) owner.snackbarMounts.splice(idx, 1);
      }
      render(nothing, mount);
      mount.remove();
    };
    const doc = mount.ownerDocument as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(run);
    } else {
      run();
    }
  }

  private removeMount(mount: HTMLElement) {
    SnackbarStoryTrigger.removeMountForAny(mount);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    for (const mount of [...this.snackbarMounts]) {
      this.removeMount(mount);
    }
  }

  private showSnackbar() {
    const viewport = getOrCreateSharedSnackbarStoryViewport();
    const mount = document.createElement("div");
    mount.className = "snackbar-mount";
    viewport.appendChild(mount);
    storySnackbarMountOrder.push(mount);
    storySnackMountToTrigger.set(mount, this);
    this.snackbarMounts.push(mount);
    render(
      html`
        <mi-snackbar
          size=${this.size}
          @close=${(e: Event) => {
            logSnackbarClose(e);
            this.removeMount(mount);
          }}
        >
          ${this.message}
        </mi-snackbar>
      `,
      mount,
    );
    while (storySnackbarMountOrder.length > MAX_STORY_SNACKBARS) {
      const oldest = storySnackbarMountOrder[0];
      const snack = oldest.querySelector("mi-snackbar") as MiSnackbar | null;
      if (!snack) {
        SnackbarStoryTrigger.removeMountForAny(oldest);
        continue;
      }
      if (!snack.dismiss()) break;
      break;
    }
  }

  render() {
    return html`
      <button type="button" class="trigger" @click=${() => this.showSnackbar()}>
        Snackbarを表示
      </button>
    `;
  }
}

if (!customElements.get("snackbar-story-trigger")) {
  customElements.define("snackbar-story-trigger", SnackbarStoryTrigger);
}

/** Storybook の id からストーリー slug（例: small-long-text）を取り出す */
function snackbarStorySlug(storyId: string) {
  const i = storyId.lastIndexOf("--");
  return i === -1 ? storyId : storyId.slice(i + 2);
}

function escapeHtmlForSnippet(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Show code / Code panel 用の `<mi-snackbar>` 利用例（args を反映） */
function miSnackbarSnippetFromArgs(args: SnackbarStoryArgs): string {
  const size = args.size ?? "small";
  const slotBody = escapeHtmlForSnippet(args.message ?? "");
  return `<mi-snackbar size="${size}">${slotBody}</mi-snackbar>`;
}

function snackbarArgsFromContext(context: unknown): SnackbarStoryArgs {
  const args = (context as { args?: Partial<SnackbarStoryArgs> }).args;
  if (!args) return { size: "small", message: "Message" };
  const size =
    typeof args.size === "string" &&
    (snackbarSizes as readonly string[]).includes(args.size)
      ? (args.size as SnackbarSize)
      : "small";
  const message = typeof args.message === "string" ? args.message : "Message";
  return { size, message };
}

/** AllPatterns ストーリー専用（複数パターンを Show code に並べる） */
const ALL_PATTERNS_DOCS_SOURCE = `<!-- Small -->
<mi-snackbar size="small">Message</mi-snackbar>

<!-- Small（長文） -->
<mi-snackbar size="small">アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。</mi-snackbar>

<!-- Medium -->
<mi-snackbar size="medium">Message</mi-snackbar>

<!-- Medium（長文） -->
<mi-snackbar size="medium">アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。</mi-snackbar>`;

const meta: Meta<SnackbarStoryArgs> = {
  title: "Snackbar/mi-snackbar",
  parameters: {
    layout: "centered",
    options: {
      storySort: (a: { id: string }, b: { id: string }) => {
        const order = [
          "small",
          "medium",
          "small-long-text",
          "medium-long-text",
          "desktop-position",
          "mobile-position",
          "all-patterns",
        ];
        const rank = (id: string) => {
          const slug = snackbarStorySlug(id);
          const i = order.indexOf(slug);
          return i === -1 ? order.length : i;
        };
        return rank(a.id) - rank(b.id);
      },
    },
    docs: {
      description: {
        component:
          "Snackbar は、ユーザー操作に対する短いフィードバックを、既存 UI の上に重ねて表示する軽量な Overlay 通知コンポーネントです。\n\n" +
          "ユーザーの視線に入りやすい位置に、短時間だけ情報を提示し、操作フローを中断させずに状態を共有することを目的としています。\n\n" +
          "### 使い方のルール\n\n" +
          "- **メッセージの渡し方** — `mi-snackbar` に **`text` 属性はありません**。本文は **既定スロット**（タグの子要素／スロット）に記述してください。\n" +
          "- **イベント** — **`close`** が閉じる操作・自動非表示・表示上限による取下げのあとに発火します（`bubbles` / `composed`）。Canvas 下部の **Actions** タブでログを確認できます。\n" +
          "- **成功フィードバック専用** — Snackbar は成功時のみ使用します\n" +
          "- **重要な情報には使わない** — 短時間で自動消去されるため、見逃してほしくない情報のお知らせには適しません\n" +
          "- **失敗・警告・エラー** — `mi-inline-notification` 等の別コンポーネントを使用してください\n\n" +
          "### 本番での表示位置について\n\n" +
          "`mi-snackbar` 自体は **画面の右上に固定するスタイルを内包していません**（配置はマウント先のレイアウトに従います）。デザインどおり **デスクトップでは右上・狭い画面では下中央** に重ね表示したい場合は、**`mi-snackbar-viewport` を 1 つ置き、その子としてポータルする**のが簡単です（複数同時表示は **縦方向に `gap` でずれて** 並びます）。自前のコンテナを使う場合は、本ストーリーと同様に **`document.body` 直下など、ビューポート基準で `position: fixed` できる要素**にしてください。祖先要素の `transform` などによっては `fixed` の基準がずれ、意図しない位置に見えることがあります。\n\n" +
          "<details>\n<summary><strong>なぜ viewport ラッパーを `mi-snackbar` に組み込まないか</strong></summary>\n\n" +
          "- **責務の分離** — 通知の見た目・閉じる挙動・アニメに責務を絞り、**画面端への固定やポータル先**はアプリのレイアウトやフレームワークに合わせて載せ替えやすいようにしています。\n" +
          "- **利用側の差** — SSR・複数同時表示・既存の Toast 基盤・z-index の都合などで最適なマウント方法が異なり、**単一のポータル方針をライブラリに押し付けにくい**ためです。\n" +
          "- **既存設計との整合** — React 版でも Snackbar 本体と viewport／Provider 側を分ける想定に揃えています。\n" +
          "- **拡張** — 複数件を同じ位置に縦にずらして出すには **`mi-snackbar-viewport`** を利用できます（`mi-snackbar` 本体には組み込まず、必要に応じてアプリ側で組み合わせます）。\n\n" +
          "</details>\n\n" +
          "<details>\n<summary><strong>Show code（コード表示）とキャンバス・プレビューの違い</strong></summary>\n\n" +
          "- **Show code**（Canvas / Docs）には `<mi-snackbar>` の利用例の HTML が表示されます。Controls の `size` と **メッセージ（既定スロットの内容）** も反映されます（`text` 属性ではありません）。\n" +
          "- **キャンバス上のプレビュー**は `<snackbar-story-trigger>` がクリック後に `<mi-snackbar>` を **共有の** `<mi-snackbar-viewport>` へポータルするデモです（複数トリガーで開くと縦に積みます）。Storybook のラッパー由来で `position: fixed` の見え方が崩れないようにするためのものです。\n" +
          "- 属性・slot・イベントの詳細は `mi-snackbar` の JSDoc（ソースの `mi-snackbar.ts`）を参照してください。\n\n" +
          "</details>",
      },
      source: {
        language: "html",
        transform: (_code: string, context: unknown) =>
          miSnackbarSnippetFromArgs(snackbarArgsFromContext(context)),
      },
    },
  },
  tags: ["!dev-only"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: [...snackbarSizes],
      description: "Snackbarのサイズ",
    },
    message: {
      control: { type: "text" },
      description:
        "メッセージ本文（`mi-snackbar` の既定スロットに入る文字列。`text` 属性はコンポーネントに存在しません）",
    },
  },
  args: {
    size: "small",
    message: "Message",
  },
};

export default meta;

type Story = StoryObj<SnackbarStoryArgs>;

/** Small サイズ */
export const Small: Story = {
  args: {
    size: "small",
    message: "Message",
  },
  render: (args) => html`
    <snackbar-story-trigger
      size=${args.size}
      message=${args.message}
    ></snackbar-story-trigger>
  `,
};

/** Medium サイズ */
export const Medium: Story = {
  args: {
    size: "medium",
    message: "Message",
  },
  render: (args) => html`
    <snackbar-story-trigger
      size=${args.size}
      message=${args.message}
    ></snackbar-story-trigger>
  `,
};

/** Small サイズ・長いテキスト（最大3行・可変幅） */
export const SmallLongText: Story = {
  args: {
    size: "small",
    message:
      "アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。",
  },
  render: (args) => html`
    <snackbar-story-trigger
      size=${args.size}
      message=${args.message}
    ></snackbar-story-trigger>
  `,
};

/** Medium サイズ・長いテキスト（最大3行・最大幅 400px） */
export const MediumLongText: Story = {
  args: {
    size: "medium",
    message:
      "アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。",
  },
  render: (args) => html`
    <snackbar-story-trigger
      size=${args.size}
      message=${args.message}
    ></snackbar-story-trigger>
  `,
};

/**
 * デスクトップ配置
 * 画面右上に表示（721px 超のビューポートで確認）
 */
export const DesktopPosition: Story = {
  args: {
    size: "small",
    message: "保存しました",
  },
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  render: (args) => html`
    <div style="padding: 40px;">
      <div style="margin-block-end: 24px;">
        <p style="color: #666; font-size: 14px; margin-block-end: 8px;">
          デスクトップ配置: 画面右上に表示、右からスライドイン
        </p>
        <p style="color: #999; font-size: 12px;">
          721px以上のビューポートで確認してください
        </p>
      </div>
      <snackbar-story-trigger
        size=${args.size}
        message=${args.message}
      ></snackbar-story-trigger>
    </div>
  `,
};

/**
 * モバイル配置
 * 画面下中央に表示（720px 以下のビューポートで確認）
 */
export const MobilePosition: Story = {
  args: {
    size: "small",
    message: "保存しました",
  },
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: (args) => html`
    <div style="padding: 40px;">
      <div style="margin-block-end: 24px;">
        <p style="color: #666; font-size: 14px; margin-block-end: 8px;">
          モバイル配置: 画面下中央に表示、下からスライドイン
        </p>
        <p style="color: #999; font-size: 12px;">
          720px以下のビューポートで確認してください
        </p>
      </div>
      <snackbar-story-trigger
        size=${args.size}
        message=${args.message}
      ></snackbar-story-trigger>
    </div>
  `,
};

/**
 * 全パターン一覧
 * Small / Medium の見た目を並べて確認
 */
export const AllPatterns: Story = {
  args: {
    size: "small",
    message: "Message",
  },
  parameters: {
    docs: {
      source: {
        code: ALL_PATTERNS_DOCS_SOURCE,
        language: "html",
      },
    },
  },
  render: (args) => html`
    <div
      style="display: flex; flex-direction: column; gap: 32px; padding: 40px;"
    >
      <div>
        <h3 style="margin-block-end: 16px; color: #666; font-size: 14px;">
          Small
        </h3>
        <snackbar-story-trigger
          size="small"
          message=${args.message}
        ></snackbar-story-trigger>
      </div>

      <div>
        <h3 style="margin-block-end: 16px; color: #666; font-size: 14px;">
          Small（長文）
        </h3>
        <snackbar-story-trigger
          size="small"
          message="アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。"
        ></snackbar-story-trigger>
      </div>

      <div>
        <h3 style="margin-block-end: 16px; color: #666; font-size: 14px;">
          Medium
        </h3>
        <snackbar-story-trigger
          size="medium"
          message=${args.message}
        ></snackbar-story-trigger>
      </div>

      <div>
        <h3 style="margin-block-end: 16px; color: #666; font-size: 14px;">
          Medium（長文）
        </h3>
        <snackbar-story-trigger
          size="medium"
          message="アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。"
        ></snackbar-story-trigger>
      </div>
    </div>
  `,
};
