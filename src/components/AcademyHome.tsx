import { observationUI as o } from "../data/observationData";
import { academyModules } from "../data/academyData";
import { academyUI as a } from "../data/academyUI";
import type { Locale } from "../data/types";
import { Icon } from "./Icon";
import { ToolSummary } from "./ToolSummary";
export function AcademyHome({
  locale,
  completed,
  onModule,
  onMissions,
  onPractice,
}: {
  locale: Locale;
  completed: string[];
  onModule: (id: number) => void;
  onMissions: () => void;
  onPractice: () => void;
}) {
  return (
    <main id="main" tabIndex={-1} className="academy-home game-main">
      <header className="academy-heading">
        <p className="eyebrow">DETECTIVE ACADEMY</p>
        <h1>{a.academy[locale]}</h1>
        <p>{a.duration[locale]}</p>
        <p>
          {a.knowledge[locale]} {completed.length} / {academyModules.length}
        </p>
        <progress
          max={academyModules.length}
          value={completed.length}
          aria-label={a.knowledge[locale]}
        />
      </header>
      <section className="observation-route">
        <p>{o.order[locale]}</p>
        <p>{o.orderNote[locale]}</p>
        <details>
          <summary>{o.familyTitle[locale]}</summary>
          <p>{o.family[locale]}</p>
        </details>
      </section>
      <div className="academy-grid">
        {academyModules.map((lesson, index) => (
          <button
            className={`academy-door ${completed.includes(lesson.id) ? "is-collected" : ""}`}
            key={lesson.id}
            onClick={() => onModule(index)}
          >
            <span className="door-number">0{index}</span>
            <Icon name={lesson.icon} size={36} />
            <h2>{lesson.title[locale]}</h2>
            <p>{lesson.opening[locale]}</p>
            <span className="door-action">
              {completed.includes(lesson.id)
                ? `✓ ${a.collected[locale]} · ${a.review[locale]}`
                : a.learn[locale]}{" "}
              →
            </span>
          </button>
        ))}
      </div>
      {completed.length === academyModules.length && (
        <>
          <h2 className="academy-ready">🎉 {a.ready[locale]}</h2>
          <ToolSummary locale={locale} />
        </>
      )}
      <section className="practice-entry">
        <h2>{o.practice[locale]}</h2>
        <p>{o.practiceIntro[locale]}</p>
        <button className="button primary" onClick={onPractice}>
          {o.practiceAction[locale]} →
        </button>
      </section>
      <div className="academy-actions">
        <button className="button primary" onClick={onMissions}>
          {a.missions[locale]} →
        </button>
        <p>{a.freedom[locale]}</p>
      </div>
    </main>
  );
}
