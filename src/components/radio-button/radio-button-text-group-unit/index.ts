import "../../label-unit";
import "../radio-button-text-group";

import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { makeStyles } from "../../styles";
import type { MiRadioButtonTextGroup } from "../radio-button-text-group";
import radioButtonTextGroupUnitStyle from "./styles.css?inline";

/**
 * @summary ラベルが付いたラジオボタングループです。
 *
 * @attr {string} text - ラジオボタングループを説明するテキストです。ラジオボタングループの上に表示されます。
 *
 * @slot - ラジオボタンの選択肢（mi-radio-button-text）
 */
export class MiRadioButtonTextGroupUnit extends LitElement {
  static styles = makeStyles(unsafeCSS(radioButtonTextGroupUnitStyle));

  static formAssociated = true;

  @property({ type: String, reflect: true })
  text = "";

  @property({ type: String, reflect: true })
  name = "";

  @property({ type: String, reflect: true })
  value = "";

  #initialValue = "";

  protected firstUpdated() {
    this.#initialValue = this.value;
  }

  formResetCallback() {
    this.value = this.#initialValue;
  }

  #labelClasses() {
    return classMap({
      label: true,
      none: !this.text,
    });
  }

  #handleChange = (e: Event) => {
    const group = e.target as MiRadioButtonTextGroup;
    this.value = group.value;
  };

  render() {
    return html`
      <mi-label-unit
        class="${this.#labelClasses()}"
        text="${this.text}"
      ></mi-label-unit>
      <mi-radio-button-text-group
        name="${this.name}"
        .value="${this.value}"
        @change="${this.#handleChange}"
      >
        <slot></slot>
      </mi-radio-button-text-group>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-radio-button-text-group-unit": MiRadioButtonTextGroupUnit;
  }
}

if (!customElements.get("mi-radio-button-text-group-unit")) {
  customElements.define(
    "mi-radio-button-text-group-unit",
    MiRadioButtonTextGroupUnit,
  );
}
