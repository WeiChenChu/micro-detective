import type { Dispatch } from "react";
import type { Locale, Question, Stage } from "../data/types";
import type { Action, GameState } from "../game/gameState";
import { gameUI } from "../data/gameUI";
import { Icon } from "./Icon";
import { ImageChoice } from "./ImageChoice";
import { MicroscopyImage } from "./MicroscopyImage";
import { EvidenceTargets } from "./EvidenceTargets";
import { FeedbackPanel } from "./FeedbackPanel";
import { images } from "../data/images";
import { ImageAttribution } from "./ImageAttribution";

export function QuestionCard({
  state,
  question,
  stage,
  locale,
  dispatch,
  total,
  finalIndex,
  finalTotal,
  nextLabel,
}: {
  state: GameState;
  question: Question;
  stage: Stage;
  locale: Locale;
  dispatch: Dispatch<Action>;
  total: number;
  finalIndex: number;
  finalTotal: number;
  nextLabel?: string;
}) {
  const final = question.stage === "final";
  const toolSelection = !!question.toolSelection;
  const resolved = !!state.completed[question.id];
  const hasImages = question.choices.some((c) => c.image);
  const evidenceImage = question.image ? images[question.image] : undefined;
  const realMission = question.stage === "mystery" && evidenceImage?.type === "real";
  return (
    <article
      className={`question-card ${final ? "final-question" : ""} ${question.stage === "mystery" ? "mystery-question" : ""}`}
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
      {!(final && resolved) && !question.evidenceTargets && <p className="question-instruction">
        {toolSelection
          ? gameUI.finalInstruction[locale]
          : question.type === "multiple"
            ? gameUI.selectMany[locale]
            : hasImages
              ? gameUI.selectOne[locale]
              : gameUI.selectAnswer[locale]}
      </p>}
      {!(final && resolved) && <div className={question.image ? "final-workspace" : ""}>
        {final && !question.image && <div className="mystery-sample"><span aria-hidden="true">?</span><p>{question.observation?.[locale]}</p></div>}
        {question.image && (
          <div className="final-evidence">
            {question.evidenceTargets ? <EvidenceTargets question={question} locale={locale} selected={state.selected} disabled={resolved} onSelect={id => dispatch({ type: "ANSWER", ids: [id] })} /> : <MicroscopyImage id={question.image} locale={locale} showCaption={realMission ? false : undefined} showAttribution={!realMission} />}
            <div className="observation-clue">
              <span>
                <Icon name="search" size={19} />
                {gameUI.clue[locale]}
              </span>
              <p>{(question.observation ?? question.hint)[locale]}</p>
            </div>
          </div>
        )}
        <div className="answer-area">
          {!question.evidenceTargets && <div
            role="group"
            aria-labelledby="question-heading"
            className={`choices-grid ${hasImages ? "has-images" : ""} ${question.type === "multiple" ? "multi-grid" : ""} ${toolSelection ? "tool-grid" : ""}`}
          >
            {question.choices.map((choice, index) => (
              <ImageChoice
                key={choice.id}
                choice={choice}
                index={index}
                locale={locale}
                selected={state.selected.includes(choice.id)}
                disabled={resolved}
                isTool={toolSelection}
                onSelect={() =>
                  dispatch(
                    question.type === "single"
                      ? { type: "ANSWER", ids: [choice.id] }
                      : { type: "SELECT", id: choice.id },
                  )
                }
              />
            ))}
          </div>}
          {!resolved && !toolSelection && (
            <div className="answer-toolbar">
              <button
                className="button hint-button"
                disabled={state.showHint}
                aria-expanded={state.showHint}
                onClick={() => dispatch({ type: "HINT" })}
              >
                <Icon name="lightbulb" size={21} />
                {gameUI.hint[locale]}
              </button>
              {question.type === "multiple" && <button
                className="button primary"
                disabled={!state.selected.length}
                onClick={() => dispatch({ type: "ANSWER" })}
              >
                {gameUI.check[locale]}
                <Icon name="arrow" size={21} />
              </button>}
            </div>
          )}
        </div>
      </div>}
      {state.showHint && !state.feedback && !resolved && (
        <div className="inline-hint" role="status">
          <Icon name="lightbulb" size={20} />
          <p>
            <strong>{gameUI.hintTitle[locale]}：</strong>
            {
              (state.attempts >= 2
                ? (question.strongHint ?? question.explanation)
                : question.hint)[locale]
            }
          </p>
        </div>
      )}
      <FeedbackPanel
        nextLabel={nextLabel}
        state={state}
        question={question}
        stage={stage}
        locale={locale}
        total={total}
        onNext={() => dispatch({ type: "NEXT" })}
        onAssist={() => dispatch({ type: "ASSIST" })}
      />
      {realMission && <ImageAttribution image={evidenceImage} locale={locale} compact />}
    </article>
  );
}
