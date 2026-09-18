import { academyModules } from "../data/academyData";
import type { Locale } from "../data/types";
import { ToolSummary } from "./ToolSummary";
import { AcademyCompletion } from "./AcademyCompletion";
export function AcademyHome({ locale, completed, onModule, onMissions, onNotebook }: {
  locale: Locale; completed: string[]; onModule: (id: number) => void;
  onMissions: () => void; onNotebook: () => void;
}) {
  const next = academyModules.findIndex(lesson => !completed.includes(lesson.id));
  const t = (zh: string, en: string) => locale === "zh-TW" ? zh : en;
  return <main id="main" tabIndex={-1} className="academy-home game-main">
    <header className="academy-heading">
      <p className="eyebrow">DETECTIVE ACADEMY</p>
      <h1>{t("小偵探課程", "Detective Academy")}</h1>
      <progress max={6} value={completed.length} aria-label={t("完成的課程", "Completed lessons")} />
    </header>
    {next === -1 ? <>
      <AcademyCompletion locale={locale} onNotebook={onNotebook} onMissions={onMissions} />
      <ToolSummary locale={locale} />
    </> : <section className="observation-route">
      <h2>{t("準備好成為微觀小偵探了嗎？", "Ready to become a microscopic detective?")}</h2>
      <p>{t("一起找出最適合觀察線索的工具！", "Discover the tools that help us find clues!")}</p>
      <button className="button primary" onClick={() => onModule(next)}>{next === 0 ? t("開始訓練", "Start training") : t("繼續訓練", "Continue training")} →</button>
    </section>}
    {completed.length > 0 && <details className="course-map">
      <summary>{t("回顧學過的工具", "Review tools you have explored")}</summary>
      <div className="specimen-switch">{academyModules.map((lesson, index) => completed.includes(lesson.id) &&
        <button className="button" key={lesson.id} onClick={() => onModule(index)}>{lesson.toolName[locale]}</button>)}</div>
    </details>}
  </main>;
}
