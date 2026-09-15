import type { Locale } from "../data/types";
import { ui } from "../data/ui";
import { Icon } from "./Icon";

const route = [
  ["eye", ui.eye],
  ["microscope", ui.optical],
  ["sparkle", ui.fluorescent],
  ["bolt", ui.electron],
  ["detective", ui.final],
] as const;

export function Landing({
  locale,
  onStart,
  hasProgress = false,
  onResume,
}: {
  locale: Locale;
  onStart: () => void;
  hasProgress?: boolean;
  onResume?: () => void;
}) {
  return (
    <main id="main" className="landing" tabIndex={-1}>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="tiny-star">✳</span> {ui.eyebrow[locale]}
          </div>
          <h1>
            {ui.name[locale]}
            <span className="title-period">.</span>
          </h1>
          {locale === "zh-TW" && (
            <div className="english-title" lang="en">
              MICROSCOPIC DETECTIVE
            </div>
          )}
          <h2>{ui.tagline[locale]}</h2>
          <p className="hero-intro">{ui.intro[locale]}</p>
          <div className="hero-actions">
            <button
              className="button primary start-button"
              onClick={hasProgress ? onResume : onStart}
            >
              {hasProgress ? ui.resume[locale] : ui.start[locale]}{" "}
              <Icon name="arrow" />
            </button>
            {hasProgress && (
              <button className="button text-button" onClick={onStart}>
                {ui.newGame[locale]}
              </button>
            )}
          </div>
          <div className="hero-meta">
            <span>
              <Icon name="clock" size={18} />
              {ui.duration[locale]}
            </span>
            <span>
              <Icon name="people" size={18} />
              {ui.audience[locale]}
            </span>
          </div>
        </div>
        <div className="specimen-board" aria-label={ui.heroCaption[locale]}>
          <div className="board-top">
            <span>
              <i /> {ui.missionTag[locale]}
            </span>
            <span>NO. 001</span>
          </div>
          <div className="scope-orbit">
            <span className="orbit-label">LOOK CLOSER</span>
            <div className="scope-lens">
              <Icon name="microscope" size={180} />
              <span className="lens-spark lens-spark-one">✦</span>
              <span className="lens-spark lens-spark-two">✧</span>
            </div>
          </div>
          <span className="board-coordinate">X: 024 / Y: 008</span>
          <div className="floating-tag">
            <Icon name="search" size={20} />
            {ui.heroCaption[locale]}
          </div>
          <div className="board-bottom">
            <span>01 — 05</span>
            <p>{ui.heroNote[locale]}</p>
            <Icon name="arrow" />
          </div>
        </div>
      </section>
      <section className="route-section" aria-label={ui.routeTitle[locale]}>
        <div className="route-heading">
          <h2>{ui.routeTitle[locale]}</h2>
          <p>{ui.routeNote[locale]}</p>
        </div>
        <ol className="route-list">
          {route.map(([icon, title], i) => (
            <li key={icon}>
              <span className="route-number">0{i + 1}</span>
              <span className={`route-icon tone-${i}`}>
                <Icon name={icon} size={25} />
              </span>
              <span>{title[locale]}</span>
              {i < 4 && <Icon name="arrow" size={17} className="route-arrow" />}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
