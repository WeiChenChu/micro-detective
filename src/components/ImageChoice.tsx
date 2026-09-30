import type { Choice, Locale } from "../data/types";
import { gameUI } from "../data/gameUI";
import { ToolVisual } from "./ToolVisual";
import { Icon } from "./Icon";
import { MicroscopyImage } from "./MicroscopyImage";
import { images } from "../data/images";
import { ImageAttribution } from "./ImageAttribution";

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
  const button = (
    <button
      className={`choice ${selected ? "selected" : ""} ${choice.image ? "image-choice" : "text-choice"} ${isTool ? "tool-choice" : ""} ${choice.toolVisualId ? "visual-tool-choice" : ""}`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onSelect}
      data-choice-id={choice.id}
    >
      {choice.image && <MicroscopyImage id={choice.image} locale={locale} showAttribution={false} />}
      <span className="choice-body">
        {choice.toolVisualId
          ? <ToolVisual tool={choice.toolVisualId} variant="choice" locale={locale} mode={choice.toolMode} decorative />
          : <span className="choice-letter">{String.fromCharCode(65 + index)}</span>}
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
  const image = choice.image && images[choice.image];
  // Attribution remains reachable even after answering; never nest links inside a button.
  return image && image.type === "real"
    ? <div className="image-choice-option">{button}<ImageAttribution image={image} locale={locale} /></div>
    : button;
}
