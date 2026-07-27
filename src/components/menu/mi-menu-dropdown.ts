import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { menuDropdownStyles } from "./menu-dropdown.styles";
import type { MenuAlign, MenuSide } from "./mi-menu";

/**
 * @summary メニューのドロップダウンコンポーネント。
 *
 * mi-menu 内に配置して使用する。ポジショニングは mi-menu が @floating-ui/dom で行う。
 *
 * @slot - メニュー項目（mi-action-menu-item, mi-menu-group 等）
 */
export class MiMenuDropdown extends LitElement {
  static styles = makeStyles(menuDropdownStyles);

  /** 開閉状態（mi-menu から制御される） */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * トリガーに対する表示方向
   * @default 'bottom'
   */
  @property({ type: String })
  side: MenuSide = "bottom";

  /**
   * 表示方向の軸に沿った配置
   * @default 'start'
   */
  @property({ type: String })
  align: MenuAlign = "start";

  /**
   * トリガーからのオフセット（px）
   * @default 4
   */
  @property({ type: Number, attribute: "side-offset" })
  sideOffset = 4;

  /**
   * ドロップダウンの幅（px）
   * @default 200
   */
  @property({ type: Number })
  width = 200;

  /**
   * position 計算を無効にし、インラインに描画する。
   * Storybook の静的表示など、フロー内に配置したい場合に使用
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: "position-static" })
  positionStatic = false;

  /** 最初のメニュー項目にフォーカスを当てる */
  focusFirstItem() {
    const items = this._getMenuItems();
    const first = items.find((item) => !item.hasAttribute("disabled"));
    first?.focus();
  }

  /** メニュー項目一覧を取得（キーボードナビ用） */
  private _getMenuItems(): HTMLElement[] {
    return Array.from(
      this.querySelectorAll(
        "mi-action-menu-item:not([disabled]), mi-link-menu-item:not([disabled]), mi-select-menu-item:not([disabled]), mi-sub-menu-item:not([disabled])",
      ),
    );
  }

  private _handleKeyDown(e: KeyboardEvent) {
    const items = this._getMenuItems();
    if (items.length === 0) return;

    const currentIndex = items.indexOf(
      (this.getRootNode() as Document | ShadowRoot).activeElement?.closest(
        "mi-action-menu-item, mi-link-menu-item, mi-select-menu-item, mi-sub-menu-item",
      ) as HTMLElement,
    );

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const next = currentIndex + 1 < items.length ? currentIndex + 1 : 0;
        items[next]?.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prev =
          currentIndex - 1 >= 0 ? currentIndex - 1 : items.length - 1;
        items[prev]?.focus();
        break;
      }
      case "Home":
        e.preventDefault();
        items[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case "Tab":
        // Tab でメニューを閉じる
        this.closest("mi-menu")?.closeMenu();
        break;
    }
  }

  render() {
    if (!this.open) return nothing;

    const inlineSize = this.width === 0 ? "fit-content" : `${this.width}px`;

    return html`
      <div
        class="popup"
        role="menu"
        tabindex="-1"
        style="inline-size: ${inlineSize}"
        @keydown=${this._handleKeyDown}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-menu-dropdown": MiMenuDropdown;
  }
}

if (!customElements.get("mi-menu-dropdown")) {
  customElements.define("mi-menu-dropdown", MiMenuDropdown);
}
