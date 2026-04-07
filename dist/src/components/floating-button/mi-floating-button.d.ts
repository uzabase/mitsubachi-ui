import { LitElement } from 'lit';
export declare class MiFloatingButton extends LitElement {
    static styles: import('lit').CSSResult[];
    loading: boolean;
    render(): import('lit-html').TemplateResult<1>;
}
/** @deprecated 代わりに MiFloatingButton を使用してください */
export declare class SpFloatingButton extends MiFloatingButton {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-floating-button": MiFloatingButton;
        "sp-floating-button": SpFloatingButton;
    }
}
//# sourceMappingURL=mi-floating-button.d.ts.map