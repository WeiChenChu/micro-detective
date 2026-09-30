import type { Locale, Question } from "../data/types";
import { investigationQuestions } from "../data/missionData";
import { investigationUI as i } from "../data/investigationData";
import { ToolVisual } from "./ToolVisual";
import { MicroscopyImage } from "./MicroscopyImage";

export function InvestigationEvidence({ question, locale }: { question: Question; locale: Locale }) {
  const record = question.investigation;
  if (!record) return null;
  return <section className="investigation-evidence">
    <MicroscopyImage id={record.evidenceImage} locale={locale} showCaption />
    <p className="evidence-caption">{record.evidence[locale]}</p>
    <details className="observation-notes"><summary>{locale === "zh-TW" ? "觀察記錄 / 樣品準備" : "Observation notes / specimen preparation"}</summary><p>{record.preparation[locale]}</p></details>
    {record.nextQuestion && <aside className="new-question"><h3>{i.next[locale]}</h3><p>{record.nextQuestion[locale]}</p></aside>}
  </section>;
}

export function InvestigationSummary({ locale }: { locale: Locale }) {
  return <section className="investigation-summary">
    <h2>{i.summary[locale]}</h2>
    <p>{i.explanation[locale]}</p>
    <ol>{investigationQuestions.map(q => {
      const tool = q.choices.find(c => c.id === q.correctAnswer[0])!;
      return <li key={q.id}>
        <div className="case-summary-step">
          <ToolVisual tool={tool.toolVisualId!} variant="compact" locale={locale} decorative />
          <div><strong>{q.title[locale]}</strong><p>{tool.title[locale]} → {q.investigation?.evidenceTitle[locale]}</p></div>
        </div>
      </li>;
    })}</ol>
    <p className="central-message">{i.conclusion[locale]}</p>
    <p className="case-model-note">{i.note[locale]}</p>
  </section>;
}
