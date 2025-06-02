/**
 * @summary メニューの項目を表すコンポーネントです。
 *
 * @attr {text} text - 項目のテキスト
 *
 * @attr {boolean} selected - 項目が選択されていることを示します。属性があるときはチェックマークが表示されます。
 *
 * @attr {boolean} disabled - 項目が無効であることを示します。属性があれば、灰色で項目が表示されます。
 */
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