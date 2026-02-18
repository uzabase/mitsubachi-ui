import { LitElement } from 'lit';
type Type = (typeof types)[number];
export declare const types: readonly ["information", "success", "warning", "error"];
export declare class MiInlineNotification extends LitElement {
    type: Type;
    static styles: import('lit').CSSResult[];
    render(): import('lit-html').TemplateResult<1>;
}
export {};
//# sourceMappingURL=mi-inline-notification.d.ts.map