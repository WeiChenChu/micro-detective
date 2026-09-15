import type { Locale } from "../data/types";
import { gameUI } from "../data/gameUI";
import { toolChoices, stages } from "../data/gameData";
import { Icon } from "./Icon";

export function BadgeScreen({
  locale,
  count,
  onAgain,
  onHome,
  onNotebook,
}: {
  locale: Locale;
  count: number;
  onAgain: () => void;
  onHome: () => void;
  onNotebook: () => void;
}) {
  return (
    <main id="main" className="completion-screen" tabIndex={-1}>
      <div className="completion-copy">
        <div className="eyebrow">
          <Icon name="check" size={20} />
          {gameUI.collectionComplete[locale]} · {count} / {count}
        </div>
        <h1 id="completion-heading" tabIndex={-1}>
          {gameUI.complete[locale]}
        </h1>
        <p className="completion-intro">{gameUI.completeIntro[locale]}</p>
        <div className="badge-wrap">
          <div className="celebration" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <div
            className="detective-badge"
            role="img"
            aria-label={gameUI.badgeName[locale]}
          >
            <div className="badge-inner">
              <span className="badge-stars" aria-hidden="true">
                ✦ ✦ ✦
              </span>
              <Icon name="microscope" size={72} />
              <span className="badge-english" lang="en">
                MICROSCOPIC
                <br />
                DETECTIVE
              </span>
              <span className="badge-zh">{gameUI.badge[locale]}</span>
              <span className="badge-laurel" aria-hidden="true">
                — ✳ —
              </span>
            </div>
          </div>
        </div>
        <h2 className="badge-invitation">{gameUI.badgeNext[locale]}</h2>
        <p className="badge-note">{gameUI.badgeNote[locale]}</p>
        <div className="completion-actions">
          <button className="button primary" onClick={onAgain}>
            <Icon name="reset" size={20} />
            {gameUI.again[locale]}
          </button>
          <button className="button" onClick={onHome}>
            <Icon name="home" size={20} />
            {gameUI.home[locale]}
          </button>
        </div>
      </div>
      <section className="discovery-summary">
        <div className="route-heading">
          <h2>{gameUI.review[locale]}</h2>
          <button className="button text-button" onClick={onNotebook}>
            <Icon name="book" size={19} />
            {gameUI.review[locale]}
            <Icon name="arrow" size={18} />
          </button>
        </div>
        <div className="summary-grid">
          {toolChoices.map((tool) => (
            <div key={tool.id}>
              <span
                className={`route-icon tone-${stages.findIndex((s) => s.id === tool.id)}`}
              >
                <Icon
                  name={stages.find((s) => s.id === tool.id)!.icon}
                  size={26}
                />
              </span>
              <strong>{tool.title[locale]}</strong>
              <p>{tool.description?.[locale]}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
