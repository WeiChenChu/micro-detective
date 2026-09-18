import type { Locale, Question } from "../data/types";
import { MicroscopyImage } from "./MicroscopyImage";
export function EvidenceTargets({ question, locale, selected, disabled, onSelect }: {
  question: Question; locale: Locale; selected: string[]; disabled: boolean; onSelect: (id: string) => void;
}) {
  return <div>
    <div className="evidence-targets">
      <MicroscopyImage id={question.image!} locale={locale} />
      <div className="evidence-target-layer" role="group" aria-labelledby="question-heading">
        {question.evidenceTargets!.map((target, index) => {
          const choice = question.choices.find(c => c.id === target.choiceId)!;
          return <button className="evidence-target" key={choice.id} style={{ left: `${target.x}%`, top: `${target.y}%` }}
            aria-label={`${index + 1} ${choice.title[locale]}`} aria-pressed={selected.includes(choice.id)} disabled={disabled}
            onClick={() => onSelect(choice.id)}><span>{index + 1}</span></button>;
        })}
      </div>
    </div>
    <p className="evidence-key">{question.evidenceTargets!.map((target, index) => `${index + 1} ${question.choices.find(c => c.id === target.choiceId)!.title[locale]}`).join("　·　")}</p>
  </div>;
}
