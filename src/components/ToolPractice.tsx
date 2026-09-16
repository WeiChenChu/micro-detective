import { academyUI as a } from "../data/academyUI";
import {
  observationUI as o,
  practiceQuestions,
  practiceStage,
} from "../data/observationData";
import type { Locale } from "../data/types";
import type { GameState, QuestionAction } from "../game/gameState";
import { QuestionCard } from "./QuestionCard";

export function ToolPractice({
  state,
  locale,
  onAction,
  onBack,
  onMissions,
  onAgain,
}: {
  state: GameState;
  locale: Locale;
  onAction: (action: QuestionAction) => void;
  onBack: () => void;
  onMissions: () => void;
  onAgain: () => void;
}) {
  const p = state.practice;
  return (
    <main id="main" tabIndex={-1} className="game-main tool-practice">
      <div className="mission-navigation">
        <button className="button text-button" onClick={onBack}>
          ← {a.academy[locale]}
        </button>
      </div>
      {p.finished ? (
        <section className="question-card practice-complete">
          <p className="eyebrow">DETECTIVE SKILL</p>
          <h1 id="practice-completion-heading" tabIndex={-1}>
            🔎 {o.skill[locale]}
          </h1>
          <p className="lesson-concept">{o.orderNote[locale]}</p>
          <div className="academy-actions">
            <button className="button primary" onClick={onMissions}>
              {a.missions[locale]} →
            </button>
            <button className="button" onClick={onAgain}>
              {o.again[locale]}
            </button>
          </div>
        </section>
      ) : (
        <>
          <header className="academy-heading">
            <p className="eyebrow">OBSERVE · CHOOSE · DISCOVER</p>
            <h1>{o.practice[locale]}</h1>
            <p>{o.practiceIntro[locale]}</p>
            <progress
              value={Object.keys(p.completed).length}
              max={practiceQuestions.length}
              aria-label={o.practice[locale]}
            />
            <p>
              {p.cursor + 1} / {practiceQuestions.length}
            </p>
          </header>
          <QuestionCard
            key={p.cursor}
            state={{ ...state, ...p, screen: "game" }}
            question={practiceQuestions[p.cursor]}
            stage={{
              ...practiceStage,
              number: String(p.cursor + 1).padStart(2, "0"),
            }}
            locale={locale}
            total={practiceQuestions.length}
            finalIndex={0}
            finalTotal={0}
            nextLabel={
              (p.cursor === practiceQuestions.length - 1 ? o.finish : o.next)[
                locale
              ]
            }
            dispatch={(action) => {
              switch (action.type) {
                case "SELECT":
                case "ANSWER":
                case "HINT":
                case "ASSIST":
                case "NEXT":
                case "EXPLORE":
                  onAction(action);
              }
            }}
          />
        </>
      )}
    </main>
  );
}
