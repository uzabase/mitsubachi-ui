import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";

/**
 * @summary メニューアイテムをグルーピングするコンポーネント。
 *
 * 複数の mi-menu-group を並べると、グループ間に区切り線が表示される。
 * オプションの label でグループにラベルを付けられる。
 *
 * @slot - メニュー項目
 */
export class MiMenuGroup extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: block;
      padding-block: var(--spacing-medium, 8px);
    }

    :host(:not(:last-child)) {
      border-block-end: 1px solid
        var(--border-regular-default, rgba(0, 0, 0, 0.1));
    }

    .group-label {
      padding-block: var(--spacing-small, 4px);
      padding-inline: var(--spacing-x-large, 16px);
      font-family: var(--typography-font-family, Arial, sans-serif);
      font-weight: var(--typography-font-weight-regular, 400);
      font-size: var(--font-scale-30, 12px);
      line-height: 1.3;
      letter-spacing: 0.02em;
      color: var(--text-weak-default, rgba(0, 0, 0, 0.54));
    }
  `);

  /** グループのラベル */
  @property({ type: String })
  label = "";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "group");
    if (this.label) {
      this.setAttribute("aria-label", this.label);
    }
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("label")) {
      if (this.label) {
        this.setAttribute("aria-label", this.label);
      } else {
        this.removeAttribute("aria-label");
      }
    }
  }

  render() {
    return html`
      ${this.label
        ? html`<div class="group-label">${this.label}</div>`
        : nothing}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-menu-group": MiMenuGroup;
  }
}

if (!customElements.get("mi-menu-group")) {
  customElements.define("mi-menu-group", MiMenuGroup);
}
