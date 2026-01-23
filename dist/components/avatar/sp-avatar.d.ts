import { LitElement } from 'lit';
declare const size: readonly ["small", "medium", "large", "x-large", "2x-large"];
export type AvatarSize = (typeof size)[number];
declare const colors: readonly ["plum", "violet", "blue", "viridian", "green", "brown", "red"];
export type AvatarColor = (typeof colors)[number];
/**
 * @summary アバターです。
 */
export declare class SpAvatar extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    src: string;
    alt: string;
    initials: string;
    size: AvatarSize;
    color: AvatarColor | "";
    inactive: boolean;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-avatar": SpAvatar;
    }
}
export {};
//# sourceMappingURL=sp-avatar.d.ts.map