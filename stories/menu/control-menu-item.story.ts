import "../../src/components/menu/control-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiControlMenuItem } from "../../src/components/menu/control-menu-item";

/**
 * @deprecated 廃止予定です。代わりに mi-action-menu-item / mi-select-menu-item 等を使用してください。
 */
const meta = {
  component: "mi-control-menu-item",
  title: "Components/Menu/mi-control-menu-item",
  argTypes: {
    text: { type: "string" },
    selected: { type: "boolean" },
    disabled: { type: "boolean" },
  },
  args: {
    text: "Text",
    selected: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          '<div style="background:#fff3cd;border:1px solid #ffc107;border-radius:4px;padding:8px 12px;font-size:14px;color:#664d03;">⚠ このコンポーネントは廃止予定です。代わりに mi-action-menu-item / mi-select-menu-item を使用してください。</div>',
      },
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<MiControlMenuItem>;

export default meta;
type Story = StoryObj<MiControlMenuItem>;

export const Default: Story = {
  render: ({ text, selected, disabled }) => {
    return html`
      <mi-control-menu-item
        text=${text}
        tabindex="0"
        ?selected=${selected}
        ?disabled=${disabled}
      >
      </mi-control-menu-item>
    `;
  },
};
