/**
 * ボタン共通ベースクラス（内部用）
 * @internal Storybookからは見えない
 */
import "../loading/mi-loading";

import { html, LitElement, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import { isIconType } from "../icon";
import { makeStyles } from "../styles";
import style from "./button.css?inline";

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

export function isValidVariant(value: string): Variant {
  if (variants.some((variant) => variant === value)) {
    return value as Variant;
  } else {
    console.warn(`${value}は無効なvariant属性です。`);
    return variants[0];
  }
}

export function isValidSize(value: string): Size {
  if (sizes.some((s) => s === value)) {
    return value as Size;
  } else {
    console.warn(`${value}は無効なsize属性です。`);
    return sizes[0];
  }
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
  static styles = makeStyles(unsafeCSS(style));

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

  @property({ type: String })
  variant: Variant = "primary";

  @property({ type: String })
  size: S = "medium" as S;

  @property({ type: String })
  name = "";

  @property({ type: String })
  value = "";

  @property({ type: String })
  type: "button" | "submit" | "reset" = "button";

  @property({ type: String, attribute: "icon-type" })
  iconType = "";

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  /** 継承クラスでオーバーライド可能（例: 非推奨の variants 属性の反映） */
  protected getEffectiveVariant(): Variant {
    return isValidVariant(this.variant);
  }

  protected get buttonClasses() {
    const sizeClassMap = {
      medium: "medium",
      large: "large",
      xLarge: "x-large",
    };

    return [
      "base",
      this.getTheme(),
      this.getEffectiveVariant(),
      sizeClassMap[isValidSize(this.size)],
      this.loading ? "loading" : "",
      this.selected ? "selected" : "",
    ]
      .filter(Boolean)
      .join(" ");
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
    return sizeAttributeMap[isValidSize(this.size)];
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
  protected renderSlot() {
    return html`<slot class="text"></slot>`;
  }

  render() {
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
        ${this.loading ? this.renderLoading() : nothing}
        ${this.showIcon ? this.renderIcon() : nothing} ${this.renderSlot()}
      </button>
    `;
  }

  protected handleClick(event: Event) {
    // shadow button の click が composed: true でホストにも伝播するため、
    // this.dispatchEvent による再発行と二重になるのを防ぐ
    event.stopPropagation();
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
}
