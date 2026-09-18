import type { Locale } from "../data/types";
import { academyUI as a } from "../data/academyUI";

export function AcademyCompletion({ locale, onNotebook, onMissions }: {
  locale: Locale; onNotebook: () => void; onMissions: () => void;
}) {
  return <section className="observation-route academy-completion">
    <h2>{a.completedTitle[locale]}</h2>
    <p><strong>{locale === "zh-TW" ? "不是放得越大越好。" : "Bigger is not always better."}</strong></p>
    <p><strong>{a.completedPrinciple[locale]}</strong></p>
    <p>{a.completedNote[locale]}</p>
    <div className="academy-actions">
      <button className="button primary" onClick={onMissions}>{a.startMissions[locale]}</button>
      <button className="button" onClick={onNotebook}>{a.reviewNotebook[locale]}</button>
    </div>
  </section>;
}
