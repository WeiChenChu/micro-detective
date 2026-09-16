import { useState } from "react";
import type { AcademyLesson } from "../data/academyData";
import type { Locale } from "../data/types";

export function ConceptCheck({ check, locale, onComplete }: {
  check: NonNullable<AcademyLesson["check"]>; locale: Locale; onComplete: () => void;
}) {
  const [selected, setSelected] = useState<string>();
  const choice = check.choices.find(c => c.id === selected);
  return <section className="concept-check" aria-label={locale === "zh-TW" ? "想一想" : "A quick reflection"}>
    <h3>{check.question[locale]}</h3>
    <div className="specimen-switch">
      {check.choices.map(c => <button key={c.id} className="button" aria-pressed={selected === c.id}
        disabled={selected === check.answer}
        onClick={() => { setSelected(c.id); if (c.id === check.answer) onComplete(); }}>{c.label[locale]}</button>)}
    </div>
    <p role="status">{choice?.feedback[locale]}</p>
  </section>;
}
