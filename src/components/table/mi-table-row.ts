import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";

/**
 * @summary テーブルの行。
 *
 * `<tr>` に相当する。選択状態とホバー状態のスタイルを管理する。
 *
 * @slot - mi-table-header-cell または mi-table-body-cell
 */
export class MiTableRow extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: table-row;
    }

    :host(:hover:not([selected])) {
      --_cell-bg: transparent;
      background-color: var(--surface-overlay-hover, rgba(0, 0, 0, 0.04));
    }

    :host([selected]) {
      --_cell-bg: transparent;
      background-color: var(--surface-selected-default, #e8edff);
    }

    :host([selected]:hover) {
      background-color: var(--surface-selected-hover, #dbe4ff);
    }
  `);

  /** 選択状態 */
  @property({ type: Boolean, reflect: true })
  selected = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "row");
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("selected")) {
      if (this.selected) {
        this.setAttribute("aria-selected", "true");
      } else {
        this.removeAttribute("aria-selected");
      }
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-table-row": MiTableRow;
  }
}

if (!customElements.get("mi-table-row")) {
  customElements.define("mi-table-row", MiTableRow);
}
