  if (!customElements.get("mi-avatar")) {
    customElements.define("mi-avatar", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-avatar</div>";
      }
    });
  }
  if (!customElements.get("sp-avatar")) {
    customElements.define("sp-avatar", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-avatar</div>";
      }
    });
  }
  if (!customElements.get("mi-ai-button")) {
    customElements.define("mi-ai-button", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-ai-button<slot></slot></div>";
      }
    });
  }
  if (!customElements.get("mi-danger-button")) {
    customElements.define("mi-danger-button", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-danger-button<slot></slot></div>";
      }
    });
  }
  if (!customElements.get("mi-icon-button")) {
    customElements.define("mi-icon-button", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-icon-button</div>";
      }
    });
  }
  if (!customElements.get("mi-neutral-button")) {
    customElements.define("mi-neutral-button", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-neutral-button<slot></slot></div>";
      }
    });
  }
  if (!customElements.get("mi-button")) {
    customElements.define("mi-button", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-button<slot></slot></div>";
      }
    });
  }
  if (!customElements.get("sp-button")) {
    customElements.define("sp-button", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-button<slot></slot></div>";
      }
    });
  }
  if (!customElements.get("mi-checkbox-text")) {
    customElements.define("mi-checkbox-text", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-checkbox-text</div>";
      }
    });
  }
  if (!customElements.get("sp-checkbox-text")) {
    customElements.define("sp-checkbox-text", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-checkbox-text</div>";
      }
    });
  }
  if (!customElements.get("mi-checkbox")) {
    customElements.define("mi-checkbox", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-checkbox</div>";
      }
    });
  }
  if (!customElements.get("sp-checkbox")) {
    customElements.define("sp-checkbox", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-checkbox</div>";
      }
    });
  }
  if (!customElements.get("mi-floating-button")) {
    customElements.define("mi-floating-button", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-floating-button</div>";
      }
    });
  }
  if (!customElements.get("sp-floating-button")) {
    customElements.define("sp-floating-button", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-floating-button</div>";
      }
    });
  }
  if (!customElements.get("mi-icon")) {
    customElements.define("mi-icon", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-icon</div>";
      }
    });
  }
  if (!customElements.get("sp-icon")) {
    customElements.define("sp-icon", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-icon</div>";
      }
    });
  }
  if (!customElements.get("mi-icon-color")) {
    customElements.define("mi-icon-color", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-icon-color</div>";
      }
    });
  }
  if (!customElements.get("mi-inline-notification")) {
    customElements.define("mi-inline-notification", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-inline-notification<slot></slot></div>";
      }
    });
  }
  if (!customElements.get("mi-label-unit")) {
    customElements.define("mi-label-unit", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-label-unit</div>";
      }
    });
  }
  if (!customElements.get("sp-label-unit")) {
    customElements.define("sp-label-unit", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-label-unit</div>";
      }
    });
  }
  if (!customElements.get("mi-loading")) {
    customElements.define("mi-loading", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-loading</div>";
      }
    });
  }
  if (!customElements.get("sp-loading")) {
    customElements.define("sp-loading", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-loading</div>";
      }
    });
  }
  if (!customElements.get("mi-logo")) {
    customElements.define("mi-logo", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-logo</div>";
      }
    });
  }
  if (!customElements.get("sp-logo")) {
    customElements.define("sp-logo", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-logo</div>";
      }
    });
  }
  if (!customElements.get("mi-radio-button-text")) {
    customElements.define("mi-radio-button-text", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-radio-button-text<slot></slot></div>";
      }
    });
  }
  if (!customElements.get("sp-radio-button-text")) {
    customElements.define("sp-radio-button-text", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-radio-button-text<slot></slot></div>";
      }
    });
  }
  if (!customElements.get("mi-tooltip")) {
    customElements.define("mi-tooltip", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-tooltip<slot></slot></div>";
      }
    });
  }
  if (!customElements.get("mi-control-menu")) {
    customElements.define("mi-control-menu", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-control-menu<slot></slot></div>";
      }
    });
  }
  if (!customElements.get("sp-control-menu")) {
    customElements.define("sp-control-menu", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-control-menu<slot></slot></div>";
      }
    });
  }
  if (!customElements.get("mi-control-menu-item")) {
    customElements.define("mi-control-menu-item", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-control-menu-item</div>";
      }
    });
  }
  if (!customElements.get("sp-control-menu-item")) {
    customElements.define("sp-control-menu-item", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-control-menu-item</div>";
      }
    });
  }
  if (!customElements.get("mi-text-field")) {
    customElements.define("mi-text-field", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-text-field</div>";
      }
    });
  }
  if (!customElements.get("sp-text-field")) {
    customElements.define("sp-text-field", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-text-field</div>";
      }
    });
  }
  if (!customElements.get("mi-text-field-unit")) {
    customElements.define("mi-text-field-unit", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-text-field-unit</div>";
      }
    });
  }
  if (!customElements.get("sp-text-field-unit")) {
    customElements.define("sp-text-field-unit", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-text-field-unit</div>";
      }
    });
  }
  if (!customElements.get("mi-text-field-error-text")) {
    customElements.define("mi-text-field-error-text", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">mi-text-field-error-text</div>";
      }
    });
  }
  if (!customElements.get("sp-text-field-error-text")) {
    customElements.define("sp-text-field-error-text", class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-block; } .m { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed #ccc; border-radius: 4px; padding: 4px 8px; background: #fafafa; font: 11px monospace; color: #999; min-height: 20px; box-sizing: border-box; }</style><div class=\"m\">sp-text-field-error-text</div>";
      }
    });
  }
