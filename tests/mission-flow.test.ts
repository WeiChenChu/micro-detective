import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { bonusQuestion, caseQuestions, finalQuestions, questionsById, stages } from "../src/data/missionData";
import { ProgressTracker } from "../src/components/ProgressTracker";
import { StageIntro } from "../src/components/StageIntro";
import { createGame, currentQuestion, evidenceCount, gameReducer, questionOrder, readProgress, STORAGE_KEY, validateProgress, type GameState } from "../src/game/gameState";

const requiredIds = [
  "mission-scale", "mystery-light", "mystery-glow", "mystery-sem", "mystery-tem",
  "tools-fish", "fin-shape", "fin-tissue", "fin-proliferation", "fin-explanation",
];
// Fixtures explicitly describe the old schema, independent of current arrays.
const oldMissionIds = [
  "mission-scale", "mission-target", "mystery-light", "mystery-glow", "mystery-sem",
  "mystery-tem", "tools-protein", "tools-fine", "tools-fish",
];
const oldFinalIds = ["fin-shape", "fin-tissue", "fin-proliferation", "fin-explanation"];
const oldIds = [...oldMissionIds, ...oldFinalIds];
const retiredIds = ["mission-target", "tools-protein", "tools-fine"];
const oldAnswers: Record<string, string[]> = {
  "mission-scale": ["animal-cell", "bacterium"], "mission-target": ["labels"],
  "mystery-light": ["optical"], "mystery-glow": ["fluorescence"],
  "mystery-sem": ["surface"], "mystery-tem": ["inside"],
  "tools-protein": ["fluorescence"], "tools-fine": ["electron"], "tools-fish": ["naked-eye"],
  "fin-shape": ["stereo"], "fin-tissue": ["optical"],
  "fin-proliferation": ["fluorescence"], "fin-explanation": ["rebuild"],
};
function oldAt(id: string, answered = false): GameState {
  const cursor = oldIds.indexOf(id);
  assert.ok(cursor >= 0);
  return {
    ...createGame("en"), contentVersion: 5, finalOrder: [...oldFinalIds],
    screen: "game", started: true, cursor,
    completed: Object.fromEntries(oldIds.slice(0, cursor + Number(answered)).map((id, i) => [id, i % 2 ? "assisted" : "solved"])),
    selected: answered ? oldAnswers[id] : [], attempts: answered ? 2 : 0,
    feedback: answered ? "correct" : null,
    academyCompleted: ["close-observation", "fluorescence"],
    learnedTools: ["scale", "magnifier", "fluorescence"],
    notebookHintSeen: true, notebookReviewSeen: true,
    practice: { cursor: 0, selected: ["stereo"], completed: { "practice-whole": "solved" },
      attempts: 1, feedback: "correct", showHint: true, exploreStep: 2, finished: false },
  };
}
function reload(old: unknown): GameState {
  const data = new Map([[STORAGE_KEY, JSON.stringify(old)], ["unrelated", "keep"]]);
  const state = readProgress({
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => { data.set(key, value); },
    removeItem: () => assert.fail("valid progress must not be removed"),
  });
  assert.ok(state);
  assert.ok(validateProgress(state));
  assert.equal(data.get("unrelated"), "keep");
  return state;
}

test("required order and four active stages exactly match the simplified flow", () => {
  assert.deepEqual(questionOrder(createGame()), requiredIds);
  assert.deepEqual([...caseQuestions, ...finalQuestions].map(q => q.id), requiredIds);
  assert.equal(requiredIds.length, 10);
  assert.deepEqual(stages.map(s => [s.id, s.number]), [["scale", "01"], ["mystery", "02"], ["tools", "03"], ["final", "04"]]);
  assert.deepEqual(stages.map(s => [...caseQuestions, ...finalQuestions].filter(q => q.stage === s.id).length), [1, 4, 1, 4]);
  assert.deepEqual(caseQuestions.filter(q => q.stage === "tools").map(q => q.id), ["tools-fish"]);
  assert.ok([...caseQuestions, ...finalQuestions].every(q => String(q.stage) !== "target"));
  for (const id of retiredIds) assert.equal(questionsById[id], undefined);
  assert.equal(bonusQuestion.id, "fin-bonus-tem");
  assert.ok(!questionOrder(createGame()).includes(bonusQuestion.id));
});

