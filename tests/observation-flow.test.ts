import { test } from "node:test";
import assert from "node:assert/strict";
import { academyModules } from "../src/data/academyData";
import { practiceQuestions } from "../src/data/observationData";
import {
  answersMatch,
  createGame,
  currentQuestion,
  gameReducer,
  readProgress,
  STORAGE_KEY,
  validateProgress,
  writeProgress,
  type QuestionAction,
} from "../src/game/gameState";
import { constrainLens, lensImageOffset } from "../src/game/lensGeometry";

test("compatible-content saves keep answers and cards, remapping old lesson indices once", () => {
  for (const [index, id] of [
    "scale",
    "optical",
    "fluorescence",
    "electron",
  ].entries()) {
    let s = gameReducer(createGame("en"), { type: "RESUME" });
    s = gameReducer(s, {
      type: "ANSWER",
      ids: currentQuestion(s).correctAnswer,
    });
    s = gameReducer(s, { type: "ACADEMY", module: index });
    const legacy: Record<string, unknown> = {
      ...s,
      academyCompleted: ["optical", "fluorescence"],
    };
    delete legacy.academyRevision;
    delete legacy.practice;
    const data = new Map([[STORAGE_KEY, JSON.stringify(legacy)]]);
    const storage = {
      getItem: (key: string) => data.get(key) ?? null,
      setItem: (key: string, value: string) => {
        data.set(key, value);
      },
      removeItem: (key: string) => {
        data.delete(key);
      },
    };
    const loaded = readProgress(storage)!;
    assert.ok(loaded);
    assert.equal(academyModules[loaded.academyModule!].id, id);
    assert.deepEqual(loaded.completed, s.completed);
    assert.deepEqual(loaded.selected, s.selected);
    assert.deepEqual(loaded.academyCompleted, legacy.academyCompleted);
    assert.equal(loaded.locale, "en");
    writeProgress(storage, loaded, loaded.updatedAt);
    assert.deepEqual(readProgress(storage), loaded);
  }
});

test("tool practice accepts only the best tool for each current question", () => {
  const expected = [
    ["stereo"],
    ["magnifier"],
    ["optical"],
    ["electron"],
  ];
  practiceQuestions.forEach((q, i) => {
    for (const choice of q.choices)
      assert.equal(
        answersMatch(q, [choice.id]),
        expected[i].includes(choice.id),
      );
    assert.equal(answersMatch(q, []), false);
    assert.equal(answersMatch(q, expected[i].concat(expected[i])), false);
    for (const id of q.acceptedAnswers ?? []) {
      assert.ok(q.answerExplanations?.[id]?.en);
      assert.ok(q.answerExplanations?.[id]?.["zh-TW"]);
    }
  });
});

test("alternative-answer support remains available without grading alternatives as second best", () => {
  const q = {
    ...practiceQuestions[0],
    acceptedAnswers: ["magnifier", "stereo"],
  };
  assert.equal(answersMatch(q, ["magnifier"]), true);
  assert.equal(answersMatch(q, ["stereo"]), true);
  assert.equal(answersMatch(q, ["naked-eye"]), false);
  assert.equal(answersMatch(q, ["magnifier", "stereo"]), false);
});

test("visible fruit flies still require stereo for the close-observation question", () => {
  let s = gameReducer(createGame(), { type: "PRACTICE_OPEN" });
  for (const id of ["naked-eye", "magnifier"]) {
    s = gameReducer(s, { type: "PRACTICE", action: { type: "ANSWER", ids: [id] } });
    assert.equal(s.practice.feedback, "retry");
    assert.deepEqual(s.practice.completed, {});
  }
  s = gameReducer(s, { type: "PRACTICE", action: { type: "ASSIST" } });
  assert.deepEqual(s.practice.selected, ["stereo"]);
  assert.equal(s.practice.feedback, "assisted");
  assert.ok(validateProgress(s));
});

test("v0.21 completed practice cannot bypass the revised v0.22 questions", () => {
  const old = {
    ...createGame(),
    contentVersion: 2,
    practice: {
      cursor: 3, selected: ["electron"], feedback: "correct",
      attempts: 1, showHint: false, exploreStep: 0, finished: true,
      completed: Object.fromEntries(practiceQuestions.map((q) => [q.id, "solved"])),
    },
  };
  const data = new Map([[STORAGE_KEY, JSON.stringify(old)], ["unrelated", "keep"]]);
  const storage = {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => { data.set(key, value); },
    removeItem: (key: string) => { data.delete(key); },
  };
  assert.equal(validateProgress(old), false);
  assert.equal(readProgress(storage), null);
  assert.equal(data.has(STORAGE_KEY), false);
  assert.equal(data.get("unrelated"), "keep");
});

