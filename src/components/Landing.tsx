import type { Locale } from "../data/types";
import { ui } from "../data/ui";
import { academyUI as a } from "../data/academyUI";
import { Icon } from "./Icon";
import { MicroscopyImage } from "./MicroscopyImage";

export function Landing({
  locale,
  onStart,
  hasProgress = false,
  onResume,
  onAcademy,
}: {
  locale: Locale;
  onStart: () => void;
  hasProgress?: boolean;
  onResume?: () => void;
  onAcademy: () => void;
}) {
  return (
    <main id="main" className="landing landing-v2" tabIndex={-1}>
      <section className="academy-welcome">
        <div>
          <p className="eyebrow">MICROSCOPIC DETECTIVE · DISCOVERY LAB</p>
          <h1>
            {ui.name[locale]}
            <span className="title-period">.</span>
          </h1>
          <p>{a.intro[locale]}</p>
        </div>
        <span className="welcome-icon" aria-hidden="true">
          <Icon name="microscope" size={90} />
        </span>
      </section>
      <section className="path-grid" aria-label={ui.routeTitle[locale]}>
        <article className="path-card academy-path">
          <span className="path-kicker">{a.firstVisit[locale]}</span>
          <h2>{a.academy[locale]}</h2>
          <p>{a.academyDescription[locale]}</p>
          <div className="path-specimens" aria-hidden="true">
            <MicroscopyImage id="optical-onion" locale={locale} />
            <MicroscopyImage id="fluorescence-cell" locale={locale} />
          </div>
          <span className="path-meta">{a.duration[locale]}</span>
          <button className="button primary" onClick={onAcademy}>
            {a.enterAcademy[locale]} <Icon name="arrow" />
          </button>
        </article>
        <article className="path-card missions-path">
          <span className="path-kicker">{a.prepared[locale]}</span>
          <h2>{a.missions[locale]}</h2>
          <p>{a.missionsDescription[locale]}</p>
          <div className="path-specimens" aria-hidden="true">
            <MicroscopyImage id="zebrafish" locale={locale} />
            <MicroscopyImage id="electron-surface" locale={locale} />
          </div>
          <span className="path-meta">{a.missionDuration[locale]}</span>
          <button
            className="button primary"
            onClick={hasProgress ? onResume : onStart}
          >
            {(hasProgress ? a.resume : a.enterMissions)[locale]}{" "}
            <Icon name="arrow" />
          </button>
        </article>
      </section>
      <p className="path-freedom">{a.freedom[locale]}</p>
    </main>
  );
}
