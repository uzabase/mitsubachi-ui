import "../../src/components/logo";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpLogo } from "../../src/components/logo";

const meta = {
  component: "sp-logo",
  args: {
    language: "en",
    brand: "uzabase",
    subBrand: "null",
    inverse: false,
    symbol: true,
  },
  argTypes: {
    language: {
      options: ["ja", "en", "zh"],
      control: { type: "select" },
    },
    brand: {
      options: ["uzabase", "speeda"],
      control: { type: "select" },
    },
    subBrand: {
      options: [
        "null",
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
    symbol: {
      control: { type: "boolean" },
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<SpLogo>;

export default meta;
type Story = StoryObj<SpLogo>;

export const Default: Story = {
  render: ({ language, brand, subBrand, inverse, symbol }) => {
    return html`<sp-logo
      language=${language}
      brand=${brand}
      sub-brand=${subBrand}
      ?inverse=${inverse}
      ?symbol=${symbol}
    ></sp-logo>`;
  },
};

const allPropsCombinations = [
  {
    brand: "speeda",
    subBrand: "ai-agent",
    language: "en",
    inverse: false,
    symbol: true,
  },
  {
    brand: "uzabase",
    subBrand: "null",
    language: "en",
    inverse: false,
    symbol: true,
  },
  {
    brand: "speeda",
    subBrand: "null",
    language: "zh",
    inverse: false,
    symbol: false,
  },
  {
    brand: "speeda",
    subBrand: "null",
    language: "en",
    inverse: false,
    symbol: false,
  },
  {
    brand: "speeda",
    subBrand: "null",
    language: "en",
    inverse: false,
    symbol: true,
  },
  {
    brand: "speeda",
    subBrand: "sales-insights",
    language: "ja",
    inverse: false,
    symbol: true,
  },
  {
    brand: "speeda",
    subBrand: "customer-analytics",
    language: "ja",
    inverse: false,
    symbol: true,
  },
  {
    brand: "speeda",
    subBrand: "innovation-insights",
    language: "ja",
    inverse: false,
    symbol: true,
  },
  {
    brand: "speeda",
    subBrand: "startup-insights",
    language: "ja",
    inverse: false,
    symbol: true,
  },
  {
    brand: "speeda",
    subBrand: "expert-research",
    language: "ja",
    inverse: false,
    symbol: true,
  },
  // inverse: true
  {
    brand: "speeda",
    subBrand: "ai-agent",
    language: "en",
    inverse: true,
    symbol: true,
  },
  {
    brand: "uzabase",
    subBrand: "null",
    language: "en",
    inverse: true,
    symbol: true,
  },
  {
    brand: "speeda",
    subBrand: "null",
    language: "zh",
    inverse: true,
    symbol: false,
  },
  {
    brand: "speeda",
    subBrand: "null",
    language: "en",
    inverse: true,
    symbol: false,
  },
  {
    brand: "speeda",
    subBrand: "null",
    language: "en",
    inverse: true,
    symbol: true,
  },
  {
    brand: "speeda",
    subBrand: "sales-insights",
    language: "ja",
    inverse: true,
    symbol: true,
  },
  {
    brand: "speeda",
    subBrand: "customer-analytics",
    language: "ja",
    inverse: true,
    symbol: true,
  },
  {
    brand: "speeda",
    subBrand: "innovation-insights",
    language: "ja",
    inverse: true,
    symbol: true,
  },
  {
    brand: "speeda",
    subBrand: "startup-insights",
    language: "ja",
    inverse: true,
    symbol: true,
  },
  {
    brand: "speeda",
    subBrand: "expert-research",
    language: "ja",
    inverse: true,
    symbol: true,
  },
];

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
        <sp-logo
          language=${logo.language}
          brand=${logo.brand}
          sub-brand=${logo.subBrand}
          ?inverse=${logo.inverse}
          ?symbol=${logo.symbol}
        ></sp-logo>
      </td>
      <td style="${cellStyle} border-color: ${borderColor};">${logo.brand}</td>
      <td style="${cellStyle} border-color: ${borderColor};">
        ${logo.subBrand === "null" ? "-" : logo.subBrand}
      </td>
      <td style="${cellStyle} border-color: ${borderColor};">
        ${logo.language}
      </td>
      <td style="${cellStyle} border-color: ${borderColor};">
        ${String(logo.inverse)}
      </td>
      <td style="${cellStyle} border-color: ${borderColor};">
        ${String(logo.symbol)}
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
              <th style="${headerStyle}">Logo</th>
              <th style="${headerStyle}">brand</th>
              <th style="${headerStyle}">sub-brand</th>
              <th style="${headerStyle}">language</th>
              <th style="${headerStyle}">inverse</th>
              <th style="${headerStyle}">symbol</th>
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
