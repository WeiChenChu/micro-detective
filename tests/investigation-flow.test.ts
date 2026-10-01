import { test } from "node:test";
import assert from "node:assert/strict";
import { bonusQuestion, caseQuestions, finalQuestions, investigationQuestions } from "../src/data/missionData";
import { images, realImageExamples } from "../src/data/images";
import { createGame, currentQuestion, gameReducer, readProgress, STORAGE_KEY, validateProgress } from "../src/game/gameState";

test("final investigation unlocks evidence only after a decision, survives reload and reaches its summary", () => {
  let s = gameReducer(createGame(), { type: "RESUME" });
  for (const q of caseQuestions) {
    s = gameReducer(s, { type: "ANSWER", ids: q.correctAnswer });
    s = gameReducer(s, { type: "NEXT" });
  }
  for (const [index, q] of finalQuestions.entries()) {
    assert.equal(currentQuestion(s).id, q.id);
    assert.ok(!s.completed[q.id]);
    assert.equal(gameReducer(s, { type: "NEXT" }).cursor, s.cursor);
    s = gameReducer(s, { type: "ANSWER", ids: [q.choices.find(c => !q.correctAnswer.includes(c.id))!.id] });
    assert.equal(s.feedback, "retry");
    assert.ok(!s.completed[q.id]);
    if (index === 1) {
      s = gameReducer(s, { type: "ANSWER", ids: [q.choices.find(c => !q.correctAnswer.includes(c.id))!.id] });
      s = gameReducer(s, { type: "ASSIST" });
    } else s = gameReducer(s, { type: "ANSWER", ids: q.correctAnswer });
    assert.ok(s.completed[q.id]);
    const data = JSON.stringify(s);
    const reloaded = readProgress({ getItem: k => k === STORAGE_KEY ? data : null, setItem() {}, removeItem() {} });
    assert.deepEqual(reloaded, s);
    if (q.investigation) assert.ok(images[q.investigation.evidenceImage]);
    if (index === 2) assert.equal(s.screen, "game", "three clues alone do not solve the case");
    if (index < 2) {
      assert.ok(q.investigation!.nextQuestion);
      assert.equal(finalQuestions[index + 1].image, q.investigation!.evidenceImage);
    }
    s = gameReducer(s, { type: "NEXT" });
    assert.ok(validateProgress(s));
  }
  assert.equal(s.screen, "complete");
});

test("current-content saves retain lesson cards, practice and active answers", () => {
  const s = { ...createGame("en"), academyCompleted: ["close-observation", "optical"], learnedTools: ["scale", "magnifier", "optical"], academyModule: 4, screen: "academy" as const };
  const data = JSON.stringify(s);
  assert.deepEqual(readProgress({ getItem: k => k === STORAGE_KEY ? data : null, setItem() {}, removeItem() { assert.fail("must not clear compatible progress"); } }), s);
  assert.equal(s.contentVersion, 6);
  assert.equal(s.schemaVersion, 2);
  assert.equal(s.academyRevision, 3);
});

test("mystery observations defer instrument mechanisms to the second hint", () => {
  for (const id of ["mystery-sem", "mystery-tem"]) {
    const q = caseQuestions.find(q => q.id === id)!;
    assert.doesNotMatch(q.observation!["zh-TW"] + q.hint["zh-TW"], /電子掃描|電子穿過/);
    assert.match(q.strongHint!["zh-TW"], /電子掃描|電子穿過/);
    assert.ok(q.choices.every(c => !/天然|只因為/.test(c.title["zh-TW"])));
  }
});

test("real image examples remain separate from illustrations and cannot activate absent assets", () => {
  for (const [id, slot] of Object.entries(realImageExamples)) {
    assert.equal(images[id].type, "illustration");
    if (slot.imageId) assert.equal(images[slot.imageId]?.type, "real");
  }
});


