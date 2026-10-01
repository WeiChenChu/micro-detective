import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { finalQuestions, stages } from "../src/data/missionData";
import { images } from "../src/data/images";
import { FeedbackPanel } from "../src/components/FeedbackPanel";
import { createGame, currentQuestion, gameReducer, questionOrder, readProgress, STORAGE_KEY, validateProgress, type GameState } from "../src/game/gameState";

const tissue = finalQuestions.find(q => q.id === "fin-tissue")!;
function oldAt(id: string, answered = false): GameState {
  const state = createGame("en"), order = questionOrder(state), cursor = order.indexOf(id);
  const answers: Record<string, string[]> = { "fin-tissue": ["optical"], "fin-proliferation": ["fluorescence"], "fin-explanation": ["rebuild"] };
  return { ...state, contentVersion: 6, started: true, screen: "game", cursor,
    completed: Object.fromEntries(order.slice(0, cursor + Number(answered)).map(id => [id, "solved"])),
    selected: answered ? answers[id] : ["stereo"], attempts: 2, feedback: answered ? "correct" : "retry", showHint: true, exploreStep: 2,
    learnedTools: ["stereo"], academyCompleted: ["stereo"], notebookReviewSeen: true };
}
function reload(old: GameState) {
  const next = readProgress({ getItem: key => key === STORAGE_KEY ? JSON.stringify(old) : null, setItem() {}, removeItem() { assert.fail("keep valid progress"); } });
  assert.ok(next);
  assert.ok(validateProgress(next));
  return next;
}

test("whole-fin tissue observation accepts only stereo and teaches the other tools in both languages", () => {
  let state = gameReducer(createGame(), { type: "RESUME" });
  while (currentQuestion(state).id !== tissue.id) {
    state = gameReducer(state, { type: "ANSWER", ids: currentQuestion(state).correctAnswer });
    state = gameReducer(state, { type: "NEXT" });
  }
  assert.deepEqual(tissue.choices.map(c => c.id), ["optical", "stereo", "fluorescence"]);
  assert.deepEqual(tissue.correctAnswer, ["stereo"]);
  assert.equal(tissue.acceptedAnswers, undefined);
  assert.equal(images[tissue.investigation!.evidenceImage].microscopeType, "stereo");
  for (const locale of ["zh-TW", "en"] as const) {
    for (const id of ["optical", "fluorescence", "stereo"]) {
      const answered = gameReducer(state, { type: "ANSWER", ids: [id] });
      assert.equal(answered.feedback, id === "stereo" ? "correct" : "retry");
      // Isolate feedback text from Vite-only image URLs; preview checks cover evidence.
      const html = renderToStaticMarkup(createElement(FeedbackPanel, { state: answered, question: { ...tissue, investigation: undefined }, stage: stages.find(s => s.id === "final")!, locale, onNext() {}, onAssist() {}, total: 10 }));
      assert.ok(html.includes((id === "stereo" ? tissue.explanation : tissue.answerExplanations![id])[locale]));
      assert.equal(!!answered.completed[tissue.id], id === "stereo");
    }
  }
});

test("content 6 unfinished tissue answers reset; completed tissue evidence advances without invented answers", () => {
  for (const answered of [false, true]) {
    const old = oldAt("fin-tissue", answered), next = reload(old);
    assert.equal(currentQuestion(next).id, answered ? "fin-proliferation" : "fin-tissue");
    assert.deepEqual(next.completed, old.completed);
    assert.deepEqual([next.selected, next.attempts, next.feedback, next.showHint, next.exploreStep], [[], 0, null, false, 0]);
    assert.deepEqual(next.learnedTools, old.learnedTools);
    assert.deepEqual(next.academyCompleted, old.academyCompleted);
    assert.deepEqual(next.practice, old.practice);
    assert.equal(next.locale, "en");
    assert.equal(next.notebookReviewSeen, true);
    assert.equal(next.contentVersion, 7);
    assert.deepEqual(reload(next), next, "migration is idempotent");
  }
});

test("content 6 later answers and completed cases with optional bonus remain compatible", () => {
  const later = oldAt("fin-proliferation", true);
  assert.deepEqual(reload(later), { ...later, contentVersion: 7 });
  const done = { ...oldAt("fin-explanation", true), screen: "complete" as const,
    bonus: { cursor: 0, selected: ["electron"], completed: { "fin-bonus-tem": "solved" as const }, attempts: 1, feedback: "correct" as const, showHint: false, exploreStep: 0, finished: true } };
  assert.deepEqual(reload(done), { ...done, contentVersion: 7 });
});

test("invalid old tissue answers are rejected before migration", () => {
  const old = { ...oldAt("fin-tissue", true), selected: ["stereo"] };
  assert.equal(readProgress({ getItem: key => key === STORAGE_KEY ? JSON.stringify(old) : null, setItem() {}, removeItem() {} }), null);
});

test("injury cut stays behind the intact body and joins the missing fin contour", () => {
  const original = readFileSync("public/images/naked-eye/zebrafish.svg", "utf8"), injured = readFileSync("public/images/investigation/fin-injury.svg", "utf8");
  const body = original.match(/<path d="[^"]+" fill="url\(#fish\)"[^>]+\/>/)![0];
  assert.ok(injured.includes(body), "body geometry stays intact");
  const cut = injured.match(/<path d="M(\d+) (\d+)V(\d+)" stroke="#975724" stroke-width="7"\/>/)!;
  assert.ok(cut);
  const [, x, top, bottom] = cut;
  assert.ok(Number(x) + 7 / 2 < 209, "cut stroke cannot overlap the body's posterior tip");
  assert.ok(injured.includes(`M${x} ${top}L151 221L168 304L151 395L${x} ${bottom}`));
  assert.ok(injured.includes(`M263 311L${x} ${top}L${x} ${bottom}Z`));
});
