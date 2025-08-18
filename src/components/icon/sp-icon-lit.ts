import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import {
  checkCircle,
  checkCircleFill,
  checkSmall,
  chevronDown,
  chevronDownSmall,
  errorFill,
  globe,
  informationCircle,
  person,
} from "./icons";

/**
 * アイコンです。
 *
 * @summary アイコンです。
 *
 * @attr {string} type - iconの画像を定義します。error-fillは赤いバツ印。information-circleは逆向きの!マーク。personは肩より上の人のアイコンです。checkCircleは白い丸の中にチェックマークがあります。  chevronDownとchevronDownSmallは下向きの矢印です。globeは地球儀のアイコンです。
 */
@customElement("sp-icon-lit")
export class SpIconLit extends LitElement {
  @property({ type: String, reflect: true })
  type = "";

  #iconMap = new Map<string, string>([
    ["error-fill", errorFill],
    ["information-circle", informationCircle],
    ["person", person],
    ["check-circle-fill", checkCircleFill],
    ["check-small", checkSmall],
    ["check-circle", checkCircle],
    ["chevron-down", chevronDown],
    ["chevron-down-small", chevronDownSmall],
    ["globe", globe],
  ]);

  render() {
    const icon = this.#iconMap.get(this.type);
    if (icon) {
      return html`${unsafeHTML(icon)}`;
    }
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-icon-lit": SpIconLit;
  }
}
