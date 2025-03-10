export declare class UbCheckbox extends HTMLElement {
    #private;
    get value(): string;
    set value(value: string);
    set name(value: string);
    get checked(): boolean;
    set checked(value: boolean);
    get indeterminate(): boolean;
    set indeterminate(value: boolean);
    set disabled(value: boolean);
    static get observedAttributes(): string[];
    protected internals: ElementInternals;
    static formAssociated: boolean;
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    formResetCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "ub-checkbox": UbCheckbox;
    }
}
//# sourceMappingURL=ub-checkbox.d.ts.map