import "../../src/components/tag/mi-read-only-tag";

import { html } from "lit";

/**
 * mi-timeline-item の slot に入れるコンテンツの組み方。
 *
 * timeline 本体は中身のレイアウトを持たないため、ここは利用側が書く CSS の見本になる。
 * 値はすべて Figma のコンテンツコンポーネントから取っている。
 */

/**
 * 経歴（Figma: `_timeline-people`）。日付を 88px でそろえ、本文を右に置く。
 *
 * Figma は 800px 固定のモックのため本文が `white-space: nowrap` になっているが、
 * 実データでは溢れるのでここでは折り返す指定にしている。
 */
export const people = (date: string, text: string, current = false) => html`
  <div
    style="
      display: flex;
      gap: 8px;
      align-items: flex-start;
      font-size: 16px;
      line-height: 1.5;
      letter-spacing: 0.01em;
      color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
    "
  >
    <span style="min-inline-size: 88px; flex-shrink: 0; white-space: nowrap;">
      ${date}
    </span>
    <span>
      ${text}
      ${current
        ? html`<mi-read-only-tag type="information">現任</mi-read-only-tag>`
        : ""}
    </span>
  </div>
`;

/**
 * ニュース（Figma: `_timeline-news`）。日付 / 見出し / 補足を縦に積む。
 * 補足行は先頭のラベルが弱色、続くタイトルがリンク。
 */
export const news = (
  date: string,
  title: string,
  lead = "",
  link = "",
  href = "https://example.com/news",
) => html`
  <div
    style="display: flex; flex-direction: column; gap: 4px; padding-block-start: 2px;"
  >
    <span
      style="
        font-size: 14px;
        line-height: 1.5;
        letter-spacing: 0.01em;
        color: var(--text-weak-default, rgba(0, 0, 0, 0.54));
        white-space: nowrap;
      "
    >
      ${date}
    </span>
    <span
      style="
        font-size: 16px;
        font-weight: var(--font-weight-bold);
        line-height: 1.5;
        letter-spacing: 0.01em;
        color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
      "
    >
      ${title}
    </span>
    ${lead
      ? html`
          <span
            style="
              font-size: 16px;
              line-height: 1.5;
              letter-spacing: 0.01em;
              color: var(--text-weak-default, rgba(0, 0, 0, 0.54));
            "
          >
            ${lead}<a class="timeline-news-link" href="${href}">${link}</a>
          </span>
        `
      : ""}
  </div>
`;

/**
 * 在籍履歴（Figma: `_timeline-expert`）。
 * 会社名・期間・所属をすべて 12px で積み、会社名だけ太字にする。
 * 縦は gap 無しで、`line-height: 1.5` のぶんだけ行間が空く。
 */
export const expert = (company: string, period: string, role: string) => html`
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 12px;
      line-height: 1.5;
      letter-spacing: 0.01em;
      color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
    "
  >
    <span style="inline-size: 100%; font-weight: var(--font-weight-bold);">
      ${company}
    </span>
    <span style="display: flex; gap: 16px; inline-size: 100%;">
      <span
        style="
          flex-shrink: 0;
          white-space: nowrap;
          color: var(--text-weak-default, rgba(0, 0, 0, 0.54));
        "
      >
        ${period}
      </span>
      <span style="flex: 1 0 0; min-inline-size: 0;">${role}</span>
    </span>
  </div>
`;

/**
 * 補足行のリンク。`:link` だけだと訪問済みがブラウザ既定の紫になるため
 * `:visited` も同じトークン色にそろえる。下線なしは Figma の指定どおりで、
 * 色だけに頼らないよう hover で下線を出す。
 */
export const timelineLinkStyles = html`
  <style>
    .timeline-news-link:link,
    .timeline-news-link:visited {
      color: var(--text-link, #315ce8);
      text-decoration: none;
    }

    .timeline-news-link:hover {
      text-decoration: underline;
    }
  </style>
`;

/**
 * report-heading（折りたたみ機能付きの見出し）はこのライブラリに無いため、
 * Figma の文字サイズに合わせた素の見出しで代用する。
 */
export const sectionHeading = (text: string) => html`
  <h3
    style="
      font-size: 18px;
      font-weight: var(--font-weight-bold);
      line-height: 1.5;
      letter-spacing: 0.02em;
      color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
      padding-block: 24px 4px;
    "
  >
    ${text}
  </h3>
`;
