import type { Locale, Stage } from "../data/types";
import { gameUI } from "../data/gameUI";
import { Icon } from "./Icon";

export function StageIntro({
  stage,
  locale,
}: {
  stage: Stage;
  locale: Locale;
}) {
  return (
    <header className={`stage-intro stage-${stage.id}`}>
      <span className="stage-symbol">
        <Icon name={stage.icon} size={36} />
      </span>
      <div>
        <div className="eyebrow">
          {gameUI.caseLabel[locale]} {stage.number}{" "}
          <span className="eyebrow-separator">/</span> {stage.subtitle[locale]}
        </div>
        <h1 id="stage-heading" tabIndex={-1}>
          {stage.title[locale]}
        </h1>
        <p>{stage.introduction[locale]}</p>
      </div>
    </header>
  );
}
