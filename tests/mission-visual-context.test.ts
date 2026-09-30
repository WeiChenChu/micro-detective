import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { caseQuestions, finalQuestions, stages } from "../src/data/missionData";
import { practiceQuestions } from "../src/data/observationData";
import { toolIllustrations } from "../src/data/toolIllustrations";
import { FeedbackPanel } from "../src/components/FeedbackPanel";
import { createGame, gameReducer, type GameState } from "../src/game/gameState";

const missions = [...caseQuestions, ...finalQuestions];

test("every tool decision has explicit artwork metadata; SEM and TEM share the electron family", () => {
  for (const q of [...missions, ...practiceQuestions].filter(q => q.toolSelection || q.stage === "mystery")) {
    for (const c of q.choices) {
      assert.ok(c.toolVisualId, `${q.id}/${c.id} needs artwork`);
      assert.ok(toolIllustrations[c.toolVisualId]);
      if (c.toolMode) assert.equal(c.toolVisualId, "electron");
    }
  }
  const sem = missions.find(q => q.id === "mystery-sem")!;
  const tem = missions.find(q => q.id === "mystery-tem")!;
  assert.equal(sem.choices.find(c => c.id === sem.correctAnswer[0])?.toolMode, "SEM");
  assert.equal(tem.choices.find(c => c.id === tem.correctAnswer[0])?.toolMode, "TEM");
  assert.notEqual(toolIllustrations.stereo.image, toolIllustrations.optical.image);
});

test("feedback reveals only the selected tool on both retries, then the resolved tool on success or assist", () => {
  for (const locale of ["zh-TW", "en"] as const) {
    for (const [cursor, question] of missions.entries()) {
      if (!question.choices.every(c => c.toolVisualId)) continue;
      const stage = stages.find(s => s.id === question.stage)!;
      const initial: GameState = { ...createGame(locale), screen: "game", started: true, cursor };
      // Isolate tool feedback from Vite-only evidence image URLs. Full investigation
      // evidence is exercised in the production-preview browser checks.
      const render = (state: GameState) => renderToStaticMarkup(createElement(FeedbackPanel, {
        state, question: { ...question, investigation: undefined }, stage, locale, total: missions.length, onNext() {}, onAssist() {},
      }));
      assert.equal(render(initial), "");
      for (const choice of question.choices.filter(c => !question.correctAnswer.includes(c.id))) {
        let state = initial;
        for (let attempt = 1; attempt <= 2; attempt++) {
          state = gameReducer(state, { type: "ANSWER", ids: [choice.id] });
          const html = render(state);
          assert.equal(state.feedback, "retry");
          assert.equal(state.completed[question.id], undefined);
          assert.deepEqual([...html.matchAll(/data-tool-visual="([^"]+)"/g)].map(m => m[1]), [choice.toolVisualId]);
          assert.equal(html.includes("assist-button"), attempt === 2);
          if (choice.toolMode) assert.ok(html.includes(`${choice.toolMode} ·`));
        }
        for (const action of [{ type: "ASSIST" } as const, { type: "ANSWER", ids: question.correctAnswer } as const]) {
          const resolved = gameReducer(state, action);
          const correct = question.choices.find(c => c.id === question.correctAnswer[0])!;
          const html = render(resolved);
          assert.deepEqual([...html.matchAll(/data-tool-visual="([^"]+)"/g)].map(m => m[1]), [correct.toolVisualId]);
          if (correct.toolMode) assert.ok(html.includes(`${correct.toolMode} ·`));
          assert.ok(resolved.completed[question.id]);
        }
      }
    }
  }
});
