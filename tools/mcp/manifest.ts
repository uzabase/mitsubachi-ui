import custom from "./custom-elements.json" with { type: "json" };

export interface Manifest {
  get summaries(): { [key: string]: string };
}

interface Attribute {
  name: string;
  description?: string;
}

interface CustomElement {
  tagName: string;
  summary?: string;
  attributes: Attribute[];
}

class ManifestJson implements Manifest {
  private readonly raw: any;

  constructor(raw: any) {
    this.raw = raw;
  }

  get summaries(): { [key: string]: string } {
    const elements = this.customElements;
    let res: { [key: string]: string } = {};
    for (const element of elements) {
      if(element.summary) {
        res[element.tagName] = element.summary;
      }
    }
    return res;
  }

  findAttributes(tagName: string): Attribute[] | undefined {
    for(const customElement of this.customElements) {
      if(customElement.tagName === tagName) {
        return customElement.attributes;
      }
    }
  }

  private get customElements(): CustomElement[] {
    const results = [];
    for (const module of this.modules) {
      const declarations = module["declarations"];
      const customElements = declarations.filter((d: any) => d.customElement && d.tagName.startsWith("sp-"));
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