test("practice supports hints, completion, resume and replay without changing active missions", () => {
  let s = gameReducer(createGame(), { type: "RESUME" });
  s = gameReducer(s, { type: "ANSWER", ids: currentQuestion(s).correctAnswer });
  s = gameReducer(s, { type: "NEXT" });
  s = gameReducer(s, { type: "SELECT", id: "labels" });
  const mission = {
    cursor: s.cursor,
    selected: s.selected,
    completed: s.completed,
  };
  s = gameReducer(s, { type: "PRACTICE_OPEN" });
  const act = (action: QuestionAction) => {
    s = gameReducer(s, { type: "PRACTICE", action });
    assert.ok(validateProgress(s));
  };
  act({ type: "NEXT" });
  assert.equal(s.practice.cursor, 0);
  act({ type: "ASSIST" });
  assert.equal(s.practice.feedback, null);
  act({ type: "ANSWER", ids: ["electron"] });
  act({ type: "ANSWER", ids: ["electron"] });
  assert.equal(s.practice.attempts, 2);
  assert.equal(s.practice.showHint, true);
  act({ type: "ASSIST" });
  assert.equal(s.practice.feedback, "assisted");
  act({ type: "NEXT" });
  for (let i = 1; i < 4; i++) {
    act({ type: "ANSWER", ids: practiceQuestions[i].correctAnswer });
    act({ type: "NEXT" });
  }
  assert.equal(s.practice.finished, true);
  assert.equal(s.screen, "practice");
  assert.deepEqual(
    { cursor: s.cursor, selected: s.selected, completed: s.completed },
    mission,
  );
  s = gameReducer(s, { type: "RESUME" });
  assert.equal(s.screen, "game");
  assert.equal(s.cursor, 1);
  const replay = gameReducer(s, { type: "START", fresh: createGame() });
  assert.equal(replay.practice.finished, true);
  const retry = gameReducer(s, { type: "PRACTICE_RESTART" });
  assert.equal(retry.practice.finished, false);
  assert.deepEqual(retry.completed, s.completed);
  assert.equal(
    gameReducer(s, { type: "RESET", fresh: createGame() }).practice.finished,
    false,
  );
});

test("first-time practice saves reload; malformed and premature completion states are rejected", () => {
  let s = gameReducer(createGame(), { type: "PRACTICE_OPEN" });
  s = gameReducer(s, {
    type: "PRACTICE",
    action: { type: "ANSWER", ids: ["stereo"] },
  });
  assert.ok(validateProgress(s));
  const data = new Map<string, string>();
  const storage = {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => {
      data.set(k, v);
    },
    removeItem: (k: string) => {
      data.delete(k);
    },
  };
  writeProgress(storage, s, s.updatedAt);
  assert.deepEqual(readProgress(storage), s);
  for (const change of [
    { cursor: 10 },
    { finished: true },
    { selected: ["unknown"] },
    { completed: [] },
    { feedback: "retry" },
  ])
    assert.equal(
      validateProgress({ ...s, practice: { ...s.practice, ...change } }),
      false,
    );
});

test("lens stays inside desktop/mobile boards and magnifies the exact point under its center", () => {
  for (const [width, height] of [
    [720, 540],
    [300, 225],
    [180, 135],
  ]) {
    const radius = Math.min(72, width * 0.2);
    for (const point of [
      { x: -1, y: 2 },
      { x: 0.48, y: 0.55 },
      { x: 1, y: 0 },
    ]) {
      const p = constrainLens(point, width, height, radius);
      assert.ok(
        p.x * width >= radius - 1e-8 && p.x * width <= width - radius + 1e-8,
      );
      assert.ok(
        p.y * height >= radius - 1e-8 && p.y * height <= height - radius + 1e-8,
      );
      const img = lensImageOffset(p, width, height, radius);
      assert.ok(Math.abs(img.left + p.x * img.width - radius) < 1e-8);
      assert.ok(Math.abs(img.top + p.y * img.height - radius) < 1e-8);
    }
  }
});
