var M1 = (i) => {
  throw TypeError(i);
};
var h1 = (i, t, e) => t.has(i) || M1("Cannot " + e);
var E1 = (i, t, e) => (h1(i, t, "read from private field"), e ? e.call(i) : t.get(i)), E = (i, t, e) => t.has(i) ? M1("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), V1 = (i, t, e, r) => (h1(i, t, "write to private field"), r ? r.call(i, e) : t.set(i, e), e), $ = (i, t, e) => (h1(i, t, "access private method"), e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, g1 = X.ShadowRoot && (X.ShadyCSS === void 0 || X.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, m1 = Symbol(), S1 = /* @__PURE__ */ new WeakMap();
let q1 = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== m1) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (g1 && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = S1.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && S1.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const y = (i) => new q1(typeof i == "string" ? i : i + "", void 0, m1), Z1 = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce(((r, s, o) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[o + 1]), i[0]);
  return new q1(e, i, m1);
}, ct = (i, t) => {
  if (g1) i.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
  else for (const e of t) {
    const r = document.createElement("style"), s = X.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = e.cssText, i.appendChild(r);
  }
}, k1 = g1 ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return y(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: dt, defineProperty: pt, getOwnPropertyDescriptor: Ct, getOwnPropertyNames: ut, getOwnPropertySymbols: ft, getPrototypeOf: gt } = Object, A = globalThis, P1 = A.trustedTypes, mt = P1 ? P1.emptyScript : "", c1 = A.reactiveElementPolyfillSupport, R = (i, t) => i, t1 = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? mt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, y1 = (i, t) => !dt(i, t), z1 = { attribute: !0, type: String, converter: t1, reflect: !1, useDefault: !1, hasChanged: y1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), A.litPropertyMetadata ?? (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let z = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = z1) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = Symbol(), s = this.getPropertyDescriptor(t, r, e);
      s !== void 0 && pt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: s, set: o } = Ct(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: s, set(n) {
      const l = s == null ? void 0 : s.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? z1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const t = gt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const e = this.properties, r = [...ut(e), ...ft(e)];
      for (const s of r) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [r, s] of e) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, r] of this.elementProperties) {
      const s = this._$Eu(e, r);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const s of r) e.unshift(k1(s));
    } else t !== void 0 && e.push(k1(t));
    return e;
  }
  static _$Eu(t, e) {
    const r = e.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise(((e) => this.enableUpdating = e)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach(((e) => e(this)));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const r of e.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ct(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach(((e) => {
      var r;
      return (r = e.hostConnected) == null ? void 0 : r.call(e);
    }));
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach(((e) => {
      var r;
      return (r = e.hostDisconnected) == null ? void 0 : r.call(e);
    }));
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$ET(t, e) {
    var o;
    const r = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, r);
    if (s !== void 0 && r.reflect === !0) {
      const n = (((o = r.converter) == null ? void 0 : o.toAttribute) !== void 0 ? r.converter : t1).toAttribute(e, r.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const r = this.constructor, s = r._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = r.getPropertyOptions(s), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : t1;
      this._$Em = s;
      const d = a.fromAttribute(e, l.type);
      this[s] = d ?? ((n = this._$Ej) == null ? void 0 : n.get(s)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, r) {
    var s;
    if (t !== void 0) {
      const o = this.constructor, n = this[t];
      if (r ?? (r = o.getPropertyOptions(t)), !((r.hasChanged ?? y1)(n, e) || r.useDefault && r.reflect && n === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(o._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: s, wrapped: o }, n) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, n] of s) {
        const { wrapped: l } = n, a = this[o];
        l !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (r = this._$EO) == null || r.forEach(((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      })), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach(((r) => {
      var s;
      return (s = r.hostUpdated) == null ? void 0 : s.call(r);
    })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach(((e) => this._$ET(e, this[e])))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[R("elementProperties")] = /* @__PURE__ */ new Map(), z[R("finalized")] = /* @__PURE__ */ new Map(), c1 == null || c1({ ReactiveElement: z }), (A.reactiveElementVersions ?? (A.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, e1 = D.trustedTypes, O1 = e1 ? e1.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, W1 = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, J1 = "?" + w, yt = `<${J1}>`, k = document, I = () => k.createComment(""), q = (i) => i === null || typeof i != "object" && typeof i != "function", b1 = Array.isArray, bt = (i) => b1(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", d1 = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, T1 = /-->/g, U1 = />/g, V = RegExp(`>|${d1}(?:([^\\s"'>=/]+)(${d1}*=${d1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), N1 = /'/g, B1 = /"/g, F1 = /^(?:script|style|textarea|title)$/i, vt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), g = vt(1), L = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), j1 = /* @__PURE__ */ new WeakMap(), S = k.createTreeWalker(k, 129);
function K1(i, t) {
  if (!b1(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return O1 !== void 0 ? O1.createHTML(t) : t;
}
const $t = (i, t) => {
  const e = i.length - 1, r = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = j;
  for (let l = 0; l < e; l++) {
    const a = i[l];
    let d, C, c = -1, v = 0;
    for (; v < a.length && (n.lastIndex = v, C = n.exec(a), C !== null); ) v = n.lastIndex, n === j ? C[1] === "!--" ? n = T1 : C[1] !== void 0 ? n = U1 : C[2] !== void 0 ? (F1.test(C[2]) && (s = RegExp("</" + C[2], "g")), n = V) : C[3] !== void 0 && (n = V) : n === V ? C[0] === ">" ? (n = s ?? j, c = -1) : C[1] === void 0 ? c = -2 : (c = n.lastIndex - C[2].length, d = C[1], n = C[3] === void 0 ? V : C[3] === '"' ? B1 : N1) : n === B1 || n === N1 ? n = V : n === T1 || n === U1 ? n = j : (n = V, s = void 0);
    const H = n === V && i[l + 1].startsWith("/>") ? " " : "";
    o += n === j ? a + yt : c >= 0 ? (r.push(d), a.slice(0, c) + W1 + a.slice(c) + w + H) : a + w + (c === -2 ? l : H);
  }
  return [K1(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class W {
  constructor({ strings: t, _$litType$: e }, r) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [d, C] = $t(t, e);
    if (this.el = W.createElement(d, r), S.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = S.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(W1)) {
          const v = C[n++], H = s.getAttribute(c).split(w), Q = /([.?@])?(.*)/.exec(v);
          a.push({ type: 1, index: o, name: Q[2], strings: H, ctor: Q[1] === "." ? _t : Q[1] === "?" ? Ht : Q[1] === "@" ? wt : l1 }), s.removeAttribute(c);
        } else c.startsWith(w) && (a.push({ type: 6, index: o }), s.removeAttribute(c));
        if (F1.test(s.tagName)) {
          const c = s.textContent.split(w), v = c.length - 1;
          if (v > 0) {
            s.textContent = e1 ? e1.emptyScript : "";
            for (let H = 0; H < v; H++) s.append(c[H], I()), S.nextNode(), a.push({ type: 2, index: ++o });
            s.append(c[v], I());
          }
        }
      } else if (s.nodeType === 8) if (s.data === J1) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(w, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += w.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const r = k.createElement("template");
    return r.innerHTML = t, r;
  }
}
function O(i, t, e = i, r) {
  var n, l;
  if (t === L) return t;
  let s = r !== void 0 ? (n = e._$Co) == null ? void 0 : n[r] : e._$Cl;
  const o = q(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), o === void 0 ? s = void 0 : (s = new o(i), s._$AT(i, e, r)), r !== void 0 ? (e._$Co ?? (e._$Co = []))[r] = s : e._$Cl = s), s !== void 0 && (t = O(i, s._$AS(i, t.values), s, r)), t;
}
class xt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: r } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? k).importNode(e, !0);
    S.currentNode = s;
    let o = S.nextNode(), n = 0, l = 0, a = r[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new G(o, o.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (d = new At(o, this, t)), this._$AV.push(d), a = r[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = S.nextNode(), n++);
    }
    return S.currentNode = k, s;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class G {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, r, s) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = O(this, t, e), q(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== L && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(k.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: r } = t, s = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = W.createElement(K1(r.h, r.h[0]), this.options)), r);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(e);
    else {
      const n = new xt(s, this), l = n.u(this.options);
      n.p(e), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = j1.get(t.strings);
    return e === void 0 && j1.set(t.strings, e = new W(t)), e;
  }
  k(t) {
    b1(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, s = 0;
    for (const o of t) s === e.length ? e.push(r = new G(this.O(I()), this.O(I()), this, this.options)) : r = e[s], r._$AI(o), s++;
    s < e.length && (this._$AR(r && r._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class l1 {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, r, s, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = p;
  }
  _$AI(t, e = this, r, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = O(this, t, e, 0), n = !q(t) || t !== this._$AH && t !== L, n && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = o[0], a = 0; a < o.length - 1; a++) d = O(this, l[r + a], e, a), d === L && (d = this._$AH[a]), n || (n = !q(d) || d !== this._$AH[a]), d === p ? t = p : t !== p && (t += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class _t extends l1 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Ht extends l1 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class wt extends l1 {
  constructor(t, e, r, s, o) {
    super(t, e, r, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = O(this, t, e, 0) ?? p) === L) return;
    const r = this._$AH, s = t === p && r !== p || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== p && (r === p || s);
    s && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class At {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    O(this, t);
  }
}
const p1 = D.litHtmlPolyfillSupport;
p1 == null || p1(W, G), (D.litHtmlVersions ?? (D.litHtmlVersions = [])).push("3.3.1");
const Lt = (i, t, e) => {
  const r = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = r._$litPart$;
  if (s === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    r._$litPart$ = s = new G(t.insertBefore(I(), o), o, void 0, e ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis;
let u = class extends z {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Lt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return L;
  }
};
var I1;
u._$litElement$ = !0, u.finalized = !0, (I1 = Z.litElementHydrateSupport) == null || I1.call(Z, { LitElement: u });
const C1 = Z.litElementPolyfillSupport;
C1 == null || C1({ LitElement: u });
(Z.litElementVersions ?? (Z.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mt = { attribute: !0, type: String, converter: t1, reflect: !1, hasChanged: y1 }, Et = (i = Mt, t, e) => {
  const { kind: r, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), r === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), r === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, i);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, i, l), l;
    } };
  }
  if (r === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, i);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function h(i) {
  return (t, e) => typeof e == "object" ? Et(i, t, e) : ((r, s, o) => {
    const n = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, r), n ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(i, t, e);
}
const Vt = '*,*:before,*:after{box-sizing:border-box}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}[hidden]:not([hidden=until-found]){display:none!important}body,article,p,span,div,li,td,th,dt,dd,h1,h2,h3,h4,h5,h6{overflow-wrap:anywhere;line-break:strict}body{line-height:1;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}li{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:"";content:none}table{border-collapse:collapse;border-spacing:0}a{text-decoration:none;color:inherit}button{all:unset;box-sizing:border-box}button,label,select,summary,[role=button],[role=option]{cursor:pointer}button,input,select,textarea{margin:0;font-family:inherit;font-size:100%}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}@media (prefers-reduced-motion: reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}input[type=text],input[type=email],input[type=password],input[type=search],input[type=tel],input[type=url],input[type=number],textarea{-webkit-appearance:none}a,button,input,select,textarea{touch-action:manipulation}:focus{outline:auto;outline-offset:2px}:focus:not(:focus-visible){outline:0}:focus-visible{outline:auto;outline-offset:2px}img{max-width:100%;height:auto}', St = ":host{--font-weight-normal: 400;--font-weight-bold: 700}:host,:host *{font-family:Arial,YakuHanJPs,Hiragino Sans,Hiragino Kaku Gothic ProN,Meiryo,Noto Sans JP,sans-serif;font-weight:var(--font-weight-normal);overflow-wrap:anywhere;line-break:strict}:host :lang(ja){--font-weight-normal: 300;--font-weight-bold: 600}:host :lang(en){--font-weight-normal: 300;--font-weight-bold: 600}:host :lang(zh){font-family:Arial,YakuHanJPs,PingFang SC,Microsoft YaHei,PingFang TC,Microsoft JhengHei,sans-serif}:where(:focus-visible){outline:inherit}fieldset{border:none}button{box-sizing:border-box}";
function x(...i) {
  const t = Z1`
    ${y(Vt)}
  `, e = Z1`
    ${y(St)}
  `;
  return [t, e, ...i];
}
const Zt = ':host{display:inline-block}.base{display:inline-block;width:100%;flex-basis:100%;padding-block:2px;border:1px solid transparent;border-radius:6px;position:relative;cursor:pointer;text-align:center}.base:disabled{cursor:not-allowed}.base:focus-visible{box-shadow:0 0 0 2px #fff,0 0 0 4px #191919}.text{line-height:1.5;letter-spacing:.02em}.medium{--loading-size: 16px;min-height:32px;padding-inline:12px}.medium .text{font-size:12px}.large{--loading-size: 19px;min-height:40px;padding-inline:16px}.large .text{font-size:14px}.x-large{--loading-size: 22px;min-height:48px;padding-inline:16px}.x-large .text{font-size:16px}.loading:before{content:"";display:block;border:2px solid #282828;border-bottom-color:#ededed;border-radius:50%;animation:1s linear infinite loading;transform-origin:center center;width:var(--loading-size);height:var(--loading-size);z-index:2;position:absolute;left:calc(50% - var(--loading-size) / 2);top:calc(50% - var(--loading-size) / 2)}.loading .text{visibility:hidden}@keyframes loading{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.normal.primary{background-color:#000000d6}.normal.primary .text{color:#fff}.normal.primary:hover{background-color:#000000e5}.normal.primary:active{background-color:#000}.normal.secondary{border-color:#000000d6}.normal.secondary .text{color:#000000d6}.normal.secondary:hover{background-color:#0000000a}.normal.secondary:active{background-color:#00000012}.normal.tertiary{border-color:#0000004a}.normal.tertiary .text{color:#000000d6}.normal.tertiary:hover{background-color:#0000000a}.normal.tertiary:active{background-color:#00000012}.danger.primary{background-color:#db351f}.danger.primary .text{color:#fff}.danger.primary:hover{background-color:#c92812}.danger.primary:active{background-color:#b02412}.danger.secondary{border-color:#db351f}.danger.secondary .text{color:#c92812}.danger.secondary:hover{background-color:#fff4f2}.danger.secondary:active{background-color:#ffedeb}.danger.tertiary{border-color:#db351f}.danger.tertiary .text{color:#c92812}.danger.tertiary:hover{background-color:#fff4f2}.danger.tertiary:active{background-color:#ffedeb}:is(.normal,.danger).secondary .text{font-weight:var(--font-weight-bold)}:is(.normal,.danger).primary .text{font-weight:var(--font-weight-bold)}:is(.normal,.danger).primary:disabled{background-color:#0000000d;border-color:transparent}:is(.normal,.danger).primary:disabled .text{color:#00000059}:is(.normal,.danger).primary:disabled:hover{background-color:#0000000d;border-color:transparent}:is(.normal,.danger):is(.secondary,.tertiary):disabled{background-color:transparent;border-color:#0000001a}:is(.normal,.danger):is(.secondary,.tertiary):disabled .text{color:#00000059}:is(.normal,.danger):is(.secondary,.tertiary):disabled:hover{background-color:transparent;border-color:#0000001a}';
var kt = Object.defineProperty, M = (i, t, e, r) => {
  for (var s = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (s = n(t, e, s) || s);
  return s && kt(t, e, s), s;
};
const R1 = ["primary", "secondary", "tertiary"], D1 = ["medium", "large", "xLarge"];
function Pt(i) {
  return R1.some((t) => t === i) ? i : (console.warn(`${i}は無効なvariants属性です。`), R1[0]);
}
function zt(i) {
  return D1.some((t) => t === i) ? i : (console.warn(`${i}は無効なsize属性です。`), D1[0]);
}
const $1 = class $1 extends u {
  constructor() {
    super(...arguments), this.loading = !1, this.disabled = !1, this.danger = !1, this.variants = "primary", this.size = "medium", this.name = "", this.value = "", this.type = "button";
  }
  get buttonClasses() {
    const t = {
      medium: "medium",
      large: "large",
      xLarge: "x-large"
    };
    return [
      "base",
      this.danger ? "danger" : "normal",
      Pt(this.variants),
      t[zt(this.size)],
      this.loading ? "loading" : ""
    ].filter(Boolean).join(" ");
  }
  get isDisabled() {
    return this.disabled || this.loading;
  }
  render() {
    return g`
      <button
        class="${this.buttonClasses}"
        ?disabled="${this.isDisabled}"
        name="${this.name}"
        value="${this.value}"
        type="${this.type}"
      >
        <slot class="text"></slot>
      </button>
    `;
  }
};
$1.styles = x(y(Zt));
let m = $1;
M([
  h({ type: Boolean, reflect: !0 })
], m.prototype, "loading");
M([
  h({ type: Boolean, reflect: !0 })
], m.prototype, "disabled");
M([
  h({ type: Boolean, reflect: !0 })
], m.prototype, "danger");
M([
  h({ type: String })
], m.prototype, "variants");
M([
  h({ type: String })
], m.prototype, "size");
M([
  h({ type: String })
], m.prototype, "name");
M([
  h({ type: String })
], m.prototype, "value");
M([
  h({ type: String })
], m.prototype, "type");
customElements.get("sp-button") || customElements.define("sp-button", m);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y1 = { ATTRIBUTE: 1, CHILD: 2 }, G1 = (i) => (...t) => ({ _$litDirective$: i, values: t });
class Q1 {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, r) {
    this._$Ct = t, this._$AM = e, this._$Ci = r;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let u1 = class extends Q1 {
  constructor(t) {
    if (super(t), this.it = p, t.type !== Y1.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === p || t == null) return this._t = void 0, this.it = t;
    if (t === L) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
};
u1.directiveName = "unsafeHTML", u1.resultType = 1;
const X1 = G1(u1), Ot = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.99 7.55L16.45 3.01C16.12 2.68 15.68 2.5 15.21 2.5H8.79C8.32 2.5 7.88 2.68 7.55 3.01L3.01 7.55C2.68 7.88 2.5 8.33 2.5 8.79V15.21C2.5 15.67 2.69 16.12 3.01 16.45L7.55 20.99C7.88 21.32 8.32 21.5 8.79 21.5H15.21C15.68 21.5 16.12 21.32 16.45 20.99L20.99 16.45C21.32 16.12 21.5 15.67 21.5 15.21V8.79C21.5 8.33 21.31 7.88 20.99 7.55Z" fill="#DB351F"/><path d="M13.06 11.99L16.28 8.77002C16.57 8.48002 16.57 8.00002 16.28 7.71002C15.99 7.42002 15.51 7.42002 15.22 7.71002L12 10.93L8.78 7.71002C8.49 7.42002 8.01 7.42002 7.72 7.71002C7.43 8.00002 7.43 8.48002 7.72 8.77002L10.94 11.99L7.72 15.21C7.43 15.5 7.43 15.98 7.72 16.27C7.87 16.42 8.06 16.49 8.25 16.49C8.44 16.49 8.63 16.42 8.78 16.27L12 13.05L15.22 16.27C15.37 16.42 15.56 16.49 15.75 16.49C15.94 16.49 16.13 16.42 16.28 16.27C16.57 15.98 16.57 15.5 16.28 15.21L13.06 11.99Z" fill="white"/></svg>', Tt = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20.5C7.31 20.5 3.5 16.69 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 16.69 16.69 20.5 12 20.5ZM12 10.75C11.59 10.75 11.25 11.09 11.25 11.5V16.5C11.25 16.91 11.59 17.25 12 17.25C12.41 17.25 12.75 16.91 12.75 16.5V11.5C12.75 11.09 12.41 10.75 12 10.75ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z" fill="currentColor" fill-opacity="0.84"/></svg>', Ut = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.79 10.98C9.58893 10.98 7.80805 9.19 7.80805 6.99C7.80805 4.79 9.59893 3 11.79 3C13.9811 3 15.772 4.79 15.772 6.99C15.772 9.19 13.9811 10.98 11.79 10.98ZM11.79 4.5C10.4193 4.5 9.30879 5.62 9.30879 6.99C9.30879 8.36 10.4193 9.48 11.79 9.48C13.1607 9.48 14.2712 8.36 14.2712 6.99C14.2712 5.62 13.1607 4.5 11.79 4.5ZM17.9331 21H5.58695C4.94663 21 4.34633 20.72 3.94613 20.22C3.56595 19.75 3.41587 19.14 3.54594 18.55C4.36634 14.82 7.81805 12.12 11.75 12.12C15.6819 12.12 19.1437 14.82 19.9541 18.55C20.0841 19.14 19.9341 19.75 19.5539 20.22C19.1537 20.71 18.5634 21 17.9131 21H17.9331ZM11.76 13.62C8.5184 13.62 5.687 15.83 5.01666 18.87C4.97664 19.06 5.06669 19.21 5.11671 19.28C5.22677 19.42 5.39685 19.5 5.58695 19.5H17.9331C18.1232 19.5 18.2932 19.42 18.4033 19.28C18.4633 19.21 18.5434 19.07 18.5033 18.87C17.833 15.83 15.0016 13.62 11.76 13.62Z" fill="currentColor" fill-opacity="0.84"/></svg>', Nt = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1090_197)"><path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2Z" fill="#12A35B"/><path d="M10.8281 15.2598C10.6481 15.2598 10.4581 15.1898 10.3181 15.0598L7.23808 12.2098C6.93808 11.9298 6.91808 11.4498 7.19808 11.1498C7.47808 10.8498 7.95808 10.8298 8.25808 11.1098L10.8281 13.4898L15.7381 8.93978C16.0381 8.65978 16.5181 8.67978 16.7981 8.97978C17.0781 9.27978 17.0581 9.75978 16.7581 10.0398L11.3381 15.0598C11.1981 15.1898 11.0081 15.2598 10.8281 15.2598Z" fill="white"/></g><defs><clipPath id="clip0_1090_197"><rect width="20" height="20" fill="white" transform="translate(2 2)"/></clipPath></defs></svg>', Bt = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.49 22 2 17.51 2 12C2 6.49 6.49 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22ZM12 3.5C7.31 3.5 3.5 7.31 3.5 12C3.5 16.69 7.31 20.5 12 20.5C16.69 20.5 20.5 16.69 20.5 12C20.5 7.31 16.69 3.5 12 3.5ZM10.83 15.26C10.65 15.26 10.46 15.19 10.32 15.06L7.24 12.21C6.94 11.93 6.92 11.45 7.2 11.15C7.48 10.85 7.96 10.83 8.26 11.11L10.83 13.49L15.74 8.94C16.04 8.66 16.52 8.68 16.8 8.98C17.08 9.28 17.06 9.76 16.76 10.04L11.34 15.06C11.2 15.19 11.01 15.26 10.83 15.26Z" fill="currentColor"/></svg>', jt = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0013 16.995C11.8113 16.995 11.6213 16.925 11.4713 16.775L3.22127 8.645C2.93127 8.355 2.92127 7.875 3.22127 7.585C3.51127 7.285 3.99127 7.285 4.28127 7.585L12.0013 15.195L19.7213 7.585C20.0113 7.295 20.4913 7.295 20.7813 7.585C21.0713 7.875 21.0713 8.355 20.7813 8.645L12.5313 16.775C12.3813 16.915 12.1913 16.995 12.0013 16.995Z" fill="currentColor" fill-opacity="0.84"/></svg>', Rt = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM19.74 8.5H15.77C15.52 6.68 15.07 5.04 14.43 3.86C16.8 4.57 18.74 6.28 19.75 8.5H19.74ZM20.5 12C20.5 12.69 20.41 13.36 20.25 14H15.92C15.97 13.34 16 12.67 16 12C16 11.33 15.97 10.66 15.92 10H20.25C20.41 10.64 20.5 11.31 20.5 12ZM12 20.5C11.23 20.5 10.21 18.63 9.75 15.5H14.26C13.8 18.63 12.77 20.5 12.01 20.5H12ZM9.58 14C9.53 13.37 9.5 12.7 9.5 12C9.5 11.3 9.53 10.63 9.58 10H14.42C14.47 10.63 14.5 11.3 14.5 12C14.5 12.7 14.47 13.37 14.42 14H9.58ZM3.5 12C3.5 11.31 3.59 10.64 3.75 10H8.08C8.03 10.66 8 11.33 8 12C8 12.67 8.03 13.34 8.08 14H3.75C3.59 13.36 3.5 12.69 3.5 12ZM12 3.5C12.77 3.5 13.79 5.37 14.25 8.5H9.74C10.2 5.37 11.23 3.5 11.99 3.5H12ZM9.58 3.86C8.94 5.04 8.49 6.69 8.24 8.5H4.27C5.28 6.28 7.22 4.56 9.59 3.86H9.58ZM4.26 15.5H8.23C8.48 17.32 8.93 18.96 9.57 20.14C7.2 19.43 5.26 17.72 4.25 15.5H4.26ZM14.42 20.14C15.06 18.96 15.51 17.31 15.76 15.5H19.73C18.72 17.72 16.78 19.44 14.41 20.14H14.42Z" fill="currentColor" fill-opacity="0.84"/></svg>', Dt = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.01 15.1536C11.8298 15.1536 11.6597 15.0935 11.5095 14.9634L6.25436 10.3188C5.94406 10.0486 5.91403 9.56809 6.1843 9.25779C6.45456 8.94749 6.93503 8.91746 7.24534 9.18772L12 13.3918L16.7547 9.18772C17.065 8.91746 17.5354 8.93748 17.8157 9.25779C18.086 9.56809 18.0559 10.0386 17.7456 10.3188L12.4905 14.9634C12.3503 15.0935 12.1702 15.1536 11.99 15.1536H12.01Z" fill="currentColor" fill-opacity="0.84"/></svg>', It = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.557 15.637C10.377 15.637 10.197 15.567 10.047 15.437L6.24703 11.957C5.93703 11.677 5.91703 11.207 6.19703 10.897C6.47703 10.597 6.94703 10.567 7.25703 10.847L10.547 13.867L16.747 8.19703C17.057 7.91703 17.527 7.93703 17.807 8.24703C18.087 8.55703 18.067 9.02703 17.757 9.30703L11.057 15.447C10.917 15.577 10.727 15.647 10.547 15.647L10.557 15.637Z" fill="currentColor" fill-opacity="0.84"/></svg>';
var qt = Object.defineProperty, Wt = (i, t, e, r) => {
  for (var s = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (s = n(t, e, s) || s);
  return s && qt(t, e, s), s;
}, Y;
const x1 = class x1 extends u {
  constructor() {
    super(...arguments);
    E(this, Y);
    this.type = "", V1(this, Y, /* @__PURE__ */ new Map([
      ["error-fill", Ot],
      ["information-circle", Tt],
      ["person", Ut],
      ["check-circle-fill", Nt],
      ["check-small", It],
      ["check-circle", Bt],
      ["chevron-down", jt],
      ["chevron-down-small", Dt],
      ["globe", Rt]
    ]));
  }
  render() {
    const e = E1(this, Y).get(this.type);
    return e ? g`${X1(e)}` : g``;
  }
};
Y = new WeakMap(), x1.styles = x();
let s1 = x1;
Wt([
  h({ type: String, reflect: !0 })
], s1.prototype, "type");
customElements.get("sp-icon") || customElements.define("sp-icon", s1);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = G1(class extends Q1 {
  constructor(i) {
    var t;
    if (super(i), i.type !== Y1.ATTRIBUTE || i.name !== "class" || ((t = i.strings) == null ? void 0 : t.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return " " + Object.keys(i).filter(((t) => i[t])).join(" ") + " ";
  }
  update(i, [t]) {
    var r, s;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), i.strings !== void 0 && (this.nt = new Set(i.strings.join(" ").split(/\s/).filter(((o) => o !== ""))));
      for (const o in t) t[o] && !((r = this.nt) != null && r.has(o)) && this.st.add(o);
      return this.render(t);
    }
    const e = i.element.classList;
    for (const o of this.st) o in t || (e.remove(o), this.st.delete(o));
    for (const o in t) {
      const n = !!t[o];
      n === this.st.has(o) || (s = this.nt) != null && s.has(o) || (n ? (e.add(o), this.st.add(o)) : (e.remove(o), this.st.delete(o)));
    }
    return L;
  }
}), Jt = ":host{display:flex;flex-direction:column;gap:4px}:host .label{font-weight:var(--font-weight-bold);font-size:14px;color:#000000d6}:host .label.none{display:none}:host .support{font-weight:var(--font-weight-normal);font-size:12px;color:#0000008a}:host .support.none{display:none}";
var Ft = Object.defineProperty, tt = (i, t, e, r) => {
  for (var s = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (s = n(t, e, s) || s);
  return s && Ft(t, e, s), s;
}, U, et, st;
const _1 = class _1 extends u {
  constructor() {
    super(...arguments);
    E(this, U);
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
      <span class=${$(this, U, et).call(this)}>${this.text}</span>
      <span class=${$(this, U, st).call(this)}>${this.supportText}</span>
    `;
  }
};
U = new WeakSet(), et = function() {
  return J({
    label: !0,
    none: !this.text
  });
}, st = function() {
  return J({
    support: !0,
    none: !this.supportText
  });
}, _1.styles = x(y(Jt));
let F = _1;
tt([
  h({ type: String, reflect: !0 })
], F.prototype, "text");
tt([
  h({ type: String, attribute: "support-text", reflect: !0 })
], F.prototype, "supportText");
customElements.get("sp-label-unit") || customElements.define("sp-label-unit", F);
const Kt = `<svg viewBox="0 0 74 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_10_438)">
<path d="M0.812012 1.2381V24.7619C0.812012 25.4457 1.36633 26 2.05011 26H57.9432C58.6067 26 59.2198 25.646 59.5516 25.0714L73.1687 1.48571C73.5499 0.825395 73.0734 0 72.3109 0H2.05011C1.36633 0 0.812012 0.554314 0.812012 1.2381Z" fill="#F72A48"/>
<path d="M10.5969 17.5256C10.0161 17.8902 9.39656 18.2299 8.73824 18.5363C8.73805 18.5364 8.73787 18.5365 8.73767 18.5365C8.73767 18.5366 8.73768 18.5365 8.73767 18.5365L7.3739 16.5267C10.5202 15.1267 12.7216 13.069 13.7984 10.8079H8.36688V8.63046L16.9291 8.63047C16.6076 10.614 15.8557 12.3764 14.6848 13.9237C15.874 14.7334 17.1438 15.6717 18.2251 16.6103L16.6578 18.68C15.5557 17.6134 14.371 16.6055 13.1394 15.6214C12.395 16.3092 11.547 16.9436 10.5969 17.5256ZM31.8955 12.1251V14.533H39.9379L41.3298 12.1251H31.8955ZM53.7827 6.56189L53.3408 8.28962H54.8604L55.3012 6.56189H53.7827ZM51.3513 6.56189L50.9106 8.28962H52.4302L52.871 6.56189H51.3513ZM45.9291 18.9428L44.4946 16.9455C45.9176 16.5384 47.1377 15.9168 48.1075 15.1511C47.3533 14.4926 46.5161 13.8469 45.7377 13.2968C45.3318 13.667 44.9005 14.0141 44.4104 14.337L42.8305 12.7583C44.8763 11.2625 45.9776 9.51546 46.6234 7.63808L48.9448 8.21119C48.849 8.48682 48.7406 8.77393 48.6219 9.06111H53.4553C53.1748 13.532 50.8371 17.2615 45.9291 18.9428ZM50.6549 11.1668H47.5205C47.4018 11.3467 47.2061 11.6216 47.0746 11.8014C47.8634 12.2673 48.7623 12.9547 49.588 13.6132C50.0908 12.8832 50.5119 11.9683 50.6549 11.1668ZM22.8732 14.9699V13.8051C25.3258 13.5538 27.7066 13.1231 29.3577 12.6924L28.8911 10.3953C27.0367 10.9576 24.7994 11.3405 22.8971 11.5798C22.9091 10.6346 22.921 8.98122 22.945 8.03607L20.5402 8.63047V15.7356C20.5402 18.272 21.7246 18.5113 24.7755 18.5113C26.0436 18.5113 28.257 18.4874 29.3457 18.4275V16.1424C28.3527 16.2022 25.936 16.286 24.6797 16.286C23.1842 16.286 22.8732 16.2022 22.8732 14.9699ZM30.7542 8.25709C30.7542 9.19336 29.9953 9.95229 29.059 9.95229C28.1228 9.95229 27.3638 9.19336 27.3638 8.25709C27.3638 7.32087 28.1228 6.56189 29.059 6.56189C29.9953 6.56189 30.7542 7.32087 30.7542 8.25709ZM29.9006 8.25709C29.9006 7.79235 29.5238 7.41554 29.059 7.41554C28.5943 7.41554 28.2175 7.79235 28.2175 8.25709C28.2175 8.7219 28.5943 9.09863 29.059 9.09863C29.5238 9.09863 29.9006 8.7219 29.9006 8.25709Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_10_438">
<rect width="72.4909" height="26" fill="white" transform="translate(0.812012)"/>
</clipPath>
</defs>
</svg>
`, Yt = `<svg viewBox="0 0 74 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M72.1973 0H1.9354C1.25055 0 0.697144 0.556428 0.697144 1.23822V24.7618C0.697144 25.4466 1.25055 26 1.9354 26H57.8275C58.491 26 59.1055 25.6454 59.4357 25.0706L73.0533 1.48589C73.4355 0.82548 72.9585 0 72.1973 0Z" fill="#F72A48"/>
<path d="M13.1507 10.0632C12.9506 9.80871 12.6891 9.60628 12.3665 9.45625C12.0436 9.30623 11.7323 9.23123 11.4323 9.23123C11.2776 9.23123 11.1207 9.24486 10.9618 9.27214C10.8026 9.29942 10.6594 9.35184 10.5322 9.42899C10.4047 9.50633 10.298 9.60628 10.2117 9.72902C10.1252 9.85175 10.0821 10.0086 10.0821 10.1995C10.0821 10.3632 10.1162 10.4996 10.1844 10.6087C10.2526 10.7178 10.3525 10.8132 10.4844 10.8951C10.6161 10.9769 10.773 11.0519 10.9549 11.1201C11.1367 11.1883 11.3413 11.2588 11.5687 11.3315C11.896 11.4406 12.2369 11.5612 12.5915 11.6929C12.9461 11.8248 13.2687 11.9998 13.5598 12.218C13.8507 12.4362 14.0917 12.7068 14.2826 13.0294C14.4736 13.3523 14.569 13.7546 14.569 14.2364C14.569 14.7911 14.4667 15.2708 14.2622 15.6752C14.0576 16.0799 13.7825 16.414 13.4371 16.6776C13.0914 16.9414 12.6959 17.1368 12.2506 17.2641C11.805 17.3913 11.3457 17.455 10.8731 17.455C10.1821 17.455 9.51379 17.3344 8.86833 17.0936C8.22263 16.8528 7.68629 16.5095 7.25903 16.0639L8.7865 14.5092C9.02284 14.8003 9.33414 15.0434 9.72071 15.2388C10.107 15.4344 10.4913 15.532 10.8731 15.532C11.0457 15.532 11.2141 15.5139 11.3777 15.4775C11.5414 15.4412 11.6846 15.382 11.8073 15.3002C11.9301 15.2183 12.0277 15.1092 12.1006 14.9729C12.1732 14.8365 12.2097 14.6728 12.2097 14.4819C12.2097 14.3001 12.164 14.1456 12.0733 14.0182C11.9823 13.891 11.8527 13.7751 11.6846 13.6704C11.5163 13.566 11.3072 13.4705 11.0572 13.384C10.8071 13.2977 10.523 13.2046 10.2048 13.1044C9.89565 13.0045 9.59327 12.8862 9.29794 12.7499C9.00237 12.6135 8.73875 12.4385 8.5069 12.2248C8.27505 12.0113 8.08859 11.7521 7.94777 11.4474C7.80671 11.1429 7.73636 10.7723 7.73636 10.3359C7.73636 9.79955 7.84547 9.34034 8.06367 8.95847C8.28189 8.57661 8.5683 8.26292 8.92289 8.01745C9.27748 7.77196 9.67746 7.59253 10.123 7.47874C10.5684 7.36517 11.0185 7.30826 11.4732 7.30826C12.0187 7.30826 12.5755 7.40842 13.1439 7.6083C13.712 7.8084 14.2098 8.10396 14.6372 8.49477L13.1507 10.0632ZM22.97 12.4304C22.8217 11.9978 22.6086 11.6177 22.3304 11.2902C22.0524 10.9627 21.7125 10.7032 21.314 10.5147C20.9123 10.3232 20.4674 10.2274 19.9761 10.2274C19.4786 10.2274 19.043 10.3293 18.6753 10.5332C18.3076 10.7372 18.0171 10.9782 17.8101 11.2501H17.7668V10.4189H15.6411V20.5717L17.8781 20.0186V16.4594H17.9059C18.1129 16.7499 18.4034 16.9785 18.7772 17.1484C19.1511 17.3153 19.5466 17.4018 19.9637 17.4018C20.4736 17.4018 20.9277 17.2998 21.3263 17.099C21.7279 16.9013 22.0648 16.6355 22.3428 16.3018C22.6209 15.9713 22.831 15.5881 22.9793 15.1494C23.1245 14.7137 23.1956 14.2595 23.1956 13.7868C23.1956 13.314 23.1214 12.8598 22.97 12.4304ZM20.9247 14.4356C20.8566 14.6488 20.7578 14.8373 20.6249 15.001C20.492 15.1648 20.3283 15.2946 20.1275 15.3965C19.9267 15.4954 19.6949 15.5448 19.4323 15.5448C19.1758 15.5448 18.9503 15.4954 18.7494 15.3965C18.5486 15.2946 18.3787 15.1648 18.2397 15.001C18.0975 14.8373 17.9894 14.6488 17.9121 14.4418C17.8349 14.2317 17.7947 14.0185 17.7947 13.7991C17.7947 13.5829 17.8349 13.3697 17.9121 13.1595C17.9894 12.9495 18.0975 12.764 18.2397 12.6003C18.3787 12.4365 18.5486 12.3037 18.7494 12.2048C18.9503 12.1029 19.1758 12.0534 19.4323 12.0534C19.6949 12.0534 19.9267 12.1029 20.1275 12.2048C20.3283 12.3037 20.492 12.4335 20.6249 12.5941C20.7578 12.7517 20.8566 12.9371 20.9247 13.1441C20.9926 13.3542 21.0266 13.5674 21.0266 13.7868C21.0266 14.003 20.9926 14.2193 20.9247 14.4356ZM31.1612 13.8954V14.1682C31.1612 14.2592 31.1565 14.3455 31.1476 14.4273H26.2242C26.2424 14.6183 26.2992 14.7911 26.3947 14.9456C26.4902 15.1003 26.6129 15.2343 26.7629 15.3479C26.913 15.4617 27.0811 15.5503 27.2676 15.6138C27.4538 15.6776 27.6471 15.7093 27.8472 15.7093C28.2017 15.7093 28.5018 15.6435 28.7473 15.5115C28.9928 15.3799 29.1926 15.2094 29.3473 15.0001L30.9021 15.9821C30.5837 16.4458 30.1633 16.8027 29.6406 17.0527C29.1176 17.3026 28.5108 17.4277 27.8199 17.4277C27.3106 17.4277 26.8288 17.348 26.3743 17.189C25.9195 17.0301 25.5219 16.7982 25.1809 16.4935C24.84 16.189 24.5717 15.8139 24.3763 15.3684C24.1807 14.923 24.0831 14.4137 24.0831 13.8409C24.0831 13.2864 24.1785 12.7839 24.3695 12.3339C24.5604 11.8838 24.8195 11.502 25.1468 11.1883C25.4742 10.8746 25.8605 10.6315 26.3061 10.4587C26.7514 10.2861 27.2335 10.1995 27.7517 10.1995C28.2516 10.1995 28.7108 10.2837 29.1291 10.4518C29.5472 10.6202 29.9065 10.8633 30.2065 11.1815C30.5066 11.4998 30.7406 11.8862 30.9089 12.3407C31.0771 12.7954 31.1612 13.3137 31.1612 13.8954ZM29.1019 13.0362C29.1019 12.6817 28.9904 12.3771 28.7677 12.1225C28.5448 11.8681 28.2107 11.7406 27.7654 11.7406C27.5471 11.7406 27.347 11.7747 27.1653 11.8429C26.9833 11.9111 26.8243 12.0044 26.6879 12.1225C26.5515 12.2408 26.4424 12.3795 26.3606 12.5385C26.2788 12.6976 26.2332 12.8636 26.2242 13.0362H29.1019ZM39.153 13.8954V14.1682C39.153 14.2592 39.1483 14.3455 39.1394 14.4273H34.2161C34.2342 14.6183 34.2911 14.7911 34.3865 14.9456C34.482 15.1003 34.6047 15.2343 34.7548 15.3479C34.9048 15.4617 35.0729 15.5503 35.2594 15.6138C35.4456 15.6776 35.6389 15.7093 35.839 15.7093C36.1936 15.7093 36.4936 15.6435 36.7391 15.5115C36.9846 15.3799 37.1845 15.2094 37.3392 15.0001L38.8939 15.9821C38.5755 16.4458 38.1551 16.8027 37.6324 17.0527C37.1094 17.3026 36.5025 17.4277 35.8117 17.4277C35.3024 17.4277 34.8206 17.348 34.3661 17.189C33.9113 17.0301 33.5137 16.7982 33.1728 16.4935C32.8318 16.189 32.5635 15.8139 32.3681 15.3684C32.1725 14.923 32.0749 14.4137 32.0749 13.8409C32.0749 13.2864 32.1703 12.7839 32.3613 12.3339C32.5522 11.8838 32.8113 11.502 33.1387 11.1883C33.4659 10.8746 33.8523 10.6315 34.2979 10.4587C34.7432 10.2861 35.2253 10.1995 35.7435 10.1995C36.2434 10.1995 36.7027 10.2837 37.121 10.4518C37.5391 10.6202 37.8983 10.8633 38.1984 11.1815C38.4984 11.4998 38.7324 11.8862 38.9007 12.3407C39.0688 12.7954 39.153 13.3137 39.153 13.8954ZM37.0937 13.0362C37.0937 12.6817 36.9823 12.3771 36.7596 12.1225C36.5366 11.8681 36.2025 11.7406 35.7571 11.7406C35.5389 11.7406 35.3388 11.7747 35.1571 11.8429C34.9751 11.9111 34.8161 12.0044 34.6798 12.1225C34.5434 12.2408 34.4343 12.3795 34.3524 12.5385C34.2706 12.6976 34.225 12.8636 34.2161 13.0362H37.0937ZM45.3733 7.11546V11.1419H45.3454C45.1539 10.9133 44.8851 10.7032 44.5391 10.5147C44.193 10.3232 43.7728 10.2274 43.2722 10.2274C42.7809 10.2274 42.336 10.3232 41.9406 10.5147C41.545 10.7032 41.2114 10.9627 40.9333 11.2902C40.6552 11.6177 40.442 11.9978 40.2906 12.4304C40.1423 12.8598 40.0682 13.314 40.0682 13.7868C40.0682 14.2595 40.1392 14.7137 40.2845 15.1494C40.4297 15.5881 40.6428 15.9713 40.9179 16.3018C41.1959 16.6355 41.5358 16.9013 41.9344 17.099C42.336 17.2998 42.7903 17.4018 43.3001 17.4018C43.7542 17.4018 44.1837 17.306 44.5885 17.1206C44.9932 16.9352 45.3022 16.6695 45.5216 16.3235H45.5494V17.2103H47.6072V6.56238L45.3733 7.11546ZM45.3516 14.4418C45.2744 14.6488 45.1663 14.8373 45.0242 15.001C44.882 15.1648 44.712 15.2946 44.5112 15.3965C44.3135 15.4954 44.0849 15.5448 43.8315 15.5448C43.5657 15.5448 43.334 15.4954 43.1363 15.3965C42.9354 15.2946 42.7655 15.1648 42.6296 15.001C42.4936 14.8373 42.3917 14.6488 42.3237 14.4356C42.2557 14.2193 42.2217 14.003 42.2217 13.7868C42.2217 13.5674 42.2557 13.3542 42.3237 13.1441C42.3917 12.9371 42.4936 12.7517 42.6296 12.5941C42.7655 12.4335 42.9354 12.3037 43.1363 12.2048C43.334 12.1029 43.5657 12.0534 43.8315 12.0534C44.0849 12.0534 44.3135 12.1029 44.5112 12.2048C44.712 12.3037 44.882 12.4365 45.0242 12.6003C45.1663 12.764 45.2744 12.9495 45.3516 13.1595C45.4289 13.3697 45.466 13.5829 45.466 13.7991C45.466 14.0185 45.4289 14.2317 45.3516 14.4418ZM49.0353 11.3451C49.4352 10.9633 49.9013 10.6769 50.4331 10.4859C50.965 10.295 51.5082 10.1995 52.0629 10.1995C52.6357 10.1995 53.1199 10.2701 53.5153 10.4109C53.9108 10.552 54.2313 10.7702 54.4768 11.0655C54.7223 11.3611 54.9017 11.7338 55.0155 12.1839C55.1291 12.6339 55.186 13.1681 55.186 13.7863V17.2095H53.1403V16.4867H53.0994C52.9266 16.7686 52.6651 16.9868 52.3152 17.1413C51.9651 17.2958 51.5856 17.3731 51.1764 17.3731C50.9037 17.3731 50.6217 17.3367 50.3309 17.2641C50.0398 17.1914 49.7738 17.0731 49.533 16.9095C49.292 16.7458 49.0943 16.5276 48.9398 16.2548C48.7851 15.9821 48.7079 15.6458 48.7079 15.2456C48.7079 14.7546 48.842 14.3591 49.1102 14.0591C49.3783 13.7591 49.724 13.5272 50.1467 13.3636C50.5695 13.1999 51.04 13.0908 51.5583 13.0362C52.0765 12.9817 52.5811 12.9544 53.0721 12.9544V12.8453C53.0721 12.5091 52.9538 12.2612 52.7175 12.102C52.481 11.9431 52.1901 11.8634 51.8447 11.8634C51.5263 11.8634 51.2195 11.9316 50.9241 12.0679C50.6286 12.2043 50.3763 12.368 50.1672 12.5589L49.0353 11.3451ZM53.1403 14.25H52.8539C52.6084 14.25 52.3606 14.2615 52.1106 14.2841C51.8604 14.3069 51.6378 14.3502 51.4423 14.4137C51.2467 14.4774 51.0854 14.5705 50.9582 14.6933C50.8308 14.816 50.7673 14.9775 50.7673 15.1774C50.7673 15.3049 50.7967 15.414 50.8559 15.5047C50.9149 15.5957 50.99 15.6684 51.081 15.7229C51.1717 15.7775 51.2764 15.8163 51.3946 15.8389C51.5127 15.8617 51.6265 15.873 51.7356 15.873C52.1901 15.873 52.5379 15.7481 52.7789 15.4979C53.0197 15.248 53.1403 14.9093 53.1403 14.4819V14.25Z" fill="white"/>
</svg>
`, Gt = `<svg viewBox="0 0 134 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_10_447)">
<path d="M1.04199 0V3.126H2.08399V10.418H19.168V0H1.04199ZM4.74999 2.292H9.47999V4.272H4.74999V2.292ZM4.74999 6.146H9.47999V8.126H4.74999V6.146ZM16.5 8.124H11.77V6.144H16.5V8.124ZM16.5 4.27H11.77V2.29H16.5V4.27Z" fill="#191919"/>
<path d="M15.088 11.876L16.892 15H19.538L17.734 11.876H15.088Z" fill="#191919"/>
<path d="M15.404 15L13.6 11.876H10.954L12.758 15H15.404Z" fill="#191919"/>
<path d="M2.76 20L4.77 12.5H2.01L0 20H2.76Z" fill="#191919"/>
<path d="M17.708 16.584V17.416H8.49998V14.374H9.41598V12.5H5.83398V18.124L7.70798 20H18.958L20.834 18.124V16.584H17.708Z" fill="#191919"/>
<path d="M68.86 7.99L68.51 8.342L62.266 14.584H65.802L70.276 10.108L74.752 14.584H78.288L71.36 7.658V6.042H75.944V3.75H71.36V1.874H72.278V0H68.86V3.75H64.278V6.042H68.86V7.99Z" fill="#191919"/>
<path d="M62.17 3.124L59.046 0H55.804L58.93 3.124H62.17Z" fill="#191919"/>
<path d="M75.152 17.416H62.482L60.986 14.824V5H56.194V7.5H58.278V15.6L53.876 20H57.412L59.742 17.67L61.088 20H61.946H76.402L78.278 18.126V16.584H75.152V17.416Z" fill="#191919"/>
<path d="M28.53 14.584L30.186 8.40601H27.426L25.77 14.584H28.53Z" fill="#191919"/>
<path d="M40.352 0.00201416H32.91L30.788 2.29401H38.228L40.352 0.00201416Z" fill="#191919"/>
<path d="M45.142 17.418H36.186V12.722L46.196 2.71H48.268V0H45.166L36.186 8.98V5.874H37.102V4H33.478V11.688L29.056 16.11V16.114H29.052L25.166 20H28.908L33.478 15.43V18.126L35.352 20H46.392L48.268 18.126V16.584H45.142V17.418Z" fill="#191919"/>
<path d="M47.434 14.584L45.76 8.33398H43L44.674 14.584H47.434Z" fill="#191919"/>
<path d="M91.754 7.952C91.568 7.716 91.326 7.528 91.026 7.388C90.726 7.248 90.438 7.18 90.16 7.18C90.016 7.18 89.87 7.192 89.724 7.218C89.576 7.244 89.444 7.292 89.326 7.364C89.208 7.436 89.108 7.528 89.028 7.642C88.948 7.756 88.908 7.902 88.908 8.078C88.908 8.23 88.94 8.356 89.002 8.458C89.066 8.56 89.158 8.648 89.28 8.724C89.402 8.8 89.548 8.87 89.716 8.932C89.884 8.996 90.074 9.06 90.286 9.128C90.59 9.23 90.906 9.342 91.236 9.464C91.566 9.586 91.864 9.748 92.134 9.952C92.404 10.154 92.628 10.406 92.804 10.706C92.982 11.006 93.07 11.378 93.07 11.826C93.07 12.34 92.976 12.786 92.786 13.162C92.596 13.538 92.34 13.848 92.02 14.092C91.7 14.336 91.332 14.518 90.918 14.636C90.504 14.754 90.078 14.814 89.64 14.814C88.998 14.814 88.378 14.702 87.78 14.478C87.18 14.254 86.684 13.936 86.286 13.522L87.704 12.08C87.924 12.35 88.212 12.576 88.57 12.758C88.928 12.94 89.286 13.03 89.64 13.03C89.8 13.03 89.956 13.014 90.108 12.98C90.26 12.946 90.392 12.892 90.506 12.816C90.62 12.74 90.71 12.638 90.778 12.512C90.846 12.386 90.88 12.234 90.88 12.056C90.88 11.878 90.838 11.744 90.754 11.626C90.67 11.508 90.55 11.4 90.394 11.304C90.238 11.208 90.044 11.118 89.812 11.038C89.58 10.958 89.316 10.872 89.022 10.778C88.736 10.686 88.454 10.576 88.18 10.448C87.906 10.322 87.662 10.16 87.446 9.96C87.23 9.762 87.058 9.522 86.928 9.238C86.798 8.956 86.732 8.612 86.732 8.206C86.732 7.708 86.834 7.282 87.036 6.928C87.238 6.574 87.504 6.282 87.834 6.054C88.164 5.826 88.534 5.66 88.948 5.554C89.362 5.448 89.778 5.396 90.2 5.396C90.706 5.396 91.222 5.488 91.75 5.674C92.278 5.86 92.74 6.134 93.136 6.496L91.756 7.952H91.754Z" fill="#191919"/>
<path d="M101.434 10.148C101.296 9.746 101.098 9.394 100.84 9.09C100.582 8.786 100.266 8.546 99.896 8.37C99.524 8.192 99.11 8.104 98.654 8.104C98.198 8.104 97.788 8.198 97.446 8.388C97.104 8.578 96.836 8.8 96.644 9.054H96.604V8.282H94.632V17.704L96.708 17.19V13.888H96.734C96.926 14.158 97.196 14.37 97.542 14.528C97.888 14.682 98.256 14.764 98.644 14.764C99.118 14.764 99.538 14.67 99.908 14.484C100.28 14.3 100.594 14.054 100.852 13.744C101.11 13.438 101.306 13.082 101.442 12.674C101.576 12.27 101.642 11.848 101.642 11.41C101.642 10.972 101.574 10.55 101.432 10.152L101.434 10.148ZM99.536 12.008C99.472 12.206 99.382 12.38 99.258 12.532C99.134 12.684 98.982 12.804 98.796 12.9C98.61 12.992 98.394 13.038 98.15 13.038C97.906 13.038 97.702 12.992 97.516 12.9C97.33 12.806 97.172 12.684 97.042 12.532C96.91 12.38 96.81 12.206 96.738 12.014C96.666 11.82 96.63 11.622 96.63 11.418C96.63 11.214 96.668 11.02 96.738 10.824C96.81 10.63 96.91 10.456 97.042 10.306C97.172 10.154 97.328 10.03 97.516 9.938C97.702 9.844 97.912 9.798 98.15 9.798C98.388 9.798 98.608 9.844 98.796 9.938C98.982 10.03 99.134 10.15 99.258 10.3C99.382 10.446 99.474 10.618 99.536 10.81C99.6 11.004 99.63 11.202 99.63 11.406C99.63 11.61 99.598 11.808 99.536 12.008Z" fill="#191919"/>
<path d="M109.6 11.508V11.762C109.6 11.846 109.596 11.926 109.588 12.002H105.02C105.036 12.18 105.09 12.34 105.178 12.482C105.266 12.626 105.38 12.75 105.52 12.856C105.66 12.962 105.816 13.044 105.988 13.102C106.16 13.162 106.34 13.19 106.526 13.19C106.856 13.19 107.134 13.128 107.362 13.006C107.59 12.884 107.776 12.726 107.918 12.532L109.36 13.444C109.064 13.874 108.674 14.206 108.19 14.438C107.704 14.67 107.142 14.786 106.5 14.786C106.028 14.786 105.58 14.712 105.158 14.564C104.736 14.416 104.368 14.202 104.05 13.918C103.734 13.636 103.484 13.288 103.304 12.874C103.122 12.46 103.032 11.988 103.032 11.456C103.032 10.924 103.12 10.476 103.298 10.058C103.476 9.63999 103.716 9.28599 104.02 8.99399C104.324 8.70199 104.682 8.47799 105.096 8.31599C105.51 8.15599 105.956 8.07599 106.438 8.07599C106.92 8.07599 107.328 8.15399 107.716 8.30999C108.104 8.46599 108.438 8.69199 108.716 8.98799C108.994 9.28399 109.212 9.64199 109.368 10.064C109.524 10.486 109.602 10.966 109.602 11.506L109.6 11.508ZM107.69 10.71C107.69 10.38 107.586 10.098 107.38 9.86199C107.174 9.62599 106.864 9.50799 106.45 9.50799C106.248 9.50799 106.062 9.53999 105.894 9.60199C105.726 9.66599 105.578 9.75199 105.452 9.86199C105.326 9.97199 105.224 10.1 105.148 10.248C105.072 10.396 105.03 10.55 105.022 10.71H107.692H107.69Z" fill="#191919"/>
<path d="M117.584 11.508V11.762C117.584 11.846 117.58 11.926 117.572 12.002H113.004C113.02 12.18 113.074 12.34 113.162 12.482C113.25 12.626 113.364 12.75 113.504 12.856C113.644 12.962 113.8 13.044 113.972 13.102C114.144 13.162 114.324 13.19 114.51 13.19C114.84 13.19 115.118 13.128 115.346 13.006C115.574 12.884 115.76 12.726 115.902 12.532L117.344 13.444C117.048 13.874 116.658 14.206 116.174 14.438C115.688 14.67 115.126 14.786 114.484 14.786C114.012 14.786 113.564 14.712 113.142 14.564C112.72 14.416 112.352 14.202 112.034 13.918C111.718 13.636 111.468 13.288 111.288 12.874C111.106 12.46 111.016 11.988 111.016 11.456C111.016 10.924 111.104 10.476 111.282 10.058C111.46 9.63999 111.7 9.28599 112.004 8.99399C112.308 8.70199 112.666 8.47799 113.08 8.31599C113.494 8.15599 113.94 8.07599 114.422 8.07599C114.904 8.07599 115.312 8.15399 115.7 8.30999C116.088 8.46599 116.422 8.69199 116.7 8.98799C116.978 9.28399 117.196 9.64199 117.352 10.064C117.508 10.486 117.586 10.966 117.586 11.506L117.584 11.508ZM115.672 10.71C115.672 10.38 115.568 10.098 115.362 9.86199C115.156 9.62599 114.846 9.50799 114.432 9.50799C114.23 9.50799 114.044 9.53999 113.876 9.60199C113.708 9.66599 113.56 9.75199 113.434 9.86199C113.308 9.97199 113.206 10.1 113.13 10.248C113.054 10.396 113.012 10.55 113.004 10.71H115.674H115.672Z" fill="#191919"/>
<path d="M123.924 5.216V8.952H123.898C123.72 8.74 123.47 8.544 123.15 8.37C122.828 8.192 122.438 8.104 121.974 8.104C121.51 8.104 121.106 8.192 120.738 8.37C120.37 8.544 120.062 8.786 119.804 9.09C119.546 9.394 119.348 9.746 119.208 10.148C119.07 10.546 119.002 10.968 119.002 11.406C119.002 11.844 119.068 12.266 119.202 12.67C119.336 13.078 119.534 13.432 119.79 13.74C120.048 14.05 120.364 14.296 120.734 14.48C121.106 14.666 121.528 14.76 122.002 14.76C122.424 14.76 122.822 14.672 123.198 14.5C123.574 14.328 123.86 14.082 124.064 13.76H124.09V14.582H126V4.702L123.928 5.216H123.924ZM123.902 12.014C123.83 12.206 123.73 12.382 123.598 12.532C123.466 12.684 123.308 12.804 123.122 12.9C122.938 12.992 122.726 13.038 122.492 13.038C122.246 13.038 122.03 12.992 121.846 12.9C121.66 12.806 121.502 12.684 121.376 12.532C121.25 12.38 121.156 12.206 121.092 12.008C121.028 11.808 120.998 11.606 120.998 11.406C120.998 11.206 121.03 11.004 121.092 10.81C121.156 10.618 121.25 10.446 121.376 10.3C121.502 10.15 121.66 10.03 121.846 9.938C122.03 9.844 122.244 9.798 122.492 9.798C122.74 9.798 122.94 9.844 123.122 9.938C123.308 10.03 123.466 10.154 123.598 10.306C123.73 10.458 123.83 10.63 123.902 10.824C123.974 11.018 124.008 11.216 124.008 11.418C124.008 11.62 123.974 11.82 123.902 12.014Z" fill="#191919"/>
<path d="M127.888 9.13999C128.26 8.78599 128.692 8.51999 129.186 8.34199C129.68 8.16399 130.184 8.07599 130.698 8.07599C131.212 8.07599 131.678 8.14199 132.046 8.27199C132.412 8.40199 132.71 8.60599 132.938 8.87999C133.166 9.15399 133.332 9.49999 133.438 9.91799C133.544 10.336 133.596 10.832 133.596 11.406V14.582H131.698V13.912H131.66C131.5 14.174 131.256 14.376 130.932 14.52C130.608 14.664 130.254 14.736 129.876 14.736C129.622 14.736 129.362 14.702 129.092 14.634C128.822 14.566 128.576 14.456 128.352 14.304C128.128 14.152 127.944 13.95 127.802 13.696C127.658 13.442 127.586 13.13 127.586 12.76C127.586 12.304 127.71 11.938 127.96 11.658C128.208 11.38 128.53 11.164 128.922 11.012C129.314 10.86 129.75 10.758 130.232 10.708C130.712 10.658 131.182 10.632 131.636 10.632V10.53C131.636 10.218 131.526 9.98799 131.306 9.83999C131.086 9.69199 130.816 9.61799 130.496 9.61799C130.2 9.61799 129.916 9.68199 129.642 9.80799C129.368 9.93399 129.134 10.086 128.94 10.264L127.89 9.13799L127.888 9.13999ZM131.698 11.836H131.432C131.204 11.836 130.974 11.846 130.742 11.868C130.51 11.89 130.304 11.93 130.122 11.988C129.94 12.048 129.79 12.134 129.672 12.248C129.554 12.362 129.494 12.512 129.494 12.698C129.494 12.816 129.522 12.918 129.576 13.002C129.63 13.086 129.7 13.154 129.784 13.204C129.868 13.254 129.966 13.29 130.076 13.312C130.186 13.334 130.292 13.344 130.392 13.344C130.814 13.344 131.136 13.228 131.36 12.996C131.584 12.764 131.696 12.45 131.696 12.054V11.838L131.698 11.836Z" fill="#191919"/>
</g>
<defs>
<clipPath id="clip0_10_447">
<rect width="133.596" height="20" fill="white"/>
</clipPath>
</defs>
</svg>
`, Qt = `<svg viewBox="0 0 118 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2813_53)">
<path d="M10.2549 0.167748H9.8355C8.91288 0.167748 8.57739 0.475856 8.57739 1.39676V13.4386C8.57739 15.1435 7.54351 16.2613 5.75649 16.2613C3.96946 16.2613 2.90649 15.1435 2.90649 13.4386V1.39676C2.90649 0.474144 2.59838 0.167748 1.67748 0.167748H1.25811C0.335496 0.167748 0 0.474144 0 1.39676V13.4386C0 15.1144 0.530631 16.4564 1.5936 17.4629C2.65487 18.4694 4.05162 18.9726 5.75649 18.9726C7.46135 18.9726 8.82901 18.4694 9.89198 17.4629C10.9532 16.429 11.4856 15.0887 11.4856 13.4386V1.39676C11.4856 0.474144 11.1775 0.167748 10.2566 0.167748H10.2549ZM27.4644 16.15H20.787L27.437 5.05811C27.9403 4.24847 28.1919 3.43712 28.1919 2.60009V1.53883C28.1919 0.504955 27.8838 0.169459 26.8499 0.169459H19.6128C18.6902 0.169459 18.3838 0.477568 18.3838 1.39847V1.6227C18.3838 2.54532 18.6919 2.85171 19.6128 2.85171H25.4241L18.8014 13.9436C18.2708 14.7259 18.0192 15.5646 18.0192 16.4581V17.4646C18.0192 18.4985 18.3547 18.834 19.3886 18.834H27.4627C28.3853 18.834 28.6917 18.5259 28.6917 17.605V17.3807C28.6917 16.4581 28.3836 16.1517 27.4627 16.1517L27.4644 16.15ZM43.195 1.50973C42.9434 0.475856 42.5532 0.167748 41.5193 0.167748H39.4806C38.4468 0.167748 38.0565 0.475856 37.8049 1.50973L34.1726 17.6032C33.9484 18.4968 34.2565 18.8323 35.1791 18.8323H35.6532C36.6306 18.8323 36.9661 18.5806 37.1904 17.6032L37.8049 14.7532H43.1968L43.8404 17.6032C44.0355 18.5806 44.371 18.8323 45.3484 18.8323H45.8516C46.7742 18.8323 47.0532 18.4968 46.829 17.6032L43.1968 1.50973H43.195ZM38.3886 12.0984L38.9192 9.64036C39.5611 6.65 40.0643 3.85649 40.4563 1.31459C40.7079 2.90649 41.2386 5.67261 42.0773 9.66946L42.6079 12.1001H38.3886V12.0984ZM61.8869 9.24838C63.4514 8.82901 64.5127 7.6 64.5127 5.39189V4.77739C64.5127 1.98387 62.5562 0.167748 59.0078 0.167748H54.6498C53.6159 0.167748 53.2805 0.503243 53.2805 1.53712V17.4629C53.2805 18.4968 53.6159 18.8323 54.6498 18.8323H59.2595C62.9191 18.8323 65.016 16.8758 65.016 13.8871V13.2726C65.016 10.842 63.8143 9.50171 61.8869 9.25009V9.24838ZM56.1596 2.79351H58.9257C60.6853 2.79351 61.6644 3.60315 61.6644 5.02901V5.58703C61.6644 7.17892 60.9096 8.10153 58.6741 8.10153H56.1596V2.79351ZM62.1386 13.7194C62.1386 15.2565 61.1047 16.2065 58.9805 16.2065H56.1578V10.6742H59.0078C61.103 10.6742 62.1369 11.513 62.1369 13.1887V13.7194H62.1386ZM79.9078 1.50973C79.6562 0.475856 79.266 0.167748 78.2321 0.167748H76.1934C75.1596 0.167748 74.7693 0.475856 74.5177 1.50973L70.8854 17.6032C70.6612 18.4968 70.9693 18.8323 71.8919 18.8323H72.366C73.3434 18.8323 73.6789 18.5806 73.9032 17.6032L74.5177 14.7532H79.9096L80.5532 17.6032C80.7483 18.5806 81.0838 18.8323 82.0612 18.8323H82.5644C83.487 18.8323 83.766 18.4968 83.5418 17.6032L79.9096 1.50973H79.9078ZM75.1014 12.0984L75.632 9.64036C76.2739 6.65 76.7771 3.85649 77.1691 1.31459C77.4207 2.90649 77.9514 5.67261 78.7901 9.66946L79.3207 12.1001H75.1014V12.0984ZM95.2191 7.99027C93.5707 7.23541 92.2578 6.25802 92.2578 4.91604C92.2578 3.49189 93.2078 2.65315 94.7997 2.65315C96.4755 2.65315 97.5094 3.60315 97.5933 5.08378C97.6771 5.86604 98.0126 6.09027 98.9061 6.09027H99.3255C100.192 6.09027 100.5 5.78216 100.5 5.02901C100.5 3.54838 99.9691 2.34676 98.9352 1.42414C97.9014 0.474144 96.532 0 94.8271 0C93.2352 0 91.8932 0.474144 90.8594 1.39676C89.8255 2.31937 89.2949 3.51928 89.2949 5.00162C89.2384 8.43874 92.3691 9.83549 94.7433 10.8129C96.419 11.5113 97.7336 12.5177 97.7336 13.8854C97.7336 15.4225 96.6433 16.316 94.9401 16.316C93.0401 16.316 91.9224 15.1983 91.8385 13.7177C91.7546 12.9354 91.4465 12.6838 90.553 12.6838H90.1062C89.2966 12.6838 88.9046 13.0193 88.9046 13.6903C88.9046 15.2548 89.4626 16.5403 90.6095 17.5177C91.7546 18.495 93.1805 18.9709 94.9401 18.9709C96.6997 18.9709 98.0691 18.4968 99.103 17.5468C100.137 16.5968 100.667 15.3386 100.667 13.8032C100.695 10.45 97.6224 8.99847 95.2191 7.99198V7.99027ZM115.811 2.85C116.734 2.85 117.04 2.54189 117.04 1.62099V1.39676C117.04 0.474144 116.732 0.167748 115.811 0.167748H108.909C107.876 0.167748 107.54 0.503243 107.54 1.53712V17.4629C107.54 18.4968 107.876 18.8323 108.909 18.8323H115.811C116.734 18.8323 117.04 18.5241 117.04 17.6032V17.379C117.04 16.4564 116.732 16.15 115.811 16.15H110.419V10.842H115.226C116.148 10.842 116.427 10.563 116.427 9.58387V9.35964C116.427 8.43703 116.148 8.13063 115.226 8.13063H110.419V2.85H115.811Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_2813_53">
<rect width="117.081" height="19" fill="white"/>
</clipPath>
</defs>
</svg>
`;
var Xt = Object.defineProperty, rt = (i, t, e, r) => {
  for (var s = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (s = n(t, e, s) || s);
  return s && Xt(t, e, s), s;
}, i1, it;
const H1 = class H1 extends u {
  constructor() {
    super(...arguments);
    E(this, i1);
    this.language = "", this.brand = "";
  }
  render() {
    const e = $(this, i1, it).call(this);
    return e ? g`${X1(e)}` : g``;
  }
};
i1 = new WeakSet(), it = function() {
  if (this.brand === "uzabase")
    return Qt;
  if (this.brand === "speeda")
    return this.language === "en" ? Yt : this.language === "zh" ? Gt : Kt;
}, H1.styles = x();
let K = H1;
rt([
  h({ type: String, reflect: !0 })
], K.prototype, "language");
rt([
  h({ type: String, reflect: !0 })
], K.prototype, "brand");
customElements.get("sp-logo") || customElements.define("sp-logo", K);
const t2 = ":host{display:block;border-radius:6px;padding:8px 0;box-shadow:0 5px 9px 2px #00000021;background-color:#fff}", w1 = class w1 extends u {
  render() {
    return g`<slot></slot>`;
  }
};
w1.styles = x(y(t2));
let f1 = w1;
customElements.get("sp-control-menu") || customElements.define("sp-control-menu", f1);
const e2 = ":host{display:flex;font-size:14px;align-items:center;justify-content:space-between;padding:4px 12px 4px 16px;box-sizing:border-box;min-height:32px;cursor:pointer;color:#000000d6;column-gap:8px}:host .icon{display:none;width:24px;height:24px}:host([selected]){background-color:#f0f6ff}:host([selected]) .icon{display:block}:host([selected]:hover){background-color:#e3efff}:host([selected]:active){background-color:#d4e6ff}:host([disabled]){background-color:transparent;cursor:not-allowed;color:#00000059}:host([disabled]:hover){background-color:transparent}:host([disabled]:active){background-color:transparent}:host([disabled]:focus){border:none;padding:4px 12px 4px 16px}:host(:hover){background-color:#f8f8f8}:host(:active){background-color:#0000000d}:host(:focus){border:2px solid #191919;box-sizing:border-box;padding:2px 10px 2px 14px;outline:none}";
var s2 = Object.defineProperty, v1 = (i, t, e, r) => {
  for (var s = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (s = n(t, e, s) || s);
  return s && s2(t, e, s), s;
};
const A1 = class A1 extends u {
  constructor() {
    super(...arguments), this.text = "", this.selected = !1, this.disabled = !1;
  }
  render() {
    return g`
      <span class="text">${this.text}</span>
      <sp-icon class="icon" type="check-small"></sp-icon>
    `;
  }
};
A1.styles = x(y(e2));
let T = A1;
v1([
  h({ type: String, reflect: !0 })
], T.prototype, "text");
v1([
  h({ type: Boolean, reflect: !0 })
], T.prototype, "selected");
v1([
  h({ type: Boolean, reflect: !0 })
], T.prototype, "disabled");
customElements.get("sp-control-menu-item") || customElements.define("sp-control-menu-item", T);
const r2 = ":host .container{display:flex;gap:2px;align-items:center;padding-top:8px}:host .container>.text{font-weight:var(--font-weight-normal);font-size:14px;color:#c92812}:host .container .icon{width:21px;height:21px}:host .container.none{display:none}";
var i2 = Object.defineProperty, o2 = (i, t, e, r) => {
  for (var s = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (s = n(t, e, s) || s);
  return s && i2(t, e, s), s;
}, o1, ot;
const L1 = class L1 extends u {
  constructor() {
    super(...arguments);
    E(this, o1);
    this.text = "";
  }
  render() {
    return g`
      <div class="${$(this, o1, ot).call(this)}" role="error">
        <sp-icon class="icon" type="error-fill"></sp-icon>
        <span class="text">${this.text}</span>
      </div>
    `;
  }
};
o1 = new WeakSet(), ot = function() {
  return J({
    container: !0,
    none: !this.text
  });
}, L1.styles = x(y(r2));
let r1 = L1;
o2([
  h({ type: String, reflect: !0 })
], r1.prototype, "text");
customElements.get("sp-text-field-error-text") || customElements.define("sp-text-field-error-text", r1);
const n2 = ".input{width:100%;box-sizing:border-box;height:48px;background:#fff;border:1px solid #b6b6b6;border-radius:6px;padding:4px 12px;font-weight:var(--font-weight-normal);font-size:16px;line-height:24}.input::placeholder{color:#0000008a}.input[disabled]{color:#000000ad;background-color:#0000000d;border-color:#e5e5e5}.input[disabled]::placeholder{color:#00000059}.input[disabled]:hover{border-color:#e5e5e5}.input:hover{border-color:#0000008f}.input:focus-visible{outline:canvastext solid 3px;box-shadow:0 0 0 2px #fff,0 0 0 4px #282828;outline-offset:1px}.input.error{border-color:#db351f}";
var a2 = Object.defineProperty, P = (i, t, e, r) => {
  for (var s = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (s = n(t, e, s) || s);
  return s && a2(t, e, s), s;
}, N, nt, at;
const n1 = class n1 extends u {
  constructor() {
    super();
    E(this, N);
    this.error = "", this.placeholder = "", this.autocomplete = "off", this.disabled = !1, this.name = "", this.value = "", this.type = "text", this.internals = this.attachInternals();
  }
  updated(e) {
    super.updated(e), e.has("value") && this.internals.setFormValue(this.value);
  }
  render() {
    return g`
      <input
        class="${$(this, N, nt).call(this)}"
        type="${this.type}"
        placeholder="${this.placeholder}"
        autocomplete="${this.autocomplete}"
        ?disabled="${this.disabled}"
        name="${this.name}"
        .value="${this.value}"
        aria-invalid="${this.error && !this.disabled ? "true" : "false"}"
        @input="${$(this, N, at)}"
      />
      <sp-text-field-error-text
        text="${this.disabled ? "" : this.error}"
      ></sp-text-field-error-text>
    `;
  }
};
N = new WeakSet(), nt = function() {
  return J({
    input: !0,
    error: this.error && !this.disabled
  });
}, at = function(e) {
  const r = e.target;
  this.value = r.value, e.composed || this.dispatchEvent(
    new InputEvent("input", {
      ...e,
      composed: !0
    })
  );
}, n1.styles = x(y(n2)), n1.formAssociated = !0;
let b = n1;
P([
  h({ type: String, reflect: !0 })
], b.prototype, "error");
P([
  h({ type: String, reflect: !0 })
], b.prototype, "placeholder");
P([
  h({ type: String, reflect: !0 })
], b.prototype, "autocomplete");
P([
  h({ type: Boolean, reflect: !0 })
], b.prototype, "disabled");
P([
  h({ type: String, reflect: !0 })
], b.prototype, "name");
P([
  h({ type: String, reflect: !0 })
], b.prototype, "value");
P([
  h({ type: String, reflect: !0 })
], b.prototype, "type");
customElements.get("sp-text-field") || customElements.define("sp-text-field", b);
const l2 = ":host .label{margin-bottom:8px}:host .label.none{display:none}";
var h2 = Object.defineProperty, _ = (i, t, e, r) => {
  for (var s = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (s = n(t, e, s) || s);
  return s && h2(t, e, s), s;
}, B, lt, ht;
const a1 = class a1 extends u {
  constructor() {
    super();
    E(this, B);
    this.text = "", this.error = "", this.placeholder = "", this.supportText = "", this.disabled = !1, this.name = "", this.value = "", this.type = "text", this.autocomplete = "off", this.internals = this.attachInternals();
  }
  updated(e) {
    super.updated(e), e.has("value") && this.internals.setFormValue(this.value);
  }
  render() {
    return g`
      <fieldset>
        <sp-label-unit
          class="${$(this, B, lt).call(this)}"
          text="${this.text}"
          support-text="${this.supportText}"
        ></sp-label-unit>
        <sp-text-field
          error="${this.error}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          name="${this.name}"
          .value="${this.value}"
          type="${this.type}"
          autocomplete="${this.autocomplete}"
          @input="${$(this, B, ht)}"
        ></sp-text-field>
      </fieldset>
    `;
  }
};
B = new WeakSet(), lt = function() {
  return J({
    label: !0,
    none: !this.text && !this.supportText
  });
}, ht = function(e) {
  const r = e.target;
  this.value = r.value;
}, a1.styles = x(y(l2)), a1.formAssociated = !0;
let f = a1;
_([
  h({ type: String, reflect: !0 })
], f.prototype, "text");
_([
  h({ type: String, reflect: !0 })
], f.prototype, "error");
_([
  h({ type: String, reflect: !0 })
], f.prototype, "placeholder");
_([
  h({ type: String, attribute: "support-text", reflect: !0 })
], f.prototype, "supportText");
_([
  h({ type: Boolean, reflect: !0 })
], f.prototype, "disabled");
_([
  h({ type: String, reflect: !0 })
], f.prototype, "name");
_([
  h({ type: String, reflect: !0 })
], f.prototype, "value");
_([
  h({ type: String, reflect: !0 })
], f.prototype, "type");
_([
  h({ type: String, reflect: !0 })
], f.prototype, "autocomplete");
customElements.get("sp-text-field-unit") || customElements.define("sp-text-field-unit", f);
export {
  m as SpButton,
  f1 as SpControlMenu,
  T as SpControlMenuItem,
  s1 as SpIcon,
  F as SpLabelUnit,
  K as SpLogo,
  f as SpTextFieldUnit
};
