#!/usr/bin/env -S node --experimental-strip-types
// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { z } from "zod";
import { exec } from "node:child_process";
import * as util from "node:util";
import { readFile, mkdir } from "node:fs/promises";
import * as path from "node:path";
const __dirname = import.meta.dirname;
export async function main() {
    // 親ルートに置けない
    const baseDir = path.join(__dirname, "..", "..");
    await mkdir(path.join(baseDir, "tmp"));
    await util.promisify(exec)(`npx custom-elements-manifest analyze --outdir tmp --globs src/**/*`, {
        cwd: baseDir,
    });
    const manifestObject = JSON.parse((await readFile(path.join(baseDir, "tmp", "custom-elements.json"))).toString());
    console.log(manifestObject);
}
main().catch((error) => {
    console.log(error);
});
/*
const server = new McpServer({
  name: "mitsubachi-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});
server.tool(
  "mitsubachi-ui-web-components",
  "mitsubachi-uiのWeb componentタグの情報を提供します。",
  {},
  async () => {
    return {
      content: [
        { type: "text", text: "<sp-logo>はスピーダのロゴです。" },
        { type: "text", text: "<sp-button>はbuttonのWeb Componentです。" },
        {
          type: "text",
          text: "<sp-text-field-unit>はラベルのあるinputのWeb Componentです。",
        },
      ],
    };
  },
);

server.tool(
  "mitsubachi-ui-sp-logo",
  "スピーダのロゴのカスタムタグ<sp-logo>を生成します。",
  {
    language: z
      .enum(["jp", "en", "cn"])
      .describe(
        "番のスピーダのロゴにある言語を指定します。language=jpであれば日本語, language=enであれば英語, cnであれば簡体字です。",
      ),
  },
  async ({ language }) => {
    return {
      content: [
        { type: "text", text: `<sp-logo language=${language}></sp-logo>` },
      ],
    };
  },
);

server.tool(
  "mitsubachi-ui-sp-button",
  "<button>タグのカスタムタグ<sp-button>を生成します。",
  {
    size: z
      .enum(["medium", "large", "xLarge"])
      .describe("ボタンの大きさを定義します。"),
    name: z.string().describe("formタグで送信するエントリのnameを定義します。"),
    value: z
      .string()
      .describe("formタグで送信するエントリのvalueを定義します。"),
    content: z.string().describe("ボタンの文字列を指定します。"),
  },
  async ({ size, content, name, value }) => {
    return {
      content: [
        {
          type: "text",
          text: `<sp-button size=${size} ${name ? `name=${name}` : ""} ${value ? `value=${value}` : ""}>${content}</sp-button>`,
        },
      ],
    };
  },
);

server.tool(
  "mitsubachi-sp-text-field-unit",
  "inputタグを説明したテキストtext、textを補足するsupportText, inputタグからなるWeb Componentを生成します。",
  {
    text: z
      .string()
      .describe("inputタグを説明するテキストです。labelタグとおなじ役割です。"),
    supportText: z.string().describe("textを補足するテキストです。"),
    name: z.string().describe("formタグで送信するエントリのnameを定義します。"),
    value: z
      .string()
      .describe("formタグで送信するエントリのvalueを定義します。"),
  },
  async ({ text, value, name }) => {
    return {
      content: [
        {
          type: "text",
          text: `<sp-text-field-unit ${text ? `text=${text}` : ""} ${name ? `name=${name}` : ""} ${value ? `value=${value}` : ""}></sp-text-field-unit>`,
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

*/
