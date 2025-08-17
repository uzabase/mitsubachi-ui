import "../../src/components/menu/control-menu-item/sp-control-menu-item-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import { type SpControlMenuItemLit } from "../../src/components/menu/control-menu-item/sp-control-menu-item-lit";

const meta = {
  component: "sp-control-menu-item-lit",
  argTypes: {
    text: { type: "string" },
    selected: { type: "boolean" },
    disabled: { type: "boolean" },
    onMenuItemClick: {
      action: "menu-item-click",
    },
  },
  args: {
    text: "メニュー項目",
    selected: false,
    disabled: false,
    onMenuItemClick: action("menu-item-click"),
  },
  render: (args) => html`
    <div
      style="border: 1px solid #ccc; border-radius: 6px; padding: 8px 0; background: white;"
    >
      <sp-control-menu-item-lit
        text=${args.text}
        ?selected=${args.selected}
        ?disabled=${args.disabled}
        @menu-item-click=${args.onMenuItemClick}
      ></sp-control-menu-item-lit>
    </div>
  `,
} satisfies Meta<
  Partial<SpControlMenuItemLit> & { onMenuItemClick: () => void }
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    text: "これは非常に長いメニュー項目のテキストの例です。長いテキストがどのように表示されるかを確認できます。",
  },
};

export const AllStates: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 8px; border: 1px solid #ccc; border-radius: 6px; padding: 8px 0; background: white;"
    >
      <sp-control-menu-item-lit
        text="通常の項目"
        @menu-item-click=${action("menu-item-click")}
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="選択された項目"
        selected
        @menu-item-click=${action("menu-item-click")}
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="無効な項目"
        disabled
        @menu-item-click=${action("menu-item-click")}
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="選択されているが無効な項目"
        selected
        disabled
        @menu-item-click=${action("menu-item-click")}
      ></sp-control-menu-item-lit>
    </div>
  `,
};

export const WithSlotContent: Story = {
  render: () => html`
    <div
      style="border: 1px solid #ccc; border-radius: 6px; padding: 8px 0; background: white;"
    >
      <sp-control-menu-item-lit text="カスタムコンテンツ付き">
        <span style="color: #666; font-size: 12px; margin-left: 8px;"
          >（追加情報）</span
        >
      </sp-control-menu-item-lit>
    </div>
  `,
};

export const InteractiveExample: Story = {
  render: () => {
    let selectedItem = "item1";

    const handleClick = (event: CustomEvent) => {
      action("menu-item-click")(event);
      const target = event.target as SpControlMenuItemLit;
      // Reset all items
      document.querySelectorAll("sp-control-menu-item-lit").forEach((item) => {
        (item as SpControlMenuItemLit).selected = false;
      });
      // Select clicked item
      target.selected = true;
    };

    return html`
      <div
        style="border: 1px solid #ccc; border-radius: 6px; padding: 8px 0; background: white;"
      >
        <sp-control-menu-item-lit
          text="項目 1"
          selected
          @menu-item-click=${handleClick}
        ></sp-control-menu-item-lit>
        <sp-control-menu-item-lit
          text="項目 2"
          @menu-item-click=${handleClick}
        ></sp-control-menu-item-lit>
        <sp-control-menu-item-lit
          text="項目 3"
          @menu-item-click=${handleClick}
        ></sp-control-menu-item-lit>
        <sp-control-menu-item-lit
          text="無効な項目"
          disabled
          @menu-item-click=${handleClick}
        ></sp-control-menu-item-lit>
      </div>
    `;
  },
};
