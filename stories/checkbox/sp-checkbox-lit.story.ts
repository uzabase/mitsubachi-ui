import "../../src/components/checkbox/sp-checkbox-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import { type SpCheckboxLit } from "../../src/components/checkbox/sp-checkbox-lit";

const meta = {
  component: "sp-checkbox-lit",
  argTypes: {
    slot: { type: "string" },
    checked: { type: "boolean" },
    indeterminate: { type: "boolean" },
    disabled: { type: "boolean" },
    value: { type: "string" },
    name: { type: "string" },
    onchange: {
      action: "change",
    },
    oninput: {
      action: "input",
    },
  },
  args: {
    slot: "チェックボックス",
    checked: false,
    indeterminate: false,
    disabled: false,
    value: "checkbox-value",
    name: "checkbox-name",
    onchange: action("change"),
    oninput: action("input"),
  },
  render: (args) => html`
    <sp-checkbox-lit
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      value=${args.value}
      name=${args.name}
      @change=${args.onchange}
      @input=${args.oninput}
    >
      ${args.slot}
    </sp-checkbox-lit>
  `,
} satisfies Meta<
  Partial<SpCheckboxLit> & {
    slot: string;
    onchange: () => void;
    oninput: () => void;
  }
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    slot: "",
  },
};

export const LongLabel: Story = {
  args: {
    slot: "これは非常に長いラベルテキストの例です。長いテキストがチェックボックスと一緒にどのように表示されるかを確認できます。",
  },
};

export const MultipleCheckboxes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <sp-checkbox-lit value="option1">オプション 1</sp-checkbox-lit>
      <sp-checkbox-lit value="option2" checked
        >オプション 2（チェック済み）</sp-checkbox-lit
      >
      <sp-checkbox-lit value="option3" indeterminate
        >オプション 3（部分選択）</sp-checkbox-lit
      >
      <sp-checkbox-lit value="option4" disabled
        >オプション 4（無効）</sp-checkbox-lit
      >
      <sp-checkbox-lit value="option5" checked disabled
        >オプション 5（チェック済み・無効）</sp-checkbox-lit
      >
    </div>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form
      style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;"
    >
      <fieldset
        style="border: 1px solid #ccc; padding: 16px; border-radius: 4px;"
      >
        <legend>趣味を選択してください</legend>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <sp-checkbox-lit name="hobbies" value="reading">読書</sp-checkbox-lit>
          <sp-checkbox-lit name="hobbies" value="music">音楽</sp-checkbox-lit>
          <sp-checkbox-lit name="hobbies" value="sports"
            >スポーツ</sp-checkbox-lit
          >
          <sp-checkbox-lit name="hobbies" value="cooking">料理</sp-checkbox-lit>
          <sp-checkbox-lit name="hobbies" value="travel">旅行</sp-checkbox-lit>
        </div>
      </fieldset>

      <fieldset
        style="border: 1px solid #ccc; padding: 16px; border-radius: 4px;"
      >
        <legend>利用規約</legend>
        <sp-checkbox-lit name="terms" value="accepted">
          利用規約に同意します
        </sp-checkbox-lit>
      </fieldset>
    </form>
  `,
};
