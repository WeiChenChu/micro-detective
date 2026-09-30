import type { Locale } from "../data/types";
import { toolIllustrations, type ObservationToolId, type ToolMode, toolModeLabels } from "../data/toolIllustrations";

/** Shared artwork only; the surrounding card supplies its readable tool label. */
export function ToolVisual({ tool, locale, variant = "compact", mode, decorative = false }: {
  tool: ObservationToolId;
  locale: Locale;
  variant?: "context" | "choice" | "feedback" | "compact";
  mode?: ToolMode;
  decorative?: boolean;
}) {
  const visual = toolIllustrations[tool];
  return <span className={`tool-visual tool-visual-${variant}`} data-tool-visual={tool}>
    <img src={visual.image} width={72} height={63} alt={decorative ? "" : visual.imageAlt[locale]} />
    {mode && <span className="tool-mode-badge">{toolModeLabels[mode][locale]}</span>}
  </span>;
}
