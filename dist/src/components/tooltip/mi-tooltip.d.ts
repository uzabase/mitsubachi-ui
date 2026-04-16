import { LitElement } from 'lit';
export declare const placements: readonly ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end"];
export type Placement = (typeof placements)[number];
/**
 * @summary ツールチップコンポーネントです。アイコンやボタンなどにホバー・フォーカスすることで補足情報を表示します。
 *
 * @slot - ツールチップのトリガーとなる要素
 */
export declare class MiTooltip extends LitElement {
    static styles: import('lit').CSSResult[];
    private static _idCounter;
    text: string;
    placement: Placement;
    private _open;
    private _tooltipEl;
    private _cleanup?;
    private _hideTimer?;
    private _pointerActive;
    private _descId;
    private _descEl?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<PropertyKey, unknown>): void;
    private _onSlotChange;
    private _handleMouseEnter;
    private _onPointerDown;
    private _handleFocusin;
    private _handleKeyDown;
    private _show;
    private _scheduleHide;
    private _updatePosition;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-tooltip": MiTooltip;
    }
}
//# sourceMappingURL=mi-tooltip.d.ts.map