import "../../src/components/checkbox/sp-checkbox-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import { type SpCheckboxLit } from "../../src/components/checkbox/sp-checkbox-lit";

const meta = {
  component: "sp-checkbox-lit",
  argTypes: {
    value: { type: "string" },
    name: { type: "string" },
    checked: { type: "boolean" },
    indeterminate: { type: "boolean" },
    disabled: { type: "boolean" },
    onchange: {
      action: "change",
    },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    onchange: action("onchange"),
  },
  tags: ["!dev-only"],
} satisfies Meta<SpCheckboxLit>;

export default meta;
type Story = StoryObj<SpCheckboxLit>;

export const Basic: Story = {
  args: {
    checked: undefined,
    indeterminate: undefined,
    disabled: undefined,
  },
};

export const Property: Story = {
  args: {
    value: "sp-checkbox-value",
    name: "sp-checkbox-name",
  },
};

export const Attribute: Story = {
  args: {
    value: "sp-checkbox-value",
    name: "sp-checkbox-name",
  },
  render: (args) =>
    html`<sp-checkbox-lit
      value=${args.value}
      name=${args.name}
      checked=${args.checked}
      indeterminate=${args.indeterminate}
      disabled=${args.disabled}
      @change=${args.onchange}
    ></sp-checkbox-lit>`,
};

export const AttributeHTML: Story = {
  args: {
    value: "sp-checkbox-value",
    name: "sp-checkbox-name",
  },
  render: (args) =>
    html`<sp-checkbox-lit
      value=${args.value}
      name=${args.name}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @change=${args.onchange}
    ></sp-checkbox-lit>`,
};

export const Form: Story = {
  args: {
    value: "sp-checkbox-value",
    name: "sp-checkbox-name",
  },
  render: (args) => html`
    <form>
      <input type="checkbox" name=${args.name} value="primitive1" />
      <input type="checkbox" name=${args.name} value="primitive2" />
      <sp-checkbox-lit
        .value=${args.value}
        .name=${args.name}
        .checked=${args.checked}
        .indeterminate=${args.indeterminate}
        .disabled=${args.disabled}
        @change=${args.onchange}
      ></sp-checkbox-lit>
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
          <td><sp-checkbox-lit></sp-checkbox-lit></td>
          <td><sp-checkbox-lit checked></sp-checkbox-lit></td>
          <td><sp-checkbox-lit indeterminate></sp-checkbox-lit></td>
          <td><sp-checkbox-lit checked indeterminate></sp-checkbox-lit></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td><sp-checkbox-lit disabled></sp-checkbox-lit></td>
          <td><sp-checkbox-lit checked disabled></sp-checkbox-lit></td>
          <td><sp-checkbox-lit indeterminate disabled></sp-checkbox-lit></td>
          <td>
            <sp-checkbox-lit checked indeterminate disabled></sp-checkbox-lit>
          </td>
        </tr>
      </tbody>
    </table>
  `,
};
