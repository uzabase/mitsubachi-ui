import { LitElement } from 'lit';
/**
 * @summary ドロップダウンメニューのコンポーネントです。<mi-control-menu><mi-control-menu-item><mi-control-menu-item></mi-control-menu>のように使います。
 */
export declare class MiControlMenu extends LitElement {
    static styles: import('lit').CSSResult[];
    render(): import('lit-html').TemplateResult<1>;
}
/** @deprecated 代わりに MiControlMenu を使用してください */
export declare class SpControlMenu extends MiControlMenu {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-control-menu": MiControlMenu;
        "sp-control-menu": SpControlMenu;
    }
}
//# sourceMappingURL=index.d.ts.map