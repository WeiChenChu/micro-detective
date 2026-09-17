import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { academyModules } from "../src/data/academyData";
import { createGame, currentQuestion, gameReducer, readProgress, STORAGE_KEY, validateProgress, writeProgress } from "../src/game/gameState";

test("v0.25 progress survives missing notebook flags; one-time flags survive reload and replay", () => {
  let state = gameReducer(createGame(), { type: "RESUME" });
  state = gameReducer(state, { type: "ANSWER", ids: currentQuestion(state).correctAnswer });
  state.academyCompleted = academyModules.map(lesson => lesson.id);
  delete state.notebookHintSeen;
  delete state.notebookReviewSeen;
  const data = new Map([[STORAGE_KEY, JSON.stringify(state)]]);
  const storage = {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => { data.set(key, value); },
    removeItem: (key: string) => { data.delete(key); },
  };
  assert.deepEqual(readProgress(storage), state);
  state = gameReducer(state, { type: "NOTEBOOK_HINT_SEEN" });
  state = gameReducer(state, { type: "NOTEBOOK_REVIEW_SEEN" });
  writeProgress(storage, state);
  const loaded = readProgress(storage)!;
  assert.equal(loaded.notebookHintSeen, true);
  assert.equal(loaded.notebookReviewSeen, true);
  assert.deepEqual(loaded.completed, state.completed);
  const replay = gameReducer(loaded, { type: "START", fresh: createGame() });
  assert.equal(replay.notebookHintSeen, true);
  assert.equal(replay.notebookReviewSeen, true);
  assert.deepEqual(replay.academyCompleted, state.academyCompleted);
  const reset = gameReducer(replay, { type: "RESET", fresh: createGame() });
  assert.equal(reset.notebookHintSeen, false);
  assert.equal(reset.notebookReviewSeen, false);
  assert.equal(validateProgress({ ...state, notebookHintSeen: "true" }), false);
});

test("all six tool cards reference distinct self-contained original SVGs and bilingual summaries", () => {
  assert.equal(new Set(academyModules.map(lesson => lesson.image)).size, 6);
  for (const lesson of academyModules) {
    const svg = readFileSync(new URL(lesson.image), "utf8");
    assert.match(svg, /viewBox="0 0 240 210"/);
    assert.doesNotMatch(svg, /<(?:script|image|text|foreignObject)\b|(?:href|url\()|@import/i);
    for (const locale of ["zh-TW", "en"] as const) {
      assert.ok(lesson.imageAlt[locale]);
      assert.ok(lesson.shortDescription[locale]);
      assert.ok(lesson.toolName[locale]);
      assert.ok(lesson.concept[locale]);
      assert.ok(lesson.clue[locale]);
    }
  }
});
