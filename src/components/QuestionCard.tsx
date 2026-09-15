import type { Dispatch } from "react";
import type { Locale, Question, Stage } from "../data/types";
import type { Action, GameState } from "../game/gameState";
import { observationLevels } from "../data/gameData";
import { gameUI } from "../data/gameUI";
import { Icon } from "./Icon";
import { ImageChoice } from "./ImageChoice";
import { MicroscopyImage } from "./MicroscopyImage";
import { FeedbackPanel } from "./FeedbackPanel";
import { FluorescenceLab } from "./FluorescenceLab";

export function QuestionCard({
  state,
  question,
  stage,
  locale,
  dispatch,
  total,
  finalIndex,
  finalTotal,
}: {
  state: GameState;
  question: Question;
  stage: Stage;
  locale: Locale;
  dispatch: Dispatch<Action>;
  total: number;
  finalIndex: number;
  finalTotal: number;
}) {
  const final = question.stage === "final";
  const resolved = !!state.completed[question.id];
  const hasImages = question.choices.some((c) => c.image);
  return (
    <article
      className={`question-card ${final ? "final-question" : ""}`}
      data-question-id={question.id}
    >
      <div className="question-topline">
        <span>
          <Icon name={final ? "detective" : "search"} size={16} />
          {final ? gameUI.finalFile[locale] : gameUI.evidenceLabel[locale]}{" "}
          {final ? `${finalIndex} / ${finalTotal}` : stage.number}
        </span>
        <span className="question-kind">{question.title[locale]}</span>
      </div>
      <h2 id="question-heading" tabIndex={-1}>
        {question.question[locale]}
      </h2>
      <p className="question-instruction">
        {final
          ? gameUI.finalInstruction[locale]
          : question.type === "multiple"
            ? gameUI.selectMany[locale]
            : hasImages
              ? gameUI.selectOne[locale]
              : gameUI.selectAnswer[locale]}
      </p>
      {question.stage === "fluorescence" && (
        <FluorescenceLab
          locale={locale}
          step={state.exploreStep}
          onStep={(step) => dispatch({ type: "EXPLORE", step })}
        />
      )}
      <div className={final ? "final-workspace" : ""}>
        {final && question.image && (
          <div className="final-evidence">
            <MicroscopyImage id={question.image} locale={locale} />
            <div className="observation-clue">
              <span>
                <Icon name="search" size={19} />
                {gameUI.clue[locale]}
              </span>
              <p>{question.hint[locale]}</p>
            </div>
          </div>
        )}
        <div className="answer-area">
          <div
            role="group"
            aria-labelledby="question-heading"
            className={`choices-grid ${hasImages ? "has-images" : ""} ${question.type === "multiple" ? "multi-grid" : ""} ${final ? "tool-grid" : ""}`}
          >
            {question.choices.map((choice, index) => (
              <ImageChoice
                key={choice.id}
                choice={choice}
                index={index}
                locale={locale}
                selected={state.selected.includes(choice.id)}
                disabled={resolved}
                isTool={final}
                onSelect={() =>
                  dispatch(
                    final
                      ? { type: "ANSWER", ids: [choice.id] }
                      : { type: "SELECT", id: choice.id },
                  )
                }
              />
            ))}
          </div>
          {!resolved && !final && (
            <div className="answer-toolbar">
              <button
                className="button hint-button"
                onClick={() => dispatch({ type: "HINT" })}
              >
                <Icon name="lightbulb" size={21} />
                {gameUI.hint[locale]}
              </button>
              <button
                className="button primary"
                disabled={!state.selected.length}
                onClick={() => dispatch({ type: "ANSWER" })}
              >
                {gameUI.check[locale]}
                <Icon name="arrow" size={21} />
              </button>
            </div>
          )}
        </div>
      </div>
      {state.showHint && !state.feedback && !resolved && (
        <div className="inline-hint" role="status">
          <Icon name="lightbulb" size={20} />
          <p>
            <strong>{gameUI.hintTitle[locale]}：</strong>
            {question.hint[locale]}
          </p>
        </div>
      )}
      <FeedbackPanel
        state={state}
        question={question}
        stage={stage}
        locale={locale}
        total={total}
        onNext={() => dispatch({ type: "NEXT" })}
        onAssist={() => dispatch({ type: "ASSIST" })}
      />
      {question.stage === "electron" && (
        <section className="observation-levels">
          <h3>{gameUI.scaleTitle[locale]}</h3>
          <ol>
            {observationLevels.map((level, i) => (
              <li key={level.icon}>
                <span className="level-icon">
                  <Icon name={level.icon} size={24} />
                </span>
                <div>
                  <strong>{level.tool[locale]}</strong>
                  <span>{level.label[locale]}</span>
                </div>
                {i < 2 && (
                  <Icon name="arrow" size={20} className="level-arrow" />
                )}
              </li>
            ))}
          </ol>
          <p>{gameUI.scaleNote[locale]}</p>
        </section>
      )}
    </article>
  );
}
