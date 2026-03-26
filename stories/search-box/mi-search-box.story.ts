import "../../src/components/label-unit";
import "../../src/components/search-box/mi-search-box";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import type { MiSearchBox } from "../../src/components/search-box/mi-search-box";

const meta = {
  component: "mi-search-box",
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "見た目のバリアント",
    },
    placeholder: { type: "string", description: "プレースホルダーテキスト" },
    disabled: { type: "boolean", description: "無効化状態" },
    value: { type: "string" },
    name: { type: "string" },
    autocomplete: { type: "string" },
    inputId: { type: "string" },
  },
  args: {
    placeholder: "Placeholder",
    variant: "primary",
    disabled: false,
    value: "",
    name: "",
    autocomplete: "off",
    inputId: "",
  },
  decorators: [(story) => html`<div style="width: 256px;">${story()}</div>`],
  tags: ["!dev-only"],
} satisfies Meta<MiSearchBox>;

export default meta;
type Story = StoryObj<MiSearchBox>;

/** デフォルト状態（primary, desktop） */
export const Default: Story = {
  render: ({
    placeholder,
    variant,
    disabled,
    value,
    name,
    autocomplete,
    inputId,
  }) => html`
    <mi-search-box
      placeholder=${placeholder || nothing}
      variant=${variant}
      ?disabled=${disabled}
      value=${value}
      name=${name || nothing}
      autocomplete=${autocomplete}
      input-id=${inputId || nothing}
    ></mi-search-box>
  `,
};

/** テキスト入力済みの状態 */
export const WithText: Story = {
  args: {
    value: "Text",
    variant: "primary",
  },
  render: ({
    placeholder,
    variant,
    disabled,
    value,
    name,
    autocomplete,
    inputId,
  }) => html`
    <mi-search-box
      placeholder=${placeholder || nothing}
      variant=${variant}
      ?disabled=${disabled}
      value=${value}
      name=${name || nothing}
      autocomplete=${autocomplete}
      input-id=${inputId || nothing}
    ></mi-search-box>
  `,
};

/** Secondary: デフォルト状態 */
export const Secondary: Story = {
  args: {
    placeholder: "Placeholder",
    variant: "secondary",
  },
  render: ({
    placeholder,
    variant,
    disabled,
    value,
    name,
    autocomplete,
    inputId,
  }) => html`
    <mi-search-box
      placeholder=${placeholder || nothing}
      variant=${variant}
      ?disabled=${disabled}
      value=${value}
      name=${name || nothing}
      autocomplete=${autocomplete}
      input-id=${inputId || nothing}
    ></mi-search-box>
  `,
};

/** Secondary: テキスト入力済み */
export const SecondaryWithText: Story = {
  args: {
    value: "Text",
    variant: "secondary",
  },
  render: ({
    placeholder,
    variant,
    disabled,
    value,
    name,
    autocomplete,
    inputId,
  }) => html`
    <mi-search-box
      placeholder=${placeholder || nothing}
      variant=${variant}
      ?disabled=${disabled}
      value=${value}
      name=${name || nothing}
      autocomplete=${autocomplete}
      input-id=${inputId || nothing}
    ></mi-search-box>
  `,
};

/** Primary: Disabled状態 */
export const PrimaryDisabled: Story = {
  args: {
    placeholder: "Placeholder",
    variant: "primary",
    disabled: true,
  },
  render: ({
    placeholder,
    variant,
    disabled,
    value,
    name,
    autocomplete,
    inputId,
  }) => html`
    <mi-search-box
      placeholder=${placeholder || nothing}
      variant=${variant}
      ?disabled=${disabled}
      value=${value}
      name=${name || nothing}
      autocomplete=${autocomplete}
      input-id=${inputId || nothing}
    ></mi-search-box>
  `,
};

/** Primary: Disabled（テキスト入力済み） */
export const PrimaryDisabledWithText: Story = {
  args: {
    value: "Text",
    variant: "primary",
    disabled: true,
  },
  render: ({
    placeholder,
    variant,
    disabled,
    value,
    name,
    autocomplete,
    inputId,
  }) => html`
    <mi-search-box
      placeholder=${placeholder || nothing}
      variant=${variant}
      ?disabled=${disabled}
      value=${value}
      name=${name || nothing}
      autocomplete=${autocomplete}
      input-id=${inputId || nothing}
    ></mi-search-box>
  `,
};

