import type { Locale, Question } from "../data/types";
import { gameUI } from "../data/gameUI";
import { questionsById, stages } from "../data/gameData";
import { questionOrder, type GameState } from "../game/gameState";
import { Icon } from "./Icon";
import { MicroscopyImage } from "./MicroscopyImage";

export function EvidenceCard({
  question,
  locale,
  index,
}: {
  question: Question;
  locale: Locale;
  index: number;
}) {
  const image =
    question.image ??
    question.choices.find((c) => question.correctAnswer.includes(c.id))?.image;
  const stage = stages.find(
    (s) => s.id === (question.microscopeType ?? question.stage),
  )!;
  return (
    <article className="evidence-card">
      <div className="evidence-card-heading">
        <span className="evidence-stamp">
          <Icon name={stage.icon} size={23} />
        </span>
        <div>
          <span className="evidence-number">
            {gameUI.evidenceLabel[locale]} {String(index + 1).padStart(2, "0")}
          </span>
          <h3>{question.title[locale]}</h3>
        </div>
        <Icon name="check" className="evidence-check" size={20} />
      </div>
      {image && <MicroscopyImage id={image} locale={locale} />}
      <p>{question.explanation[locale]}</p>
      <details className="fun-fact">
        <summary>{gameUI.funFact[locale]}</summary>
        <p>{question.funFact[locale]}</p>
      </details>
    </article>
  );
}
export function DetectiveNotebook({
  state,
  locale,
}: {
  state: GameState;
  locale: Locale;
}) {
  const ids = questionOrder(state).filter((id) => state.completed[id]);
  return (
    <>
      <p className="modal-intro">{gameUI.notebookIntro[locale]}</p>
      {ids.length ? (
        <div className="notebook-grid">
          {ids.map((id, index) => (
            <EvidenceCard
              key={id}
              question={questionsById[id]}
              locale={locale}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="empty-notebook">
          <Icon name="book" size={64} />
          <p>{gameUI.emptyNotebook[locale]}</p>
        </div>
      )}
    </>
  );
}
