import "yakuhanjp/dist/css/yakuhanjp_s.css";

import type { Preview } from "@storybook/web-components-vite";
import htmlPlugin from "prettier/plugins/html";
import prettier from "prettier/standalone";

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
    docs: {
      source: {
        transform: async (src: string) => {
          return prettier.format(src, {
            parser: "html",
            plugins: [htmlPlugin],
            htmlWhitespaceSensitivity: "ignore",
          });
        },
      },
    },
  },
  tags: ["autodocs", "dev-only"],
};

export default preview;
