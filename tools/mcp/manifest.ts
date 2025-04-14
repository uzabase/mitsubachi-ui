import custom from "./custom-elements.json" with { type: "json" };

export interface Manifest {
  get summaries(): { [key: string]: string };
}


export interface CustomElement {
  tagName: string;
  summary?: string;
  describe(attribute: string): string
}

class CustomElementJson implements CustomElement {
  private raw: any;

  constructor(raw: any) {
    this.raw = raw;
  }

  get tagName(): string {
    return this.raw.tagName;
  }

  get summary(): string | undefined {
    return this.raw.summary;
  }

  describe(attribute: string): string {
    for(let {name, description} of this.raw.attributes) {
      if(name === attribute) {
        return description;
      }
    }
    return '';
  }
}



class ManifestJson implements Manifest {
  private readonly raw: any;

  constructor(raw: any) {
    this.raw = raw;
  }

  get summaries(): { [key: string]: string } {
    const elements = this.customElements;
    let res: { [key: string]: string } = {};
    for (const [_, v] of Object.entries(elements)) {
      if(v.summary) {
        res[v.tagName] = v.summary;
      }
    }
    return res;
  }

  private get customElements(): {[tag: string]: CustomElement} {
    const results: {[tag: string]: CustomElement} = {} ;
    for (const module of this.modules) {
      const declarations = module["declarations"];
      const customElements = declarations.filter((d: any) => d.customElement && d.tagName.startsWith("sp-"));
      for (const customElement of customElements) {
        const c = new CustomElementJson(customElement);
        results[c.tagName] = c;
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

