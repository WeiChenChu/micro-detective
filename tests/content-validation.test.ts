import {
  practiceQuestions,
  observationUI,
  magnifierSpecimens,
  practiceTools,
} from "../src/data/observationData";
import { fluorescenceSteps } from "../src/data/gameData";
import {
  academyModules,
  academyVisuals,
  scaleSequence,
  toolAbilities,
} from "../src/data/academyData";
import { academyUI } from "../src/data/academyUI";
import { academyChallenges, discoveries, toolRecap } from "../src/data/academyFlow";
import { fluorescenceSignals } from "../src/data/fluorescenceData";
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { caseQuestions, finalQuestions, stages, toolChoices } from "../src/data/missionData";
import { images, realImageExamples } from "../src/data/images";
import { investigationUI } from "../src/data/investigationData";
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
      assert.doesNotMatch(String(o.en), /[\u3400-\u9fff]/, `${path}.en contains untranslated Chinese`);
      for (const lang of ["zh-TW", "en"])
        assert.ok(
          typeof o[lang] === "string" && (o[lang] as string).trim(),
          `${path}.${lang}`,
        );
    } else
      Object.entries(o).forEach(([key, v]) => inspect(v, `${path}.${key}`));
  }
  inspect({
    academyChallenges, discoveries, toolRecap, fluorescenceSignals,
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
    realImageExamples,
    investigationUI,
    ui,
    gameUI,
  });
});
test("all image files exist locally; original SVG placeholders have no scripts or external references", () => {
  for (const image of Object.values(images)) {
    const path = resolve("public", image.src);
    assert.ok(existsSync(path), path);
    assert.ok(image.credit.creator);
    assert.ok(image.credit.license);
    if (image.type === "real") {
      assert.equal(image.placeholder, false);
      assert.ok(image.credit.sourceUrl, `${image.id}: missing source`);
      assert.ok(image.caption.en && image.imageAlt.en);
      continue;
    }
    assert.equal(image.type, "illustration");
    assert.ok(image.placeholder);
    const svg = readFileSync(path, "utf8");
    assert.match(svg, /<svg/);
    assert.match(svg, /viewBox="0 0 800 600"/);
    assert.doesNotMatch(svg, /<script|<foreignObject|onload=|href="https?:/i);
  }
});

test("academy preserves six concepts and optional sample reflections", () => {
  assert.deepEqual(
    academyModules.map((m) => m.id),
    ["scale", "magnifier", "stereo", "optical", "fluorescence", "electron"],
  );
  assert.equal(new Set(academyModules.map((m) => m.id)).size, 6);
  assert.deepEqual(academyModules.filter(m => m.check).map(m => m.id), ["optical", "electron"]);
  for (const m of academyModules) if (m.check) {
    assert.ok(m.check.choices.some(c => c.id === m.check!.answer));
    assert.ok(m.check.choices.every(c => c.feedback.en && c.feedback["zh-TW"]));
  }
  for (const m of academyModules) {
    assert.ok(m.opening["zh-TW"] && m.concept["zh-TW"] && m.clue["zh-TW"]);
    assert.ok(!("answer" in m) && !("choices" in m));
  }
  for (const q of [...caseQuestions, ...finalQuestions])
    assert.ok(q.strongHint?.["zh-TW"], q.id);
  assert.equal(caseQuestions.filter((q) => q.stage === "mystery").length, 4);
  assert.ok(caseQuestions.some((q) => q.image === "mission-pollen-real"));
  assert.ok(caseQuestions.some((q) => q.image === "mission-tem-real"));
});

test("compound-tool labels agree across lessons, summaries, choices and shared UI", () => {
  const labels = [
    academyModules.find((m) => m.id === "optical")!.title,
    toolAbilities.find((t) => t.id === "optical")!.name,
    practiceTools.find((t) => t.id === "optical")!.title,
    toolChoices.find((t) => t.id === "optical")!.title,
    ui.optical,
  ];
  for (const label of labels) {
    assert.equal(label["zh-TW"], "複式光學顯微鏡");
    assert.match(label.en, /^Compound light microscop/);
  }
  assert.match(observationUI.family["zh-TW"], /屬於光學顯微鏡/);
  assert.match(academyModules.find((m) => m.id === "fluorescence")!.concept["zh-TW"], /螢光標記/);
});

test("observation content distinguishes visibility, detail and specimen tradeoffs", () => {
  const whole = practiceQuestions[0];
  assert.match(whole.question["zh-TW"], /頭、胸、腹和翅膀/);
  assert.match(whole.hint["zh-TW"], /肉眼確實可以看到/);
  assert.match(whole.strongHint!["zh-TW"], /放大鏡也能幫忙/);
  assert.deepEqual(caseQuestions[0].correctAnswer, ["animal-cell", "bacterium"]);
  assert.match(caseQuestions[0].question["zh-TW"], /大概的形狀/);
  assert.match(caseQuestions[0].explanation["zh-TW"], /肉眼可見，不代表肉眼適合觀察細節/);
  assert.equal(practiceQuestions[1].image, "leaf");
  assert.match(academyModules[0].clue["zh-TW"], /看得到，不一定看得清楚；看得清楚，也不一定看得到你想找的線索。/);
  const electron = academyModules.find((m) => m.id === "electron")!;
  assert.match(electron.concept["zh-TW"], /通常需要特殊準備/);
  assert.match(electron.concept["zh-TW"], /通常不能直接觀察活著/);
  assert.match(electron.clue["zh-TW"], /不是所有問題/);
  assert.match(observationUI.orderNote["zh-TW"], /不是工具的厲害排行榜/);
});


test("fluorescence channels preserve aligned, transparent, independent specimen signals", () => {
  const nucleus = readFileSync("public/images/fluorescence/channel-nuclei.svg", "utf8");
  const mitochondria = readFileSync("public/images/fluorescence/channel-mitochondria.svg", "utf8");
  for (const svg of [nucleus, mitochondria]) {
    assert.match(svg, /viewBox="0 0 800 600"/);
    assert.doesNotMatch(svg, /<rect|<script|<foreignObject|onload=|href="https?:/i);
  }
  const boundary = readFileSync("public/images/fluorescence/channel-boundary.svg", "utf8");
  assert.match(nucleus, /<ellipse/);
  assert.match(boundary, /fill="none"/);
  assert.match(mitochondria, /<path/);
  for (const svg of [nucleus, boundary, mitochondria]) {
    assert.match(svg, /translate\(225 175\)/);
    assert.match(svg, /translate\(565 215\)/);
    assert.match(svg, /translate\(325 435\)/);
  }
});
