import "../../src/components/icon/error-fill";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpIconErrorFill } from "../../src/components/icon/error-fill";

const meta: Meta<SpIconErrorFill> = {};
export default meta;

export const Default: StoryObj<SpIconErrorFill> = {
  render: () => {
    return html`<sp-icon-error-fill></sp-icon-error-fill>`;
  },
};
