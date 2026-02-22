import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";
import { html, LitElement, nothing, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./tooltip.css?inline";

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
type Placement = (typeof placements)[number];

function isValidPlacement(value: string): Placement {
  if (placements.some((p) => p === value)) {
    return value as Placement;
  }
  console.warn(`"${value}" は無効な placement 属性です。"top" を使用します。`);
  return "top";
}

/**
 * @summary ツールチップコンポーネントです。アイコンやボタンなどにホバー・フォーカスすることで補足情報を表示します。
 */
export class MiTooltip extends LitElement {
  static styles = makeStyles(unsafeCSS(style));

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

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mouseenter", this._handleMouseEnter);
    this.addEventListener("mouseleave", this._scheduleHide);
    this.addEventListener("pointerdown", this._onPointerDown);
    this.addEventListener("focusin", this._handleFocusin);
    this.addEventListener("focusout", this._scheduleHide);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mouseenter", this._handleMouseEnter);
    this.removeEventListener("mouseleave", this._scheduleHide);
    this.removeEventListener("pointerdown", this._onPointerDown);
    this.removeEventListener("focusin", this._handleFocusin);
    this.removeEventListener("focusout", this._scheduleHide);
    this._cleanup?.();
    clearTimeout(this._hideTimer);
  }

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
    const { x, y } = await computePosition(this, this._tooltipEl, {
      placement: isValidPlacement(this.placement),
      strategy: "fixed",
      middleware: [offset(8), flip(), shift({ padding: 8 })],
    });
    Object.assign(this._tooltipEl.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  }

  render() {
    return html`
      <slot></slot>
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
