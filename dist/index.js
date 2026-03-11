var L9 = (e) => {
  throw TypeError(e);
};
var P2 = (e, t, i) => t.has(e) || L9("Cannot " + i);
var E = (e, t, i) => (P2(e, t, "read from private field"), i ? i.call(e) : t.get(e)), S = (e, t, i) => t.has(e) ? L9("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), J1 = (e, t, i, r) => (P2(e, t, "write to private field"), r ? r.call(e, i) : t.set(e, i), i), z = (e, t, i) => (P2(e, t, "access private method"), i);
const Q1 = globalThis, N2 = Q1.ShadowRoot && (Q1.ShadyCSS === void 0 || Q1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, I2 = /* @__PURE__ */ Symbol(), V9 = /* @__PURE__ */ new WeakMap();
let R9 = class {
  constructor(t, i, r) {
    if (this._$cssResult$ = !0, r !== I2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (N2 && t === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (t = V9.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && V9.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const M = (e) => new R9(typeof e == "string" ? e : e + "", void 0, I2), P = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((r, o, s) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new R9(i, e, I2);
}, _0 = (e, t) => {
  if (N2) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const r = document.createElement("style"), o = Q1.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = i.cssText, e.appendChild(r);
  }
}, v9 = N2 ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules) i += r.cssText;
  return M(i);
})(e) : e;
const { is: A0, defineProperty: E0, getOwnPropertyDescriptor: S0, getOwnPropertyNames: z0, getOwnPropertySymbols: P0, getPrototypeOf: O0 } = Object, v2 = globalThis, y9 = v2.trustedTypes, T0 = y9 ? y9.emptyScript : "", F0 = v2.reactiveElementPolyfillSupport, z1 = (e, t) => e, t2 = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? T0 : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, U2 = (e, t) => !A0(e, t), x9 = { attribute: !0, type: String, converter: t2, reflect: !1, useDefault: !1, hasChanged: U2 };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), v2.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b1 = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = x9) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, r, i);
      o !== void 0 && E0(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    const { get: o, set: s } = S0(this.prototype, t) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: o, set(n) {
      const l = o?.call(this);
      s?.call(this, n), this.requestUpdate(t, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? x9;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z1("elementProperties"))) return;
    const t = O0(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z1("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z1("properties"))) {
      const i = this.properties, r = [...z0(i), ...P0(i)];
      for (const o of r) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [r, o] of i) this.elementProperties.set(r, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const o = this._$Eu(i, r);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const o of r) i.unshift(v9(o));
    } else t !== void 0 && i.push(v9(t));
    return i;
  }
  static _$Eu(t, i) {
    const r = i.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const r of i.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return _0(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, r) {
    this._$AK(t, r);
  }
  _$ET(t, i) {
    const r = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, r);
    if (o !== void 0 && r.reflect === !0) {
      const s = (r.converter?.toAttribute !== void 0 ? r.converter : t2).toAttribute(i, r.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const r = this.constructor, o = r._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = r.getPropertyOptions(o), n = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : t2;
      this._$Em = o;
      const l = n.fromAttribute(i, s.type);
      this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, r, o = !1, s) {
    if (t !== void 0) {
      const n = this.constructor;
      if (o === !1 && (s = this[t]), r ??= n.getPropertyOptions(t), !((r.hasChanged ?? U2)(s, i) || r.useDefault && r.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, r)))) return;
      this.C(t, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: r, reflect: o, wrapped: s }, n) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? i ?? this[t]), s !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, s] of r) {
        const { wrapped: n } = s, l = this[o];
        n !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, s, l);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
