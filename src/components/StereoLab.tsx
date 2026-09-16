import type { Locale } from "../data/types";
import { observationUI as o } from "../data/observationData";
import { MicroscopyImage } from "./MicroscopyImage";
export function StereoLab({
  locale,
  step,
  onStep,
}: {
  locale: Locale;
  step: number;
  onStep: (n: number) => void;
}) {
  return (
    <section className="stereo-lab">
      <h2>{o.stereoAliases[locale]}</h2>
      <p className="exhibit-note" lang="en">
        {o.stereoEnglish}
      </p>
      <ul className="stereo-features">
        {o.stereoFeatures.map((feature, i) => (
          <li key={i}>{feature[locale]}</li>
        ))}
      </ul>
      <div className="reveal-workspace">
        <div className={`stereo-view ${step ? "stereo-close" : ""}`}>
          <MicroscopyImage id="fruit-fly" locale={locale} />
        </div>
        <div className="exhibit-controls">
          <div className="specimen-switch">
            <button
              className="button"
              aria-pressed={step === 0}
              onClick={() => onStep(0)}
            >
              {o.stereoLook[locale]}
            </button>
            <button
              className="button primary"
              aria-pressed={step === 1}
              onClick={() => onStep(1)}
            >
              {o.stereoDetail[locale]}
            </button>
          </div>
          <p role="status">{(step ? o.stereoClose : o.stereoWhole)[locale]}</p>
          <p>{o.stereoDepth[locale]}</p>
        </div>
      </div>
      <p className="lesson-concept">{o.stereoExamples[locale]}</p>
      <p className="exhibit-note">{o.stereoClarify[locale]}</p>
    </section>
  );
}
