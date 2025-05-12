import { speedaEn, speedaJa, speedaZh } from "./speeda";
import { uzabase } from "./uzabase";
/**
 * @summary スピーダのロゴです。
 *
 * @attr {string} brand - uzabaseであれば、Uzabaseのロゴを表示します。speedaのときは、スピーダのロゴを表示します。
 *
 * @attr {string} language - スピーダのロゴ内の文字の言語を指定します。brand属性がspeedaのときのみ有効です。language=jaであれば日本語, language=enであれば英語, zhであれば簡体字です。
 */
export class SpLogo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    get language() {
        return this.getAttribute("language");
    }
    get brand() {
        return this.getAttribute("brand");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // attributeChangeCallbackですべての属性の値を都度確認している理由は
        // たとえば、brand属性がuzabaseのときはlanugageの属性の変更を無視する必要があるためです。
        // mitubachi-uiを使うコードが<sp-logo brand="uzabase">から<sp-logo brand="speeda" language="ja">に変更したときに
        // atrributedChangedCallback("language", null, "ja")とatrributedChangedCallback("brand", null, "speeda")のうち
        // どちらが先に呼ばれるかわからないため、両方の属性の値を都度に確認しています。
        // brand=uzabaseのときは、language, line, sub-brandの属性は無関係なので、
        // 実装と仕様だけを考えるならuzabaseとスピーダのロゴのWebComponentを分けたほうが良さそうだけど、同じなのはFalconとの後方互換性が理由？
        if (!this.shadowRoot || oldValue === newValue)
            return;
        if (newValue) {
            this.setAttribute(name, newValue);
        }
        else {
            this.removeAttribute(name);
        }
        if (this.brand == "uzabase") {
            this.shadowRoot.innerHTML = uzabase;
            return;
        }
        else if (this.brand == "speeda") {
            if (this.language == "en")
                this.shadowRoot.innerHTML = speedaEn;
            else if (this.language == "zh")
                this.shadowRoot.innerHTML = speedaZh;
            else
                this.shadowRoot.innerHTML = speedaJa;
            return;
        }
    }
}
SpLogo.observedAttributes = ["language", "brand"];
if (!customElements.get("sp-logo")) {
    customElements.define("sp-logo", SpLogo);
}