test("bonus is optional, persisted separately and cannot run before the case is solved", () => {
  let s = gameReducer(createGame(), { type: "RESUME" });
  assert.equal(gameReducer(s, { type: "BONUS", action: { type: "ANSWER", ids: ["electron"] } }), s);
  for (const q of [...caseQuestions, ...finalQuestions]) {
    s = gameReducer(s, { type: "ANSWER", ids: q.correctAnswer });
    s = gameReducer(s, { type: "NEXT" });
  }
  assert.equal(s.screen, "complete");
  assert.equal(s.bonus, undefined);
  const completed = s.completed;
  s = gameReducer(s, { type: "BONUS", action: { type: "ANSWER", ids: ["optical"] } });
  assert.equal(s.bonus?.feedback, "retry");
  assert.equal(s.bonus?.completed[bonusQuestion.id], undefined);
  s = gameReducer(s, { type: "BONUS", action: { type: "ANSWER", ids: ["electron"] } });
  assert.ok(s.bonus?.completed[bonusQuestion.id]);
  assert.deepEqual(s.completed, completed);
  assert.ok(validateProgress(s));
  const data = JSON.stringify(s);
  assert.deepEqual(readProgress({ getItem: k => k === STORAGE_KEY ? data : null, setItem() {}, removeItem() {} }), s);
  s = gameReducer(s, { type: "BONUS", action: { type: "NEXT" } });
  assert.equal(s.bonus?.finished, true);
  assert.ok(validateProgress(s));
  assert.equal(gameReducer(s, { type: "START", fresh: createGame() }).bonus, undefined);
  assert.equal(validateProgress({ ...s, bonus: { ...s.bonus, completed: { unknown: "solved" } } }), false);
});

test("v0.32 migration keeps earlier missions and notebook cards but restarts changed Final Case", () => {
  let s = gameReducer(createGame(), { type: "RESUME" });
  for (const q of caseQuestions) {
    s = gameReducer(s, { type: "ANSWER", ids: q.correctAnswer });
    s = gameReducer(s, { type: "NEXT" });
  }
  const old = { ...s, contentVersion: 4, finalOrder: ["investigation-cells", "investigation-protein", "investigation-detail"],
    cursor: 11, screen: "complete", selected: ["electron"], feedback: "correct", attempts: 1,
    learnedTools: ["stereo"], academyCompleted: ["stereo"],
    completed: { ...s.completed, "mission-target": "solved", "tools-protein": "solved", "tools-fine": "solved", "investigation-cells": "solved", "investigation-protein": "solved", "investigation-detail": "solved" } };
  const data = JSON.stringify(old);
  const migrated = readProgress({ getItem: k => k === STORAGE_KEY ? data : null, setItem() {}, removeItem() { assert.fail("retain earlier progress"); } })!;
  assert.equal(migrated.cursor, caseQuestions.length);
  assert.deepEqual(migrated.completed, s.completed);
  assert.deepEqual(migrated.learnedTools, ["stereo"]);
  assert.equal(currentQuestion(migrated).id, "fin-shape");
  assert.ok(validateProgress(migrated));
  assert.deepEqual(investigationQuestions.map(q => q.microscopeType), ["stereo", "optical", "fluorescence"]);
});

// A changed case must never expose conclusions through its locked tracker.
test("locked evidence exposes numbered states without scientific answers", async () => {
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { EvidenceProgress } = await import("../src/components/EvidenceProgress");
  for (const locale of ["en", "zh-TW"] as const) {
    const html = renderToStaticMarkup(createElement(EvidenceProgress, { state: createGame(locale), locale }));
    assert.equal((html.match(/🔒/g) ?? []).length, 3);
    assert.doesNotMatch(html, /<img|Fin regrowth|Proliferation labels|增殖標記|尾鰭長回/);
  }
});

test("v0.32 saves before the Final Case retain active retries and learning progress", () => {
  let s = gameReducer(createGame("en"), { type: "RESUME" });
  for (const q of caseQuestions.slice(0, 5)) {
    s = gameReducer(s, { type: "ANSWER", ids: q.correctAnswer });
    s = gameReducer(s, { type: "NEXT" });
  }
  s = gameReducer(s, { type: "ANSWER", ids: ["optical"] });
  const old = { ...s, contentVersion: 4, cursor: 8, completed: { ...s.completed, "mission-target": "solved", "tools-protein": "solved", "tools-fine": "solved" }, finalOrder: ["investigation-cells", "investigation-protein", "investigation-detail"] };
  const migrated = readProgress({ getItem: k => k === STORAGE_KEY ? JSON.stringify(old) : null, setItem() {}, removeItem() { assert.fail("compatible earlier questions must survive"); } });
  assert.deepEqual(migrated, s);
});
