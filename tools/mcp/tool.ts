import { Manifest } from "./manifest";

export function makeWebComponentContent(
  manifest: Manifest,
): { type: "text"; text: string }[] {
  const res: { type: "text"; text: string }[] = [];

  for (const [tagName, summary] of Object.entries(manifest.summaries)) {
    res.push({ type: "text", text: `カスタム要素 <${tagName}> ${summary}` });
  }
  return res;
}
