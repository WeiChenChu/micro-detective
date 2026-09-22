import { useState } from "react";
import type { Locale } from "../data/types";
import { academyModules } from "../data/academyData";
import { academyChallenges, discoveries } from "../data/academyFlow";
import { ConceptReveal } from "./ConceptReveal";
import { KnowledgeCard } from "./KnowledgeCard";
import { ConceptCheck } from "./ConceptCheck";
export function AcademyModule({ index, locale, collected, onComplete, onBack, onNext }: {
  index: number; locale: Locale; collected: boolean; onComplete: () => void;
  onBack: () => void; onNext: () => void;
}) {
  const lesson = academyModules[index];
  const [step, setStep] = useState(0);
  const [observed, setObserved] = useState(false);
  const t = (zh: string, en: string) => locale === "zh-TW" ? zh : en;
  const ready = observed || collected;
  const challenge = academyChallenges[lesson.id];
  const inlineChallenge = ["stereo", "fluorescence", "electron"].includes(lesson.id);
  return <main id="main" className="game-main academy-module" tabIndex={-1}>
    <button className="button text-button" onClick={onBack}>← {t("課程首頁", "Academy home")}</button>
    <div className="lesson-topline"><span>{lesson.toolName[locale]} · {index + 1} / 6</span></div>
    <article className="question-card">
      <h1>{lesson.opening[locale]}</h1>
      <ConceptReveal id={lesson.id} locale={locale} step={step} onStep={(n, complete = true) => { setStep(n); if (complete) setObserved(true); }} />
      {ready && <>
        <p className="lesson-discovery" role="status">{discoveries[lesson.id][locale]}</p>
        {challenge && inlineChallenge && <ConceptCheck check={challenge} locale={locale} />}
      </>}
      <div id="academy-continue" className="academy-actions" tabIndex={-1}>
        <button className="button primary" disabled={!ready} onClick={() => { onComplete(); onNext(); }}>
          {index === 5 ? t("完成訓練，看看工具總整理", "Finish training and review the tools") : `${t("繼續探索", "Keep exploring")}：${academyModules[index + 1].toolName[locale]}`} →
        </button>
      </div>
      {ready && challenge && !inlineChallenge && <details className="observation-notes">
        <summary>{t("再試一個小挑戰（自由選擇）", "Try a mini challenge (optional)")}</summary>
        <ConceptCheck check={challenge} locale={locale} />
      </details>}
      {ready && <details className="observation-notes">
        <summary>{t("翻看這張知識卡（自由閱讀）", "Read this knowledge card (optional)")}</summary>
        <KnowledgeCard lesson={lesson} locale={locale} collected={collected} />
        {lesson.check && <ConceptCheck check={lesson.check} locale={locale} />}
      </details>}
    </article>
  </main>;
}
