import "../../src/components/radio-button/radio-button-text-group-unit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiRadioButtonTextGroupUnit } from "../../src/components/radio-button/radio-button-text-group-unit";

/** Storybook Actions 用（コンポーネントの公開 API 外） */
type MiRadioButtonTextGroupUnitStory = MiRadioButtonTextGroupUnit & {
  onChange?: (e: Event) => void;
};

const meta = {
  component: "mi-radio-button-text-group-unit",
  argTypes: {
    text: {
      control: "text",
      description: "ラジオボタングループを説明するテキスト",
    },
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
    text: "性別",
    value: "option1",
    name: "options",
    onChange: action("change"),
  },
  render: (args) => html`
    <mi-radio-button-text-group-unit
      text="${args.text}"
      value="${args.value}"
      name="${args.name}"
      @change="${args.onChange}"
    >
      <mi-radio-button-text value="option1">Option 1</mi-radio-button-text>
      <mi-radio-button-text value="option2">Option 2</mi-radio-button-text>
      <mi-radio-button-text value="option3">Option 3</mi-radio-button-text>
    </mi-radio-button-text-group-unit>
  `,
} satisfies Meta<MiRadioButtonTextGroupUnitStory>;

export default meta;

export const Basic: StoryObj<MiRadioButtonTextGroupUnitStory> = {
  tags: ["!dev-only"],
};
