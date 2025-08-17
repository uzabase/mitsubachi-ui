import "../../src/components/logo/sp-logo-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpLogoLit } from "../../src/components/logo/sp-logo-lit";

const brands = ["uzabase", "speeda"] as const;
const languages = ["ja", "en", "zh"] as const;

const meta = {
  component: "sp-logo-lit",
  argTypes: {
    brand: {
      control: { type: "select" },
      options: brands,
    },
    language: {
      control: { type: "select" },
      options: languages,
    },
  },
  args: {
    brand: "uzabase",
    language: "ja",
  },
  render: (args) => html`
    <sp-logo-lit brand=${args.brand} language=${args.language}></sp-logo-lit>
  `,
} satisfies Meta<Partial<SpLogoLit>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Uzabase: Story = {
  args: {
    brand: "uzabase",
  },
};

export const SpeedaJa: Story = {
  args: {
    brand: "speeda",
    language: "ja",
  },
};

export const SpeedaEn: Story = {
  args: {
    brand: "speeda",
    language: "en",
  },
};

export const SpeedaZh: Story = {
  args: {
    brand: "speeda",
    language: "zh",
  },
};

export const AllLogos: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <h3>Uzabase</h3>
        <sp-logo-lit brand="uzabase"></sp-logo-lit>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        <h3>Speeda</h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <h4>Japanese</h4>
            <sp-logo-lit brand="speeda" language="ja"></sp-logo-lit>
          </div>
          <div>
            <h4>English</h4>
            <sp-logo-lit brand="speeda" language="en"></sp-logo-lit>
          </div>
          <div>
            <h4>Chinese</h4>
            <sp-logo-lit brand="speeda" language="zh"></sp-logo-lit>
          </div>
        </div>
      </div>
    </div>
  `,
};
