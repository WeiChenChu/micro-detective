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
      <div className="evidence-card-heading">
        <span className="evidence-stamp">
          <Icon name={lesson.icon} size={25} />
        </span>
        <div>
          <span className="card-status">
            {collected ? `✓ ${a.collected[locale]}` : a.borrow[locale]}
          </span>
          <h3>
            {lesson.id === "scale" ? a.why[locale] : lesson.title[locale]}
          </h3>
        </div>
      </div>
      <p>{lesson.concept[locale]}</p>
      <p className="knowledge-clue">
        <strong>🔎 {a.clue[locale]}</strong>
        <br />
        {lesson.clue[locale]}
      </p>
    </article>
  );
}
