import "../../src/components/button/mi-neutral-button";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { errorPageStyles } from "./error-page.styles";

const meta = {
  title: "Pages/404",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["!dev-only"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * ページが見つからなかった場合のエラーページ。
 * グロナビやヘッダー・フッターと組み合わせて使用する想定。
 */
export const Default: Story = {
  render: () => html`
    ${errorPageStyles}
    <div class="errorPage">
      <div class="errorPage__content">
        <p class="errorPage__code">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="225"
            height="97"
            viewBox="0 0 225 97"
            fill="none"
          >
            <path
              d="M58.08 94.1398H42.72V74.3398H0V60.1798L38.28 2.33984H57.96V61.0198H71.04V74.3398H58.08V94.1398ZM42.48 19.4998L16.08 61.0198H42.84V19.4998H42.48Z"
              fill="#ACACAC"
            />
            <path
              d="M112.4 96.48C89.24 96.48 79.04 75.36 79.04 48.12C79.04 21.36 89.12 0 112.4 0C135.44 0 145.64 21.12 145.64 48C145.64 74.64 135.92 96.48 112.4 96.48ZM112.4 82.56C125.6 82.56 128.96 63.48 128.96 48.12C128.96 32.4 125.36 13.56 112.4 13.56C99.2 13.56 95.72 32.76 95.72 48.24C95.72 63.96 99.32 82.56 112.4 82.56Z"
              fill="#ACACAC"
            />
            <path
              d="M211.72 94.1398H196.36V74.3398H153.64V60.1798L191.92 2.33984H211.6V61.0198H224.68V74.3398H211.72V94.1398ZM196.12 19.4998L169.72 61.0198H196.48V19.4998H196.12Z"
              fill="#ACACAC"
            />
          </svg>
        </p>
        <p class="errorPage__title">ご指定のページは見つかりませんでした</p>
        <p class="errorPage__description">
          アクセスしたURLが間違っているか、ページが移動または削除された可能性があります。
        </p>
        <div class="errorPage__action">
          <mi-neutral-button variant="tertiary" size="large">
            {ページ名}へ戻る
          </mi-neutral-button>
        </div>
      </div>
    </div>
  `,
};
