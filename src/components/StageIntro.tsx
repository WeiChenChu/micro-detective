import type { Locale, Stage } from "../data/types";
import { gameUI } from "../data/gameUI";
import { Icon } from "./Icon";

export function StageIntro({
  stage,
  locale,
  index = 1,
  total = 1,
}: {
  stage: Stage;
  locale: Locale;
  index?: number;
  total?: number;
}) {
  if (index > 1) return <header className={`stage-context stage-${stage.id}`}>
    <h1 id="stage-heading" tabIndex={-1}><span>{stage.number}</span> {stage.title[locale]}</h1>
    <span>{gameUI.evidenceLabel[locale]} {index} / {total}</span>
  </header>;
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
