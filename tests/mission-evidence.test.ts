import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ImageAttribution } from "../src/components/ImageAttribution";
import { images, realImageExamples } from "../src/data/images";
import { caseQuestions } from "../src/data/missionData";
import { createGame, currentQuestion, gameReducer, validateProgress } from "../src/game/gameState";

const missions = caseQuestions.filter(q => q.stage === "mystery");

test("missions use four distinct real evidence images, independent of course photos and matched diagrams", () => {
  assert.deepEqual(missions.map(q => images[q.image!].modality), ["optical", "fluorescence", "sem", "tem"]);
  assert.equal(new Set(missions.map(q => q.image)).size, 4);
  const coursePhotos = Object.values(realImageExamples).map(s => s.imageId);
  assert.deepEqual(coursePhotos, ["onion-real", "fluorescence-real", "sem-eye-real", "tem-mitochondrion-real"]);
  for (const q of missions) {
    const image = images[q.image!];
    assert.equal(image.type, "real");
    assert.match(image.src, /^images\/microscopy\/missions\/.+\.webp$/);
    assert.ok(!coursePhotos.includes(image.id));
    assert.equal(q.evidenceTargets, undefined, "illustration hotspots must not transfer to photographs");
    assert.ok(image.width && image.height);
    for (const locale of ["zh-TW", "en"] as const) {
      assert.ok(image.imageAlt[locale] && image.caption[locale] && q.observation?.[locale]);
      assert.doesNotMatch(image.imageAlt[locale] + image.caption[locale], /血液|花粉|blood|pollen|osteosarcoma|DAPI/i);
    }
  }
  assert.deepEqual(caseQuestions.find(q => q.id === "mission-target")!.choices.map(c => c.image), ["cell-unmarked", "fluorescence-cell"]);
});

test("mission sources include original titles, creators, licenses and conversion notes in keyboard-native disclosures", () => {
  const expected = [
    ["Korinna", "CC BY 4.0 International", "Blood cells under the microscope 01"],
    ["Howard Vindin", "CC BY 4.0 International", "Osteosarcoma cells stained for actin, microtubules, and nuclei"],
    ["Andel", "CC0 1.0 Universal", "SEM Tradescantia spathacea pollen 0009"],
    ["Dartmouth Electron Microscope Facility, Dartmouth College", "Public Domain worldwide", "Chlamydomonas TEM 04"],
  ];
  for (const [index, q] of missions.entries()) for (const locale of ["zh-TW", "en"] as const) {
    const image = images[q.image!];
    assert.deepEqual([image.credit.creator, image.credit.license, image.credit.originalTitle], expected[index]);
    const html = renderToStaticMarkup(createElement(ImageAttribution, { image, locale, compact: true }));
    assert.match(html, /<details><summary>/);
    assert.doesNotMatch(html, /<details[^>]+open/);
    assert.ok(html.includes(image.credit.originalTitle!));
    assert.ok(html.includes(image.credit.creator));
    assert.ok(html.includes(image.credit.sourceUrl!));
    assert.match(html, /Wikimedia Commons/);
    assert.match(html, /rel="noopener noreferrer"/);
    assert.match(html, /WebP/);
    assert.doesNotMatch(html, /cropped/i);
    if (index < 2) assert.match(html, /href="https:\/\/creativecommons.org\/licenses\/by\/4.0\/"/);
  }
});

test("new mission decisions support retry, solve, assist, reload validation and ordered progression", () => {
  let state = gameReducer(createGame(), { type: "RESUME" });
  for (const q of caseQuestions) {
    assert.equal(currentQuestion(state).id, q.id);
    if (q.stage === "mystery") {
      const wrong = q.choices.find(c => !q.correctAnswer.includes(c.id))!.id;
      state = gameReducer(state, { type: "ANSWER", ids: [wrong] });
      assert.equal(state.feedback, "retry");
      assert.equal(state.completed[q.id], undefined);
      assert.equal(gameReducer(state, { type: "NEXT" }).cursor, state.cursor);
      if (q.id === "mystery-tem") {
        state = gameReducer(state, { type: "ANSWER", ids: [wrong] });
        state = gameReducer(state, { type: "ASSIST" });
        assert.equal(state.completed[q.id], "assisted");
      }
    }
    if (!state.completed[q.id]) state = gameReducer(state, { type: "ANSWER", ids: q.correctAnswer });
    assert.ok(state.completed[q.id]);
    assert.ok(validateProgress(JSON.parse(JSON.stringify(state))));
    state = gameReducer(state, { type: "NEXT" });
  }
  assert.equal(currentQuestion(state).stage, "final");
  assert.equal(validateProgress({ ...state, contentVersion: 3 }), false);
});

