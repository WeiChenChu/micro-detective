import { useEffect, useRef } from "react";
import type { Locale, Question, Stage } from "../data/types";
import type { GameState } from "../game/gameState";
import { gameUI } from "../data/gameUI";
import { Icon } from "./Icon";

export function FeedbackPanel({
  state,
  question,
  stage,
  locale,
  onNext,
  onAssist,
  total,
  nextLabel,
}: {
  state: GameState;
  question: Question;
  stage: Stage;
  locale: Locale;
  onNext: () => void;
  onAssist: () => void;
  total: number;
  nextLabel?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (state.feedback) {
      panel.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
      if (state.feedback !== "retry")
        heading.current?.focus({ preventScroll: true });
    }
  }, [state.feedback, state.attempts]);
  if (!state.feedback) return null;
  const retry = state.feedback === "retry";
  return (
    <div
      ref={panel}
      className={`feedback-panel ${retry ? "feedback-hint" : "feedback-success"}`}
    >
      <div
        className="feedback-content"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="feedback-icon">
          <Icon name={retry ? "search" : "check"} size={25} />
        </span>
        <div>
          <h3 ref={heading} tabIndex={-1}>
            {retry
              ? gameUI.retry[locale]
              : state.feedback === "assisted"
                ? gameUI.assisted[locale]
                : gameUI.success[locale]}
          </h3>
          <p>
            {retry
              ? (state.attempts >= 2
                  ? (question.strongHint ?? question.explanation)
                  : question.hint)[locale]
              : (question.answerExplanations?.[state.selected[0]] ??
                  question.explanation)[locale]}
          </p>
        </div>
      </div>
      {retry ? (
        state.attempts >= 2 && (
          <button className="button assist-button" onClick={onAssist}>
            <Icon name="people" size={20} />
            {gameUI.assist[locale]}
          </button>
        )
      ) : (
        <>
          {question.stage !== "final" && (
            <div className="reward">
              <Icon name={stage.icon} size={19} />
              {stage.reward[locale]}
            </div>
          )}
          <div className="feedback-bottom">
            <details className="fun-fact">
              <summary>{gameUI.funFact[locale]}</summary>
              <p>{question.funFact[locale]}</p>
            </details>
            <button className="button primary" onClick={onNext}>
              {nextLabel ??
                (state.cursor === total - 1
                  ? gameUI.finish[locale]
                  : question.stage === "final"
                    ? gameUI.nextFile[locale]
                    : gameUI.collect[locale])}
              <Icon name="arrow" size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
