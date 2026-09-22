import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ImageAttribution } from "../src/components/ImageAttribution";
import { images } from "../src/data/images";

test("image attribution remains visible, bilingual and escaped with optional change details", () => {
  const image = {
    ...images["optical-onion"],
    credit: {
      creator: "Researcher <test>", source: "Fixture collection", license: "Fixture license",
      sourceUrl: "https://example.org/source", licenseUrl: "https://example.org/license", changes: "Resized for this fixture",
    },
  };
  for (const locale of ["zh-TW", "en"] as const) {
    const html = renderToStaticMarkup(createElement(ImageAttribution, { image, locale }));
    assert.match(html, /<div class="image-attribution"><p class="image-credit-line">/);
    assert.ok(html.indexOf("Researcher &lt;test&gt;") < html.indexOf("<details>"));
    assert.match(html, /rel="noopener noreferrer"/);
    assert.doesNotMatch(html, /<details[^>]*\bopen/);
    assert.match(html, /Researcher &lt;test&gt;/);
    assert.match(html, /Fixture collection/);
    assert.match(html, /href="https:\/\/example.org\/source"/);
    assert.match(html, /href="https:\/\/example.org\/license"/);
    assert.match(html, /Resized for this fixture/);
  }
});

test("missing optional links never produce blank attribution anchors", () => {
  const html = renderToStaticMarkup(createElement(ImageAttribution, { image: images.leaf, locale: "en" }));
  assert.doesNotMatch(html, /<a\b/);
  assert.match(html, /Original project illustration/);
});


test("NICHD credit, source and CC BY license stay visible outside the disclosure in both languages", () => {
  for (const locale of ["zh-TW", "en"] as const) {
    const html = renderToStaticMarkup(createElement(ImageAttribution, { image: images["fluorescence-real"], locale }));
    const visibleCredit = html.split("<details>")[0];
    assert.match(visibleCredit, />NICHD<\/a>/);
    assert.match(visibleCredit, /href="https:\/\/creativecommons.org\/licenses\/by\/2.0\/"[^>]*>CC BY 2.0/);
    assert.match(visibleCredit, /href="https:\/\/commons.wikimedia.org\/wiki\/File:Cells_with_nuclei[^" ]+"/);
    assert.match(visibleCredit, /Wikimedia Commons/);
    assert.match(html, locale === "en" ? /Converted to WebP \/ optimized for web display/ : /已轉換為 WebP/);
  }
});
