import * as path from "path";
import { defineConfig } from "vitest/config";


export default defineConfig({
  test: {
    browser: {
      provider: "playwright",
      enabled: true,
      headless: true,
      instances: [
        {
          browser: "chromium",
        },
      ],
    },
  },
    resolve: {
    alias: {
      '@':  path.resolve(__dirname, './src'),
    },
  }
});