#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadDefaultManifest, Manifest } from "./manifest";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { makeWebComponentContent } from "./tool";
import {  getSpLogoDefinition } from "./sp-logo";
import { render } from "lit";

function buildMcpServer(): McpServer {
  return new McpServer({
    name: "mitsubachi-mcp",
    version: "1.0.0",
    capabilities: {
      resources: {},
      tools: {},
    },
  });
}

function defineTools(server: McpServer, manifest: Manifest) {
  const content = makeWebComponentContent(manifest);
  server.tool(
    "mitsubachi-ui-web-components",
    "mitsubachi-uiのカスタム要素の一覧を提供します。",
    {},
    async () => {
      return {
        content,
      };
    },
  );
  for(const {tag, body} of [{tag: 'sp-logo', body: getSpLogoDefinition}]) {
    const customElement = manifest.customElements[tag];
    if(customElement) {

      const [input, builder] = body(customElement);
      server.tool(
        `mitsubachi-${tag}`, 
        customElement.summary ?? `<${tag}>を生成します。`,
        input, async (shape) => {
          const built = builder(shape);
          const h= new HTMLBodyElement();
          render(built, h);
          return {
            content: [{
              type: "text",
              text: h.innerHTML,
            }],
          };
        });
    }
  }
  
}

export async function main() {
  const server = buildMcpServer();
  const manifest = loadDefaultManifest();
  defineTools(server, manifest);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("mitsubachi-ui MCP Server running on stdio");
}
main().catch((error) => {
  console.error(error);
  throw error;
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

*/
