["mi-button","sp-button","mi-avatar","sp-avatar","mi-checkbox-text","sp-checkbox-text","mi-checkbox","sp-checkbox","mi-floating-button","sp-floating-button","mi-icon","sp-icon","mi-loading","sp-loading","mi-label-unit","sp-label-unit","mi-logo","sp-logo","mi-radio-button-text","sp-radio-button-text","mi-control-menu","sp-control-menu","mi-control-menu-item","sp-control-menu-item","mi-text-field-unit","sp-text-field-unit","mi-text-field","sp-text-field","mi-text-field-error-text","sp-text-field-error-text"].forEach((name) => {
  if (!customElements.get(name)) {
    customElements.define(name, class extends HTMLElement {});
  }
});
