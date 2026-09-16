import type { Locale, Question } from "../data/types";
import { finalQuestions } from "../data/missionData";
import { investigationUI as i } from "../data/investigationData";
import { MicroscopyImage } from "./MicroscopyImage";

export function InvestigationEvidence({ question, locale }: { question: Question; locale: Locale }) {
  const record = question.investigation;
  if (!record) return null;
  return <section className="investigation-evidence">
    <MicroscopyImage id={record.evidenceImage} locale={locale} />
    <p className="evidence-caption">{record.evidence[locale]}</p>
    <details className="observation-notes"><summary>{locale === "zh-TW" ? "觀察記錄 / 樣品準備" : "Observation notes / specimen preparation"}</summary><p>{record.preparation[locale]}</p></details>
    {record.nextQuestion && <aside className="new-question"><h3>{i.next[locale]}</h3><p>{record.nextQuestion[locale]}</p></aside>}
  </section>;
}

export function InvestigationSummary({ locale }: { locale: Locale }) {
  return <section className="investigation-summary">
    <h2>{i.summary[locale]}</h2>
    <ol>{finalQuestions.map(q => <li key={q.id}>
      <strong>{q.title[locale]}</strong>
      <p>{q.choices.find(c => c.id === q.correctAnswer[0])?.title[locale]} → {q.investigation?.evidenceTitle[locale]}</p>
    </li>)}</ol>
    <p className="central-message">{i.conclusion[locale]}</p>
  </section>;
}
