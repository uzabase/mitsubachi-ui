import { html } from "lit";
import { property } from "lit/decorators.js";

import { ButtonBase, type ButtonTheme, type Size, sizes } from "./base";

try {
  CSS.registerProperty({
    name: "--angle",
    syntax: "<angle>",
    initialValue: "0deg",
    inherits: false,
  });
} catch {
  // すでに登録済みの場合は無視
}

export const aiVariants = ["primary", "secondary"] as const;
export type AiVariant = (typeof aiVariants)[number];

/**
 * @summary AIボタンです。AI機能の起動などに使用します。
 * アイコンは常に magic-fill が表示されます。
 */
export class MiAiButton extends ButtonBase {
  @property({ type: String })
  override variant: AiVariant = "primary";

  protected override getTheme(): ButtonTheme {
    return "ai";
  }

  protected override get showIcon() {
    return !this.loading;
  }

  protected override renderIcon() {
    return html`<mi-icon type="magic-fill" class="icon"></mi-icon>`;
  }
}

export type { Size };
export { sizes };

declare global {
  interface HTMLElementTagNameMap {
    "mi-ai-button": MiAiButton;
  }
}

if (!customElements.get("mi-ai-button")) {
  customElements.define("mi-ai-button", MiAiButton);
}
