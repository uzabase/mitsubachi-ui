import "../../src/components/button/mi-neutral-button";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { errorPageStyles } from "./error-page.styles";

const meta = {
  title: "Pages/500",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["!dev-only"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * サーバーエラーが発生した場合のエラーページ。
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
            width="214"
            height="97"
            viewBox="0 0 214 97"
            fill="none"
          >
            <path
              d="M31.56 96.4803C16.32 96.4803 4.56 88.5603 0 76.0803L14.76 71.0403C17.28 78.0003 23.64 82.6803 31.32 82.6803C40.68 82.6803 48.36 76.0803 48.36 65.6403C48.36 53.1603 38.52 47.8803 27.84 47.8803C21.24 47.8803 12.96 49.9203 6.84 52.4403L8.52 2.28027H60.6V16.3203H23.04L22.32 36.9603C25.44 35.8803 29.76 35.5203 33.12 35.5203C51 35.5203 64.8 46.2003 64.8 64.4403C64.8 84.9603 49.68 96.4803 31.56 96.4803Z"
              fill="#ACACAC"
            />
            <path
              d="M106.16 96.48C83 96.48 72.8 75.36 72.8 48.12C72.8 21.36 82.8801 0 106.16 0C129.2 0 139.4 21.12 139.4 48C139.4 74.64 129.68 96.48 106.16 96.48ZM106.16 82.56C119.36 82.56 122.72 63.48 122.72 48.12C122.72 32.4 119.12 13.56 106.16 13.56C92.96 13.56 89.48 32.76 89.48 48.24C89.48 63.96 93.08 82.56 106.16 82.56Z"
              fill="#ACACAC"
            />
            <path
              d="M180.76 96.48C157.6 96.48 147.4 75.36 147.4 48.12C147.4 21.36 157.48 0 180.76 0C203.8 0 214 21.12 214 48C214 74.64 204.28 96.48 180.76 96.48ZM180.76 82.56C193.96 82.56 197.32 63.48 197.32 48.12C197.32 32.4 193.72 13.56 180.76 13.56C167.56 13.56 164.08 32.76 164.08 48.24C164.08 63.96 167.68 82.56 180.76 82.56Z"
              fill="#ACACAC"
            />
          </svg>
        </p>
        <p class="errorPage__title">システムエラーが発生しました</p>
        <p class="errorPage__description">
          しばらく時間をおいてからもう一度お試しください。
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
