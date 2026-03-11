import "../../src/components/logo";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type MiLogo } from "../../src/components/logo";

const meta = {
  component: "mi-logo",
  args: {
    language: "en",
    brand: "uzabase",
  },
  argTypes: {
    language: {
      options: ["en", "zh"],
      control: { type: "select" },
    },
    brand: {
      options: ["uzabase", "speeda"],
      control: { type: "select" },
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<MiLogo>;

export default meta;
type Story = StoryObj<MiLogo>;

export const Default: Story = {
  render: ({ language, brand }) => {
    return html`<mi-logo
      style="height: 32px; display: flex;"
      language=${language}
      brand=${brand}
    ></mi-logo>`;
  },
};

export const All: Story = {
  render: () => {
    const cellStyle = `
      padding: 12px 16px;
      font-size: 13px;
      font-family: monospace;
      border-bottom: 1px solid #e0e0e0;
      vertical-align: middle;
    `;
    const headerStyle = `
      ${cellStyle}
      font-weight: bold;
      background: #f5f5f5;
      font-family: sans-serif;
    `;

    return html`
      <div
        style="
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
        "
      >
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th style="${headerStyle}">logo</th>
              <th style="${headerStyle}">brand</th>
              <th style="${headerStyle}">language</th>
            </tr>
          </thead>
          <tbody>
            <tr style="height: 4rem;">
              <td style="${cellStyle}">
                <mi-logo brand="uzabase"></mi-logo>
              </td>
              <td style="${cellStyle}">uzabase</td>
              <td style="${cellStyle}">-</td>
            </tr>
            <tr style="height: 4rem;">
              <td style="${cellStyle}">
                <mi-logo brand="speeda" language="en"></mi-logo>
              </td>
              <td style="${cellStyle}">speeda</td>
              <td style="${cellStyle}">en</td>
            </tr>
            <tr style="height: 4rem;">
              <td style="${cellStyle}">
                <mi-logo brand="speeda" language="zh"></mi-logo>
              </td>
              <td style="${cellStyle}">speeda</td>
              <td style="${cellStyle}">zh</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  },
};
