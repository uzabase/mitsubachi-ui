import "../../icon";
export declare class SpControlMenuItem extends HTMLElement {
    static observedAttributes: string[];
    get text(): null | string;
    get selected(): boolean;
    get disabled(): boolean;
    private textElement;
    constructor();
    private initialized;
    connectedCallback(): void;
    attributeChangedCallback(name: string, _: string | null, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-control-menu-item": SpControlMenuItem;
    }
}
//# sourceMappingURL=index.d.ts.map