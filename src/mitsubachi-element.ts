import { LitElement } from "lit";

import packageJson from "../package.json";

export class MitsubachiElement extends LitElement {
  get version(): string {
    return packageJson.version;
  }
}
