import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp";
import { ZodRawShape } from "zod";

export interface ToolIO<Args extends ZodRawShape> {
    inputSchema: Args,
    toolCallbck: ToolCallback<Args>,
}