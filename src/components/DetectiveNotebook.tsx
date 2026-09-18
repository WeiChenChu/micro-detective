import type { Locale, Question } from "../data/types";
import { gameUI } from "../data/gameUI";
import { questionsById, stages, toolIcons } from "../data/missionData";
import { questionOrder, type GameState } from "../game/gameState";
import { Icon } from "./Icon";
import { MicroscopyImage } from "./MicroscopyImage";
import { academyModules } from "../data/academyData";
import { academyUI as a } from "../data/academyUI";
import { KnowledgeCard } from "./KnowledgeCard";
import { InvestigationEvidence } from "./InvestigationEvidence";

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
  const icon = question.microscopeType
    ? toolIcons[question.microscopeType]
    : stages.find((s) => s.id === question.stage)!.icon;
  return (
    <article className="evidence-card">
      <div className="evidence-card-heading">
        <span className="evidence-stamp">
          <Icon name={icon} size={23} />
        </span>
        <div>
          <span className="evidence-number">
            {gameUI.evidenceLabel[locale]} {String(index + 1).padStart(2, "0")}
          </span>
          <h3>{question.title[locale]}</h3>
        </div>
        <Icon name="check" className="evidence-check" size={20} />
      </div>
      {question.investigation ? <InvestigationEvidence question={question} locale={locale} /> : image && <MicroscopyImage id={image} locale={locale} />}
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
  review = false,
  onMissions,
}: {
  state: GameState;
  locale: Locale;
  review?: boolean;
  onMissions?: () => void;
}) {
  const ids = questionOrder(state).filter((id) => state.completed[id]);
  return (
    <>
      {review && <section className="knowledge-clue notebook-review">
        <h3>{a.notebookReviewTitle[locale]}</h3>
        <p>{a.notebookReviewNote[locale]}</p>
      </section>}
      <p className="modal-intro">{gameUI.notebookIntro[locale]}</p>
      <h3>
        {a.knowledge[locale]} · {state.academyCompleted.length} /{" "}
        {academyModules.length}
      </h3>
      <div className="notebook-grid">
        {academyModules.map((lesson) => (
          <KnowledgeCard
            key={lesson.id}
            lesson={lesson}
            locale={locale}
            collected={state.academyCompleted.includes(lesson.id)}
          />
        ))}
      </div>
      {onMissions && <div className="academy-actions"><button className="button" onClick={onMissions}>{a.startMissions[locale]}</button></div>}
      <h3 className="notebook-section-title">
        {gameUI.evidenceLabel[locale]} · {ids.length}
      </h3>
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
