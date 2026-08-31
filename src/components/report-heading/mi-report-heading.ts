import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { html as staticHtml, literal } from "lit/static-html.js";

import { makeStyles } from "../styles";
import style from "./report-heading.styles";

export const reportHeadingLevels = [1, 2, 3, 4, 5, 6] as const;

export type ReportHeadingLevel = (typeof reportHeadingLevels)[number];

/**
 * level と実際に描画する見出しタグの対応表。
 *
 * `literal` はソースコードに書かれた固定文字列だけを受け付けるため、
 * 利用者の入力がタグ名として評価されることはない（`unsafeStatic` は使わない）。
 */
const headingTags = {
  1: literal`h1`,
  2: literal`h2`,
  3: literal`h3`,
  4: literal`h4`,
  5: literal`h5`,
  6: literal`h6`,
} as const;

/** 左に赤いバーを表示するレベル */
const LEVEL_WITH_BAR = 3;

/**
 * @summary レポートや記事などの読み物コンテンツの中で、内容の区切りや構造を示す見出しです。
 *
 * `level` の値に対応した HTML の見出し要素（`<h1>`〜`<h6>`）としてレンダリングされます。
 * UI（画面）の見出しには使わず、読み物コンテンツの見出しに使ってください。
 *
 * クリック・タップによる動作はなく、フォーカスも受け取らない静的なコンポーネントです。
 *
 * 注意: 見出しの階層を飛ばさないでください（`level="2"` の次に `level="4"` など）。
 * 文書構造が崩れ、スクリーンリーダーの見出しナビゲーションを妨げます。
 * どのレベルを使うかは利用側の責務です（見た目だけを理由にレベルを選ばないでください）。
 *
 * @slot - 見出しのテキスト
 * @slot action - 見出しの右端に表示するアクション領域（任意）。ボタン等の要素を配置します
 *   （テキストノードだけを入れた場合は表示されません）
 *
 * @cssprop --text-regular-default - level 1〜5 の文字色
 * @cssprop --text-weak-default - level 6 の文字色
 * @cssprop --border-regular-default - level 2 の下線の色
 * @cssprop --palette-regular-red - level 3 の左バーの色
 *
 * @example
 * ```html
 * <mi-report-heading level="2">市場環境の変化</mi-report-heading>
 *
 * <!-- 見出しの右端にアクションを置く -->
 * <mi-report-heading level="2">
 *   市場環境の変化
 *   <mi-neutral-button slot="action">編集</mi-neutral-button>
 *   <mi-neutral-button slot="action">共有</mi-neutral-button>
 * </mi-report-heading>
 * ```
 */
export class MiReportHeading extends LitElement {
  static styles = makeStyles(style);

  /**
   * 見出しの階層。`<h1>`〜`<h6>` に対応します。
   * 範囲外の値（`0` / `7` / 数値でない値）を指定した場合は `1` として扱います。
   */
  @property({ type: Number, reflect: true })
  level: ReportHeadingLevel = 1;

  @state()
  private _hasAction = false;

  /** 範囲外の値を弾いた、実際に描画に使うレベル */
  private get _level(): ReportHeadingLevel {
    return reportHeadingLevels.includes(this.level) ? this.level : 1;
  }

  private _onActionSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasAction = slot.assignedElements().length > 0;
  }

  /**
   * アクション領域。`action` slot に要素があるときだけ枠（.action）を描画する。
   * 要素が無いときも slot 自体は残す（後から追加されたときに slotchange を受け取るため）。
   */
  private _renderAction() {
    return this._hasAction
      ? html`<span class="action">
          <slot name="action" @slotchange=${this._onActionSlotChange}></slot>
        </span>`
      : html`<slot
          name="action"
          @slotchange=${this._onActionSlotChange}
          hidden
        ></slot>`;
  }

  /**
   * 見出し要素（`<h1>`〜`<h6>`）にはテキストだけを入れ、アクション領域は
   * その兄弟として `.row` に並べる。
   * 見出しロールはアクセシブルネームを内容から算出するため、アクションのボタンを
   * 見出し要素の内側に置くと、そのラベルが見出しの読み上げに合流してしまう。
   */
  render() {
    const level = this._level;
    const tag = headingTags[level];

    return staticHtml`
      <div class="row" data-level=${level}>
        <${tag} class="heading">
          ${
            level === LEVEL_WITH_BAR
              ? html`<span class="bar" aria-hidden="true"></span>`
              : nothing
          }
          <slot class="text"></slot>
        </${tag}>
        ${this._renderAction()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-report-heading": MiReportHeading;
  }
}

if (!customElements.get("mi-report-heading")) {
  customElements.define("mi-report-heading", MiReportHeading);
}
