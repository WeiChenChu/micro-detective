import { useState } from "react";
import type { Locale } from "../data/types";
import { academyStages, observationTools } from "../data/academyData";
import { academyChallenges, discoveries } from "../data/academyFlow";
import { ConceptReveal } from "./ConceptReveal";
import { KnowledgeCard } from "./KnowledgeCard";
import { ConceptCheck } from "./ConceptCheck";
export function AcademyModule({ index, locale, completed, learnedTools, onComplete, onBack, onNext }: {
  index: number; locale: Locale; completed: boolean; learnedTools: string[]; onComplete: () => void;
  onBack: () => void; onNext: () => void;
}) {
  const lesson = academyStages[index];
  const [step, setStep] = useState(0);
  const [observed, setObserved] = useState(false);
  const t = (zh: string, en: string) => locale === "zh-TW" ? zh : en;
  const ready = observed || completed;
  const challenge = academyChallenges[lesson.id];
  const tools = observationTools.filter(tool => lesson.toolIds.includes(tool.id));
  const inlineChallenge = ["stereo", "fluorescence", "electron"].includes(lesson.id);
  return <main id="main" className="game-main academy-module" tabIndex={-1}>
    <button className="button text-button" onClick={onBack}>← {t("課程首頁", "Academy home")}</button>
    <div className="lesson-topline"><span>{lesson.title[locale]} · {index + 1} / {academyStages.length}</span></div>
    <article className="question-card">
      <p className="eyebrow">{t("我想知道什麼？", "What do I want to know?")}</p>
      <h1>{lesson.opening[locale]}</h1>
      <ConceptReveal id={lesson.id} locale={locale} step={step} onStep={(n, complete = true) => { setStep(n); if (complete) setObserved(true); }} />
      {ready && <>
        {observed && <p className="lesson-discovery" role="status">{discoveries[lesson.id][locale]}</p>}
        {challenge && inlineChallenge && <ConceptCheck check={challenge} locale={locale} />}
      </>}
      <div id="academy-continue" className="academy-actions" tabIndex={-1}>
        <button className="button primary" disabled={!ready} onClick={() => { onComplete(); onNext(); }}>
          {index === academyStages.length - 1 ? t("完成訓練，看看工具總整理", "Finish training and review the tools") : `${t("繼續探索", "Keep exploring")}：${academyStages[index + 1].title[locale]}`} →
        </button>
      </div>
      {ready && challenge && !inlineChallenge && <details className="observation-notes">
        <summary>{t("再試一個小挑戰（自由選擇）", "Try a mini challenge (optional)")}</summary>
        <ConceptCheck check={challenge} locale={locale} />
      </details>}
      {ready && <details className="observation-notes">
        <summary>{t("翻看工具知識卡（自由閱讀）", "Read the tool knowledge cards (optional)")}</summary>
        {tools.map(tool => <div key={tool.id}>
          <KnowledgeCard lesson={tool} locale={locale} collected={learnedTools.includes(tool.id)} />
          {tool.check && <ConceptCheck check={tool.check} locale={locale} />}
        </div>)}
      </details>}
    </article>
  </main>;
}
