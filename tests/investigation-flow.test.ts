import { test } from "node:test";
import assert from "node:assert/strict";
import { caseQuestions, finalQuestions } from "../src/data/missionData";
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
    s = gameReducer(s, { type: "ANSWER", ids: ["naked-eye"] });
    assert.equal(s.feedback, "retry");
    assert.ok(!s.completed[q.id]);
    if (index === 1) {
      s = gameReducer(s, { type: "ANSWER", ids: ["naked-eye"] });
      s = gameReducer(s, { type: "ASSIST" });
    } else s = gameReducer(s, { type: "ANSWER", ids: q.correctAnswer });
    assert.ok(s.completed[q.id]);
    const data = JSON.stringify(s);
    const reloaded = readProgress({ getItem: k => k === STORAGE_KEY ? data : null, setItem() {}, removeItem() {} });
    assert.deepEqual(reloaded, s);
    assert.ok(q.investigation && images[q.investigation.evidenceImage]);
    if (index < 2) {
      assert.ok(q.investigation.nextQuestion);
      assert.equal(finalQuestions[index + 1].image, q.investigation.evidenceImage);
    }
    s = gameReducer(s, { type: "NEXT" });
    assert.ok(validateProgress(s));
  }
  assert.equal(s.screen, "complete");
});

test("v0.23 compatible saves retain lesson cards, practice and active answers", () => {
  const s = { ...createGame("en"), academyCompleted: ["scale", "magnifier", "optical"], academyModule: 4, screen: "academy" as const };
  const data = JSON.stringify(s);
  assert.deepEqual(readProgress({ getItem: k => k === STORAGE_KEY ? data : null, setItem() {}, removeItem() { assert.fail("must not clear compatible progress"); } }), s);
  assert.equal(s.contentVersion, 3);
  assert.equal(s.schemaVersion, 2);
  assert.equal(s.academyRevision, 2);
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
