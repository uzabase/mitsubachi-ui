import "../../src/components/button/mi-neutral-button";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { errorPageStyles } from "./error-page.styles";

const meta = {
  title: "Pages/403",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["!dev-only"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * アクセス権限がない場合のエラーページ。
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
            width="220"
            height="97"
            viewBox="0 0 220 97"
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
              d="M187 96.48C171.64 96.48 158.56 89.52 153.64 74.64L168.64 70.2C171.04 77.4 177.52 82.8 186.4 82.8C194.56 82.8 202.84 77.76 202.84 67.56C202.84 56.16 191.92 52.68 181.6 52.68H176.8V40.08H182.08C191.68 40.08 200.56 36.96 200.56 26.52C200.56 18.36 193.84 13.32 186.16 13.32C179.08 13.32 173.8 17.28 171.4 23.88L156.52 19.44C161.44 6.72 173.44 0 187 0C202.6 0 217 8.4 217 25.2C217 35.52 210.28 43.32 201.16 45.72V45.96C211.72 48.36 219.16 56.88 219.16 68.04C219.16 86.88 203.32 96.48 187 96.48Z"
              fill="#ACACAC"
            />
          </svg>
        </p>
        <p class="errorPage__title">
          ご指定のページは<br />このアカウントでは見ることができません
        </p>
        <p class="errorPage__description">
          詳細はSpeedaの担当者までお問い合わせください。
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
