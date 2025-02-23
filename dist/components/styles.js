import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "./foundation.css?inline";
export function makeStyleSheet(...styles) {
    const cssStyleSheet = new CSSStyleSheet();
    cssStyleSheet.replaceSync(`${styles.join(" ")} ${resetStyle} ${foundationStyle}`);
    return cssStyleSheet;
}
