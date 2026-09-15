import { test } from "node:test";
import assert from "node:assert/strict";
import { caseQuestions, finalQuestions } from "../src/data/gameData";
import {
  answersMatch,
  clearProgress,
  createGame,
  currentQuestion,
  evidenceCount,
  gameReducer,
  MAX_AGE_MS,
  questionOrder,
  readProgress,
  STORAGE_KEY,
  validateProgress,
  writeProgress,
  type GameState,
  type StorageLike,
} from "../src/game/gameState";

const start = () =>
  gameReducer(createGame(), {
    type: "START",
    fresh: createGame("zh-TW", () => 0.5),
  });
function solved(s: GameState) {
  return gameReducer(s, {
    type: "ANSWER",
    ids: currentQuestion(s).correctAnswer,
  });
}
function at(index: number) {
  let s = start();
  for (let i = 0; i < index; i++) s = gameReducer(solved(s), { type: "NEXT" });
  return s;
}
const memory = (): StorageLike & { data: Map<string, string> } => ({
  data: new Map(),
  getItem(k) {
    return this.data.get(k) ?? null;
  },
  setItem(k, v) {
    this.data.set(k, v);
  },
  removeItem(k) {
    this.data.delete(k);
  },
});

test("all answer combinations work, including every card in the multi-select", () => {
  const multi = caseQuestions[0];
  for (let bits = 0; bits < 1 << multi.choices.length; bits++) {
    const ids = multi.choices
      .filter((_, i) => bits & (1 << i))
      .map((c) => c.id);
    const expected =
      ids.length === 3 &&
      ["leaf", "fruit-fly", "zebrafish"].every((id) => ids.includes(id));
    assert.equal(answersMatch(multi, ids), expected);
    assert.equal(
      evidenceCount(gameReducer(start(), { type: "ANSWER", ids })),
      expected ? 1 : 0,
    );
  }
  for (let i = 1; i < 9; i++) {
    const s = at(i),
      q = currentQuestion(s);
    for (const choice of q.choices) {
      const next = gameReducer(s, { type: "ANSWER", ids: [choice.id] });
      assert.equal(
        evidenceCount(next),
        i + (q.correctAnswer.includes(choice.id) ? 1 : 0),
        `${q.id}/${choice.id}`,
      );
    }
  }
});
test("full nine-clue flow ends at badge; repeated answers do not add rewards", () => {
  let s = start();
  for (let i = 0; i < 9; i++) {
    assert.equal(s.cursor, i);
    assert.equal(s.screen, "game");
    s = solved(s);
    assert.equal(evidenceCount(s), i + 1);
    assert.deepEqual(
      gameReducer(s, { type: "ANSWER", ids: currentQuestion(s).correctAnswer }),
      s,
    );
    assert.ok(validateProgress(s));
    s = gameReducer(s, { type: "NEXT" });
  }
  assert.equal(s.screen, "complete");
  assert.equal(evidenceCount(s), 9);
  assert.ok(validateProgress(s));
  assert.deepEqual(gameReducer(s, { type: "NEXT" }), s);
});
test("wrong answers encourage retry; assisted completion is available after two tries", () => {
  let s = start();
  assert.deepEqual(gameReducer(s, { type: "NEXT" }), s);
  assert.deepEqual(gameReducer(s, { type: "ASSIST" }), s);
  for (let i = 0; i < 2; i++)
    s = gameReducer(s, { type: "ANSWER", ids: ["bacterium"] });
  assert.equal(s.feedback, "retry");
  assert.equal(s.showHint, true);
  assert.equal(evidenceCount(s), 0);
  s = gameReducer(s, { type: "ASSIST" });
  assert.equal(s.feedback, "assisted");
  assert.equal(evidenceCount(s), 1);
  assert.equal(s.completed["case-eye"], "assisted");
  assert.ok(validateProgress(s));
  assert.equal(gameReducer(s, { type: "NEXT" }).cursor, 1);
});
test("language, microscope sequence and reload preserve the same question and final order", () => {
  let s = at(2);
  s = gameReducer(s, { type: "EXPLORE", step: 3 });
  s = gameReducer(s, { type: "SELECT", id: "labels" });
  const originalOrder = s.finalOrder;
  s = gameReducer(s, { type: "LOCALE", locale: "en" });
  const storage = memory();
  assert.equal(writeProgress(storage, s), true);
  const recovered = readProgress(storage)!;
  assert.equal(recovered.locale, "en");
  assert.equal(recovered.cursor, 2);
  assert.equal(recovered.exploreStep, 3);
  assert.deepEqual(recovered.selected, ["labels"]);
  assert.deepEqual(recovered.finalOrder, originalOrder);
  s = gameReducer(s, { type: "HOME" });
  assert.equal(s.screen, "landing");
  assert.equal(gameReducer(s, { type: "RESUME" }).cursor, 2);
});
test("each round shuffles exactly five unique final images, with all four tools", () => {
  const a = createGame("zh-TW", () => 0),
    b = createGame("zh-TW", () => 0.99);
  assert.notDeepEqual(a.finalOrder, b.finalOrder);
  assert.deepEqual(
    [...a.finalOrder].sort(),
    finalQuestions.map((q) => q.id).sort(),
  );
  assert.equal(new Set(finalQuestions.map((q) => q.microscopeType)).size, 4);
  assert.equal(questionOrder(a).length, 9);
});
test("replay and next-player reset progress while language rules remain explicit", () => {
  const s = gameReducer(solved(start()), { type: "LOCALE", locale: "en" });
  const replay = gameReducer(s, { type: "START", fresh: createGame(s.locale) });
  assert.equal(replay.locale, "en");
  assert.equal(replay.screen, "game");
  assert.equal(replay.cursor, 0);
  assert.equal(evidenceCount(replay), 0);
  const nextPlayer = gameReducer(s, { type: "RESET", fresh: createGame() });
  assert.equal(nextPlayer.locale, "zh-TW");
  assert.equal(nextPlayer.screen, "landing");
  assert.equal(nextPlayer.started, false);
});
test("storage expiry, corruption, changed content and blocked storage fail safely", () => {
  const storage = memory();
  const now = Date.now();
  const s = start();
  storage.setItem("unrelated", "keep");
  writeProgress(storage, s, now - MAX_AGE_MS - 1);
  assert.equal(readProgress(storage, now), null);
  assert.equal(storage.getItem("unrelated"), "keep");
  storage.setItem(STORAGE_KEY, "{broken");
  assert.equal(readProgress(storage), null);
  for (const changed of [
    { ...s, contentVersion: 99 },
    { ...s, cursor: 100 },
    { ...s, selected: ["nonexistent"] },
    { ...s, finalOrder: [] },
    { ...s, completed: { "final-leaf": "solved" } },
    { ...s, screen: "complete" },
    { ...s, feedback: "correct" },
  ])
    assert.equal(validateProgress(changed), false);
  const blocked = {
    getItem() {
      throw Error("blocked");
    },
    setItem() {
      throw Error("blocked");
    },
    removeItem() {
      throw Error("blocked");
    },
  };
  assert.equal(readProgress(blocked), null);
  assert.equal(writeProgress(blocked, s), false);
  assert.doesNotThrow(() => clearProgress(blocked));
  writeProgress(storage, s);
  clearProgress(storage);
  assert.equal(storage.getItem(STORAGE_KEY), null);
  assert.equal(storage.getItem("unrelated"), "keep");
});
