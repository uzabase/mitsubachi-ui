import "../icon";

import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";
import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { menuItemLayoutStyles, menuItemRootStyles } from "./menu-item.styles";

/**
 * @summary サブメニューを開くためのメニュー項目。
 *
 * 選択するとネストされたサブメニューが表示される。
 * 右端にシェブロンアイコンが常に表示される。
 * 非タッチデバイスでは hover、タッチデバイスでは tap で開閉する。
 * メニューの階層は最大2階層まで。
 *
 * @slot - メニュー項目のラベル
 * @slot icon - ラベルの先頭に表示するアイコン
 * @slot submenu - サブメニューのドロップダウン（mi-menu-dropdown）
 */
export class MiSubMenuItem extends LitElement {
  static styles = makeStyles(
    menuItemRootStyles,
    menuItemLayoutStyles,
    css`
      :host {
        position: relative;
        padding-block: var(--spacing-small, 4px);
        padding-inline-start: var(--spacing-x-large, 16px);
        padding-inline-end: var(--spacing-large, 12px);
        overflow: clip;
        color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
        --_menu-item-icon-color: var(
          --icon-regular-default,
          rgba(0, 0, 0, 0.84)
        );
      }

      .content {
        display: flex;
        flex: 1;
        align-items: center;
        gap: var(--spacing-small, 4px);
        min-inline-size: 0;
      }

      .item-layout {
        flex: 1;
        min-inline-size: 0;
      }

      /* disabled */
      :host([disabled]) {
        color: var(--text-disabled, rgba(0, 0, 0, 0.35));
        --_menu-item-icon-color: var(--icon-disabled, rgba(0, 0, 0, 0.25));
        cursor: not-allowed;
      }

      /* chevron icon */
      .chevron-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        inline-size: var(--icon-size-medium, 20px);
        block-size: var(--icon-size-medium, 20px);
        color: var(--_menu-item-icon-color);
      }

      @media (max-width: 720px) {
        .chevron-icon {
          inline-size: var(--icon-size-large, 22px);
          block-size: var(--icon-size-large, 22px);
        }
      }
    `,
  );

  /**
   * 無効化状態
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state()
  private _hasIcon = false;

  @state()
  private _subOpen = false;

  private _cleanup?: () => void;
  private _hoverTimer?: ReturnType<typeof setTimeout>;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "menuitem");
    this.setAttribute("tabindex", "-1");
    this.setAttribute("aria-haspopup", "menu");
    this.addEventListener("mouseenter", this._handleMouseEnter);
    this.addEventListener("mouseleave", this._handleMouseLeave);
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mouseenter", this._handleMouseEnter);
    this.removeEventListener("mouseleave", this._handleMouseLeave);
    this.removeEventListener("click", this._handleClick);
    this.removeEventListener("keydown", this._handleKeyDown);
    this._cleanup?.();
    clearTimeout(this._hoverTimer);
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("_subOpen")) {
      this.setAttribute("aria-expanded", String(this._subOpen));
      const submenuDropdown = this.querySelector(
        '[slot="submenu"] mi-menu-dropdown, mi-menu-dropdown[slot="submenu"]',
      ) as (HTMLElement & { open: boolean }) | null;
      if (submenuDropdown) {
        submenuDropdown.open = this._subOpen;
        if (this._subOpen) {
          void this._positionSubmenu(submenuDropdown);
        } else {
          this._cleanup?.();
          this._cleanup = undefined;
        }
      }
    }
  }

  private _handleMouseEnter = () => {
    if (this.disabled) return;
    clearTimeout(this._hoverTimer);
    this._hoverTimer = setTimeout(() => {
      this._subOpen = true;
    }, 100);
  };

  private _handleMouseLeave = () => {
    clearTimeout(this._hoverTimer);
    this._hoverTimer = setTimeout(() => {
      this._subOpen = false;
    }, 150);
  };

  private _handleClick = (e: Event) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    this._subOpen = !this._subOpen;
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._subOpen = true;
      requestAnimationFrame(() => {
        const submenuDropdown = this.querySelector("mi-menu-dropdown") as
          | (HTMLElement & { focusFirstItem: () => void })
          | null;
        submenuDropdown?.focusFirstItem();
      });
    }
    if (e.key === "ArrowLeft" || e.key === "Escape") {
      if (this._subOpen) {
        e.preventDefault();
        e.stopPropagation();
        this._subOpen = false;
        this.focus();
      }
    }
  };

  private async _positionSubmenu(submenuDropdown: HTMLElement) {
    await (submenuDropdown as LitElement).updateComplete;
    const popupEl = (submenuDropdown as LitElement).shadowRoot?.querySelector(
      ".popup",
    ) as HTMLElement | null;
    if (!popupEl) return;

    this._cleanup?.();
    this._cleanup = autoUpdate(this, popupEl, async () => {
      if (!this._subOpen) return;
      const { x, y } = await computePosition(this, popupEl, {
        placement: "right-start",
        strategy: "fixed",
        middleware: [offset(0), flip({ padding: 16 }), shift({ padding: 16 })],
      });
      if (!popupEl) return;
      Object.assign(popupEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  private _onIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedElements().length > 0;
  }

  render() {
    return html`
      <span class="content">
        <span class="item-layout">
          ${this._hasIcon
            ? html`<span class="icon-wrapper" aria-hidden="true">
                <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
              </span>`
            : html`<slot
                name="icon"
                @slotchange=${this._onIconSlotChange}
                hidden
              ></slot>`}
          <span class="text-area">
            <span class="label"><slot></slot></span>
          </span>
        </span>
        <span class="chevron-icon" aria-hidden="true">
          <mi-icon type="chevron-right-small"></mi-icon>
        </span>
      </span>
      ${this._subOpen ? html`<slot name="submenu"></slot>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-sub-menu-item": MiSubMenuItem;
  }
}

if (!customElements.get("mi-sub-menu-item")) {
  customElements.define("mi-sub-menu-item", MiSubMenuItem);
}
