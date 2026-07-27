import "../../src/components/radio-button/radio-button-text-group";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiRadioButtonTextGroup } from "../../src/components/radio-button/radio-button-text-group";

type MiRadioButtonTextGroupStory = MiRadioButtonTextGroup & {
  onChange?: (e: Event) => void;
};

const meta = {
  component: "mi-radio-button-text-group",
  title: "Components/RadioButton/mi-radio-button-text-group",
  argTypes: {
    value: {
      control: "text",
      description: "現在選択されているラジオボタンの値",
    },
    name: {
      control: "text",
      description: "グループ内のラジオボタンに共有する name 属性",
    },
    onChange: {
      name: "change",
      action: "change",
      description: "ラジオボタンの選択が変更されたとき",
      table: { category: "Events" },
    },
  },
  args: {
    value: "option1",
    name: "options",
    onChange: action("change"),
  },
  render: (args) => html`
    <mi-radio-button-text-group
      value="${args.value}"
      name="${args.name}"
      @change="${args.onChange}"
    >
      <mi-radio-button-text value="option1">Option 1</mi-radio-button-text>
      <mi-radio-button-text value="option2">Option 2</mi-radio-button-text>
      <mi-radio-button-text value="option3">Option 3</mi-radio-button-text>
    </mi-radio-button-text-group>
  `,
} satisfies Meta<MiRadioButtonTextGroupStory>;

export default meta;

export const Basic: StoryObj<MiRadioButtonTextGroupStory> = {
  tags: ["!dev-only"],
};
