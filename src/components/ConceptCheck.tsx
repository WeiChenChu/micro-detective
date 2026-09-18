import { useState } from "react";
import type { AcademyLesson } from "../data/academyData";
import type { Locale } from "../data/types";

export function ConceptCheck({ check, locale, onComplete }: {
  check: NonNullable<AcademyLesson["check"]>; locale: Locale; onComplete?: () => void;
}) {
  const [selected, setSelected] = useState<string>();
  const choice = check.choices.find(c => c.id === selected);
  return <section className="concept-check" aria-label={locale === "zh-TW" ? "想一想" : "A quick reflection"}>
    <p className="exhibit-note">{locale === "zh-TW" ? "小挑戰 · 可以試試，也可以繼續探索" : "Mini challenge · try it or keep exploring"}</p>
    <h3>{check.question[locale]}</h3>
    <div className={`specimen-switch ${check.choices.some(c => c.image) ? "challenge-tools" : ""}`}>
      {check.choices.map(c => <button key={c.id} className="button" aria-pressed={selected === c.id}
        disabled={selected === check.answer}
        onClick={() => { setSelected(c.id); if (c.id === check.answer) onComplete?.(); }}>{c.image && <img src={c.image} alt={c.imageAlt?.[locale] ?? ""} width="120" height="105" />}<span>{c.label[locale]}</span></button>)}
    </div>
    <p role="status">{choice?.feedback[locale]}</p>
  </section>;
}
