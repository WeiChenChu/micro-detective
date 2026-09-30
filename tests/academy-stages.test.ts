import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { academyStages, observationTools } from "../src/data/academyData";
import { magnifierSpecimens } from "../src/data/observationData";
import { createGame, currentQuestion, gameReducer, readProgress, STORAGE_KEY, upgradeAcademyProgress, validateProgress, writeProgress } from "../src/game/gameState";
import { specimenFrame, specimenPoint, specimenLensOffset } from "../src/game/lensGeometry";
import { DetectiveNotebook } from "../src/components/DetectiveNotebook";
import { ObservationView } from "../src/components/ObservationView";
import { toolIllustrations } from "../src/data/toolIllustrations";

test("five stages collect six independent tools; replay and reset preserve their distinct meaning", () => {
  assert.equal(academyStages.length, 5);
  assert.equal(observationTools.length, 6);
  assert.deepEqual(academyStages.flatMap(stage => stage.toolIds), observationTools.map(tool => tool.id));
  let state = createGame();
  for (const [module, stage] of academyStages.entries()) {
    state = gameReducer(state, { type: "ACADEMY", module });
    state = gameReducer(state, { type: "COMPLETE_ACADEMY_STAGE", id: stage.id });
    assert.ok(validateProgress(state));
    assert.equal(state.academyCompleted.length, module + 1);
    assert.equal(state.learnedTools.length, module + 2);
    assert.deepEqual(gameReducer(state, { type: "COMPLETE_ACADEMY_STAGE", id: stage.id }), state);
  }
  const notebook = renderToStaticMarkup(createElement(DetectiveNotebook, { state, locale: "en" }));
  assert.equal((notebook.match(/collected-card/g) ?? []).length, 6);
  assert.match(notebook, /6 \/ 6/);
  const replay = gameReducer(state, { type: "START", fresh: createGame() });
  assert.deepEqual(replay.learnedTools, state.learnedTools);
  const reset = gameReducer(state, { type: "RESET", fresh: createGame() });
  assert.deepEqual(reset.learnedTools, []);
  assert.deepEqual(reset.academyCompleted, []);
});

test("every v0.30 completion subset and old index migrates once, retaining answers and partial cards", () => {
  const ids = observationTools.map(tool => tool.id);
  let mission = gameReducer(createGame("en"), { type: "RESUME" });
  mission = gameReducer(mission, { type: "ANSWER", ids: currentQuestion(mission).correctAnswer });
  for (let mask = 0; mask < 64; mask++) for (const index of [null, 0, 1, 2, 3, 4, 5]) {
    const completed = ids.filter((_, i) => mask & (1 << i));
    const old = { ...mission, academyRevision: 2, academyCompleted: completed, academyModule: index, screen: "academy" };
    const data = new Map([[STORAGE_KEY, JSON.stringify(old)]]);
    const storage = { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => { data.set(k, v); }, removeItem: () => assert.fail("compatible saves must survive") };
    const state = readProgress(storage)!;
    assert.ok(state && validateProgress(state));
    assert.deepEqual(state.learnedTools, completed);
    assert.deepEqual(state.completed, mission.completed);
    assert.deepEqual(state.selected, mission.selected);
    assert.deepEqual(state.practice, mission.practice);
    assert.equal(state.locale, "en");
    assert.equal(state.academyCompleted.includes("close-observation"), completed.includes("scale") && completed.includes("magnifier"));
    assert.equal(state.academyModule, index === null ? null : Math.max(0, index - 1));
    writeProgress(storage, state, state.updatedAt);
    assert.deepEqual(readProgress(storage), state);
    if (index === 0 || index === 1) {
      const finished = gameReducer(state, { type: "COMPLETE_ACADEMY_STAGE", id: "close-observation" });
      assert.ok(finished.learnedTools.includes("scale") && finished.learnedTools.includes("magnifier"));
      assert.ok(validateProgress(finished));
    }
  }
});

test("invalid migration inputs and inconsistent new collections are rejected", () => {
  for (const change of [{ academyModule: 6 }, { academyModule: -1 }, { academyCompleted: ["unknown"] }, { academyCompleted: ["scale", "scale"] }]) {
    const old = { ...createGame(), academyRevision: 2, ...change };
    assert.equal(validateProgress(upgradeAcademyProgress(old)), false);
  }
  for (const change of [{ learnedTools: ["unknown"] }, { learnedTools: ["scale", "scale"] }, { academyCompleted: ["close-observation"], learnedTools: ["scale"] }]) {
    assert.equal(validateProgress({ ...createGame(), ...change }), false);
  }
});

test("lens introduction preserves the specimen frame and centers the same feature at 2.5x", () => {
  assert.deepEqual(specimenFrame(1), specimenFrame(2));
  assert.deepEqual(specimenFrame(2), specimenFrame(3));
  for (const [width, height] of [[600, 450], [300, 225], [240, 180]]) {
    const frame = specimenFrame(2);
    for (const spot of magnifierSpecimens[1].spots) {
      const location = specimenPoint(spot, frame);
      const radius = Math.min(72, width * 0.2);
      const lens = specimenLensOffset(location, width, height, radius, frame);
      assert.ok(Math.abs(lens.left + spot.x * lens.width - radius) < 1e-8);
      assert.ok(Math.abs(lens.top + spot.y * lens.height - radius) < 1e-8);
      assert.equal(lens.width / (width * frame.scale), 2.5);
    }
  }
});

test("active tool uses shared Notebook artwork, visible bilingual naming and separate electron mode", () => {
  for (const tool of observationTools) for (const locale of ["zh-TW", "en"] as const) {
    const mode = tool.id === "electron" ? "SEM | Surface" : undefined;
    const markup = renderToStaticMarkup(createElement(ObservationView, { tool: tool.id, locale, mode, children: "specimen" }));
    assert.ok(markup.includes(toolIllustrations[tool.id].image));
    assert.ok(markup.includes(tool.toolName[locale]));
    assert.match(markup, /alt=""/);
    if (mode) assert.ok(markup.includes(mode));
  }
});
