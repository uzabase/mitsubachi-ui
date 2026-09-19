import "yakuhanjp/dist/css/yakuhanjp_s.css";

import type { Preview } from "@storybook/web-components-vite";
import prettier from "prettier/standalone";
import htmlPlugin from "prettier/plugins/html";

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
          if (!src.trimStart().startsWith("<")) {
            return src;
          }

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
