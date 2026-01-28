import "../../src/components/checkbox/mi-checkbox-text";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiCheckboxText } from "../../src/components/checkbox/mi-checkbox-text";

const meta: Meta = {
  component: "mi-checkbox-text",
  argTypes: {
    text: { type: "string" },
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
    text: "あいう（えお）じゃ「がげ」があう。mi-checkbox-text-text",
    checked: false,
    indeterminate: false,
    disabled: false,
    onchange: action("onchange"),
  },
  tags: ["!dev-only"],
} satisfies Meta<MiCheckboxText>;

export default meta;
type Story = StoryObj<MiCheckboxText>;

export const Basic: Story = {
  args: {
    checked: undefined,
    indeterminate: undefined,
    disabled: undefined,
  },
};

export const Property: Story = {
  args: {
    value: "mi-checkbox-text-value",
    name: "mi-checkbox-text-name",
  },
};

export const Attribute: Story = {
  args: {
    value: "mi-checkbox-text-value",
    name: "mi-checkbox-text-name",
  },
  render: (args) =>
    html`<mi-checkbox-text
      text=${args.text}
      value=${args.value}
      name=${args.name}
      checked=${args.checked}
      indeterminate=${args.indeterminate}
      disabled=${args.disabled}
      @change=${args.onchange}
    ></mi-checkbox-text>`,
};

export const AttributeHTML: Story = {
  args: {
    value: "mi-checkbox-text-value",
    name: "mi-checkbox-text-name",
  },
  render: (args) =>
    html`<mi-checkbox-text
      text=${args.text}
      value=${args.value}
      name=${args.name}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @change=${args.onchange}
    ></mi-checkbox-text>`,
};

export const Form: Story = {
  args: {
    value: "mi-checkbox-text-value",
    name: "mi-checkbox-text-name",
  },
  render: (args) => html`
    <form>
      <input type="checkbox" name=${args.name} value="primitive1" />
      <input type="checkbox" name=${args.name} value="primitive2" />
      <mi-checkbox-text
        .text=${args.text}
        .value=${args.value}
        .name=${args.name}
        .checked=${args.checked}
        .indeterminate=${args.indeterminate}
        .disabled=${args.disabled}
        @change=${args.onchange}
      ></mi-checkbox-text>
      <input type="reset" />
      <input type="submit" />
    </form>
  `,
};

export const OverflowWrap: Story = {
  render: () => html`
    <mi-checkbox-text
      text="texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext"
    ></mi-checkbox-text>
    <mi-checkbox-text
      text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ></mi-checkbox-text>
    <mi-checkbox-text
      text="にほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんご"
    ></mi-checkbox-text>
    <div style="display: flex;">
      <div>サンプルdiv</div>
      <mi-checkbox-text
        text="texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext"
      ></mi-checkbox-text>
    </div>
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
          <td>
            <mi-checkbox-text text="text"></mi-checkbox-text>
          </td>
          <td>
            <mi-checkbox-text text="text" checked></mi-checkbox-text>
          </td>
          <td>
            <mi-checkbox-text text="text" indeterminate></mi-checkbox-text>
          </td>
          <td>
            <mi-checkbox-text
              text="text"
              checked
              indeterminate
            ></mi-checkbox-text>
          </td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>
            <mi-checkbox-text text="text" disabled></mi-checkbox-text>
          </td>
          <td>
            <mi-checkbox-text text="text" checked disabled></mi-checkbox-text>
          </td>
          <td>
            <mi-checkbox-text
              text="text"
              indeterminate
              disabled
            ></mi-checkbox-text>
          </td>
          <td>
            <mi-checkbox-text
              text="text"
              checked
              indeterminate
              disabled
            ></mi-checkbox-text>
          </td>
        </tr>
      </tbody>
    </table>
  `,
};
