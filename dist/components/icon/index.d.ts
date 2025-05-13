/**
 * アイコンです。
 *
 * @summary アイコンです。
 *
 * @attr {string} type - iconの画像を定義します。error-fillは赤いバツ印。information-circleは逆向きの!マーク。personは肩より上の人のアイコンです。checkCircleは白い丸の中にチェックマークがあります。  chevronDownとchevronDownSmallは下向きの矢印です。globeは地球儀のアイコンです。
 *
 */
export declare class SpIcon extends HTMLElement {
    #private;
    static observedAttributes: string[];
    constructor();
    set type(newValue: string);
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-icon": SpIcon;
    }
}
//# sourceMappingURL=index.d.ts.map