import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import { makeStyles } from "../styles";
import { iconPaths, type IconType, iconTypes } from "./icons";

function isIconType(type: string): type is IconType {
  return (iconTypes as readonly string[]).includes(type);
}

/**
 * アイコンです。
 *
 * @summary アイコンです。
 *
 * @attr {string} type - iconの画像を定義します。error-fillは赤いバツ印。information-circleは逆向きの!マーク。personは肩より上の人のアイコンです。checkCircleは白い丸の中にチェックマークがあります。  chevronDownとchevronDownSmallは下向きの矢印です。globeは地球儀のアイコンです。
 */
export class SpIcon extends LitElement {
  static styles = makeStyles();

  @property({ type: String, reflect: true })
  type = "";

  render() {
    if (isIconType(this.type)) {
      return html`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        ${unsafeSVG(iconPaths[this.type])}
      </svg>`;
    }
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-icon": SpIcon;
  }
}

if (!customElements.get("sp-icon")) {
  customElements.define("sp-icon", SpIcon);
}
