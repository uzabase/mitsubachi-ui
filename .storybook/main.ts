import type { StorybookConfig } from "@storybook/web-components-vite";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.story.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  tags: {
    "dev-only": { excludeFromSidebar: isProduction },
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
      };
    }

    const repo = process.env.REPOSITORY_NAME;
    const basePath = process.env.STORYBOOK_BASE_PATH;
    const base = basePath ? `/${repo}/${basePath}/` : `/${repo}/`;

    return mergeConfig(config, {
      base,
    });
  },
};
export default config;
