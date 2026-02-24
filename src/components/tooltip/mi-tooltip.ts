import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";
import { html, LitElement, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { tooltipStyles } from "./tooltip.styles";

export const placements = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end",
] as const;
export type Placement = (typeof placements)[number];

function isValidPlacement(value: string): value is Placement {
  return placements.some((p) => p === value);
}

/**
 * @summary ツールチップコンポーネントです。アイコンやボタンなどにホバー・フォーカスすることで補足情報を表示します。
 */
export class MiTooltip extends LitElement {
  static styles = makeStyles(tooltipStyles);

  private static _idCounter = 0;

  @property({ type: String })
  text = "";

  @property({ type: String })
  placement: Placement = "top";

  @state()
  private _open = false;

  @query(".tooltip")
  private _tooltipEl!: HTMLElement | null;

  private _cleanup?: () => void;
  private _hideTimer?: ReturnType<typeof setTimeout>;
  private _pointerActive = false;

  // スクリーンリーダー向けにライト DOM へ配置する非表示の説明テキスト要素
  private _descId = `mi-tooltip-desc-${MiTooltip._idCounter++}`;
  private _descEl?: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    this._descEl = document.createElement("span");
    this._descEl.id = this._descId;
    this._descEl.style.cssText =
      "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;";
    this._descEl.textContent = this.text;
    this.appendChild(this._descEl);
    this.addEventListener("mouseenter", this._handleMouseEnter);
    this.addEventListener("mouseleave", this._scheduleHide);
    this.addEventListener("pointerdown", this._onPointerDown);
    this.addEventListener("focusin", this._handleFocusin);
    this.addEventListener("focusout", this._scheduleHide);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mouseenter", this._handleMouseEnter);
    this.removeEventListener("mouseleave", this._scheduleHide);
    this.removeEventListener("pointerdown", this._onPointerDown);
    this.removeEventListener("focusin", this._handleFocusin);
    this.removeEventListener("focusout", this._scheduleHide);
    this.removeEventListener("keydown", this._handleKeyDown);
    this._descEl?.remove();
    this._descEl = undefined;
    this._cleanup?.();
    clearTimeout(this._hideTimer);
  }

  updated(changed: Map<PropertyKey, unknown>) {
    super.updated(changed);
    if (changed.has("text") && this._descEl) {
      this._descEl.textContent = this.text;
    }
  }

  private _onSlotChange = () => {
    this.shadowRoot
      ?.querySelector("slot")
      ?.assignedElements()
      .forEach((el) => el.setAttribute("aria-describedby", this._descId));
  };

  private _handleMouseEnter = () => {
    void this._show();
  };

  private _onPointerDown = () => {
    this._pointerActive = true;
    // focusin はこの直後に発火するため、1サイクル後にリセット
    setTimeout(() => {
      this._pointerActive = false;
    });
  };

  private _handleFocusin = () => {
    // クリック等のポインター操作によるフォーカスは無視し、キーボード操作のみ反応する
    if (this._pointerActive) return;
    void this._show();
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && this._open) {
      clearTimeout(this._hideTimer);
      this._open = false;
      this._cleanup?.();
      this._cleanup = undefined;
    }
  };

  private _show = async () => {
    clearTimeout(this._hideTimer);
    if (this._open || !this.text) return;
    this._open = true;
    await this.updateComplete;
    if (!this._open || !this._tooltipEl || this._cleanup) return;
    this._cleanup = autoUpdate(this, this._tooltipEl, () =>
      this._updatePosition(),
    );
  };

  private _scheduleHide = () => {
    clearTimeout(this._hideTimer);
    this._hideTimer = setTimeout(() => {
      this._open = false;
      this._cleanup?.();
      this._cleanup = undefined;
    }, 100);
  };

  private async _updatePosition() {
    if (!this._tooltipEl) return;
    if (!isValidPlacement(this.placement)) {
      console.warn(`"${this.placement}" は無効な placement 属性です。"top" を使用します。`);
    }
    const placement = isValidPlacement(this.placement) ? this.placement : "top";
    const { x, y } = await computePosition(this, this._tooltipEl, {
      placement,
      strategy: "fixed",
      middleware: [offset(8), flip(), shift({ padding: 8 })],
    });
    // await 後に要素が削除されている可能性があるため再チェック
    if (!this._tooltipEl) return;
    Object.assign(this._tooltipEl.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  }

  render() {
    return html`
      <slot @slotchange=${this._onSlotChange}></slot>
      ${this._open
        ? html`<div class="tooltip" role="tooltip">${this.text}</div>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-tooltip": MiTooltip;
  }
}

if (!customElements.get("mi-tooltip")) {
  customElements.define("mi-tooltip", MiTooltip);
}
