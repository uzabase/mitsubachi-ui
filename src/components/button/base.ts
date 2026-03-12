/**
 * ボタン共通ベースクラス（内部用）
 * @internal Storybookからは見えない
 */
import "../loading/mi-loading";

import { html, LitElement, nothing, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";

import { isIconType } from "../icon";
import { makeStyles } from "../styles";
import { buttonStyles } from "./button.styles";

export const variants = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "plane",
] as const;
export type Variant = (typeof variants)[number];

export const sizes = ["medium", "large", "xLarge"] as const;
export type Size = (typeof sizes)[number];

export type ButtonTheme = "normal" | "danger" | "ai";

export function isValidVariant(value: string): value is Variant {
  return variants.some((variant) => variant === value);
}

export function isValidSize(value: string): value is Size {
  return sizes.some((s) => s === value);
}

function isValidIconType(value: string): boolean {
  if (isIconType(value)) {
    return true;
  } else {
    console.warn(`${value}は無効なicon-type属性です。`);
    return false;
  }
}

/**
 * ボタン共通ベースクラス。mi-neutral-button / mi-danger-button / mi-ai-button / mi-icon-button が継承する。
 * @internal
 * @typeParam S - size プロパティの型。サブクラスが独自のサイズ体系を持つ場合にオーバーライドする。
 */
export class ButtonBase<S extends string = Size> extends LitElement {
  static styles = makeStyles(buttonStyles);

  static formAssociated = true;

  /** 継承クラスでオーバーライド可能。テーマ（normal / danger / ai） */
  protected getTheme(): ButtonTheme {
    return "normal";
  }

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * 選択状態。`toggle=true` と併用するとスクリーンリーダーに状態が伝わる。
   * `toggle=false` のまま `selected=true` にすると視覚的な選択スタイルは適用されるが、
   * スクリーンリーダーには伝わらない。ナビゲーションの active 状態など意味的マーキングが
   * 別途必要な場合は `aria-current` などを合わせて使用すること。
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * true のときトグルボタンとして振る舞い、aria-pressed 属性を "true"/"false" で出力する。
   * false（デフォルト）のときは通常ボタンとして扱われ、aria-pressed は付与されない。
   * トグルボタンとして使う場合は `selected` と必ず併用すること。
   */
  @property({ type: Boolean, reflect: true })
  toggle = false;

  @property({ type: String, reflect: true })
  variant: Variant = "primary";

  @property({ type: String, reflect: true })
  size: S = "medium" as S;

  @property({ type: String })
  name = "";

  @property({ type: String })
  value = "";

  @property({ type: String })
  type: "button" | "submit" | "reset" = "button";

  /**
   * 設定するとボタンがリンク (`<a>`) としてレンダリングされる。
   * `disabled` / `loading` 時はリンクとして機能しない（`aria-disabled` で表現）。
   */
  @property({ type: String })
  href = "";

  /** `href` 指定時のリンクターゲット。`href` がない場合は無視される。 */
  @property({ type: String })
  target = "";

  /** `href` 指定時の rel 属性。`target="_blank"` のとき自動で `"noopener noreferrer"` が付与される。 */
  @property({ type: String })
  rel = "";

  @property({ type: String, attribute: "icon-type" })
  iconType = "";

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  /** 継承クラスでオーバーライド可能（例: 非推奨の variants 属性の反映） */
  protected getEffectiveVariant(): Variant {
    const validVariant = isValidVariant(this.variant);
    if (!validVariant) {
      console.warn(`${this.variant}は無効なvariant属性です。`);
    }
    return validVariant ? this.variant : variants[0];
  }

  protected get buttonClasses() {
    const sizeClassMap = {
      medium: "medium",
      large: "large",
      xLarge: "x-large",
    };
    const validSize = isValidSize(this.size);
    if (!validSize) {
      console.warn(`${this.size}は無効なsize属性です。`);
    }
    const size: Size = validSize ? (this.size as Size) : sizes[0];

    return [
      "base",
      this.getTheme(),
      this.getEffectiveVariant(),
      sizeClassMap[size],
      this.loading ? "loading" : "",
      this.selected ? "selected" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  protected get isLink() {
    return !!this.href;
  }

  protected get isDisabled() {
    return this.disabled || this.loading;
  }

  protected get loadingSize() {
    const sizeAttributeMap = {
      medium: "large",
      large: "xLarge",
      xLarge: "2xLarge",
    };
    const validSize = isValidSize(this.size);
    const size: Size = validSize ? (this.size as Size) : sizes[0];
    return sizeAttributeMap[size];
  }

  protected renderLoading() {
    return html`<mi-loading size="${this.loadingSize}"></mi-loading>`;
  }

  protected get showIcon() {
    return !this.loading && this.iconType && isValidIconType(this.iconType);
  }

  protected renderIcon() {
    return html`<mi-icon type="${this.iconType}" class="icon"></mi-icon>`;
  }

  /** スロットのレンダリング。テキストを持たないボタン（mi-icon-button）はオーバーライドして nothing を返す。 */
  protected renderSlot(): TemplateResult | typeof nothing {
    return html`<slot class="text"></slot>`;
  }

  protected get effectiveRel() {
    if (this.rel) return this.rel;
    return this.target === "_blank" ? "noopener noreferrer" : "";
  }

  protected renderContent() {
    return html`${this.loading ? this.renderLoading() : nothing}${this.showIcon
      ? this.renderIcon()
      : nothing}
    ${this.renderSlot()}`;
  }

  render() {
    if (this.isLink) {
      return html`
        <a
          class="${this.buttonClasses}"
          href="${this.isDisabled ? nothing : this.href}"
          target="${this.target || nothing}"
          rel="${this.effectiveRel || nothing}"
          aria-disabled="${this.isDisabled ? "true" : nothing}"
          aria-busy="${this.loading ? "true" : nothing}"
          @click="${this.handleLinkClick}"
        >
          ${this.renderContent()}
        </a>
      `;
    }
    return html`
      <button
        class="${this.buttonClasses}"
        ?disabled="${this.isDisabled}"
        name="${this.name || nothing}"
        value="${this.value || nothing}"
        type="${this.type}"
        aria-pressed="${this.toggle
          ? this.selected
            ? "true"
            : "false"
          : nothing}"
        aria-busy="${this.loading ? "true" : nothing}"
        @click="${this.handleClick}"
      >
        ${this.renderContent()}
      </button>
    `;
  }

  protected handleClick(event: Event) {
    // shadow button の click が composed: true でホストにも伝播するため、
    // this.dispatchEvent による再発行と二重になるのを防ぐ
    event.stopPropagation();
    if (this.loading) return;
    const allowed = this.dispatchEvent(new MouseEvent("click", event));
    if (!allowed || !this.#internals.form) return;

    if (this.type === "submit") {
      event.preventDefault();
      if (this.name) {
        const hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = this.name;
        hidden.value = this.value;
        this.#internals.form.appendChild(hidden);
        this.#internals.form.requestSubmit();
        hidden.remove();
      } else {
        this.#internals.form.requestSubmit();
      }
    } else if (this.type === "reset") {
      this.#internals.form.reset();
    }
  }

  protected handleLinkClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.isDisabled) {
      event.preventDefault();
      return;
    }
    const allowed = this.dispatchEvent(new MouseEvent("click", event));
    if (!allowed) {
      event.preventDefault();
    }
  }
}
