#!/usr/bin/env -S node --experimental-strip-types
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { z } from "zod";
var node_child_process_1 = require("node:child_process");
var util = require("node:util");
var promises_1 = require("node:fs/promises");
var path = require("node:path");
var __dirname = import.meta.dirname;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var baseDir, manifestObject, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    baseDir = path.join(__dirname, "..", "..");
                    return [4 /*yield*/, (0, promises_1.mkdir)(path.join(baseDir, "tmp"))];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, util.promisify(node_child_process_1.exec)("npx custom-elements-manifest analyze --outdir tmp --globs src/**/*", {
                            cwd: baseDir,
                        })];
                case 2:
                    _c.sent();
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, (0, promises_1.readFile)(path.join(baseDir, "tmp", "custom-elements.json"))];
                case 3:
                    manifestObject = _b.apply(_a, [(_c.sent()).toString()]);
                    console.log(manifestObject);
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
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
