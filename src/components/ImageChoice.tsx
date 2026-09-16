import type { Choice, Locale } from "../data/types";
import { gameUI } from "../data/gameUI";
import { toolIcons } from "../data/missionData";
import type { MicroscopeType } from "../data/types";
import { Icon } from "./Icon";
import { MicroscopyImage } from "./MicroscopyImage";

export function ImageChoice({
  choice,
  index,
  locale,
  selected,
  disabled,
  onSelect,
  isTool = false,
}: {
  choice: Choice;
  index: number;
  locale: Locale;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
  isTool?: boolean;
}) {
  const icon = toolIcons[choice.id as MicroscopeType];
  return (
    <button
      className={`choice ${selected ? "selected" : ""} ${choice.image ? "image-choice" : "text-choice"} ${isTool ? "tool-choice" : ""}`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onSelect}
      data-choice-id={choice.id}
    >
      {choice.image && <MicroscopyImage id={choice.image} locale={locale} />}
      <span className="choice-body">
        <span className="choice-letter">
          {isTool && icon ? (
            <Icon name={icon} size={24} />
          ) : (
            String.fromCharCode(65 + index)
          )}
        </span>
        <span className="choice-copy">
          <strong>{choice.title[locale]}</strong>
          {choice.description && <span>{choice.description[locale]}</span>}
        </span>
        <span className="choice-check" aria-hidden="true">
          {selected ? <Icon name="check" size={17} /> : null}
        </span>
      </span>
      {selected && <span className="sr-only">{gameUI.chosen[locale]}</span>}
    </button>
  );
}
