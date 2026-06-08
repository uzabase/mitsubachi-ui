import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";
import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import type { MiMenuDropdown } from "./mi-menu-dropdown";

/** MenuDropdown の表示方向 */
export type MenuSide = "top" | "bottom" | "inline-start" | "inline-end";

/** MenuDropdown の配置調整 */
export type MenuAlign = "start" | "center" | "end";

/**
 * @summary メニューのルートコンポーネント。
 *
 * トリガー要素のクリックで開き、外側クリックまたは ESC で閉じるドロップダウンメニュー。
 *
 * @slot trigger - メニューを開閉するトリガー要素
 * @slot - メニューのドロップダウン（mi-menu-dropdown）
 */
export class MiMenu extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: inline-block;
      position: relative;
    }
  `);

  /** 開閉状態 */
  @property({ type: Boolean, reflect: true })
  open = false;

  private _cleanup?: () => void;

  private get _triggerEl(): HTMLElement | null {
    return this.querySelector("[slot='trigger']");
  }

  private get _dropdownEl(): MiMenuDropdown | null {
    return this.querySelector("mi-menu-dropdown");
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this._handleTriggerClick);
    this.addEventListener("keydown", this._handleKeyDown);
    this.addEventListener("menu-item-activate", this._handleItemActivate);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._handleTriggerClick);
    this.removeEventListener("keydown", this._handleKeyDown);
    this.removeEventListener("menu-item-activate", this._handleItemActivate);
    this._removeOutsideListeners();
    this._cleanup?.();
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("open")) {
      const dropdown = this._dropdownEl;
      if (dropdown) {
        dropdown.open = this.open;
      }
      if (this.open) {
        this._addOutsideListeners();
        void this._positionDropdown();
        requestAnimationFrame(() => {
          dropdown?.focusFirstItem();
        });
      } else {
        this._removeOutsideListeners();
        this._cleanup?.();
        this._cleanup = undefined;
      }
    }
  }

  /** メニューを閉じる */
  closeMenu() {
    this.open = false;
  }

  private _handleTriggerClick = (e: Event) => {
    const trigger = this._triggerEl;
    if (!trigger) return;
    const target = e.target as HTMLElement;
    if (trigger === target || trigger.contains(target)) {
      e.stopPropagation();
      this.open = !this.open;
    }
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && this.open) {
      e.preventDefault();
      this.open = false;
      this._triggerEl?.focus();
    }
  };

  private _handleItemActivate = () => {
    this.open = false;
    this._triggerEl?.focus();
  };

  private _handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this.open = false;
    }
  };

  private _addOutsideListeners() {
    document.addEventListener("mousedown", this._handleOutsideClick);
  }

  private _removeOutsideListeners() {
    document.removeEventListener("mousedown", this._handleOutsideClick);
  }

  private async _positionDropdown() {
    const trigger = this._triggerEl;
    const dropdown = this._dropdownEl;
    if (!trigger || !dropdown) return;

    await dropdown.updateComplete;
    const popupEl = dropdown.shadowRoot?.querySelector(
      ".popup",
    ) as HTMLElement | null;
    if (!popupEl) return;

    const side = dropdown.side;
    const align = dropdown.align;
    const sideOffset = dropdown.sideOffset;
    const placement = toFloatingPlacement(side, align);

    this._cleanup?.();
    this._cleanup = autoUpdate(trigger, popupEl, async () => {
      if (!this.open) return;
      const { x, y } = await computePosition(trigger, popupEl, {
        placement,
        strategy: "fixed",
        middleware: [
          offset(sideOffset),
          flip({ padding: 16 }),
          shift({ padding: 16 }),
        ],
      });
      if (!popupEl) return;
      Object.assign(popupEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  render() {
    return html`
      <slot name="trigger"></slot>
      <slot></slot>
    `;
  }
}

function toFloatingPlacement(
  side: MenuSide,
  align: MenuAlign,
): `${"top" | "bottom" | "left" | "right"}${"-start" | "-end" | ""}` {
  const sideMap: Record<MenuSide, "top" | "bottom" | "left" | "right"> = {
    top: "top",
    bottom: "bottom",
    "inline-start": "left",
    "inline-end": "right",
  };
  const base = sideMap[side];
  if (align === "center") return base;
  return `${base}-${align}`;
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-menu": MiMenu;
  }
}

if (!customElements.get("mi-menu")) {
  customElements.define("mi-menu", MiMenu);
}
