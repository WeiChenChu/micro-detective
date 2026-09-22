import type { Locale } from "../data/types";
import type { AcademyLesson } from "../data/academyData";
import { academyUI as a } from "../data/academyUI";
import { Icon } from "./Icon";

export function KnowledgeCard({
  lesson,
  locale,
  collected,
}: {
  lesson: AcademyLesson;
  locale: Locale;
  collected: boolean;
}) {
  return (
    <article
      className={`evidence-card knowledge-card ${collected ? "collected-card" : ""}`}
    >
      <img className="knowledge-tool-image" src={lesson.image} alt={lesson.imageAlt[locale]} width={240} height={210} />
      <div className="evidence-card-heading">
        <span className="evidence-stamp">
          <Icon name={lesson.icon} size={25} />
        </span>
        <div>
          <span className="card-status">
            {collected ? `✓ ${a.collected[locale]}` : a.borrow[locale]}
          </span>
          <h3>
            {lesson.toolName[locale]}
          </h3>
        </div>
      </div>
      <p className="knowledge-summary"><strong>{lesson.shortDescription[locale]}</strong></p>
      <p>{lesson.concept[locale]}</p>
      {lesson.detailViews && <dl className="tool-detail-views">{lesson.detailViews.map(view => <div key={view.name.en}>
        <dt>{view.name[locale]}</dt><dd>{view.description[locale]}</dd>
      </div>)}</dl>}
      <details className="knowledge-clue">
        <summary>🔎 {a.clue[locale]}</summary>
        <p>{lesson.clue[locale]}</p>
      </details>
    </article>
  );
}
