import { LitElement } from 'lit';
import { IconColorType, iconColorTypes } from './icons';
export type { IconColorType };
export { iconColorTypes };
export declare function isIconColorType(type: string): type is IconColorType;
/**
 * カラーアイコンです。
 *
 * @summary カラーアイコンです。
 *
 * @attr {string} type - カラーアイコンの画像を定義します。
 */
export declare class MiIconColor extends LitElement {
    static styles: import('lit').CSSResult[];
    type: string;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-icon-color": MiIconColor;
    }
}
//# sourceMappingURL=index.d.ts.map