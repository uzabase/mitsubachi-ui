import "../../src/components/icon-color";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import {
  iconColorTypes,
  type MiIconColor,
} from "../../src/components/icon-color";

// 型安全のためのヘルパー関数
function getFirstIcon(): string {
  if (iconColorTypes.length > 0) {
    // @ts-expect-error - 空の配列の場合でも型安全を保証
    return iconColorTypes[0];
  }
  return "";
}

const meta = {
  args: {
    type: "",
  },
  argTypes: {
    type: {
      options: iconColorTypes.length > 0 ? iconColorTypes : [""],
      control: { type: "select" },
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<MiIconColor>;

export default meta;
type Story = StoryObj<MiIconColor>;

export const Default: Story = {
  render: ({ type }) => {
    if ((iconColorTypes as readonly string[]).length === 0) {
      return html`<div style="padding: 16px;">
        カラーアイコンが登録されていません。fetch-icon-colorsスクリプトを実行してください。
      </div>`;
    }
    const displayType = type || getFirstIcon();
    return html`<mi-icon-color
      style="display: inline-block; width: 24px; height: 24px;"
      type=${displayType}
    ></mi-icon-color>`;
  },
};

export const AllIcons: Story = {
  render: () => {
    if ((iconColorTypes as readonly string[]).length === 0) {
      return html`<div style="padding: 16px;">
        カラーアイコンが登録されていません。fetch-icon-colorsスクリプトを実行してください。
      </div>`;
    }
    return html`
      <div
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 24px; padding: 16px;"
      >
        ${([...iconColorTypes] as string[])
          .sort((a, b) => a.localeCompare(b))
          .map((iconType) => {
            return html`
              <div
                style="display: flex; flex-direction: column; align-items: center;"
              >
                <mi-icon-color
                  style="margin-bottom: 8px;"
                  type=${iconType}
                ></mi-icon-color>
                <div
                  style="font-size: 12px; text-align: center; word-break: break-all;"
                >
                  ${iconType}
                </div>
              </div>
            `;
          })}
      </div>
    `;
  },
};
