import { useEffect, useRef, useState } from "react";
import type { Locale } from "../data/types";
import { academyModules } from "../data/academyData";
import { academyUI as a } from "../data/academyUI";
import { ConceptReveal } from "./ConceptReveal";
import { KnowledgeCard } from "./KnowledgeCard";
import { observationUI as o } from "../data/observationData";
export function AcademyModule({ index, locale, collected, onComplete, onBack, onNext }: {
  index: number; locale: Locale; collected: boolean; onComplete: () => void;
  onBack: () => void; onNext: () => void;
}) {
  const lesson = academyModules[index];
  const [review, setReview] = useState(false);
  const [step, setStep] = useState(0);
  const [observed, setObserved] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [review]);
  return <main id="main" className="game-main academy-module" tabIndex={-1}>
    <button className="button text-button" onClick={onBack}>← {a.back[locale]}</button>
    <div className="lesson-topline"><span>{a.academy[locale]} · {index + 1} / 6</span></div>
    <p className="review-prompt">{a.loop[locale]}</p>
    <article className="question-card">
      <h1 ref={heading} tabIndex={-1}>{(review ? lesson.sendoff : lesson.opening)[locale]}</h1>
      {!review ? <>
        <h2>{locale === "zh-TW" ? "① 看一看 · ② 動一動" : "① Look · ② Explore"}</h2>
        <ConceptReveal id={lesson.id} locale={locale} step={step} onStep={n => { setStep(n); setObserved(true); }} />
        {observed && <section className="feedback-panel feedback-success" aria-live="polite">
          <h2>{locale === "zh-TW" ? "③ 發現線索！" : "③ Discovery!"}</h2>
          <p>{lesson.clue[locale]}</p>
          <button className="button primary" onClick={() => { onComplete(); setReview(true); }}>④ {a.collect[locale]}</button>
        </section>}
      </> : <>
        <KnowledgeCard lesson={lesson} locale={locale} collected={collected} />
        <div className="academy-actions">
          <button className="button primary" onClick={onNext}>{index === academyModules.length - 1 ? o.practiceAction[locale] : a.next[locale]} →</button>
          <button className="button" onClick={() => setReview(false)}>{a.review[locale]}</button>
          <button className="button" onClick={onBack}>{a.back[locale]}</button>
        </div>
      </>}
    </article>
  </main>;
}
