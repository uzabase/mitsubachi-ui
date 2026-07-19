import "../../src/components/menu/control-menu";
import "../../src/components/menu/control-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiControlMenu } from "../../src/components/menu/control-menu";

/**
 * @deprecated 廃止予定です。代わりに mi-menu + mi-select-menu-item 等を使用してください。
 */
const meta = {
  component: "mi-control-menu",
  args: {},
  parameters: {
    docs: {
      description: {
        component:
          '<div style="background:#fff3cd;border:1px solid #ffc107;border-radius:4px;padding:8px 12px;font-size:14px;color:#664d03;">⚠ このコンポーネントは廃止予定です。代わりに mi-menu を使用してください。</div>',
      },
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<MiControlMenu>;

export default meta;
type Story = StoryObj<MiControlMenu>;

export const Default: Story = {
  render: () => {
    return html`
      <mi-control-menu>
        <mi-control-menu-item text="日本語"></mi-control-menu-item>
        <mi-control-menu-item
          text="English"
          selected
          tabindex="0"
        ></mi-control-menu-item>
        <mi-control-menu-item text="中文" disabled></mi-control-menu-item>
      </mi-control-menu>
    `;
  },
};
