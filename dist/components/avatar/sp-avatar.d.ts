import { LitElement } from 'lit';
export declare const size: readonly ["small", "medium", "large"];
type Size = (typeof size)[number];
/**
 * @summary アバターです。
 */
export declare class SpAvatar extends LitElement {
    static styles: import('lit').CSSResult[];
    src: string;
    alt: string;
    name: string;
    size: Size;
    private get avatarClasses();
    private get initials();
    private handleImageError;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-avatar": SpAvatar;
    }
}
export {};
//# sourceMappingURL=sp-avatar.d.ts.map