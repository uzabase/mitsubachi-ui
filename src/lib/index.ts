import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "@/components/foundation.css?inline";

export function makeStyleSheet(...styles: string[]){
const cssStyleSheet = new CSSStyleSheet();
cssStyleSheet.replaceSync(`${styles.join(' ')} ${resetStyle} ${foundationStyle}`);
return cssStyleSheet;
}