/** Secondary: Disabled状態 */
export const SecondaryDisabled: Story = {
  args: {
    placeholder: "Placeholder",
    variant: "secondary",
    disabled: true,
  },
  render: ({
    placeholder,
    variant,
    disabled,
    value,
    name,
    autocomplete,
    inputId,
  }) => html`
    <mi-search-box
      placeholder=${placeholder || nothing}
      variant=${variant}
      ?disabled=${disabled}
      value=${value}
      name=${name || nothing}
      autocomplete=${autocomplete}
      input-id=${inputId || nothing}
    ></mi-search-box>
  `,
};

/**
 * `input` / `change` / `clear` を Actions に記録します。
 * - `change` はフィールドからフォーカスが外れたとき（値の確定時）に発火します。
 */
export const Events: Story = {
  render: () => html`
    <mi-search-box
      placeholder="入力・blur・クリアで確認"
      @input=${action("input")}
      @change=${action("change")}
      @clear=${action("clear")}
    ></mi-search-box>
  `,
};

/**
 * フォーム送信時に `submit` と `FormData` を Actions に記録します（`preventDefault` 済み）。
 */
export const FormSubmit: Story = {
  decorators: [
    (story) => html`<div style="width: min(100%, 320px);">${story()}</div>`,
  ],
  render: () => html`
    <form
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data: Record<string, string> = {};
        new FormData(form).forEach((value, key) => {
          data[key] = typeof value === "string" ? value : value.name;
        });
        action("submit")(data);
      }}
    >
      <mi-search-box name="q" placeholder="キーワード"></mi-search-box>
      <button
        type="submit"
        style="margin-top: var(--spacing-medium, 8px); width: 100%; padding: 8px;"
      >
        検索（Enter でも送信）
      </button>
    </form>
  `,
};

/** LabelUnit と併用（input-id でラベルと紐づけ可能） */
export const WithLabel: Story = {
  decorators: [
    () => html`
      <div
        style="display:flex;flex-direction:column;gap:var(--spacing-medium, 8px);width:256px;"
      >
        <mi-label-unit text="競合企業"></mi-label-unit>
        <mi-search-box
          input-id="search-competitor"
          placeholder="企業を検索"
          variant="secondary"
        ></mi-search-box>
      </div>
    `,
  ],
  render: () => html``,
};

/** 全状態一覧（Primary / Secondary 比較） */
export const AllStates: Story = {
  decorators: [
    () => html`
      <div
        style="display:grid;grid-template-columns:auto 256px 256px;gap:24px 16px;align-items:start;padding:40px;"
      >
        <div></div>
        <p style="color:#666;font-size:12px;margin:0;font-weight:bold;">
          Primary
        </p>
        <p style="color:#666;font-size:12px;margin:0;font-weight:bold;">
          Secondary
        </p>

        <p style="color:#666;font-size:12px;margin:0;white-space:nowrap;">
          Default
        </p>
        <mi-search-box
          placeholder="Placeholder"
          variant="primary"
        ></mi-search-box>
        <mi-search-box
          placeholder="Placeholder"
          variant="secondary"
        ></mi-search-box>

        <p style="color:#666;font-size:12px;margin:0;white-space:nowrap;">
          With Text
        </p>
        <mi-search-box value="Text" variant="primary"></mi-search-box>
        <mi-search-box value="Text" variant="secondary"></mi-search-box>

        <p style="color:#666;font-size:12px;margin:0;white-space:nowrap;">
          Disabled
        </p>
        <mi-search-box
          placeholder="Placeholder"
          variant="primary"
          disabled
        ></mi-search-box>
        <mi-search-box
          placeholder="Placeholder"
          variant="secondary"
          disabled
        ></mi-search-box>

        <p style="color:#666;font-size:12px;margin:0;white-space:nowrap;">
          Disabled + Text
        </p>
        <mi-search-box value="Text" variant="primary" disabled></mi-search-box>
        <mi-search-box
          value="Text"
          variant="secondary"
          disabled
        ></mi-search-box>
      </div>
    `,
  ],
  parameters: {
    layout: "fullscreen",
  },
  render: () => html``,
};
