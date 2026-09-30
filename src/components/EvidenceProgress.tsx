import { bi, type Locale } from "../data/types";
import { currentQuestion, type GameState } from "../game/gameState";
import { investigationQuestions } from "../data/missionData";
import { investigationUI as i } from "../data/investigationData";
import { MicroscopyImage } from "./MicroscopyImage";

const labels = [bi("尾鰭長回", "Fin regrowth"), bi("傷口細胞", "Cells near wound"), bi("增殖標記", "Proliferation labels")];

export function EvidenceProgress({ state, locale, review = false }: { state: GameState; locale: Locale; review?: boolean }) {
  return <section className={`case-evidence-tracker ${review ? "evidence-review" : ""}`} aria-label={i.evidence[locale]}>
    <h2>{i.evidence[locale]} · {investigationQuestions.filter(q => state.completed[q.id]).length} / 3</h2>
    <ol>{investigationQuestions.map((q, index) => {
      const found = !!state.completed[q.id];
      const record = q.investigation!;
      return <li key={q.id} aria-current={state.screen === "game" && currentQuestion(state).id === q.id ? "step" : undefined}>
        <span className="evidence-slot"><strong>{String(index + 1).padStart(2, "0")}</strong> {found ? "✓" : "🔒"}<span className="sr-only">{found ? (locale === "zh-TW" ? "已發現" : "Discovered") : i.locked[locale]}</span></span>
        {found && review ? <div className="evidence-review-clue">
          <MicroscopyImage id={record.evidenceImage} locale={locale} />
          <strong>{record.evidenceTitle[locale].replace(/^.*?[:：]\s*/, "")}</strong>
        </div> : found ? <details>
          <summary>{labels[index][locale]}</summary>
          <MicroscopyImage id={record.evidenceImage} locale={locale} showCaption />
        </details> : <span>{i.locked[locale]} · ?</span>}
      </li>;
    })}</ol>
  </section>;
}
