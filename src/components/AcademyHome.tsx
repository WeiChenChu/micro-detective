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
  const next = academyModules.findIndex(lesson => !completed.includes(lesson.id));
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
      {next === -1 ? <section className="observation-route">
        <h2>🎉 {a.ready[locale]}</h2>
        <button className="button primary" onClick={onMissions}>{a.missions[locale]} →</button>
        <ToolSummary locale={locale} />
      </section> : <section className="observation-route">
        <h2>{locale === "zh-TW" ? "30 秒工具地圖" : "A 30-second tool map"}</h2>
        <p>{o.order[locale]}</p>
        <p>{locale === "zh-TW" ? "有些工具適合看小動物的外觀，有些能看細胞、找特定線索，有些能看更細微的結構。今天不用背工具或倍率，我們一邊觀察、一邊發現什麼時候需要它們。" : "Some tools reveal small animals, some show cells or specific clues, and some reveal finer structures. No names or magnifications to memorize: discover when you need each tool as you explore."}</p>
        <p>{o.orderNote[locale]}</p>
        <button className="button primary" onClick={() => onModule(next)}>{next === 0 ? (locale === "zh-TW" ? "從一隻果蠅開始" : "Start with a fruit fly") : `${a.next[locale]}：${academyModules[next].title[locale]}`} →</button>
        <details>
          <summary>{o.familyTitle[locale]}</summary>
          <p>{o.family[locale]}</p>
        </details>
      </section>}
      <details className="course-map">
      <summary>{a.back[locale]}</summary>
      <div className="academy-grid">
        {academyModules.map((lesson, index) => (
          <button
            className={`academy-door ${completed.includes(lesson.id) ? "is-collected" : ""}`}
            key={lesson.id}
            onClick={() => onModule(index)}
          >
            <span className="door-number">0{index + 1}</span>
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
      </details>
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
