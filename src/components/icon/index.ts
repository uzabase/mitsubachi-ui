import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import { makeStyles } from "../styles";
import iconStyle from "./icon.css?inline";
import { iconPaths as iconPathsBase, type IconType as IconTypeBase, iconTypes as iconTypesBase } from "./icons";

// 後方互換性のための旧名を型定義に追加
type DeprecatedIconType = 
  | "minus-cycle"
  | "minus-cycle-fill"
  | "plus-cycle"
  | "plus-cycle-fill"
  | "question"
  | "followlist"
  | "followlist-fill";

export type IconType = IconTypeBase | DeprecatedIconType;

// 後方互換性のための旧名マッピング（新名と同じSVGパスを参照）
const iconPaths = {
  ...iconPathsBase,
  'minus-cycle': iconPathsBase['minus-circle'],
  'minus-cycle-fill': iconPathsBase['minus-circle-fill'],
  'plus-cycle': iconPathsBase['plus-circle'],
  'plus-cycle-fill': iconPathsBase['plus-circle-fill'],
  'question': iconPathsBase['question-circle'],
  'followlist': iconPathsBase['follow-list'],
  'followlist-fill': iconPathsBase['follow-list-fill'],
} as const;

// 旧名を含む全てのアイコンタイプのリスト
const deprecatedIconTypes: readonly DeprecatedIconType[] = [
  "minus-cycle",
  "minus-cycle-fill",
  "plus-cycle",
  "plus-cycle-fill",
  "question",
  "followlist",
  "followlist-fill",
] as const;

export const iconTypes = [...iconTypesBase, ...deprecatedIconTypes] as const;

export function isIconType(type: string): type is IconType {
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
  static styles = makeStyles(unsafeCSS(iconStyle));

  @property({ type: String, reflect: true })
  type = "";

  render() {
    if (isIconType(this.type)) {
      return html`<svg
        class="icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
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
