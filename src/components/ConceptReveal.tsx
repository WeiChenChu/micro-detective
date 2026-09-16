import { academyVisuals as v, scaleSequence } from "../data/academyData";
import type { Locale } from "../data/types";
import { MicroscopyImage } from "./MicroscopyImage";
import { FluorescenceLab } from "./FluorescenceLab";
import { Icon } from "./Icon";
import { MagnifierLab } from "./MagnifierLab";
import { StereoLab } from "./StereoLab";
export function ConceptReveal({
  id,
  locale,
  step,
  onStep,
}: {
  id: string;
  locale: Locale;
  step: number;
  onStep: (n: number) => void;
}) {
  if (id === "magnifier")
    return <MagnifierLab locale={locale} onExplore={() => onStep(1)} />;
  if (id === "stereo")
    return <StereoLab locale={locale} step={step} onStep={onStep} />;
  if (id === "scale")
    return (
      <section className="scale-exhibit">
        <ol className="scale-sequence">
          {scaleSequence.map((item, i) => (
            <li key={i}>
              {item.image ? (
                <MicroscopyImage id={item.image} locale={locale} />
              ) : (
                <div className="scale-symbol">
                  <Icon name={item.icon!} size={i === 0 ? 60 : 24} />
                </div>
              )}
              <strong>{item.label[locale]}</strong>
              {i < 6 && (
                <span className="scale-arrow" aria-hidden="true">
                  ↓
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="exhibit-note">{v.scaleNote[locale]}</p>
      </section>
    );
  if (id === "fluorescence")
    return <FluorescenceLab locale={locale} step={step} onStep={onStep} />;
  if (id === "optical")
    return (
      <section className="optical-exhibit">
        <ol className="light-path">
          {v.lightPath.map((label, i) => (
            <li key={i}>
              {label[locale]}
              {i < 3 && <span aria-hidden="true"> →</span>}
            </li>
          ))}
        </ol>
        <div className="reveal-workspace">
          <div className={`light-window ${step ? "illuminated" : ""}`}>
            {step ? (
              <MicroscopyImage id="optical-onion" locale={locale} />
            ) : (
              <div className="dark-specimen">
                <Icon name="lightbulb" size={60} />
                <p>{v.dark[locale]}</p>
              </div>
            )}
          </div>
          <div className="exhibit-controls">
            <button
              className="button primary"
              aria-pressed={step === 1}
              onClick={() => onStep(step ? 0 : 1)}
            >
              {(step ? v.lightOff : v.lightOn)[locale]}
            </button>
            {step > 0 && <p role="status">{v.lightNote[locale]}</p>}
          </div>
        </div>
      </section>
    );
  return (
    <section className="electron-exhibit">
      <div className="reveal-workspace">
        <MicroscopyImage
          id={step ? "electron-mitochondrion" : "animal-cell"}
          locale={locale}
        />
        <div className="exhibit-controls">
          <p role="status">
            {(step ? v.electronAfter : v.electronBefore)[locale]}
          </p>
          <button
            className="button primary"
            onClick={() => onStep(step ? 0 : 1)}
          >
            {(step ? v.electronBefore : v.electronAction)[locale]}
          </button>
          <p className="exhibit-note">{v.electronNote[locale]}</p>
          <details className="fun-fact">
            <summary>{v.grayQuestion[locale]}</summary>
            <p>{v.grayAnswer[locale]}</p>
          </details>
        </div>
      </div>
    </section>
  );
}
