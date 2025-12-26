import "../icon/index";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { avatarStyles } from "./avatar.styles";

const size = ["small", "medium", "large", "x-large", "2x-large"] as const;

export type AvatarSize = (typeof size)[number];

function isValidSize(value: string): AvatarSize {
  if (size.some((s) => s === value)) {
    return value as AvatarSize;
  } else {
    console.warn(`${value}は無効なsize属性です。`);
    return "medium";
  }
}

function isValidColor(value: number): boolean {
  return value >= 1 && value <= 7;
}

/**
 * @summary アバターです。
 */
export class SpAvatar extends LitElement {
  static styles = avatarStyles;

  @property({ type: String })
  src = "";

  @property({ type: String })
  alt = "";

  @property({ type: String })
  initials = "";

  @property({ type: String })
  size: AvatarSize = "medium";

  @property({ type: Number })
  color = 0; // イニシャル表示時の背景色（1-7: カラーバリエーション、0または範囲外: グレー）

  @property({ type: Boolean })
  inactive = false; // 休止状態・停止状態を表す

  get #avatarClasses() {
    const classes = ["base", `size-${isValidSize(this.size)}`];

    // イニシャル表示時のみ色クラスを追加（1-7の範囲内の場合のみ）
    if (!this.src && this.#displayContent && isValidColor(this.color)) {
      classes.push(`color-${this.color}`);
    }

    // inactive状態
    if (this.inactive) {
      classes.push("inactive");
    }

    return classes.filter(Boolean).join(" ");
  }

  #handleImageError() {
    // 画像読み込み失敗時はsrcをクリアしてフォールバック表示（イニシャルまたはアイコン）
    this.src = "";
  }

  get #displayContent() {
    // initialsプロパティを優先、未指定の場合はslotのテキストコンテンツを使用
    const content = (this.initials || this.textContent || "").trim();
    // イニシャルは最大2文字に制限し、大文字に変換
    return content.slice(0, 2).toUpperCase();
  }

  render() {
    const displayText = this.#displayContent;

    return html`
      <div class="${this.#avatarClasses}">
        ${this.src
          ? html`
              <img
                src="${this.src}"
                alt="${this.alt}"
                @error="${this.#handleImageError}"
                class="image"
              />
            `
          : displayText
            ? html`<div class="initials">${displayText}</div>`
            : html`<div class="icon"><sp-icon type="person"></sp-icon></div>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-avatar": SpAvatar;
  }
}

if (!customElements.get("sp-avatar")) {
  customElements.define("sp-avatar", SpAvatar);
}
