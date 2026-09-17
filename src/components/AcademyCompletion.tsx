import type { Locale } from "../data/types";
import { academyUI as a } from "../data/academyUI";

export function AcademyCompletion({ locale, onNotebook, onMissions }: {
  locale: Locale; onNotebook: () => void; onMissions: () => void;
}) {
  return <section className="observation-route academy-completion">
    <h2>{a.completedTitle[locale]}</h2>
    <p>{a.completedIntro[locale]}</p>
    <p><strong>{a.completedPrinciple[locale]}</strong></p>
    <p>{a.completedNote[locale]}</p>
    <div className="academy-actions">
      <button className="button primary" onClick={onNotebook}>{a.reviewNotebook[locale]}</button>
      <button className="button" onClick={onMissions}>{a.startMissions[locale]}</button>
    </div>
  </section>;
}
