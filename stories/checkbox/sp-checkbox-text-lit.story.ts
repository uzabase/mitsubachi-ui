import "../../src/components/checkbox/sp-checkbox-text-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { SpCheckboxTextLit } from "../../src/components/checkbox/sp-checkbox-text-lit";

const meta: Meta = {
  component: "sp-checkbox-text-lit",
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
    text: "あいう（えお）じゃ「がげ」があう。sp-checkbox-text-text",
    checked: false,
    indeterminate: false,
    disabled: false,
    onchange: action("onchange"),
  },
  tags: ["!dev-only"],
} satisfies Meta<SpCheckboxTextLit>;

export default meta;
type Story = StoryObj<SpCheckboxTextLit>;

export const Basic: Story = {
  args: {
    checked: undefined,
    indeterminate: undefined,
    disabled: undefined,
  },
};

export const Property: Story = {
  args: {
    value: "sp-checkbox-text-value",
    name: "sp-checkbox-text-name",
  },
};

export const Attribute: Story = {
  args: {
    value: "sp-checkbox-text-value",
    name: "sp-checkbox-text-name",
  },
  render: (args) =>
    html`<sp-checkbox-text-lit
      text=${args.text}
      value=${args.value}
      name=${args.name}
      checked=${args.checked}
      indeterminate=${args.indeterminate}
      disabled=${args.disabled}
      @change=${args.onchange}
    ></sp-checkbox-text-lit>`,
};

export const AttributeHTML: Story = {
  args: {
    value: "sp-checkbox-text-value",
    name: "sp-checkbox-text-name",
  },
  render: (args) =>
    html`<sp-checkbox-text-lit
      text=${args.text}
      value=${args.value}
      name=${args.name}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @change=${args.onchange}
    ></sp-checkbox-text-lit>`,
};

export const Form: Story = {
  args: {
    value: "sp-checkbox-text-value",
    name: "sp-checkbox-text-name",
  },
  render: (args) => html`
    <form>
      <input type="checkbox" name=${args.name} value="primitive1" />
      <input type="checkbox" name=${args.name} value="primitive2" />
      <sp-checkbox-text-lit
        .text=${args.text}
        .value=${args.value}
        .name=${args.name}
        .checked=${args.checked}
        .indeterminate=${args.indeterminate}
        .disabled=${args.disabled}
        @change=${args.onchange}
      ></sp-checkbox-text-lit>
      <input type="reset" />
      <input type="submit" />
    </form>
  `,
};

export const OverflowWrap: Story = {
  render: () => html`
    <sp-checkbox-text-lit
      text="texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext"
    ></sp-checkbox-text-lit>
    <sp-checkbox-text-lit
      text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ></sp-checkbox-text-lit>
    <sp-checkbox-text-lit
      text="にほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんご"
    ></sp-checkbox-text-lit>
    <div style="display: flex;">
      <div>サンプルdiv</div>
      <sp-checkbox-text-lit
        text="texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext"
      ></sp-checkbox-text-lit>
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
            <sp-checkbox-text-lit text="text"></sp-checkbox-text-lit>
          </td>
          <td>
            <sp-checkbox-text-lit text="text" checked></sp-checkbox-text-lit>
          </td>
          <td>
            <sp-checkbox-text-lit
              text="text"
              indeterminate
            ></sp-checkbox-text-lit>
          </td>
          <td>
            <sp-checkbox-text-lit
              text="text"
              checked
              indeterminate
            ></sp-checkbox-text-lit>
          </td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>
            <sp-checkbox-text-lit text="text" disabled></sp-checkbox-text-lit>
          </td>
          <td>
            <sp-checkbox-text-lit
              text="text"
              checked
              disabled
            ></sp-checkbox-text-lit>
          </td>
          <td>
            <sp-checkbox-text-lit
              text="text"
              indeterminate
              disabled
            ></sp-checkbox-text-lit>
          </td>
          <td>
            <sp-checkbox-text-lit
              text="text"
              checked
              indeterminate
              disabled
            ></sp-checkbox-text-lit>
          </td>
        </tr>
      </tbody>
    </table>
  `,
};