test("both languages render four tracker nodes and one valid intro per stage boundary", () => {
  for (const locale of ["zh-TW", "en"] as const) {
    let state = gameReducer(createGame(locale), { type: "RESUME" });
    const boundaries: string[][] = [];
    for (const [cursor, id] of requiredIds.entries()) {
      const q = currentQuestion(state);
      assert.equal(q.id, id);
      const stage = stages.find(s => s.id === q.stage)!;
      const stageIds = requiredIds.filter(id => questionsById[id].stage === stage.id);
      const index = stageIds.indexOf(id) + 1;
      const intro = renderToStaticMarkup(createElement(StageIntro, { stage, locale, index, total: stageIds.length }));
      assert.match(intro, index === 1 ? /class="stage-intro / : /class="stage-context /);
      assert.ok(intro.includes(stage.title[locale]));
      assert.doesNotMatch(intro, /stage-target|undefined/);
      const tracker = renderToStaticMarkup(createElement(ProgressTracker, { stageId: stage.id, count: cursor, total: questionOrder(state).length, locale }));
      assert.equal((tracker.match(/<li\b/g) ?? []).length, 4);
      assert.equal((tracker.match(/aria-current="step"/g) ?? []).length, 1);
      assert.match(tracker, /max="10"/);
      state = gameReducer(state, { type: "ANSWER", ids: q.correctAnswer });
      const next = gameReducer(state, { type: "NEXT" });
      if (next.screen === "game" && currentQuestion(next).stage !== q.stage) boundaries.push([q.id, currentQuestion(next).id]);
      state = next;
      assert.ok(validateProgress(state));
    }
    assert.deepEqual(boundaries, [["mission-scale", "mystery-light"], ["mystery-tem", "tools-fish"], ["tools-fish", "fin-shape"]]);
    assert.equal(state.screen, "complete");
    assert.equal(evidenceCount(state), 10);
    assert.equal(state.bonus, undefined);
  }
});

for (const [id, nextId] of [["mission-target", "mystery-light"], ["tools-protein", "tools-fish"], ["tools-fine", "tools-fish"]]) {
  test(`schema 5 on ${id} migrates to ${nextId}, retaining collections and clearing stale UI`, () => {
    for (const answered of [false, true]) {
      const old = { ...oldAt(id, answered), showHint: true, exploreStep: 3,
        ...(answered ? {} : { selected: [id === "mission-target" ? "ordinary" : "optical"], attempts: 2, feedback: "retry" as const }) };
      const migrated = reload(old);
      assert.equal(currentQuestion(migrated).id, nextId);
      assert.equal(migrated.contentVersion, 7);
      assert.deepEqual(migrated.completed, Object.fromEntries(Object.entries(old.completed).filter(([id]) => !retiredIds.includes(id))));
      assert.deepEqual(migrated.academyCompleted, old.academyCompleted);
      assert.deepEqual(migrated.learnedTools, old.learnedTools);
      assert.deepEqual(migrated.practice, old.practice);
      assert.equal(migrated.locale, "en");
      assert.equal(migrated.notebookHintSeen, true);
      assert.equal(migrated.notebookReviewSeen, true);
      assert.deepEqual([migrated.selected, migrated.attempts, migrated.feedback, migrated.showHint, migrated.exploreStep], [[], 0, null, false, 0]);
    }
  });
}

