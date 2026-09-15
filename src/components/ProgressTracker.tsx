import { stages } from "../data/gameData";
import { gameUI } from "../data/gameUI";
import type { Locale, StageId } from "../data/types";
import { Icon } from "./Icon";

export function ProgressTracker({
  stageId,
  count,
  total,
  locale,
}: {
  stageId: StageId;
  count: number;
  total: number;
  locale: Locale;
}) {
  const current = stages.findIndex((s) => s.id === stageId);
  return (
    <nav className="progress-tracker" aria-label={gameUI.progressLabel[locale]}>
      <ol>
        {stages.map((stage, index) => (
          <li
            key={stage.id}
            aria-current={index === current ? "step" : undefined}
            className={`${index === current ? "is-current" : ""} ${index < current ? "is-complete" : ""}`}
          >
            <span className="progress-circle">
              <Icon name={index < current ? "check" : stage.icon} size={23} />
            </span>
            <span className="progress-title">{stage.title[locale]}</span>
            <span className="sr-only">
              {index === current ? gameUI.stepOf[locale] : ""}
            </span>
          </li>
        ))}
      </ol>
      <div className="evidence-progress">
        <span>
          {gameUI.collected[locale]}{" "}
          <strong>
            {count} / {total}
          </strong>{" "}
          {gameUI.clues[locale]}
        </span>
        <progress
          max={total}
          value={count}
          aria-label={gameUI.progressLabel[locale]}
        />
      </div>
    </nav>
  );
}
