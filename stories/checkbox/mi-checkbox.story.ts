import "../../src/components/checkbox/mi-checkbox";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import { type MiCheckbox } from "../../src/components/checkbox/mi-checkbox";

const meta = {
  component: "mi-checkbox",
  argTypes: {
    value: { type: "string" },
    name: { type: "string" },
    checked: { type: "boolean" },
    indeterminate: { type: "boolean" },
    disabled: { type: "boolean" },
    onchange: {
      action: "onchange",
    },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    onchange: action("onchange"),
  },
  tags: ["!dev-only"],
} satisfies Meta<MiCheckbox>;

export default meta;
type Story = StoryObj<MiCheckbox>;

export const Basic: Story = {
  args: {
    checked: undefined,
    indeterminate: undefined,
    disabled: undefined,
  },
};

export const Property: Story = {
  args: {
    value: "mi-checkbox-value",
    name: "mi-checkbox-name",
  },
};

export const Attribute: Story = {
  args: {
    value: "mi-checkbox-value",
    name: "mi-checkbox-name",
  },
  render: (args) =>
    html`<mi-checkbox
      value=${args.value}
      name=${args.name}
      checked=${args.checked}
      indeterminate=${args.indeterminate}
      disabled=${args.disabled}
      @change=${args.onchange}
    ></mi-checkbox>`,
};

export const AttributeHTML: Story = {
  args: {
    value: "mi-checkbox-value",
    name: "mi-checkbox-name",
  },
  render: (args) =>
    html`<mi-checkbox
      value=${args.value}
      name=${args.name}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @change=${args.onchange}
    ></mi-checkbox>`,
};

export const Form: Story = {
  args: {
    value: "mi-checkbox-value",
    name: "mi-checkbox-name",
  },
  render: (args) => html`
    <form>
      <input type="checkbox" name=${args.name} value="primitive1" />
      <input type="checkbox" name=${args.name} value="primitive2" />
      <mi-checkbox
        .value=${args.value}
        .name=${args.name}
        .checked=${args.checked}
        .indeterminate=${args.indeterminate}
        .disabled=${args.disabled}
        @change=${args.onchange}
      ></mi-checkbox>
      <input type="reset" />
      <input type="submit" />
    </form>
  `,
};

export const ALL: Story = {
  render: () => html`
    <table>
      <thead>
        <tr>
          <td></td>
          <th>default</th>
          <th>checked</th>
          <th>indeterminate</th>
          <th>checked && indeterminate</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>default</td>
          <td><mi-checkbox></mi-checkbox></td>
          <td><mi-checkbox checked></mi-checkbox></td>
          <td><mi-checkbox indeterminate></mi-checkbox></td>
          <td><mi-checkbox checked indeterminate></mi-checkbox></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td><mi-checkbox disabled></mi-checkbox></td>
          <td><mi-checkbox checked disabled></mi-checkbox></td>
          <td><mi-checkbox indeterminate disabled></mi-checkbox></td>
          <td><mi-checkbox checked indeterminate disabled></mi-checkbox></td>
        </tr>
      </tbody>
    </table>
  `,
};
