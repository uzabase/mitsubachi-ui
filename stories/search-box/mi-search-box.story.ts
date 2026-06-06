import "../../src/components/search-box/search-box";
import "../../src/components/label-unit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";

import type { MiSearchBox } from "../../src/components/search-box/search-box";

const meta = {
  component: "mi-search-box",
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: { type: "select" },
    },
    placeholder: { type: "string" },
    value: { type: "string" },
    disabled: { type: "boolean" },
    error: { type: "string" },
    name: { type: "string" },
    autocomplete: { type: "string" },
  },
  args: {
    variant: "primary",
    placeholder: "検索",
    value: "",
    disabled: false,
    error: "",
    name: "search",
    autocomplete: undefined,
  },
  tags: ["!dev-only"],
} satisfies Meta<MiSearchBox>;

export default meta;
type Story = StoryObj<MiSearchBox>;

export const Primary: Story = {
  render: ({
    variant,
    placeholder,
    value,
    disabled,
    error,
    name,
    autocomplete,
  }) => {
    return html`<mi-search-box
      variant=${variant}
      placeholder=${placeholder || nothing}
      value=${value || nothing}
      ?disabled=${disabled}
      error=${error || nothing}
      name=${name}
      autocomplete=${autocomplete || nothing}
    ></mi-search-box>`;
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
  render: ({
    variant,
    placeholder,
    value,
    disabled,
    error,
    name,
    autocomplete,
  }) => {
    return html`<mi-search-box
      variant=${variant}
      placeholder=${placeholder || nothing}
      value=${value || nothing}
      ?disabled=${disabled}
      error=${error || nothing}
      name=${name}
      autocomplete=${autocomplete || nothing}
    ></mi-search-box>`;
  },
};

export const WithValue: Story = {
  args: {
    value: "テスト検索",
  },
  render: ({
    variant,
    placeholder,
    value,
    disabled,
    error,
    name,
    autocomplete,
  }) => {
    return html`<mi-search-box
      variant=${variant}
      placeholder=${placeholder || nothing}
      value=${value || nothing}
      ?disabled=${disabled}
      error=${error || nothing}
      name=${name}
      autocomplete=${autocomplete || nothing}
    ></mi-search-box>`;
  },
};

export const SecondaryError: Story = {
  args: {
    variant: "secondary",
    error: "エラーテキストが入ります",
  },
  render: ({
    variant,
    placeholder,
    value,
    disabled,
    error,
    name,
    autocomplete,
  }) => {
    return html`<mi-search-box
      variant=${variant}
      placeholder=${placeholder || nothing}
      value=${value || nothing}
      ?disabled=${disabled}
      error=${error || nothing}
      name=${name}
      autocomplete=${autocomplete || nothing}
    ></mi-search-box>`;
  },
};

export const SecondaryDisabled: Story = {
  args: {
    variant: "secondary",
    disabled: true,
  },
  render: ({
    variant,
    placeholder,
    value,
    disabled,
    error,
    name,
    autocomplete,
  }) => {
    return html`<mi-search-box
      variant=${variant}
      placeholder=${placeholder || nothing}
      value=${value || nothing}
      ?disabled=${disabled}
      error=${error || nothing}
      name=${name}
      autocomplete=${autocomplete || nothing}
    ></mi-search-box>`;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: ({
    variant,
    placeholder,
    value,
    disabled,
    error,
    name,
    autocomplete,
  }) => {
    return html`<mi-search-box
      variant=${variant}
      placeholder=${placeholder || nothing}
      value=${value || nothing}
      ?disabled=${disabled}
      error=${error || nothing}
      name=${name}
      autocomplete=${autocomplete || nothing}
    ></mi-search-box>`;
  },
};

export const WithLabel: Story = {
  render: ({
    variant,
    placeholder,
    value,
    disabled,
    error,
    name,
    autocomplete,
  }) => {
    return html`
      <div>
        <mi-label-unit
          text="検索キーワード"
          style="margin-block-end: var(--spacing-small, 8px);"
        ></mi-label-unit>
        <mi-search-box
          variant=${variant}
          placeholder=${placeholder || nothing}
          value=${value || nothing}
          ?disabled=${disabled}
          error=${error || nothing}
          name=${name}
          autocomplete=${autocomplete || nothing}
        ></mi-search-box>
      </div>
    `;
  },
};
