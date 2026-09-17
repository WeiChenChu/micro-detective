import { useEffect, useState } from "react";
import type { Dispatch } from "react";
import type { Locale } from "../data/types";
import type { Action } from "../game/gameState";
import { academyUI as a } from "../data/academyUI";

export function NotebookHint({ seen, locale, dispatch, onNotebook }: {
  seen: boolean; locale: Locale; dispatch: Dispatch<Action>; onNotebook: () => void;
}) {
  // Keep this visit visible after recording it; a new visit reads the saved flag.
  const [visible, setVisible] = useState(!seen);
  useEffect(() => {
    if (visible) dispatch({ type: "NOTEBOOK_HINT_SEEN" });
  }, [visible, dispatch]);
  if (!visible) return null;
  return <aside className="knowledge-clue notebook-hint" role="status">
    <strong>{a.notebookHintTitle[locale]}</strong>
    <p>{a.notebookHintNote[locale]}</p>
    <div className="academy-actions">
      <button className="button" onClick={() => { setVisible(false); onNotebook(); }}>{a.reviewNotebook[locale]}</button>
      <button className="button text-button" onClick={() => setVisible(false)}>{a.dismiss[locale]}</button>
    </div>
  </aside>;
}
