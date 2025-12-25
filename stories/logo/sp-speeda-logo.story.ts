import "../../src/components/logo";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpSpeedaLogo } from "../../src/components/logo";

const meta = {
  component: "sp-speeda-logo",
  args: {
    type: "speeda",
    inverse: false,
    noSymbol: false,
  },
  argTypes: {
    type: {
      options: [
        "speeda",
        "shibida",
        "ai-agent",
        "sales-insights",
        "customer-analytics",
        "startup-insights",
        "innovation-insights",
        "expert-research",
      ],
      control: { type: "select" },
    },
    inverse: {
      control: { type: "boolean" },
    },
    noSymbol: {
      control: { type: "boolean" },
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<SpSpeedaLogo>;

export default meta;
type Story = StoryObj<SpSpeedaLogo>;

export const Default: Story = {
  render: ({ type, inverse, noSymbol }) => {
    return html`<sp-speeda-logo
      type=${type}
      ?inverse=${inverse}
      ?no-symbol=${noSymbol}
    ></sp-speeda-logo>`;
  },
};

const allPropsCombinations = [
  { type: "speeda", inverse: false, noSymbol: true },
  { type: "speeda", inverse: false, noSymbol: false },
  { type: "shibida", inverse: false, noSymbol: true },
  { type: "ai-agent", inverse: false, noSymbol: false },
  { type: "expert-research", inverse: false, noSymbol: false },
  { type: "startup-insights", inverse: false, noSymbol: false },
  { type: "innovation-insights", inverse: false, noSymbol: false },
  { type: "customer-analytics", inverse: false, noSymbol: false },
  { type: "sales-insights", inverse: false, noSymbol: false },
  { type: "speeda", inverse: true, noSymbol: true },
  { type: "speeda", inverse: true, noSymbol: false },
  { type: "shibida", inverse: true, noSymbol: true },
  { type: "ai-agent", inverse: true, noSymbol: false },
  { type: "expert-research", inverse: true, noSymbol: false },
  { type: "startup-insights", inverse: true, noSymbol: false },
  { type: "innovation-insights", inverse: true, noSymbol: false },
  { type: "customer-analytics", inverse: true, noSymbol: false },
  { type: "sales-insights", inverse: true, noSymbol: false },
] as const;

const inverseFalseLogos = allPropsCombinations.filter((l) => !l.inverse);
const inverseTrueLogos = allPropsCombinations.filter((l) => l.inverse);

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

const renderTableRow = (logo: (typeof allPropsCombinations)[number]) => {
  const bgColor = logo.inverse ? "#333" : "#fff";
  const textColor = logo.inverse ? "#fff" : "#333";
  const borderColor = logo.inverse ? "#555" : "#e0e0e0";

  return html`
    <tr style="background: ${bgColor}; color: ${textColor}; height: 4rem;">
      <td style="${cellStyle} border-color: ${borderColor}; min-width: 280px;">
        <sp-speeda-logo
          type=${logo.type}
          ?inverse=${logo.inverse}
          ?no-symbol=${logo.noSymbol}
        ></sp-speeda-logo>
      </td>
      <td style="${cellStyle} border-color: ${borderColor};">${logo.type}</td>
      <td style="${cellStyle} border-color: ${borderColor};">
        ${String(logo.inverse)}
      </td>
      <td style="${cellStyle} border-color: ${borderColor};">
        ${String(logo.noSymbol)}
      </td>
    </tr>
  `;
};

export const All: Story = {
  render: () => {
    return html`
      <div
        style="
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
        "
      >
        <table
          style="
            border-collapse: collapse;
            width: 100%;
          "
        >
          <thead>
            <tr>
              <th style="${headerStyle}">logo</th>
              <th style="${headerStyle}">type</th>
              <th style="${headerStyle}">inverse</th>
              <th style="${headerStyle}">no-symbol</th>
            </tr>
          </thead>
          <tbody>
            ${inverseFalseLogos.map((logo) => renderTableRow(logo))}
            ${inverseTrueLogos.map((logo) => renderTableRow(logo))}
          </tbody>
        </table>
      </div>
    `;
  },
};
