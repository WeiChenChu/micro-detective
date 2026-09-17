import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ImageAttribution } from "../src/components/ImageAttribution";
import { images } from "../src/data/images";

test("image attribution is collapsed, bilingual, escaped and preserves source/license/change details", () => {
  const image = {
    ...images["optical-onion"],
    credit: {
      creator: "Researcher <test>", source: "Fixture collection", license: "Fixture license",
      sourceUrl: "https://example.org/source", licenseUrl: "https://example.org/license", changes: "Resized for this fixture",
    },
  };
  for (const locale of ["zh-TW", "en"] as const) {
    const html = renderToStaticMarkup(createElement(ImageAttribution, { image, locale }));
    assert.match(html, /<details class="image-attribution"><summary>/);
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
