/* global d3 */
import debounce from "lodash.debounce";
import isMobile from "./utils/is-mobile";
import linkFix from "./utils/link-fix";
import graphic from "./graphic";
import footer from "./footer";
import header from "./header";


const $body = d3.select("body");
let previousWidth = 0;

function setupStickyHeader() {
  const $header = $body.select("header");
  if ($header.classed("is-sticky")) {
    const $menu = $body.select(".header__menu");
    const $toggle = $body.select(".header__toggle");
    $toggle.on("click", () => {
      const visible = $menu.classed("is-visible");
      $menu.classed("is-visible", !visible);
      $toggle.classed("is-visible", !visible);
    });
  }
}

function init() {
  // adds rel="noopener" to all target="_blank" links
  linkFix();
  header.init();
  // add mobile class to body tag
  $body.classed("is-mobile", isMobile.any());
  // setup sticky header menu
  // setupStickyHeader();
  // kick off graphic code
  graphic.init();
  // load footer stories
  footer.init();
}

init();
