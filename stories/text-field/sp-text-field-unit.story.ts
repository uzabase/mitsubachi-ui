import "../../src/components/text-field/text-field-unit";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";

import type { SpTextFieldUnit } from "../../src/components/text-field/text-field-unit";

const meta: Meta<SpTextFieldUnit> = {
  args: {
    text: "ラベル",
    error: "エラーテキストが入ります",
    placeholder: "プレースホルダー",
    supportText: "サポートテキスト",
    disabled: false,
    name: "surname",
    value: "Yamada",
    type: "text",
    autocomplete: '',
  },
  argTypes: {
    type: {
      options: ["text", "password"],
      control: { type: "select" },
    },
    autocomplete: {
      type: "string",
    },
  },
};
export default meta;

export const Default: StoryObj<SpTextFieldUnit> = {
  render: ({
    text,
    type,
    error,
    supportText,
    placeholder,
    disabled,
    name,
    value,
    autocomplete,
  }) => {
    return html`<sp-text-field-unit
      placeholder=${placeholder}
      text=${text}
      ?disabled=${disabled}
      name=${name}
      support-text=${supportText}
      value=${value}
      error=${error}
      autocomplete=${autocomplete || nothing}
      type=${type}
    >
    </sp-text-field-unit>`;
  },
};
