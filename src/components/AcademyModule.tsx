import { useEffect, useRef, useState } from "react";
import type { Locale } from "../data/types";
import { academyModules } from "../data/academyData";
import { academyUI as a } from "../data/academyUI";
import { ConceptReveal } from "./ConceptReveal";
import { KnowledgeCard } from "./KnowledgeCard";
import { ImageChoice } from "./ImageChoice";
import { observationUI as o } from "../data/observationData";
export function AcademyModule({
  index,
  locale,
  collected,
  onComplete,
  onBack,
  onNext,
  onPractice,
}: {
  index: number;
  locale: Locale;
  collected: boolean;
  onComplete: () => void;
  onBack: () => void;
  onNext: () => void;
  onPractice: () => void;
}) {
  const lesson = academyModules[index];
  const [phase, setPhase] = useState<"observe" | "check" | "review">("observe");
  const [step, setStep] = useState(0);
  const [observed, setObserved] = useState(lesson.id === "scale");
  const [attempts, setAttempts] = useState(0);
  const [selected, setSelected] = useState("");
  const [solved, setSolved] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const feedback = useRef<HTMLDivElement>(null);
  useEffect(() => {
    heading.current?.focus();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [phase]);
  useEffect(() => {
    if (attempts)
      feedback.current?.scrollIntoView({
        block: "nearest",
        behavior: "instant",
      });
  }, [attempts]);
  const answer = (id: string) => {
    setSelected(id);
    setAttempts((n) => n + 1);
    setSolved(id === lesson.answer);
  };
  return (
    <main id="main" className="game-main academy-module" tabIndex={-1}>
      <button className="button text-button" onClick={onBack}>
        ← {a.back[locale]}
      </button>
      <div className="lesson-topline">
        <span>
          {a.academy[locale]} · 0{index}
        </span>
        <span>
          {phase === "observe"
            ? a.learn[locale]
            : phase === "check"
              ? a.apply[locale]
              : a.knowledge[locale]}
        </span>
      </div>
      <article className="question-card">
        <h1 ref={heading} tabIndex={-1}>
          {phase === "observe"
            ? lesson.opening[locale]
            : phase === "check"
              ? lesson.question[locale]
              : lesson.sendoff[locale]}
        </h1>
        {phase === "observe" && (
          <>
            <ConceptReveal
              id={lesson.id}
              locale={locale}
              step={step}
              onStep={(n) => {
                setStep(n);
                if (n === (lesson.id === "fluorescence" ? 3 : 1))
                  setObserved(true);
              }}
            />
            <p className="lesson-concept">{lesson.concept[locale]}</p>
            <div className="academy-actions">
              <button
                className="button primary"
                disabled={!observed}
                onClick={() => setPhase("check")}
              >
                {a.check[locale]} →
              </button>
            </div>
          </>
        )}
        {phase === "check" && (
          <>
            <div
              className="choices-grid academy-answers"
              role="group"
              aria-label={lesson.question[locale]}
            >
              {lesson.choices.map((choice, i) => (
                <ImageChoice
                  key={choice.id}
                  choice={choice}
                  index={i}
                  locale={locale}
                  selected={selected === choice.id}
                  disabled={solved}
                  onSelect={() => answer(choice.id)}
                />
              ))}
            </div>
            {attempts > 0 && (
              <div
                ref={feedback}
                className={`feedback-panel ${solved ? "feedback-success" : "feedback-hint"}`}
              >
                <div role="status" aria-live="polite" aria-atomic="true">
                  <h2>{(solved ? a.success : a.retry)[locale]}</h2>
                  <p>
                    {
                      (solved
                        ? lesson.feedback
                        : attempts >= 2
                          ? lesson.strongHint
                          : lesson.hint)[locale]
                    }
                  </p>
                </div>
                {!solved && attempts >= 2 && (
                  <button
                    className="button"
                    onClick={() => answer(lesson.answer)}
                  >
                    {a.assist[locale]}
                  </button>
                )}
                {solved && (
                  <button
                    className="button primary"
                    onClick={() => {
                      onComplete();
                      setPhase("review");
                    }}
                  >
                    {a.collect[locale]} →
                  </button>
                )}
              </div>
            )}
            {!solved && (
              <button
                className="button text-button"
                onClick={() => setPhase("observe")}
              >
                ← {a.review[locale]}
              </button>
            )}
          </>
        )}
        {phase === "review" && (
          <>
            <KnowledgeCard
              lesson={lesson}
              locale={locale}
              collected={collected}
            />
            <p className="review-prompt">{a.loop[locale]}</p>
            <div className="academy-actions">
              <button className="button primary" onClick={onNext}>
                {index === academyModules.length - 1
                  ? o.practiceAction[locale]
                  : a.next[locale]}{" "}
                →
              </button>
              {lesson.id === "stereo" && (
                <button className="button" onClick={onPractice}>
                  {o.practiceAction[locale]} →
                </button>
              )}
              <button className="button" onClick={onBack}>
                {a.back[locale]}
              </button>
            </div>
          </>
        )}
      </article>
    </main>
  );
}
