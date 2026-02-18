import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import { makeStyles } from "../styles";
import iconColorStyle from "./icon-color.css?inline";
import { iconColorPaths, type IconColorType, iconColorTypes } from "./icons";

export type { IconColorType };
export { iconColorTypes };

export function isIconColorType(type: string): type is IconColorType {
  return (iconColorTypes as readonly string[]).includes(type);
}

/**
 * カラーアイコンです。
 *
 * @summary カラーアイコンです。
 *
 * @attr {string} type - カラーアイコンの画像を定義します。
 */
export class MiIconColor extends LitElement {
  static styles = makeStyles(unsafeCSS(iconColorStyle));

  @property({ type: String, reflect: true })
  type = "information";

  render() {
    if (isIconColorType(this.type)) {
      return html`<svg
        class="icon-color"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        ${unsafeSVG(iconColorPaths[this.type])}
      </svg>`;
    }
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-icon-color": MiIconColor;
  }
}

if (!customElements.get("mi-icon-color")) {
  customElements.define("mi-icon-color", MiIconColor);
}
