import resetStyle from "@acab/reset.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(resetStyle);

export class UbCheckboxText extends HTMLElement {
  #inputElement = document.createElement("input");
  #textElement = document.createElement("span");

  get value() {
    return this.#inputElement.value;
  }
  set value(value: string) {
    this.#inputElement.value = value;
  }

  set name(value: string) {
    this.setAttribute("name", value);
    this.#inputElement.name = value;
  }

  get checked() {
    return this.#inputElement.checked;
  }
  set checked(value: boolean) {
    if (value) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }

    this.#inputElement.checked = value;
    this.internals.setFormValue(value ? this.value : null);
  }

  get indeterminate() {
    return this.#inputElement.indeterminate;
  }
  set indeterminate(value: boolean) {
    this.#inputElement.indeterminate = value;
  }

  set disabled(value: boolean) {
    this.#inputElement.disabled = value;
  }

  set text(value: string) {
    this.#textElement.innerText = value;
  }

  static get observedAttributes() {
    return ["value", "name", "checked", "indeterminate", "disabled", "text"];
  }

  protected internals: ElementInternals;
  static formAssociated = true;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];

    this.internals = this.attachInternals();
  }

  connectedCallback() {
    const labelElement = document.createElement("label");
    const checkMarkElement = document.createElement("span");
    labelElement.classList.add("base");
    checkMarkElement.classList.add("checkmark");
    this.#inputElement.setAttribute("type", "checkbox");
    this.#inputElement.classList.add("input");
    this.#inputElement.addEventListener("change", () => this.#handleOnChange());
    this.#textElement.classList.add("text");
    checkMarkElement.appendChild(this.#inputElement);
    labelElement.appendChild(checkMarkElement);
    labelElement.appendChild(this.#textElement);
    this.shadowRoot?.appendChild(labelElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "value":
        this.value = newValue;
        break;
      case "name":
        this.name = newValue;
        break;
      case "checked":
        this.checked = newValue === "true" || newValue === "";
        break;
      case "indeterminate":
        this.indeterminate = newValue === "true" || newValue === "";
        break;
      case "disabled":
        this.disabled = newValue === "true" || newValue === "";
        break;
      case "text":
        this.text = newValue;
        break;
    }
  }

  formResetCallback() {
    this.checked = false;
  }

  #handleOnChange() {
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: {
          checked: this.checked,
          indeterminate: this.indeterminate,
        },
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ub-checkbox-text": UbCheckboxText;
  }
}
