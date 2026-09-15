import { fluorescenceSteps } from "../data/gameData";
import type { Locale } from "../data/types";
import { gameUI } from "../data/gameUI";
import { MicroscopyImage } from "./MicroscopyImage";
import { Icon } from "./Icon";

export function FluorescenceLab({
  locale,
  step,
  onStep,
}: {
  locale: Locale;
  step: number;
  onStep: (n: number) => void;
}) {
  const current = fluorescenceSteps[step];
  return (
    <section className="fluorescence-lab" aria-label={gameUI.sequence[locale]}>
      <div className={`fluoro-view phase-${step}`}>
        <MicroscopyImage id={current.image} locale={locale} />
        {step === 1 && (
          <span className="experiment-chip">
            <Icon name="sparkle" size={16} />
            {gameUI.labelAdded[locale]}
          </span>
        )}
        {step === 2 && (
          <span className="experiment-chip">
            <Icon name="bolt" size={16} />
            {gameUI.lightOn[locale]}
          </span>
        )}
      </div>
      <div className="lab-controls">
        <h3>
          <Icon name="sparkle" size={20} />
          {gameUI.sequence[locale]}
        </h3>
        <div className="experiment-steps">
          {fluorescenceSteps.map((item, i) => (
            <button
              key={i}
              className={step === i ? "active" : ""}
              onClick={() => onStep(i)}
              aria-pressed={step === i}
            >
              <span>{i + 1}</span>
              {item.title[locale]}
              {step === i && <Icon name="check" size={16} />}
            </button>
          ))}
        </div>
        <p className="experiment-explanation" role="status">
          {current.description[locale]}
        </p>
        {step < 3 && (
          <button
            className="button small-button"
            onClick={() => onStep(step + 1)}
          >
            {gameUI.nextStep[locale]}
            <Icon name="arrow" size={17} />
          </button>
        )}
      </div>
    </section>
  );
}