b1.elementStyles = [], b1.shadowRootOptions = { mode: "open" }, b1[z1("elementProperties")] = /* @__PURE__ */ new Map(), b1[z1("finalized")] = /* @__PURE__ */ new Map(), F0?.({ ReactiveElement: b1 }), (v2.reactiveElementVersions ??= []).push("2.1.2");
const W2 = globalThis, w9 = (e) => e, e2 = W2.trustedTypes, M9 = e2 ? e2.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, j9 = "$lit$", K = `lit$${Math.random().toFixed(9).slice(2)}$`, N9 = "?" + K, B0 = `<${N9}>`, d1 = document, P1 = () => d1.createComment(""), O1 = (e) => e === null || typeof e != "object" && typeof e != "function", q2 = Array.isArray, D0 = (e) => q2(e) || typeof e?.[Symbol.iterator] == "function", O2 = `[ 	
\f\r]`, S1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Z9 = /-->/g, $9 = />/g, l1 = RegExp(`>|${O2}(?:([^\\s"'>=/]+)(${O2}*=${O2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), k9 = /'/g, _9 = /"/g, I9 = /^(?:script|style|textarea|title)$/i, R0 = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), g = R0(1), e1 = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), A9 = /* @__PURE__ */ new WeakMap(), a1 = d1.createTreeWalker(d1, 129);
function U9(e, t) {
  if (!q2(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return M9 !== void 0 ? M9.createHTML(t) : t;
}
const j0 = (e, t) => {
  const i = e.length - 1, r = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = S1;
  for (let l = 0; l < i; l++) {
    const a = e[l];
    let d, h, C = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, h = n.exec(a), h !== null); ) f = n.lastIndex, n === S1 ? h[1] === "!--" ? n = Z9 : h[1] !== void 0 ? n = $9 : h[2] !== void 0 ? (I9.test(h[2]) && (o = RegExp("</" + h[2], "g")), n = l1) : h[3] !== void 0 && (n = l1) : n === l1 ? h[0] === ">" ? (n = o ?? S1, C = -1) : h[1] === void 0 ? C = -2 : (C = n.lastIndex - h[2].length, d = h[1], n = h[3] === void 0 ? l1 : h[3] === '"' ? _9 : k9) : n === _9 || n === k9 ? n = l1 : n === Z9 || n === $9 ? n = S1 : (n = l1, o = void 0);
    const p = n === l1 && e[l + 1].startsWith("/>") ? " " : "";
    s += n === S1 ? a + B0 : C >= 0 ? (r.push(d), a.slice(0, C) + j9 + a.slice(C) + K + p) : a + K + (C === -2 ? l : p);
  }
  return [U9(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class T1 {
  constructor({ strings: t, _$litType$: i }, r) {
    let o;
    this.parts = [];
    let s = 0, n = 0;
    const l = t.length - 1, a = this.parts, [d, h] = j0(t, i);
    if (this.el = T1.createElement(d, r), a1.currentNode = this.el.content, i === 2 || i === 3) {
      const C = this.el.content.firstChild;
      C.replaceWith(...C.childNodes);
    }
    for (; (o = a1.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const C of o.getAttributeNames()) if (C.endsWith(j9)) {
          const f = h[n++], p = o.getAttribute(C).split(K), u = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: s, name: u[2], strings: p, ctor: u[1] === "." ? I0 : u[1] === "?" ? U0 : u[1] === "@" ? W0 : y2 }), o.removeAttribute(C);
        } else C.startsWith(K) && (a.push({ type: 6, index: s }), o.removeAttribute(C));
        if (I9.test(o.tagName)) {
          const C = o.textContent.split(K), f = C.length - 1;
          if (f > 0) {
            o.textContent = e2 ? e2.emptyScript : "";
            for (let p = 0; p < f; p++) o.append(C[p], P1()), a1.nextNode(), a.push({ type: 2, index: ++s });
            o.append(C[f], P1());
          }
        }
      } else if (o.nodeType === 8) if (o.data === N9) a.push({ type: 2, index: s });
      else {
        let C = -1;
        for (; (C = o.data.indexOf(K, C + 1)) !== -1; ) a.push({ type: 7, index: s }), C += K.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const r = d1.createElement("template");
    return r.innerHTML = t, r;
  }
}
function V1(e, t, i = e, r) {
  if (t === e1) return t;
  let o = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const s = O1(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = o : i._$Cl = o), o !== void 0 && (t = V1(e, o._$AS(e, t.values), o, r)), t;
}
class N0 {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: r } = this._$AD, o = (t?.creationScope ?? d1).importNode(i, !0);
    a1.currentNode = o;
    let s = a1.nextNode(), n = 0, l = 0, a = r[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new I1(s, s.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(s, a.name, a.strings, this, t) : a.type === 6 && (d = new q0(s, this, t)), this._$AV.push(d), a = r[++l];
      }
      n !== a?.index && (s = a1.nextNode(), n++);
    }
    return a1.currentNode = d1, o;
  }
  p(t) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, i), i += r.strings.length - 2) : r._$AI(t[i])), i++;
  }
}
class I1 {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, r, o) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = r, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = V1(this, t, i), O1(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== e1 && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : D0(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && O1(this._$AH) ? this._$AA.nextSibling.data = t : this.T(d1.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: r } = t, o = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = T1.createElement(U9(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new N0(o, this), n = s.u(this.options);
      s.p(i), this.T(n), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = A9.get(t.strings);
    return i === void 0 && A9.set(t.strings, i = new T1(t)), i;
  }
  k(t) {
    q2(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, o = 0;
    for (const s of t) o === i.length ? i.push(r = new I1(this.O(P1()), this.O(P1()), this, this.options)) : r = i[o], r._$AI(s), o++;
    o < i.length && (this._$AR(r && r._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const r = w9(t).nextSibling;
      w9(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class y2 {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, r, o, s) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = m;
  }
  _$AI(t, i = this, r, o) {
    const s = this.strings;
    let n = !1;
    if (s === void 0) t = V1(this, t, i, 0), n = !O1(t) || t !== this._$AH && t !== e1, n && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = s[0], a = 0; a < s.length - 1; a++) d = V1(this, l[r + a], i, a), d === e1 && (d = this._$AH[a]), n ||= !O1(d) || d !== this._$AH[a], d === m ? t = m : t !== m && (t += (d ?? "") + s[a + 1]), this._$AH[a] = d;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class I0 extends y2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class U0 extends y2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class W0 extends y2 {
  constructor(t, i, r, o, s) {
    super(t, i, r, o, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = V1(this, t, i, 0) ?? m) === e1) return;
    const r = this._$AH, o = t === m && r !== m || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, s = t !== m && (r === m || o);
    o && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class q0 {
  constructor(t, i, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    V1(this, t);
  }
}
const G0 = W2.litHtmlPolyfillSupport;
G0?.(T1, I1), (W2.litHtmlVersions ??= []).push("3.3.2");
const Y0 = (e, t, i) => {
  const r = i?.renderBefore ?? t;
  let o = r._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    r._$litPart$ = o = new I1(t.insertBefore(P1(), s), s, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
const G2 = globalThis;
let V = class extends b1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Y0(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return e1;
  }
};
V._$litElement$ = !0, V.finalized = !0, G2.litElementHydrateSupport?.({ LitElement: V });
const X0 = G2.litElementPolyfillSupport;
X0?.({ LitElement: V });
(G2.litElementVersions ??= []).push("4.2.2");
const J0 = { attribute: !0, type: String, converter: t2, reflect: !1, hasChanged: U2 }, K0 = (e = J0, t, i) => {
  const { kind: r, metadata: o } = i;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), r === "accessor") {
    const { name: n } = i;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, e, l), l;
    } };
  }
  if (r === "setter") {
    const { name: n } = i;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function c(e) {
  return (t, i) => typeof i == "object" ? K0(e, t, i) : ((r, o, s) => {
    const n = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, r), n ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, i);
}
function Q0(e) {
  return c({ ...e, state: !0, attribute: !1 });
}
const t5 = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function e5(e, t) {
  return (i, r, o) => {
    const s = (n) => n.renderRoot?.querySelector(e) ?? null;
    return t5(i, r, { get() {
      return s(this);
    } });
  };
}
const W9 = { ATTRIBUTE: 1, CHILD: 2 }, Y2 = (e) => (...t) => ({ _$litDirective$: e, values: t });
class q9 {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, r) {
    this._$Ct = t, this._$AM = i, this._$Ci = r;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
}
let i2 = class extends q9 {
  constructor(t) {
    if (super(t), this.it = m, t.type !== W9.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === m || t == null) return this._t = void 0, this.it = t;
    if (t === e1) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const i = [t];
    return i.raw = i, this._t = { _$litType$: this.constructor.resultType, strings: i, values: [] };
  }
};
i2.directiveName = "unsafeHTML", i2.resultType = 1;
const X2 = Y2(i2);
class F2 extends i2 {
}
F2.directiveName = "unsafeSVG", F2.resultType = 2;
const G9 = Y2(F2), i5 = '*,*:before,*:after{box-sizing:border-box}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}[hidden]:not([hidden=until-found]){display:none!important}body,article,p,span,div,li,td,th,dt,dd,h1,h2,h3,h4,h5,h6{overflow-wrap:anywhere;line-break:strict}body{line-height:1;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}li{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:"";content:none}table{border-collapse:collapse;border-spacing:0}a{text-decoration:none;color:inherit}button{all:unset;box-sizing:border-box}button,label,select,summary,[role=button],[role=option]{cursor:pointer}button,input,select,textarea{margin:0;font-family:inherit;font-size:100%}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}input[type=text],input[type=email],input[type=password],input[type=search],input[type=tel],input[type=url],input[type=number],textarea{-webkit-appearance:none}a,button,input,select,textarea{touch-action:manipulation}:focus{outline:auto;outline-offset:2px}:focus:not(:focus-visible){outline:0}:focus-visible{outline:auto;outline-offset:2px}img{max-width:100%;height:auto}', o5 = ":host{--font-weight-normal: 400;--font-weight-bold: 700}:host,:host *{font-family:Arial,YakuHanJPs,Hiragino Sans,Hiragino Kaku Gothic ProN,Meiryo,Noto Sans JP,sans-serif;font-weight:var(--font-weight-normal);overflow-wrap:anywhere;line-break:strict}:host :lang(ja){--font-weight-normal: 300;--font-weight-bold: 600}:host :lang(en){--font-weight-normal: 300;--font-weight-bold: 600}:host :lang(zh){font-family:Arial,YakuHanJPs,PingFang SC,Microsoft YaHei,PingFang TC,Microsoft JhengHei,sans-serif}:where(:focus-visible){outline:inherit}fieldset{border:none}button{box-sizing:border-box}";
function x(...e) {
  const t = P`
    ${M(i5)}
  `, i = P`
    ${M(o5)}
  `;
  return [t, i, ...e];
}
const r5 = ":host{display:inline-block;width:1.28em;height:1.28em}.icon{width:100%;height:100%}", s5 = [
  "app",
  "arrow-down",
  "arrow-down-small",
  "arrow-left",
  "arrow-up-down",
  "arrow-up-small",
  "bell",
  "bell-fill",
  "book-ai",
  "bookmark",
  "bookmark-fill",
  "building",
  "building-add",
  "building-cancel-fill",
  "calendar",
  "calendar-event",
  "calendar-fill",
  "chain",
  "check",
  "check-small",
  "chevron-down",
  "chevron-down-fill",
  "chevron-down-small",
  "chevron-left",
  "chevron-left-small",
  "chevron-right",
  "chevron-right-fill",
  "chevron-right-small",
  "chevron-up",
  "chevron-up-small",
  "clock",
  "copy",
  "cross",
  "cross-small",
  "double-chevron-right",
  "download",
  "drag",
  "error-fill",
  "exit",
  "eye",
  "eye-slash",
  "follow",
  "follow-fill",
  "follow-list",
  "follow-list-fill",
  "gear",
  "headset",
  "headset-face",
  "history",
  "home",
  "home-fill",
  "information",
  "information-fill",
  "kebab-menu",
  "language",
  "list-close",
  "list-open",
  "lock",
  "lock-fill",
  "magic",
  "magic-fill",
  "mail",
  "mail-gear",
  "maximize",
  "menu",
  "minimize",
  "minus",
  "minus-circle",
  "minus-circle-fill",
  "money",
  "open-in-new",
  "pencil-square",
  "person",
  "person-add",
  "person-cancel-fill",
  "person-fill",
  "person-gear",
  "plus",
  "plus-circle",
  "plus-circle-fill",
  "plus-small",
  "question-circle",
  "report",
  "route",
  "search",
  "search-fill",
  "share",
  "side-left",
  "side-right",
  "stop-fill",
  "success",
  "success-fill",
  "unlock",
  "unlock-fill",
  "warning-fill"
], J = {
  app: '<path d="M7.41 5.71C7.41 6.65 6.65 7.41 5.71 7.41C4.77 7.41 4.01 6.64 4.01 5.71C4.01 4.78 4.77 4.01 5.71 4.01C6.65 4.01 7.41 4.78 7.41 5.71ZM13.71 5.71C13.71 4.77 12.95 4.01 12.01 4.01C11.07 4.01 10.31 4.78 10.31 5.71C10.31 6.64 11.07 7.41 12.01 7.41C12.95 7.41 13.71 6.64 13.71 5.71ZM19.99 5.71C19.99 4.77 19.23 4.01 18.29 4.01C17.35 4.01 16.59 4.78 16.59 5.71C16.59 6.64 17.35 7.41 18.29 7.41C19.23 7.41 19.99 6.64 19.99 5.71ZM7.41 12C7.41 11.06 6.65 10.3 5.71 10.3C4.77 10.3 4.01 11.06 4.01 12C4.01 12.94 4.77 13.7 5.71 13.7C6.65 13.7 7.41 12.94 7.41 12ZM13.71 12C13.71 11.06 12.95 10.3 12.01 10.3C11.07 10.3 10.31 11.06 10.31 12C10.31 12.94 11.07 13.7 12.01 13.7C12.95 13.7 13.71 12.94 13.71 12ZM19.99 12.01C19.99 11.07 19.23 10.31 18.29 10.31C17.35 10.31 16.59 11.07 16.59 12.01C16.59 12.95 17.35 13.71 18.29 13.71C19.23 13.71 19.99 12.95 19.99 12.01ZM7.41 18.31C7.41 17.38 6.65 16.61 5.71 16.61C4.77 16.61 4.01 17.37 4.01 18.31C4.01 19.25 4.77 20.01 5.71 20.01C6.65 20.01 7.41 19.25 7.41 18.31ZM13.71 18.31C13.71 17.38 12.95 16.61 12.01 16.61C11.07 16.61 10.31 17.37 10.31 18.31C10.31 19.25 11.07 20.01 12.01 20.01C12.95 20.01 13.71 19.25 13.71 18.31ZM19.99 18.31C19.99 17.38 19.23 16.61 18.29 16.61C17.35 16.61 16.59 17.37 16.59 18.31C16.59 19.25 17.35 20.01 18.29 20.01C19.23 20.01 19.99 19.25 19.99 18.31Z"/>',
  "arrow-down": '<path d="M17.87 13.06L12.75 18.18V3.01001H11.25V18.18L6.13 13.06L5.07 14.12L12 21.05L18.93 14.12L17.87 13.06Z"/>',
  "arrow-down-small": '<path d="M15.58 12.37L12.76 15.19V6H11.26V15.19L8.43 12.36L7.37 13.42L12.01 18.06L16.64 13.43L15.58 12.37Z"/>',
  "arrow-left": '<path d="M21.02 11.2499H5.85L10.97 6.12995L9.91 5.06995L2.98 11.9999L9.91 18.9299L10.97 17.8699L5.85 12.7499H21.02V11.2499Z"/>',
  "arrow-up-down": '<path d="M10.97 13.9L12.03 14.96L7.01001 19.98L1.98001 14.96L3.04001 13.9L6.25001 17.11V5.01001H7.75001V17.11L10.96 13.9H10.97ZM22.02 9.03001L17 4.01001L11.98 9.03001L13.04 10.09L16.25 6.88001V19H17.75V6.88001L20.96 10.09L22.02 9.03001Z"/>',
  "arrow-up-small": '<path d="M16.64 10.64L12 6L7.37 10.63L8.43 11.69L11.25 8.87V18.06H12.75V8.87L15.58 11.7L16.64 10.64Z"/>',
  bell: '<path d="M20.9925 16.2515C20.1232 15.5021 18.7544 14.1033 18.7544 13.0042V9.7369C18.7544 6.02 15.7269 2.99252 12.01 2.99252C8.2931 2.99252 5.26563 6.02 5.26563 9.7369V13.0042C5.26563 14.1133 3.86679 15.5321 3.00751 16.2715V17.98H8.83265C8.78269 18.2098 8.74273 18.4496 8.74273 18.7194C8.74273 20.5179 10.2015 21.9767 12 21.9767C13.7985 21.9767 15.2573 20.5179 15.2573 18.7194C15.2573 18.4496 15.2173 18.2098 15.1574 17.98H20.9925V16.2515ZM12 20.478C11.0308 20.478 10.2415 19.6886 10.2415 18.7194C10.2415 18.4197 10.3214 18.1699 10.4113 17.98H13.5787C13.6686 18.1599 13.7585 18.4097 13.7585 18.7194C13.7585 19.6886 12.9692 20.478 12 20.478ZM12.01 16.4813H4.97587C5.84514 15.562 6.76438 14.2931 6.76438 13.0042V9.7369C6.76438 6.83932 9.12241 4.49127 12.01 4.49127C14.8976 4.49127 17.2556 6.83932 17.2556 9.7369V13.0042C17.2556 14.2931 18.1749 15.562 19.0441 16.4813H12.01Z"/>',
  "bell-fill": '<path d="M3.00751 16.2664C3.87678 15.5271 5.25563 14.1082 5.25563 13.0092V9.74188C5.25563 6.02497 8.28311 2.9975 12 2.9975C15.7169 2.9975 18.7444 6.02497 18.7444 9.74188V13.0092C18.7444 14.1082 20.1232 15.5171 20.9925 16.2664V17.975H3.00751V16.2664ZM8.83265 19.4738C9.17237 20.9126 10.4613 21.9917 12 21.9917C13.5387 21.9917 14.8277 20.9126 15.1674 19.4738H8.83265Z"/>',
  "book-ai": '<path d="M21.8188 5.95625C20.2088 6.27625 18.9388 7.49625 18.5388 9.08625L18.1788 9.44625C18.1088 9.41625 18.0588 9.37625 18.0388 9.28625C17.7088 7.59625 16.3888 6.28625 14.6988 5.94625C14.4588 5.89625 14.4588 5.54625 14.6988 5.49625C16.3888 5.16625 17.6988 3.84625 18.0388 2.15625C18.0888 1.91625 18.4388 1.91625 18.4888 2.15625C18.8188 3.84625 20.1388 5.15625 21.8288 5.49625C22.0688 5.54625 22.0688 5.89625 21.8288 5.94625L21.8188 5.95625ZM21.0088 19.8862C21.0088 19.8862 21.0088 19.9462 21.0088 19.9762H19.5088C19.4488 19.6262 18.0088 18.4962 15.8788 18.4962C13.7488 18.4962 12.3088 19.6262 12.2488 19.9862H10.7488V19.9762C10.6888 19.6262 9.24877 18.4962 7.11877 18.4962C4.98877 18.4962 3.55877 19.6262 3.48877 19.9862H1.98877V7.41625C1.98877 5.80625 4.63877 4.72625 7.11877 4.72625C8.78877 4.72625 10.5388 5.22625 11.4988 6.03625C11.9188 5.68625 12.4688 5.38625 13.1088 5.17625C13.0488 5.35625 13.0088 5.54625 13.0088 5.73625C13.0088 6.08625 13.1288 6.41625 13.3188 6.68625C12.6688 6.94625 12.2888 7.25625 12.2388 7.43625V17.9562C13.1988 17.3762 14.5188 16.9962 15.8688 16.9962C17.2188 16.9962 18.5388 17.3762 19.4988 17.9562V10.5762L19.6188 10.3662L20.9988 8.98625V19.8862H21.0088ZM10.7488 7.41625V7.43625C10.6588 7.08625 9.26877 6.22625 7.11877 6.22625C4.96877 6.22625 3.57877 7.08625 3.48877 7.43625V17.9562C4.44877 17.3762 5.76877 16.9962 7.11877 16.9962C8.46877 16.9962 9.79877 17.3862 10.7588 17.9662V7.41625H10.7488Z"/>',
  bookmark: '<path d="M18.7444 21.0225L12 17.6553L5.25562 21.0225V3.81682C5.25562 3.37719 5.61532 3.01749 6.05495 3.01749H17.945C18.3847 3.01749 18.7444 3.37719 18.7444 3.81682V21.0225ZM12 15.9867L17.2456 18.6045V4.51624H6.75437V18.6045L12 15.9867Z"/>',
  "bookmark-fill": '<path d="M18.76 21.04L12.01 17.67L5.26 21.04V3.82002C5.26 3.38002 5.62 3.02002 6.06 3.02002H17.96C18.4 3.02002 18.76 3.38002 18.76 3.82002V21.04Z"/>',
  building: '<path d="M7.54003 8.96002H6.04003V6.96002H7.54003V8.96002ZM11.79 6.96002H10.29V8.96002H11.79V6.96002ZM7.54003 10.96H6.04003V12.96H7.54003V10.96ZM11.79 10.96H10.29V12.96H11.79V10.96ZM7.54003 14.96H6.04003V16.96H7.54003V14.96ZM11.79 14.96H10.29V16.96H11.79V14.96ZM21.03 8.30002V20.29C21.03 20.7 20.69 21.04 20.28 21.04H14.23V21.02H3.72003C3.31003 21.02 2.97003 20.68 2.97003 20.27V3.77002C2.97003 3.36002 3.31003 3.02002 3.72003 3.02002H14.37C14.78 3.02002 15.12 3.36002 15.12 3.77002V7.55002H20.28C20.69 7.55002 21.03 7.89002 21.03 8.30002ZM13.62 4.52002H4.47003V19.52H13.62V4.52002ZM19.53 9.05002H15.12V19.54H19.53V9.05002Z"/>',
  "building-add": '<path d="M7.54 8.92999H6.04V6.92999H7.54V8.92999ZM11.79 6.92999H10.29V8.92999H11.79V6.92999ZM7.54 10.93H6.04V12.93H7.54V10.93ZM11.79 10.93H10.29V12.93H11.79V10.93ZM7.54 14.93H6.04V16.93H7.54V14.93ZM11.01 19.49H4.47V4.48999H13.62V11.47C14.09 11.18 14.59 10.95 15.12 10.79V9.01999H19.53V11.03C20.07 11.26 20.57 11.57 21.03 11.93V8.26999C21.03 7.85999 20.69 7.51999 20.28 7.51999H15.12V3.73999C15.12 3.32999 14.78 2.98999 14.37 2.98999H3.72C3.31 2.98999 2.97 3.32999 2.97 3.73999V20.24C2.97 20.65 3.31 20.99 3.72 20.99H11.9C11.54 20.53 11.24 20.03 11.01 19.49ZM21.98 17C21.98 19.75 19.74 21.98 17 21.98C14.26 21.98 12.02 19.74 12.02 17C12.02 14.26 14.26 12.02 17 12.02C19.74 12.02 21.98 14.26 21.98 17ZM19.99 16.5H17.49V14H16.49V16.5H13.99V17.5H16.49V20H17.49V17.5H19.99V16.5Z"/>',
  "building-cancel-fill": '<path d="M17 12.01C14.25 12.01 12.02 14.25 12.02 16.99C12.02 19.73 14.26 21.97 17 21.97C19.74 21.97 21.98 19.73 21.98 16.99C21.98 14.25 19.74 12.01 17 12.01ZM19.12 17.5H14.87V16.5H19.12V17.5ZM21.03 8.26999V11.93C19.92 11.05 18.52 10.51 17 10.51C16.88 10.51 16.75 10.52 16.63 10.53V7.51999H20.28C20.69 7.51999 21.03 7.85999 21.03 8.26999ZM15.12 3.73999C15.12 3.32999 14.78 2.98999 14.37 2.98999H3.72C3.31 2.98999 2.97 3.32999 2.97 3.73999V20.24C2.97 20.65 3.31 20.99 3.72 20.99H11.9C11.03 19.89 10.51 18.5 10.51 17C10.51 14.13 12.4 11.69 14.99 10.85C15.04 10.84 15.08 10.82 15.13 10.8V7.52999V3.74999L15.12 3.73999ZM7.54 16.93H6.04V14.93H7.54V16.93ZM7.54 12.93H6.04V10.93H7.54V12.93ZM7.54 8.92999H6.04V6.92999H7.54V8.92999ZM11.79 12.93H10.29V10.93H11.79V12.93ZM11.79 8.92999H10.29V6.92999H11.79V8.92999Z"/>',
  calendar: '<path d="M20.28 4.78501H16.74V2.47501H15.24V4.78501H8.74998V2.47501H7.24998V4.78501H3.78998C3.37998 4.78501 3.03998 5.12501 3.03998 5.53501V19.795C3.03998 20.205 3.37998 20.545 3.78998 20.545H20.29C20.7 20.545 21.04 20.205 21.04 19.795V5.53501C21.04 5.12501 20.7 4.78501 20.29 4.78501H20.28ZM7.23998 6.28501V7.97501H8.73998V6.28501H15.23V7.97501H16.73V6.28501H19.52V9.78501H4.52998V6.28501H7.23998ZM4.52998 19.045V11.295H19.53V19.045H4.52998Z"/>',
  "calendar-event": '<path d="M17.6 14.395C17.6 15.275 16.88 15.995 16 15.995C15.12 15.995 14.4 15.275 14.4 14.395C14.4 13.515 15.12 12.795 16 12.795C16.88 12.795 17.6 13.515 17.6 14.395ZM21.04 5.53501V19.795C21.04 20.205 20.7 20.545 20.29 20.545H3.78998C3.37998 20.545 3.03998 20.205 3.03998 19.795V5.53501C3.03998 5.12501 3.37998 4.78501 3.78998 4.78501H7.24998V2.47501H8.74998V4.78501H15.24V2.47501H16.74V4.78501H20.28C20.69 4.78501 21.03 5.12501 21.03 5.53501H21.04ZM4.53998 6.28501V9.78501H19.54V6.28501H16.75V7.97501H15.25V6.28501H8.75998V7.97501H7.25998V6.28501H4.54998H4.53998ZM19.54 19.045V11.295H4.53998V19.045H19.54Z"/>',
  "calendar-fill": '<path d="M21.035 11.29V19.79C21.035 20.2 20.695 20.54 20.285 20.54H3.78497C3.37497 20.54 3.03497 20.2 3.03497 19.79V11.29H21.035ZM21.035 9.78998V5.53998C21.035 5.12998 20.695 4.78998 20.285 4.78998H16.745V2.47998H15.245V4.78998H8.75497V2.47998H7.25497V4.78998H3.79497C3.38497 4.78998 3.04497 5.12998 3.04497 5.53998V9.78998H21.045H21.035Z"/>',
  chain: '<path d="M12.97 14.87C11.98 14.87 10.99 14.5 10.24 13.75L9.71 13.22L10.77 12.16L11.3 12.69C12.23 13.62 13.79 13.59 14.76 12.62L17.95 9.43C18.92 8.46 18.95 6.9 18.02 5.97C17.57 5.52 16.97 5.26 16.31 5.29C15.65 5.29 15.03 5.57 14.55 6.04L12.25 8.34L11.19 7.28L13.49 4.98C15.05 3.42 17.55 3.39 19.07 4.91C19.81 5.65 20.21 6.64 20.19 7.7C20.17 8.75 19.75 9.74 19 10.49L15.81 13.68C15.02 14.47 13.98 14.87 12.95 14.87H12.97ZM7.71 20.19C8.76 20.17 9.75 19.75 10.5 19L12.8 16.7L11.74 15.64L9.44 17.94C8.97 18.41 8.34 18.68 7.68 18.69C6.99 18.72 6.43 18.46 5.97 18.01C5.04 17.08 5.07 15.52 6.04 14.55L9.23 11.36C9.7 10.89 10.33 10.62 10.99 10.61H11.03C11.66 10.61 12.25 10.85 12.7 11.29L13.23 11.82L14.29 10.76L13.76 10.23C12.24 8.71 9.74 8.74 8.18 10.3L4.99 13.49C4.24 14.24 3.82 15.23 3.8 16.28C3.78 17.34 4.18 18.33 4.92 19.07C5.66 19.81 6.61 20.19 7.64 20.19C7.66 20.19 7.68 20.19 7.7 20.19H7.71Z"/>',
  check: '<path d="M9.81001 17.99L2.99001 11.2L4.05001 10.14L9.81001 15.88L19.95 5.76L21.01 6.82L9.81001 17.99Z"/>',
  "check-small": '<path d="M10.64 16.21L5.98999 11.58L7.04999 10.52L10.64 14.09L16.95 7.79L18.01 8.85L10.64 16.21Z"/>',
  "chevron-down": '<path d="M12 17L3.03 8.97998L4.03 7.85999L12 14.99L19.45 8.37999L20.45 9.49999L12 17Z"/>',
  "chevron-down-fill": '<path d="M6 9L12 16.99L18 9H6Z"/>',
  "chevron-down-small": '<path d="M12.01 16.01L6.01 10.75L7 9.62L12.01 14.01L17.02 9.62L18.01 10.75L12.01 16.01Z"/>',
  "chevron-left": '<path d="M14.99 21.01L7 12L14.99 2.98999L16.11 3.98999L9.01 12L16.11 20.01L14.99 21.01Z"/>',
  "chevron-left-small": '<path d="M13.27 18L8.00999 12L13.27 6L14.4 6.99L10.01 12L14.4 17.01L13.27 18Z"/>',
  "chevron-right": '<path d="M9.01 21.01L7.89 20.01L14.99 12L7.89 3.98999L9.01 2.98999L17 12L9.01 21.01Z"/>',
  "chevron-right-fill": '<path d="M8.99 6V18L16.98 12L8.99 6Z"/>',
  "chevron-right-small": '<path d="M10.75 18L9.62 17.01L14.01 12L9.62 6.99L10.75 6L16.01 12L10.75 18Z"/>',
  "chevron-up": '<path d="M20.01 16.11L12 9.01L3.99 16.11L2.99 14.99L12 7L21.01 14.99L20.01 16.11Z"/>',
  "chevron-up-small": '<path d="M17.01 14.4L12 10.01L6.99 14.4L6 13.27L12 8.01001L18 13.27L17.01 14.4Z"/>',
  clock: '<path d="M12.01 21.98C6.51 21.98 2.03 17.5 2.03 12C2.03 6.5 6.51 2.02 12.01 2.02C17.51 2.02 21.99 6.5 21.99 12C21.99 17.5 17.51 21.98 12.01 21.98ZM12.01 3.52C7.34 3.52 3.53 7.33 3.53 12C3.53 16.67 7.33 20.48 12.01 20.48C16.69 20.48 20.49 16.68 20.49 12C20.49 7.32 16.69 3.52 12.01 3.52ZM16.03 14.97L12.75 11.69V6.97H11.25V12.31L14.97 16.03L16.03 14.97Z"/>',
  copy: '<path d="M16 21.98H3.01999V6.01H4.51999V20.49H16V21.99V21.98ZM21 17.26V2.76C21 2.35 20.66 2.01 20.25 2.01H7.74999C7.33999 2.01 6.99999 2.35 6.99999 2.76V17.26C6.99999 17.67 7.33999 18.01 7.74999 18.01H20.25C20.66 18.01 21 17.67 21 17.26ZM8.49999 3.51H19.5V16.51H8.49999V3.51Z"/>',
  cross: '<path d="M20 5.06L18.94 4L12 10.94L5.07 4.01L4.01 5.07L10.94 12L4 18.94L5.06 20L12 13.06L18.93 19.99L19.99 18.93L13.06 12L20 5.06Z"/>',
  "cross-small": '<path d="M17 8.06L15.94 7L12 10.94L8.06 7L7 8.06L10.94 12L7 15.94L8.06 17L12 13.06L15.94 17L17 15.94L13.06 12L17 8.06Z"/>',
  "double-chevron-right": '<path d="M12.93 19.98L11.81 18.98L18.01 11.99L11.81 5L12.93 4L20.01 11.98L12.93 19.96V19.98ZM14.07 12L6.99 4.02L5.87 5.02L12.07 12.01L5.87 19L6.99 20L14.07 12.02V12Z"/>',
  download: '<path d="M21 15V20.25C21 20.66 20.66 21 20.25 21H3.75C3.34 21 3 20.66 3 20.25V15H4.5V19.5H19.5V15H21ZM16.95 11.06L15.89 10L12.76 13.13V3.01001H11.26V13.13L8.13 10L7.07 11.06L12.01 16L16.95 11.06Z"/>',
  drag: '<path d="M10.41 5.71C10.41 6.65 9.65 7.41 8.71 7.41C7.77 7.41 7.01 6.64 7.01 5.71C7.01 4.78 7.77 4.01 8.71 4.01C9.65 4.01 10.41 4.78 10.41 5.71ZM10.41 12C10.41 11.06 9.65 10.3 8.71 10.3C7.77 10.3 7.01 11.06 7.01 12C7.01 12.94 7.77 13.7 8.71 13.7C9.65 13.7 10.41 12.94 10.41 12ZM10.41 18.31C10.41 17.38 9.65 16.61 8.71 16.61C7.77 16.61 7.01 17.37 7.01 18.31C7.01 19.25 7.77 20.01 8.71 20.01C9.65 20.01 10.41 19.25 10.41 18.31ZM17 5.71C17 4.77 16.24 4.01 15.3 4.01C14.36 4.01 13.6 4.78 13.6 5.71C13.6 6.64 14.36 7.41 15.3 7.41C16.24 7.41 17 6.64 17 5.71ZM17 12C17 11.06 16.24 10.3 15.3 10.3C14.36 10.3 13.6 11.06 13.6 12C13.6 12.94 14.36 13.7 15.3 13.7C16.24 13.7 17 12.94 17 12ZM17 18.31C17 17.38 16.24 16.61 15.3 16.61C14.36 16.61 13.6 17.37 13.6 18.31C13.6 19.25 14.36 20.01 15.3 20.01C16.24 20.01 17 19.25 17 18.31Z"/>',
  "error-fill": '<path fill="currentColor" d="M21.28 7.84L16.15 2.72C16.01 2.58 15.82 2.5 15.62 2.5H8.37C8.17 2.5 7.98 2.58 7.84 2.72L2.72 7.84C2.58 7.98 2.5 8.17 2.5 8.37V15.62C2.5 15.82 2.58 16.01 2.72 16.15L7.85 21.28C7.99 21.42 8.18 21.5 8.38 21.5H15.63C15.83 21.5 16.02 21.42 16.16 21.28L21.29 16.15C21.43 16.01 21.51 15.82 21.51 15.62V8.37C21.51 8.17 21.43 7.98 21.29 7.84H21.28ZM16.81 15.75L15.75 16.81L12 13.06L8.25 16.81L7.19 15.75L10.94 12L7.19 8.25L8.25 7.19L12 10.94L15.75 7.19L16.81 8.25L13.06 12L16.81 15.75Z"/><path d="M16.81 8.24994L15.75 7.18994L12 10.9399L8.25 7.18994L7.19 8.24994L10.94 11.9999L7.19 15.7499L8.25 16.8099L12 13.0599L15.75 16.8099L16.81 15.7499L13.06 11.9999L16.81 8.24994Z" fill="white"/>',
  exit: '<path d="M12.23 15.73H13.73V20.25C13.73 20.66 13.39 21 12.98 21H3.78C3.37 21 3.03 20.66 3.03 20.25V3.75C3.03 3.34 3.37 3 3.78 3H12.98C13.39 3 13.73 3.34 13.73 3.75V8.24H12.23V4.5H4.53V19.5H12.23V15.73ZM17.02 8L15.96 9.06L18.15 11.25H13.73H12.23H8.03V12.75H18.14L15.95 14.94L17.01 16L21.01 12L17.01 8H17.02Z"/>',
  eye: '<path d="M12 15.59C10.02 15.59 8.41 13.98 8.41 12C8.41 10.02 10.02 8.40999 12 8.40999C13.98 8.40999 15.59 10.02 15.59 12C15.59 13.98 13.98 15.59 12 15.59ZM12 9.90999C10.85 9.90999 9.91 10.85 9.91 12C9.91 13.15 10.85 14.09 12 14.09C13.15 14.09 14.09 13.15 14.09 12C14.09 10.85 13.15 9.90999 12 9.90999ZM12 19.09C7.23 19.09 3.34 14.25 2.26 12.77C1.92 12.31 1.92 11.68 2.26 11.22C3.34 9.73999 7.22 4.89999 12 4.89999C16.78 4.89999 20.66 9.73999 21.73 11.22C22.07 11.68 22.07 12.31 21.73 12.77C20.65 14.25 16.77 19.09 12 19.09ZM3.56 12C4.42 13.16 7.97 17.59 12 17.59C16.03 17.59 19.59 13.15 20.44 12C19.58 10.85 16.03 6.40999 12 6.40999C7.97 6.40999 4.41 10.85 3.56 12Z"/>',
  "eye-slash": '<path d="M15.59 12C15.59 12.44 15.5 12.85 15.36 13.24L14.09 11.97C14.07 10.84 13.16 9.93 12.03 9.91L10.76 8.64C11.15 8.5 11.56 8.41 12 8.41C13.98 8.41 15.59 10.02 15.59 12ZM21.74 12.78C21.22 13.49 20.05 14.97 18.44 16.33L17.37 15.26C18.89 14 20.01 12.59 20.44 12C19.58 10.85 16.03 6.41 12 6.41C11.03 6.41 10.08 6.67 9.19 7.08L8.07 5.96C9.27 5.33 10.59 4.91 12 4.91C16.77 4.91 20.66 9.75 21.74 11.23C22.08 11.69 22.08 12.32 21.74 12.78ZM20.42 20.43L19.37 21.48L15.93 18.04C14.73 18.67 13.41 19.09 12 19.09C7.23 19.09 3.34 14.25 2.26 12.77C1.92 12.31 1.92 11.68 2.26 11.22C2.78 10.51 3.95001 9.02 5.55001 7.67L2.44 4.56L3.5 3.5V3.51L20.42 20.43ZM9.91 12.03C9.93 13.16 10.84 14.07 11.97 14.09L9.91 12.03ZM14.81 16.92L13.24 15.35C12.85 15.49 12.44 15.58 12 15.58C10.02 15.58 8.41 13.97 8.41 11.99C8.41 11.55 8.50001 11.14 8.64001 10.75L6.62 8.73C5.1 9.99 3.98 11.41 3.55 11.99C4.41 13.15 7.96 17.58 11.99 17.58C12.96 17.58 13.91 17.32 14.8 16.91L14.81 16.92Z"/>',
  follow: '<path d="M5.81252 21.0001C5.63577 21.0001 5.45999 20.9376 5.32034 20.8161C5.08206 20.609 4.99905 20.2755 5.11233 19.9811L7.25002 14.421L2.67874 10.3898C2.44436 10.1837 2.36331 9.85414 2.47366 9.56214C2.58401 9.27015 2.86331 9.07728 3.17483 9.07728H9.02835L11.2764 3.47084C11.3916 3.18275 11.6973 2.99427 11.9844 3.00013C12.2949 3.00502 12.5713 3.2013 12.6778 3.4933L14.7129 9.07728H20.8262C21.1397 9.07728 21.4199 9.27211 21.5293 9.56605C21.6387 9.86 21.5537 10.1906 21.3164 10.3952L16.6582 14.4118L18.8076 19.9801C18.9219 20.2745 18.8389 20.609 18.6006 20.8161C18.3623 21.0236 18.0186 21.0587 17.7432 20.9054L11.9717 17.6915L6.17581 20.9059C6.06252 20.9694 5.93752 21.0001 5.81252 21.0001ZM5.1592 10.5773L8.63381 13.6408C8.86917 13.8483 8.95022 14.1798 8.83792 14.4723L7.25295 18.5934L11.6094 16.1779C11.834 16.0514 12.1094 16.0529 12.3379 16.1784L16.6621 18.5866L15.0694 14.4591C14.9551 14.1637 15.0391 13.8283 15.2783 13.6212L18.8086 10.5773H14.1875C13.8721 10.5773 13.5908 10.38 13.4824 10.0841L11.9395 5.84828L10.2315 10.1066C10.1172 10.3908 9.84182 10.5773 9.53518 10.5773H5.1592Z"/>',
  "follow-fill": '<path d="M6.0176 21.0001C5.84085 21.0001 5.66506 20.9376 5.52542 20.8161C5.28713 20.609 5.20413 20.2755 5.31741 19.9811L7.4551 14.421L2.88381 10.3898C2.64944 10.1837 2.56838 9.85414 2.67874 9.56214C2.78909 9.27015 3.06838 9.07728 3.37991 9.07728H9.23342L11.4815 3.47084C11.5967 3.18275 11.9024 2.99427 12.1895 3.00013C12.5 3.00502 12.7764 3.2013 12.8828 3.4933L14.918 9.07728H21.0313C21.3448 9.07728 21.625 9.27211 21.7344 9.56605C21.8438 9.86 21.7588 10.1906 21.5215 10.3952L16.8633 14.4118L19.0127 19.9801C19.127 20.2745 19.044 20.609 18.8057 20.8161C18.5674 21.0236 18.2237 21.0587 17.9483 20.9054L12.1768 17.6915L6.38088 20.9059C6.2676 20.9694 6.1426 21.0001 6.0176 21.0001Z"/>',
  "follow-list": '<path d="M20.995 6.25H3.01497V4.75H20.985V6.25H20.995ZM20.995 11.24H3.01497V12.74H20.985V11.24H20.995ZM20.995 17.74H18.255V14.99H16.755V17.74H14.005V19.24H16.755V21.99H18.255V19.24H20.995V17.74ZM3.01497 19.24H11.005V17.74H3.01497V19.24Z"/>',
  "follow-list-fill": '<path d="M20.995 4.495V6.495H3.01501V4.495H20.985H20.995ZM3.01501 12.985H20.985V10.985H3.01501V12.985ZM18.505 14.995H16.505V17.495H14.005V19.495H16.505V21.995H18.505V19.495H20.995V17.495H18.505V14.995ZM3.01501 19.485H11.005V17.485H3.01501V19.485Z"/>',
  gear: '<path d="M14.08 22.01H9.91C9.11 22.01 8.47 21.36 8.47 20.56V19.32C8.11 19.14 7.76 18.94 7.43 18.72L6.35 19.34C6.02 19.53 5.63 19.58 5.26 19.49C4.88 19.39 4.57 19.15 4.38 18.82L2.29 15.2C1.89 14.51 2.13 13.63 2.82 13.23L3.9 12.61C3.89 12.41 3.88 12.21 3.88 12.01C3.88 11.81 3.88 11.61 3.9 11.41L2.83 10.79C2.14 10.39 1.9 9.51 2.3 8.82L4.39 5.21C4.59 4.87 4.9 4.64 5.27 4.54C5.65 4.44 6.04 4.5 6.37 4.69L7.45 5.31C7.78 5.08 8.13 4.88 8.49 4.71V3.47C8.49 2.67 9.14 2.03 9.93 2.03H14.1C14.9 2.03 15.55 2.68 15.55 3.47V4.71C15.91 4.88 16.26 5.09 16.59 5.31L17.67 4.69C17.99 4.5 18.38 4.45 18.76 4.54C19.14 4.64 19.45 4.89 19.65 5.21L21.74 8.82C21.93 9.16 21.98 9.55 21.88 9.92C21.78 10.29 21.54 10.6 21.21 10.8L20.13 11.42C20.14 11.62 20.15 11.82 20.15 12.02C20.15 12.22 20.15 12.42 20.13 12.62L21.21 13.24C21.54 13.44 21.78 13.75 21.88 14.12C21.98 14.49 21.93 14.88 21.74 15.22L19.66 18.83C19.47 19.16 19.15 19.4 18.78 19.5C18.4 19.6 18.01 19.55 17.68 19.36L16.6 18.74C16.27 18.97 15.92 19.17 15.56 19.34V20.58C15.56 21.38 14.91 22.03 14.11 22.03L14.08 22.01ZM7.54 16.92L7.94 17.23C8.42 17.6 8.94 17.91 9.5 18.14L9.97 18.33V20.56L14.08 20.51L14.03 18.33L14.5 18.14C15.06 17.91 15.58 17.61 16.06 17.23L16.46 16.92L18.4 18.04L20.38 14.5L18.49 13.41L18.56 12.91C18.6 12.61 18.62 12.3 18.62 12C18.62 11.7 18.6 11.39 18.56 11.09L18.49 10.59L20.42 9.47L18.32 5.93L16.45 7.07L16.05 6.76C15.57 6.39 15.05 6.08 14.49 5.85L14.02 5.66V3.43L9.9 3.49L9.96 5.67L9.49 5.86C8.93 6.09 8.4 6.4 7.93 6.77L7.53 7.08L5.59 5.96L3.58 9.55L5.49 10.59L5.42 11.09C5.38 11.39 5.36 11.7 5.36 12C5.36 12.3 5.38 12.6 5.42 12.91L5.49 13.41L3.56 14.53L5.67 18.07L7.54 16.93V16.92ZM12 15.75C9.93 15.75 8.25 14.07 8.25 12C8.25 9.93 9.93 8.25 12 8.25C14.07 8.25 15.75 9.93 15.75 12C15.75 14.07 14.07 15.75 12 15.75ZM12 9.75C10.76 9.75 9.75 10.76 9.75 12C9.75 13.24 10.76 14.25 12 14.25C13.24 14.25 14.25 13.24 14.25 12C14.25 10.76 13.24 9.75 12 9.75Z"/>',
  headset: '<path d="M18.94 9.78C18.98 9.68 18.99 9.58 18.99 9.47C18.72 5.84 15.65 2.99 12 2.99C8.34999 2.99 5.19999 5.9 4.99999 9.62C4.99999 9.68 5.00999 9.73 5.01999 9.78C3.86999 10 2.98999 11.02 2.98999 12.23V14.73C2.98999 16.11 4.10999 17.23 5.48999 17.23C6.86999 17.23 7.98999 16.11 7.98999 14.73V12.23C7.98999 11.19 7.34999 10.29 6.43999 9.92C6.46999 9.85 6.48999 9.78 6.49999 9.7C6.64999 6.78 9.06999 4.49 12 4.49C14.93 4.49 17.28 6.72 17.49 9.58C17.49 9.7 17.54 9.81 17.6 9.91C16.66 10.27 15.99 11.18 15.99 12.24V14.74C15.99 15.48 16.32 16.14 16.84 16.6C16.12 17.93 14.93 18.89 13.51 19.29C13.3 19.12 13.04 19 12.74 19H11.24C10.55 19 9.98999 19.56 9.98999 20.25C9.98999 20.94 10.55 21.5 11.24 21.5H12.74C13.26 21.5 13.7 21.19 13.89 20.74C15.74 20.23 17.3 18.97 18.21 17.21C18.3 17.22 18.39 17.24 18.49 17.24C19.87 17.24 20.99 16.12 20.99 14.74V12.24C20.99 11.01 20.1 10 18.93 9.78H18.94ZM6.49999 14.74C6.49999 15.29 6.04999 15.74 5.49999 15.74C4.94999 15.74 4.49999 15.29 4.49999 14.74V12.24C4.49999 11.69 4.94999 11.24 5.49999 11.24C6.04999 11.24 6.49999 11.69 6.49999 12.24V14.74ZM19.5 14.74C19.5 15.29 19.05 15.74 18.5 15.74C17.95 15.74 17.5 15.29 17.5 14.74V12.24C17.5 11.69 17.95 11.24 18.5 11.24C19.05 11.24 19.5 11.69 19.5 12.24V14.74Z"/>',
  "headset-face": '<path d="M21 12.24V14.74C21 16.12 19.88 17.24 18.5 17.24C18.4 17.24 18.31 17.22 18.22 17.21C17.31 18.97 15.74 20.22 13.9 20.74C13.71 21.19 13.27 21.5 12.75 21.5H11.25C10.56 21.5 10 20.94 10 20.25C10 19.56 10.56 19 11.25 19H12.75C13.05 19 13.31 19.12 13.52 19.29C14.93 18.89 16.13 17.93 16.85 16.6C16.34 16.14 16 15.48 16 14.74V12.24C16 11.18 16.67 10.27 17.61 9.90999C17.55 9.80999 17.51 9.70999 17.5 9.57999C17.29 6.72999 14.88 4.48999 12.01 4.48999C9.14 4.48999 6.67 6.77999 6.51 9.69999C6.51 9.77999 6.48 9.84999 6.45 9.91999C7.36 10.29 8 11.19 8 12.23V14.73C8 16.11 6.88 17.23 5.5 17.23C4.12 17.23 3 16.11 3 14.73V12.23C3 11.01 3.88 9.99999 5.03 9.77999C5.03 9.72999 5 9.67999 5.01 9.61999C5.2 5.89999 8.28 2.98999 12.01 2.98999C15.74 2.98999 18.73 5.82999 19 9.46999C19 9.57999 18.99 9.67999 18.95 9.77999C20.12 9.98999 21.01 11.01 21.01 12.24H21ZM6.5 12.24C6.5 11.69 6.05 11.24 5.5 11.24C4.95 11.24 4.5 11.69 4.5 12.24V14.74C4.5 15.29 4.95 15.74 5.5 15.74C6.05 15.74 6.5 15.29 6.5 14.74V12.24ZM19.5 12.24C19.5 11.69 19.05 11.24 18.5 11.24C17.95 11.24 17.5 11.69 17.5 12.24V14.74C17.5 15.29 17.95 15.74 18.5 15.74C19.05 15.74 19.5 15.29 19.5 14.74V12.24ZM14.96 15.68L13.9 14.62C12.88 15.64 11.11 15.64 10.1 14.62L9.04 15.68C9.83 16.47 10.88 16.91 12 16.91C13.12 16.91 14.17 16.47 14.96 15.68Z"/>',
  history: '<path d="M14.97 16.03L11.25 12.31V6.97H12.75V11.69L16.03 14.97L14.97 16.03ZM12.01 2.02C8.57 2.02 5.55 3.77 3.76 6.42V3H2.26V8.74H2.59H4.19H8.01V7.24H5.03C6.56 5 9.11 3.51 12.02 3.51C16.69 3.51 20.5 7.31 20.5 11.99C20.5 16.67 16.7 20.47 12.02 20.47C7.34 20.47 3.53 16.68 3.53 12C3.53 11.92 3.54 11.83 3.54 11.75H2.04C2.04 11.83 2.03 11.92 2.03 12C2.03 17.5 6.51 21.98 12.01 21.98C17.51 21.98 21.99 17.5 21.99 12C21.99 6.5 17.51 2.02 12.01 2.02Z"/>',
  home: '<path d="M22.02 9.925L12 2.625L1.98003 9.925L2.86003 11.135L4.05003 10.265L4.82003 20.715C4.85003 21.105 5.18003 21.405 5.57003 21.405H18.43C18.82 21.405 19.15 21.105 19.18 20.715L19.96 10.275L21.14 11.135L22.02 9.925ZM18.53 9.295L17.74 19.915H6.27003L5.48003 9.235L12 4.485L18.62 9.315H18.53V9.295ZM16.6 12.455C16.6 13.335 15.88 14.055 15 14.055C14.12 14.055 13.4 13.335 13.4 12.455C13.4 11.575 14.12 10.855 15 10.855C15.88 10.855 16.6 11.575 16.6 12.455Z"/>',
  "home-fill": '<path d="M12 2.625L1.98001 9.925L2.86001 11.135L4.05001 10.265L4.82001 20.715C4.85001 21.105 5.18001 21.415 5.57001 21.415H18.43C18.82 21.415 19.15 21.115 19.18 20.725L19.96 10.285L21.14 11.145L22.02 9.935L12 2.625ZM15 14.055C14.12 14.055 13.4 13.335 13.4 12.455C13.4 11.575 14.12 10.855 15 10.855C15.88 10.855 16.6 11.575 16.6 12.455C16.6 13.335 15.88 14.055 15 14.055Z"/>',
  information: '<path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20.5C7.31 20.5 3.5 16.69 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 16.69 16.69 20.5 12 20.5ZM11.17 7.78H12.83V9.5H11.17V7.78ZM11.25 11H12.75V16.83H11.25V11Z"/>',
  "information-fill": '<path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12.75 16.86H11.25V10.36H12.75V16.86ZM12.83 8.86H11.17V7.14H12.83V8.86Z"/><path d="M12.75 10.3601H11.25V16.8601H12.75V10.3601Z" fill="white"/><path d="M12.83 7.13989H11.17V8.85989H12.83V7.13989Z" fill="white"/>',
  "kebab-menu": '<path d="M13.71 5.71C13.71 6.65 12.95 7.41 12.01 7.41C11.07 7.41 10.31 6.64 10.31 5.71C10.31 4.78 11.07 4.01 12.01 4.01C12.95 4.01 13.71 4.78 13.71 5.71ZM13.71 12C13.71 11.06 12.95 10.3 12.01 10.3C11.07 10.3 10.31 11.06 10.31 12C10.31 12.94 11.07 13.7 12.01 13.7C12.95 13.7 13.71 12.94 13.71 12ZM13.71 18.31C13.71 17.38 12.95 16.61 12.01 16.61C11.07 16.61 10.31 17.37 10.31 18.31C10.31 19.25 11.07 20.01 12.01 20.01C12.95 20.01 13.71 19.25 13.71 18.31Z"/>',
  language: '<path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM19.74 8.5H15.77C15.52 6.68 15.07 5.04 14.43 3.86C16.8 4.57 18.74 6.28 19.75 8.5H19.74ZM20.5 12C20.5 12.69 20.41 13.36 20.25 14H15.92C15.97 13.34 16 12.67 16 12C16 11.33 15.97 10.66 15.92 10H20.25C20.41 10.64 20.5 11.31 20.5 12ZM12 20.5C11.23 20.5 10.21 18.63 9.75 15.5H14.26C13.8 18.63 12.77 20.5 12.01 20.5H12ZM9.58 14C9.53 13.37 9.5 12.7 9.5 12C9.5 11.3 9.53 10.63 9.58 10H14.42C14.47 10.63 14.5 11.3 14.5 12C14.5 12.7 14.47 13.37 14.42 14H9.58ZM3.5 12C3.5 11.31 3.59 10.64 3.75 10H8.08C8.03 10.66 8 11.33 8 12C8 12.67 8.03 13.34 8.08 14H3.75C3.59 13.36 3.5 12.69 3.5 12ZM12 3.5C12.77 3.5 13.79 5.37 14.25 8.5H9.74C10.2 5.37 11.23 3.5 11.99 3.5H12ZM9.58 3.86C8.94 5.04 8.49 6.69 8.24 8.5H4.27C5.28 6.28 7.22 4.56 9.59 3.86H9.58ZM4.26 15.5H8.23C8.48 17.32 8.93 18.96 9.57 20.14C7.2 19.43 5.26 17.72 4.25 15.5H4.26ZM14.42 20.14C15.06 18.96 15.51 17.31 15.76 15.5H19.73C18.72 17.72 16.78 19.44 14.41 20.14H14.42Z"/>',
  "list-close": '<path d="M15.52 7.56H3.00999V6.06H15.52V7.56ZM11.94 11.25H3.00999V12.75H11.95V11.25H11.94ZM15.52 16.44H3.00999V17.94H15.52V16.44ZM20.98 16.94L16.6 12L20.98 7.06L19.86 6.06L14.59 12L19.86 17.94L20.98 16.94Z"/>',
  "list-open": '<path d="M11.95 7.56H3.02V6.06H11.96V7.56H11.95ZM15.53 11.25H3.02V12.75H15.53V11.25ZM11.95 16.44H3.02V17.94H11.96V16.44H11.95ZM21 12L15.73 6.06L14.61 7.06L18.99 12L14.61 16.94L15.73 17.94L21 12Z"/>',
  lock: '<path d="M10.4 15.76C10.4 14.88 11.12 14.16 12 14.16C12.88 14.16 13.6 14.88 13.6 15.76C13.6 16.64 12.88 17.36 12 17.36C11.12 17.36 10.4 16.64 10.4 15.76ZM19.75 10.26V21.26C19.75 21.67 19.41 22.01 19 22.01H5C4.59 22.01 4.25 21.67 4.25 21.26V10.26C4.25 9.85001 4.59 9.51001 5 9.51001H7V8.04001C7 5.28001 9.24 3.04001 12 3.04001C14.76 3.04001 17 5.28001 17 8.04001V9.51001H19C19.41 9.51001 19.75 9.85001 19.75 10.26ZM8.5 9.51001H15.5V8.04001C15.5 6.11001 13.93 4.54001 12 4.54001C10.07 4.54001 8.5 6.11001 8.5 8.04001V9.51001ZM18.25 11.01H5.75V20.51H18.25V11.01Z"/>',
  "lock-fill": '<path d="M19 9.50998H17V8.03998C17 5.27998 14.76 3.03998 12 3.03998C9.24 3.03998 7 5.27998 7 8.03998V9.50998H5C4.59 9.50998 4.25 9.84998 4.25 10.26V21.26C4.25 21.67 4.59 22.01 5 22.01H19C19.41 22.01 19.75 21.67 19.75 21.26V10.26C19.75 9.84998 19.41 9.50998 19 9.50998ZM12 17.36C11.12 17.36 10.4 16.64 10.4 15.76C10.4 14.88 11.12 14.16 12 14.16C12.88 14.16 13.6 14.88 13.6 15.76C13.6 16.64 12.88 17.36 12 17.36ZM15.5 9.50998H8.5V8.03998C8.5 6.10998 10.07 4.53998 12 4.53998C13.93 4.53998 15.5 6.10998 15.5 8.03998V9.50998Z"/>',
  magic: '<path d="M17.02 2.23C17.08 1.92 17.52 1.92 17.58 2.23C18 4.34 19.65 5.99 21.76 6.41C22.07 6.47 22.07 6.91 21.76 6.97C19.65 7.39 18 9.04 17.58 11.15C17.52 11.46 17.08 11.46 17.02 11.15C16.6 9.04 14.95 7.39 12.84 6.97C12.53 6.91 12.53 6.47 12.84 6.41C14.95 5.99 16.6 4.34 17.02 2.23ZM10.79 21.25C11.71 18.4 13.95 16.15 16.8 15.24C17.24 15.1 17.54 14.69 17.54 14.22C17.54 13.76 17.24 13.35 16.8 13.21C13.95 12.29 11.7 10.05 10.79 7.2C10.65 6.76 10.24 6.46 9.77 6.46C9.3 6.46 8.9 6.76 8.75 7.2C7.83 10.05 5.59 12.3 2.74 13.21C2.3 13.35 2 13.76 2 14.22C2 14.69 2.3 15.09 2.74 15.24C5.59 16.16 7.84 18.4 8.75 21.25C8.89 21.69 9.3 21.99 9.77 21.99C10.24 21.99 10.64 21.69 10.79 21.25ZM9.78 8.73C10.87 11.17 12.83 13.13 15.27 14.22C12.83 15.31 10.87 17.27 9.78 19.71C8.69 17.27 6.73 15.31 4.29 14.22C6.73 13.13 8.69 11.17 9.78 8.73Z"/>',
  "magic-fill": '<path d="M9.45995 6.66957C9.55995 6.33957 10.02 6.33957 10.13 6.66957C11.23 10.0896 13.91 12.7696 17.33 13.8696C17.66 13.9696 17.66 14.4296 17.33 14.5396C13.91 15.6396 11.23 18.3196 10.13 21.7396C10.03 22.0696 9.56995 22.0696 9.45995 21.7396C8.35995 18.3196 5.67995 15.6396 2.25995 14.5396C1.92995 14.4396 1.92995 13.9796 2.25995 13.8696C5.67995 12.7696 8.35995 10.0896 9.45995 6.66957ZM12.84 6.40957C12.53 6.46957 12.53 6.90957 12.84 6.96957C14.95 7.38957 16.6 9.03957 17.02 11.1496C17.08 11.4596 17.52 11.4596 17.58 11.1496C18 9.03957 19.65 7.38957 21.76 6.96957C22.07 6.90957 22.07 6.46957 21.76 6.40957C19.65 5.98957 18 4.33957 17.58 2.22957C17.52 1.91957 17.08 1.91957 17.02 2.22957C16.6 4.33957 14.95 5.98957 12.84 6.40957Z"/>',
  mail: '<path d="M21.25 4H2.75C2.34 4 2 4.34 2 4.75V19.25C2 19.66 2.34 20 2.75 20H21.25C21.66 20 22 19.66 22 19.25V4.75C22 4.34 21.66 4 21.25 4ZM20.5 5.5V7.14L12 11.11L3.5 7.14V5.5H20.5ZM3.5 18.5V8.79L12 12.76L20.5 8.79V18.5H3.5Z"/>',
  "mail-gear": '<path d="M12 12.77L20.5 8.8V12.67C20.67 12.67 20.84 12.69 21.03 12.74C21.4 12.84 21.73 13.04 22 13.31V4.75C22 4.34 21.66 4 21.25 4H2.75C2.34 4 2 4.34 2 4.75V19.25C2 19.66 2.34 20 2.75 20H11.92L11.8 19.79C11.57 19.4 11.48 18.95 11.52 18.5H3.5V8.79L12 12.76V12.77ZM20.5 5.5V7.14L12 11.11L3.5 7.14V5.5H20.5ZM22.07 18.53C22.06 18.47 22.02 18.43 22 18.38C21.94 18.28 21.87 18.19 21.77 18.13L21.27 17.85C21.27 17.76 21.28 17.67 21.28 17.58C21.28 17.49 21.28 17.4 21.27 17.3L21.77 17.01C21.87 16.95 21.95 16.86 22 16.76C22 16.76 22.06 16.66 22.07 16.61C22.12 16.44 22.09 16.26 22 16.11L21.04 14.47C20.95 14.32 20.81 14.21 20.64 14.16C20.59 14.15 20.54 14.14 20.49 14.14C20.49 14.14 20.45 14.14 20.43 14.14C20.33 14.14 20.23 14.17 20.14 14.22L19.63 14.51C19.49 14.41 19.34 14.33 19.19 14.25V13.63C19.19 13.54 19.17 13.45 19.14 13.37C19.04 13.13 18.8 12.97 18.53 12.97H16.62C16.35 12.97 16.11 13.14 16.01 13.37C15.98 13.45 15.96 13.53 15.96 13.63V14.21C15.78 14.29 15.61 14.39 15.45 14.5L14.94 14.21C14.85 14.16 14.75 14.14 14.65 14.13C14.58 14.13 14.51 14.13 14.44 14.14C14.27 14.19 14.13 14.29 14.04 14.44L13.08 16.08C12.99 16.23 12.97 16.41 13.01 16.58C13.06 16.75 13.17 16.89 13.32 16.98L13.82 17.27C13.82 17.37 13.81 17.46 13.81 17.55C13.81 17.64 13.81 17.72 13.82 17.82L13.32 18.1C13.24 18.14 13.18 18.2 13.13 18.27C13.08 18.34 13.04 18.42 13.02 18.5C13 18.58 12.99 18.67 13 18.76C13.01 18.84 13.04 18.93 13.08 19L14.04 20.64C14.13 20.79 14.27 20.9 14.45 20.95C14.52 20.97 14.59 20.97 14.65 20.96C14.75 20.96 14.85 20.93 14.94 20.88L15.44 20.59C15.61 20.7 15.78 20.8 15.96 20.88V21.4C15.96 21.58 16.03 21.75 16.15 21.86C16.27 21.98 16.43 22.05 16.62 22.05H18.53C18.89 22.05 19.19 21.76 19.19 21.39V20.84C19.34 20.76 19.49 20.68 19.64 20.58L20.14 20.87C20.23 20.92 20.32 20.94 20.42 20.95C20.49 20.95 20.56 20.95 20.64 20.94C20.81 20.9 20.95 20.79 21.04 20.64L22 19C22.09 18.85 22.11 18.67 22.07 18.5V18.53ZM17.55 18.92C16.8 18.92 16.19 18.31 16.19 17.55C16.19 16.79 16.8 16.18 17.55 16.18C18.3 16.18 18.91 16.79 18.91 17.55C18.91 18.31 18.3 18.92 17.55 18.92Z"/>',
  maximize: '<path d="M20.31 3.68994V9.30994H18.81V6.24994L13.59 11.4699L12.53 10.4099L17.75 5.18994H14.69V3.68994H20.31ZM10.47 12.4699L5.25 17.6899V14.6299H3.75V20.2499H9.37V18.7499H6.31L11.53 13.5299L10.47 12.4699Z"/>',
  menu: '<path d="M21 6.74H3V5.24H21V6.74ZM21 11.25H3V12.75H21V11.25ZM21 17.26H3V18.76H21V17.26Z"/>',
  minimize: '<path d="M5.33001 13.05H10.95V18.67H9.45001V15.61L4.23001 20.83L3.17001 19.77L8.39001 14.55H5.33001V13.05ZM20.84 4.22003L19.78 3.16003L14.56 8.38003V5.32003H13.06V10.94H18.68V9.44003H15.62L20.84 4.22003Z"/>',
  minus: '<path d="M21 11.25H3V12.75H21V11.25Z"/>',
  "minus-circle": '<path d="M12 22C6.49 22 2 17.51 2 12C2 6.49 6.49 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22ZM12 3.5C7.31 3.5 3.5 7.31 3.5 12C3.5 16.69 7.31 20.5 12 20.5C16.69 20.5 20.5 16.69 20.5 12C20.5 7.31 16.69 3.5 12 3.5ZM17 11.25H7V12.75H17V11.25Z"/>',
  "minus-circle-fill": '<path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM17 12.75H12.75V17H11.25V12.75H7V11.25H11.25V7H12.75V11.25H17V12.75Z"/>',
  money: '<path d="M21.1 14.46L18.87 9.29C18.18 7.7 16.77 6.54 15.03 6.04C15.91 5.23 16.47 4.08 16.47 2.8C16.47 2.39 16.13 2.05 15.72 2.05H8.28C7.87 2.05 7.53 2.39 7.53 2.8C7.53 4.08 8.09 5.23 8.97 6.04C7.24 6.54 5.82 7.7 5.13 9.29L2.9 14.46C2.22 16.04 2.37 17.79 3.33 19.24C4.45 20.94 6.42 21.95 8.62 21.95H15.37C17.57 21.95 19.55 20.94 20.66 19.24C21.62 17.78 21.78 16.04 21.09 14.46H21.1ZM14.87 3.55C14.54 4.8 13.4 5.72 12.05 5.72H11.94C10.59 5.72 9.45 4.8 9.12 3.55H14.87ZM19.41 18.42C18.57 19.69 17.06 20.46 15.37 20.46H8.62C6.93 20.46 5.42 19.7 4.58 18.42C3.89 17.38 3.78 16.18 4.27 15.06L6.5 9.89C7.17 8.33 8.92 7.28 10.85 7.28H13.14C15.07 7.28 16.81 8.33 17.49 9.89L19.72 15.06C20.21 16.19 20.1 17.38 19.41 18.43V18.42ZM14.72 15.5C14.72 16.61 13.84 17.51 12.75 17.56V18.99H11.25V17.57H9.65V16.07H12.66C12.97 16.07 13.23 15.81 13.23 15.5C13.23 15.19 12.97 14.93 12.66 14.93H11.36C10.22 14.93 9.29 14 9.29 12.86C9.29 11.72 10.17 10.85 11.26 10.8V9.37H12.76V10.79H14.32V12.29H11.36C11.05 12.29 10.79 12.54 10.79 12.86C10.79 13.18 11.04 13.43 11.36 13.43H12.66C13.8 13.43 14.73 14.36 14.73 15.5H14.72Z"/>',
  "open-in-new": '<path d="M19.09 12.435H20.59V19.825C20.59 20.235 20.25 20.575 19.84 20.575H4.19C3.78 20.575 3.44 20.235 3.44 19.825V4.17496C3.44 3.76496 3.78 3.42496 4.19 3.42496H11.59V4.92496H4.94V19.075H19.09V12.435ZM14.58 2.45496V3.95496H19L12.05 10.905L13.11 11.965L20.07 5.00496V9.43496H21.57V2.45496H14.59H14.58Z"/>',
  "pencil-square": '<path d="M20.01 11.27V20.39C20.01 20.8 19.67 21.14 19.26 21.14H3.60999C3.19999 21.14 2.85999 20.8 2.85999 20.39V4.74C2.85999 4.33 3.19999 3.99 3.60999 3.99H12.82L11.32 5.49H4.35999V19.64H18.51V12.77L20.01 11.27ZM15.46 5.61L10.62 10.45L9.99999 11.08V14.05H12.97L18.44 8.58L15.47 5.6L15.46 5.61ZM17.84 3.14C18 2.97 18.27 2.97 18.44 3.14L20.88 5.58C21.04 5.74 21.04 6.01 20.88 6.17L19.13 7.92L16.15 4.94L17.84 3.15V3.14Z"/>',
  person: '<path d="M20.28 20.535H3.78001C3.37001 20.535 3.03001 20.195 3.03001 19.785C3.03001 15.415 7.15001 11.715 12.03 11.715C16.91 11.715 21.03 15.415 21.03 19.785C21.03 20.195 20.69 20.535 20.28 20.535ZM4.58001 19.035H19.48C19.04 15.815 15.81 13.215 12.03 13.215C8.25001 13.215 5.02001 15.815 4.58001 19.035ZM12.03 10.975C9.69001 10.975 7.78001 9.06501 7.78001 6.72501C7.78001 4.38501 9.69001 2.47501 12.03 2.47501C14.37 2.47501 16.28 4.38501 16.28 6.72501C16.28 9.06501 14.37 10.975 12.03 10.975ZM12.03 3.97501C10.51 3.97501 9.28001 5.20501 9.28001 6.72501C9.28001 8.24501 10.51 9.47501 12.03 9.47501C13.55 9.47501 14.78 8.24501 14.78 6.72501C14.78 5.20501 13.55 3.97501 12.03 3.97501Z"/>',
  "person-add": '<path d="M11.96 21.07H3.77C3.36 21.07 3.02 20.73 3.02 20.32C3.02 15.95 7.14 12.25 12.02 12.25C12.2 12.25 12.38 12.27 12.56 12.28C12.09 12.72 11.69 13.22 11.37 13.78C7.88 14.06 4.98 16.53 4.57 19.57H11.04C11.28 20.11 11.58 20.62 11.95 21.07H11.96ZM21.98 17C21.98 19.75 19.74 21.98 17 21.98C14.26 21.98 12.02 19.74 12.02 17C12.02 14.26 14.26 12.02 17 12.02C19.74 12.02 21.98 14.26 21.98 17ZM19.99 16.5H17.49V14H16.49V16.5H13.99V17.5H16.49V20H17.49V17.5H19.99V16.5ZM16.27 7.26001C16.27 4.92001 14.36 3.01001 12.02 3.01001C9.68 3.01001 7.77 4.92001 7.77 7.26001C7.77 9.60001 9.68 11.51 12.02 11.51C14.36 11.51 16.27 9.60001 16.27 7.26001ZM14.77 7.26001C14.77 8.78001 13.54 10.01 12.02 10.01C10.5 10.01 9.27 8.78001 9.27 7.26001C9.27 5.74001 10.5 4.51001 12.02 4.51001C13.54 4.51001 14.77 5.74001 14.77 7.26001Z"/>',
  "person-cancel-fill": '<path d="M16.02 6.98999C16.02 9.19999 14.23 10.99 12.02 10.99C9.81 10.99 8.02 9.19999 8.02 6.98999C8.02 4.77999 9.81 2.98999 12.02 2.98999C14.23 2.98999 16.02 4.77999 16.02 6.98999ZM10.51 17C10.51 15.14 11.3 13.46 12.56 12.28C12.38 12.27 12.2 12.25 12.02 12.25C7.14 12.25 3.02 15.95 3.02 20.32C3.02 20.73 3.36 21.07 3.77 21.07H11.96C11.06 19.96 10.51 18.54 10.51 17ZM21.98 17C21.98 19.75 19.74 21.98 17 21.98C14.26 21.98 12.02 19.74 12.02 17C12.02 14.26 14.26 12.02 17 12.02C19.74 12.02 21.98 14.26 21.98 17ZM19.12 16.5H14.87V17.5H19.12V16.5Z"/>',
  "person-fill": '<path d="M21.03 19.785C21.03 20.195 20.69 20.535 20.28 20.535H3.78001C3.37001 20.535 3.03001 20.195 3.03001 19.785C3.03001 15.415 7.15001 11.715 12.03 11.715C16.91 11.715 21.03 15.415 21.03 19.785ZM12.03 10.975C14.37 10.975 16.28 9.06498 16.28 6.72498C16.28 4.38498 14.37 2.47498 12.03 2.47498C9.69001 2.47498 7.78001 4.38498 7.78001 6.72498C7.78001 9.06498 9.69001 10.975 12.03 10.975Z"/>',
  "person-gear": '<path d="M12.02 10.99C9.81 10.99 8.02 9.19999 8.02 6.98999C8.02 4.77999 9.81 2.98999 12.02 2.98999C14.23 2.98999 16.02 4.77999 16.02 6.98999C16.02 9.19999 14.23 10.99 12.02 10.99ZM12.02 4.48999C10.64 4.48999 9.52 5.60999 9.52 6.98999C9.52 8.36999 10.64 9.48999 12.02 9.48999C13.4 9.48999 14.52 8.36999 14.52 6.98999C14.52 5.60999 13.4 4.48999 12.02 4.48999ZM11.17 19.57H4.58C5.01 16.42 8.12 13.87 11.79 13.76L12.15 13.14C12.36 12.78 12.67 12.5 13.03 12.3C12.7 12.27 12.37 12.24 12.03 12.24C7.15 12.24 3.03 15.94 3.03 20.31C3.03 20.72 3.37 21.06 3.78 21.06H12.05L11.17 19.56V19.57ZM21.91 18.74C22 18.58 22.03 18.39 21.98 18.21C21.93 18.03 21.82 17.88 21.65 17.78L21.12 17.48C21.12 17.48 21.12 17.48 21.12 17.47C21.12 17.38 21.13 17.29 21.13 17.2C21.13 17.11 21.13 17.01 21.12 16.91L21.65 16.61C21.73 16.56 21.8 16.5 21.86 16.43C21.92 16.36 21.96 16.27 21.98 16.18C22.03 16 22 15.81 21.91 15.65L20.89 13.9C20.8 13.74 20.64 13.62 20.46 13.58C20.39 13.56 20.32 13.56 20.25 13.57C20.14 13.57 20.03 13.6 19.94 13.65L19.4 13.96C19.25 13.86 19.09 13.77 18.93 13.69V13.03C18.93 12.64 18.61 12.33 18.23 12.33H16.19C15.9 12.33 15.65 12.51 15.54 12.76C15.5 12.84 15.48 12.94 15.48 13.03V13.65C15.29 13.74 15.11 13.84 14.94 13.96L14.4 13.65C14.3 13.6 14.2 13.57 14.09 13.57C14.02 13.57 13.94 13.57 13.87 13.58C13.78 13.6 13.7 13.65 13.62 13.7C13.55 13.75 13.49 13.82 13.44 13.9L12.8 15L12.42 15.64C12.42 15.64 12.41 15.68 12.4 15.71C12.33 15.86 12.31 16.02 12.35 16.17C12.4 16.35 12.52 16.5 12.68 16.6L13.21 16.9C13.21 16.9 13.21 16.9 13.21 16.91C13.21 17.01 13.2 17.1 13.2 17.19C13.2 17.28 13.2 17.37 13.21 17.47L12.68 17.77C12.52 17.86 12.4 18.02 12.35 18.2C12.33 18.29 12.32 18.38 12.33 18.47C12.34 18.56 12.37 18.65 12.42 18.73L13.44 20.47C13.53 20.63 13.69 20.75 13.87 20.8C13.94 20.82 14.01 20.82 14.08 20.81C14.19 20.81 14.29 20.78 14.39 20.73L14.92 20.43C15.1 20.55 15.28 20.65 15.47 20.74V21.29C15.47 21.48 15.55 21.66 15.68 21.78C15.81 21.91 15.98 21.99 16.18 21.99H18.22C18.35 21.99 18.46 21.95 18.57 21.89C18.78 21.77 18.93 21.55 18.93 21.29V20.7C19.03 20.65 19.12 20.59 19.22 20.53C19.28 20.49 19.34 20.46 19.4 20.42L19.93 20.72C20.02 20.77 20.12 20.8 20.23 20.8C20.3 20.8 20.37 20.8 20.46 20.79C20.64 20.74 20.79 20.63 20.89 20.47L21.91 18.73V18.74ZM18.37 17.98C18.32 18.06 18.26 18.13 18.19 18.2C18.08 18.31 17.95 18.39 17.82 18.46C17.71 18.52 17.59 18.57 17.46 18.59C17.37 18.61 17.27 18.62 17.17 18.62C16.37 18.62 15.72 17.97 15.72 17.17C15.72 16.69 15.96 16.26 16.32 15.99C16.56 15.82 16.85 15.71 17.17 15.71C17.57 15.71 17.93 15.87 18.2 16.14C18.27 16.21 18.33 16.28 18.38 16.36C18.48 16.51 18.56 16.69 18.6 16.88C18.62 16.97 18.63 17.07 18.63 17.17C18.63 17.47 18.54 17.75 18.38 17.98H18.37Z"/>',
  plus: '<path d="M21 11.25H12.75V3H11.25V11.25H3V12.75H11.25V21H12.75V12.75H21V11.25Z"/>',
  "plus-circle": '<path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20.5C7.31 20.5 3.5 16.69 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 16.69 16.69 20.5 12 20.5ZM12.75 11.25H17V12.75H12.75V17H11.25V12.75H7V11.25H11.25V7H12.75V11.25Z"/>',
  "plus-circle-fill": '<path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM17 12.75H7V11.25H17V12.75Z"/>',
  "plus-small": '<path d="M17 11.3H12.8V7H11.3V11.3H7V12.8H11.3V17H12.8V12.8H17V11.3Z"/>',
  "question-circle": '<path d="M12 22C6.49 22 2 17.51 2 12C2 6.49 6.49 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22ZM12 3.5C7.31 3.5 3.5 7.31 3.5 12C3.5 16.69 7.31 20.5 12 20.5C16.69 20.5 20.5 16.69 20.5 12C20.5 7.31 16.69 3.5 12 3.5ZM11.1 17.58H12.76V15.86H11.1V17.58ZM14.37 7.23C13.8 6.69 13.03 6.42 12.08 6.42C11.06 6.42 10.24 6.74 9.65 7.37C9.06 7.99 8.77 8.83 8.77 9.85V10H10.28V9.86C10.31 9.29 10.4 8.86 10.55 8.56C10.82 8.04 11.31 7.79 12.03 7.79C12.61 7.79 13.02 7.94 13.27 8.23C13.52 8.53 13.64 8.88 13.64 9.3C13.64 9.59 13.55 9.87 13.38 10.14C13.29 10.29 13.16 10.45 13 10.6L12.44 11.14C11.89 11.67 11.53 12.15 11.37 12.56C11.21 12.97 11.13 13.52 11.13 14.19V14.34H12.65V14.19C12.65 13.64 12.71 13.22 12.84 12.95C12.97 12.67 13.25 12.33 13.68 11.92C14.31 11.32 14.71 10.88 14.92 10.57C15.13 10.24 15.24 9.82 15.24 9.31C15.24 8.47 14.95 7.77 14.37 7.24V7.23Z"/>',
  report: '<path d="M16 14.76H8V13.26H16V14.76ZM13 16.26H8V17.76H13V16.26ZM20 9.74V21.25C20 21.66 19.66 22 19.25 22H4.75C4.34 22 4 21.66 4 21.25V2.75C4 2.34 4.34 2 4.75 2H13.01C13.22 2 13.43 2.09 13.57 2.25C14.35 3.13 15.46 4.37 16.59 5.63C17.78 6.96 18.99 8.31 19.81 9.24C19.93 9.38 20 9.55 20 9.74ZM15.47 6.63C14.87 5.96 14.29 5.31 13.74 4.7V9.22H17.79C17.09 8.44 16.28 7.53 15.47 6.63ZM18.5 20.5V10.73H13C12.59 10.73 12.25 10.39 12.25 9.98V3.5H5.5V20.5H18.5Z"/>',
  route: '<path d="M18.8 15.62V6.69H18.79C18.73 4.68 17.08 3.05 15.05 3.05C13.02 3.05 11.3 4.73 11.3 6.8V17.24C11.3 18.48 10.29 19.49 9.04999 19.49C7.80999 19.49 6.79999 18.48 6.79999 17.24V8.38C7.94999 8.05 8.79999 7 8.79999 5.75C8.79999 4.23 7.56999 3 6.04999 3C4.52999 3 3.29999 4.23 3.29999 5.75C3.29999 7 4.14999 8.05 5.29999 8.38V17.39H5.31999C5.39999 19.39 7.03999 20.99 9.05999 20.99C11.08 20.99 12.81 19.31 12.81 17.24V6.8C12.81 5.56 13.82 4.55 15.06 4.55C16.3 4.55 17.31 5.56 17.31 6.8V15.61C16.16 15.94 15.31 16.99 15.31 18.24C15.31 19.76 16.54 20.99 18.06 20.99C19.58 20.99 20.81 19.76 20.81 18.24C20.81 16.99 19.96 15.94 18.81 15.61L18.8 15.62ZM4.78999 5.75C4.78999 5.06 5.34999 4.5 6.03999 4.5C6.72999 4.5 7.28999 5.06 7.28999 5.75C7.28999 6.44 6.72999 7 6.03999 7C5.34999 7 4.78999 6.44 4.78999 5.75ZM18.05 19.5C17.36 19.5 16.8 18.94 16.8 18.25C16.8 17.56 17.36 17 18.05 17C18.74 17 19.3 17.56 19.3 18.25C19.3 18.94 18.74 19.5 18.05 19.5Z"/>',
  search: '<path d="M20.57 19.51L16.02 14.96C17.08 13.67 17.72 12.01 17.72 10.22C17.72 6.08 14.36 2.72 10.22 2.72C6.08 2.72 2.72 6.08 2.72 10.22C2.72 14.36 6.08 17.72 10.22 17.72C12.02 17.72 13.67 17.08 14.96 16.02L19.51 20.57L20.57 19.51ZM4.22 10.21C4.22 6.9 6.91 4.21 10.22 4.21C13.53 4.21 16.22 6.9 16.22 10.21C16.22 13.52 13.53 16.21 10.22 16.21C6.91 16.21 4.22 13.52 4.22 10.21Z"/>',
  "search-fill": '<path d="M20.92 19.51L16.35 14.94C17.36 13.63 17.97 12 17.97 10.22C17.97 5.94997 14.49 2.46997 10.22 2.46997C5.95 2.46997 2.47 5.94997 2.47 10.22C2.47 14.49 5.95 17.97 10.22 17.97C12 17.97 13.63 17.36 14.94 16.35L19.51 20.92L20.92 19.51ZM4.47 10.21C4.47 7.03997 7.05 4.45997 10.22 4.45997C13.39 4.45997 15.97 7.03997 15.97 10.21C15.97 13.38 13.39 15.96 10.22 15.96C7.05 15.96 4.47 13.38 4.47 10.21Z"/>',
  share: '<path d="M20 9.27V21.27C20 21.68 19.66 22.02 19.25 22.02H4.75C4.34 22.02 4 21.68 4 21.27V9.27C4 8.86 4.34 8.52 4.75 8.52H8.24V10.02H5.5V20.52H18.5V10.02H15.75V8.52H19.25C19.66 8.52 20 8.86 20 9.27ZM16 6L12 2L8 6L9.06 7.06L11.25 4.87V14.99H12.74V4.87L14.94 7.06L16 6Z"/>',
  "side-left": '<path d="M21.25 4.02H2.75C2.34 4.02 2 4.36 2 4.77V19.27C2 19.68 2.34 20.02 2.75 20.02H21.25C21.66 20.02 22 19.68 22 19.27V4.77C22 4.36 21.66 4.02 21.25 4.02ZM3.5 5.52H6.25V18.52H3.5V5.52ZM20.5 18.52H7.75V5.52H20.5V18.52Z"/>',
  "side-right": '<path d="M21.25 3.98001H2.75C2.34 3.98001 2 4.32001 2 4.73001V19.23C2 19.64 2.34 19.98 2.75 19.98H21.25C21.66 19.98 22 19.64 22 19.23V4.73001C22 4.32001 21.66 3.98001 21.25 3.98001ZM3.5 5.48001H16.25V18.48H3.5V5.48001ZM20.5 18.48H17.75V5.48001H20.5V18.48Z"/>',
  "stop-fill": '<path d="M18 5.25H6C5.58579 5.25 5.25 5.58579 5.25 6V18C5.25 18.4142 5.58579 18.75 6 18.75H18C18.4142 18.75 18.75 18.4142 18.75 18V6C18.75 5.58579 18.4142 5.25 18 5.25Z"/>',
  success: '<path d="M12.01 22.02C6.5 22.02 2.01 17.53 2.01 12.02C2.01 6.51002 6.49 2.02002 12.01 2.02002C17.53 2.02002 22.01 6.51002 22.01 12.02C22.01 17.53 17.52 22.02 12.01 22.02ZM12.01 3.52002C7.32 3.52002 3.51 7.34002 3.51 12.02C3.51 16.7 7.32 20.52 12.01 20.52C16.7 20.52 20.51 16.71 20.51 12.02C20.51 7.33002 16.69 3.52002 12.01 3.52002ZM16.78 9.56002L15.72 8.50002L10.82 13.38L8.27 10.84L7.21 11.9L10.82 15.5L16.78 9.56002Z"/>',
  "success-fill": '<path d="M12 2.02002C6.49 2.02002 2 6.51002 2 12.02C2 17.53 6.49 22.02 12 22.02C17.51 22.02 22 17.53 22 12.02C22 6.51002 17.52 2.02002 12 2.02002ZM10.83 15.5L7.22 11.9L8.28 10.84L10.83 13.38L15.73 8.50002L16.79 9.56002L10.83 15.5Z"/><path d="M10.83 15.5L7.22 11.9L8.28 10.84L10.83 13.38L15.72 8.5L16.78 9.56L10.83 15.5Z" fill="white"/>',
  unlock: '<path d="M8.4 15.76C8.4 14.88 9.12 14.16 10 14.16C10.88 14.16 11.6 14.88 11.6 15.76C11.6 16.64 10.88 17.36 10 17.36C9.12 17.36 8.4 16.64 8.4 15.76ZM23.52 7.57001V9.01001H22.02V7.57001C22.02 5.64001 20.45 4.07001 18.52 4.07001C16.59 4.07001 15.02 5.64001 15.02 7.57001V9.51001H16.75C17.16 9.51001 17.5 9.85001 17.5 10.26V21.26C17.5 21.67 17.16 22.01 16.75 22.01H2.75C2.34 22.01 2 21.67 2 21.26V10.26C2 9.85001 2.34 9.51001 2.75 9.51001H13.52V7.57001C13.52 4.81001 15.76 2.57001 18.52 2.57001C21.28 2.57001 23.52 4.81001 23.52 7.57001ZM16 11.01H3.5V20.51H16V11.01Z"/>',
  "unlock-fill": '<path d="M18.52 2.57001C15.76 2.57001 13.52 4.81001 13.52 7.57001V9.52001H2.75C2.34 9.52001 2 9.86001 2 10.27V21.27C2 21.68 2.34 22.02 2.75 22.02H16.75C17.16 22.02 17.5 21.68 17.5 21.27V10.27C17.5 9.86001 17.16 9.52001 16.75 9.52001H15.02V7.57001C15.02 5.64001 16.59 4.07001 18.52 4.07001C20.45 4.07001 22.02 5.64001 22.02 7.57001V9.01001H23.52V7.57001C23.52 4.81001 21.28 2.57001 18.52 2.57001ZM10 17.36C9.12 17.36 8.4 16.64 8.4 15.76C8.4 14.88 9.12 14.16 10 14.16C10.88 14.16 11.6 14.88 11.6 15.76C11.6 16.64 10.88 17.36 10 17.36Z"/>',
  "warning-fill": '<path d="M19.9175 16.385L10.6575 0.345C10.3875 -0.115 9.6275 -0.115 9.3575 0.345L0.0975 16.385C-0.0325 16.615 -0.0325 16.905 0.0975 17.135C0.2275 17.365 0.4775 17.515 0.7475 17.515H19.2675C19.5375 17.515 19.7875 17.375 19.9175 17.135C20.0475 16.905 20.0475 16.615 19.9175 16.385ZM9.2475 5.685H10.7475V11.685H9.2475V5.685ZM10.8275 14.885H9.1675V13.165H10.8275V14.885Z"/>'
};
var n5 = Object.defineProperty, l5 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && n5(t, i, o), o;
};
const a5 = {
  ...J,
  "minus-cycle": J["minus-circle"],
  "minus-cycle-fill": J["minus-circle-fill"],
  "plus-cycle": J["plus-circle"],
  "plus-cycle-fill": J["plus-circle-fill"],
  question: J["question-circle"],
  followlist: J["follow-list"],
  "followlist-fill": J["follow-list-fill"]
}, c5 = [
  "minus-cycle",
  "minus-cycle-fill",
  "plus-cycle",
  "plus-cycle-fill",
  "question",
  "followlist",
  "followlist-fill"
], d5 = [...s5, ...c5];
function Y9(e) {
  return d5.includes(e);
}
const r9 = class r9 extends V {
  constructor() {
    super(...arguments), this.type = "";
  }
  render() {
    return Y9(this.type) ? g`<svg
        class="icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        ${G9(a5[this.type])}
      </svg>` : g``;
  }
};
r9.styles = x(M(r5));
let F1 = r9;
l5([
  c({ type: String, reflect: !0 })
], F1.prototype, "type");
class C5 extends F1 {
}
customElements.get("mi-icon") || customElements.define("mi-icon", F1);
customElements.get("sp-icon") || customElements.define("sp-icon", C5);
const h5 = P`
  :host {
    display: inline-block;
    --palette-plum: #910091;
    --palette-violet: #3e31d5;
    --palette-blue: #214dde;
    --palette-viridian: #0d8282;
    --palette-green: #008744;
    --palette-brown: #ae6022;
    --palette-red: #d30030;
  }

  .base {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    background-color: rgb(0 0 0 / 5%);
    color: rgb(0 0 0 / 84%);
    font-weight: var(--font-weight-bold);
    position: relative;
  }

  .inactive {
    filter: grayscale(100%);
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .initials {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: rgb(0 0 0 / 84%);
  }

  mi-icon,
  sp-icon {
    fill: currentcolor;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .size-small {
    width: 24px;
    height: 24px;

    .initials {
      font-size: 10px;
    }

    mi-icon,
    sp-icon {
      font-size: 15.625px; /* 20px / 1.28 */
    }
  }

  .size-medium {
    width: 32px;
    height: 32px;

    .initials {
      font-size: 12px;
    }

    mi-icon,
    sp-icon {
      font-size: 18.75px; /* 24px / 1.28 */
    }
  }

  .size-large {
    width: 40px;
    height: 40px;

    .initials {
      font-size: 14px;
    }

    mi-icon,
    sp-icon {
      font-size: 25px; /* 32px / 1.28 */
    }
  }

  .size-x-large {
    width: 80px;
    height: 80px;

    .initials {
      font-size: 32px;
    }

    mi-icon,
    sp-icon {
      font-size: 50px; /* 64px / 1.28 */
    }
  }

  .size-2x-large {
    width: 96px;
    height: 96px;

    .initials {
      font-size: 40px;
    }

    mi-icon,
    sp-icon {
      font-size: 62.5px; /* 80px / 1.28 */
    }
  }

  /* カラーバリエーション */
  .color-plum {
    background-color: var(--palette-plum);
    color: #fff;
  }

  .color-violet {
    background-color: var(--palette-violet);
    color: #fff;
  }

  .color-blue {
    background-color: var(--palette-blue);
    color: #fff;
  }

  .color-viridian {
    background-color: var(--palette-viridian);
    color: #fff;
  }

  .color-green {
    background-color: var(--palette-green);
    color: #fff;
  }

  .color-brown {
    background-color: var(--palette-brown);
    color: #fff;
  }

  .color-red {
    background-color: var(--palette-red);
    color: #fff;
  }

  [class*="color-"] {
    &.inactive {
      background-color: #ededed;
      color: rgb(0 0 0 / 35%);
    }
  }
`;
var p5 = Object.defineProperty, k1 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && p5(t, i, o), o;
};
const f5 = ["small", "medium", "large", "x-large", "2x-large"], u5 = [
  "plum",
  "violet",
  "blue",
  "viridian",
  "green",
  "brown",
  "red"
];
function g5(e) {
  return f5.some((t) => t === e) ? e : (console.warn(`${e}は無効なsize属性です。`), "medium");
}
function m5(e) {
  return u5.some((t) => t === e);
}
var G, X9, J9, B2;
const s9 = class s9 extends V {
  constructor() {
    super(...arguments);
    S(this, G);
    this.src = "", this.alt = "", this.initials = "", this.size = "medium", this.color = "", this.inactive = !1;
  }
  render() {
    const i = E(this, G, B2);
    return g`
      <div class="${E(this, G, X9)}">
        ${this.src ? g`
              <img
                src="${this.src}"
                alt="${this.alt}"
                @error="${z(this, G, J9)}"
                class="image"
              />
            ` : i ? g`<div class="initials">${i}</div>` : g`<div class="icon"><mi-icon type="person"></mi-icon></div>`}
      </div>
    `;
  }
};
G = new WeakSet(), X9 = function() {
  const i = ["base", `size-${g5(this.size)}`];
  return !this.src && E(this, G, B2) && this.color && m5(this.color) && i.push(`color-${this.color}`), this.inactive && i.push("inactive"), i.filter(Boolean).join(" ");
}, J9 = function() {
  this.src = "";
}, B2 = function() {
  return (this.initials || this.textContent || "").trim().slice(0, 2).toUpperCase();
}, s9.styles = x(h5);
let R = s9;
k1([
  c({ type: String })
], R.prototype, "src");
k1([
  c({ type: String })
], R.prototype, "alt");
k1([
  c({ type: String })
], R.prototype, "initials");
k1([
  c({ type: String })
], R.prototype, "size");
k1([
  c({ type: String })
], R.prototype, "color");
k1([
  c({ type: Boolean })
], R.prototype, "inactive");
class b5 extends R {
}
customElements.get("mi-avatar") || customElements.define("mi-avatar", R);
customElements.get("sp-avatar") || customElements.define("sp-avatar", b5);
const H5 = ":host{--size-medium: 12.5px;--size-large: 15px;--size-x-large: 17.5px;--size-2x-large: 20px;--size-3x-large: 26px;--size-4x-large: 40px;--padding-medium: 1.25px;--padding-large: 1.5px;--padding-x-large: 2px 2px 1.5px 1.5px;--padding-2x-large: 2px;--padding-3x-large: 3px;--padding-4x-large: 4px;--border-size-ratio: 1/10;--ui-semantic-object-regular-default: rgb(0 0 0 / 84%);--neutral-neutral-20-alpha: rgb(0 0 0 / 7%);--background-normal: linear-gradient(white, white) padding-box padding-box,conic-gradient(var(--ui-semantic-object-regular-default) 0deg 270deg, var(--neutral-neutral-20-alpha) 270deg 360deg) border-box border-box;--background-ai: linear-gradient(white, white) padding-box padding-box,conic-gradient(#2A2AF7 5%, #2A2AF7 22%, #47D4FF 30%, #FF2ED5 73%, #F72A48 80%, #F72A48 84%, #2A2AF7 100%) border-box border-box;display:inline-flex;flex-shrink:0}.base{display:flex}.base:has(.size-medium){padding:var(--padding-medium)}.base:has(.size-large){padding:var(--padding-large)}.base:has(.size-x-large){padding:var(--padding-x-large)}.base:has(.size-2x-large){padding:var(--padding-2x-large)}.base:has(.size-3x-large){padding:var(--padding-3x-large)}.base:has(.size-4x-large){padding:var(--padding-4x-large)}.size-medium{--size: var(--size-medium)}.size-large{--size: var(--size-large)}.size-x-large{--size: var(--size-x-large)}.size-2x-large{--size: var(--size-2x-large)}.size-3x-large{--size: var(--size-3x-large)}.size-4x-large{--size: var(--size-4x-large)}.loading{display:inline-block;animation:spin 1s linear infinite;border-radius:50%;width:var(--size);height:var(--size);border:calc(var(--size) * var(--border-size-ratio)) solid transparent;-webkit-mask-image:radial-gradient(circle closest-side,transparent 80%,black 80%);mask-image:radial-gradient(circle closest-side,transparent 80%,black 80%)}.variant-ai{background:var(--background-ai)}.variant-normal{background:var(--background-normal)}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}";
var L5 = Object.defineProperty, K9 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && L5(t, i, o), o;
};
const n9 = class n9 extends V {
  constructor() {
    super(...arguments), this.ai = !1, this.size = "medium";
  }
  get loadingClasses() {
    const t = {
      medium: "size-medium",
      large: "size-large",
      xLarge: "size-x-large",
      "2xLarge": "size-2x-large",
      "3xLarge": "size-3x-large",
      "4xLarge": "size-4x-large"
    };
    return [
      "loading",
      this.ai ? "variant-ai" : "variant-normal",
      t[this.size]
    ].filter(Boolean).join(" ");
  }
  render() {
    return g`
      <span class="base">
        <span class="${this.loadingClasses}" role="status"></span>
      </span>
    `;
  }
};
n9.styles = x(M(H5));
let v1 = n9;
K9([
  c({ type: Boolean })
], v1.prototype, "ai");
K9([
  c({ type: String })
], v1.prototype, "size");
class V5 extends v1 {
}
customElements.get("mi-loading") || customElements.define("mi-loading", v1);
customElements.get("sp-loading") || customElements.define("sp-loading", V5);
const v5 = P`
  :host {
    display: inline-block;
  }

  .normal {
    &.primary {
      --border-color: transparent;
      --background-color: rgb(0 0 0 / 84%);
      --background-color-hover: rgb(0 0 0 / 90%);
      --background-color-active: #000;
      --color: #fff;
    }

    &.secondary {
      --border-color: rgb(0 0 0 / 84%);
      --background-color: transparent;
      --background-color-hover: rgb(0 0 0 / 4%);
      --background-color-active: rgb(0 0 0 / 7%);
      --color: rgb(0 0 0 / 84%);

      &.selected {
        --border-color: #3f69f2;
        --background-color: #e8edff;
        --background-color-hover: #dbe4ff;
        --background-color-active: #d5dfff;
        --color: #315ce8;
      }
    }

    &.tertiary {
      --border-color: rgb(0 0 0 / 29%);
      --background-color: transparent;
      --background-color-hover: rgb(0 0 0 / 4%);
      --background-color-active: rgb(0 0 0 / 7%);
      --color: rgb(0 0 0 / 84%);

      &.selected {
        --border-color: rgb(0 0 0 / 20%);
        --background-color: #e8edff;
        --background-color-hover: #dbe4ff;
        --background-color-active: #d5dfff;
      }
    }

    &.ghost {
      --border-color: transparent;
      --background-color: transparent;
      --background-color-hover: rgb(0 0 0 / 4%);
      --background-color-active: rgb(0 0 0 / 7%);
      --color: rgb(0 0 0 / 84%);

      &.selected {
        --background-color: #e8edff;
        --background-color-hover: #dbe4ff;
        --background-color-active: #d5dfff;
      }
    }

    &.plane {
      --border-color: transparent;
      --background-color: transparent;
      --background-color-hover: rgb(49 92 232 / 8%);
      --background-color-active: rgb(49 92 232 / 12%);
      --color: #315ce8;

      &:focus-visible {
        box-shadow:
          0 0 0 2px #fff,
          0 0 0 4px #191919;
        outline: none;
      }

      &.medium {
        padding-inline: 4px;
        padding-block: 0;
        min-height: auto;
      }

      &.large {
        padding-inline: 4px;
        min-height: auto;
      }

      &.x-large {
        padding-inline: 4px;
        min-height: auto;
      }
    }
  }

  .danger {
    &.primary {
      --border-color: transparent;
      --background-color: #db351f;
      --background-color-hover: #c92812;
      --background-color-active: #b02412;
      --color: #fff;
    }

    &.secondary {
      --border-color: #db351f;
      --background-color: transparent;
      --background-color-hover: #fff4f2;
      --background-color-active: #ffedeb;
      --color: #c92812;
    }

    &.tertiary {
      --border-color: #db351f;
      --background-color: transparent;
      --background-color-hover: #fff4f2;
      --background-color-active: #ffedeb;
      --color: #c92812;
    }

    &.ghost {
      --border-color: transparent;
      --background-color: transparent;
      --background-color-hover: #fff4f2;
      --background-color-active: #ffedeb;
      --color: #c92812;
    }

    /* .selected は danger テーマでは非サポート */
  }

  .ai {
    &.primary {
      --angle: 0deg;

      border: 1px solid transparent;
      background:
        linear-gradient(white, white) padding-box padding-box,
        conic-gradient(
            from var(--angle) at 50% 50%,
            #2a2af7 5%,
            #2a2af7 22%,
            #47d4ff 30%,
            #ff2ed5 73%,
            #f72a48 80%,
            #f72a48 84%,
            #2a2af7 100%
          )
          border-box border-box white;
      transition: --angle 0.5s;

      &:hover {
        --angle: 360deg;
      }

      &:disabled {
        border: 1px solid rgb(0 0 0 / 7%);
        background: transparent;
        color: rgb(0 0 0 / 35%);
        cursor: not-allowed;

        &:hover {
          border: 1px solid rgb(0 0 0 / 7%);
          background: transparent;
        }

        &.loading {
          border: 1px solid transparent;
          background:
            linear-gradient(white, white) padding-box padding-box,
            conic-gradient(
                from var(--angle) at 50% 50%,
                #2a2af7 5%,
                #2a2af7 22%,
                #47d4ff 30%,
                #ff2ed5 73%,
                #f72a48 80%,
                #f72a48 84%,
                #2a2af7 100%
              )
              border-box border-box white;
        }
      }
    }

    &.secondary {
      --border-color: rgb(0 0 0 / 84%);
      --background-color: transparent;
      --background-color-hover: rgb(0 0 0 / 4%);
      --background-color-active: rgb(0 0 0 / 7%);
      --color: rgb(0 0 0 / 84%);
    }

    &.tertiary {
      --border-color: #7c3aed;
      --background-color: transparent;
      --background-color-hover: #ede9fe;
      --background-color-active: #ddd6fe;
      --color: #6d28d9;
    }

    &.ghost {
      --border-color: transparent;
      --background-color: transparent;
      --background-color-hover: #ede9fe;
      --background-color-active: #ddd6fe;
      --color: #6d28d9;
    }

    /* .selected は ai テーマでは非サポート */
  }

  .primary {
    --border-color-disabled: transparent;
    --background-color-disabled: rgb(0 0 0 / 5%);
    --color-disabled: rgb(0 0 0 / 35%);
  }

  :is(.secondary, .tertiary) {
    --border-color-disabled: rgb(0 0 0 / 10%);
    --background-color-disabled: transparent;
    --color-disabled: rgb(0 0 0 / 35%);
  }

  .ghost {
    --border-color-disabled: transparent;
    --background-color-disabled: transparent;
    --color-disabled: rgb(0 0 0 / 35%);
  }

  .plane {
    --border-color-disabled: transparent;
    --background-color-disabled: transparent;
    --color-disabled: rgb(0 0 0 / 35%);
  }

  .base {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    width: 100%;
    flex-basis: 100%;
    padding-block: 2px;
    border: 1px solid var(--border-color);
    border-radius: 9999px;
    background-color: var(--background-color);
    color: var(--color);
    position: relative;
    cursor: pointer;

    &:focus-visible {
      box-shadow:
        0 0 0 2px #fff,
        0 0 0 4px #191919;
      outline: none;
    }

    &:hover {
      background-color: var(--background-color-hover);
    }

    &:active {
      background-color: var(--background-color-active);
    }

    &:disabled {
      border-color: var(--border-color-disabled);
      background-color: var(--background-color-disabled);
      color: var(--color-disabled);
      cursor: not-allowed;

      &:hover {
        border-color: var(--border-color-disabled);
        background-color: var(--background-color-disabled);
      }

      &.loading {
        color: rgb(0 0 0 / 84%);
      }
    }
  }

  .medium {
    min-height: 32px;
    padding-inline: 12px;
    font-size: 12px;
  }

  .large {
    min-height: 40px;
    padding-inline: 16px;
    font-size: 14px;
  }

  .x-large {
    min-height: 48px;
    padding-inline: 16px;
    font-size: 16px;
  }

  .icon {
    fill: currentcolor;
  }

  .text {
    line-height: 1.5;
    letter-spacing: 0.02em;

    &:is(.primary *, .secondary *) {
      font-weight: var(--font-weight-bold);
    }
  }
`;
var y5 = Object.defineProperty, I = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && y5(t, i, o), o;
};
const J2 = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "plane"
], D2 = ["medium", "large", "xLarge"];
function Q9(e) {
  return J2.some((t) => t === e);
}
function E9(e) {
  return D2.some((t) => t === e);
}
function x5(e) {
  return Y9(e) ? !0 : (console.warn(`${e}は無効なicon-type属性です。`), !1);
}
var W;
const C2 = class C2 extends V {
  constructor() {
    super();
    S(this, W);
    this.loading = !1, this.disabled = !1, this.selected = !1, this.toggle = !1, this.variant = "primary", this.size = "medium", this.name = "", this.value = "", this.type = "button", this.iconType = "", J1(this, W, this.attachInternals());
  }
  /** 継承クラスでオーバーライド可能。テーマ（normal / danger / ai） */
  getTheme() {
    return "normal";
  }
  /** 継承クラスでオーバーライド可能（例: 非推奨の variants 属性の反映） */
  getEffectiveVariant() {
    const i = Q9(this.variant);
    return i || console.warn(`${this.variant}は無効なvariant属性です。`), i ? this.variant : J2[0];
  }
  get buttonClasses() {
    const i = {
      medium: "medium",
      large: "large",
      xLarge: "x-large"
    }, r = E9(this.size);
    r || console.warn(`${this.size}は無効なsize属性です。`);
    const o = r ? this.size : D2[0];
    return [
      "base",
      this.getTheme(),
      this.getEffectiveVariant(),
      i[o],
      this.loading ? "loading" : "",
      this.selected ? "selected" : ""
    ].filter(Boolean).join(" ");
  }
  get isDisabled() {
    return this.disabled || this.loading;
  }
  get loadingSize() {
    const i = {
      medium: "large",
      large: "xLarge",
      xLarge: "2xLarge"
    }, o = E9(this.size) ? this.size : D2[0];
    return i[o];
  }
  renderLoading() {
    return g`<mi-loading size="${this.loadingSize}"></mi-loading>`;
  }
  get showIcon() {
    return !this.loading && this.iconType && x5(this.iconType);
  }
  renderIcon() {
    return g`<mi-icon type="${this.iconType}" class="icon"></mi-icon>`;
  }
  /** スロットのレンダリング。テキストを持たないボタン（mi-icon-button）はオーバーライドして nothing を返す。 */
  renderSlot() {
    return g`<slot class="text"></slot>`;
  }
  render() {
    return g`
      <button
        class="${this.buttonClasses}"
        ?disabled="${this.isDisabled}"
        name="${this.name || m}"
        value="${this.value || m}"
        type="${this.type}"
        aria-pressed="${this.toggle ? this.selected ? "true" : "false" : m}"
        aria-busy="${this.loading ? "true" : m}"
        @click="${this.handleClick}"
      >
        ${this.loading ? this.renderLoading() : m}
        ${this.showIcon ? this.renderIcon() : m} ${this.renderSlot()}
      </button>
    `;
  }
  handleClick(i) {
    if (i.stopPropagation(), !(this.loading || !this.dispatchEvent(new MouseEvent("click", i)) || !E(this, W).form))
      if (this.type === "submit")
        if (i.preventDefault(), this.name) {
          const o = document.createElement("input");
          o.type = "hidden", o.name = this.name, o.value = this.value, E(this, W).form.appendChild(o), E(this, W).form.requestSubmit(), o.remove();
        } else
          E(this, W).form.requestSubmit();
      else this.type === "reset" && E(this, W).form.reset();
  }
};
W = new WeakMap(), C2.styles = x(v5), C2.formAssociated = !0;
let Z = C2;
I([
  c({ type: Boolean, reflect: !0 })
], Z.prototype, "loading");
I([
  c({ type: Boolean, reflect: !0 })
], Z.prototype, "disabled");
I([
  c({ type: Boolean, reflect: !0 })
], Z.prototype, "selected");
I([
  c({ type: Boolean, reflect: !0 })
], Z.prototype, "toggle");
I([
  c({ type: String, reflect: !0 })
], Z.prototype, "variant");
I([
  c({ type: String, reflect: !0 })
], Z.prototype, "size");
I([
  c({ type: String })
], Z.prototype, "name");
I([
  c({ type: String })
], Z.prototype, "value");
I([
  c({ type: String })
], Z.prototype, "type");
I([
  c({ type: String, attribute: "icon-type" })
], Z.prototype, "iconType");
var w5 = Object.defineProperty, t0 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && w5(t, i, o), o;
};
try {
  CSS.registerProperty({
    name: "--angle",
    syntax: "<angle>",
    initialValue: "0deg",
    inherits: !1
  });
} catch {
}
class K2 extends Z {
  constructor() {
    super(...arguments), this.variant = "primary", this.iconType = "";
  }
  getTheme() {
    return "ai";
  }
  get showIcon() {
    return !this.loading;
  }
  renderIcon() {
    return g`<mi-icon type="magic-fill" class="icon"></mi-icon>`;
  }
  renderLoading() {
    return g`<mi-loading
      size="${this.loadingSize}"
      ?ai="${this.variant === "primary"}"
    ></mi-loading>`;
  }
}
t0([
  c({ type: String })
], K2.prototype, "variant");
t0([
  c({ attribute: !1 })
], K2.prototype, "iconType");
customElements.get("mi-ai-button") || customElements.define("mi-ai-button", K2);
var M5 = Object.defineProperty, Z5 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && M5(t, i, o), o;
};
class e0 extends Z {
  constructor() {
    super(...arguments), this.variant = "primary";
  }
  getTheme() {
    return "danger";
  }
}
Z5([
  c({ type: String })
], e0.prototype, "variant");
customElements.get("mi-danger-button") || customElements.define("mi-danger-button", e0);
const o2 = Math.min, c1 = Math.max, r2 = Math.round, K1 = Math.floor, D = (e) => ({
  x: e,
  y: e
}), $5 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, k5 = {
  start: "end",
  end: "start"
};
function S9(e, t, i) {
  return c1(e, o2(t, i));
}
function x2(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function C1(e) {
  return e.split("-")[0];
}
function w2(e) {
  return e.split("-")[1];
}
function i0(e) {
  return e === "x" ? "y" : "x";
}
function o0(e) {
  return e === "y" ? "height" : "width";
}
const _5 = /* @__PURE__ */ new Set(["top", "bottom"]);
function Q(e) {
  return _5.has(C1(e)) ? "y" : "x";
}
function r0(e) {
  return i0(Q(e));
}
function A5(e, t, i) {
  i === void 0 && (i = !1);
  const r = w2(e), o = r0(e), s = o0(o);
  let n = o === "x" ? r === (i ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (n = s2(n)), [n, s2(n)];
}
function E5(e) {
  const t = s2(e);
  return [R2(e), t, R2(t)];
}
function R2(e) {
  return e.replace(/start|end/g, (t) => k5[t]);
}
const z9 = ["left", "right"], P9 = ["right", "left"], S5 = ["top", "bottom"], z5 = ["bottom", "top"];
function P5(e, t, i) {
  switch (e) {
    case "top":
    case "bottom":
      return i ? t ? P9 : z9 : t ? z9 : P9;
    case "left":
    case "right":
      return t ? S5 : z5;
    default:
      return [];
  }
}
function O5(e, t, i, r) {
  const o = w2(e);
  let s = P5(C1(e), i === "start", r);
  return o && (s = s.map((n) => n + "-" + o), t && (s = s.concat(s.map(R2)))), s;
}
function s2(e) {
  return e.replace(/left|right|bottom|top/g, (t) => $5[t]);
}
function T5(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function F5(e) {
  return typeof e != "number" ? T5(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function n2(e) {
  const {
    x: t,
    y: i,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: i,
    left: t,
    right: t + r,
    bottom: i + o,
    x: t,
    y: i
  };
}
function O9(e, t, i) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = Q(t), n = r0(t), l = o0(n), a = C1(t), d = s === "y", h = r.x + r.width / 2 - o.width / 2, C = r.y + r.height / 2 - o.height / 2, f = r[l] / 2 - o[l] / 2;
  let p;
  switch (a) {
    case "top":
      p = {
        x: h,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: h,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: C
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: C
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (w2(t)) {
    case "start":
      p[n] -= f * (i && d ? -1 : 1);
      break;
    case "end":
      p[n] += f * (i && d ? -1 : 1);
      break;
  }
  return p;
}
async function B5(e, t) {
  var i;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: s,
    rects: n,
    elements: l,
    strategy: a
  } = e, {
    boundary: d = "clippingAncestors",
    rootBoundary: h = "viewport",
    elementContext: C = "floating",
    altBoundary: f = !1,
    padding: p = 0
  } = x2(t, e), u = F5(p), L = l[f ? C === "floating" ? "reference" : "floating" : C], b = n2(await s.getClippingRect({
    element: (i = await (s.isElement == null ? void 0 : s.isElement(L))) == null || i ? L : L.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating)),
    boundary: d,
    rootBoundary: h,
    strategy: a
  })), v = C === "floating" ? {
    x: r,
    y: o,
    width: n.floating.width,
    height: n.floating.height
  } : n.reference, y = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating)), w = await (s.isElement == null ? void 0 : s.isElement(y)) ? await (s.getScale == null ? void 0 : s.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, A = n2(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: v,
    offsetParent: y,
    strategy: a
  }) : v);
  return {
    top: (b.top - A.top + u.top) / w.y,
    bottom: (A.bottom - b.bottom + u.bottom) / w.y,
    left: (b.left - A.left + u.left) / w.x,
    right: (A.right - b.right + u.right) / w.x
  };
}
const D5 = async (e, t, i) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: n
  } = i, l = s.filter(Boolean), a = await (n.isRTL == null ? void 0 : n.isRTL(t));
  let d = await n.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: h,
    y: C
  } = O9(d, r, a), f = r, p = {}, u = 0;
  for (let L = 0; L < l.length; L++) {
    var H;
    const {
      name: b,
      fn: v
    } = l[L], {
      x: y,
      y: w,
      data: A,
      reset: $
    } = await v({
      x: h,
      y: C,
      initialPlacement: r,
      placement: f,
      strategy: o,
      middlewareData: p,
      rects: d,
      platform: {
        ...n,
        detectOverflow: (H = n.detectOverflow) != null ? H : B5
      },
      elements: {
        reference: e,
        floating: t
      }
    });
    h = y ?? h, C = w ?? C, p = {
      ...p,
      [b]: {
        ...p[b],
        ...A
      }
    }, $ && u <= 50 && (u++, typeof $ == "object" && ($.placement && (f = $.placement), $.rects && (d = $.rects === !0 ? await n.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : $.rects), {
      x: h,
      y: C
    } = O9(d, f, a)), L = -1);
  }
  return {
    x: h,
    y: C,
    placement: f,
    strategy: o,
    middlewareData: p
  };
}, R5 = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var i, r;
      const {
        placement: o,
        middlewareData: s,
        rects: n,
        initialPlacement: l,
        platform: a,
        elements: d
      } = t, {
        mainAxis: h = !0,
        crossAxis: C = !0,
        fallbackPlacements: f,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: u = "none",
        flipAlignment: H = !0,
        ...L
      } = x2(e, t);
      if ((i = s.arrow) != null && i.alignmentOffset)
        return {};
      const b = C1(o), v = Q(l), y = C1(l) === l, w = await (a.isRTL == null ? void 0 : a.isRTL(d.floating)), A = f || (y || !H ? [s2(l)] : E5(l)), $ = u !== "none";
      !f && $ && A.push(...O5(l, H, u, w));
      const g1 = [l, ...A], S2 = await a.detectOverflow(t, L), X1 = [];
      let m1 = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (h && X1.push(S2[b]), C) {
        const s1 = A5(o, n, w);
        X1.push(S2[s1[0]], S2[s1[1]]);
      }
      if (m1 = [...m1, {
        placement: o,
        overflows: X1
      }], !X1.every((s1) => s1 <= 0)) {
        var m9, b9;
        const s1 = (((m9 = s.flip) == null ? void 0 : m9.index) || 0) + 1, z2 = g1[s1];
        if (z2 && (!(C === "alignment" ? v !== Q(z2) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        m1.every((O) => Q(O.placement) === v ? O.overflows[0] > 0 : !0)))
          return {
            data: {
              index: s1,
              overflows: m1
            },
            reset: {
              placement: z2
            }
          };
        let E1 = (b9 = m1.filter((n1) => n1.overflows[0] <= 0).sort((n1, O) => n1.overflows[1] - O.overflows[1])[0]) == null ? void 0 : b9.placement;
        if (!E1)
          switch (p) {
            case "bestFit": {
              var H9;
              const n1 = (H9 = m1.filter((O) => {
                if ($) {
                  const X = Q(O.placement);
                  return X === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  X === "y";
                }
                return !0;
              }).map((O) => [O.placement, O.overflows.filter((X) => X > 0).reduce((X, k0) => X + k0, 0)]).sort((O, X) => O[1] - X[1])[0]) == null ? void 0 : H9[0];
              n1 && (E1 = n1);
              break;
            }
            case "initialPlacement":
              E1 = l;
              break;
          }
        if (o !== E1)
          return {
            reset: {
              placement: E1
            }
          };
      }
      return {};
    }
  };
}, j5 = /* @__PURE__ */ new Set(["left", "top"]);
async function N5(e, t) {
  const {
    placement: i,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), n = C1(i), l = w2(i), a = Q(i) === "y", d = j5.has(n) ? -1 : 1, h = s && a ? -1 : 1, C = x2(t, e);
  let {
    mainAxis: f,
    crossAxis: p,
    alignmentAxis: u
  } = typeof C == "number" ? {
    mainAxis: C,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: C.mainAxis || 0,
    crossAxis: C.crossAxis || 0,
    alignmentAxis: C.alignmentAxis
  };
  return l && typeof u == "number" && (p = l === "end" ? u * -1 : u), a ? {
    x: p * h,
    y: f * d
  } : {
    x: f * d,
    y: p * h
  };
}
const I5 = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var i, r;
      const {
        x: o,
        y: s,
        placement: n,
        middlewareData: l
      } = t, a = await N5(t, e);
      return n === ((i = l.offset) == null ? void 0 : i.placement) && (r = l.arrow) != null && r.alignmentOffset ? {} : {
        x: o + a.x,
        y: s + a.y,
        data: {
          ...a,
          placement: n
        }
      };
    }
  };
}, U5 = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: i,
        y: r,
        placement: o,
        platform: s
      } = t, {
        mainAxis: n = !0,
        crossAxis: l = !1,
        limiter: a = {
          fn: (b) => {
            let {
              x: v,
              y
            } = b;
            return {
              x: v,
              y
            };
          }
        },
        ...d
      } = x2(e, t), h = {
        x: i,
        y: r
      }, C = await s.detectOverflow(t, d), f = Q(C1(o)), p = i0(f);
      let u = h[p], H = h[f];
      if (n) {
        const b = p === "y" ? "top" : "left", v = p === "y" ? "bottom" : "right", y = u + C[b], w = u - C[v];
        u = S9(y, u, w);
      }
      if (l) {
        const b = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", y = H + C[b], w = H - C[v];
        H = S9(y, H, w);
      }
      const L = a.fn({
        ...t,
        [p]: u,
        [f]: H
      });
      return {
        ...L,
        data: {
          x: L.x - i,
          y: L.y - r,
          enabled: {
            [p]: n,
            [f]: l
          }
        }
      };
    }
  };
};
function M2() {
  return typeof window < "u";
}
function _1(e) {
  return s0(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function k(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function U(e) {
  var t;
  return (t = (s0(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function s0(e) {
  return M2() ? e instanceof Node || e instanceof k(e).Node : !1;
}
function T(e) {
  return M2() ? e instanceof Element || e instanceof k(e).Element : !1;
}
function j(e) {
  return M2() ? e instanceof HTMLElement || e instanceof k(e).HTMLElement : !1;
}
function T9(e) {
  return !M2() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof k(e).ShadowRoot;
}
const W5 = /* @__PURE__ */ new Set(["inline", "contents"]);
function U1(e) {
  const {
    overflow: t,
    overflowX: i,
    overflowY: r,
    display: o
  } = F(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + i) && !W5.has(o);
}
const q5 = /* @__PURE__ */ new Set(["table", "td", "th"]);
function G5(e) {
  return q5.has(_1(e));
}
const Y5 = [":popover-open", ":modal"];
function Z2(e) {
  return Y5.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const X5 = ["transform", "translate", "scale", "rotate", "perspective"], J5 = ["transform", "translate", "scale", "rotate", "perspective", "filter"], K5 = ["paint", "layout", "strict", "content"];
function Q2(e) {
  const t = t9(), i = T(e) ? F(e) : e;
  return X5.some((r) => i[r] ? i[r] !== "none" : !1) || (i.containerType ? i.containerType !== "normal" : !1) || !t && (i.backdropFilter ? i.backdropFilter !== "none" : !1) || !t && (i.filter ? i.filter !== "none" : !1) || J5.some((r) => (i.willChange || "").includes(r)) || K5.some((r) => (i.contain || "").includes(r));
}
function Q5(e) {
  let t = i1(e);
  for (; j(t) && !y1(t); ) {
    if (Q2(t))
      return t;
    if (Z2(t))
      return null;
    t = i1(t);
  }
  return null;
}
function t9() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const t8 = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function y1(e) {
  return t8.has(_1(e));
}
function F(e) {
  return k(e).getComputedStyle(e);
}
function $2(e) {
  return T(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function i1(e) {
  if (_1(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    T9(e) && e.host || // Fallback.
    U(e)
  );
  return T9(t) ? t.host : t;
}
function n0(e) {
  const t = i1(e);
  return y1(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : j(t) && U1(t) ? t : n0(t);
}
function B1(e, t, i) {
  var r;
  t === void 0 && (t = []), i === void 0 && (i = !0);
  const o = n0(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), n = k(o);
  if (s) {
    const l = j2(n);
    return t.concat(n, n.visualViewport || [], U1(o) ? o : [], l && i ? B1(l) : []);
  }
  return t.concat(o, B1(o, [], i));
}
function j2(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function l0(e) {
  const t = F(e);
  let i = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = j(e), s = o ? e.offsetWidth : i, n = o ? e.offsetHeight : r, l = r2(i) !== s || r2(r) !== n;
  return l && (i = s, r = n), {
    width: i,
    height: r,
    $: l
  };
}
function e9(e) {
  return T(e) ? e : e.contextElement;
}
function H1(e) {
  const t = e9(e);
  if (!j(t))
    return D(1);
  const i = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = l0(t);
  let n = (s ? r2(i.width) : i.width) / r, l = (s ? r2(i.height) : i.height) / o;
  return (!n || !Number.isFinite(n)) && (n = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: n,
    y: l
  };
}
const e8 = /* @__PURE__ */ D(0);
function a0(e) {
  const t = k(e);
  return !t9() || !t.visualViewport ? e8 : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function i8(e, t, i) {
  return t === void 0 && (t = !1), !i || t && i !== k(e) ? !1 : t;
}
function h1(e, t, i, r) {
  t === void 0 && (t = !1), i === void 0 && (i = !1);
  const o = e.getBoundingClientRect(), s = e9(e);
  let n = D(1);
  t && (r ? T(r) && (n = H1(r)) : n = H1(e));
  const l = i8(s, i, r) ? a0(s) : D(0);
  let a = (o.left + l.x) / n.x, d = (o.top + l.y) / n.y, h = o.width / n.x, C = o.height / n.y;
  if (s) {
    const f = k(s), p = r && T(r) ? k(r) : r;
    let u = f, H = j2(u);
    for (; H && r && p !== u; ) {
      const L = H1(H), b = H.getBoundingClientRect(), v = F(H), y = b.left + (H.clientLeft + parseFloat(v.paddingLeft)) * L.x, w = b.top + (H.clientTop + parseFloat(v.paddingTop)) * L.y;
      a *= L.x, d *= L.y, h *= L.x, C *= L.y, a += y, d += w, u = k(H), H = j2(u);
    }
  }
  return n2({
    width: h,
    height: C,
    x: a,
    y: d
  });
}
function k2(e, t) {
  const i = $2(e).scrollLeft;
  return t ? t.left + i : h1(U(e)).left + i;
}
function c0(e, t) {
  const i = e.getBoundingClientRect(), r = i.left + t.scrollLeft - k2(e, i), o = i.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function o8(e) {
  let {
    elements: t,
    rect: i,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", n = U(r), l = t ? Z2(t.floating) : !1;
  if (r === n || l && s)
    return i;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = D(1);
  const h = D(0), C = j(r);
  if ((C || !C && !s) && ((_1(r) !== "body" || U1(n)) && (a = $2(r)), j(r))) {
    const p = h1(r);
    d = H1(r), h.x = p.x + r.clientLeft, h.y = p.y + r.clientTop;
  }
  const f = n && !C && !s ? c0(n, a) : D(0);
  return {
    width: i.width * d.x,
    height: i.height * d.y,
    x: i.x * d.x - a.scrollLeft * d.x + h.x + f.x,
    y: i.y * d.y - a.scrollTop * d.y + h.y + f.y
  };
}
function r8(e) {
  return Array.from(e.getClientRects());
}
function s8(e) {
  const t = U(e), i = $2(e), r = e.ownerDocument.body, o = c1(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = c1(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let n = -i.scrollLeft + k2(e);
  const l = -i.scrollTop;
  return F(r).direction === "rtl" && (n += c1(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: n,
    y: l
  };
}
const F9 = 25;
function n8(e, t) {
  const i = k(e), r = U(e), o = i.visualViewport;
  let s = r.clientWidth, n = r.clientHeight, l = 0, a = 0;
  if (o) {
    s = o.width, n = o.height;
    const h = t9();
    (!h || h && t === "fixed") && (l = o.offsetLeft, a = o.offsetTop);
  }
  const d = k2(r);
  if (d <= 0) {
    const h = r.ownerDocument, C = h.body, f = getComputedStyle(C), p = h.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, u = Math.abs(r.clientWidth - C.clientWidth - p);
    u <= F9 && (s -= u);
  } else d <= F9 && (s += d);
  return {
    width: s,
    height: n,
    x: l,
    y: a
  };
}
const l8 = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function a8(e, t) {
  const i = h1(e, !0, t === "fixed"), r = i.top + e.clientTop, o = i.left + e.clientLeft, s = j(e) ? H1(e) : D(1), n = e.clientWidth * s.x, l = e.clientHeight * s.y, a = o * s.x, d = r * s.y;
  return {
    width: n,
    height: l,
    x: a,
    y: d
  };
}
function B9(e, t, i) {
  let r;
  if (t === "viewport")
    r = n8(e, i);
  else if (t === "document")
    r = s8(U(e));
  else if (T(t))
    r = a8(t, i);
  else {
    const o = a0(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return n2(r);
}
function d0(e, t) {
  const i = i1(e);
  return i === t || !T(i) || y1(i) ? !1 : F(i).position === "fixed" || d0(i, t);
}
function c8(e, t) {
  const i = t.get(e);
  if (i)
    return i;
  let r = B1(e, [], !1).filter((l) => T(l) && _1(l) !== "body"), o = null;
  const s = F(e).position === "fixed";
  let n = s ? i1(e) : e;
  for (; T(n) && !y1(n); ) {
    const l = F(n), a = Q2(n);
    !a && l.position === "fixed" && (o = null), (s ? !a && !o : !a && l.position === "static" && !!o && l8.has(o.position) || U1(n) && !a && d0(e, n)) ? r = r.filter((h) => h !== n) : o = l, n = i1(n);
  }
  return t.set(e, r), r;
}
function d8(e) {
  let {
    element: t,
    boundary: i,
    rootBoundary: r,
    strategy: o
  } = e;
  const n = [...i === "clippingAncestors" ? Z2(t) ? [] : c8(t, this._c) : [].concat(i), r], l = n[0], a = n.reduce((d, h) => {
    const C = B9(t, h, o);
    return d.top = c1(C.top, d.top), d.right = o2(C.right, d.right), d.bottom = o2(C.bottom, d.bottom), d.left = c1(C.left, d.left), d;
  }, B9(t, l, o));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function C8(e) {
  const {
    width: t,
    height: i
  } = l0(e);
  return {
    width: t,
    height: i
  };
}
function h8(e, t, i) {
  const r = j(t), o = U(t), s = i === "fixed", n = h1(e, !0, s, t);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = D(0);
  function d() {
    a.x = k2(o);
  }
  if (r || !r && !s)
    if ((_1(t) !== "body" || U1(o)) && (l = $2(t)), r) {
      const p = h1(t, !0, s, t);
      a.x = p.x + t.clientLeft, a.y = p.y + t.clientTop;
    } else o && d();
  s && !r && o && d();
  const h = o && !r && !s ? c0(o, l) : D(0), C = n.left + l.scrollLeft - a.x - h.x, f = n.top + l.scrollTop - a.y - h.y;
  return {
    x: C,
    y: f,
    width: n.width,
    height: n.height
  };
}
function T2(e) {
  return F(e).position === "static";
}
function D9(e, t) {
  if (!j(e) || F(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let i = e.offsetParent;
  return U(e) === i && (i = i.ownerDocument.body), i;
}
function C0(e, t) {
  const i = k(e);
  if (Z2(e))
    return i;
  if (!j(e)) {
    let o = i1(e);
    for (; o && !y1(o); ) {
      if (T(o) && !T2(o))
        return o;
      o = i1(o);
    }
    return i;
  }
  let r = D9(e, t);
  for (; r && G5(r) && T2(r); )
    r = D9(r, t);
  return r && y1(r) && T2(r) && !Q2(r) ? i : r || Q5(e) || i;
}
const p8 = async function(e) {
  const t = this.getOffsetParent || C0, i = this.getDimensions, r = await i(e.floating);
  return {
    reference: h8(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function f8(e) {
  return F(e).direction === "rtl";
}
const u8 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: o8,
  getDocumentElement: U,
  getClippingRect: d8,
  getOffsetParent: C0,
  getElementRects: p8,
  getClientRects: r8,
  getDimensions: C8,
  getScale: H1,
  isElement: T,
  isRTL: f8
};
function h0(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function g8(e, t) {
  let i = null, r;
  const o = U(e);
  function s() {
    var l;
    clearTimeout(r), (l = i) == null || l.disconnect(), i = null;
  }
  function n(l, a) {
    l === void 0 && (l = !1), a === void 0 && (a = 1), s();
    const d = e.getBoundingClientRect(), {
      left: h,
      top: C,
      width: f,
      height: p
    } = d;
    if (l || t(), !f || !p)
      return;
    const u = K1(C), H = K1(o.clientWidth - (h + f)), L = K1(o.clientHeight - (C + p)), b = K1(h), y = {
      rootMargin: -u + "px " + -H + "px " + -L + "px " + -b + "px",
      threshold: c1(0, o2(1, a)) || 1
    };
    let w = !0;
    function A($) {
      const g1 = $[0].intersectionRatio;
      if (g1 !== a) {
        if (!w)
          return n();
        g1 ? n(!1, g1) : r = setTimeout(() => {
          n(!1, 1e-7);
        }, 1e3);
      }
      g1 === 1 && !h0(d, e.getBoundingClientRect()) && n(), w = !1;
    }
    try {
      i = new IntersectionObserver(A, {
        ...y,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      i = new IntersectionObserver(A, y);
    }
    i.observe(e);
  }
  return n(!0), s;
}
function m8(e, t, i, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: n = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: a = !1
  } = r, d = e9(e), h = o || s ? [...d ? B1(d) : [], ...B1(t)] : [];
  h.forEach((b) => {
    o && b.addEventListener("scroll", i, {
      passive: !0
    }), s && b.addEventListener("resize", i);
  });
  const C = d && l ? g8(d, i) : null;
  let f = -1, p = null;
  n && (p = new ResizeObserver((b) => {
    let [v] = b;
    v && v.target === d && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var y;
      (y = p) == null || y.observe(t);
    })), i();
  }), d && !a && p.observe(d), p.observe(t));
  let u, H = a ? h1(e) : null;
  a && L();
  function L() {
    const b = h1(e);
    H && !h0(H, b) && i(), H = b, u = requestAnimationFrame(L);
  }
  return i(), () => {
    var b;
    h.forEach((v) => {
      o && v.removeEventListener("scroll", i), s && v.removeEventListener("resize", i);
    }), C?.(), (b = p) == null || b.disconnect(), p = null, a && cancelAnimationFrame(u);
  };
}
const b8 = I5, H8 = U5, L8 = R5, V8 = (e, t, i) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: u8,
    ...i
  }, s = {
    ...o.platform,
    _c: r
  };
  return D5(e, t, {
    ...o,
    platform: s
  });
}, v8 = P`
  :host {
    display: inline-block;
  }

  .tooltip {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    max-width: 200px;
    padding: 4px 8px;
    background-color: #282828;
    border-radius: 4px;
    box-shadow:
      0 8px 16px 0 rgb(0 0 0 / 13%),
      0 0 6px 0 rgb(0 0 0 / 10%),
      inset 0 0 1px 0 rgb(255 255 255 / 0%);
    color: #fff;
    font-size: 12px;
    letter-spacing: 0.24px;
    line-height: 1.3;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.2s ease-out;

    @starting-style {
      opacity: 0;
    }
  }
`;
var y8 = Object.defineProperty, _2 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && y8(t, i, o), o;
};
const x8 = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end"
];
function w8(e) {
  return x8.some((t) => t === e);
}
var t1;
const W1 = (t1 = class extends V {
  constructor() {
    super(...arguments), this.text = "", this.placement = "top", this._open = !1, this._pointerActive = !1, this._descId = `mi-tooltip-desc-${t1._idCounter++}`, this._onSlotChange = () => {
      this.shadowRoot?.querySelector("slot")?.assignedElements().forEach((t) => t.setAttribute("aria-describedby", this._descId));
    }, this._handleMouseEnter = () => {
      this._show();
    }, this._onPointerDown = () => {
      this._pointerActive = !0, setTimeout(() => {
        this._pointerActive = !1;
      });
    }, this._handleFocusin = () => {
      this._pointerActive || this._show();
    }, this._handleKeyDown = (t) => {
      t.key === "Escape" && this._open && (clearTimeout(this._hideTimer), this._open = !1, this._cleanup?.(), this._cleanup = void 0);
    }, this._show = async () => {
      clearTimeout(this._hideTimer), !(this._open || !this.text) && (this._open = !0, await this.updateComplete, !(!this._open || !this._tooltipEl || this._cleanup) && (this._cleanup = m8(
        this,
        this._tooltipEl,
        () => this._updatePosition()
      )));
    }, this._scheduleHide = () => {
      clearTimeout(this._hideTimer), this._hideTimer = setTimeout(() => {
        this._open = !1, this._cleanup?.(), this._cleanup = void 0;
      }, 100);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._descEl = document.createElement("span"), this._descEl.id = this._descId, this._descEl.style.cssText = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;", this._descEl.textContent = this.text, this.appendChild(this._descEl), this.addEventListener("mouseenter", this._handleMouseEnter), this.addEventListener("mouseleave", this._scheduleHide), this.addEventListener("pointerdown", this._onPointerDown), this.addEventListener("focusin", this._handleFocusin), this.addEventListener("focusout", this._scheduleHide), this.addEventListener("keydown", this._handleKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mouseenter", this._handleMouseEnter), this.removeEventListener("mouseleave", this._scheduleHide), this.removeEventListener("pointerdown", this._onPointerDown), this.removeEventListener("focusin", this._handleFocusin), this.removeEventListener("focusout", this._scheduleHide), this.removeEventListener("keydown", this._handleKeyDown), this._descEl?.remove(), this._descEl = void 0, this._cleanup?.(), clearTimeout(this._hideTimer);
  }
  updated(t) {
    super.updated(t), t.has("text") && this._descEl && (this._descEl.textContent = this.text);
  }
  async _updatePosition() {
    if (!this._tooltipEl) return;
    const t = w8(this.placement);
    t || console.warn(
      `"${this.placement}" は無効な placement 属性です。"top" を使用します。`
    );
    const i = t ? this.placement : "top", { x: r, y: o } = await V8(this, this._tooltipEl, {
      placement: i,
      strategy: "fixed",
      middleware: [b8(8), L8(), H8({ padding: 8 })]
    });
    this._tooltipEl && Object.assign(this._tooltipEl.style, {
      left: `${r}px`,
      top: `${o}px`
    });
  }
  render() {
    return g`
      <slot @slotchange=${this._onSlotChange}></slot>
      ${this._open ? g`<div class="tooltip" role="tooltip">${this.text}</div>` : m}
    `;
  }
}, t1.styles = x(v8), t1._idCounter = 0, t1);
_2([
  c({ type: String })
], W1.prototype, "text");
_2([
  c({ type: String, reflect: !0 })
], W1.prototype, "placement");
_2([
  Q0()
], W1.prototype, "_open");
_2([
  e5(".tooltip")
], W1.prototype, "_tooltipEl");
let M8 = W1;
customElements.get("mi-tooltip") || customElements.define("mi-tooltip", M8);
const Z8 = P`
  :host {
    display: inline-block;
  }

  .base {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid var(--border-color, transparent);
    background-color: var(--background-color, transparent);
    color: var(--color, inherit);
    cursor: pointer;
    position: relative;

    &:focus-visible {
      box-shadow:
        0 0 0 2px #fff,
        0 0 0 4px #191919;
      outline: none;
    }

    &:hover {
      background-color: var(--background-color-hover, transparent);
    }

    &:active {
      background-color: var(--background-color-active, transparent);
    }

    &:disabled,
    &.loading {
      cursor: not-allowed;
      background-color: var(--background-color-disabled, transparent);
      border-color: var(--border-color-disabled, transparent);
      color: var(--color-disabled, rgb(0 0 0 / 35%));

      &:hover {
        background-color: var(--background-color-disabled, transparent);
      }
    }
  }

  .icon {
    fill: currentcolor;
    display: block;
  }

  /* サイズ */
  .small {
    width: 24px;
    height: 24px;
    padding: 2px;

    .icon {
      width: 18px;
      height: 18px;
    }
  }

  .medium {
    width: 32px;
    height: 32px;
    padding: 4px;

    .icon {
      width: 20px;
      height: 20px;
    }
  }

  .large {
    width: 40px;
    height: 40px;
    padding: 4px;

    .icon {
      width: 22px;
      height: 22px;
    }
  }

  /* バリアント */
  .primary {
    --border-color: transparent;
    --background-color: #282828;
    --background-color-hover: #191919;
    --background-color-active: #000;
    --border-color-disabled: transparent;
    --background-color-disabled: rgb(0 0 0 / 7%);
    --color: #fff;
    --color-disabled: rgb(0 0 0 / 35%);
  }

  .secondary {
    --border-color: rgb(0 0 0 / 84%);
    --background-color: transparent;
    --background-color-hover: rgb(0 0 0 / 7%);
    --background-color-active: rgb(0 0 0 / 10%);
    --border-color-disabled: rgb(0 0 0 / 7%);
    --background-color-disabled: transparent;
    --color: rgb(0 0 0 / 84%);
    --color-disabled: rgb(0 0 0 / 35%);

    &.selected {
      --border-color: #3f69f2;
      --background-color: #e8edff;
      --background-color-hover: #dbe4ff;
      --background-color-active: #d5dfff;
      --background-color-disabled: rgb(0 0 0 / 7%);
      --border-color-disabled: rgb(0 0 0 / 7%);
    }
  }

  .tertiary {
    --border-color: rgb(0 0 0 / 20%);
    --background-color: transparent;
    --background-color-hover: rgb(0 0 0 / 7%);
    --background-color-active: rgb(0 0 0 / 10%);
    --border-color-disabled: rgb(0 0 0 / 7%);
    --background-color-disabled: transparent;
    --color: rgb(0 0 0 / 84%);
    --color-disabled: rgb(0 0 0 / 35%);

    &.selected {
      --border-color: rgb(0 0 0 / 10%);
      --background-color: #e8edff;
      --background-color-hover: #dbe4ff;
      --background-color-active: #d5dfff;
      --background-color-disabled: rgb(0 0 0 / 7%);
      --border-color-disabled: rgb(0 0 0 / 7%);
    }
  }

  .ghost {
    --border-color: transparent;
    --background-color: transparent;
    --background-color-hover: rgb(0 0 0 / 7%);
    --background-color-active: rgb(0 0 0 / 10%);
    --border-color-disabled: transparent;
    --background-color-disabled: transparent;
    --color: rgb(0 0 0 / 84%);
    --color-disabled: rgb(0 0 0 / 35%);

    &.selected {
      --background-color: #e8edff;
      --background-color-hover: #dbe4ff;
      --background-color-active: #d5dfff;
    }
  }
`;
var $8 = Object.defineProperty, q1 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && $8(t, i, o), o;
};
const _4 = [
  "primary",
  "secondary",
  "tertiary",
  "ghost"
], A4 = ["small", "medium", "large"], h2 = class h2 extends Z {
  constructor() {
    super(...arguments), this.variant = "ghost", this.size = "medium", this.label = "", this.tooltipPlacement = "top", this.tooltipDisabled = !1;
  }
  get loadingSize() {
    return {
      small: "medium",
      medium: "large",
      large: "xLarge"
    }[this.size];
  }
  /**
   * icon-button.css は theme クラス（normal/danger/ai）を持たず、
   * size も独自体系（small/medium/large）のため、base のクラス組み立てロジックとは
   * 互換性がない。そのため super.buttonClasses を呼ばず完全オーバーライドしている。
   */
  get buttonClasses() {
    return [
      "base",
      this.variant,
      this.size,
      this.selected ? "selected" : "",
      this.loading ? "loading" : ""
    ].filter(Boolean).join(" ");
  }
  renderSlot() {
    return m;
  }
  /**
   * base.ts の render() とは disabled・aria-label・title・aria-disabled の扱いが異なるため
   * 完全にオーバーライドしている。
   * - disabled: loading 時は aria-disabled で代替し、ネイティブ disabled は付与しない
   * - aria-label / title: label プロパティから設定
   */
  render() {
    const t = g`
      <button
        class="${this.buttonClasses}"
        ?disabled="${this.disabled}"
        name="${this.name || m}"
        value="${this.value || m}"
        type="${this.type}"
        aria-label="${this.label || m}"
        title="${this.tooltipDisabled && this.label ? this.label : m}"
        aria-disabled="${this.loading ? "true" : m}"
        aria-pressed="${this.toggle ? this.selected ? "true" : "false" : m}"
        aria-busy="${this.loading ? "true" : m}"
        @click="${this.handleClick}"
      >
        ${this.loading ? this.renderLoading() : m}
        ${this.showIcon ? this.renderIcon() : m} ${this.renderSlot()}
      </button>
    `;
    return !this.label || this.tooltipDisabled ? t : g`
      <mi-tooltip text="${this.label}" placement="${this.tooltipPlacement}">
        ${t}
      </mi-tooltip>
    `;
  }
};
h2.styles = x(Z8), h2.shadowRootOptions = {
  ...V.shadowRootOptions,
  delegatesFocus: !0
};
let o1 = h2;
q1([
  c({ type: String })
], o1.prototype, "variant");
q1([
  c({ type: String })
], o1.prototype, "size");
q1([
  c({ type: String, attribute: "aria-label", reflect: !0 })
], o1.prototype, "label");
q1([
  c({ type: String, attribute: "tooltip-placement" })
], o1.prototype, "tooltipPlacement");
q1([
  c({ type: Boolean, attribute: "tooltip-disabled" })
], o1.prototype, "tooltipDisabled");
customElements.get("mi-icon-button") || customElements.define("mi-icon-button", o1);
var k8 = Object.defineProperty, i9 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && k8(t, i, o), o;
};
class G1 extends Z {
  constructor() {
    super(...arguments), this.danger = !1, this.variants = null, this.variant = "primary";
  }
  getTheme() {
    return this.danger ? "danger" : "normal";
  }
  getEffectiveVariant() {
    const t = this.variants != null ? this.variants : this.variant, i = Q9(t);
    return i || console.warn(`${t}は無効なvariant属性です。`), i ? t : J2[0];
  }
}
i9([
  c({ type: Boolean, reflect: !0 })
], G1.prototype, "danger");
i9([
  c({ type: String })
], G1.prototype, "variants");
i9([
  c({ type: String })
], G1.prototype, "variant");
class p0 extends G1 {
}
class _8 extends p0 {
}
customElements.get("mi-neutral-button") || customElements.define("mi-neutral-button", G1);
customElements.get("mi-button") || customElements.define("mi-button", p0);
customElements.get("sp-button") || customElements.define("sp-button", _8);
const A8 = ":host{display:inline-block}.checkmark:has(.input:focus-visible):before{box-shadow:0 0 0 2px #fff,0 0 0 4px #191919}.base:hover .checkmark:has(:not(.input:disabled)):before{border-color:#0000008a;outline:4px solid rgb(0 0 0 / 4%)}.base:active .checkmark:has(:not(.input:disabled)):before,.base:hover:active .checkmark:has(:not(.input:disabled)):before{outline:4px solid rgb(0 0 0 / 7%)}.base:hover .checkmark:has(:is(.input:checked,.input:indeterminate)):has(:not(.input:disabled)):before{background-color:#2666bf;border-color:#2666bf}", f0 = '.checkmark{flex-grow:0;flex-shrink:0;display:inline-flex;padding-block:4px;padding-inline:4px;cursor:pointer}.checkmark:before{content:"";display:inline-block;width:16px;height:16px;background:#fff 50% 50% no-repeat;border:1.5px solid rgb(0 0 0 / 29%);border-radius:2px}.checkmark:has(:is(.input:checked,.input:indeterminate)):before{background-color:#3f69f2;border-color:#3f69f2}.checkmark:has(.input:checked):before{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuNDE0MSA2LjIwNzAzTDYuNzA3MDMgMTEuOTE0MUwzIDguMjA3MDNMNC40MTQwNiA2Ljc5Mjk3TDYuNzA3MDMgOS4wODU5NEwxMSA0Ljc5Mjk3TDEyLjQxNDEgNi4yMDcwM1oiIGZpbGw9IndoaXRlIi8+PC9zdmc+)}.checkmark:has(.input:indeterminate):before{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgN1Y5SDRWN0gxMloiIGZpbGw9IndoaXRlIi8+PC9zdmc+)}.checkmark:has(.input:disabled){cursor:not-allowed}.checkmark:has(:is(.input:disabled)):before{background-color:#e5e5e5;border-color:#0000000d}.checkmark .input{position:absolute;z-index:-1;opacity:0}';
var E8 = Object.defineProperty, Y1 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && E8(t, i, o), o;
};
const p2 = class p2 extends V {
  constructor() {
    super(), this.value = "", this.name = "", this.checked = !1, this.indeterminate = !1, this.disabled = !1, this.internals = this.attachInternals();
  }
  updated(t) {
    super.updated(t), t.has("checked") && this.internals.setFormValue(this.checked ? this.value : null);
  }
  handleChange(t) {
    const i = t.target;
    this.checked = i.checked, this.indeterminate = i.indeterminate, this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: !0,
        composed: !0,
        detail: {
          checked: this.checked,
          indeterminate: this.indeterminate
        }
      })
    );
  }
  render() {
    return g`
      <label class="base">
        <span class="checkmark">
          <input
            class="input"
            type="checkbox"
            .value=${this.value}
            .name=${this.name}
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            .disabled=${this.disabled}
            @change=${this.handleChange}
          />
        </span>
      </label>
    `;
  }
};
p2.styles = x(
  M(f0),
  M(A8)
), p2.formAssociated = !0;
let q = p2;
Y1([
  c({ type: String, reflect: !0 })
], q.prototype, "value");
Y1([
  c({ type: String, reflect: !0 })
], q.prototype, "name");
Y1([
  c({ type: Boolean, reflect: !0 })
], q.prototype, "checked");
Y1([
  c({ type: Boolean, reflect: !0 })
], q.prototype, "indeterminate");
Y1([
  c({ type: Boolean, reflect: !0 })
], q.prototype, "disabled");
class S8 extends q {
}
customElements.get("mi-checkbox") || customElements.define("mi-checkbox", q);
customElements.get("sp-checkbox") || customElements.define("sp-checkbox", S8);
const z8 = ":host{display:inline-block;max-width:100%}.base{display:inline-flex;align-items:flex-start;justify-content:flex-start;max-width:100%;cursor:pointer}.checkmark:has(.input:focus-visible):before{box-shadow:0 0 0 2px #fff,0 0 0 4px #191919}.base:has(.input:disabled){cursor:not-allowed}.text{color:#000000d6;font-size:14px;line-height:1.3;letter-spacing:.02em;padding-block:3px;padding-inline:4px}.base:has(.input:disabled) .text{color:#00000059}.base:hover .checkmark:has(:not(.input:disabled)):before{border-color:#0000008a;outline:4px solid rgb(0 0 0 / 4%)}.base:active .checkmark:has(:not(.input:disabled)):before,.base:hover:active .checkmark:has(:not(.input:disabled)):before{outline:4px solid rgb(0 0 0 / 7%)}.base:hover .checkmark:has(:is(.input:checked,.input:indeterminate)):has(:not(.input:disabled)):before{background-color:#2666bf;border-color:#2666bf}";
var P8 = Object.defineProperty, A1 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && P8(t, i, o), o;
};
const f2 = class f2 extends V {
  constructor() {
    super(), this.value = "", this.name = "", this.checked = !1, this.indeterminate = !1, this.disabled = !1, this.text = "", this.internals = this.attachInternals();
  }
  updated(t) {
    super.updated(t), t.has("checked") && this.internals.setFormValue(this.checked ? this.value : null);
  }
  handleChange(t) {
    const i = t.target;
    this.checked = i.checked, this.indeterminate = i.indeterminate, this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: !0,
        composed: !0,
        detail: {
          checked: this.checked,
          indeterminate: this.indeterminate
        }
      })
    );
  }
  render() {
    return g`
      <label class="base">
        <span class="checkmark">
          <input
            class="input"
            type="checkbox"
            .value=${this.value}
            .name=${this.name}
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            .disabled=${this.disabled}
            @change=${this.handleChange}
          />
        </span>
        <span class="text">${this.text}</span>
      </label>
    `;
  }
};
f2.styles = x(
  M(f0),
  M(z8)
), f2.formAssociated = !0;
let N = f2;
A1([
  c({ type: String, reflect: !0 })
], N.prototype, "value");
A1([
  c({ type: String, reflect: !0 })
], N.prototype, "name");
A1([
  c({ type: Boolean, reflect: !0 })
], N.prototype, "checked");
A1([
  c({ type: Boolean, reflect: !0 })
], N.prototype, "indeterminate");
A1([
  c({ type: Boolean, reflect: !0 })
], N.prototype, "disabled");
A1([
  c({ type: String, reflect: !0 })
], N.prototype, "text");
class O8 extends N {
}
customElements.get("mi-checkbox-text") || customElements.define("mi-checkbox-text", N);
customElements.get("sp-checkbox-text") || customElements.define("sp-checkbox-text", O8);
const T8 = P`
  :host {
    display: inline-block;
    --color-primary-red-90: #f72a48;
    --color-semantic-surface-regular-default: #ffffff;
    --color-semantic-highlight-focus-ring-default: #191919;
  }

  .base {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    box-shadow: 0 0 6px 2px #f72a481a;
  }

  .base::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(
      from 15deg,
      rgb(42, 42, 247) 5%,
      rgb(42, 42, 247) 20%,
      rgb(71, 212, 255) 40%,
      rgb(255, 46, 213) 60%,
      rgb(247, 42, 72) 80%,
      rgb(247, 42, 72) 95%,
      rgb(42, 42, 247) 100%
    );
    z-index: 0;
    transition: transform 0s;
  }

  .base::after {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 50%;
    background: white;
    z-index: 1;
  }

  .base:hover::before {
    transform: rotate(1turn);
    transition: transform 0.3s ease;
  }

  .base:active::after {
    inset: 2px;
  }

  .base:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px var(--color-semantic-surface-regular-default),
      0 0 0 4px var(--color-semantic-highlight-focus-ring-default);
  }

  .icon {
    position: relative;
    z-index: 2;
    display: flex;
    font-size: 25px;
    fill: var(--color-primary-red-90);
  }

  .loading {
    position: relative;
    z-index: 2;
    display: flex;
    font-size: 25px;
    fill: var(--color-primary-red-90);
  }
`;
var F8 = Object.defineProperty, B8 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && F8(t, i, o), o;
};
const l9 = class l9 extends V {
  constructor() {
    super(...arguments), this.loading = !1;
  }
  render() {
    return g`<button class="base">
      ${this.loading ? g`<mi-loading class="loading" ai size="3xLarge"></mi-loading>` : g`<mi-icon class="icon" type="magic-fill"></mi-icon>`}
    </button>`;
  }
};
l9.styles = x(T8);
let D1 = l9;
B8([
  c({ type: Boolean })
], D1.prototype, "loading");
class D8 extends D1 {
}
customElements.get("mi-floating-button") || customElements.define("mi-floating-button", D1);
customElements.get("sp-floating-button") || customElements.define("sp-floating-button", D8);
const R8 = ":host{display:inline-block;width:1.28em;height:1.28em}.icon-color{width:100%;height:100%}", j8 = [
  "error",
  "information",
  "success",
  "warning"
], N8 = {
  error: '<rect x="6" y="6" width="12" height="12" fill="white"/><path d="M21.28 7.845L16.15 2.715C16.01 2.575 15.82 2.495 15.62 2.495H8.37C8.17 2.495 7.98 2.575 7.84 2.715L2.72 7.845C2.58 7.985 2.5 8.175 2.5 8.375V15.625C2.5 15.825 2.58 16.015 2.72 16.155L7.85 21.285C7.99 21.425 8.18 21.505 8.38 21.505H15.63C15.83 21.505 16.02 21.425 16.16 21.285L21.29 16.155C21.43 16.015 21.51 15.825 21.51 15.625V8.375C21.51 8.175 21.43 7.985 21.29 7.845H21.28ZM16.81 15.745L15.75 16.805L12 13.055L8.25 16.805L7.19 15.745L10.94 11.995L7.19 8.245L8.25 7.185L12 10.935L15.75 7.185L16.81 8.245L13.06 11.995L16.81 15.745Z" fill="#C92812"/>',
  information: '<rect x="6" y="5" width="12" height="14" fill="white"/><path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12.75 16.86H11.25V10.36H12.75V16.86ZM12.83 8.86H11.17V7.14H12.83V8.86Z" fill="#315CE8"/>',
  success: '<rect x="6" y="5" width="12" height="14" fill="white"/><path d="M12 2.02002C6.49 2.02002 2 6.51002 2 12.02C2 17.53 6.49 22.02 12 22.02C17.51 22.02 22 17.53 22 12.02C22 6.51002 17.52 2.02002 12 2.02002ZM10.83 15.5L7.22 11.9L8.28 10.84L10.83 13.38L15.73 8.49002L16.79 9.55002L10.83 15.49V15.5Z" fill="#00783C"/>',
  warning: '<rect x="10" y="8" width="4" height="11" fill="black" fill-opacity="0.84"/><path d="M21.92 19.3601L12.66 3.3201C12.39 2.8601 11.63 2.8601 11.36 3.3201L2.1 19.3601C1.97 19.5901 1.97 19.8801 2.1 20.1101C2.23 20.3401 2.48 20.4901 2.75 20.4901H21.27C21.54 20.4901 21.79 20.3501 21.92 20.1101C22.05 19.8801 22.05 19.5901 21.92 19.3601ZM11.25 8.6601H12.75V14.6601H11.25V8.6601ZM12.83 17.8601H11.17V16.1401H12.83V17.8601Z" fill="#F0C800"/>'
};
var I8 = Object.defineProperty, U8 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && I8(t, i, o), o;
};
function W8(e) {
  return j8.includes(e);
}
const a9 = class a9 extends V {
  constructor() {
    super(...arguments), this.type = "information";
  }
  render() {
    return W8(this.type) ? g`<svg
        class="icon-color"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        ${G9(N8[this.type])}
      </svg>` : g``;
  }
};
a9.styles = x(M(R8));
let l2 = a9;
U8([
  c({ type: String, reflect: !0 })
], l2.prototype, "type");
customElements.get("mi-icon-color") || customElements.define("mi-icon-color", l2);
const q8 = P`
  .base {
    display: flex;
    align-items: flex-start;
    line-height: 1.5;
    gap: 8px;
    padding: 16px;
    border-radius: 6px;
    font-size: 14px;
  }

  .base[data-type="error"] {
    background-color: #ffedeb;
  }

  .base[data-type="information"] {
    background-color: #edf1ff;
  }

  .base[data-type="success"] {
    background-color: #dff5ea;
  }

  .base[data-type="warning"] {
    background-color: #fcf6d4;
  }

  .icon {
    display: inline-block;
    min-width: 20px;
    width: 20px;
    height: 20px;
  }
`;
var G8 = Object.defineProperty, Y8 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && G8(t, i, o), o;
};
const X8 = ["information", "success", "warning", "error"], c9 = class c9 extends V {
  constructor() {
    super(...arguments), this.type = "information";
  }
  render() {
    const t = X8.includes(this.type) ? this.type : "information";
    return g`
      <div class="base" data-type=${t}>
        <mi-icon-color class="icon" type=${t}></mi-icon-color>
        <div><slot></slot></div>
      </div>
    `;
  }
};
c9.styles = x(q8);
let a2 = c9;
Y8([
  c({ type: String, reflect: !0 })
], a2.prototype, "type");
customElements.get("mi-inline-notification") || customElements.define("mi-inline-notification", a2);
const R1 = Y2(class extends q9 {
  constructor(e) {
    if (super(e), e.type !== W9.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
  }
  update(e, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((r) => r !== "")));
      for (const r in t) t[r] && !this.nt?.has(r) && this.st.add(r);
      return this.render(t);
    }
    const i = e.element.classList;
    for (const r of this.st) r in t || (i.remove(r), this.st.delete(r));
    for (const r in t) {
      const o = !!t[r];
      o === this.st.has(r) || this.nt?.has(r) || (o ? (i.add(r), this.st.add(r)) : (i.remove(r), this.st.delete(r)));
    }
    return e1;
  }
}), J8 = ":host{display:flex;flex-direction:column;gap:4px}:host .label{font-weight:var(--font-weight-bold);font-size:14px;color:#000000d6}:host .label.none{display:none}:host .support{font-weight:var(--font-weight-normal);font-size:12px;color:#0000008a}:host .support.none{display:none}";
var K8 = Object.defineProperty, u0 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && K8(t, i, o), o;
}, M1, g0, m0;
const d9 = class d9 extends V {
  constructor() {
    super(...arguments);
    S(this, M1);
    this.text = "", this.supportText = "";
  }
  /**
   * テキストもサポートテキストも空のとき、かつそのときに限り、真を返す。
   */
  isEmpty() {
    return this.text === "" && this.supportText === "";
  }
  render() {
    return g`
      <span class=${z(this, M1, g0).call(this)}>${this.text}</span>
      <span class=${z(this, M1, m0).call(this)}>${this.supportText}</span>
    `;
  }
};
M1 = new WeakSet(), g0 = function() {
  return R1({
    label: !0,
    none: !this.text
  });
}, m0 = function() {
  return R1({
    support: !0,
    none: !this.supportText
  });
}, d9.styles = x(M(J8));
let x1 = d9;
u0([
  c({ type: String, reflect: !0 })
], x1.prototype, "text");
u0([
  c({ type: String, attribute: "support-text", reflect: !0 })
], x1.prototype, "supportText");
class Q8 extends x1 {
}
customElements.get("mi-label-unit") || customElements.define("mi-label-unit", x1);
customElements.get("sp-label-unit") || customElements.define("sp-label-unit", Q8);
const t4 = {
  "inverse:false|logoLanguage:en|symbol:false|type:null": '<svg width="71" height="27" viewBox="0 0 71 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.00185488 19.2035L2.01304 17.336C2.75205 18.3829 4.08635 19.1219 5.48185 19.1219C6.77535 19.1219 8.23205 18.4441 8.23205 16.8437C8.23205 15.2432 6.87735 14.8112 5.2148 14.2576L4.59912 14.0731C2.40248 13.3545 0.637942 12.328 0.637942 9.63901C0.637942 6.37512 3.57359 5 6.24126 5C8.13005 5 9.93632 5.71862 11.0648 6.8888L9.15558 8.7776C8.51949 7.89487 7.39011 7.34038 6.15874 7.34038C4.92736 7.34038 3.46974 7.97644 3.46974 9.49526C3.46974 10.8908 4.59819 11.3424 6.09661 11.8356L6.7123 12.0201C9.23718 12.8203 11.0842 13.806 11.0842 16.5766C11.0842 19.9221 8.33404 21.503 5.4392 21.503C3.36589 21.503 1.27218 20.6824 0 19.2044L0.00185488 19.2035Z" fill="#F72A48"/><path d="M12.6829 26.27V10.672H15.2161V12.1676H15.2764C15.9746 11.13 17.3107 10.392 18.8666 10.392C21.9785 10.392 23.9934 12.8649 23.9934 15.8571C23.9934 18.8493 22.0183 21.3825 18.8472 21.3825C17.4507 21.3825 16.0942 20.7845 15.3561 19.707H15.2958V26.2691H12.6829V26.27ZM21.3999 15.858C21.3999 14.1222 20.3224 12.5274 18.288 12.5274C16.4132 12.5274 15.1567 14.1232 15.1567 15.8784C15.1567 17.6337 16.4132 19.2091 18.288 19.2091C20.3224 19.2091 21.3999 17.6133 21.3999 15.858Z" fill="#F72A48"/><path d="M25.1477 15.8978C25.1477 12.6071 27.5409 10.3529 30.6333 10.3529C33.7256 10.3529 35.76 12.5273 35.76 15.8385C35.76 16.0981 35.76 16.3568 35.7396 16.596H27.7412C27.8015 18.1519 29.1571 19.349 30.7733 19.349C32.0501 19.349 32.9875 18.7111 33.5263 17.9331L35.3613 19.2099C34.2838 20.6861 32.7084 21.4242 30.7334 21.4242C27.6021 21.4242 25.1486 19.2702 25.1486 15.8987L25.1477 15.8978ZM33.2657 14.8603C33.2258 13.4045 32.3487 12.2667 30.6527 12.2667C28.9568 12.2667 27.8404 13.4638 27.7208 14.8603H33.2657Z" fill="#F72A48"/><path d="M36.9358 15.8978C36.9358 12.6071 39.329 10.3529 42.4214 10.3529C45.5137 10.3529 47.5481 12.5273 47.5481 15.8385C47.5481 16.0981 47.5481 16.3568 47.5286 16.596H39.5302C39.5905 18.1519 40.9461 19.349 42.5623 19.349C43.8391 19.349 44.7765 18.7111 45.3153 17.9331L47.1503 19.2099C46.0728 20.6861 44.4974 21.4242 42.5224 21.4242C39.3911 21.4242 36.9376 19.2702 36.9376 15.8987L36.9358 15.8978ZM45.0538 14.8603C45.0139 13.4045 44.1358 12.2667 42.4408 12.2667C40.7458 12.2667 39.6285 13.4638 39.5089 14.8603H45.0538Z" fill="#F72A48"/><path d="M48.719 15.858C48.719 12.8658 50.7339 10.3928 53.8652 10.3928C55.4007 10.3928 56.658 11.1309 57.3562 12.0683H57.4165V5.50623H60.01V21.1043H57.5565V19.5688H57.5167C56.7591 20.7455 55.3024 21.3843 53.8865 21.3843C50.6755 21.3843 48.7199 18.8511 48.7199 15.8589L48.719 15.858ZM57.5556 15.8774C57.5556 14.1222 56.2992 12.5264 54.4039 12.5264C52.389 12.5264 51.332 14.1222 51.332 15.8571C51.332 17.5919 52.389 19.2081 54.4039 19.2081C56.2992 19.2081 57.5556 17.6522 57.5556 15.8774Z" fill="#F72A48"/><path d="M61.2786 18.1316C61.2786 15.0995 64.829 14.6007 68.1402 14.6007H68.2802V14.3614C68.2802 13.0253 67.3631 12.3864 66.0066 12.3864C64.8892 12.3864 63.8526 12.8648 63.1942 13.5232L61.8377 12.0072C62.9151 10.9696 64.5304 10.3521 66.2458 10.3521C69.4568 10.3521 70.754 12.2872 70.754 14.7203V19.2285C70.754 19.8665 70.7939 20.6249 70.8737 21.1034H68.5203C68.4406 20.6843 68.3608 20.1854 68.3608 19.7673H68.321C67.6033 20.8048 66.4461 21.363 65.0098 21.363C63.3741 21.363 61.2795 20.5452 61.2795 18.1316H61.2786ZM68.3395 16.7751V16.2762H67.8805C65.9852 16.2762 63.7515 16.496 63.7515 18.0519C63.7515 19.1488 64.7492 19.4881 65.6663 19.4881C67.3622 19.4881 68.3395 18.3514 68.3395 16.7751Z" fill="#F72A48"/></svg>',
  "inverse:false|logoLanguage:en|symbol:true|type:ai-agent": '<svg width="192" height="26" viewBox="0 0 192 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M121.313 5.56238L127.755 20.7723H126.045L124.394 16.8155H116.601L114.951 20.7723H113.261L119.862 5.56238H121.314H121.313ZM117.157 15.4642H123.857L120.537 7.25289L117.157 15.4642Z" fill="url(#paint0_linear_1_709)"/><path d="M128.987 20.7732V5.56323H130.518V20.7732H128.987Z" fill="url(#paint1_linear_1_709)"/><path d="M143.8 5.56238L150.242 20.7723H148.532L146.881 16.8155H139.088L137.437 20.7723H135.747L142.348 5.56238H143.8ZM139.644 15.4642H146.345L143.024 7.25289L139.644 15.4642Z" fill="url(#paint2_linear_1_709)"/><path d="M150.996 24.1533L151.93 23.0396C152.885 24.1136 154.316 24.7291 155.768 24.7291C158.73 24.7291 159.645 22.6809 159.645 20.3351V18.7444H159.586C158.85 20.1558 157.28 20.9313 155.689 20.9313C152.667 20.9313 150.639 18.6446 150.639 15.7017C150.639 12.7588 152.648 10.413 155.669 10.413C157.279 10.413 158.83 11.1884 159.645 12.719H159.685V10.6912H161.096V20.2344C161.096 23.2762 159.765 26 155.748 26C153.958 26 152.169 25.3244 150.996 24.1505V24.1533ZM159.744 15.6832C159.744 13.476 158.154 11.6275 155.887 11.6275C153.621 11.6275 152.129 13.4964 152.129 15.6832C152.129 17.8701 153.54 19.7195 155.887 19.7195C158.234 19.7195 159.744 17.9107 159.744 15.6832Z" fill="url(#paint3_linear_1_709)"/><path d="M163.163 15.7026C163.163 12.6007 165.35 10.4138 168.213 10.4138C171.255 10.4138 173.005 12.5813 173.005 15.5038C173.005 15.6831 173.005 15.8819 172.986 16.0806H164.655C164.695 18.0493 166.126 19.8387 168.353 19.8387C169.785 19.8387 170.878 19.1631 171.574 18.1889L172.588 19.0244C171.534 20.396 170.142 21.0523 168.353 21.0523C165.331 21.0523 163.163 18.8848 163.163 15.7035V15.7026ZM171.534 14.9872C171.475 13.0184 170.301 11.5877 168.214 11.5877C166.127 11.5877 164.734 13.4371 164.655 14.9872H171.534Z" fill="url(#paint4_linear_1_709)"/><path d="M175.073 20.7732V12.9991C175.073 12.4223 175.053 11.3289 174.993 10.693H176.385C176.425 11.23 176.484 12.1839 176.484 12.7015H176.524C177.061 11.3492 178.512 10.4148 180.063 10.4148C182.727 10.4148 183.761 12.3835 183.761 14.5704V20.7741H182.31V15.0279C182.31 13.378 181.793 11.6478 179.705 11.6478C177.916 11.6478 176.544 13.1386 176.544 15.5445V20.7741H175.073V20.7732Z" fill="url(#paint5_linear_1_709)"/><path d="M186.823 18.1085V11.9048H184.795V10.6921H186.823V7.78894H188.255V10.6921H191.039V11.9048H188.255V17.969C188.255 19.2417 188.811 19.7584 189.825 19.7584C190.203 19.7584 190.64 19.6789 190.978 19.5199L191.039 20.7131C190.621 20.8721 190.044 20.9719 189.508 20.9719C187.719 20.9719 186.824 19.9377 186.824 18.1085H186.823Z" fill="url(#paint6_linear_1_709)"/><path d="M36.9232 18.8794L38.9279 17.0179C39.6646 18.0614 40.9946 18.798 42.3857 18.798C43.675 18.798 45.1271 18.1224 45.1271 16.5271C45.1271 14.9318 43.7767 14.5011 42.1195 13.9493L41.5057 13.7653C39.3161 13.049 37.5572 12.0258 37.5572 9.34634C37.5572 6.09288 40.4835 4.72217 43.1426 4.72217C45.0254 4.72217 46.8259 5.43848 47.9508 6.60493L46.0477 8.48768C45.4136 7.60777 44.2878 7.05505 43.0604 7.05505C41.8329 7.05505 40.38 7.68911 40.38 9.20308C40.38 10.5941 41.5048 11.0442 42.9985 11.536L43.6122 11.7199C46.129 12.5175 47.9702 13.5001 47.9702 16.2618C47.9702 19.5966 45.2287 21.1725 42.3441 21.1725C40.2774 21.1725 38.1904 20.3545 36.9222 18.8812L36.9232 18.8794Z" fill="#F72A48"/><path d="M49.5636 25.9223V10.3741H52.0887V11.865H52.1488C52.8448 10.8307 54.1767 10.095 55.7276 10.095C58.8295 10.095 60.837 12.56 60.837 15.5427C60.837 18.5253 58.8683 21.0505 55.7073 21.0505C54.3153 21.0505 52.9631 20.4543 52.2283 19.3803H52.1682V25.9214H49.5636V25.9223ZM58.2528 15.5436C58.2528 13.8134 57.1787 12.2236 55.1509 12.2236C53.282 12.2236 52.0296 13.8143 52.0296 15.5639C52.0296 17.3136 53.282 18.8839 55.1509 18.8839C57.1787 18.8839 58.2528 17.2933 58.2528 15.5436Z" fill="#F72A48"/><path d="M61.9878 15.5833C61.9878 12.3031 64.3734 10.0562 67.4558 10.0562C70.5383 10.0562 72.5653 12.2236 72.5653 15.5242C72.5653 15.783 72.5653 16.0409 72.5449 16.2793H64.5721C64.6322 17.8303 65.9835 19.0235 67.5945 19.0235C68.8672 19.0235 69.8017 18.3876 70.3387 17.6121L72.1678 18.8849C71.0938 20.3563 69.5234 21.0921 67.5547 21.0921C64.4334 21.0921 61.9878 18.945 61.9878 15.5843V15.5833ZM70.0799 14.55C70.0401 13.0989 69.1658 11.9648 67.4752 11.9648C65.7847 11.9648 64.6719 13.158 64.5527 14.55H70.0799Z" fill="#F72A48"/><path d="M73.7382 15.5833C73.7382 12.3031 76.1237 10.0562 79.2062 10.0562C82.2887 10.0562 84.3156 12.2236 84.3156 15.5242C84.3156 15.783 84.3156 16.0409 84.2962 16.2793H76.3234C76.3834 17.8303 77.7347 19.0235 79.3458 19.0235C80.6185 19.0235 81.5529 18.3876 82.09 17.6121L83.9191 18.8849C82.8451 20.3563 81.2747 21.0921 79.306 21.0921C76.1847 21.0921 73.7391 18.945 73.7391 15.5843L73.7382 15.5833ZM81.8311 14.55C81.7914 13.0989 80.9161 11.9648 79.2265 11.9648C77.5369 11.9648 76.4232 13.158 76.304 14.55H81.8311Z" fill="#F72A48"/><path d="M85.4849 15.5436C85.4849 12.561 87.4933 10.0959 90.6146 10.0959C92.1452 10.0959 93.3986 10.8317 94.0936 11.7661H94.1537V5.22498H96.7389V20.7732H94.2933V19.2426H94.2535C93.4984 20.4155 92.0463 21.0523 90.6349 21.0523C87.4342 21.0523 85.4849 18.5272 85.4849 15.5446V15.5436ZM94.2923 15.564C94.2923 13.8143 93.0399 12.2236 91.1507 12.2236C89.1422 12.2236 88.0886 13.8143 88.0886 15.5436C88.0886 17.273 89.1422 18.884 91.1507 18.884C93.0399 18.884 94.2923 17.333 94.2923 15.564Z" fill="#F72A48"/><path d="M98.0033 17.8109C98.0033 14.7885 101.542 14.2912 104.843 14.2912H104.983V14.0527C104.983 12.7209 104.068 12.084 102.716 12.084C101.602 12.084 100.569 12.561 99.9129 13.2172L98.5606 11.706C99.6346 10.6717 101.245 10.0562 102.955 10.0562C106.155 10.0562 107.449 11.9851 107.449 14.4104V18.9043C107.449 19.5402 107.488 20.2963 107.568 20.7732H105.222C105.142 20.3554 105.063 19.8581 105.063 19.4413H105.023C104.308 20.4756 103.154 21.032 101.723 21.032C100.092 21.032 98.0042 20.2168 98.0042 17.8109H98.0033ZM105.042 16.4586V15.9614H104.584C102.695 15.9614 100.468 16.1804 100.468 17.7314C100.468 18.8248 101.463 19.1631 102.377 19.1631C104.067 19.1631 105.042 18.0299 105.042 16.4586Z" fill="#F72A48"/><path d="M27.6767 6.10949C27.6767 2.73679 23.5313 0.00277284 18.506 0H11.353L16.4051 2.01955C15.4438 2.22289 14.5112 2.6379 13.6794 3.27472L5.22498 10.3686H8.25754L22.7909 24.902C23.4444 25.5554 24.3298 25.9214 25.2532 25.9214H27.514L21.5681 19.9755V16.3921C21.5681 14.0102 23.9611 11.474 26.5537 11.474C28.43 11.474 29.3727 13.1155 28.2553 14.8116C30.0548 13.9668 31.2231 12.9066 31.64 11.3474C32.2445 9.08937 30.212 6.59844 27.6776 6.10857L27.6767 6.10949Z" fill="#F72A48"/><path d="M2.68318 13.7025L6.41634 15.1952L16.1241 24.9029C16.7775 25.5564 17.663 25.9224 18.5863 25.9224H20.8471L8.6263 13.7015H2.68225L2.68318 13.7025Z" fill="#F72A48"/><path d="M0 17.7758L3.88475 19.3295L9.45816 24.9029C10.1116 25.5563 10.9971 25.9224 11.9204 25.9224H14.1812L6.03462 17.7758H0Z" fill="#F72A48"/><defs><linearGradient id="paint0_linear_1_709" x1="130.95" y1="-5.52621" x2="174.114" y2="37.6377" gradientUnits="userSpaceOnUse"><stop offset="0.4" stop-color="#F72A48"/><stop offset="0.46" stop-color="#F42A4B"/><stop offset="0.51" stop-color="#ED2A55"/><stop offset="0.55" stop-color="#E02A66"/><stop offset="0.59" stop-color="#CE2A7D"/><stop offset="0.63" stop-color="#B72B9C"/><stop offset="0.67" stop-color="#9B2CC1"/><stop offset="0.7" stop-color="#7C2DEB"/><stop offset="1" stop-color="#2A2AF7"/></linearGradient><linearGradient id="paint1_linear_1_709" x1="130.95" y1="-5.52628" x2="174.114" y2="37.6374" gradientUnits="userSpaceOnUse"><stop offset="0.4" stop-color="#F72A48"/><stop offset="0.46" stop-color="#F42A4B"/><stop offset="0.51" stop-color="#ED2A55"/><stop offset="0.55" stop-color="#E02A66"/><stop offset="0.59" stop-color="#CE2A7D"/><stop offset="0.63" stop-color="#B72B9C"/><stop offset="0.67" stop-color="#9B2CC1"/><stop offset="0.7" stop-color="#7C2DEB"/><stop offset="1" stop-color="#2A2AF7"/></linearGradient><linearGradient id="paint2_linear_1_709" x1="130.95" y1="-5.52621" x2="174.114" y2="37.6377" gradientUnits="userSpaceOnUse"><stop offset="0.4" stop-color="#F72A48"/><stop offset="0.46" stop-color="#F42A4B"/><stop offset="0.51" stop-color="#ED2A55"/><stop offset="0.55" stop-color="#E02A66"/><stop offset="0.59" stop-color="#CE2A7D"/><stop offset="0.63" stop-color="#B72B9C"/><stop offset="0.67" stop-color="#9B2CC1"/><stop offset="0.7" stop-color="#7C2DEB"/><stop offset="1" stop-color="#2A2AF7"/></linearGradient><linearGradient id="paint3_linear_1_709" x1="130.95" y1="-5.52625" x2="174.114" y2="37.6376" gradientUnits="userSpaceOnUse"><stop offset="0.4" stop-color="#F72A48"/><stop offset="0.46" stop-color="#F42A4B"/><stop offset="0.51" stop-color="#ED2A55"/><stop offset="0.55" stop-color="#E02A66"/><stop offset="0.59" stop-color="#CE2A7D"/><stop offset="0.63" stop-color="#B72B9C"/><stop offset="0.67" stop-color="#9B2CC1"/><stop offset="0.7" stop-color="#7C2DEB"/><stop offset="1" stop-color="#2A2AF7"/></linearGradient><linearGradient id="paint4_linear_1_709" x1="130.95" y1="-5.52632" x2="174.114" y2="37.6375" gradientUnits="userSpaceOnUse"><stop offset="0.4" stop-color="#F72A48"/><stop offset="0.46" stop-color="#F42A4B"/><stop offset="0.51" stop-color="#ED2A55"/><stop offset="0.55" stop-color="#E02A66"/><stop offset="0.59" stop-color="#CE2A7D"/><stop offset="0.63" stop-color="#B72B9C"/><stop offset="0.67" stop-color="#9B2CC1"/><stop offset="0.7" stop-color="#7C2DEB"/><stop offset="1" stop-color="#2A2AF7"/></linearGradient><linearGradient id="paint5_linear_1_709" x1="130.95" y1="-5.52626" x2="174.114" y2="37.6376" gradientUnits="userSpaceOnUse"><stop offset="0.4" stop-color="#F72A48"/><stop offset="0.46" stop-color="#F42A4B"/><stop offset="0.51" stop-color="#ED2A55"/><stop offset="0.55" stop-color="#E02A66"/><stop offset="0.59" stop-color="#CE2A7D"/><stop offset="0.63" stop-color="#B72B9C"/><stop offset="0.67" stop-color="#9B2CC1"/><stop offset="0.7" stop-color="#7C2DEB"/><stop offset="1" stop-color="#2A2AF7"/></linearGradient><linearGradient id="paint6_linear_1_709" x1="130.95" y1="-5.52624" x2="174.114" y2="37.6375" gradientUnits="userSpaceOnUse"><stop offset="0.4" stop-color="#F72A48"/><stop offset="0.46" stop-color="#F42A4B"/><stop offset="0.51" stop-color="#ED2A55"/><stop offset="0.55" stop-color="#E02A66"/><stop offset="0.59" stop-color="#CE2A7D"/><stop offset="0.63" stop-color="#B72B9C"/><stop offset="0.67" stop-color="#9B2CC1"/><stop offset="0.7" stop-color="#7C2DEB"/><stop offset="1" stop-color="#2A2AF7"/></linearGradient></defs></svg>',
  "inverse:false|logoLanguage:en|symbol:true|type:expert-research": '<svg width="256" height="26" viewBox="0 0 256 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M115.396 20.8343V5.57981H124.827V6.93607H116.91V12.2805H124.388V13.5969H116.91V19.4595H125.166V20.8352H115.395L115.396 20.8343Z" fill="#F72A48"/><path d="M125.565 20.8343L129.593 15.5297L125.964 10.7239H127.778L130.51 14.5526L133.262 10.7239H134.996L131.407 15.5093L135.455 20.8334H133.641L130.47 16.5059L127.34 20.8334H125.565V20.8343Z" fill="#F72A48"/><path d="M136.693 25.9988V10.7239H138.148V12.718H138.207C138.945 11.3219 140.421 10.4449 142.176 10.4449C145.187 10.4449 147.221 12.7579 147.221 15.7893C147.221 18.8207 145.187 21.1133 142.156 21.1133C140.541 21.1133 138.985 20.3355 138.227 18.8801H138.167V25.9988H136.691H136.693ZM145.706 15.7893C145.706 13.6154 144.331 11.6612 141.917 11.6612C139.664 11.6612 138.089 13.5755 138.089 15.7893C138.089 18.0031 139.664 19.897 141.917 19.897C144.331 19.897 145.706 17.9428 145.706 15.7893Z" fill="#F72A48"/><path d="M148.577 15.7494C148.577 12.6383 150.771 10.4449 153.643 10.4449C156.694 10.4449 158.448 12.6188 158.448 15.5501C158.448 15.73 158.448 15.9293 158.429 16.1286H150.074C150.113 18.1023 151.549 19.897 153.783 19.897C155.219 19.897 156.315 19.2194 157.013 18.2423L158.03 19.0794C156.974 20.4551 155.577 21.1133 153.783 21.1133C150.751 21.1133 148.578 18.9394 148.578 15.7494H148.577ZM156.973 15.0319C156.913 13.0582 155.736 11.6222 153.643 11.6222C151.549 11.6222 150.153 13.4763 150.074 15.0319H156.973Z" fill="#F72A48"/><path d="M160.522 20.8343V13.0369C160.522 12.4584 160.502 11.3617 160.443 10.7239H161.839C161.879 11.2625 161.939 12.2397 161.939 12.7783H161.979C162.537 11.2829 163.813 10.4449 165.209 10.4449C165.429 10.4449 165.668 10.4644 165.868 10.5052L165.807 11.8614C165.608 11.8012 165.349 11.7817 165.13 11.7817C162.976 11.7817 161.999 13.696 161.999 15.5501V20.8343H160.523H160.522Z" fill="#F72A48"/><path d="M168.439 18.1625V11.9411H166.405V10.7248H168.439V7.81295H169.875V10.7248H172.667V11.9411H169.875V18.0234C169.875 19.3 170.433 19.8182 171.45 19.8182C171.829 19.8182 172.268 19.7384 172.607 19.579L172.668 20.7758C172.249 20.9353 171.671 21.0354 171.132 21.0354C169.338 21.0354 168.44 19.998 168.44 18.1643L168.439 18.1625Z" fill="#F72A48"/><path d="M188.759 20.8343H186.905L182.757 13.7155H180.025V20.8343H178.49V5.57981H183.137C185.829 5.57981 188.322 6.55691 188.322 9.64768C188.322 12.0802 186.507 13.3364 184.373 13.596L188.76 20.8343H188.759ZM180.025 12.439H182.936C185.209 12.439 186.765 11.5815 186.765 9.64768C186.765 7.51362 184.97 6.89621 182.936 6.89621H180.025V12.4399V12.439Z" fill="#F72A48"/><path d="M189.478 15.7494C189.478 12.6383 191.671 10.4449 194.543 10.4449C197.594 10.4449 199.349 12.6188 199.349 15.5501C199.349 15.73 199.349 15.9293 199.329 16.1286H190.974C191.014 18.1023 192.45 19.897 194.683 19.897C196.119 19.897 197.216 19.2194 197.914 18.2423L198.931 19.0794C197.874 20.4551 196.478 21.1133 194.683 21.1133C191.652 21.1133 189.479 18.9394 189.479 15.7494H189.478ZM197.872 15.0319C197.812 13.0582 196.635 11.6222 194.542 11.6222C192.449 11.6222 191.053 13.4763 190.973 15.0319H197.873H197.872Z" fill="#F72A48"/><path d="M200.246 19.3389L201.303 18.462C201.921 19.3389 202.958 19.9174 204.174 19.9174C205.271 19.9174 206.447 19.3788 206.447 18.1032C206.447 16.8276 205.29 16.5281 203.696 16.1295C202.161 15.7707 200.744 15.2117 200.744 13.378C200.744 11.3441 202.518 10.4467 204.294 10.4467C205.709 10.4467 207.066 11.0048 207.764 12.0422L206.726 12.8793C206.208 12.1015 205.351 11.6231 204.273 11.6231C203.296 11.6231 202.12 12.0422 202.12 13.2186C202.12 14.395 202.997 14.6741 204.573 15.0532C206.567 15.5121 207.903 16.2102 207.903 17.9845C207.903 20.1584 206.088 21.1152 204.134 21.1152C202.619 21.1152 201.163 20.5172 200.245 19.3408L200.246 19.3389Z" fill="#F72A48"/><path d="M209.02 15.7494C209.02 12.6383 211.213 10.4449 214.085 10.4449C217.136 10.4449 218.891 12.6188 218.891 15.5501C218.891 15.73 218.891 15.9293 218.871 16.1286H210.516C210.556 18.1023 211.992 19.897 214.225 19.897C215.661 19.897 216.758 19.2194 217.456 18.2423L218.473 19.0794C217.416 20.4551 216.02 21.1133 214.225 21.1133C211.194 21.1133 209.021 18.9394 209.021 15.7494H209.02ZM217.415 15.0319C217.355 13.0582 216.178 11.6222 214.085 11.6222C211.992 11.6222 210.596 13.4763 210.516 15.0319H217.416H217.415Z" fill="#F72A48"/><path d="M220.088 18.0624C220.088 15.1116 223.577 14.6722 226.489 14.6722H227.187V14.2133C227.187 12.4584 226.07 11.6407 224.436 11.6407C223.279 11.6407 222.202 12.1191 221.485 12.8375L220.707 11.8799C221.664 10.9825 223.08 10.4439 224.536 10.4439C227.228 10.4439 228.584 11.9791 228.584 14.3125V18.7196C228.584 19.4372 228.643 20.3151 228.764 20.8333H227.408C227.328 20.3346 227.248 19.5568 227.248 19.0385H227.188C226.51 20.3948 225.194 21.1123 223.638 21.1123C222.083 21.1123 220.089 20.2752 220.089 18.0614L220.088 18.0624ZM227.186 16.4475V15.7698H226.309C224.255 15.7698 221.564 16.0294 221.564 18.0429C221.564 19.4789 222.84 19.9369 223.937 19.9369C226.21 19.9369 227.187 18.2617 227.187 16.4475H227.186Z" fill="#F72A48"/><path d="M231.274 20.8343V13.0369C231.274 12.4584 231.254 11.3617 231.195 10.7239H232.591C232.631 11.2625 232.691 12.2397 232.691 12.7783H232.731C233.289 11.2829 234.565 10.4449 235.962 10.4449C236.181 10.4449 236.42 10.4644 236.62 10.5052L236.56 11.8614C236.36 11.8012 236.101 11.7817 235.882 11.7817C233.728 11.7817 232.751 13.696 232.751 15.5501V20.8343H231.275H231.274Z" fill="#F72A48"/><path d="M236.619 15.7893C236.619 12.6383 238.872 10.4449 241.903 10.4449C243.299 10.4449 244.715 11.003 245.532 12.0005L244.455 12.8775C243.916 12.1599 242.939 11.6806 241.922 11.6806C239.549 11.6806 238.154 13.595 238.154 15.7884C238.154 17.9818 239.55 19.8961 241.943 19.8961C243 19.8961 243.956 19.4771 244.595 18.7596L245.572 19.6569C244.695 20.6136 243.398 21.1124 241.943 21.1124C238.892 21.1124 236.619 18.9783 236.619 15.7884V15.7893Z" fill="#F72A48"/><path d="M246.909 20.8342V5.23948H248.364V12.679H248.404C248.923 11.3431 250.338 10.4458 251.894 10.4458C254.565 10.4458 255.603 12.4194 255.603 14.6137V20.8351H254.147V15.0921C254.147 13.4373 253.649 11.7019 251.555 11.7019C249.74 11.7019 248.364 13.1972 248.364 15.5899V20.8342H246.909Z" fill="#F72A48"/><path d="M37.0345 18.9349L39.0453 17.0679C39.7841 18.1145 41.1181 18.8534 42.5133 18.8534C43.8066 18.8534 45.263 18.1757 45.263 16.5756C45.263 14.9755 43.9085 14.5435 42.2464 13.9901L41.6308 13.8056C39.4346 13.0871 37.6705 12.0609 37.6705 9.37248C37.6705 6.10928 40.6055 4.73447 43.2726 4.73447C45.161 4.73447 46.9669 5.45293 48.0951 6.62286L46.1863 8.51125C45.5503 7.62871 44.4212 7.07433 43.1901 7.07433C41.959 7.07433 40.5017 7.71029 40.5017 9.22878C40.5017 10.624 41.6299 11.0755 43.128 11.5686L43.7435 11.7531C46.2679 12.5532 48.1145 13.5386 48.1145 16.3086C48.1145 19.6534 45.3649 21.234 42.4707 21.234C40.3978 21.234 38.3046 20.4136 37.0327 18.9359L37.0345 18.9349Z" fill="#F72A48"/><path d="M49.7128 26V10.4053H52.2455V11.9006H52.3057C53.0038 10.8632 54.3397 10.1253 55.8952 10.1253C59.0064 10.1253 61.0209 12.5977 61.0209 15.5893C61.0209 18.5809 59.0463 21.1136 55.8758 21.1136C54.4796 21.1136 53.1234 20.5156 52.3854 19.4384H52.3252V25.9991H49.7128V26ZM58.427 15.5902C58.427 13.8548 57.3498 12.2603 55.3158 12.2603C53.4414 12.2603 52.1852 13.8557 52.1852 15.6106C52.1852 17.3655 53.4414 18.9406 55.3158 18.9406C57.3498 18.9406 58.427 17.3451 58.427 15.5902Z" fill="#F72A48"/><path d="M62.174 15.6301C62.174 12.34 64.5667 10.0864 67.6584 10.0864C70.7501 10.0864 72.784 12.2603 72.784 15.5708C72.784 15.8303 72.784 16.089 72.7636 16.3282H64.767C64.8272 17.8837 66.1826 19.0806 67.7984 19.0806C69.0749 19.0806 70.0122 18.4428 70.5508 17.665L72.3854 18.9415C71.3082 20.4174 69.7331 21.1553 67.7585 21.1553C64.6279 21.1553 62.175 19.0018 62.175 15.631L62.174 15.6301ZM70.2903 14.5927C70.2504 13.1373 69.3734 11.9998 67.6779 11.9998C65.9823 11.9998 64.8662 13.1966 64.7466 14.5927H70.2903Z" fill="#F72A48"/><path d="M73.9596 15.6301C73.9596 12.34 76.3523 10.0864 79.444 10.0864C82.5357 10.0864 84.5696 12.2603 84.5696 15.5708C84.5696 15.8303 84.5696 16.089 84.5502 16.3282H76.5535C76.6137 17.8837 77.9691 19.0806 79.5849 19.0806C80.8615 19.0806 81.7987 18.4428 82.3373 17.665L84.1719 18.9415C83.0947 20.4174 81.5197 21.1553 79.5451 21.1553C76.4144 21.1553 73.9615 19.0018 73.9615 15.631L73.9596 15.6301ZM82.0768 14.5927C82.0369 13.1373 81.159 11.9998 79.4644 11.9998C77.7698 11.9998 76.6527 13.1966 76.5331 14.5927H82.0768Z" fill="#F72A48"/><path d="M85.7414 15.5902C85.7414 12.5986 87.7559 10.1262 90.8865 10.1262C92.4217 10.1262 93.6788 10.8641 94.3768 11.8014H94.4371V5.2407H97.03V20.8354H94.5771V19.3002H94.5372C93.7798 20.4767 92.3234 21.1154 90.9078 21.1154C87.6975 21.1154 85.7423 18.5827 85.7423 15.5911L85.7414 15.5902ZM94.5752 15.6097C94.5752 13.8548 93.3191 12.2593 91.4242 12.2593C89.4097 12.2593 88.3529 13.8548 88.3529 15.5893C88.3529 17.3238 89.4097 18.9396 91.4242 18.9396C93.3191 18.9396 94.5752 17.384 94.5752 15.6097Z" fill="#F72A48"/><path d="M98.2973 17.8633C98.2973 14.8319 101.847 14.3331 105.157 14.3331H105.297V14.0939C105.297 12.7581 104.381 12.1193 103.024 12.1193C101.907 12.1193 100.871 12.5977 100.213 13.2559L98.8563 11.7402C99.9335 10.7028 101.548 10.0854 103.263 10.0854C106.474 10.0854 107.771 12.0201 107.771 14.4527V18.96C107.771 19.5978 107.811 20.3561 107.89 20.8345H105.537C105.458 20.4155 105.378 19.9167 105.378 19.4986H105.338C104.621 20.536 103.464 21.0941 102.028 21.0941C100.392 21.0941 98.2982 20.2764 98.2982 17.8633H98.2973ZM105.358 16.507V16.0083H104.899C103.004 16.0083 100.771 16.228 100.771 17.7836C100.771 18.8803 101.768 19.2196 102.685 19.2196C104.381 19.2196 105.358 18.083 105.358 16.507Z" fill="#F72A48"/><path d="M27.7594 6.12776C27.7594 2.74498 23.6016 0.00278113 18.5613 0H11.3869L16.4541 2.02559C15.49 2.22954 14.5546 2.64578 13.7202 3.28452L5.24058 10.3996H8.28221L22.859 24.9764C23.5145 25.6318 24.4026 25.9989 25.3287 25.9989H27.5962L21.6326 20.0353V16.4411C21.6326 14.0521 24.0327 11.5083 26.633 11.5083C28.5149 11.5083 29.4615 13.1548 28.3397 14.8559C30.1447 14.0086 31.3165 12.9452 31.7346 11.3813C32.3409 9.11655 30.3023 6.61817 27.7603 6.12683L27.7594 6.12776Z" fill="#F72A48"/><path d="M2.69122 13.7425L6.43555 15.2397L16.1723 24.9764C16.8277 25.6318 17.7158 25.9999 18.6419 25.9999H20.9095L8.65212 13.7425H2.69029H2.69122Z" fill="#F72A48"/><path d="M0 17.828L3.89637 19.3864L9.48644 24.9765C10.1419 25.6319 11.03 25.9999 11.9561 25.9999H14.2236L6.05267 17.828H0Z" fill="#F72A48"/></svg>',
  "inverse:false|logoLanguage:en|symbol:true|type:null": '<svg width="108" height="26" viewBox="0 0 108 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.0347 18.9349L39.0455 17.0678C39.7843 18.1145 41.1183 18.8533 42.5135 18.8533C43.8068 18.8533 45.2632 18.1756 45.2632 16.5756C45.2632 14.9755 43.9088 14.5435 42.2466 13.99L41.631 13.8055C39.4348 13.0871 37.6706 12.0608 37.6706 9.3724C37.6706 6.10919 40.6057 4.73438 43.2728 4.73438C45.1612 4.73438 46.9671 5.45284 48.0953 6.62277L46.1865 8.51117C45.5506 7.62862 44.4214 7.07425 43.1903 7.07425C41.9592 7.07425 40.5019 7.7102 40.5019 9.2287C40.5019 10.6239 41.6301 11.0754 43.1282 11.5686L43.7437 11.7531C46.2681 12.5531 48.1148 13.5386 48.1148 16.3086C48.1148 19.6534 45.3652 21.234 42.4709 21.234C40.398 21.234 38.3047 20.4135 37.0328 18.9358L37.0347 18.9349Z" fill="#F72A48"/><path d="M49.713 26V10.4052H52.2457V11.9005H52.306C53.004 10.8632 54.3399 10.1252 55.8955 10.1252C59.0067 10.1252 61.0211 12.5977 61.0211 15.5893C61.0211 18.5809 59.0465 21.1135 55.876 21.1135C54.4799 21.1135 53.1236 20.5156 52.3857 19.4384H52.3254V25.9991H49.713V26ZM58.4273 15.5902C58.4273 13.8548 57.35 12.2602 55.3161 12.2602C53.4416 12.2602 52.1854 13.8557 52.1854 15.6106C52.1854 17.3655 53.4416 18.9405 55.3161 18.9405C57.35 18.9405 58.4273 17.3451 58.4273 15.5902Z" fill="#F72A48"/><path d="M62.1743 15.6301C62.1743 12.34 64.567 10.0863 67.6587 10.0863C70.7504 10.0863 72.7844 12.2602 72.7844 15.5707C72.7844 15.8303 72.7844 16.0889 72.764 16.3281H64.7673C64.8275 17.8837 66.1829 19.0805 67.7987 19.0805C69.0753 19.0805 70.0125 18.4427 70.5511 17.6649L72.3858 18.9415C71.3085 20.4173 69.7335 21.1553 67.7589 21.1553C64.6282 21.1553 62.1752 19.0017 62.1752 15.631L62.1743 15.6301ZM70.2906 14.5927C70.2508 13.1372 69.3738 11.9997 67.6782 11.9997C65.9826 11.9997 64.8665 13.1966 64.7469 14.5927H70.2906Z" fill="#F72A48"/><path d="M73.9608 15.6301C73.9608 12.34 76.3535 10.0863 79.4452 10.0863C82.5369 10.0863 84.5709 12.2602 84.5709 15.5707C84.5709 15.8303 84.5709 16.0889 84.5514 16.3281H76.5547C76.615 17.8837 77.9703 19.0805 79.5861 19.0805C80.8627 19.0805 81.7999 18.4427 82.3385 17.6649L84.1732 18.9415C83.0959 20.4173 81.5209 21.1553 79.5463 21.1553C76.4156 21.1553 73.9627 19.0017 73.9627 15.631L73.9608 15.6301ZM82.0771 14.5927C82.0373 13.1372 81.1593 11.9997 79.4647 11.9997C77.7701 11.9997 76.653 13.1966 76.5334 14.5927H82.0771Z" fill="#F72A48"/><path d="M85.7418 15.5902C85.7418 12.5986 87.7563 10.1261 90.8869 10.1261C92.4221 10.1261 93.6792 10.8641 94.3773 11.8013H94.4375V5.2406H97.0305V20.8354H94.5775V19.3002H94.5377C93.7803 20.4766 92.3239 21.1154 90.9083 21.1154C87.6979 21.1154 85.7427 18.5827 85.7427 15.5911L85.7418 15.5902ZM94.5766 15.6096C94.5766 13.8547 93.3204 12.2593 91.4255 12.2593C89.4111 12.2593 88.3542 13.8547 88.3542 15.5892C88.3542 17.3237 89.4111 18.9396 91.4255 18.9396C93.3204 18.9396 94.5766 17.384 94.5766 15.6096Z" fill="#F72A48"/><path d="M98.2986 17.8633C98.2986 14.8318 101.848 14.3331 105.159 14.3331H105.299V14.0939C105.299 12.758 104.382 12.1193 103.026 12.1193C101.909 12.1193 100.872 12.5976 100.214 13.2558L98.8576 11.7401C99.9348 10.7027 101.55 10.0853 103.265 10.0853C106.475 10.0853 107.772 12.0201 107.772 14.4527V18.96C107.772 19.5978 107.812 20.3561 107.892 20.8345H105.539C105.459 20.4154 105.379 19.9167 105.379 19.4986H105.34C104.622 20.5359 103.465 21.094 102.029 21.094C100.394 21.094 98.2995 20.2764 98.2995 17.8633H98.2986ZM105.358 16.507V16.0082H104.899C103.004 16.0082 100.771 16.228 100.771 17.7835C100.771 18.8802 101.769 19.2195 102.685 19.2195C104.381 19.2195 105.358 18.083 105.358 16.507Z" fill="#F72A48"/><path d="M27.7595 6.12779C27.7595 2.74499 23.6017 0.00278114 18.5614 0H11.3869L16.4542 2.0256C15.49 2.22955 14.5547 2.6458 13.7203 3.28453L5.2406 10.3996H8.28225L22.8592 24.9765C23.5146 25.632 24.4027 25.9991 25.3288 25.9991H27.5964L21.6327 20.0354V16.4412C21.6327 14.0522 24.0328 11.5084 26.6332 11.5084C28.5151 11.5084 29.4616 13.1548 28.3399 14.8559C30.1448 14.0086 31.3166 12.9453 31.7347 11.3814C32.341 9.11659 30.3024 6.6182 27.7605 6.12686L27.7595 6.12779Z" fill="#F72A48"/><path d="M2.69123 13.7426L6.43558 15.2397L16.1724 24.9765C16.8278 25.6319 17.7159 26 18.642 26H20.9096L8.65216 13.7426H2.69031H2.69123Z" fill="#F72A48"/><path d="M0 17.828L3.89638 19.3864L9.48649 24.9765C10.1419 25.6319 11.03 25.9999 11.9561 25.9999H14.2237L6.0527 17.828H0Z" fill="#F72A48"/></svg>',
  "inverse:false|logoLanguage:zh|symbol:false|type:null": '<svg width="134" height="20" viewBox="0 0 134 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_655)"><path d="M1.04199 0V3.126H2.08399V10.418H19.168V0H1.04199ZM4.74999 2.292H9.47999V4.272H4.74999V2.292ZM4.74999 6.146H9.47999V8.126H4.74999V6.146ZM16.5 8.124H11.77V6.144H16.5V8.124ZM16.5 4.27H11.77V2.29H16.5V4.27Z" fill="black"/><path d="M15.0879 11.876L16.8919 15H19.5379L17.7339 11.876H15.0879Z" fill="black"/><path d="M15.4041 15L13.6001 11.876H10.9541L12.7581 15H15.4041Z" fill="black"/><path d="M2.76 20L4.77 12.5H2.01L0 20H2.76Z" fill="black"/><path d="M17.708 16.584V17.416H8.49998V14.374H9.41598V12.5H5.83398V18.124L7.70798 20H18.958L20.834 18.124V16.584H17.708Z" fill="black"/><path d="M68.8599 7.99L68.5099 8.342L62.2659 14.584H65.8019L70.2759 10.108L74.7519 14.584H78.2879L71.3599 7.658V6.042H75.9439V3.75H71.3599V1.874H72.2779V0H68.8599V3.75H64.2779V6.042H68.8599V7.99Z" fill="black"/><path d="M62.17 3.124L59.046 0H55.804L58.93 3.124H62.17Z" fill="black"/><path d="M75.152 17.416H62.482L60.986 14.824V5H56.194V7.5H58.278V15.6L53.876 20H57.412L59.742 17.67L61.088 20H61.946H76.402L78.278 18.126V16.584H75.152V17.416Z" fill="black"/><path d="M28.53 14.584L30.186 8.40601H27.426L25.77 14.584H28.53Z" fill="black"/><path d="M40.3521 0.00195312H32.9101L30.7881 2.29395H38.2281L40.3521 0.00195312Z" fill="black"/><path d="M45.142 17.418H36.186V12.722L46.196 2.71H48.268V0H45.166L36.186 8.98V5.874H37.102V4H33.478V11.688L29.056 16.11V16.114H29.052L25.166 20H28.908L33.478 15.43V18.126L35.352 20H46.392L48.268 18.126V16.584H45.142V17.418Z" fill="black"/><path d="M47.434 14.584L45.76 8.33398H43L44.674 14.584H47.434Z" fill="black"/><path d="M91.7539 7.952C91.5679 7.716 91.3259 7.528 91.0259 7.388C90.7259 7.248 90.4379 7.18 90.1599 7.18C90.0159 7.18 89.8699 7.192 89.7239 7.218C89.5759 7.244 89.4439 7.292 89.3259 7.364C89.2079 7.436 89.1079 7.528 89.0279 7.642C88.9479 7.756 88.9079 7.902 88.9079 8.078C88.9079 8.23 88.9399 8.356 89.0019 8.458C89.0659 8.56 89.1579 8.648 89.2799 8.724C89.4019 8.8 89.5479 8.87 89.7159 8.932C89.8839 8.996 90.0739 9.06 90.2859 9.128C90.5899 9.23 90.9059 9.342 91.2359 9.464C91.5659 9.586 91.8639 9.748 92.1339 9.952C92.4039 10.154 92.6279 10.406 92.8039 10.706C92.9819 11.006 93.0699 11.378 93.0699 11.826C93.0699 12.34 92.9759 12.786 92.7859 13.162C92.5959 13.538 92.3399 13.848 92.0199 14.092C91.6999 14.336 91.3319 14.518 90.9179 14.636C90.5039 14.754 90.0779 14.814 89.6399 14.814C88.9979 14.814 88.3779 14.702 87.7799 14.478C87.1799 14.254 86.6839 13.936 86.2859 13.522L87.7039 12.08C87.9239 12.35 88.2119 12.576 88.5699 12.758C88.9279 12.94 89.2859 13.03 89.6399 13.03C89.7999 13.03 89.9559 13.014 90.1079 12.98C90.2599 12.946 90.3919 12.892 90.5059 12.816C90.6199 12.74 90.7099 12.638 90.7779 12.512C90.8459 12.386 90.8799 12.234 90.8799 12.056C90.8799 11.878 90.8379 11.744 90.7539 11.626C90.6699 11.508 90.5499 11.4 90.3939 11.304C90.2379 11.208 90.0439 11.118 89.8119 11.038C89.5799 10.958 89.3159 10.872 89.0219 10.778C88.7359 10.686 88.4539 10.576 88.1799 10.448C87.9059 10.322 87.6619 10.16 87.4459 9.96C87.2299 9.762 87.0579 9.522 86.9279 9.238C86.7979 8.956 86.7319 8.612 86.7319 8.206C86.7319 7.708 86.8339 7.282 87.0359 6.928C87.2379 6.574 87.5039 6.282 87.8339 6.054C88.1639 5.826 88.5339 5.66 88.9479 5.554C89.3619 5.448 89.7779 5.396 90.1999 5.396C90.7059 5.396 91.2219 5.488 91.7499 5.674C92.2779 5.86 92.7399 6.134 93.1359 6.496L91.7559 7.952H91.7539Z" fill="black"/><path d="M101.434 10.148C101.296 9.746 101.098 9.394 100.84 9.09C100.582 8.786 100.266 8.546 99.8958 8.37C99.5238 8.192 99.1098 8.104 98.6538 8.104C98.1978 8.104 97.7878 8.198 97.4458 8.388C97.1038 8.578 96.8358 8.8 96.6438 9.054H96.6038V8.282H94.6318V17.704L96.7078 17.19V13.888H96.7338C96.9258 14.158 97.1958 14.37 97.5418 14.528C97.8878 14.682 98.2558 14.764 98.6438 14.764C99.1178 14.764 99.5378 14.67 99.9078 14.484C100.28 14.3 100.594 14.054 100.852 13.744C101.11 13.438 101.306 13.082 101.442 12.674C101.576 12.27 101.642 11.848 101.642 11.41C101.642 10.972 101.574 10.55 101.432 10.152L101.434 10.148ZM99.5358 12.008C99.4718 12.206 99.3818 12.38 99.2578 12.532C99.1338 12.684 98.9818 12.804 98.7958 12.9C98.6098 12.992 98.3938 13.038 98.1498 13.038C97.9058 13.038 97.7018 12.992 97.5158 12.9C97.3298 12.806 97.1718 12.684 97.0418 12.532C96.9098 12.38 96.8098 12.206 96.7378 12.014C96.6658 11.82 96.6298 11.622 96.6298 11.418C96.6298 11.214 96.6678 11.02 96.7378 10.824C96.8098 10.63 96.9098 10.456 97.0418 10.306C97.1718 10.154 97.3278 10.03 97.5158 9.938C97.7018 9.844 97.9118 9.798 98.1498 9.798C98.3878 9.798 98.6078 9.844 98.7958 9.938C98.9818 10.03 99.1338 10.15 99.2578 10.3C99.3818 10.446 99.4738 10.618 99.5358 10.81C99.5998 11.004 99.6298 11.202 99.6298 11.406C99.6298 11.61 99.5978 11.808 99.5358 12.008Z" fill="black"/><path d="M109.6 11.508V11.762C109.6 11.8461 109.596 11.926 109.588 12.002H105.02C105.036 12.18 105.09 12.34 105.178 12.482C105.266 12.626 105.38 12.75 105.52 12.856C105.66 12.962 105.816 13.0441 105.988 13.1021C106.16 13.1621 106.34 13.19 106.526 13.19C106.856 13.19 107.134 13.128 107.362 13.006C107.59 12.884 107.776 12.726 107.918 12.532L109.36 13.444C109.064 13.8741 108.674 14.2061 108.19 14.4381C107.704 14.6701 107.142 14.786 106.5 14.786C106.028 14.786 105.58 14.712 105.158 14.564C104.736 14.416 104.368 14.202 104.05 13.918C103.734 13.636 103.484 13.2881 103.304 12.8741C103.122 12.4601 103.032 11.988 103.032 11.456C103.032 10.924 103.12 10.476 103.298 10.058C103.476 9.64005 103.716 9.28605 104.02 8.99405C104.324 8.70205 104.682 8.47805 105.096 8.31605C105.51 8.15605 105.956 8.07605 106.438 8.07605C106.92 8.07605 107.328 8.15405 107.716 8.31005C108.104 8.46605 108.438 8.69205 108.716 8.98805C108.994 9.28405 109.212 9.64205 109.368 10.064C109.524 10.486 109.602 10.966 109.602 11.506L109.6 11.508ZM107.69 10.71C107.69 10.38 107.586 10.098 107.38 9.86205C107.174 9.62605 106.864 9.50805 106.45 9.50805C106.248 9.50805 106.062 9.54005 105.894 9.60205C105.726 9.66605 105.578 9.75205 105.452 9.86205C105.326 9.97205 105.224 10.1 105.148 10.248C105.072 10.396 105.03 10.55 105.022 10.71H107.692H107.69Z" fill="black"/><path d="M117.584 11.508V11.762C117.584 11.8461 117.58 11.926 117.572 12.002H113.004C113.02 12.18 113.074 12.34 113.162 12.482C113.25 12.626 113.364 12.75 113.504 12.856C113.644 12.962 113.8 13.0441 113.972 13.1021C114.144 13.1621 114.324 13.19 114.51 13.19C114.84 13.19 115.118 13.128 115.346 13.006C115.574 12.884 115.76 12.726 115.902 12.532L117.344 13.444C117.048 13.8741 116.658 14.2061 116.174 14.4381C115.688 14.6701 115.126 14.786 114.484 14.786C114.012 14.786 113.564 14.712 113.142 14.564C112.72 14.416 112.352 14.202 112.034 13.918C111.718 13.636 111.468 13.2881 111.288 12.8741C111.106 12.4601 111.016 11.988 111.016 11.456C111.016 10.924 111.104 10.476 111.282 10.058C111.46 9.64005 111.7 9.28605 112.004 8.99405C112.308 8.70205 112.666 8.47805 113.08 8.31605C113.494 8.15605 113.94 8.07605 114.422 8.07605C114.904 8.07605 115.312 8.15405 115.7 8.31005C116.088 8.46605 116.422 8.69205 116.7 8.98805C116.978 9.28405 117.196 9.64205 117.352 10.064C117.508 10.486 117.586 10.966 117.586 11.506L117.584 11.508ZM115.672 10.71C115.672 10.38 115.568 10.098 115.362 9.86205C115.156 9.62605 114.846 9.50805 114.432 9.50805C114.23 9.50805 114.044 9.54005 113.876 9.60205C113.708 9.66605 113.56 9.75205 113.434 9.86205C113.308 9.97205 113.206 10.1 113.13 10.248C113.054 10.396 113.012 10.55 113.004 10.71H115.674H115.672Z" fill="black"/><path d="M123.924 5.21603V8.95203H123.898C123.72 8.74003 123.47 8.54403 123.15 8.37003C122.828 8.19203 122.438 8.10403 121.974 8.10403C121.51 8.10403 121.106 8.19203 120.738 8.37003C120.37 8.54403 120.062 8.78603 119.804 9.09003C119.546 9.39403 119.348 9.74603 119.208 10.148C119.07 10.546 119.002 10.968 119.002 11.406C119.002 11.844 119.068 12.266 119.202 12.67C119.336 13.078 119.534 13.432 119.79 13.74C120.048 14.05 120.364 14.296 120.734 14.48C121.106 14.666 121.528 14.76 122.002 14.76C122.424 14.76 122.822 14.672 123.198 14.5C123.574 14.328 123.86 14.082 124.064 13.76H124.09V14.582H126V4.70203L123.928 5.21603H123.924ZM123.902 12.014C123.83 12.206 123.73 12.382 123.598 12.532C123.466 12.684 123.308 12.804 123.122 12.9C122.938 12.992 122.726 13.038 122.492 13.038C122.246 13.038 122.03 12.992 121.846 12.9C121.66 12.806 121.502 12.684 121.376 12.532C121.25 12.38 121.156 12.206 121.092 12.008C121.028 11.808 120.998 11.606 120.998 11.406C120.998 11.206 121.03 11.004 121.092 10.81C121.156 10.618 121.25 10.446 121.376 10.3C121.502 10.15 121.66 10.03 121.846 9.93803C122.03 9.84403 122.244 9.79803 122.492 9.79803C122.74 9.79803 122.94 9.84403 123.122 9.93803C123.308 10.03 123.466 10.154 123.598 10.306C123.73 10.458 123.83 10.63 123.902 10.824C123.974 11.018 124.008 11.216 124.008 11.418C124.008 11.62 123.974 11.82 123.902 12.014Z" fill="black"/><path d="M127.888 9.14005C128.26 8.78605 128.692 8.52005 129.186 8.34205C129.68 8.16405 130.184 8.07605 130.698 8.07605C131.212 8.07605 131.678 8.14205 132.046 8.27205C132.412 8.40205 132.71 8.60605 132.938 8.88005C133.166 9.15405 133.332 9.50005 133.438 9.91805C133.544 10.336 133.596 10.832 133.596 11.406V14.5821H131.698V13.912H131.66C131.5 14.174 131.256 14.376 130.932 14.52C130.608 14.664 130.254 14.736 129.876 14.736C129.622 14.736 129.362 14.702 129.092 14.634C128.822 14.566 128.576 14.456 128.352 14.304C128.128 14.152 127.944 13.9501 127.802 13.6961C127.658 13.4421 127.586 13.13 127.586 12.76C127.586 12.304 127.71 11.938 127.96 11.658C128.208 11.38 128.53 11.164 128.922 11.012C129.314 10.86 129.75 10.758 130.232 10.708C130.712 10.658 131.182 10.632 131.636 10.632V10.5301C131.636 10.2181 131.526 9.98805 131.306 9.84005C131.086 9.69205 130.816 9.61805 130.496 9.61805C130.2 9.61805 129.916 9.68205 129.642 9.80805C129.368 9.93405 129.134 10.086 128.94 10.264L127.89 9.13805L127.888 9.14005ZM131.698 11.836H131.432C131.204 11.836 130.974 11.846 130.742 11.868C130.51 11.89 130.304 11.93 130.122 11.988C129.94 12.048 129.79 12.134 129.672 12.2481C129.554 12.3621 129.494 12.5121 129.494 12.6981C129.494 12.8161 129.522 12.9181 129.576 13.002C129.63 13.0861 129.7 13.154 129.784 13.204C129.868 13.254 129.966 13.29 130.076 13.312C130.186 13.334 130.292 13.344 130.392 13.344C130.814 13.344 131.136 13.2281 131.36 12.9961C131.584 12.7641 131.696 12.45 131.696 12.054V11.838L131.698 11.836Z" fill="black"/></g><defs><clipPath id="clip0_1_655"><rect width="133.596" height="20" fill="white"/></clipPath></defs></svg>',
  "inverse:true|logoLanguage:en|symbol:false|type:null": '<svg width="71" height="27" viewBox="0 0 71 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.00185488 19.2035L2.01304 17.336C2.75205 18.3829 4.08635 19.1219 5.48185 19.1219C6.77535 19.1219 8.23205 18.4441 8.23205 16.8437C8.23205 15.2432 6.87735 14.8112 5.2148 14.2576L4.59912 14.0731C2.40248 13.3545 0.637942 12.328 0.637942 9.63901C0.637942 6.37512 3.57359 5 6.24126 5C8.13005 5 9.93632 5.71862 11.0648 6.8888L9.15558 8.7776C8.51949 7.89487 7.39011 7.34038 6.15874 7.34038C4.92736 7.34038 3.46974 7.97644 3.46974 9.49526C3.46974 10.8908 4.59819 11.3424 6.09661 11.8356L6.7123 12.0201C9.23718 12.8203 11.0842 13.806 11.0842 16.5766C11.0842 19.9221 8.33404 21.503 5.4392 21.503C3.36589 21.503 1.27218 20.6824 0 19.2044L0.00185488 19.2035Z" fill="white"/><path d="M12.6829 26.27V10.672H15.2161V12.1676H15.2764C15.9746 11.13 17.3107 10.392 18.8666 10.392C21.9785 10.392 23.9934 12.8649 23.9934 15.8571C23.9934 18.8493 22.0183 21.3825 18.8472 21.3825C17.4507 21.3825 16.0942 20.7845 15.3561 19.707H15.2958V26.2691H12.6829V26.27ZM21.3999 15.858C21.3999 14.1222 20.3224 12.5274 18.288 12.5274C16.4132 12.5274 15.1567 14.1232 15.1567 15.8784C15.1567 17.6337 16.4132 19.2091 18.288 19.2091C20.3224 19.2091 21.3999 17.6133 21.3999 15.858Z" fill="white"/><path d="M25.1477 15.8978C25.1477 12.6071 27.5409 10.3529 30.6333 10.3529C33.7256 10.3529 35.76 12.5273 35.76 15.8385C35.76 16.0981 35.76 16.3568 35.7396 16.596H27.7412C27.8015 18.1519 29.1571 19.349 30.7733 19.349C32.0501 19.349 32.9875 18.7111 33.5263 17.9331L35.3613 19.2099C34.2838 20.6861 32.7084 21.4242 30.7334 21.4242C27.6021 21.4242 25.1486 19.2702 25.1486 15.8987L25.1477 15.8978ZM33.2657 14.8603C33.2258 13.4045 32.3487 12.2667 30.6527 12.2667C28.9568 12.2667 27.8404 13.4638 27.7208 14.8603H33.2657Z" fill="white"/><path d="M36.9358 15.8978C36.9358 12.6071 39.329 10.3529 42.4214 10.3529C45.5137 10.3529 47.5481 12.5273 47.5481 15.8385C47.5481 16.0981 47.5481 16.3568 47.5286 16.596H39.5302C39.5905 18.1519 40.9461 19.349 42.5623 19.349C43.8391 19.349 44.7765 18.7111 45.3153 17.9331L47.1503 19.2099C46.0728 20.6861 44.4974 21.4242 42.5224 21.4242C39.3911 21.4242 36.9376 19.2702 36.9376 15.8987L36.9358 15.8978ZM45.0538 14.8603C45.0139 13.4045 44.1358 12.2667 42.4408 12.2667C40.7458 12.2667 39.6285 13.4638 39.5089 14.8603H45.0538Z" fill="white"/><path d="M48.719 15.858C48.719 12.8658 50.7339 10.3928 53.8652 10.3928C55.4007 10.3928 56.658 11.1309 57.3562 12.0683H57.4165V5.50623H60.01V21.1043H57.5565V19.5688H57.5167C56.7591 20.7455 55.3024 21.3843 53.8865 21.3843C50.6755 21.3843 48.7199 18.8511 48.7199 15.8589L48.719 15.858ZM57.5556 15.8774C57.5556 14.1222 56.2992 12.5264 54.4039 12.5264C52.389 12.5264 51.332 14.1222 51.332 15.8571C51.332 17.5919 52.389 19.2081 54.4039 19.2081C56.2992 19.2081 57.5556 17.6522 57.5556 15.8774Z" fill="white"/><path d="M61.2786 18.1316C61.2786 15.0995 64.829 14.6007 68.1402 14.6007H68.2802V14.3614C68.2802 13.0253 67.3631 12.3864 66.0066 12.3864C64.8892 12.3864 63.8526 12.8648 63.1942 13.5232L61.8377 12.0072C62.9151 10.9696 64.5304 10.3521 66.2458 10.3521C69.4568 10.3521 70.754 12.2872 70.754 14.7203V19.2285C70.754 19.8665 70.7939 20.6249 70.8737 21.1034H68.5203C68.4406 20.6843 68.3608 20.1854 68.3608 19.7673H68.321C67.6033 20.8048 66.4461 21.363 65.0098 21.363C63.3741 21.363 61.2795 20.5452 61.2795 18.1316H61.2786ZM68.3395 16.7751V16.2762H67.8805C65.9852 16.2762 63.7515 16.496 63.7515 18.0519C63.7515 19.1488 64.7492 19.4881 65.6663 19.4881C67.3622 19.4881 68.3395 18.3514 68.3395 16.7751Z" fill="white"/></svg>',
  "inverse:true|logoLanguage:en|symbol:true|type:ai-agent": '<svg width="192" height="26" viewBox="0 0 192 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M121.313 5.56238L127.755 20.7723H126.045L124.394 16.8155H116.601L114.951 20.7723H113.261L119.862 5.56238H121.314H121.313ZM117.157 15.4642H123.857L120.537 7.25289L117.157 15.4642Z" fill="white"/><path d="M128.987 20.7732V5.56323H130.518V20.7732H128.987Z" fill="white"/><path d="M143.8 5.56238L150.242 20.7723H148.532L146.881 16.8155H139.088L137.437 20.7723H135.747L142.348 5.56238H143.8ZM139.644 15.4642H146.345L143.024 7.25289L139.644 15.4642Z" fill="white"/><path d="M150.996 24.1533L151.93 23.0396C152.885 24.1136 154.316 24.7291 155.768 24.7291C158.73 24.7291 159.645 22.6809 159.645 20.3351V18.7444H159.586C158.85 20.1558 157.28 20.9313 155.689 20.9313C152.667 20.9313 150.639 18.6446 150.639 15.7017C150.639 12.7588 152.648 10.413 155.669 10.413C157.279 10.413 158.83 11.1884 159.645 12.719H159.685V10.6912H161.096V20.2344C161.096 23.2762 159.765 26 155.748 26C153.958 26 152.169 25.3244 150.996 24.1505V24.1533ZM159.744 15.6832C159.744 13.476 158.154 11.6275 155.887 11.6275C153.621 11.6275 152.129 13.4964 152.129 15.6832C152.129 17.8701 153.54 19.7195 155.887 19.7195C158.234 19.7195 159.744 17.9107 159.744 15.6832Z" fill="white"/><path d="M163.163 15.7026C163.163 12.6007 165.35 10.4138 168.213 10.4138C171.255 10.4138 173.005 12.5813 173.005 15.5038C173.005 15.6831 173.005 15.8819 172.986 16.0806H164.655C164.695 18.0493 166.126 19.8387 168.353 19.8387C169.785 19.8387 170.878 19.1631 171.574 18.1889L172.588 19.0244C171.534 20.396 170.142 21.0523 168.353 21.0523C165.331 21.0523 163.163 18.8848 163.163 15.7035V15.7026ZM171.534 14.9872C171.475 13.0184 170.301 11.5877 168.214 11.5877C166.127 11.5877 164.734 13.4371 164.655 14.9872H171.534Z" fill="white"/><path d="M175.073 20.7732V12.9991C175.073 12.4223 175.053 11.3289 174.993 10.693H176.385C176.425 11.23 176.484 12.1839 176.484 12.7015H176.524C177.061 11.3492 178.512 10.4148 180.063 10.4148C182.727 10.4148 183.761 12.3835 183.761 14.5704V20.7741H182.31V15.0279C182.31 13.378 181.793 11.6478 179.705 11.6478C177.916 11.6478 176.544 13.1386 176.544 15.5445V20.7741H175.073V20.7732Z" fill="white"/><path d="M186.823 18.1085V11.9048H184.795V10.6921H186.823V7.78894H188.255V10.6921H191.039V11.9048H188.255V17.969C188.255 19.2417 188.811 19.7584 189.825 19.7584C190.203 19.7584 190.64 19.6789 190.978 19.5199L191.039 20.7131C190.621 20.8721 190.044 20.9719 189.508 20.9719C187.719 20.9719 186.824 19.9377 186.824 18.1085H186.823Z" fill="white"/><path d="M36.9232 18.8794L38.9279 17.0179C39.6646 18.0614 40.9946 18.798 42.3857 18.798C43.675 18.798 45.1271 18.1224 45.1271 16.5271C45.1271 14.9318 43.7767 14.5011 42.1195 13.9493L41.5057 13.7653C39.3161 13.049 37.5572 12.0258 37.5572 9.34634C37.5572 6.09288 40.4835 4.72217 43.1426 4.72217C45.0254 4.72217 46.8259 5.43848 47.9508 6.60493L46.0477 8.48768C45.4136 7.60777 44.2878 7.05505 43.0604 7.05505C41.8329 7.05505 40.38 7.68911 40.38 9.20308C40.38 10.5941 41.5048 11.0442 42.9985 11.536L43.6122 11.7199C46.129 12.5175 47.9702 13.5001 47.9702 16.2618C47.9702 19.5966 45.2287 21.1725 42.3441 21.1725C40.2774 21.1725 38.1904 20.3545 36.9222 18.8812L36.9232 18.8794Z" fill="white"/><path d="M49.5636 25.9223V10.3741H52.0887V11.865H52.1488C52.8448 10.8307 54.1767 10.095 55.7276 10.095C58.8295 10.095 60.837 12.56 60.837 15.5427C60.837 18.5253 58.8683 21.0505 55.7073 21.0505C54.3153 21.0505 52.9631 20.4543 52.2283 19.3803H52.1682V25.9214H49.5636V25.9223ZM58.2528 15.5436C58.2528 13.8134 57.1787 12.2236 55.1509 12.2236C53.282 12.2236 52.0296 13.8143 52.0296 15.5639C52.0296 17.3136 53.282 18.8839 55.1509 18.8839C57.1787 18.8839 58.2528 17.2933 58.2528 15.5436Z" fill="white"/><path d="M61.9878 15.5833C61.9878 12.3031 64.3734 10.0562 67.4558 10.0562C70.5383 10.0562 72.5653 12.2236 72.5653 15.5242C72.5653 15.783 72.5653 16.0409 72.5449 16.2793H64.5721C64.6322 17.8303 65.9835 19.0235 67.5945 19.0235C68.8672 19.0235 69.8017 18.3876 70.3387 17.6121L72.1678 18.8849C71.0938 20.3563 69.5234 21.0921 67.5547 21.0921C64.4334 21.0921 61.9878 18.945 61.9878 15.5843V15.5833ZM70.0799 14.55C70.0401 13.0989 69.1658 11.9648 67.4752 11.9648C65.7847 11.9648 64.6719 13.158 64.5527 14.55H70.0799Z" fill="white"/><path d="M73.7382 15.5833C73.7382 12.3031 76.1237 10.0562 79.2062 10.0562C82.2887 10.0562 84.3156 12.2236 84.3156 15.5242C84.3156 15.783 84.3156 16.0409 84.2962 16.2793H76.3234C76.3834 17.8303 77.7347 19.0235 79.3458 19.0235C80.6185 19.0235 81.5529 18.3876 82.09 17.6121L83.9191 18.8849C82.8451 20.3563 81.2747 21.0921 79.306 21.0921C76.1847 21.0921 73.7391 18.945 73.7391 15.5843L73.7382 15.5833ZM81.8311 14.55C81.7914 13.0989 80.9161 11.9648 79.2265 11.9648C77.5369 11.9648 76.4232 13.158 76.304 14.55H81.8311Z" fill="white"/><path d="M85.4849 15.5436C85.4849 12.561 87.4933 10.0959 90.6146 10.0959C92.1452 10.0959 93.3986 10.8317 94.0936 11.7661H94.1537V5.22498H96.7389V20.7732H94.2933V19.2426H94.2535C93.4984 20.4155 92.0463 21.0523 90.6349 21.0523C87.4342 21.0523 85.4849 18.5272 85.4849 15.5446V15.5436ZM94.2923 15.564C94.2923 13.8143 93.0399 12.2236 91.1507 12.2236C89.1422 12.2236 88.0886 13.8143 88.0886 15.5436C88.0886 17.273 89.1422 18.884 91.1507 18.884C93.0399 18.884 94.2923 17.333 94.2923 15.564Z" fill="white"/><path d="M98.0033 17.8109C98.0033 14.7885 101.542 14.2912 104.843 14.2912H104.983V14.0527C104.983 12.7209 104.068 12.084 102.716 12.084C101.602 12.084 100.569 12.561 99.9129 13.2172L98.5606 11.706C99.6346 10.6717 101.245 10.0562 102.955 10.0562C106.155 10.0562 107.449 11.9851 107.449 14.4104V18.9043C107.449 19.5402 107.488 20.2963 107.568 20.7732H105.222C105.142 20.3554 105.063 19.8581 105.063 19.4413H105.023C104.308 20.4756 103.154 21.032 101.723 21.032C100.092 21.032 98.0042 20.2168 98.0042 17.8109H98.0033ZM105.042 16.4586V15.9614H104.584C102.695 15.9614 100.468 16.1804 100.468 17.7314C100.468 18.8248 101.463 19.1631 102.377 19.1631C104.067 19.1631 105.042 18.0299 105.042 16.4586Z" fill="white"/><path d="M27.6767 6.10949C27.6767 2.73679 23.5313 0.00277284 18.506 0H11.353L16.4051 2.01955C15.4438 2.22289 14.5112 2.6379 13.6794 3.27472L5.22498 10.3686H8.25754L22.7909 24.902C23.4444 25.5554 24.3298 25.9214 25.2532 25.9214H27.514L21.5681 19.9755V16.3921C21.5681 14.0102 23.9611 11.474 26.5537 11.474C28.43 11.474 29.3727 13.1155 28.2553 14.8116C30.0548 13.9668 31.2231 12.9066 31.64 11.3474C32.2445 9.08937 30.212 6.59844 27.6776 6.10857L27.6767 6.10949Z" fill="white"/><path d="M2.68318 13.7025L6.41634 15.1952L16.1241 24.9029C16.7775 25.5564 17.663 25.9224 18.5863 25.9224H20.8471L8.6263 13.7015H2.68225L2.68318 13.7025Z" fill="white"/><path d="M0 17.7758L3.88475 19.3295L9.45816 24.9029C10.1116 25.5563 10.9971 25.9224 11.9204 25.9224H14.1812L6.03462 17.7758H0Z" fill="white"/></svg>',
  "inverse:true|logoLanguage:en|symbol:true|type:expert-research": '<svg width="256" height="26" viewBox="0 0 256 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M115.396 20.8343V5.57981H124.827V6.93607H116.91V12.2805H124.388V13.5969H116.91V19.4595H125.166V20.8352H115.395L115.396 20.8343Z" fill="white"/><path d="M125.565 20.8343L129.593 15.5297L125.964 10.7239H127.778L130.51 14.5526L133.262 10.7239H134.996L131.407 15.5093L135.455 20.8334H133.641L130.47 16.5059L127.34 20.8334H125.565V20.8343Z" fill="white"/><path d="M136.693 25.9988V10.7239H138.148V12.718H138.207C138.945 11.3219 140.421 10.4449 142.176 10.4449C145.187 10.4449 147.221 12.7579 147.221 15.7893C147.221 18.8207 145.187 21.1133 142.156 21.1133C140.541 21.1133 138.985 20.3355 138.227 18.8801H138.167V25.9988H136.691H136.693ZM145.706 15.7893C145.706 13.6154 144.331 11.6612 141.917 11.6612C139.664 11.6612 138.089 13.5755 138.089 15.7893C138.089 18.0031 139.664 19.897 141.917 19.897C144.331 19.897 145.706 17.9428 145.706 15.7893Z" fill="white"/><path d="M148.577 15.7494C148.577 12.6383 150.771 10.4449 153.643 10.4449C156.694 10.4449 158.448 12.6188 158.448 15.5501C158.448 15.73 158.448 15.9293 158.429 16.1286H150.074C150.113 18.1023 151.549 19.897 153.783 19.897C155.219 19.897 156.315 19.2194 157.013 18.2423L158.03 19.0794C156.974 20.4551 155.577 21.1133 153.783 21.1133C150.751 21.1133 148.578 18.9394 148.578 15.7494H148.577ZM156.973 15.0319C156.913 13.0582 155.736 11.6222 153.643 11.6222C151.549 11.6222 150.153 13.4763 150.074 15.0319H156.973Z" fill="white"/><path d="M160.522 20.8343V13.0369C160.522 12.4584 160.502 11.3617 160.443 10.7239H161.839C161.879 11.2625 161.939 12.2397 161.939 12.7783H161.979C162.537 11.2829 163.813 10.4449 165.209 10.4449C165.429 10.4449 165.668 10.4644 165.868 10.5052L165.807 11.8614C165.608 11.8012 165.349 11.7817 165.13 11.7817C162.976 11.7817 161.999 13.696 161.999 15.5501V20.8343H160.523H160.522Z" fill="white"/><path d="M168.439 18.1625V11.9411H166.405V10.7248H168.439V7.81295H169.875V10.7248H172.667V11.9411H169.875V18.0234C169.875 19.3 170.433 19.8182 171.45 19.8182C171.829 19.8182 172.268 19.7384 172.607 19.579L172.668 20.7758C172.249 20.9353 171.671 21.0354 171.132 21.0354C169.338 21.0354 168.44 19.998 168.44 18.1643L168.439 18.1625Z" fill="white"/><path d="M188.759 20.8343H186.905L182.757 13.7155H180.025V20.8343H178.49V5.57981H183.137C185.829 5.57981 188.322 6.55691 188.322 9.64768C188.322 12.0802 186.507 13.3364 184.373 13.596L188.76 20.8343H188.759ZM180.025 12.439H182.936C185.209 12.439 186.765 11.5815 186.765 9.64768C186.765 7.51362 184.97 6.89621 182.936 6.89621H180.025V12.4399V12.439Z" fill="white"/><path d="M189.478 15.7494C189.478 12.6383 191.671 10.4449 194.543 10.4449C197.594 10.4449 199.349 12.6188 199.349 15.5501C199.349 15.73 199.349 15.9293 199.329 16.1286H190.974C191.014 18.1023 192.45 19.897 194.683 19.897C196.119 19.897 197.216 19.2194 197.914 18.2423L198.931 19.0794C197.874 20.4551 196.478 21.1133 194.683 21.1133C191.652 21.1133 189.479 18.9394 189.479 15.7494H189.478ZM197.872 15.0319C197.812 13.0582 196.635 11.6222 194.542 11.6222C192.449 11.6222 191.053 13.4763 190.973 15.0319H197.873H197.872Z" fill="white"/><path d="M200.246 19.3389L201.303 18.462C201.921 19.3389 202.958 19.9174 204.174 19.9174C205.271 19.9174 206.447 19.3788 206.447 18.1032C206.447 16.8276 205.29 16.5281 203.696 16.1295C202.161 15.7707 200.744 15.2117 200.744 13.378C200.744 11.3441 202.518 10.4467 204.294 10.4467C205.709 10.4467 207.066 11.0048 207.764 12.0422L206.726 12.8793C206.208 12.1015 205.351 11.6231 204.273 11.6231C203.296 11.6231 202.12 12.0422 202.12 13.2186C202.12 14.395 202.997 14.6741 204.573 15.0532C206.567 15.5121 207.903 16.2102 207.903 17.9845C207.903 20.1584 206.088 21.1152 204.134 21.1152C202.619 21.1152 201.163 20.5172 200.245 19.3408L200.246 19.3389Z" fill="white"/><path d="M209.02 15.7494C209.02 12.6383 211.213 10.4449 214.085 10.4449C217.136 10.4449 218.891 12.6188 218.891 15.5501C218.891 15.73 218.891 15.9293 218.871 16.1286H210.516C210.556 18.1023 211.992 19.897 214.225 19.897C215.661 19.897 216.758 19.2194 217.456 18.2423L218.473 19.0794C217.416 20.4551 216.02 21.1133 214.225 21.1133C211.194 21.1133 209.021 18.9394 209.021 15.7494H209.02ZM217.415 15.0319C217.355 13.0582 216.178 11.6222 214.085 11.6222C211.992 11.6222 210.596 13.4763 210.516 15.0319H217.416H217.415Z" fill="white"/><path d="M220.088 18.0624C220.088 15.1116 223.577 14.6722 226.489 14.6722H227.187V14.2133C227.187 12.4584 226.07 11.6407 224.436 11.6407C223.279 11.6407 222.202 12.1191 221.485 12.8375L220.707 11.8799C221.664 10.9825 223.08 10.4439 224.536 10.4439C227.228 10.4439 228.584 11.9791 228.584 14.3125V18.7196C228.584 19.4372 228.643 20.3151 228.764 20.8333H227.408C227.328 20.3346 227.248 19.5568 227.248 19.0385H227.188C226.51 20.3948 225.194 21.1123 223.638 21.1123C222.083 21.1123 220.089 20.2752 220.089 18.0614L220.088 18.0624ZM227.186 16.4475V15.7698H226.309C224.255 15.7698 221.564 16.0294 221.564 18.0429C221.564 19.4789 222.84 19.9369 223.937 19.9369C226.21 19.9369 227.187 18.2617 227.187 16.4475H227.186Z" fill="white"/><path d="M231.274 20.8343V13.0369C231.274 12.4584 231.254 11.3617 231.195 10.7239H232.591C232.631 11.2625 232.691 12.2397 232.691 12.7783H232.731C233.289 11.2829 234.565 10.4449 235.962 10.4449C236.181 10.4449 236.42 10.4644 236.62 10.5052L236.56 11.8614C236.36 11.8012 236.101 11.7817 235.882 11.7817C233.728 11.7817 232.751 13.696 232.751 15.5501V20.8343H231.275H231.274Z" fill="white"/><path d="M236.619 15.7893C236.619 12.6383 238.872 10.4449 241.903 10.4449C243.299 10.4449 244.715 11.003 245.532 12.0005L244.455 12.8775C243.916 12.1599 242.939 11.6806 241.922 11.6806C239.549 11.6806 238.154 13.595 238.154 15.7884C238.154 17.9818 239.55 19.8961 241.943 19.8961C243 19.8961 243.956 19.4771 244.595 18.7596L245.572 19.6569C244.695 20.6136 243.398 21.1124 241.943 21.1124C238.892 21.1124 236.619 18.9783 236.619 15.7884V15.7893Z" fill="white"/><path d="M246.909 20.8342V5.23948H248.364V12.679H248.404C248.923 11.3431 250.338 10.4458 251.894 10.4458C254.565 10.4458 255.603 12.4194 255.603 14.6137V20.8351H254.147V15.0921C254.147 13.4373 253.649 11.7019 251.555 11.7019C249.74 11.7019 248.364 13.1972 248.364 15.5899V20.8342H246.909Z" fill="white"/><path d="M37.0345 18.9349L39.0453 17.0679C39.7841 18.1145 41.1181 18.8534 42.5133 18.8534C43.8066 18.8534 45.263 18.1757 45.263 16.5756C45.263 14.9755 43.9085 14.5435 42.2464 13.9901L41.6308 13.8056C39.4346 13.0871 37.6705 12.0609 37.6705 9.37248C37.6705 6.10928 40.6055 4.73447 43.2726 4.73447C45.161 4.73447 46.9669 5.45293 48.0951 6.62286L46.1863 8.51125C45.5503 7.62871 44.4212 7.07433 43.1901 7.07433C41.959 7.07433 40.5017 7.71029 40.5017 9.22878C40.5017 10.624 41.6299 11.0755 43.128 11.5686L43.7435 11.7531C46.2679 12.5532 48.1145 13.5386 48.1145 16.3086C48.1145 19.6534 45.3649 21.234 42.4707 21.234C40.3978 21.234 38.3046 20.4136 37.0327 18.9359L37.0345 18.9349Z" fill="white"/><path d="M49.7128 26V10.4053H52.2455V11.9006H52.3057C53.0038 10.8632 54.3397 10.1253 55.8952 10.1253C59.0064 10.1253 61.0209 12.5977 61.0209 15.5893C61.0209 18.5809 59.0463 21.1136 55.8758 21.1136C54.4796 21.1136 53.1234 20.5156 52.3854 19.4384H52.3252V25.9991H49.7128V26ZM58.427 15.5902C58.427 13.8548 57.3498 12.2603 55.3158 12.2603C53.4414 12.2603 52.1852 13.8557 52.1852 15.6106C52.1852 17.3655 53.4414 18.9406 55.3158 18.9406C57.3498 18.9406 58.427 17.3451 58.427 15.5902Z" fill="white"/><path d="M62.174 15.6301C62.174 12.34 64.5667 10.0864 67.6584 10.0864C70.7501 10.0864 72.784 12.2603 72.784 15.5708C72.784 15.8303 72.784 16.089 72.7636 16.3282H64.767C64.8272 17.8837 66.1826 19.0806 67.7984 19.0806C69.0749 19.0806 70.0122 18.4428 70.5508 17.665L72.3854 18.9415C71.3082 20.4174 69.7331 21.1553 67.7585 21.1553C64.6279 21.1553 62.175 19.0018 62.175 15.631L62.174 15.6301ZM70.2903 14.5927C70.2504 13.1373 69.3734 11.9998 67.6779 11.9998C65.9823 11.9998 64.8662 13.1966 64.7466 14.5927H70.2903Z" fill="white"/><path d="M73.9596 15.6301C73.9596 12.34 76.3523 10.0864 79.444 10.0864C82.5357 10.0864 84.5696 12.2603 84.5696 15.5708C84.5696 15.8303 84.5696 16.089 84.5502 16.3282H76.5535C76.6137 17.8837 77.9691 19.0806 79.5849 19.0806C80.8615 19.0806 81.7987 18.4428 82.3373 17.665L84.1719 18.9415C83.0947 20.4174 81.5197 21.1553 79.5451 21.1553C76.4144 21.1553 73.9615 19.0018 73.9615 15.631L73.9596 15.6301ZM82.0768 14.5927C82.0369 13.1373 81.159 11.9998 79.4644 11.9998C77.7698 11.9998 76.6527 13.1966 76.5331 14.5927H82.0768Z" fill="white"/><path d="M85.7414 15.5902C85.7414 12.5986 87.7559 10.1262 90.8865 10.1262C92.4217 10.1262 93.6788 10.8641 94.3768 11.8014H94.4371V5.2407H97.03V20.8354H94.5771V19.3002H94.5372C93.7798 20.4767 92.3234 21.1154 90.9078 21.1154C87.6975 21.1154 85.7423 18.5827 85.7423 15.5911L85.7414 15.5902ZM94.5752 15.6097C94.5752 13.8548 93.3191 12.2593 91.4242 12.2593C89.4097 12.2593 88.3529 13.8548 88.3529 15.5893C88.3529 17.3238 89.4097 18.9396 91.4242 18.9396C93.3191 18.9396 94.5752 17.384 94.5752 15.6097Z" fill="white"/><path d="M98.2973 17.8633C98.2973 14.8319 101.847 14.3331 105.157 14.3331H105.297V14.0939C105.297 12.7581 104.381 12.1193 103.024 12.1193C101.907 12.1193 100.871 12.5977 100.213 13.2559L98.8563 11.7402C99.9335 10.7028 101.548 10.0854 103.263 10.0854C106.474 10.0854 107.771 12.0201 107.771 14.4527V18.96C107.771 19.5978 107.811 20.3561 107.89 20.8345H105.537C105.458 20.4155 105.378 19.9167 105.378 19.4986H105.338C104.621 20.536 103.464 21.0941 102.028 21.0941C100.392 21.0941 98.2982 20.2764 98.2982 17.8633H98.2973ZM105.358 16.507V16.0083H104.899C103.004 16.0083 100.771 16.228 100.771 17.7836C100.771 18.8803 101.768 19.2196 102.685 19.2196C104.381 19.2196 105.358 18.083 105.358 16.507Z" fill="white"/><path d="M27.7594 6.12776C27.7594 2.74498 23.6016 0.00278113 18.5613 0H11.3869L16.4541 2.02559C15.49 2.22954 14.5546 2.64578 13.7202 3.28452L5.24058 10.3996H8.28221L22.859 24.9764C23.5145 25.6318 24.4026 25.9989 25.3287 25.9989H27.5962L21.6326 20.0353V16.4411C21.6326 14.0521 24.0327 11.5083 26.633 11.5083C28.5149 11.5083 29.4615 13.1548 28.3397 14.8559C30.1447 14.0086 31.3165 12.9452 31.7346 11.3813C32.3409 9.11655 30.3023 6.61817 27.7603 6.12683L27.7594 6.12776Z" fill="white"/><path d="M2.69122 13.7425L6.43555 15.2397L16.1723 24.9764C16.8277 25.6318 17.7158 25.9999 18.6419 25.9999H20.9095L8.65212 13.7425H2.69029H2.69122Z" fill="white"/><path d="M0 17.828L3.89637 19.3864L9.48644 24.9765C10.1419 25.6319 11.03 25.9999 11.9561 25.9999H14.2236L6.05267 17.828H0Z" fill="white"/></svg>',
  "inverse:true|logoLanguage:en|symbol:true|type:null": '<svg width="108" height="26" viewBox="0 0 108 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.0347 18.9349L39.0455 17.0678C39.7843 18.1145 41.1183 18.8533 42.5135 18.8533C43.8068 18.8533 45.2632 18.1756 45.2632 16.5756C45.2632 14.9755 43.9088 14.5435 42.2466 13.99L41.631 13.8055C39.4348 13.0871 37.6706 12.0608 37.6706 9.3724C37.6706 6.10919 40.6057 4.73438 43.2728 4.73438C45.1612 4.73438 46.9671 5.45284 48.0953 6.62277L46.1865 8.51117C45.5506 7.62862 44.4214 7.07425 43.1903 7.07425C41.9592 7.07425 40.5019 7.7102 40.5019 9.2287C40.5019 10.6239 41.6301 11.0754 43.1282 11.5686L43.7437 11.7531C46.2681 12.5531 48.1148 13.5386 48.1148 16.3086C48.1148 19.6534 45.3652 21.234 42.4709 21.234C40.398 21.234 38.3047 20.4135 37.0328 18.9358L37.0347 18.9349Z" fill="white"/><path d="M49.713 26V10.4052H52.2457V11.9005H52.306C53.004 10.8632 54.3399 10.1252 55.8955 10.1252C59.0067 10.1252 61.0211 12.5977 61.0211 15.5893C61.0211 18.5809 59.0465 21.1135 55.876 21.1135C54.4799 21.1135 53.1236 20.5156 52.3857 19.4384H52.3254V25.9991H49.713V26ZM58.4273 15.5902C58.4273 13.8548 57.35 12.2602 55.3161 12.2602C53.4416 12.2602 52.1854 13.8557 52.1854 15.6106C52.1854 17.3655 53.4416 18.9405 55.3161 18.9405C57.35 18.9405 58.4273 17.3451 58.4273 15.5902Z" fill="white"/><path d="M62.1743 15.6301C62.1743 12.34 64.567 10.0863 67.6587 10.0863C70.7504 10.0863 72.7844 12.2602 72.7844 15.5707C72.7844 15.8303 72.7844 16.0889 72.764 16.3281H64.7673C64.8275 17.8837 66.1829 19.0805 67.7987 19.0805C69.0753 19.0805 70.0125 18.4427 70.5511 17.6649L72.3858 18.9415C71.3085 20.4173 69.7335 21.1553 67.7589 21.1553C64.6282 21.1553 62.1752 19.0017 62.1752 15.631L62.1743 15.6301ZM70.2906 14.5927C70.2508 13.1372 69.3738 11.9997 67.6782 11.9997C65.9826 11.9997 64.8665 13.1966 64.7469 14.5927H70.2906Z" fill="white"/><path d="M73.9608 15.6301C73.9608 12.34 76.3535 10.0863 79.4452 10.0863C82.5369 10.0863 84.5709 12.2602 84.5709 15.5707C84.5709 15.8303 84.5709 16.0889 84.5514 16.3281H76.5547C76.615 17.8837 77.9703 19.0805 79.5861 19.0805C80.8627 19.0805 81.7999 18.4427 82.3385 17.6649L84.1732 18.9415C83.0959 20.4173 81.5209 21.1553 79.5463 21.1553C76.4156 21.1553 73.9627 19.0017 73.9627 15.631L73.9608 15.6301ZM82.0771 14.5927C82.0373 13.1372 81.1593 11.9997 79.4647 11.9997C77.7701 11.9997 76.653 13.1966 76.5334 14.5927H82.0771Z" fill="white"/><path d="M85.7418 15.5902C85.7418 12.5986 87.7563 10.1261 90.8869 10.1261C92.4221 10.1261 93.6792 10.8641 94.3773 11.8013H94.4375V5.2406H97.0305V20.8354H94.5775V19.3002H94.5377C93.7803 20.4766 92.3239 21.1154 90.9083 21.1154C87.6979 21.1154 85.7427 18.5827 85.7427 15.5911L85.7418 15.5902ZM94.5766 15.6096C94.5766 13.8547 93.3204 12.2593 91.4255 12.2593C89.4111 12.2593 88.3542 13.8547 88.3542 15.5892C88.3542 17.3237 89.4111 18.9396 91.4255 18.9396C93.3204 18.9396 94.5766 17.384 94.5766 15.6096Z" fill="white"/><path d="M98.2986 17.8633C98.2986 14.8318 101.848 14.3331 105.159 14.3331H105.299V14.0939C105.299 12.758 104.382 12.1193 103.026 12.1193C101.909 12.1193 100.872 12.5976 100.214 13.2558L98.8576 11.7401C99.9348 10.7027 101.55 10.0853 103.265 10.0853C106.475 10.0853 107.772 12.0201 107.772 14.4527V18.96C107.772 19.5978 107.812 20.3561 107.892 20.8345H105.539C105.459 20.4154 105.379 19.9167 105.379 19.4986H105.34C104.622 20.5359 103.465 21.094 102.029 21.094C100.394 21.094 98.2995 20.2764 98.2995 17.8633H98.2986ZM105.358 16.507V16.0082H104.899C103.004 16.0082 100.771 16.228 100.771 17.7835C100.771 18.8802 101.769 19.2195 102.685 19.2195C104.381 19.2195 105.358 18.083 105.358 16.507Z" fill="white"/><path d="M27.7595 6.12779C27.7595 2.74499 23.6017 0.00278114 18.5614 0H11.3869L16.4542 2.0256C15.49 2.22955 14.5547 2.6458 13.7203 3.28453L5.2406 10.3996H8.28225L22.8592 24.9765C23.5146 25.632 24.4027 25.9991 25.3288 25.9991H27.5964L21.6327 20.0354V16.4412C21.6327 14.0522 24.0328 11.5084 26.6332 11.5084C28.5151 11.5084 29.4616 13.1548 28.3399 14.8559C30.1448 14.0086 31.3166 12.9453 31.7347 11.3814C32.341 9.11659 30.3024 6.6182 27.7605 6.12686L27.7595 6.12779Z" fill="white"/><path d="M2.69123 13.7426L6.43558 15.2397L16.1724 24.9765C16.8278 25.6319 17.7159 26 18.642 26H20.9096L8.65216 13.7426H2.69031H2.69123Z" fill="white"/><path d="M0 17.828L3.89638 19.3864L9.48649 24.9765C10.1419 25.6319 11.03 25.9999 11.9561 25.9999H14.2237L6.0527 17.828H0Z" fill="white"/></svg>',
  "inverse:true|logoLanguage:zh|symbol:false|type:null": '<svg width="134" height="20" viewBox="0 0 134 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_680)"><path d="M1.04199 0V3.126H2.08399V10.418H19.168V0H1.04199ZM4.74999 2.292H9.47999V4.272H4.74999V2.292ZM4.74999 6.146H9.47999V8.126H4.74999V6.146ZM16.5 8.124H11.77V6.144H16.5V8.124ZM16.5 4.27H11.77V2.29H16.5V4.27Z" fill="white"/><path d="M15.0879 11.876L16.8919 15H19.5379L17.7339 11.876H15.0879Z" fill="white"/><path d="M15.4041 15L13.6001 11.876H10.9541L12.7581 15H15.4041Z" fill="white"/><path d="M2.76 20L4.77 12.5H2.01L0 20H2.76Z" fill="white"/><path d="M17.708 16.584V17.416H8.49998V14.374H9.41598V12.5H5.83398V18.124L7.70798 20H18.958L20.834 18.124V16.584H17.708Z" fill="white"/><path d="M68.8599 7.99L68.5099 8.342L62.2659 14.584H65.8019L70.2759 10.108L74.7519 14.584H78.2879L71.3599 7.658V6.042H75.9439V3.75H71.3599V1.874H72.2779V0H68.8599V3.75H64.2779V6.042H68.8599V7.99Z" fill="white"/><path d="M62.17 3.124L59.046 0H55.804L58.93 3.124H62.17Z" fill="white"/><path d="M75.152 17.416H62.482L60.986 14.824V5H56.194V7.5H58.278V15.6L53.876 20H57.412L59.742 17.67L61.088 20H61.946H76.402L78.278 18.126V16.584H75.152V17.416Z" fill="white"/><path d="M28.53 14.584L30.186 8.40601H27.426L25.77 14.584H28.53Z" fill="white"/><path d="M40.3521 0.00195312H32.9101L30.7881 2.29395H38.2281L40.3521 0.00195312Z" fill="white"/><path d="M45.142 17.418H36.186V12.722L46.196 2.71H48.268V0H45.166L36.186 8.98V5.874H37.102V4H33.478V11.688L29.056 16.11V16.114H29.052L25.166 20H28.908L33.478 15.43V18.126L35.352 20H46.392L48.268 18.126V16.584H45.142V17.418Z" fill="white"/><path d="M47.434 14.584L45.76 8.33398H43L44.674 14.584H47.434Z" fill="white"/><path d="M91.7539 7.952C91.5679 7.716 91.3259 7.528 91.0259 7.388C90.7259 7.248 90.4379 7.18 90.1599 7.18C90.0159 7.18 89.8699 7.192 89.7239 7.218C89.5759 7.244 89.4439 7.292 89.3259 7.364C89.2079 7.436 89.1079 7.528 89.0279 7.642C88.9479 7.756 88.9079 7.902 88.9079 8.078C88.9079 8.23 88.9399 8.356 89.0019 8.458C89.0659 8.56 89.1579 8.648 89.2799 8.724C89.4019 8.8 89.5479 8.87 89.7159 8.932C89.8839 8.996 90.0739 9.06 90.2859 9.128C90.5899 9.23 90.9059 9.342 91.2359 9.464C91.5659 9.586 91.8639 9.748 92.1339 9.952C92.4039 10.154 92.6279 10.406 92.8039 10.706C92.9819 11.006 93.0699 11.378 93.0699 11.826C93.0699 12.34 92.9759 12.786 92.7859 13.162C92.5959 13.538 92.3399 13.848 92.0199 14.092C91.6999 14.336 91.3319 14.518 90.9179 14.636C90.5039 14.754 90.0779 14.814 89.6399 14.814C88.9979 14.814 88.3779 14.702 87.7799 14.478C87.1799 14.254 86.6839 13.936 86.2859 13.522L87.7039 12.08C87.9239 12.35 88.2119 12.576 88.5699 12.758C88.9279 12.94 89.2859 13.03 89.6399 13.03C89.7999 13.03 89.9559 13.014 90.1079 12.98C90.2599 12.946 90.3919 12.892 90.5059 12.816C90.6199 12.74 90.7099 12.638 90.7779 12.512C90.8459 12.386 90.8799 12.234 90.8799 12.056C90.8799 11.878 90.8379 11.744 90.7539 11.626C90.6699 11.508 90.5499 11.4 90.3939 11.304C90.2379 11.208 90.0439 11.118 89.8119 11.038C89.5799 10.958 89.3159 10.872 89.0219 10.778C88.7359 10.686 88.4539 10.576 88.1799 10.448C87.9059 10.322 87.6619 10.16 87.4459 9.96C87.2299 9.762 87.0579 9.522 86.9279 9.238C86.7979 8.956 86.7319 8.612 86.7319 8.206C86.7319 7.708 86.8339 7.282 87.0359 6.928C87.2379 6.574 87.5039 6.282 87.8339 6.054C88.1639 5.826 88.5339 5.66 88.9479 5.554C89.3619 5.448 89.7779 5.396 90.1999 5.396C90.7059 5.396 91.2219 5.488 91.7499 5.674C92.2779 5.86 92.7399 6.134 93.1359 6.496L91.7559 7.952H91.7539Z" fill="white"/><path d="M101.434 10.148C101.296 9.746 101.098 9.394 100.84 9.09C100.582 8.786 100.266 8.546 99.8958 8.37C99.5238 8.192 99.1098 8.104 98.6538 8.104C98.1978 8.104 97.7878 8.198 97.4458 8.388C97.1038 8.578 96.8358 8.8 96.6438 9.054H96.6038V8.282H94.6318V17.704L96.7078 17.19V13.888H96.7338C96.9258 14.158 97.1958 14.37 97.5418 14.528C97.8878 14.682 98.2558 14.764 98.6438 14.764C99.1178 14.764 99.5378 14.67 99.9078 14.484C100.28 14.3 100.594 14.054 100.852 13.744C101.11 13.438 101.306 13.082 101.442 12.674C101.576 12.27 101.642 11.848 101.642 11.41C101.642 10.972 101.574 10.55 101.432 10.152L101.434 10.148ZM99.5358 12.008C99.4718 12.206 99.3818 12.38 99.2578 12.532C99.1338 12.684 98.9818 12.804 98.7958 12.9C98.6098 12.992 98.3938 13.038 98.1498 13.038C97.9058 13.038 97.7018 12.992 97.5158 12.9C97.3298 12.806 97.1718 12.684 97.0418 12.532C96.9098 12.38 96.8098 12.206 96.7378 12.014C96.6658 11.82 96.6298 11.622 96.6298 11.418C96.6298 11.214 96.6678 11.02 96.7378 10.824C96.8098 10.63 96.9098 10.456 97.0418 10.306C97.1718 10.154 97.3278 10.03 97.5158 9.938C97.7018 9.844 97.9118 9.798 98.1498 9.798C98.3878 9.798 98.6078 9.844 98.7958 9.938C98.9818 10.03 99.1338 10.15 99.2578 10.3C99.3818 10.446 99.4738 10.618 99.5358 10.81C99.5998 11.004 99.6298 11.202 99.6298 11.406C99.6298 11.61 99.5978 11.808 99.5358 12.008Z" fill="white"/><path d="M109.6 11.508V11.762C109.6 11.8461 109.596 11.926 109.588 12.002H105.02C105.036 12.18 105.09 12.34 105.178 12.482C105.266 12.626 105.38 12.75 105.52 12.856C105.66 12.962 105.816 13.0441 105.988 13.1021C106.16 13.1621 106.34 13.19 106.526 13.19C106.856 13.19 107.134 13.128 107.362 13.006C107.59 12.884 107.776 12.726 107.918 12.532L109.36 13.444C109.064 13.8741 108.674 14.2061 108.19 14.4381C107.704 14.6701 107.142 14.786 106.5 14.786C106.028 14.786 105.58 14.712 105.158 14.564C104.736 14.416 104.368 14.202 104.05 13.918C103.734 13.636 103.484 13.2881 103.304 12.8741C103.122 12.4601 103.032 11.988 103.032 11.456C103.032 10.924 103.12 10.476 103.298 10.058C103.476 9.64005 103.716 9.28605 104.02 8.99405C104.324 8.70205 104.682 8.47805 105.096 8.31605C105.51 8.15605 105.956 8.07605 106.438 8.07605C106.92 8.07605 107.328 8.15405 107.716 8.31005C108.104 8.46605 108.438 8.69205 108.716 8.98805C108.994 9.28405 109.212 9.64205 109.368 10.064C109.524 10.486 109.602 10.966 109.602 11.506L109.6 11.508ZM107.69 10.71C107.69 10.38 107.586 10.098 107.38 9.86205C107.174 9.62605 106.864 9.50805 106.45 9.50805C106.248 9.50805 106.062 9.54005 105.894 9.60205C105.726 9.66605 105.578 9.75205 105.452 9.86205C105.326 9.97205 105.224 10.1 105.148 10.248C105.072 10.396 105.03 10.55 105.022 10.71H107.692H107.69Z" fill="white"/><path d="M117.584 11.508V11.762C117.584 11.8461 117.58 11.926 117.572 12.002H113.004C113.02 12.18 113.074 12.34 113.162 12.482C113.25 12.626 113.364 12.75 113.504 12.856C113.644 12.962 113.8 13.0441 113.972 13.1021C114.144 13.1621 114.324 13.19 114.51 13.19C114.84 13.19 115.118 13.128 115.346 13.006C115.574 12.884 115.76 12.726 115.902 12.532L117.344 13.444C117.048 13.8741 116.658 14.2061 116.174 14.4381C115.688 14.6701 115.126 14.786 114.484 14.786C114.012 14.786 113.564 14.712 113.142 14.564C112.72 14.416 112.352 14.202 112.034 13.918C111.718 13.636 111.468 13.2881 111.288 12.8741C111.106 12.4601 111.016 11.988 111.016 11.456C111.016 10.924 111.104 10.476 111.282 10.058C111.46 9.64005 111.7 9.28605 112.004 8.99405C112.308 8.70205 112.666 8.47805 113.08 8.31605C113.494 8.15605 113.94 8.07605 114.422 8.07605C114.904 8.07605 115.312 8.15405 115.7 8.31005C116.088 8.46605 116.422 8.69205 116.7 8.98805C116.978 9.28405 117.196 9.64205 117.352 10.064C117.508 10.486 117.586 10.966 117.586 11.506L117.584 11.508ZM115.672 10.71C115.672 10.38 115.568 10.098 115.362 9.86205C115.156 9.62605 114.846 9.50805 114.432 9.50805C114.23 9.50805 114.044 9.54005 113.876 9.60205C113.708 9.66605 113.56 9.75205 113.434 9.86205C113.308 9.97205 113.206 10.1 113.13 10.248C113.054 10.396 113.012 10.55 113.004 10.71H115.674H115.672Z" fill="white"/><path d="M123.924 5.21603V8.95203H123.898C123.72 8.74003 123.47 8.54403 123.15 8.37003C122.828 8.19203 122.438 8.10403 121.974 8.10403C121.51 8.10403 121.106 8.19203 120.738 8.37003C120.37 8.54403 120.062 8.78603 119.804 9.09003C119.546 9.39403 119.348 9.74603 119.208 10.148C119.07 10.546 119.002 10.968 119.002 11.406C119.002 11.844 119.068 12.266 119.202 12.67C119.336 13.078 119.534 13.432 119.79 13.74C120.048 14.05 120.364 14.296 120.734 14.48C121.106 14.666 121.528 14.76 122.002 14.76C122.424 14.76 122.822 14.672 123.198 14.5C123.574 14.328 123.86 14.082 124.064 13.76H124.09V14.582H126V4.70203L123.928 5.21603H123.924ZM123.902 12.014C123.83 12.206 123.73 12.382 123.598 12.532C123.466 12.684 123.308 12.804 123.122 12.9C122.938 12.992 122.726 13.038 122.492 13.038C122.246 13.038 122.03 12.992 121.846 12.9C121.66 12.806 121.502 12.684 121.376 12.532C121.25 12.38 121.156 12.206 121.092 12.008C121.028 11.808 120.998 11.606 120.998 11.406C120.998 11.206 121.03 11.004 121.092 10.81C121.156 10.618 121.25 10.446 121.376 10.3C121.502 10.15 121.66 10.03 121.846 9.93803C122.03 9.84403 122.244 9.79803 122.492 9.79803C122.74 9.79803 122.94 9.84403 123.122 9.93803C123.308 10.03 123.466 10.154 123.598 10.306C123.73 10.458 123.83 10.63 123.902 10.824C123.974 11.018 124.008 11.216 124.008 11.418C124.008 11.62 123.974 11.82 123.902 12.014Z" fill="white"/><path d="M127.888 9.14005C128.26 8.78605 128.692 8.52005 129.186 8.34205C129.68 8.16405 130.184 8.07605 130.698 8.07605C131.212 8.07605 131.678 8.14205 132.046 8.27205C132.412 8.40205 132.71 8.60605 132.938 8.88005C133.166 9.15405 133.332 9.50005 133.438 9.91805C133.544 10.336 133.596 10.832 133.596 11.406V14.5821H131.698V13.912H131.66C131.5 14.174 131.256 14.376 130.932 14.52C130.608 14.664 130.254 14.736 129.876 14.736C129.622 14.736 129.362 14.702 129.092 14.634C128.822 14.566 128.576 14.456 128.352 14.304C128.128 14.152 127.944 13.9501 127.802 13.6961C127.658 13.4421 127.586 13.13 127.586 12.76C127.586 12.304 127.71 11.938 127.96 11.658C128.208 11.38 128.53 11.164 128.922 11.012C129.314 10.86 129.75 10.758 130.232 10.708C130.712 10.658 131.182 10.632 131.636 10.632V10.5301C131.636 10.2181 131.526 9.98805 131.306 9.84005C131.086 9.69205 130.816 9.61805 130.496 9.61805C130.2 9.61805 129.916 9.68205 129.642 9.80805C129.368 9.93405 129.134 10.086 128.94 10.264L127.89 9.13805L127.888 9.14005ZM131.698 11.836H131.432C131.204 11.836 130.974 11.846 130.742 11.868C130.51 11.89 130.304 11.93 130.122 11.988C129.94 12.048 129.79 12.134 129.672 12.2481C129.554 12.3621 129.494 12.5121 129.494 12.6981C129.494 12.8161 129.522 12.9181 129.576 13.002C129.63 13.0861 129.7 13.154 129.784 13.204C129.868 13.254 129.966 13.29 130.076 13.312C130.186 13.334 130.292 13.344 130.392 13.344C130.814 13.344 131.136 13.2281 131.36 12.9961C131.584 12.7641 131.696 12.45 131.696 12.054V11.838L131.698 11.836Z" fill="white"/></g><defs><clipPath id="clip0_1_680"><rect width="133.596" height="20" fill="white"/></clipPath></defs></svg>'
}, b0 = (e) => {
  const t = `inverse:${e.inverse ?? "null"}|logoLanguage:${e.logoLanguage ?? "null"}|symbol:${e.symbol ?? "null"}|type:${e.type ?? "null"}`;
  return t4[t] ?? void 0;
}, e4 = {
  "inverse:false": '<svg width="118" height="19" viewBox="0 0 118 19" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_705)"><path d="M10.2549 0.167748H9.8355C8.91288 0.167748 8.57739 0.475856 8.57739 1.39676V13.4386C8.57739 15.1435 7.54351 16.2613 5.75649 16.2613C3.96946 16.2613 2.90649 15.1435 2.90649 13.4386V1.39676C2.90649 0.474144 2.59838 0.167748 1.67748 0.167748H1.25811C0.335496 0.167748 0 0.474144 0 1.39676V13.4386C0 15.1144 0.530631 16.4564 1.5936 17.4629C2.65487 18.4694 4.05162 18.9726 5.75649 18.9726C7.46135 18.9726 8.82901 18.4694 9.89198 17.4629C10.9532 16.429 11.4856 15.0887 11.4856 13.4386V1.39676C11.4856 0.474144 11.1775 0.167748 10.2566 0.167748H10.2549ZM27.4644 16.15H20.787L27.437 5.05811C27.9403 4.24847 28.1919 3.43712 28.1919 2.60009V1.53883C28.1919 0.504955 27.8838 0.169459 26.8499 0.169459H19.6128C18.6902 0.169459 18.3838 0.477568 18.3838 1.39847V1.6227C18.3838 2.54532 18.6919 2.85171 19.6128 2.85171H25.4241L18.8014 13.9436C18.2708 14.7259 18.0192 15.5646 18.0192 16.4581V17.4646C18.0192 18.4985 18.3547 18.834 19.3886 18.834H27.4627C28.3853 18.834 28.6917 18.5259 28.6917 17.605V17.3807C28.6917 16.4581 28.3836 16.1517 27.4627 16.1517L27.4644 16.15ZM43.195 1.50973C42.9434 0.475856 42.5532 0.167748 41.5193 0.167748H39.4806C38.4468 0.167748 38.0565 0.475856 37.8049 1.50973L34.1726 17.6032C33.9484 18.4968 34.2565 18.8323 35.1791 18.8323H35.6532C36.6306 18.8323 36.9661 18.5806 37.1904 17.6032L37.8049 14.7532H43.1968L43.8404 17.6032C44.0355 18.5806 44.371 18.8323 45.3484 18.8323H45.8516C46.7742 18.8323 47.0532 18.4968 46.829 17.6032L43.1968 1.50973H43.195ZM38.3886 12.0984L38.9192 9.64036C39.5611 6.65 40.0643 3.85649 40.4563 1.31459C40.7079 2.90649 41.2386 5.67261 42.0773 9.66946L42.6079 12.1001H38.3886V12.0984ZM61.8869 9.24838C63.4514 8.82901 64.5127 7.6 64.5127 5.39189V4.77739C64.5127 1.98387 62.5562 0.167748 59.0078 0.167748H54.6498C53.6159 0.167748 53.2805 0.503243 53.2805 1.53712V17.4629C53.2805 18.4968 53.6159 18.8323 54.6498 18.8323H59.2595C62.9191 18.8323 65.016 16.8758 65.016 13.8871V13.2726C65.016 10.842 63.8143 9.50171 61.8869 9.25009V9.24838ZM56.1596 2.79351H58.9257C60.6853 2.79351 61.6644 3.60315 61.6644 5.02901V5.58703C61.6644 7.17892 60.9096 8.10153 58.6741 8.10153H56.1596V2.79351ZM62.1386 13.7194C62.1386 15.2565 61.1047 16.2065 58.9805 16.2065H56.1578V10.6742H59.0078C61.103 10.6742 62.1369 11.513 62.1369 13.1887V13.7194H62.1386ZM79.9078 1.50973C79.6562 0.475856 79.266 0.167748 78.2321 0.167748H76.1934C75.1596 0.167748 74.7693 0.475856 74.5177 1.50973L70.8854 17.6032C70.6612 18.4968 70.9693 18.8323 71.8919 18.8323H72.366C73.3434 18.8323 73.6789 18.5806 73.9032 17.6032L74.5177 14.7532H79.9096L80.5532 17.6032C80.7483 18.5806 81.0838 18.8323 82.0612 18.8323H82.5644C83.487 18.8323 83.766 18.4968 83.5418 17.6032L79.9096 1.50973H79.9078ZM75.1014 12.0984L75.632 9.64036C76.2739 6.65 76.7771 3.85649 77.1691 1.31459C77.4207 2.90649 77.9514 5.67261 78.7901 9.66946L79.3207 12.1001H75.1014V12.0984ZM95.2191 7.99027C93.5707 7.23541 92.2578 6.25802 92.2578 4.91604C92.2578 3.49189 93.2078 2.65315 94.7997 2.65315C96.4755 2.65315 97.5094 3.60315 97.5933 5.08378C97.6771 5.86604 98.0126 6.09027 98.9061 6.09027H99.3255C100.192 6.09027 100.5 5.78216 100.5 5.02901C100.5 3.54838 99.9691 2.34676 98.9352 1.42414C97.9014 0.474144 96.532 0 94.8271 0C93.2352 0 91.8932 0.474144 90.8594 1.39676C89.8255 2.31937 89.2949 3.51928 89.2949 5.00162C89.2384 8.43874 92.3691 9.83549 94.7433 10.8129C96.419 11.5113 97.7336 12.5177 97.7336 13.8854C97.7336 15.4225 96.6433 16.316 94.9401 16.316C93.0401 16.316 91.9224 15.1983 91.8385 13.7177C91.7546 12.9354 91.4465 12.6838 90.553 12.6838H90.1062C89.2966 12.6838 88.9046 13.0193 88.9046 13.6903C88.9046 15.2548 89.4626 16.5403 90.6095 17.5177C91.7546 18.495 93.1805 18.9709 94.9401 18.9709C96.6997 18.9709 98.0691 18.4968 99.103 17.5468C100.137 16.5968 100.667 15.3386 100.667 13.8032C100.695 10.45 97.6224 8.99847 95.2191 7.99198V7.99027ZM115.811 2.85C116.734 2.85 117.04 2.54189 117.04 1.62099V1.39676C117.04 0.474144 116.732 0.167748 115.811 0.167748H108.909C107.876 0.167748 107.54 0.503243 107.54 1.53712V17.4629C107.54 18.4968 107.876 18.8323 108.909 18.8323H115.811C116.734 18.8323 117.04 18.5241 117.04 17.6032V17.379C117.04 16.4564 116.732 16.15 115.811 16.15H110.419V10.842H115.226C116.148 10.842 116.427 10.563 116.427 9.58387V9.35964C116.427 8.43703 116.148 8.13063 115.226 8.13063H110.419V2.85H115.811Z" fill="black"/></g><defs><clipPath id="clip0_1_705"><rect width="117.081" height="19" fill="white"/></clipPath></defs></svg>',
  "inverse:true": '<svg width="118" height="19" viewBox="0 0 118 19" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_707)"><path d="M10.2549 0.167748H9.8355C8.91288 0.167748 8.57739 0.475856 8.57739 1.39676V13.4386C8.57739 15.1435 7.54351 16.2613 5.75649 16.2613C3.96946 16.2613 2.90649 15.1435 2.90649 13.4386V1.39676C2.90649 0.474144 2.59838 0.167748 1.67748 0.167748H1.25811C0.335496 0.167748 0 0.474144 0 1.39676V13.4386C0 15.1144 0.530631 16.4564 1.5936 17.4629C2.65487 18.4694 4.05162 18.9726 5.75649 18.9726C7.46135 18.9726 8.82901 18.4694 9.89198 17.4629C10.9532 16.429 11.4856 15.0887 11.4856 13.4386V1.39676C11.4856 0.474144 11.1775 0.167748 10.2566 0.167748H10.2549ZM27.4644 16.15H20.787L27.437 5.05811C27.9403 4.24847 28.1919 3.43712 28.1919 2.60009V1.53883C28.1919 0.504955 27.8838 0.169459 26.8499 0.169459H19.6128C18.6902 0.169459 18.3838 0.477568 18.3838 1.39847V1.6227C18.3838 2.54532 18.6919 2.85171 19.6128 2.85171H25.4241L18.8014 13.9436C18.2708 14.7259 18.0192 15.5646 18.0192 16.4581V17.4646C18.0192 18.4985 18.3547 18.834 19.3886 18.834H27.4627C28.3853 18.834 28.6917 18.5259 28.6917 17.605V17.3807C28.6917 16.4581 28.3836 16.1517 27.4627 16.1517L27.4644 16.15ZM43.195 1.50973C42.9434 0.475856 42.5532 0.167748 41.5193 0.167748H39.4806C38.4468 0.167748 38.0565 0.475856 37.8049 1.50973L34.1726 17.6032C33.9484 18.4968 34.2565 18.8323 35.1791 18.8323H35.6532C36.6306 18.8323 36.9661 18.5806 37.1904 17.6032L37.8049 14.7532H43.1968L43.8404 17.6032C44.0355 18.5806 44.371 18.8323 45.3484 18.8323H45.8516C46.7742 18.8323 47.0532 18.4968 46.829 17.6032L43.1968 1.50973H43.195ZM38.3886 12.0984L38.9192 9.64036C39.5611 6.65 40.0643 3.85649 40.4563 1.31459C40.7079 2.90649 41.2386 5.67261 42.0773 9.66946L42.6079 12.1001H38.3886V12.0984ZM61.8869 9.24838C63.4514 8.82901 64.5127 7.6 64.5127 5.39189V4.77739C64.5127 1.98387 62.5562 0.167748 59.0078 0.167748H54.6498C53.6159 0.167748 53.2805 0.503243 53.2805 1.53712V17.4629C53.2805 18.4968 53.6159 18.8323 54.6498 18.8323H59.2595C62.9191 18.8323 65.016 16.8758 65.016 13.8871V13.2726C65.016 10.842 63.8143 9.50171 61.8869 9.25009V9.24838ZM56.1596 2.79351H58.9257C60.6853 2.79351 61.6644 3.60315 61.6644 5.02901V5.58703C61.6644 7.17892 60.9096 8.10153 58.6741 8.10153H56.1596V2.79351ZM62.1386 13.7194C62.1386 15.2565 61.1047 16.2065 58.9805 16.2065H56.1578V10.6742H59.0078C61.103 10.6742 62.1369 11.513 62.1369 13.1887V13.7194H62.1386ZM79.9078 1.50973C79.6562 0.475856 79.266 0.167748 78.2321 0.167748H76.1934C75.1596 0.167748 74.7693 0.475856 74.5177 1.50973L70.8854 17.6032C70.6612 18.4968 70.9693 18.8323 71.8919 18.8323H72.366C73.3434 18.8323 73.6789 18.5806 73.9032 17.6032L74.5177 14.7532H79.9096L80.5532 17.6032C80.7483 18.5806 81.0838 18.8323 82.0612 18.8323H82.5644C83.487 18.8323 83.766 18.4968 83.5418 17.6032L79.9096 1.50973H79.9078ZM75.1014 12.0984L75.632 9.64036C76.2739 6.65 76.7771 3.85649 77.1691 1.31459C77.4207 2.90649 77.9514 5.67261 78.7901 9.66946L79.3207 12.1001H75.1014V12.0984ZM95.2191 7.99027C93.5707 7.23541 92.2578 6.25802 92.2578 4.91604C92.2578 3.49189 93.2078 2.65315 94.7997 2.65315C96.4755 2.65315 97.5094 3.60315 97.5933 5.08378C97.6771 5.86604 98.0126 6.09027 98.9061 6.09027H99.3255C100.192 6.09027 100.5 5.78216 100.5 5.02901C100.5 3.54838 99.9691 2.34676 98.9352 1.42414C97.9014 0.474144 96.532 0 94.8271 0C93.2352 0 91.8932 0.474144 90.8594 1.39676C89.8255 2.31937 89.2949 3.51928 89.2949 5.00162C89.2384 8.43874 92.3691 9.83549 94.7433 10.8129C96.419 11.5113 97.7336 12.5177 97.7336 13.8854C97.7336 15.4225 96.6433 16.316 94.9401 16.316C93.0401 16.316 91.9224 15.1983 91.8385 13.7177C91.7546 12.9354 91.4465 12.6838 90.553 12.6838H90.1062C89.2966 12.6838 88.9046 13.0193 88.9046 13.6903C88.9046 15.2548 89.4626 16.5403 90.6095 17.5177C91.7546 18.495 93.1805 18.9709 94.9401 18.9709C96.6997 18.9709 98.0691 18.4968 99.103 17.5468C100.137 16.5968 100.667 15.3386 100.667 13.8032C100.695 10.45 97.6224 8.99847 95.2191 7.99198V7.99027ZM115.811 2.85C116.734 2.85 117.04 2.54189 117.04 1.62099V1.39676C117.04 0.474144 116.732 0.167748 115.811 0.167748H108.909C107.876 0.167748 107.54 0.503243 107.54 1.53712V17.4629C107.54 18.4968 107.876 18.8323 108.909 18.8323H115.811C116.734 18.8323 117.04 18.5241 117.04 17.6032V17.379C117.04 16.4564 116.732 16.15 115.811 16.15H110.419V10.842H115.226C116.148 10.842 116.427 10.563 116.427 9.58387V9.35964C116.427 8.43703 116.148 8.13063 115.226 8.13063H110.419V2.85H115.811Z" fill="white"/></g><defs><clipPath id="clip0_1_707"><rect width="117.081" height="19" fill="white"/></clipPath></defs></svg>'
}, H0 = (e) => {
  const t = `inverse:${e.inverse ?? "null"}`;
  return e4[t] ?? void 0;
};
var i4 = Object.defineProperty, L0 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && i4(t, i, o), o;
}, u2, V0;
const C9 = class C9 extends V {
  constructor() {
    super(...arguments);
    S(this, u2);
    this.language = "", this.brand = "";
  }
  render() {
    const i = z(this, u2, V0).call(this);
    return i ? g`${X2(i)}` : g``;
  }
};
u2 = new WeakSet(), V0 = function() {
  if (this.brand === "uzabase")
    return H0({ inverse: !1 });
  if (this.brand === "speeda") {
    const i = this.language === "zh" ? "zh" : "en";
    return b0({
      type: null,
      inverse: !1,
      symbol: !1,
      logoLanguage: i
    });
  }
}, C9.styles = x(P`
    :host {
      display: flex;
    }
  `);
let w1 = C9;
L0([
  c({ type: String, reflect: !0 })
], w1.prototype, "language");
L0([
  c({ type: String, reflect: !0 })
], w1.prototype, "brand");
class o4 extends w1 {
}
customElements.get("mi-logo") || customElements.define("mi-logo", w1);
customElements.get("sp-logo") || customElements.define("sp-logo", o4);
var r4 = Object.defineProperty, A2 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && r4(t, i, o), o;
}, g2, v0;
const h9 = class h9 extends V {
  constructor() {
    super(...arguments);
    S(this, g2);
    this.type = null, this.inverse = !1, this.noSymbol = !1, this.logoLanguage = "en";
  }
  render() {
    const i = z(this, g2, v0).call(this);
    return i ? g`${X2(i)}` : g``;
  }
};
g2 = new WeakSet(), v0 = function() {
  return b0({
    type: this.type,
    inverse: this.inverse,
    symbol: !this.noSymbol,
    logoLanguage: this.logoLanguage
  });
}, h9.styles = x(P`
    :host {
      display: flex;
    }
  `);
let p1 = h9;
A2([
  c({ type: String, reflect: !0 })
], p1.prototype, "type");
A2([
  c({ type: Boolean, reflect: !0 })
], p1.prototype, "inverse");
A2([
  c({ type: Boolean, reflect: !0, attribute: "no-symbol" })
], p1.prototype, "noSymbol");
A2([
  c({ type: String, reflect: !0, attribute: "logo-language" })
], p1.prototype, "logoLanguage");
customElements.get("mi-speeda-logo") || customElements.define("mi-speeda-logo", p1);
var s4 = Object.defineProperty, n4 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && s4(t, i, o), o;
}, m2, y0;
const p9 = class p9 extends V {
  constructor() {
    super(...arguments);
    S(this, m2);
    this.inverse = !1;
  }
  render() {
    const i = z(this, m2, y0).call(this);
    return i ? g`${X2(i)}` : g``;
  }
};
m2 = new WeakSet(), y0 = function() {
  return H0({
    inverse: this.inverse
  });
}, p9.styles = x(P`
    :host {
      display: flex;
    }
  `);
let c2 = p9;
n4([
  c({ type: Boolean, reflect: !0 })
], c2.prototype, "inverse");
customElements.get("mi-uzabase-logo") || customElements.define("mi-uzabase-logo", c2);
const l4 = ":host{display:block;border-radius:6px;padding:8px 0;box-shadow:0 5px 9px 2px #00000021;background-color:#fff}", f9 = class f9 extends V {
  render() {
    return g`<slot></slot>`;
  }
};
f9.styles = x(M(l4));
let d2 = f9;
class a4 extends d2 {
}
customElements.get("mi-control-menu") || customElements.define("mi-control-menu", d2);
customElements.get("sp-control-menu") || customElements.define("sp-control-menu", a4);
const c4 = ":host{display:flex;font-size:14px;align-items:center;justify-content:space-between;padding:4px 12px 4px 16px;box-sizing:border-box;min-height:32px;cursor:pointer;color:#000000d6;column-gap:8px}:host .icon{display:none;width:24px;height:24px}:host([selected]){background-color:#f0f6ff}:host([selected]) .icon{display:block}:host([selected]:hover){background-color:#e3efff}:host([selected]:active){background-color:#d4e6ff}:host([disabled]){background-color:transparent;cursor:not-allowed;color:#00000059}:host([disabled]:hover){background-color:transparent}:host([disabled]:active){background-color:transparent}:host([disabled]:focus){border:none;padding:4px 12px 4px 16px}:host(:hover){background-color:#f8f8f8}:host(:active){background-color:#0000000d}:host(:focus){border:2px solid #191919;box-sizing:border-box;padding:2px 10px 2px 14px;outline:none}";
var d4 = Object.defineProperty, o9 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && d4(t, i, o), o;
};
const u9 = class u9 extends V {
  constructor() {
    super(...arguments), this.text = "", this.selected = !1, this.disabled = !1;
  }
  render() {
    return g`
      <span class="text">${this.text}</span>
      <mi-icon class="icon" type="check-small"></mi-icon>
    `;
  }
};
u9.styles = x(M(c4));
let f1 = u9;
o9([
  c({ type: String, reflect: !0 })
], f1.prototype, "text");
o9([
  c({ type: Boolean, reflect: !0 })
], f1.prototype, "selected");
o9([
  c({ type: Boolean, reflect: !0 })
], f1.prototype, "disabled");
class C4 extends f1 {
}
customElements.get("mi-control-menu-item") || customElements.define("mi-control-menu-item", f1);
customElements.get("sp-control-menu-item") || customElements.define("sp-control-menu-item", C4);
const h4 = P`
  :host {
    display: inline-block;

    --color-semantic-text-regular: #000000d6;
    --color-semantic-surface-regular-default: #ffffff;
    --color-semantic-border-semi-strong-default: #0000004a;
    --color-semantic-border-checked-default: #3f69f2;
    --color-semantic-highlight-focus-ring-default: #191919;
    --color-semantic-border-disabled: #00000012;
    --color-semantic-text-disabled: #00000059;
    --color-semantic-surface-disabled: #0000000d;
    --color-semantic-surface-button-secondary-hover: #0000000a;
    --color-semantic-border-checked-hover: #315ce8;
    --color-semantic-surface-checked-hover: #315ce8;
    --color-semantic-surface-button-secondary-active: #00000012;
    --color-semantic-border-checked-active: #214dde;
    --color-semantic-surface-checked-active: #214dde;
  }

  .base {
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
  }

  .input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 1;
  }

  .radio {
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    display: inline-flex;
    padding-block: 4px;
    padding-inline: 4px;
    cursor: pointer;
  }

  .radio::before {
    content: "";
    width: 16px;
    height: 16px;
    background-color: var(--color-semantic-surface-regular-default);
    border: 1px solid #cbcbcb;
    border-radius: 50%;
  }

  .text {
    color: var(--color-semantic-text-regular);
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: 0.02em;
    padding-block: 3px;
    padding-inline: 4px;
    cursor: pointer;
  }

  .input:checked + .radio::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background-color: var(--color-semantic-border-checked-default);
    border-radius: 50%;
  }

  .input:checked + .radio::before {
    background-color: var(--color-semantic-surface-regular-default);
    border-color: var(--color-semantic-border-checked-default);
    border-width: 1.5px;
  }

  :host([disabled]) .text {
    color: var(--color-semantic-text-disabled);
  }

  :host([disabled]) .radio::before {
    border: 1px solid var(--color-semantic-border-disabled);
  }

  :host([disabled]) :is(.input, .radio, .text) {
    cursor: not-allowed;
  }

  :host([disabled]) .input:checked + .radio::after {
    background-color: var(--color-semantic-surface-disabled);
  }

  :host(:not([disabled])) .input:focus-visible + .radio::before {
    outline: none;
    box-shadow:
      0 0 0 2px var(--color-semantic-surface-regular-default),
      0 0 0 4px var(--color-semantic-highlight-focus-ring-default);
  }

  :host(:not([disabled])) .base:hover .radio::before {
    outline: 3px solid var(--color-semantic-surface-button-secondary-hover);
  }

  :host(:not([disabled])) .base:hover .input:checked + .radio::before {
    border-color: var(--color-semantic-border-checked-hover);
  }

  :host(:not([disabled])) .base:hover .input:checked + .radio::after {
    background-color: var(--color-semantic-surface-checked-hover);
  }

  :host(:not([disabled])) .base:active .radio::before {
    outline: 3px solid var(--color-semantic-surface-button-secondary-active);
  }

  :host(:not([disabled])) .base:active .input:checked + .radio::before {
    border-color: var(--color-semantic-border-checked-active);
  }

  :host(:not([disabled])) .base:active .input:checked + .radio::after {
    background-color: var(--color-semantic-surface-checked-active);
  }
