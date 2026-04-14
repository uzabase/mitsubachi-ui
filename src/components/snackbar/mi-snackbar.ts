import "../button/mi-icon-button";
import "../icon-color";

import type { PropertyValues } from "@lit/reactive-element";
import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./snackbar.styles";

export const snackbarSizes = ["small", "medium"] as const;
export type SnackbarSize = (typeof snackbarSizes)[number];

function toSnackbarSize(value: unknown): SnackbarSize {
  return typeof value === "string" &&
    (snackbarSizes as readonly string[]).includes(value)
    ? (value as SnackbarSize)
    : "small";
}

/**
 * ユーザー操作に対する成功時の短いフィードバックを表示するオーバーレイ通知です。
 * 失敗・警告・エラーは `mi-inline-notification` 等で伝えてください。
 *
 * @summary 成功フィードバック用の Snackbar
 *
 * @slot - メッセージ本文（`text` のような属性ではなく、子要素／スロットで渡します）
 *
 * @cssprop --surface-success - 背景色
 * @cssprop --text-regular-default - テキスト色
 * @cssprop --snackbar-z-index - 重なり順（デフォルトは React 版 viewport と同程度の大きい値）
 * @cssprop --snackbar-transition-duration - 入退出アニメーションの時間（デフォルト 200ms）
 *
 * ## 配置について
 *
 * `mi-snackbar` 自体は画面端に固定するスタイルを内包していません（配置はマウント先のレイアウトに従います）。
 * デザインどおり「デスクトップでは右上・狭い画面では下中央」に重ね表示したい場合は、
 * `mi-snackbar-viewport` を 1 つ置き、その子としてポータルしてください（複数同時表示は縦方向に gap でずれて並びます）。
 *
 * 自前のコンテナを使う場合は `document.body` 直下など、ビューポート基準で `position: fixed` できる要素にしてください。
 * 祖先要素の `transform` などによっては `fixed` の基準がずれ、意図しない位置に見えることがあります。
 *
 * ### なぜ viewport ラッパーを組み込まないか
 *
 * - **責務の分離**: 通知の見た目・閉じる挙動・アニメに責務を絞り、画面端への固定やポータル先はアプリのレイアウトやフレームワークに合わせて載せ替えやすくしています。
 * - **利用側の差**: SSR・複数同時表示・既存の Toast 基盤・z-index の都合などで最適なマウント方法が異なり、単一のポータル方針をライブラリに押し付けにくいためです。
 * - **既存設計との整合**: React 版でも Snackbar 本体と viewport／Provider 側を分ける想定に揃えています。
 *
 * @example
 * ```html
 * <mi-snackbar size="small">保存しました</mi-snackbar>
 * <mi-snackbar size="medium">処理が完了しました。詳細は一覧をご確認ください。</mi-snackbar>
 * <!-- 自動で閉じない（テストや常時表示用） -->
 * <mi-snackbar auto-hide-timeout="0">メッセージ</mi-snackbar>
 * ```
 */
export class MiSnackbar extends LitElement {
  static styles = makeStyles(style);

  /**
   * 表示サイズ。`small` / `medium` とも最大幅 400px（`inline-size` は内容に応じ可変）。いずれも最大3行まで。
   * @default 'small'
   */
  @property({ type: String, reflect: true })
  size: SnackbarSize = "small";

  /**
   * 表示してから自動的に閉じるまでの時間（ミリ秒）。React 版 `Snackbar.Provider` の `timeout` に相当。
   * `0` 以下のときは自動非表示しません。
   * @default 5000
   */
  @property({ type: Number, attribute: "auto-hide-timeout" })
  autoHideTimeout = 5000;

  /** 入場アニメーション用（初回は React 版 data-starting-style に相当） */
  @state()
  private entering = true;

  /** 退場アニメーション用（React 版 data-ending-style に相当） */
  @state()
  private exiting = false;

  private exitRemoved = false;

  /** 退出時に opacity / transform の transitionend を両方待つ（片方だけだとカクつきやすい） */
  private readonly exitTransitionSeen = new Set<string>();

