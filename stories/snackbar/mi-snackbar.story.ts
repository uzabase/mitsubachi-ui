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

/** Storybook Actions パネル用 */
const logClick = action("click");

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
    run();
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
        <mi-snackbar size=${this.size} @click=${logClick}
          >${this.message}</mi-snackbar
        >
      `,
      mount,
    );
    // mi-snackbar は閉じると自動で DOM から削除されるので、MutationObserver で検知してマウントを掃除
    const observer = new MutationObserver(() => {
      if (!mount.querySelector("mi-snackbar")) {
        observer.disconnect();
        this.removeMount(mount);
      }
    });
    observer.observe(mount, { childList: true, subtree: true });

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

/** Show code / Code panel 用の実装例（args を反映） */
function miSnackbarSnippetFromArgs(args: SnackbarStoryArgs): string {
  const size = args.size ?? "small";
  const slotBody = escapeHtmlForSnippet(args.message ?? "");
  return `<!-- viewport をアプリのルート付近に1つ配置 -->
<mi-snackbar-viewport id="snackbar-viewport"></mi-snackbar-viewport>

<!-- 任意のタイミングで snackbar を viewport に追加 -->
<script>
const viewport = document.getElementById('snackbar-viewport');
const snackbar = document.createElement('mi-snackbar');
snackbar.size = '${size}';
snackbar.textContent = '${slotBody}';
viewport.appendChild(snackbar);
// → 自動で表示され、${args.size === "small" ? "5秒後" : "5秒後"}に自動で消えます
</script>`;
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
const ALL_PATTERNS_DOCS_SOURCE = `<!-- viewport をアプリのルート付近に1つ配置 -->
<mi-snackbar-viewport id="snackbar-viewport"></mi-snackbar-viewport>

<script>
function showSnackbar(size, message) {
  const viewport = document.getElementById('snackbar-viewport');
  const snackbar = document.createElement('mi-snackbar');
  snackbar.size = size;
  snackbar.textContent = message;
  viewport.appendChild(snackbar);
}
</script>

<!-- Small -->
<button onclick="showSnackbar('small', 'Message')">Small</button>

<!-- Small（長文） -->
<button onclick="showSnackbar('small', 'アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。')">Small（長文）</button>

<!-- Medium -->
<button onclick="showSnackbar('medium', 'Message')">Medium</button>

<!-- Medium（長文） -->
<button onclick="showSnackbar('medium', 'アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。')">Medium（長文）</button>`;

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
          "Snackbar は、ユーザー操作に対する短いフィードバックを表示する軽量な通知コンポーネントです。成功時のフィードバック専用で、短時間で自動消去されます。\n\n" +
          "## 使い方\n\n" +
          "1. `<mi-snackbar-viewport>` をアプリのルート付近に **1つだけ** 配置します（画面右上に固定表示されます）\n" +
          "2. 任意のタイミングで `<mi-snackbar>` 要素を作成し、viewport に `appendChild` します\n" +
          "3. snackbar は自動で入場アニメーション → 一定時間後に退場アニメーション → DOM から自動削除されます\n\n" +
          "```html\n" +
          "<!-- アプリのルート付近に1つ配置 -->\n" +
          "<mi-snackbar-viewport id=\"snackbar-viewport\"></mi-snackbar-viewport>\n\n" +
          "<!-- 任意のタイミングで snackbar を追加 -->\n" +
          "<script>\n" +
          "function showSnackbar(message) {\n" +
          "  const viewport = document.getElementById('snackbar-viewport');\n" +
          "  const snackbar = document.createElement('mi-snackbar');\n" +
          "  snackbar.size = 'small';\n" +
          "  snackbar.textContent = message;\n" +
          "  viewport.appendChild(snackbar);\n" +
          "}\n" +
          "</script>\n\n" +
          "<button onclick=\"showSnackbar('保存しました')\">保存</button>\n" +
          "```\n\n" +
          "- メッセージは既定スロット（タグの子要素）に記述（`text` 属性はありません）\n" +
          "- 失敗・警告・エラーには `mi-inline-notification` を使用してください",
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
