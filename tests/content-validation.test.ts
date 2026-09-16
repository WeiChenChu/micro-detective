import {
  practiceQuestions,
  observationUI,
  magnifierSpecimens,
} from "../src/data/observationData";
import { fluorescenceSteps } from "../src/data/gameData";
import {
  academyModules,
  academyVisuals,
  scaleSequence,
  toolAbilities,
} from "../src/data/academyData";
import { academyUI } from "../src/data/academyUI";
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { caseQuestions, finalQuestions, stages } from "../src/data/missionData";
import { images } from "../src/data/images";
import { ui } from "../src/data/ui";
import { gameUI } from "../src/data/gameUI";

test("question IDs, answers, stage and image references are all valid", () => {
  const questions = [...caseQuestions, ...finalQuestions, ...practiceQuestions];
  assert.equal(new Set(questions.map((q) => q.id)).size, questions.length);
  for (const q of questions) {
    assert.ok(stages.some((s) => s.id === q.stage));
    assert.ok(q.correctAnswer.length);
    assert.equal(new Set(q.choices.map((c) => c.id)).size, q.choices.length);
    q.correctAnswer.forEach((id) =>
      assert.ok(
        q.choices.some((c) => c.id === id),
        `${q.id}: ${id}`,
      ),
    );
    [q.image, ...q.choices.map((c) => c.image)]
      .filter(Boolean)
      .forEach((id) => assert.ok(images[id!], `Missing ${id}`));
    if (q.type === "single") assert.equal(q.correctAnswer.length, 1);
  }
  fluorescenceSteps.forEach((step) => assert.ok(images[step.image]));
});
test("all localized educational and interface strings have both languages", () => {
  function inspect(value: unknown, path = "root") {
    if (!value || typeof value !== "object") return;
    const o = value as Record<string, unknown>;
    if ("zh-TW" in o || "en" in o) {
      for (const lang of ["zh-TW", "en"])
        assert.ok(
          typeof o[lang] === "string" && (o[lang] as string).trim(),
          `${path}.${lang}`,
        );
    } else
      Object.entries(o).forEach(([key, v]) => inspect(v, `${path}.${key}`));
  }
  inspect({
    academyModules,
    observationUI,
    practiceQuestions,
    magnifierSpecimens,
    academyVisuals,
    scaleSequence,
    toolAbilities,
    academyUI,
    caseQuestions,
    finalQuestions,
    stages,
    images,
    ui,
    gameUI,
  });
});
test("all image files exist locally; original SVG placeholders have no scripts or external references", () => {
  for (const image of Object.values(images)) {
    const path = resolve("public", image.src);
    assert.ok(existsSync(path), path);
    assert.ok(image.placeholder);
    assert.ok(image.credit.creator);
    assert.ok(image.credit.license);
    const svg = readFileSync(path, "utf8");
    assert.match(svg, /<svg/);
    assert.match(svg, /viewBox="0 0 800 600"/);
    assert.doesNotMatch(svg, /<script|<foreignObject|onload=|href="https?:/i);
  }
});

test("academy activities have valid answers and six collectible concepts in observation order", () => {
  assert.deepEqual(
    academyModules.map((m) => m.id),
    ["scale", "magnifier", "stereo", "optical", "fluorescence", "electron"],
  );
  assert.equal(new Set(academyModules.map((m) => m.id)).size, 6);
  for (const m of academyModules) {
    assert.ok(m.choices.some((c) => c.id === m.answer));
    assert.ok(m.hint["zh-TW"] && m.strongHint["zh-TW"] && m.clue["zh-TW"]);
  }
  for (const q of [...caseQuestions, ...finalQuestions])
    assert.ok(q.strongHint?.["zh-TW"], q.id);
  assert.equal(caseQuestions.filter((q) => q.stage === "mystery").length, 4);
  assert.ok(caseQuestions.some((q) => q.image === "electron-surface"));
  assert.ok(caseQuestions.some((q) => q.image === "electron-mitochondrion"));
});
