export declare const buttonType: readonly ["normal", "danger"];
export declare const variants: readonly ["primary", "secondary", "tertiary"];
export declare const size: readonly ["medium", "large", "xLarge"];
export declare class SpButton extends HTMLElement {
    #private;
    get loading(): boolean;
    set loading(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    set type(value: string);
    get variants(): string;
    set variants(value: string);
    set size(value: string);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-button": SpButton;
    }
}
//# sourceMappingURL=sp-button.d.ts.map