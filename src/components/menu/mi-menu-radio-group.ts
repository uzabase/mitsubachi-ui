import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";

/**
 * @summary SelectMenuItem のラジオグループ。
 *
 * 内部の mi-select-menu-item をラジオボタングループとして管理する。
 * グループ内で1つだけ選択できる（Single-select）。
 *
 * @slot - mi-select-menu-item 要素
 * @fires change - 選択値が変更されたとき。新しい値は `event.target.value` で取得する。
 */
export class MiMenuRadioGroup extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: contents;
    }
  `);

  /** 現在の選択値 */
  @property({ type: String, reflect: true })
  value = "";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "group");
    this.addEventListener("click", this._handleItemClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._handleItemClick);
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("value")) {
      this._updateChildren();
    }
  }

  private _handleItemClick = (e: Event) => {
    const item = (e.target as Element).closest("mi-select-menu-item") as
      | (HTMLElement & { value: string; disabled: boolean })
      | null;
    if (!item || item.disabled) return;
    const newValue = item.value;
    if (this.value !== newValue) {
      this.value = newValue;
      this.dispatchEvent(new Event("change"));
    }
  };

  /** 子の mi-select-menu-item に再レンダリングを通知 */
  private _updateChildren() {
    this.querySelectorAll("mi-select-menu-item").forEach((item) => {
      (item as LitElement).requestUpdate();
    });
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-menu-radio-group": MiMenuRadioGroup;
  }
}

if (!customElements.get("mi-menu-radio-group")) {
  customElements.define("mi-menu-radio-group", MiMenuRadioGroup);
}
