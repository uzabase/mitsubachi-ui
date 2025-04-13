import { z } from "zod";
import { ToolIO } from "./toolio";

const a = {language: z.enum(["jp", "en", "cn"])};

export function defineIo(): ToolIO<typeof a> {
    return {
        inputSchema: {language: a.language.describe(''), b: z.string()},    
        toolCallbck: async ({language}) => {
            return {
                content: []
            }
        }
    }
}


