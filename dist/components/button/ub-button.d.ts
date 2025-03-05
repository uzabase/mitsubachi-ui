export declare const variants: readonly ["primary", "secondary", "tertiary"];
export declare const size: readonly ["medium", "large", "xLarge"];
export declare class UbButton extends HTMLElement {
    #private;
    get loading(): boolean;
    set loading(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    get type(): 'submit' | 'reset' | 'button';
    set type(value: 'submit' | 'reset' | 'button');
    get name(): string;
    set name(value: string);
    get value(): string;
    set value(newValue: string);
    get danger(): boolean;
    set danger(value: boolean);
    get variants(): string;
    set variants(value: string);
    set size(value: string);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "ub-button": UbButton;
    }
}
//# sourceMappingURL=ub-button.d.ts.map