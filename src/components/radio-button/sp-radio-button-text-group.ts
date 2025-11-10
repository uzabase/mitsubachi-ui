import { html, LitElement } from "lit";

export class SpRadioButtonTextGroup extends LitElement {
  render() {
    return html`<div class="base">
      <slot></slot>
    </div>`;
  }
}
