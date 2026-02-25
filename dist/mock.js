["mi-avatar","sp-avatar","mi-button","sp-button","mi-checkbox-text","sp-checkbox-text","mi-checkbox","sp-checkbox","mi-floating-button","sp-floating-button","mi-icon","sp-icon","mi-icon-color","mi-inline-notification","mi-label-unit","sp-label-unit","mi-loading","sp-loading","mi-logo","sp-logo","mi-radio-button-text","sp-radio-button-text","mi-tooltip","mi-control-menu","sp-control-menu","mi-control-menu-item","sp-control-menu-item","mi-text-field","sp-text-field","mi-text-field-unit","sp-text-field-unit","mi-text-field-error-text","sp-text-field-error-text"].forEach((name) => {
  if (!customElements.get(name)) {
    customElements.define(name, class extends HTMLElement {});
  }
});
