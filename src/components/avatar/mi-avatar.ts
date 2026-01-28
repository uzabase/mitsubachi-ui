import "../icon/index";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { avatarStyles } from "./avatar.styles";

const size = ["small", "medium", "large", "x-large", "2x-large"] as const;

export type AvatarSize = (typeof size)[number];

const colors = [
  "plum",
  "violet",
  "blue",
  "viridian",
  "green",
  "brown",
  "red",
] as const;

export type AvatarColor = (typeof colors)[number];

function isValidSize(value: string): AvatarSize {
  if (size.some((s) => s === value)) {
    return value as AvatarSize;
  } else {
    console.warn(`${value}は無効なsize属性です。`);
    return "medium";
  }
}

function isValidColor(value: string): value is AvatarColor {
  return colors.some((c) => c === value);
}

/**
 * @summary アバターです。
 */
export class MiAvatar extends LitElement {
  static styles = makeStyles(avatarStyles);

  @property({ type: String })
  src = "";

  @property({ type: String })
  alt = "";

  @property({ type: String })
  initials = "";

  @property({ type: String })
  size: AvatarSize = "medium";

  @property({ type: String })
  color: AvatarColor | "" = ""; // イニシャル表示時の背景色（plum, violet, blue, viridian, green, brown, red のいずれか、空文字の場合はグレー）

  @property({ type: Boolean })
  inactive = false; // 休止状態・停止状態を表す

  get #avatarClasses() {
    const classes = ["base", `size-${isValidSize(this.size)}`];

    // イニシャル表示時のみ色クラスを追加（有効な色名の場合のみ）
    if (
      !this.src &&
      this.#displayContent &&
      this.color &&
      isValidColor(this.color)
    ) {
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
            : html`<div class="icon"><mi-icon type="person"></mi-icon></div>`}
      </div>
    `;
  }
}

/** @deprecated 代わりに MiAvatar を使用してください */
export class SpAvatar extends MiAvatar {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-avatar": MiAvatar;
    "sp-avatar": SpAvatar;
  }
}

if (!customElements.get("mi-avatar")) {
  customElements.define("mi-avatar", MiAvatar);
}

if (!customElements.get("sp-avatar")) {
  customElements.define("sp-avatar", SpAvatar);
}
