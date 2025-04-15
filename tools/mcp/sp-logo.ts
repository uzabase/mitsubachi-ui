import { z, ZodRawShape } from "zod";
import { CustomElement } from "./manifest";
import { describe } from "./schema";
import { html, TemplateResult } from "lit";

export function getSpLogoDefinition(
  customElement: CustomElement,
): [ZodRawShape, (shape: ZodRawShape) => Promise<TemplateResult>] {
  const input = { language: z.enum(["ja", "en", "ch"]) };

  describe(input, customElement);

  return [
    input,
    async ({ language }) => {
      return html`<sp-logo language="${language}"></sp-logo>`;
    },
  ];
}