  private exitFallbackTimer: number | undefined;

  private autoHideTimerId: number | undefined;

  private clearAutoHideTimer() {
    if (this.autoHideTimerId !== undefined) {
      clearTimeout(this.autoHideTimerId);
      this.autoHideTimerId = undefined;
    }
  }

  private scheduleAutoHide() {
    this.clearAutoHideTimer();
    const ms = this.autoHideTimeout;
    if (
      typeof ms !== "number" ||
      !Number.isFinite(ms) ||
      ms <= 0 ||
      typeof window === "undefined"
    ) {
      return;
    }
    this.autoHideTimerId = window.setTimeout(() => {
      this.autoHideTimerId = undefined;
      this.beginClose();
    }, ms);
  }

  connectedCallback() {
    super.connectedCallback();
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      this.entering = false;
    }
    queueMicrotask(() => this.scheduleAutoHide());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearAutoHideTimer();
    if (this.exitFallbackTimer !== undefined) {
      clearTimeout(this.exitFallbackTimer);
      this.exitFallbackTimer = undefined;
    }
  }

  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);
    if (changed.has("autoHideTimeout")) {
      this.scheduleAutoHide();
    }
  }

  protected firstUpdated() {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.entering = false;
      });
    });
  }

  private removeSelf() {
    if (!this.isConnected) return;
    this.remove();
  }

  private beginClose() {
    if (!this.isConnected) return;
    if (this.exiting) return;
    this.clearAutoHideTimer();
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // 退出アニメなしでも即座に DOM から削除
      this.exiting = true;
      this.exitRemoved = true;
      this.removeSelf();
      return;
    }
    this.exitTransitionSeen.clear();
    this.entering = false;
    this.exiting = true;
    this.exitRemoved = false;
    this.exitFallbackTimer = window.setTimeout(() => {
      if (this.exiting && !this.exitRemoved) {
        this.exitRemoved = true;
        this.removeSelf();
      }
    }, 350);
  }

  private handleRootTransitionEnd(e: TransitionEvent) {
    if (!this.isConnected) return;
    if (!this.exiting || this.exitRemoved) return;
    const root = this.shadowRoot?.querySelector(".root");
    if (!root || e.target !== root) return;
    if (e.propertyName !== "opacity" && e.propertyName !== "transform") return;
    this.exitTransitionSeen.add(e.propertyName);
    if (this.exitTransitionSeen.size < 2) return;
    this.exitTransitionSeen.clear();
    this.exitRemoved = true;
    if (this.exitFallbackTimer !== undefined) {
      clearTimeout(this.exitFallbackTimer);
      this.exitFallbackTimer = undefined;
    }
    this.removeSelf();
  }

  private handleClose() {
    this.beginClose();
  }

  /**
   * 閉じるボタンと同じ退出アニメーションを開始する（プログラムからの取下げ・キュー上限など）。
   * 既に退出中のときは `false` を返す。
   */
  dismiss(): boolean {
    if (this.exiting) return false;
    this.beginClose();
    return true;
  }

  render() {
    const size = toSnackbarSize(this.size);
    const closeIcon = size === "small" ? "cross-small" : "cross";
    const buttonSize = size === "small" ? "small" : "medium";

    return html`
      <div
        class="root ${size}"
        ?data-starting-style=${this.entering}
        ?data-ending-style=${this.exiting}
        @transitionend=${this.handleRootTransitionEnd}
        role="status"
        aria-live="polite"
      >
        <div class="text-area">
          <mi-icon-color class="icon" type="success"></mi-icon-color>
          <div class="text"><slot></slot></div>
        </div>
        <mi-icon-button
          variant="ghost"
          size=${buttonSize}
          icon-type=${closeIcon}
          aria-label="閉じる"
          tooltip-disabled
          @click=${this.handleClose}
        ></mi-icon-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-snackbar": MiSnackbar;
  }
}

if (!customElements.get("mi-snackbar")) {
  customElements.define("mi-snackbar", MiSnackbar);
}