`;
var p4 = Object.defineProperty, E2 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && p4(t, i, o), o;
}, L1, N1;
const b2 = class b2 extends V {
  constructor() {
    super();
    S(this, L1);
    S(this, N1);
    this.value = "", this.name = "", this.checked = !1, this.disabled = !1, J1(this, L1, `radio-${Math.random().toString(36).slice(2)}`), J1(this, N1, this.attachInternals());
  }
  updated(i) {
    super.updated(i), i.has("checked") && E(this, N1).setFormValue(this.checked ? this.value : null);
  }
  formResetCallback() {
    this.checked = this.hasAttribute("checked");
  }
  render() {
    return g`
      <label class="base">
        <input
          type="radio"
          class="input"
          aria-labelledby="${E(this, L1)}"
          .value=${this.value}
          .name=${this.name}
          .checked=${this.checked}
          .disabled=${this.disabled}
        />
        <span class="radio" aria-hidden="true"></span>
        <span class="text" id="${E(this, L1)}" aria-hidden="true">
          <slot></slot>
        </span>
      </label>
    `;
  }
};
L1 = new WeakMap(), N1 = new WeakMap(), b2.styles = x(h4), b2.formAssociated = !0;
let r1 = b2;
E2([
  c({ type: String, reflect: !0 })
], r1.prototype, "value");
E2([
  c({ type: String, reflect: !0 })
], r1.prototype, "name");
E2([
  c({ type: Boolean, reflect: !0 })
], r1.prototype, "checked");
E2([
  c({ type: Boolean, reflect: !0 })
], r1.prototype, "disabled");
class f4 extends r1 {
}
customElements.get("mi-radio-button-text") || customElements.define("mi-radio-button-text", r1);
customElements.get("sp-radio-button-text") || customElements.define("sp-radio-button-text", f4);
const u4 = ":host .container{display:flex;gap:2px;align-items:center;padding-top:8px;color:#c92812}:host .container>.text{font-weight:var(--font-weight-normal);font-size:14px}:host .container .icon{width:21px;height:21px}:host .container.none{display:none}";
var g4 = Object.defineProperty, m4 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && g4(t, i, o), o;
}, H2, x0;
const g9 = class g9 extends V {
  constructor() {
    super(...arguments);
    S(this, H2);
    this.text = "";
  }
  render() {
    return g`
      <div class="${z(this, H2, x0).call(this)}" role="error">
        <mi-icon class="icon" type="error-fill"></mi-icon>
        <span class="text">${this.text}</span>
      </div>
    `;
  }
};
H2 = new WeakSet(), x0 = function() {
  return R1({
    container: !0,
    none: !this.text
  });
}, g9.styles = x(M(u4));
let j1 = g9;
m4([
  c({ type: String, reflect: !0 })
], j1.prototype, "text");
class b4 extends j1 {
}
customElements.get("mi-text-field-error-text") || customElements.define("mi-text-field-error-text", j1);
customElements.get("sp-text-field-error-text") || customElements.define("sp-text-field-error-text", b4);
const H4 = ".input{width:100%;box-sizing:border-box;height:48px;background:#fff;border:1px solid #b6b6b6;border-radius:6px;padding:4px 12px;font-weight:var(--font-weight-normal);font-size:16px;line-height:24}.input::placeholder{color:#0000008a}.input[disabled]{color:#000000ad;background-color:#0000000d;border-color:#e5e5e5}.input[disabled]::placeholder{color:#00000059}.input[disabled]:hover{border-color:#e5e5e5}.input:hover{border-color:#0000008f}.input:focus-visible{outline:canvastext solid 3px;box-shadow:0 0 0 2px #fff,0 0 0 4px #282828;outline-offset:1px}.input.error{border-color:#db351f}";
var L4 = Object.defineProperty, u1 = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && L4(t, i, o), o;
}, Z1, w0, M0;
const L2 = class L2 extends V {
  constructor() {
    super();
    S(this, Z1);
    this.error = "", this.placeholder = "", this.autocomplete = "off", this.disabled = !1, this.name = "", this.value = "", this.type = "text", this.internals = this.attachInternals();
  }
  updated(i) {
    super.updated(i), i.has("value") && this.internals.setFormValue(this.value);
  }
  render() {
    return g`
      <input
        class="${z(this, Z1, w0).call(this)}"
        type="${this.type}"
        placeholder="${this.placeholder}"
        autocomplete="${this.autocomplete}"
        ?disabled="${this.disabled}"
        name="${this.name}"
        .value="${this.value}"
        aria-invalid="${this.error && !this.disabled ? "true" : "false"}"
        @input="${z(this, Z1, M0)}"
      />
      <mi-text-field-error-text
        text="${this.disabled ? "" : this.error}"
      ></mi-text-field-error-text>
    `;
  }
};
Z1 = new WeakSet(), w0 = function() {
  return R1({
    input: !0,
    error: this.error && !this.disabled
  });
}, M0 = function(i) {
  const r = i.target;
  this.value = r.value, i.composed || this.dispatchEvent(
    new InputEvent("input", {
      ...i,
      composed: !0
    })
  );
}, L2.styles = x(M(H4)), L2.formAssociated = !0;
let B = L2;
u1([
  c({ type: String, reflect: !0 })
], B.prototype, "error");
u1([
  c({ type: String, reflect: !0 })
], B.prototype, "placeholder");
u1([
  c({ type: String, reflect: !0 })
], B.prototype, "autocomplete");
u1([
  c({ type: Boolean, reflect: !0 })
], B.prototype, "disabled");
u1([
  c({ type: String, reflect: !0 })
], B.prototype, "name");
u1([
  c({ type: String, reflect: !0 })
], B.prototype, "value");
u1([
  c({ type: String, reflect: !0 })
], B.prototype, "type");
class V4 extends B {
}
customElements.get("mi-text-field") || customElements.define("mi-text-field", B);
customElements.get("sp-text-field") || customElements.define("sp-text-field", V4);
const v4 = ":host .label{margin-bottom:8px;text-align:left}:host .label.none{display:none}";
var y4 = Object.defineProperty, Y = (e, t, i, r) => {
  for (var o = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (o = n(t, i, o) || o);
  return o && y4(t, i, o), o;
}, $1, Z0, $0;
const V2 = class V2 extends V {
  constructor() {
    super();
    S(this, $1);
    this.text = "", this.error = "", this.placeholder = "", this.supportText = "", this.disabled = !1, this.name = "", this.value = "", this.type = "text", this.autocomplete = "off", this.internals = this.attachInternals();
  }
  updated(i) {
    super.updated(i), i.has("value") && this.internals.setFormValue(this.value);
  }
  render() {
    return g`
      <fieldset>
        <mi-label-unit
          class="${z(this, $1, Z0).call(this)}"
          text="${this.text}"
          support-text="${this.supportText}"
        ></mi-label-unit>
        <mi-text-field
          error="${this.error}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          name="${this.name}"
          .value="${this.value}"
          type="${this.type}"
          autocomplete="${this.autocomplete}"
          @input="${z(this, $1, $0)}"
        ></mi-text-field>
      </fieldset>
    `;
  }
};
$1 = new WeakSet(), Z0 = function() {
  return R1({
    label: !0,
    none: !this.text && !this.supportText
  });
}, $0 = function(i) {
  const r = i.target;
  this.value = r.value;
}, V2.styles = x(M(v4)), V2.formAssociated = !0;
let _ = V2;
Y([
  c({ type: String, reflect: !0 })
], _.prototype, "text");
Y([
  c({ type: String, reflect: !0 })
], _.prototype, "error");
Y([
  c({ type: String, reflect: !0 })
], _.prototype, "placeholder");
Y([
  c({ type: String, attribute: "support-text", reflect: !0 })
], _.prototype, "supportText");
Y([
  c({ type: Boolean, reflect: !0 })
], _.prototype, "disabled");
Y([
  c({ type: String, reflect: !0 })
], _.prototype, "name");
Y([
  c({ type: String, reflect: !0 })
], _.prototype, "value");
Y([
  c({ type: String, reflect: !0 })
], _.prototype, "type");
Y([
  c({ type: String, reflect: !0 })
], _.prototype, "autocomplete");
class x4 extends _ {
}
customElements.get("mi-text-field-unit") || customElements.define("mi-text-field-unit", _);
customElements.get("sp-text-field-unit") || customElements.define("sp-text-field-unit", x4);
export {
  K2 as MiAiButton,
  R as MiAvatar,
  p0 as MiButton,
  q as MiCheckbox,
  N as MiCheckboxText,
  d2 as MiControlMenu,
  f1 as MiControlMenuItem,
  e0 as MiDangerButton,
  D1 as MiFloatingButton,
  F1 as MiIcon,
  o1 as MiIconButton,
  l2 as MiIconColor,
  a2 as MiInlineNotification,
  x1 as MiLabelUnit,
  v1 as MiLoading,
  w1 as MiLogo,
  G1 as MiNeutralButton,
  r1 as MiRadioButtonText,
  p1 as MiSpeedaLogo,
  _ as MiTextFieldUnit,
  M8 as MiTooltip,
  c2 as MiUzabaseLogo,
  b5 as SpAvatar,
  _8 as SpButton,
  S8 as SpCheckbox,
  O8 as SpCheckboxText,
  a4 as SpControlMenu,
  C4 as SpControlMenuItem,
  D8 as SpFloatingButton,
  C5 as SpIcon,
  Q8 as SpLabelUnit,
  V5 as SpLoading,
  o4 as SpLogo,
  f4 as SpRadioButtonText,
  x4 as SpTextFieldUnit,
  A4 as iconButtonSizes,
  _4 as iconButtonVariants
};