test("surviving schema 5 cursors retain answers except the reframed fin-tissue observation", () => {
  for (const id of requiredIds) for (const answered of [false, true]) {
    const old = { ...oldAt(id, answered), showHint: true, exploreStep: 2 };
    const migrated = reload(old);
    assert.equal(currentQuestion(migrated).id, id === "fin-tissue" && answered ? "fin-proliferation" : id);
    assert.deepEqual([migrated.selected, migrated.attempts, migrated.feedback, migrated.showHint, migrated.exploreStep],
      id === "fin-tissue" ? [[], 0, null, false, 0] : [old.selected, old.attempts, old.feedback, old.showHint, old.exploreStep]);
    assert.deepEqual(migrated.completed, Object.fromEntries(Object.entries(old.completed).filter(([id]) => requiredIds.includes(id))));
  }
  const old = { ...oldAt("fin-proliferation"), selected: ["optical"], attempts: 2, feedback: "retry" as const, screen: "academy" as const, academyModule: 3 };
  const migrated = reload(old);
  assert.equal(migrated.screen, "academy");
  assert.equal(migrated.academyModule, 3);
  assert.equal(currentQuestion(gameReducer(migrated, { type: "RESUME" })).id, "fin-proliferation");
  assert.deepEqual(migrated.selected, ["optical"]);
});

test("old completed saves remain complete with optional TEM untouched, including pending final reveal", () => {
  for (const screen of ["game", "complete", "landing", "academy"] as const) for (const bonusState of ["absent", "retry", "answered", "finished"]) {
    const old = { ...oldAt("fin-explanation", true), screen };
    if (bonusState !== "absent") old.bonus = {
      cursor: 0, completed: bonusState === "retry" ? {} : { "fin-bonus-tem": "solved" },
      selected: bonusState === "retry" ? ["optical"] : ["electron"], attempts: 1,
      feedback: bonusState === "retry" ? "retry" : "correct", showHint: true, exploreStep: 1, finished: bonusState === "finished",
    };
    const migrated = reload(old);
    assert.equal(migrated.screen, screen);
    assert.equal(evidenceCount(migrated), 10);
    assert.deepEqual(migrated.bonus, old.bonus);
    assert.equal(gameReducer(migrated, { type: "RESUME" }).screen, "complete");
  }
});

test("content 4 migration uses the nine legacy missions and chains into content 7", () => {
  const legacyFinals = ["investigation-cells", "investigation-protein", "investigation-detail"];
  for (let cursor = 0; cursor < 12; cursor++) {
    const old = { ...oldAt(oldIds[Math.min(cursor, 8)]), contentVersion: 4, cursor, finalOrder: legacyFinals };
    if (cursor >= 9) {
      old.completed = Object.fromEntries([...oldMissionIds, ...legacyFinals.slice(0, cursor - 9)].map(id => [id, "solved"]));
      old.selected = ["optical"];
      old.attempts = 2;
      old.feedback = "retry";
    }
    const migrated = reload(old);
    const expected = cursor >= 9 ? "fin-shape" : retiredIds.includes(oldIds[cursor]) ? cursor === 1 ? "mystery-light" : "tools-fish" : oldIds[cursor];
    assert.equal(currentQuestion(migrated).id, expected);
    assert.ok(Object.keys(migrated.completed).every(id => requiredIds.includes(id)));
    assert.equal(migrated.contentVersion, 7);
  }
});

test("legacy Academy revisions still chain with the schema 5 mission migration", () => {
  for (const academyRevision of [undefined, 2]) {
    const old = { ...oldAt("tools-fine"), academyRevision, academyCompleted: ["scale", "optical"], academyModule: 0 };
    const migrated = reload(old);
    assert.equal(migrated.academyRevision, 3);
    assert.deepEqual(migrated.learnedTools, ["scale", "optical"]);
    assert.deepEqual(migrated.academyCompleted, ["optical"]);
    assert.equal(currentQuestion(migrated).id, "tools-fish");
  }
});

test("migration rejects malformed previous-schema progress instead of blessing deleted-question answers", () => {
  const old = oldAt("tools-protein");
  for (const change of [
    { selected: ["unknown"] }, { selected: ["magnifier"] }, { cursor: 99 },
    { completed: { ...old.completed, unknown: "solved" } },
    { completed: {} }, { feedback: "correct" }, { screen: "complete" },
    { bonus: { ...createGame().practice } }, { updatedAt: 0 },
  ]) {
    const data = JSON.stringify({ ...old, ...change });
    assert.equal(readProgress({ getItem: key => key === STORAGE_KEY ? data : null, setItem() {}, removeItem() {} }), null);
  }
});
