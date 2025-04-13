import custom from "./custom-elements.json" with { type: "json" };

export interface Manifest {
  summaries(): { [key: string]: string };
}

class ManifestJson implements Manifest {
  private readonly raw: any;

  constructor(raw: any) {
    this.raw = raw;
  }

  summaries(): { [key: string]: string } {
    const elements = this.customElements;
    let res: { [key: string]: string } = {};
    for (const element of elements) {
      if (element.summary && element.tagName.startsWith("sp-")) {
        res[element.tagName] = element.summary;
      }
    }
    return res;
  }

  private get customElements(): { tagName: string; summary?: string }[] {
    const results = [];
    for (const module of this.modules) {
      const declarations = module["declarations"];
      const customElements = declarations.filter((d: any) => d.customElement);
      for (const customElement of customElements) {
        results.push(customElement);
      }
    }
    return results;
  }

  private get modules(): any[] {
    return this.raw["modules"];
  }
}

function loadManifest(manifestJson: any): Manifest {
  return new ManifestJson(manifestJson);
}

/**
 *
 */
export function loadDefaultManifest(): Manifest {
  return loadManifest(custom);
}
