import { LitElement } from 'lit';
import { IconType as IconTypeBase } from './icons';
type DeprecatedIconType = "minus-cycle" | "minus-cycle-fill" | "plus-cycle" | "plus-cycle-fill" | "question" | "followlist" | "followlist-fill";
export type IconType = IconTypeBase | DeprecatedIconType;
export declare const iconTypes: readonly ["app", "arrow-down", "arrow-down-small", "arrow-left", "arrow-up-down", "arrow-up-small", "bell", "bell-fill", "book-ai", "bookmark", "bookmark-fill", "building", "building-add", "building-cancel-fill", "calendar", "calendar-event", "calendar-fill", "chain", "check", "check-small", "chevron-down", "chevron-down-fill", "chevron-down-small", "chevron-left", "chevron-left-small", "chevron-right", "chevron-right-fill", "chevron-right-small", "chevron-up", "chevron-up-small", "clock", "copy", "cross", "cross-small", "double-chevron-right", "download", "drag", "error-fill", "exit", "eye", "eye-slash", "follow", "follow-fill", "follow-list", "follow-list-fill", "gear", "headset", "headset-face", "history", "home", "home-fill", "information", "information-fill", "kebab-menu", "language", "list-close", "list-open", "lock", "lock-fill", "magic", "magic-fill", "mail", "mail-gear", "maximize", "menu", "minimize", "minus", "minus-circle", "minus-circle-fill", "money", "open-in-new", "pencil-square", "person", "person-add", "person-cancel-fill", "person-fill", "person-gear", "plus", "plus-circle", "plus-circle-fill", "plus-small", "question-circle", "report", "route", "search", "search-fill", "share", "side-left", "side-right", "stop-fill", "success", "success-fill", "unlock", "unlock-fill", "warning-fill", ...DeprecatedIconType[]];
export declare function isIconType(type: string): type is IconType;
/**
 * アイコンです。
 *
 * @summary アイコンです。
 *
 * @attr {string} type - iconの画像を定義します。error-fillは赤いバツ印。information-circleは逆向きの!マーク。personは肩より上の人のアイコンです。checkCircleは白い丸の中にチェックマークがあります。  chevronDownとchevronDownSmallは下向きの矢印です。globeは地球儀のアイコンです。
 */
export declare class SpIcon extends LitElement {
    static styles: import('lit').CSSResult[];
    type: string;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-icon": SpIcon;
    }
}
export {};
//# sourceMappingURL=index.d.ts.map