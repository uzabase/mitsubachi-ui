import { z, ZodRawShape } from "zod";
import { CustomElement } from "./manifest";
import { describe } from "./schema";
import { html, nothing, TemplateResult, render } from "lit";

export function getSpLogoDefinition(
  customElement: CustomElement,
): [ZodRawShape, (shape: ZodRawShape) => TemplateResult] {
  const input = { language: z.enum(["ja", "en", "zh"]) };

  describe(input, customElement);

  return [
    input,
    ({ language }) => {
      return html`<sp-logo language=${language|| nothing }></sp-logo>`;
    },
  ];
}
