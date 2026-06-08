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
 * @fires change - 選択値が変更されたとき。`detail.value` に新しい値を含む。
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
    this.addEventListener(
      "select-menu-item-click",
      this._handleItemClick as EventListener,
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(
      "select-menu-item-click",
      this._handleItemClick as EventListener,
    );
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("value")) {
      this._updateChildren();
    }
  }

  private _handleItemClick = (e: CustomEvent<{ value: string }>) => {
    const newValue = e.detail.value;
    if (this.value !== newValue) {
      this.value = newValue;
      this.dispatchEvent(
        new CustomEvent("change", {
          bubbles: true,
          composed: true,
          detail: { value: newValue },
        }),
      );
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
