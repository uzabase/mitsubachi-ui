var k1 = (r) => {
  throw TypeError(r);
};
var d1 = (r, t, e) => t.has(r) || k1("Cannot " + e);
var p1 = (r, t, e) => (d1(r, t, "read from private field"), e ? e.call(r) : t.get(r)), $ = (r, t, e) => t.has(r) ? k1("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), E1 = (r, t, e, i) => (d1(r, t, "write to private field"), i ? i.call(r, e) : t.set(r, e), e), g = (r, t, e) => (d1(r, t, "access private method"), e);
const G = globalThis, H1 = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, L1 = Symbol(), S1 = /* @__PURE__ */ new WeakMap();
let F1 = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== L1) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (H1 && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = S1.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && S1.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const f = (r) => new F1(typeof r == "string" ? r : r + "", void 0, L1), z1 = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce(((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1]), r[0]);
  return new F1(e, r, L1);
}, d2 = (r, t) => {
  if (H1) r.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
  else for (const e of t) {
    const i = document.createElement("style"), s = G.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, P1 = H1 ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return f(e);
})(r) : r;
const { is: p2, defineProperty: c2, getOwnPropertyDescriptor: u2, getOwnPropertyNames: f2, getOwnPropertySymbols: H2, getPrototypeOf: L2 } = Object, l1 = globalThis, O1 = l1.trustedTypes, V2 = O1 ? O1.emptyScript : "", g2 = l1.reactiveElementPolyfillSupport, R = (r, t) => r, Q = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? V2 : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, V1 = (r, t) => !p2(r, t), T1 = { attribute: !0, type: String, converter: Q, reflect: !1, useDefault: !1, hasChanged: V1 };
Symbol.metadata ??= Symbol("metadata"), l1.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let S = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = T1) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && c2(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = u2(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: s, set(n) {
      const l = s?.call(this);
      o?.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? T1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const t = L2(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const e = this.properties, i = [...f2(e), ...H2(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(P1(s));
    } else t !== void 0 && e.push(P1(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((t) => this.enableUpdating = t)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((t) => t(this)));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return d2(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((t) => t.hostConnected?.()));
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((t) => t.hostDisconnected?.()));
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : Q).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Q;
      this._$Em = s;
      const l = n.fromAttribute(e, o.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      const s = this.constructor, o = this[t];
      if (i ??= s.getPropertyOptions(t), !((i.hasChanged ?? V1)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: n } = o, l = this[s];
        n !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, o, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach(((i) => i.hostUpdate?.())), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach(((e) => e.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach(((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[R("elementProperties")] = /* @__PURE__ */ new Map(), S[R("finalized")] = /* @__PURE__ */ new Map(), g2?.({ ReactiveElement: S }), (l1.reactiveElementVersions ??= []).push("2.1.1");
const g1 = globalThis, X = g1.trustedTypes, U1 = X ? X.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, W1 = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, J1 = "?" + v, m2 = `<${J1}>`, k = document, B = () => k.createComment(""), D = (r) => r === null || typeof r != "object" && typeof r != "function", m1 = Array.isArray, M2 = (r) => m1(r) || typeof r?.[Symbol.iterator] == "function", c1 = `[ 	
\f\r]`, N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, j1 = /-->/g, N1 = />/g, w = RegExp(`>|${c1}(?:([^\\s"'>=/]+)(${c1}*=${c1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), R1 = /'/g, B1 = /"/g, K1 = /^(?:script|style|textarea|title)$/i, b2 = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), H = b2(1), x = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), D1 = /* @__PURE__ */ new WeakMap(), A = k.createTreeWalker(k, 129);
function Y1(r, t) {
  if (!m1(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return U1 !== void 0 ? U1.createHTML(t) : t;
}
const y2 = (r, t) => {
  const e = r.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = N;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let p, c, h = -1, b = 0;
    for (; b < a.length && (n.lastIndex = b, c = n.exec(a), c !== null); ) b = n.lastIndex, n === N ? c[1] === "!--" ? n = j1 : c[1] !== void 0 ? n = N1 : c[2] !== void 0 ? (K1.test(c[2]) && (s = RegExp("</" + c[2], "g")), n = w) : c[3] !== void 0 && (n = w) : n === w ? c[0] === ">" ? (n = s ?? N, h = -1) : c[1] === void 0 ? h = -2 : (h = n.lastIndex - c[2].length, p = c[1], n = c[3] === void 0 ? w : c[3] === '"' ? B1 : R1) : n === B1 || n === R1 ? n = w : n === j1 || n === N1 ? n = N : (n = w, s = void 0);
    const Z = n === w && r[l + 1].startsWith("/>") ? " " : "";
    o += n === N ? a + m2 : h >= 0 ? (i.push(p), a.slice(0, h) + W1 + a.slice(h) + v + Z) : a + v + (h === -2 ? l : Z);
  }
  return [Y1(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class q {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [p, c] = y2(t, e);
    if (this.el = q.createElement(p, i), A.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = A.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(W1)) {
          const b = c[n++], Z = s.getAttribute(h).split(v), Y = /([.?@])?(.*)/.exec(b);
          a.push({ type: 1, index: o, name: Y[2], strings: Z, ctor: Y[1] === "." ? $2 : Y[1] === "?" ? v2 : Y[1] === "@" ? x2 : h1 }), s.removeAttribute(h);
        } else h.startsWith(v) && (a.push({ type: 6, index: o }), s.removeAttribute(h));
        if (K1.test(s.tagName)) {
          const h = s.textContent.split(v), b = h.length - 1;
          if (b > 0) {
            s.textContent = X ? X.emptyScript : "";
            for (let Z = 0; Z < b; Z++) s.append(h[Z], B()), A.nextNode(), a.push({ type: 2, index: ++o });
            s.append(h[b], B());
          }
        }
      } else if (s.nodeType === 8) if (s.data === J1) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(v, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += v.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = k.createElement("template");
    return i.innerHTML = t, i;
  }
}
function P(r, t, e = r, i) {
  if (t === x) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = D(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = P(r, s._$AS(r, t.values), s, i)), t;
}
class Z2 {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? k).importNode(e, !0);
    A.currentNode = s;
    let o = A.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let p;
        a.type === 2 ? p = new K(o, o.nextSibling, this, t) : a.type === 1 ? p = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (p = new _2(o, this, t)), this._$AV.push(p), a = i[++l];
      }
      n !== a?.index && (o = A.nextNode(), n++);
    }
    return A.currentNode = k, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class K {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = P(this, t, e), D(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : M2(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && D(this._$AH) ? this._$AA.nextSibling.data = t : this.T(k.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = q.createElement(Y1(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new Z2(s, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = D1.get(t.strings);
    return e === void 0 && D1.set(t.strings, e = new q(t)), e;
  }
  k(t) {
    m1(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new K(this.O(B()), this.O(B()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class h1 {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = P(this, t, e, 0), n = !D(t) || t !== this._$AH && t !== x, n && (this._$AH = t);
    else {
      const l = t;
      let a, p;
      for (t = o[0], a = 0; a < o.length - 1; a++) p = P(this, l[i + a], e, a), p === x && (p = this._$AH[a]), n ||= !D(p) || p !== this._$AH[a], p === d ? t = d : t !== d && (t += (p ?? "") + o[a + 1]), this._$AH[a] = p;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class $2 extends h1 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class v2 extends h1 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class x2 extends h1 {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? d) === x) return;
    const i = this._$AH, s = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== d && (i === d || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _2 {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const w2 = g1.litHtmlPolyfillSupport;
w2?.(q, K), (g1.litHtmlVersions ??= []).push("3.3.1");
const A2 = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = s = new K(t.insertBefore(B(), o), o, void 0, e ?? {});
  }
  return s._$AI(r), s;
};
const M1 = globalThis;
let u = class extends S {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = A2(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return x;
  }
};
u._$litElement$ = !0, u.finalized = !0, M1.litElementHydrateSupport?.({ LitElement: u });
const k2 = M1.litElementPolyfillSupport;
k2?.({ LitElement: u });
(M1.litElementVersions ??= []).push("4.2.1");
const E2 = { attribute: !0, type: String, converter: Q, reflect: !1, hasChanged: V1 }, S2 = (r = E2, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(e.name, r), i === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, r);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, r, l), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function C(r) {
  return (t, e) => typeof e == "object" ? S2(r, t, e) : ((i, s, o) => {
    const n = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(r, t, e);
}
const z2 = '*,*:before,*:after{box-sizing:border-box}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}[hidden]:not([hidden=until-found]){display:none!important}body,article,p,span,div,li,td,th,dt,dd,h1,h2,h3,h4,h5,h6{overflow-wrap:anywhere;line-break:strict}body{line-height:1;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}li{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:"";content:none}table{border-collapse:collapse;border-spacing:0}a{text-decoration:none;color:inherit}button{all:unset;box-sizing:border-box}button,label,select,summary,[role=button],[role=option]{cursor:pointer}button,input,select,textarea{margin:0;font-family:inherit;font-size:100%}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}input[type=text],input[type=email],input[type=password],input[type=search],input[type=tel],input[type=url],input[type=number],textarea{-webkit-appearance:none}a,button,input,select,textarea{touch-action:manipulation}:focus{outline:auto;outline-offset:2px}:focus:not(:focus-visible){outline:0}:focus-visible{outline:auto;outline-offset:2px}img{max-width:100%;height:auto}', P2 = ":host{--font-weight-normal: 400;--font-weight-bold: 700}:host,:host *{font-family:Arial,YakuHanJPs,Hiragino Sans,Hiragino Kaku Gothic ProN,Meiryo,Noto Sans JP,sans-serif;font-weight:var(--font-weight-normal);overflow-wrap:anywhere;line-break:strict}:host :lang(ja){--font-weight-normal: 300;--font-weight-bold: 600}:host :lang(en){--font-weight-normal: 300;--font-weight-bold: 600}:host :lang(zh){font-family:Arial,YakuHanJPs,PingFang SC,Microsoft YaHei,PingFang TC,Microsoft JhengHei,sans-serif}:where(:focus-visible){outline:inherit}fieldset{border:none}button{box-sizing:border-box}";
function M(...r) {
  const t = z1`
    ${f(z2)}
  `, e = z1`
    ${f(P2)}
  `;
  return [t, e, ...r];
}
const O2 = ':host{display:inline-block}.base{display:inline-block;width:100%;flex-basis:100%;padding-block:2px;border:1px solid transparent;border-radius:6px;position:relative;cursor:pointer;text-align:center}.base:disabled{cursor:not-allowed}.base:focus-visible{box-shadow:0 0 0 2px #fff,0 0 0 4px #191919}.text{line-height:1.5;letter-spacing:.02em}.medium{--loading-size: 16px;min-height:32px;padding-inline:12px}.medium .text{font-size:12px}.large{--loading-size: 19px;min-height:40px;padding-inline:16px}.large .text{font-size:14px}.x-large{--loading-size: 22px;min-height:48px;padding-inline:16px}.x-large .text{font-size:16px}.loading:before{content:"";display:block;border:2px solid #282828;border-bottom-color:#ededed;border-radius:50%;animation:1s linear infinite loading;transform-origin:center center;width:var(--loading-size);height:var(--loading-size);z-index:2;position:absolute;left:calc(50% - var(--loading-size) / 2);top:calc(50% - var(--loading-size) / 2)}.loading .text{visibility:hidden}@keyframes loading{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.normal.primary{background-color:#000000d6}.normal.primary .text{color:#fff}.normal.primary:hover{background-color:#000000e5}.normal.primary:active{background-color:#000}.normal.secondary{border-color:#000000d6}.normal.secondary .text{color:#000000d6}.normal.secondary:hover{background-color:#0000000a}.normal.secondary:active{background-color:#00000012}.normal.tertiary{border-color:#0000004a}.normal.tertiary .text{color:#000000d6}.normal.tertiary:hover{background-color:#0000000a}.normal.tertiary:active{background-color:#00000012}.danger.primary{background-color:#db351f}.danger.primary .text{color:#fff}.danger.primary:hover{background-color:#c92812}.danger.primary:active{background-color:#b02412}.danger.secondary{border-color:#db351f}.danger.secondary .text{color:#c92812}.danger.secondary:hover{background-color:#fff4f2}.danger.secondary:active{background-color:#ffedeb}.danger.tertiary{border-color:#db351f}.danger.tertiary .text{color:#c92812}.danger.tertiary:hover{background-color:#fff4f2}.danger.tertiary:active{background-color:#ffedeb}:is(.normal,.danger).secondary .text{font-weight:var(--font-weight-bold)}:is(.normal,.danger).primary .text{font-weight:var(--font-weight-bold)}:is(.normal,.danger).primary:disabled{background-color:#0000000d;border-color:transparent}:is(.normal,.danger).primary:disabled .text{color:#00000059}:is(.normal,.danger).primary:disabled:hover{background-color:#0000000d;border-color:transparent}:is(.normal,.danger):is(.secondary,.tertiary):disabled{background-color:transparent;border-color:#0000001a}:is(.normal,.danger):is(.secondary,.tertiary):disabled .text{color:#00000059}:is(.normal,.danger):is(.secondary,.tertiary):disabled:hover{background-color:transparent;border-color:#0000001a}';
var T2 = Object.defineProperty, _ = (r, t, e, i) => {
  for (var s = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = n(t, e, s) || s);
  return s && T2(t, e, s), s;
};
const q1 = ["primary", "secondary", "tertiary"], I1 = ["medium", "large", "xLarge"];
function U2(r) {
  return q1.some((t) => t === r) ? r : (console.warn(`${r}は無効なvariants属性です。`), q1[0]);
}
function j2(r) {
  return I1.some((t) => t === r) ? r : (console.warn(`${r}は無効なsize属性です。`), I1[0]);
}
var z, i1, G1;
const r1 = class r1 extends u {
  constructor() {
    super();
    $(this, i1);
    $(this, z);
    this.loading = !1, this.disabled = !1, this.danger = !1, this.variants = "primary", this.size = "medium", this.name = "", this.value = "", this.type = "button", E1(this, z, this.attachInternals());
  }
  get buttonClasses() {
    const e = {
      medium: "medium",
      large: "large",
      xLarge: "x-large"
    };
    return [
      "base",
      this.danger ? "danger" : "normal",
      U2(this.variants),
      e[j2(this.size)],
      this.loading ? "loading" : ""
    ].filter(Boolean).join(" ");
  }
  get isDisabled() {
    return this.disabled || this.loading;
  }
  render() {
    return H`
      <button
        class="${this.buttonClasses}"
        ?disabled="${this.isDisabled}"
        name="${this.name}"
        value="${this.value}"
        type="${this.type}"
        @click="${g(this, i1, G1)}"
      >
        <slot class="text"></slot>
      </button>
    `;
  }
};
z = new WeakMap(), i1 = new WeakSet(), G1 = function(e) {
  e.preventDefault(), e.stopPropagation(), this.dispatchEvent(new MouseEvent("click", e)) && p1(this, z).form && p1(this, z).form.requestSubmit();
}, r1.styles = M(f(O2)), r1.formAssociated = !0;
let V = r1;
_([
  C({ type: Boolean, reflect: !0 })
], V.prototype, "loading");
_([
  C({ type: Boolean, reflect: !0 })
], V.prototype, "disabled");
_([
  C({ type: Boolean, reflect: !0 })
], V.prototype, "danger");
_([
  C({ type: String })
], V.prototype, "variants");
_([
  C({ type: String })
], V.prototype, "size");
_([
  C({ type: String })
], V.prototype, "name");
_([
  C({ type: String })
], V.prototype, "value");
_([
  C({ type: String })
], V.prototype, "type");
customElements.get("sp-button") || customElements.define("sp-button", V);
const Q1 = { ATTRIBUTE: 1, CHILD: 2 }, b1 = (r) => (...t) => ({ _$litDirective$: r, values: t });
class X1 {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
let t1 = class extends X1 {
  constructor(t) {
    if (super(t), this.it = d, t.type !== Q1.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === d || t == null) return this._t = void 0, this.it = t;
    if (t === x) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
};
t1.directiveName = "unsafeHTML", t1.resultType = 1;
const N2 = b1(t1);
class u1 extends t1 {
}
u1.directiveName = "unsafeSVG", u1.resultType = 2;
const R2 = b1(u1), B2 = ":host{display:inline-block;width:1.28em;height:1.28em}.icon{width:100%;height:100%}", D2 = [
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
  "followlist",
  "followlist-fill",
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
  "magic-fill",
  "mail",
  "mail-gear",
  "maximize",
  "menu",
  "minimize",
  "minus-cycle",
  "minus-cycle-fill",
  "money",
  "open-in-new",
  "pencil-square",
  "person",
  "person-add",
  "person-cancel-fill",
  "person-fill",
  "person-gear",
  "plus",
  "plus-cycle",
  "plus-cycle-fill",
  "plus-small",
  "question",
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
], q2 = {
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
  followlist: '<path d="M20.995 6.25H3.01497V4.75H20.985V6.25H20.995ZM20.995 11.24H3.01497V12.74H20.985V11.24H20.995ZM20.995 17.74H18.255V14.99H16.755V17.74H14.005V19.24H16.755V21.99H18.255V19.24H20.995V17.74ZM3.01497 19.24H11.005V17.74H3.01497V19.24Z"/>',
  "followlist-fill": '<path d="M20.995 4.495V6.495H3.01501V4.495H20.985H20.995ZM3.01501 12.985H20.985V10.985H3.01501V12.985ZM18.505 14.995H16.505V17.495H14.005V19.495H16.505V21.995H18.505V19.495H20.995V17.495H18.505V14.995ZM3.01501 19.485H11.005V17.485H3.01501V19.485Z"/>',
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
  "magic-fill": '<path d="M9.45995 6.66957C9.55995 6.33957 10.02 6.33957 10.13 6.66957C11.23 10.0896 13.91 12.7696 17.33 13.8696C17.66 13.9696 17.66 14.4296 17.33 14.5396C13.91 15.6396 11.23 18.3196 10.13 21.7396C10.03 22.0696 9.56995 22.0696 9.45995 21.7396C8.35995 18.3196 5.67995 15.6396 2.25995 14.5396C1.92995 14.4396 1.92995 13.9796 2.25995 13.8696C5.67995 12.7696 8.35995 10.0896 9.45995 6.66957ZM12.84 6.40957C12.53 6.46957 12.53 6.90957 12.84 6.96957C14.95 7.38957 16.6 9.03957 17.02 11.1496C17.08 11.4596 17.52 11.4596 17.58 11.1496C18 9.03957 19.65 7.38957 21.76 6.96957C22.07 6.90957 22.07 6.46957 21.76 6.40957C19.65 5.98957 18 4.33957 17.58 2.22957C17.52 1.91957 17.08 1.91957 17.02 2.22957C16.6 4.33957 14.95 5.98957 12.84 6.40957Z"/>',
  mail: '<path d="M21.25 4H2.75C2.34 4 2 4.34 2 4.75V19.25C2 19.66 2.34 20 2.75 20H21.25C21.66 20 22 19.66 22 19.25V4.75C22 4.34 21.66 4 21.25 4ZM20.5 5.5V7.14L12 11.11L3.5 7.14V5.5H20.5ZM3.5 18.5V8.79L12 12.76L20.5 8.79V18.5H3.5Z"/>',
  "mail-gear": '<path d="M12 12.77L20.5 8.8V12.67C20.67 12.67 20.84 12.69 21.03 12.74C21.4 12.84 21.73 13.04 22 13.31V4.75C22 4.34 21.66 4 21.25 4H2.75C2.34 4 2 4.34 2 4.75V19.25C2 19.66 2.34 20 2.75 20H11.92L11.8 19.79C11.57 19.4 11.48 18.95 11.52 18.5H3.5V8.79L12 12.76V12.77ZM20.5 5.5V7.14L12 11.11L3.5 7.14V5.5H20.5ZM22.07 18.53C22.06 18.47 22.02 18.43 22 18.38C21.94 18.28 21.87 18.19 21.77 18.13L21.27 17.85C21.27 17.76 21.28 17.67 21.28 17.58C21.28 17.49 21.28 17.4 21.27 17.3L21.77 17.01C21.87 16.95 21.95 16.86 22 16.76C22 16.76 22.06 16.66 22.07 16.61C22.12 16.44 22.09 16.26 22 16.11L21.04 14.47C20.95 14.32 20.81 14.21 20.64 14.16C20.59 14.15 20.54 14.14 20.49 14.14C20.49 14.14 20.45 14.14 20.43 14.14C20.33 14.14 20.23 14.17 20.14 14.22L19.63 14.51C19.49 14.41 19.34 14.33 19.19 14.25V13.63C19.19 13.54 19.17 13.45 19.14 13.37C19.04 13.13 18.8 12.97 18.53 12.97H16.62C16.35 12.97 16.11 13.14 16.01 13.37C15.98 13.45 15.96 13.53 15.96 13.63V14.21C15.78 14.29 15.61 14.39 15.45 14.5L14.94 14.21C14.85 14.16 14.75 14.14 14.65 14.13C14.58 14.13 14.51 14.13 14.44 14.14C14.27 14.19 14.13 14.29 14.04 14.44L13.08 16.08C12.99 16.23 12.97 16.41 13.01 16.58C13.06 16.75 13.17 16.89 13.32 16.98L13.82 17.27C13.82 17.37 13.81 17.46 13.81 17.55C13.81 17.64 13.81 17.72 13.82 17.82L13.32 18.1C13.24 18.14 13.18 18.2 13.13 18.27C13.08 18.34 13.04 18.42 13.02 18.5C13 18.58 12.99 18.67 13 18.76C13.01 18.84 13.04 18.93 13.08 19L14.04 20.64C14.13 20.79 14.27 20.9 14.45 20.95C14.52 20.97 14.59 20.97 14.65 20.96C14.75 20.96 14.85 20.93 14.94 20.88L15.44 20.59C15.61 20.7 15.78 20.8 15.96 20.88V21.4C15.96 21.58 16.03 21.75 16.15 21.86C16.27 21.98 16.43 22.05 16.62 22.05H18.53C18.89 22.05 19.19 21.76 19.19 21.39V20.84C19.34 20.76 19.49 20.68 19.64 20.58L20.14 20.87C20.23 20.92 20.32 20.94 20.42 20.95C20.49 20.95 20.56 20.95 20.64 20.94C20.81 20.9 20.95 20.79 21.04 20.64L22 19C22.09 18.85 22.11 18.67 22.07 18.5V18.53ZM17.55 18.92C16.8 18.92 16.19 18.31 16.19 17.55C16.19 16.79 16.8 16.18 17.55 16.18C18.3 16.18 18.91 16.79 18.91 17.55C18.91 18.31 18.3 18.92 17.55 18.92Z"/>',
  maximize: '<path d="M20.31 3.68994V9.30994H18.81V6.24994L13.59 11.4699L12.53 10.4099L17.75 5.18994H14.69V3.68994H20.31ZM10.47 12.4699L5.25 17.6899V14.6299H3.75V20.2499H9.37V18.7499H6.31L11.53 13.5299L10.47 12.4699Z"/>',
  menu: '<path d="M21 6.74H3V5.24H21V6.74ZM21 11.25H3V12.75H21V11.25ZM21 17.26H3V18.76H21V17.26Z"/>',
  minimize: '<path d="M5.33001 13.05H10.95V18.67H9.45001V15.61L4.23001 20.83L3.17001 19.77L8.39001 14.55H5.33001V13.05ZM20.84 4.22003L19.78 3.16003L14.56 8.38003V5.32003H13.06V10.94H18.68V9.44003H15.62L20.84 4.22003Z"/>',
  "minus-cycle": '<path d="M12 22C6.49 22 2 17.51 2 12C2 6.49 6.49 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22ZM12 3.5C7.31 3.5 3.5 7.31 3.5 12C3.5 16.69 7.31 20.5 12 20.5C16.69 20.5 20.5 16.69 20.5 12C20.5 7.31 16.69 3.5 12 3.5ZM17 11.25H7V12.75H17V11.25Z"/>',
  "minus-cycle-fill": '<path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM17 12.75H12.75V17H11.25V12.75H7V11.25H11.25V7H12.75V11.25H17V12.75Z"/>',
  money: '<path d="M21.1 14.46L18.87 9.29C18.18 7.7 16.77 6.54 15.03 6.04C15.91 5.23 16.47 4.08 16.47 2.8C16.47 2.39 16.13 2.05 15.72 2.05H8.28C7.87 2.05 7.53 2.39 7.53 2.8C7.53 4.08 8.09 5.23 8.97 6.04C7.24 6.54 5.82 7.7 5.13 9.29L2.9 14.46C2.22 16.04 2.37 17.79 3.33 19.24C4.45 20.94 6.42 21.95 8.62 21.95H15.37C17.57 21.95 19.55 20.94 20.66 19.24C21.62 17.78 21.78 16.04 21.09 14.46H21.1ZM14.87 3.55C14.54 4.8 13.4 5.72 12.05 5.72H11.94C10.59 5.72 9.45 4.8 9.12 3.55H14.87ZM19.41 18.42C18.57 19.69 17.06 20.46 15.37 20.46H8.62C6.93 20.46 5.42 19.7 4.58 18.42C3.89 17.38 3.78 16.18 4.27 15.06L6.5 9.89C7.17 8.33 8.92 7.28 10.85 7.28H13.14C15.07 7.28 16.81 8.33 17.49 9.89L19.72 15.06C20.21 16.19 20.1 17.38 19.41 18.43V18.42ZM14.72 15.5C14.72 16.61 13.84 17.51 12.75 17.56V18.99H11.25V17.57H9.65V16.07H12.66C12.97 16.07 13.23 15.81 13.23 15.5C13.23 15.19 12.97 14.93 12.66 14.93H11.36C10.22 14.93 9.29 14 9.29 12.86C9.29 11.72 10.17 10.85 11.26 10.8V9.37H12.76V10.79H14.32V12.29H11.36C11.05 12.29 10.79 12.54 10.79 12.86C10.79 13.18 11.04 13.43 11.36 13.43H12.66C13.8 13.43 14.73 14.36 14.73 15.5H14.72Z"/>',
  "open-in-new": '<path d="M19.09 12.435H20.59V19.825C20.59 20.235 20.25 20.575 19.84 20.575H4.19C3.78 20.575 3.44 20.235 3.44 19.825V4.17496C3.44 3.76496 3.78 3.42496 4.19 3.42496H11.59V4.92496H4.94V19.075H19.09V12.435ZM14.58 2.45496V3.95496H19L12.05 10.905L13.11 11.965L20.07 5.00496V9.43496H21.57V2.45496H14.59H14.58Z"/>',
  "pencil-square": '<path d="M20.01 11.27V20.39C20.01 20.8 19.67 21.14 19.26 21.14H3.60999C3.19999 21.14 2.85999 20.8 2.85999 20.39V4.74C2.85999 4.33 3.19999 3.99 3.60999 3.99H12.82L11.32 5.49H4.35999V19.64H18.51V12.77L20.01 11.27ZM15.46 5.61L10.62 10.45L9.99999 11.08V14.05H12.97L18.44 8.58L15.47 5.6L15.46 5.61ZM17.84 3.14C18 2.97 18.27 2.97 18.44 3.14L20.88 5.58C21.04 5.74 21.04 6.01 20.88 6.17L19.13 7.92L16.15 4.94L17.84 3.15V3.14Z"/>',
  person: '<path d="M20.28 20.535H3.78001C3.37001 20.535 3.03001 20.195 3.03001 19.785C3.03001 15.415 7.15001 11.715 12.03 11.715C16.91 11.715 21.03 15.415 21.03 19.785C21.03 20.195 20.69 20.535 20.28 20.535ZM4.58001 19.035H19.48C19.04 15.815 15.81 13.215 12.03 13.215C8.25001 13.215 5.02001 15.815 4.58001 19.035ZM12.03 10.975C9.69001 10.975 7.78001 9.06501 7.78001 6.72501C7.78001 4.38501 9.69001 2.47501 12.03 2.47501C14.37 2.47501 16.28 4.38501 16.28 6.72501C16.28 9.06501 14.37 10.975 12.03 10.975ZM12.03 3.97501C10.51 3.97501 9.28001 5.20501 9.28001 6.72501C9.28001 8.24501 10.51 9.47501 12.03 9.47501C13.55 9.47501 14.78 8.24501 14.78 6.72501C14.78 5.20501 13.55 3.97501 12.03 3.97501Z"/>',
  "person-add": '<path d="M11.96 21.07H3.77C3.36 21.07 3.02 20.73 3.02 20.32C3.02 15.95 7.14 12.25 12.02 12.25C12.2 12.25 12.38 12.27 12.56 12.28C12.09 12.72 11.69 13.22 11.37 13.78C7.88 14.06 4.98 16.53 4.57 19.57H11.04C11.28 20.11 11.58 20.62 11.95 21.07H11.96ZM21.98 17C21.98 19.75 19.74 21.98 17 21.98C14.26 21.98 12.02 19.74 12.02 17C12.02 14.26 14.26 12.02 17 12.02C19.74 12.02 21.98 14.26 21.98 17ZM19.99 16.5H17.49V14H16.49V16.5H13.99V17.5H16.49V20H17.49V17.5H19.99V16.5ZM16.27 7.26001C16.27 4.92001 14.36 3.01001 12.02 3.01001C9.68 3.01001 7.77 4.92001 7.77 7.26001C7.77 9.60001 9.68 11.51 12.02 11.51C14.36 11.51 16.27 9.60001 16.27 7.26001ZM14.77 7.26001C14.77 8.78001 13.54 10.01 12.02 10.01C10.5 10.01 9.27 8.78001 9.27 7.26001C9.27 5.74001 10.5 4.51001 12.02 4.51001C13.54 4.51001 14.77 5.74001 14.77 7.26001Z"/>',
  "person-cancel-fill": '<path d="M16.02 6.98999C16.02 9.19999 14.23 10.99 12.02 10.99C9.81 10.99 8.02 9.19999 8.02 6.98999C8.02 4.77999 9.81 2.98999 12.02 2.98999C14.23 2.98999 16.02 4.77999 16.02 6.98999ZM10.51 17C10.51 15.14 11.3 13.46 12.56 12.28C12.38 12.27 12.2 12.25 12.02 12.25C7.14 12.25 3.02 15.95 3.02 20.32C3.02 20.73 3.36 21.07 3.77 21.07H11.96C11.06 19.96 10.51 18.54 10.51 17ZM21.98 17C21.98 19.75 19.74 21.98 17 21.98C14.26 21.98 12.02 19.74 12.02 17C12.02 14.26 14.26 12.02 17 12.02C19.74 12.02 21.98 14.26 21.98 17ZM19.12 16.5H14.87V17.5H19.12V16.5Z"/>',
  "person-fill": '<path d="M21.03 19.785C21.03 20.195 20.69 20.535 20.28 20.535H3.78001C3.37001 20.535 3.03001 20.195 3.03001 19.785C3.03001 15.415 7.15001 11.715 12.03 11.715C16.91 11.715 21.03 15.415 21.03 19.785ZM12.03 10.975C14.37 10.975 16.28 9.06498 16.28 6.72498C16.28 4.38498 14.37 2.47498 12.03 2.47498C9.69001 2.47498 7.78001 4.38498 7.78001 6.72498C7.78001 9.06498 9.69001 10.975 12.03 10.975Z"/>',
  "person-gear": '<path d="M12.02 10.99C9.81 10.99 8.02 9.19999 8.02 6.98999C8.02 4.77999 9.81 2.98999 12.02 2.98999C14.23 2.98999 16.02 4.77999 16.02 6.98999C16.02 9.19999 14.23 10.99 12.02 10.99ZM12.02 4.48999C10.64 4.48999 9.52 5.60999 9.52 6.98999C9.52 8.36999 10.64 9.48999 12.02 9.48999C13.4 9.48999 14.52 8.36999 14.52 6.98999C14.52 5.60999 13.4 4.48999 12.02 4.48999ZM11.17 19.57H4.58C5.01 16.42 8.12 13.87 11.79 13.76L12.15 13.14C12.36 12.78 12.67 12.5 13.03 12.3C12.7 12.27 12.37 12.24 12.03 12.24C7.15 12.24 3.03 15.94 3.03 20.31C3.03 20.72 3.37 21.06 3.78 21.06H12.05L11.17 19.56V19.57ZM21.91 18.74C22 18.58 22.03 18.39 21.98 18.21C21.93 18.03 21.82 17.88 21.65 17.78L21.12 17.48C21.12 17.48 21.12 17.48 21.12 17.47C21.12 17.38 21.13 17.29 21.13 17.2C21.13 17.11 21.13 17.01 21.12 16.91L21.65 16.61C21.73 16.56 21.8 16.5 21.86 16.43C21.92 16.36 21.96 16.27 21.98 16.18C22.03 16 22 15.81 21.91 15.65L20.89 13.9C20.8 13.74 20.64 13.62 20.46 13.58C20.39 13.56 20.32 13.56 20.25 13.57C20.14 13.57 20.03 13.6 19.94 13.65L19.4 13.96C19.25 13.86 19.09 13.77 18.93 13.69V13.03C18.93 12.64 18.61 12.33 18.23 12.33H16.19C15.9 12.33 15.65 12.51 15.54 12.76C15.5 12.84 15.48 12.94 15.48 13.03V13.65C15.29 13.74 15.11 13.84 14.94 13.96L14.4 13.65C14.3 13.6 14.2 13.57 14.09 13.57C14.02 13.57 13.94 13.57 13.87 13.58C13.78 13.6 13.7 13.65 13.62 13.7C13.55 13.75 13.49 13.82 13.44 13.9L12.8 15L12.42 15.64C12.42 15.64 12.41 15.68 12.4 15.71C12.33 15.86 12.31 16.02 12.35 16.17C12.4 16.35 12.52 16.5 12.68 16.6L13.21 16.9C13.21 16.9 13.21 16.9 13.21 16.91C13.21 17.01 13.2 17.1 13.2 17.19C13.2 17.28 13.2 17.37 13.21 17.47L12.68 17.77C12.52 17.86 12.4 18.02 12.35 18.2C12.33 18.29 12.32 18.38 12.33 18.47C12.34 18.56 12.37 18.65 12.42 18.73L13.44 20.47C13.53 20.63 13.69 20.75 13.87 20.8C13.94 20.82 14.01 20.82 14.08 20.81C14.19 20.81 14.29 20.78 14.39 20.73L14.92 20.43C15.1 20.55 15.28 20.65 15.47 20.74V21.29C15.47 21.48 15.55 21.66 15.68 21.78C15.81 21.91 15.98 21.99 16.18 21.99H18.22C18.35 21.99 18.46 21.95 18.57 21.89C18.78 21.77 18.93 21.55 18.93 21.29V20.7C19.03 20.65 19.12 20.59 19.22 20.53C19.28 20.49 19.34 20.46 19.4 20.42L19.93 20.72C20.02 20.77 20.12 20.8 20.23 20.8C20.3 20.8 20.37 20.8 20.46 20.79C20.64 20.74 20.79 20.63 20.89 20.47L21.91 18.73V18.74ZM18.37 17.98C18.32 18.06 18.26 18.13 18.19 18.2C18.08 18.31 17.95 18.39 17.82 18.46C17.71 18.52 17.59 18.57 17.46 18.59C17.37 18.61 17.27 18.62 17.17 18.62C16.37 18.62 15.72 17.97 15.72 17.17C15.72 16.69 15.96 16.26 16.32 15.99C16.56 15.82 16.85 15.71 17.17 15.71C17.57 15.71 17.93 15.87 18.2 16.14C18.27 16.21 18.33 16.28 18.38 16.36C18.48 16.51 18.56 16.69 18.6 16.88C18.62 16.97 18.63 17.07 18.63 17.17C18.63 17.47 18.54 17.75 18.38 17.98H18.37Z"/>',
  plus: '<path d="M21 11.25H12.75V3H11.25V11.25H3V12.75H11.25V21H12.75V12.75H21V11.25Z"/>',
  "plus-cycle": '<path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20.5C7.31 20.5 3.5 16.69 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 16.69 16.69 20.5 12 20.5ZM12.75 11.25H17V12.75H12.75V17H11.25V12.75H7V11.25H11.25V7H12.75V11.25Z"/>',
  "plus-cycle-fill": '<path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM17 12.75H7V11.25H17V12.75Z"/>',
  "plus-small": '<path d="M17 11.3H12.8V7H11.3V11.3H7V12.8H11.3V17H12.8V12.8H17V11.3Z"/>',
  question: '<path d="M12 22C6.49 22 2 17.51 2 12C2 6.49 6.49 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22ZM12 3.5C7.31 3.5 3.5 7.31 3.5 12C3.5 16.69 7.31 20.5 12 20.5C16.69 20.5 20.5 16.69 20.5 12C20.5 7.31 16.69 3.5 12 3.5ZM11.1 17.58H12.76V15.86H11.1V17.58ZM14.37 7.23C13.8 6.69 13.03 6.42 12.08 6.42C11.06 6.42 10.24 6.74 9.65 7.37C9.06 7.99 8.77 8.83 8.77 9.85V10H10.28V9.86C10.31 9.29 10.4 8.86 10.55 8.56C10.82 8.04 11.31 7.79 12.03 7.79C12.61 7.79 13.02 7.94 13.27 8.23C13.52 8.53 13.64 8.88 13.64 9.3C13.64 9.59 13.55 9.87 13.38 10.14C13.29 10.29 13.16 10.45 13 10.6L12.44 11.14C11.89 11.67 11.53 12.15 11.37 12.56C11.21 12.97 11.13 13.52 11.13 14.19V14.34H12.65V14.19C12.65 13.64 12.71 13.22 12.84 12.95C12.97 12.67 13.25 12.33 13.68 11.92C14.31 11.32 14.71 10.88 14.92 10.57C15.13 10.24 15.24 9.82 15.24 9.31C15.24 8.47 14.95 7.77 14.37 7.24V7.23Z"/>',
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
  "warning-fill": '<path d="M21.92 19.3601L12.66 3.3201C12.39 2.8601 11.63 2.8601 11.36 3.3201L2.1 19.3601C1.97 19.5901 1.97 19.8801 2.1 20.1101C2.23 20.3401 2.48 20.4901 2.75 20.4901H21.27C21.54 20.4901 21.79 20.3501 21.92 20.1101C22.05 19.8701 22.05 19.5901 21.92 19.3601Z"/><path d="M12.83 16.1399H11.17V17.8599H12.83V16.1399Z" fill="black" fill-opacity="0.84"/><path d="M12.75 8.65991H11.25V14.6599H12.75V8.65991Z" fill="black" fill-opacity="0.84"/>'
};
var I2 = Object.defineProperty, F2 = (r, t, e, i) => {
  for (var s = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = n(t, e, s) || s);
  return s && I2(t, e, s), s;
};
function W2(r) {
  return D2.includes(r);
}
const Z1 = class Z1 extends u {
  constructor() {
    super(...arguments), this.type = "";
  }
  render() {
    return W2(this.type) ? H`<svg
        class="icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        ${R2(q2[this.type])}
      </svg>` : H``;
  }
};
Z1.styles = M(f(B2));
let e1 = Z1;
F2([
  C({ type: String, reflect: !0 })
], e1.prototype, "type");
customElements.get("sp-icon") || customElements.define("sp-icon", e1);
const I = b1(class extends X1 {
  constructor(r) {
    if (super(r), r.type !== Q1.ATTRIBUTE || r.name !== "class" || r.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(r) {
    return " " + Object.keys(r).filter(((t) => r[t])).join(" ") + " ";
  }
  update(r, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), r.strings !== void 0 && (this.nt = new Set(r.strings.join(" ").split(/\s/).filter(((i) => i !== ""))));
      for (const i in t) t[i] && !this.nt?.has(i) && this.st.add(i);
      return this.render(t);
    }
    const e = r.element.classList;
    for (const i of this.st) i in t || (e.remove(i), this.st.delete(i));
    for (const i in t) {
      const s = !!t[i];
      s === this.st.has(i) || this.nt?.has(i) || (s ? (e.add(i), this.st.add(i)) : (e.remove(i), this.st.delete(i)));
    }
    return x;
  }
}), J2 = ":host{display:flex;flex-direction:column;gap:4px}:host .label{font-weight:var(--font-weight-bold);font-size:14px;color:#000000d6}:host .label.none{display:none}:host .support{font-weight:var(--font-weight-normal);font-size:12px;color:#0000008a}:host .support.none{display:none}";
var K2 = Object.defineProperty, t2 = (r, t, e, i) => {
  for (var s = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = n(t, e, s) || s);
  return s && K2(t, e, s), s;
}, T, e2, s2;
const $1 = class $1 extends u {
  constructor() {
    super(...arguments);
    $(this, T);
    this.text = "", this.supportText = "";
  }
  /**
   * テキストもサポートテキストも空のとき、かつそのときに限り、真を返す。
   */
  isEmpty() {
    return this.text === "" && this.supportText === "";
  }
  render() {
    return H`
      <span class=${g(this, T, e2).call(this)}>${this.text}</span>
      <span class=${g(this, T, s2).call(this)}>${this.supportText}</span>
    `;
  }
};
T = new WeakSet(), e2 = function() {
  return I({
    label: !0,
    none: !this.text
  });
}, s2 = function() {
  return I({
    support: !0,
    none: !this.supportText
  });
}, $1.styles = M(f(J2));
let F = $1;
t2([
  C({ type: String, reflect: !0 })
], F.prototype, "text");
t2([
  C({ type: String, attribute: "support-text", reflect: !0 })
], F.prototype, "supportText");
customElements.get("sp-label-unit") || customElements.define("sp-label-unit", F);
const Y2 = ":host{--size-medium: 12.5px;--size-large: 15px;--size-x-large: 17.5px;--size-2x-large: 20px;--size-3x-large: 40px;--border-size-ratio: 1/10;--ui-semantic-object-regular-default: rgb(0 0 0 / 84%);--neutral-neutral-20-alpha: rgb(0 0 0 / 7%);--background-normal: linear-gradient(white, white) padding-box padding-box,conic-gradient(var(--ui-semantic-object-regular-default) 0deg 270deg, var(--neutral-neutral-20-alpha) 270deg 360deg) border-box border-box;--background-ai: linear-gradient(white, white) padding-box padding-box,conic-gradient(#2A2AF7 5%, #2A2AF7 22%, #47D4FF 30%, #FF2ED5 73%, #F72A48 80%, #F72A48 84%, #2A2AF7 100%) border-box border-box;display:inline-flex;flex-shrink:0}.size-medium{--size: var(--size-medium)}.size-large{--size: var(--size-large)}.size-x-large{--size: var(--size-x-large)}.size-2x-large{--size: var(--size-2x-large)}.size-3x-large{--size: var(--size-3x-large)}.loading{display:inline-block;animation:spin 1s linear infinite;border-radius:50%;width:var(--size);height:var(--size);border:calc(var(--size) * var(--border-size-ratio)) solid transparent}.variant-ai{background:var(--background-ai)}.variant-normal{background:var(--background-normal)}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}";
var G2 = Object.defineProperty, i2 = (r, t, e, i) => {
  for (var s = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = n(t, e, s) || s);
  return s && G2(t, e, s), s;
};
const v1 = class v1 extends u {
  constructor() {
    super(...arguments), this.ai = !1, this.size = "medium";
  }
  get loadingClasses() {
    const t = {
      medium: "size-medium",
      large: "size-large",
      xLarge: "size-x-large",
      "2xLarge": "size-2x-large",
      "3xLarge": "size-3x-large"
    };
    return [
      "loading",
      this.ai ? "variant-ai" : "variant-normal",
      t[this.size]
    ].filter(Boolean).join(" ");
  }
  render() {
    return H` <span class="${this.loadingClasses}" role="status"></span> `;
  }
};
v1.styles = M(f(Y2));
let W = v1;
i2([
  C({ type: Boolean })
], W.prototype, "ai");
i2([
  C({ type: String })
], W.prototype, "size");
customElements.get("sp-loading") || customElements.define("sp-loading", W);
const Q2 = `<svg viewBox="0 0 74 26" fill="none" xmlns="http://www.w3.org/2000/svg">
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
`, X2 = `<svg viewBox="0 0 74 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M72.1973 0H1.9354C1.25055 0 0.697144 0.556428 0.697144 1.23822V24.7618C0.697144 25.4466 1.25055 26 1.9354 26H57.8275C58.491 26 59.1055 25.6454 59.4357 25.0706L73.0533 1.48589C73.4355 0.82548 72.9585 0 72.1973 0Z" fill="#F72A48"/>
<path d="M13.1507 10.0632C12.9506 9.80871 12.6891 9.60628 12.3665 9.45625C12.0436 9.30623 11.7323 9.23123 11.4323 9.23123C11.2776 9.23123 11.1207 9.24486 10.9618 9.27214C10.8026 9.29942 10.6594 9.35184 10.5322 9.42899C10.4047 9.50633 10.298 9.60628 10.2117 9.72902C10.1252 9.85175 10.0821 10.0086 10.0821 10.1995C10.0821 10.3632 10.1162 10.4996 10.1844 10.6087C10.2526 10.7178 10.3525 10.8132 10.4844 10.8951C10.6161 10.9769 10.773 11.0519 10.9549 11.1201C11.1367 11.1883 11.3413 11.2588 11.5687 11.3315C11.896 11.4406 12.2369 11.5612 12.5915 11.6929C12.9461 11.8248 13.2687 11.9998 13.5598 12.218C13.8507 12.4362 14.0917 12.7068 14.2826 13.0294C14.4736 13.3523 14.569 13.7546 14.569 14.2364C14.569 14.7911 14.4667 15.2708 14.2622 15.6752C14.0576 16.0799 13.7825 16.414 13.4371 16.6776C13.0914 16.9414 12.6959 17.1368 12.2506 17.2641C11.805 17.3913 11.3457 17.455 10.8731 17.455C10.1821 17.455 9.51379 17.3344 8.86833 17.0936C8.22263 16.8528 7.68629 16.5095 7.25903 16.0639L8.7865 14.5092C9.02284 14.8003 9.33414 15.0434 9.72071 15.2388C10.107 15.4344 10.4913 15.532 10.8731 15.532C11.0457 15.532 11.2141 15.5139 11.3777 15.4775C11.5414 15.4412 11.6846 15.382 11.8073 15.3002C11.9301 15.2183 12.0277 15.1092 12.1006 14.9729C12.1732 14.8365 12.2097 14.6728 12.2097 14.4819C12.2097 14.3001 12.164 14.1456 12.0733 14.0182C11.9823 13.891 11.8527 13.7751 11.6846 13.6704C11.5163 13.566 11.3072 13.4705 11.0572 13.384C10.8071 13.2977 10.523 13.2046 10.2048 13.1044C9.89565 13.0045 9.59327 12.8862 9.29794 12.7499C9.00237 12.6135 8.73875 12.4385 8.5069 12.2248C8.27505 12.0113 8.08859 11.7521 7.94777 11.4474C7.80671 11.1429 7.73636 10.7723 7.73636 10.3359C7.73636 9.79955 7.84547 9.34034 8.06367 8.95847C8.28189 8.57661 8.5683 8.26292 8.92289 8.01745C9.27748 7.77196 9.67746 7.59253 10.123 7.47874C10.5684 7.36517 11.0185 7.30826 11.4732 7.30826C12.0187 7.30826 12.5755 7.40842 13.1439 7.6083C13.712 7.8084 14.2098 8.10396 14.6372 8.49477L13.1507 10.0632ZM22.97 12.4304C22.8217 11.9978 22.6086 11.6177 22.3304 11.2902C22.0524 10.9627 21.7125 10.7032 21.314 10.5147C20.9123 10.3232 20.4674 10.2274 19.9761 10.2274C19.4786 10.2274 19.043 10.3293 18.6753 10.5332C18.3076 10.7372 18.0171 10.9782 17.8101 11.2501H17.7668V10.4189H15.6411V20.5717L17.8781 20.0186V16.4594H17.9059C18.1129 16.7499 18.4034 16.9785 18.7772 17.1484C19.1511 17.3153 19.5466 17.4018 19.9637 17.4018C20.4736 17.4018 20.9277 17.2998 21.3263 17.099C21.7279 16.9013 22.0648 16.6355 22.3428 16.3018C22.6209 15.9713 22.831 15.5881 22.9793 15.1494C23.1245 14.7137 23.1956 14.2595 23.1956 13.7868C23.1956 13.314 23.1214 12.8598 22.97 12.4304ZM20.9247 14.4356C20.8566 14.6488 20.7578 14.8373 20.6249 15.001C20.492 15.1648 20.3283 15.2946 20.1275 15.3965C19.9267 15.4954 19.6949 15.5448 19.4323 15.5448C19.1758 15.5448 18.9503 15.4954 18.7494 15.3965C18.5486 15.2946 18.3787 15.1648 18.2397 15.001C18.0975 14.8373 17.9894 14.6488 17.9121 14.4418C17.8349 14.2317 17.7947 14.0185 17.7947 13.7991C17.7947 13.5829 17.8349 13.3697 17.9121 13.1595C17.9894 12.9495 18.0975 12.764 18.2397 12.6003C18.3787 12.4365 18.5486 12.3037 18.7494 12.2048C18.9503 12.1029 19.1758 12.0534 19.4323 12.0534C19.6949 12.0534 19.9267 12.1029 20.1275 12.2048C20.3283 12.3037 20.492 12.4335 20.6249 12.5941C20.7578 12.7517 20.8566 12.9371 20.9247 13.1441C20.9926 13.3542 21.0266 13.5674 21.0266 13.7868C21.0266 14.003 20.9926 14.2193 20.9247 14.4356ZM31.1612 13.8954V14.1682C31.1612 14.2592 31.1565 14.3455 31.1476 14.4273H26.2242C26.2424 14.6183 26.2992 14.7911 26.3947 14.9456C26.4902 15.1003 26.6129 15.2343 26.7629 15.3479C26.913 15.4617 27.0811 15.5503 27.2676 15.6138C27.4538 15.6776 27.6471 15.7093 27.8472 15.7093C28.2017 15.7093 28.5018 15.6435 28.7473 15.5115C28.9928 15.3799 29.1926 15.2094 29.3473 15.0001L30.9021 15.9821C30.5837 16.4458 30.1633 16.8027 29.6406 17.0527C29.1176 17.3026 28.5108 17.4277 27.8199 17.4277C27.3106 17.4277 26.8288 17.348 26.3743 17.189C25.9195 17.0301 25.5219 16.7982 25.1809 16.4935C24.84 16.189 24.5717 15.8139 24.3763 15.3684C24.1807 14.923 24.0831 14.4137 24.0831 13.8409C24.0831 13.2864 24.1785 12.7839 24.3695 12.3339C24.5604 11.8838 24.8195 11.502 25.1468 11.1883C25.4742 10.8746 25.8605 10.6315 26.3061 10.4587C26.7514 10.2861 27.2335 10.1995 27.7517 10.1995C28.2516 10.1995 28.7108 10.2837 29.1291 10.4518C29.5472 10.6202 29.9065 10.8633 30.2065 11.1815C30.5066 11.4998 30.7406 11.8862 30.9089 12.3407C31.0771 12.7954 31.1612 13.3137 31.1612 13.8954ZM29.1019 13.0362C29.1019 12.6817 28.9904 12.3771 28.7677 12.1225C28.5448 11.8681 28.2107 11.7406 27.7654 11.7406C27.5471 11.7406 27.347 11.7747 27.1653 11.8429C26.9833 11.9111 26.8243 12.0044 26.6879 12.1225C26.5515 12.2408 26.4424 12.3795 26.3606 12.5385C26.2788 12.6976 26.2332 12.8636 26.2242 13.0362H29.1019ZM39.153 13.8954V14.1682C39.153 14.2592 39.1483 14.3455 39.1394 14.4273H34.2161C34.2342 14.6183 34.2911 14.7911 34.3865 14.9456C34.482 15.1003 34.6047 15.2343 34.7548 15.3479C34.9048 15.4617 35.0729 15.5503 35.2594 15.6138C35.4456 15.6776 35.6389 15.7093 35.839 15.7093C36.1936 15.7093 36.4936 15.6435 36.7391 15.5115C36.9846 15.3799 37.1845 15.2094 37.3392 15.0001L38.8939 15.9821C38.5755 16.4458 38.1551 16.8027 37.6324 17.0527C37.1094 17.3026 36.5025 17.4277 35.8117 17.4277C35.3024 17.4277 34.8206 17.348 34.3661 17.189C33.9113 17.0301 33.5137 16.7982 33.1728 16.4935C32.8318 16.189 32.5635 15.8139 32.3681 15.3684C32.1725 14.923 32.0749 14.4137 32.0749 13.8409C32.0749 13.2864 32.1703 12.7839 32.3613 12.3339C32.5522 11.8838 32.8113 11.502 33.1387 11.1883C33.4659 10.8746 33.8523 10.6315 34.2979 10.4587C34.7432 10.2861 35.2253 10.1995 35.7435 10.1995C36.2434 10.1995 36.7027 10.2837 37.121 10.4518C37.5391 10.6202 37.8983 10.8633 38.1984 11.1815C38.4984 11.4998 38.7324 11.8862 38.9007 12.3407C39.0688 12.7954 39.153 13.3137 39.153 13.8954ZM37.0937 13.0362C37.0937 12.6817 36.9823 12.3771 36.7596 12.1225C36.5366 11.8681 36.2025 11.7406 35.7571 11.7406C35.5389 11.7406 35.3388 11.7747 35.1571 11.8429C34.9751 11.9111 34.8161 12.0044 34.6798 12.1225C34.5434 12.2408 34.4343 12.3795 34.3524 12.5385C34.2706 12.6976 34.225 12.8636 34.2161 13.0362H37.0937ZM45.3733 7.11546V11.1419H45.3454C45.1539 10.9133 44.8851 10.7032 44.5391 10.5147C44.193 10.3232 43.7728 10.2274 43.2722 10.2274C42.7809 10.2274 42.336 10.3232 41.9406 10.5147C41.545 10.7032 41.2114 10.9627 40.9333 11.2902C40.6552 11.6177 40.442 11.9978 40.2906 12.4304C40.1423 12.8598 40.0682 13.314 40.0682 13.7868C40.0682 14.2595 40.1392 14.7137 40.2845 15.1494C40.4297 15.5881 40.6428 15.9713 40.9179 16.3018C41.1959 16.6355 41.5358 16.9013 41.9344 17.099C42.336 17.2998 42.7903 17.4018 43.3001 17.4018C43.7542 17.4018 44.1837 17.306 44.5885 17.1206C44.9932 16.9352 45.3022 16.6695 45.5216 16.3235H45.5494V17.2103H47.6072V6.56238L45.3733 7.11546ZM45.3516 14.4418C45.2744 14.6488 45.1663 14.8373 45.0242 15.001C44.882 15.1648 44.712 15.2946 44.5112 15.3965C44.3135 15.4954 44.0849 15.5448 43.8315 15.5448C43.5657 15.5448 43.334 15.4954 43.1363 15.3965C42.9354 15.2946 42.7655 15.1648 42.6296 15.001C42.4936 14.8373 42.3917 14.6488 42.3237 14.4356C42.2557 14.2193 42.2217 14.003 42.2217 13.7868C42.2217 13.5674 42.2557 13.3542 42.3237 13.1441C42.3917 12.9371 42.4936 12.7517 42.6296 12.5941C42.7655 12.4335 42.9354 12.3037 43.1363 12.2048C43.334 12.1029 43.5657 12.0534 43.8315 12.0534C44.0849 12.0534 44.3135 12.1029 44.5112 12.2048C44.712 12.3037 44.882 12.4365 45.0242 12.6003C45.1663 12.764 45.2744 12.9495 45.3516 13.1595C45.4289 13.3697 45.466 13.5829 45.466 13.7991C45.466 14.0185 45.4289 14.2317 45.3516 14.4418ZM49.0353 11.3451C49.4352 10.9633 49.9013 10.6769 50.4331 10.4859C50.965 10.295 51.5082 10.1995 52.0629 10.1995C52.6357 10.1995 53.1199 10.2701 53.5153 10.4109C53.9108 10.552 54.2313 10.7702 54.4768 11.0655C54.7223 11.3611 54.9017 11.7338 55.0155 12.1839C55.1291 12.6339 55.186 13.1681 55.186 13.7863V17.2095H53.1403V16.4867H53.0994C52.9266 16.7686 52.6651 16.9868 52.3152 17.1413C51.9651 17.2958 51.5856 17.3731 51.1764 17.3731C50.9037 17.3731 50.6217 17.3367 50.3309 17.2641C50.0398 17.1914 49.7738 17.0731 49.533 16.9095C49.292 16.7458 49.0943 16.5276 48.9398 16.2548C48.7851 15.9821 48.7079 15.6458 48.7079 15.2456C48.7079 14.7546 48.842 14.3591 49.1102 14.0591C49.3783 13.7591 49.724 13.5272 50.1467 13.3636C50.5695 13.1999 51.04 13.0908 51.5583 13.0362C52.0765 12.9817 52.5811 12.9544 53.0721 12.9544V12.8453C53.0721 12.5091 52.9538 12.2612 52.7175 12.102C52.481 11.9431 52.1901 11.8634 51.8447 11.8634C51.5263 11.8634 51.2195 11.9316 50.9241 12.0679C50.6286 12.2043 50.3763 12.368 50.1672 12.5589L49.0353 11.3451ZM53.1403 14.25H52.8539C52.6084 14.25 52.3606 14.2615 52.1106 14.2841C51.8604 14.3069 51.6378 14.3502 51.4423 14.4137C51.2467 14.4774 51.0854 14.5705 50.9582 14.6933C50.8308 14.816 50.7673 14.9775 50.7673 15.1774C50.7673 15.3049 50.7967 15.414 50.8559 15.5047C50.9149 15.5957 50.99 15.6684 51.081 15.7229C51.1717 15.7775 51.2764 15.8163 51.3946 15.8389C51.5127 15.8617 51.6265 15.873 51.7356 15.873C52.1901 15.873 52.5379 15.7481 52.7789 15.4979C53.0197 15.248 53.1403 14.9093 53.1403 14.4819V14.25Z" fill="white"/>
</svg>
`, t9 = `<svg viewBox="0 0 134 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
`, e9 = `<svg viewBox="0 0 118 19" fill="none" xmlns="http://www.w3.org/2000/svg">
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
var s9 = Object.defineProperty, r2 = (r, t, e, i) => {
  for (var s = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = n(t, e, s) || s);
  return s && s9(t, e, s), s;
}, o1, o2;
const x1 = class x1 extends u {
  constructor() {
    super(...arguments);
    $(this, o1);
    this.language = "", this.brand = "";
  }
  render() {
    const e = g(this, o1, o2).call(this);
    return e ? H`${N2(e)}` : H``;
  }
};
o1 = new WeakSet(), o2 = function() {
  if (this.brand === "uzabase")
    return e9;
  if (this.brand === "speeda")
    return this.language === "en" ? X2 : this.language === "zh" ? t9 : Q2;
}, x1.styles = M();
let J = x1;
r2([
  C({ type: String, reflect: !0 })
], J.prototype, "language");
r2([
  C({ type: String, reflect: !0 })
], J.prototype, "brand");
customElements.get("sp-logo") || customElements.define("sp-logo", J);
const i9 = ":host{display:block;border-radius:6px;padding:8px 0;box-shadow:0 5px 9px 2px #00000021;background-color:#fff}", _1 = class _1 extends u {
  render() {
    return H`<slot></slot>`;
  }
};
_1.styles = M(f(i9));
let f1 = _1;
customElements.get("sp-control-menu") || customElements.define("sp-control-menu", f1);
const r9 = ":host{display:flex;font-size:14px;align-items:center;justify-content:space-between;padding:4px 12px 4px 16px;box-sizing:border-box;min-height:32px;cursor:pointer;color:#000000d6;column-gap:8px}:host .icon{display:none;width:24px;height:24px}:host([selected]){background-color:#f0f6ff}:host([selected]) .icon{display:block}:host([selected]:hover){background-color:#e3efff}:host([selected]:active){background-color:#d4e6ff}:host([disabled]){background-color:transparent;cursor:not-allowed;color:#00000059}:host([disabled]:hover){background-color:transparent}:host([disabled]:active){background-color:transparent}:host([disabled]:focus){border:none;padding:4px 12px 4px 16px}:host(:hover){background-color:#f8f8f8}:host(:active){background-color:#0000000d}:host(:focus){border:2px solid #191919;box-sizing:border-box;padding:2px 10px 2px 14px;outline:none}";
var o9 = Object.defineProperty, y1 = (r, t, e, i) => {
  for (var s = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = n(t, e, s) || s);
  return s && o9(t, e, s), s;
};
const w1 = class w1 extends u {
  constructor() {
    super(...arguments), this.text = "", this.selected = !1, this.disabled = !1;
  }
  render() {
    return H`
      <span class="text">${this.text}</span>
      <sp-icon class="icon" type="check-small"></sp-icon>
    `;
  }
};
w1.styles = M(f(r9));
let O = w1;
y1([
  C({ type: String, reflect: !0 })
], O.prototype, "text");
y1([
  C({ type: Boolean, reflect: !0 })
], O.prototype, "selected");
y1([
  C({ type: Boolean, reflect: !0 })
], O.prototype, "disabled");
customElements.get("sp-control-menu-item") || customElements.define("sp-control-menu-item", O);
const n9 = ":host .container{display:flex;gap:2px;align-items:center;padding-top:8px;color:#c92812}:host .container>.text{font-weight:var(--font-weight-normal);font-size:14px}:host .container .icon{width:21px;height:21px}:host .container.none{display:none}";
var a9 = Object.defineProperty, C9 = (r, t, e, i) => {
  for (var s = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = n(t, e, s) || s);
  return s && a9(t, e, s), s;
}, n1, n2;
const A1 = class A1 extends u {
  constructor() {
    super(...arguments);
    $(this, n1);
    this.text = "";
  }
  render() {
    return H`
      <div class="${g(this, n1, n2).call(this)}" role="error">
        <sp-icon class="icon" type="error-fill"></sp-icon>
        <span class="text">${this.text}</span>
      </div>
    `;
  }
};
n1 = new WeakSet(), n2 = function() {
  return I({
    container: !0,
    none: !this.text
  });
}, A1.styles = M(f(n9));
let s1 = A1;
C9([
  C({ type: String, reflect: !0 })
], s1.prototype, "text");
customElements.get("sp-text-field-error-text") || customElements.define("sp-text-field-error-text", s1);
const l9 = ".input{width:100%;box-sizing:border-box;height:48px;background:#fff;border:1px solid #b6b6b6;border-radius:6px;padding:4px 12px;font-weight:var(--font-weight-normal);font-size:16px;line-height:24}.input::placeholder{color:#0000008a}.input[disabled]{color:#000000ad;background-color:#0000000d;border-color:#e5e5e5}.input[disabled]::placeholder{color:#00000059}.input[disabled]:hover{border-color:#e5e5e5}.input:hover{border-color:#0000008f}.input:focus-visible{outline:canvastext solid 3px;box-shadow:0 0 0 2px #fff,0 0 0 4px #282828;outline-offset:1px}.input.error{border-color:#db351f}";
var h9 = Object.defineProperty, E = (r, t, e, i) => {
  for (var s = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = n(t, e, s) || s);
  return s && h9(t, e, s), s;
}, U, a2, C2;
const a1 = class a1 extends u {
  constructor() {
    super();
    $(this, U);
    this.error = "", this.placeholder = "", this.autocomplete = "off", this.disabled = !1, this.name = "", this.value = "", this.type = "text", this.internals = this.attachInternals();
  }
  updated(e) {
    super.updated(e), e.has("value") && this.internals.setFormValue(this.value);
  }
  render() {
    return H`
      <input
        class="${g(this, U, a2).call(this)}"
        type="${this.type}"
        placeholder="${this.placeholder}"
        autocomplete="${this.autocomplete}"
        ?disabled="${this.disabled}"
        name="${this.name}"
        .value="${this.value}"
        aria-invalid="${this.error && !this.disabled ? "true" : "false"}"
        @input="${g(this, U, C2)}"
      />
      <sp-text-field-error-text
        text="${this.disabled ? "" : this.error}"
      ></sp-text-field-error-text>
    `;
  }
};
U = new WeakSet(), a2 = function() {
  return I({
    input: !0,
    error: this.error && !this.disabled
  });
}, C2 = function(e) {
  const i = e.target;
  this.value = i.value, e.composed || this.dispatchEvent(
    new InputEvent("input", {
      ...e,
      composed: !0
    })
  );
}, a1.styles = M(f(l9)), a1.formAssociated = !0;
let m = a1;
E([
  C({ type: String, reflect: !0 })
], m.prototype, "error");
E([
  C({ type: String, reflect: !0 })
], m.prototype, "placeholder");
E([
  C({ type: String, reflect: !0 })
], m.prototype, "autocomplete");
E([
  C({ type: Boolean, reflect: !0 })
], m.prototype, "disabled");
E([
  C({ type: String, reflect: !0 })
], m.prototype, "name");
E([
  C({ type: String, reflect: !0 })
], m.prototype, "value");
E([
  C({ type: String, reflect: !0 })
], m.prototype, "type");
customElements.get("sp-text-field") || customElements.define("sp-text-field", m);
const d9 = ":host .label{margin-bottom:8px;text-align:left}:host .label.none{display:none}";
var p9 = Object.defineProperty, y = (r, t, e, i) => {
  for (var s = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = n(t, e, s) || s);
  return s && p9(t, e, s), s;
}, j, l2, h2;
const C1 = class C1 extends u {
  constructor() {
    super();
    $(this, j);
    this.text = "", this.error = "", this.placeholder = "", this.supportText = "", this.disabled = !1, this.name = "", this.value = "", this.type = "text", this.autocomplete = "off", this.internals = this.attachInternals();
  }
  updated(e) {
    super.updated(e), e.has("value") && this.internals.setFormValue(this.value);
  }
  render() {
    return H`
      <fieldset>
        <sp-label-unit
          class="${g(this, j, l2).call(this)}"
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
          @input="${g(this, j, h2)}"
        ></sp-text-field>
      </fieldset>
    `;
  }
};
j = new WeakSet(), l2 = function() {
  return I({
    label: !0,
    none: !this.text && !this.supportText
  });
}, h2 = function(e) {
  const i = e.target;
  this.value = i.value;
}, C1.styles = M(f(d9)), C1.formAssociated = !0;
let L = C1;
y([
  C({ type: String, reflect: !0 })
], L.prototype, "text");
y([
  C({ type: String, reflect: !0 })
], L.prototype, "error");
y([
  C({ type: String, reflect: !0 })
], L.prototype, "placeholder");
y([
  C({ type: String, attribute: "support-text", reflect: !0 })
], L.prototype, "supportText");
y([
  C({ type: Boolean, reflect: !0 })
], L.prototype, "disabled");
y([
  C({ type: String, reflect: !0 })
], L.prototype, "name");
y([
  C({ type: String, reflect: !0 })
], L.prototype, "value");
y([
  C({ type: String, reflect: !0 })
], L.prototype, "type");
y([
  C({ type: String, reflect: !0 })
], L.prototype, "autocomplete");
customElements.get("sp-text-field-unit") || customElements.define("sp-text-field-unit", L);
export {
  V as SpButton,
  f1 as SpControlMenu,
  O as SpControlMenuItem,
  e1 as SpIcon,
  F as SpLabelUnit,
  W as SpLoading,
  J as SpLogo,
  L as SpTextFieldUnit
};
