import "yakuhanjp/dist/css/yakuhanjp_s.css";

import type { Preview } from "@storybook/web-components";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs", "dev-only"],
};

export default preview;
