import type { ReactNode } from "react";
import type { Locale } from "../data/types";
import { toolIllustrations, type ObservationToolId } from "../data/toolIllustrations";

/** The same visual identity as the Notebook, beside (or above) the observation. */
export function ObservationView({ tool, locale, mode, children }: {
  tool: ObservationToolId; locale: Locale; mode?: string; children: ReactNode;
}) {
  const metadata = toolIllustrations[tool];
  return <div className="observation-view">
    <div className="active-tool" role="status" aria-live="polite" aria-atomic="true">
      <img src={metadata.image} width={112} height={98} alt="" />
      <div>
        <span>{locale === "zh-TW" ? "現在使用" : "Using now"}</span>
        <strong>{metadata.toolName[locale]}</strong>
        {mode && <p className="observation-mode">{mode}</p>}
      </div>
    </div>
    <div className="observation-viewport">{children}</div>
  </div>;
}
