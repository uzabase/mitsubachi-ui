import "../../src/components/logo";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpSpeedaLogo } from "../../src/components/logo";

const meta = {
  component: "sp-speeda-logo",
  args: {
    type: null,
    inverse: false,
    noSymbol: false,
    logoLanguage: "en",
  },
  argTypes: {
    type: {
      options: [
        null,
        "ai-agent",
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
    logoLanguage: {
      options: ["en", "zh"],
      control: { type: "select" },
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<SpSpeedaLogo>;

export default meta;
type Story = StoryObj<SpSpeedaLogo>;

export const Default: Story = {
  render: ({ type, inverse, noSymbol, logoLanguage }) => {
    return html`<sp-speeda-logo
      type=${type}
      ?inverse=${inverse}
      ?no-symbol=${noSymbol}
      logo-language=${logoLanguage}
    ></sp-speeda-logo>`;
  },
};

const allPropsCombinations = [
  { type: null, inverse: false, noSymbol: true, logoLanguage: "en" },
  { type: null, inverse: false, noSymbol: false, logoLanguage: "en" },
  { type: null, inverse: false, noSymbol: true, logoLanguage: "zh" },
  { type: "ai-agent", inverse: false, noSymbol: false, logoLanguage: "en" },
  { type: "expert-research", inverse: false, noSymbol: false, logoLanguage: "en" },
  { type: null, inverse: true, noSymbol: true, logoLanguage: "en" },
  { type: null, inverse: true, noSymbol: false, logoLanguage: "en" },
  { type: null, inverse: true, noSymbol: true, logoLanguage: "zh" },
  { type: "ai-agent", inverse: true, noSymbol: false, logoLanguage: "en" },
  { type: "expert-research", inverse: true, noSymbol: false, logoLanguage: "en" },
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
          logo-language=${logo.logoLanguage}
        ></sp-speeda-logo>
      </td>
      <td style="${cellStyle} border-color: ${borderColor};">${logo.type}</td>
      <td style="${cellStyle} border-color: ${borderColor};">
        ${String(logo.inverse)}
      </td>
      <td style="${cellStyle} border-color: ${borderColor};">
        ${String(logo.noSymbol)}
      </td>
      <td style="${cellStyle} border-color: ${borderColor};">
        ${logo.logoLanguage}
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
              <th style="${headerStyle}">logo-language</th>
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
