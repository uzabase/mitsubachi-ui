import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import type { MiIconButton } from "../../src/components/button/mi-icon-button";
import {
  iconButtonSizes,
  iconButtonVariants,
} from "../../src/components/button/mi-icon-button";
import { iconTypes } from "../../src/components/icon/icons";
import { placements } from "../../src/components/tooltip/mi-tooltip";

const meta = {
  component: "mi-icon-button",
  title: "Button/mi-icon-button",
  parameters: {
    docs: {
      description: {
        component:
          "テキストを持たず、アイコンのみで操作を表現するコンパクトなボタンです。必ずツールチップで意味を補完してください。",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: iconButtonVariants,
    },
    size: {
      control: { type: "select" },
      options: iconButtonSizes,
    },
    iconType: {
      control: { type: "select" },
      options: iconTypes,
    },
    label: { name: "aria-label", type: "string" },
    tooltipPlacement: {
      control: { type: "select" },
      options: placements,
    },
    tooltipDisabled: { type: "boolean" },
    selected: { type: "boolean" },
    toggle: { type: "boolean" },
    loading: { type: "boolean" },
    disabled: { type: "boolean" },
    onclick: {
      action: "onclick",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    name: { type: "string" },
    value: { type: "string" },
  },
  args: {
    variant: "ghost",
    size: "medium",
    iconType: "search",
    label: "",
    tooltipPlacement: "top",
    tooltipDisabled: false,
    selected: false,
    toggle: false,
    loading: false,
    disabled: false,
    onclick: action("onclick"),
    name: undefined,
    value: undefined,
    type: "button",
  },
  render: (args) => html`
    <div style="padding: 40px; display: inline-block;">
      <mi-icon-button
        variant=${args.variant}
        size=${args.size}
        icon-type=${args.iconType}
        aria-label=${args.label || nothing}
        tooltip-placement=${args.tooltipPlacement || nothing}
        ?tooltip-disabled=${args.tooltipDisabled}
        ?selected=${args.selected}
        ?toggle=${args.toggle}
        ?loading=${args.loading}
        ?disabled=${args.disabled}
        @click=${args.onclick}
        name=${args.name || nothing}
        value=${args.value || nothing}
        type=${args.type || nothing}
      ></mi-icon-button>
    </div>
  `,
} satisfies Meta<MiIconButton>;

export default meta;
type Story = StoryObj<MiIconButton>;

export const Basic: Story = {
  args: {
    variant: "primary",
    size: "medium",
    label: "検索",
    loading: undefined,
    disabled: undefined,
    selected: undefined,
  },
  tags: ["!dev-only"],
};

export const WithTooltip: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 24px; padding: 60px; align-items: center; flex-wrap: wrap;"
    >
      ${placements.map(
        (placement) => html`
          <div
            style="display: flex; flex-direction: column; align-items: center; gap: 8px;"
          >
            <mi-icon-button
              variant="ghost"
              icon-type="search"
              aria-label="${placement}"
              tooltip-placement="${placement}"
            ></mi-icon-button>
            <span style="font-size: 11px; color: rgb(0 0 0 / 45%);"
              >${placement}</span
            >
          </div>
        `,
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "aria-label 属性を指定すると、ホバー・フォーカス時にツールチップが表示されます。tooltip-placement で表示位置を変更できます。",
      },
    },
  },
};

export const ALL: Story = {
  render: () => html`
    <div
      style="display:flex; flex-direction:column; gap:32px; align-items: flex-start;"
    >
      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">
          バリアント × 状態
        </caption>
        <thead>
          <tr>
            <th>状態</th>
            ${iconButtonVariants.map((v) => html`<th>${v}</th>`)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            ${iconButtonVariants.map(
              (v) =>
                html`<td>
                  <mi-icon-button
                    variant="${v}"
                    icon-type="search"
                  ></mi-icon-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>選択中</th>
            ${iconButtonVariants.map((v) =>
              v === "primary"
                ? html`<td>
                    <span style="font-size: 11px; color: rgb(0 0 0 / 45%);"
                      >なし<br />デフォルトスタイルが<br />適用されます</span
                    >
                  </td>`
                : html`<td>
                    <mi-icon-button
                      variant="${v}"
                      icon-type="search"
                      selected
                    ></mi-icon-button>
                  </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${iconButtonVariants.map(
              (v) =>
                html`<td>
                  <mi-icon-button
                    variant="${v}"
                    icon-type="search"
                    disabled
                  ></mi-icon-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${iconButtonVariants.map(
              (v) =>
                html`<td>
                  <mi-icon-button
                    variant="${v}"
                    icon-type="search"
                    loading
                  ></mi-icon-button>
                </td>`,
            )}
          </tr>
        </tbody>
      </table>

      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">
          バリアント × サイズ
        </caption>
        <thead>
          <tr>
            <th>サイズ</th>
            ${iconButtonVariants.map((v) => html`<th>${v}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${iconButtonSizes.map(
            (size) =>
              html`<tr>
                <th>${size}</th>
                ${iconButtonVariants.map(
                  (v) =>
                    html`<td>
                      <mi-icon-button
                        variant="${v}"
                        size="${size}"
                        icon-type="search"
                      ></mi-icon-button>
                    </td>`,
                )}
              </tr>`,
          )}
        </tbody>
      </table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "mi-icon-buttonコンポーネントの全パターンを一覧表示します。",
      },
    },
  },
};
