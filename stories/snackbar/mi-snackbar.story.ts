import "../../src/components/snackbar/mi-snackbar";

import type { PropertyValues } from "@lit/reactive-element";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { css, html, LitElement, nothing, render } from "lit";
import { property, state } from "lit/decorators.js";

import {
  type SnackbarSize,
  snackbarSizes,
} from "../../src/components/snackbar/mi-snackbar";

/** React 版 snackbar.module.css の .viewport と同一（表示領域は Portal = document.body 直下） */
const SNACKBAR_STORY_VIEWPORT_STYLE_ID =
  "mitsubachi-snackbar-story-viewport-style";

function ensureSnackbarStoryViewportStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(SNACKBAR_STORY_VIEWPORT_STYLE_ID)) return;

  const el = document.createElement("style");
  el.id = SNACKBAR_STORY_VIEWPORT_STYLE_ID;
  el.textContent = `
    .snackbar-story-viewport {
      position: fixed;
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-small, 4px);
      inset-block-start: var(--spacing-large, 12px);
      inset-block-end: auto;
      inset-inline-start: auto;
      inset-inline-end: var(--spacing-large, 12px);
    }
    @media (max-width: 720px) {
      .snackbar-story-viewport {
        inset-block-start: auto;
        inset-inline-end: auto;
        inset-block-end: var(--spacing-large, 12px);
        inset-inline-start: 50%;
        transform: translateX(-50%);
      }
    }
  `;
  document.head.appendChild(el);
}

/** ストーリー用の args 型（React 版 Snackbar.stories.tsx に準拠） */
interface SnackbarStoryArgs {
  size: SnackbarSize;
  text: string;
}

/**
 * Snackbar を発火させるストーリー用トリガー（React 版 SnackbarTrigger に相当）。
 * Viewport は React の Toast.Portal と同様に document.body にマウントし、
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
  text = "Message";

  @state()
  private open = false;

  private portalHost: HTMLElement | null = null;

  private readonly handleClose = () => {
    this.open = false;
  };

  connectedCallback() {
    super.connectedCallback();
    ensureSnackbarStoryViewportStyles();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.teardownPortal();
  }

  protected updated(changed: PropertyValues<this>) {
    super.updated(changed);
    this.syncPortal();
  }

  private teardownPortal() {
    if (!this.portalHost) return;
    render(nothing, this.portalHost);
    this.portalHost.remove();
    this.portalHost = null;
  }

  private syncPortal() {
    if (this.open) {
      if (!this.portalHost) {
        this.portalHost = document.createElement("div");
        this.portalHost.className = "snackbar-story-viewport";
        document.body.appendChild(this.portalHost);
      }
      render(
        html`
          <mi-snackbar size=${this.size} @close=${this.handleClose}>
            ${this.text}
          </mi-snackbar>
        `,
        this.portalHost,
      );
    } else {
      this.teardownPortal();
    }
  }

  render() {
    return html`
      <button
        type="button"
        class="trigger"
        @click=${() => {
          this.open = true;
        }}
      >
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
          "- **成功フィードバック専用** — Snackbar は成功時のみ使用します\n" +
          "- **重要な情報には使わない** — 短時間で自動消去されるため、見逃してほしくない情報のお知らせには適しません\n" +
          "- **失敗・警告・エラー** — `mi-inline-notification` 等の別コンポーネントを使用してください",
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
    text: {
      control: { type: "text" },
      description: "表示するメッセージ",
    },
  },
  args: {
    size: "small",
    text: "Message",
  },
};

export default meta;

type Story = StoryObj<SnackbarStoryArgs>;

/** Small サイズ */
export const Small: Story = {
  args: {
    size: "small",
    text: "Message",
  },
  render: (args) => html`
    <snackbar-story-trigger
      size=${args.size}
      text=${args.text}
    ></snackbar-story-trigger>
  `,
};

/** Medium サイズ */
export const Medium: Story = {
  args: {
    size: "medium",
    text: "Message",
  },
  render: (args) => html`
    <snackbar-story-trigger
      size=${args.size}
      text=${args.text}
    ></snackbar-story-trigger>
  `,
};

/** Small サイズ・長いテキスト（最大3行・可変幅） */
export const SmallLongText: Story = {
  args: {
    size: "small",
    text: "アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。",
  },
  render: (args) => html`
    <snackbar-story-trigger
      size=${args.size}
      text=${args.text}
    ></snackbar-story-trigger>
  `,
};

/** Medium サイズ・長いテキスト（最大3行・最大幅 400px） */
export const MediumLongText: Story = {
  args: {
    size: "medium",
    text: "アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。",
  },
  render: (args) => html`
    <snackbar-story-trigger
      size=${args.size}
      text=${args.text}
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
    text: "保存しました",
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
        text=${args.text}
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
    text: "保存しました",
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
        text=${args.text}
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
    text: "Message",
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
          text=${args.text}
        ></snackbar-story-trigger>
      </div>

      <div>
        <h3 style="margin-block-end: 16px; color: #666; font-size: 14px;">
          Small（長文）
        </h3>
        <snackbar-story-trigger
          size="small"
          text="アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。"
        ></snackbar-story-trigger>
      </div>

      <div>
        <h3 style="margin-block-end: 16px; color: #666; font-size: 14px;">
          Medium
        </h3>
        <snackbar-story-trigger
          size="medium"
          text=${args.text}
        ></snackbar-story-trigger>
      </div>

      <div>
        <h3 style="margin-block-end: 16px; color: #666; font-size: 14px;">
          Medium（長文）
        </h3>
        <snackbar-story-trigger
          size="medium"
          text="アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。"
        ></snackbar-story-trigger>
      </div>
    </div>
  `,
};
