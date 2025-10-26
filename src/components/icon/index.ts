import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { makeStyles } from "../styles";
import {
  app,
  bell,
  checkCircle,
  checkCircleFill,
  checkSmall,
  chevronDown,
  chevronDownSmall,
  chevronRightSmall,
  chevronUpSmall,
  crossSmall,
  download,
  draghandle,
  errorFill,
  exit,
  gear,
  globe,
  informationCircle,
  lockFill,
  menu,
  moreVertical,
  openInNew,
  person,
  questionCircle,
  search,
} from "./icons";

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

  #iconMap = new Map<string, string>([
    ["app", app],
    ["bell", bell],
    ["check-circle", checkCircle],
    ["check-circle-fill", checkCircleFill],
    ["check-small", checkSmall],
    ["chevron-down", chevronDown],
    ["chevron-down-small", chevronDownSmall],
    ["chevron-right-small", chevronRightSmall],
    ["chevron-up-small", chevronUpSmall],
    ["cross-small", crossSmall],
    ["download", download],
    ["draghandle", draghandle],
    ["error-fill", errorFill],
    ["exit", exit],
    ["gear", gear],
    ["globe", globe],
    ["information-circle", informationCircle],
    ["lock-fill", lockFill],
    ["menu", menu],
    ["more-vertical", moreVertical],
    ["open-in-new", openInNew],
    ["person", person],
    ["question-circle", questionCircle],
    ["search", search],
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
    "sp-icon": SpIcon;
  }
}

if (!customElements.get("sp-icon")) {
  customElements.define("sp-icon", SpIcon);
}
