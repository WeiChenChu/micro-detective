import { useRef, type Dispatch } from "react";
import type { Action, GameState } from "../game/gameState";
import { createPractice } from "../game/gameState";
import { bonusQuestion, stages } from "../data/missionData";
import { investigationUI as i } from "../data/investigationData";
import { QuestionCard } from "./QuestionCard";
import { InvestigationEvidence } from "./InvestigationEvidence";

export function BonusInvestigation({ state, dispatch }: { state: GameState; dispatch: Dispatch<Action> }) {
  const summary = useRef<HTMLElement>(null);
  const bonus = state.bonus ?? createPractice();
  const locale = state.locale;
  return <details className="bonus-investigation">
    <summary ref={summary}>{i.bonus[locale]} {bonus.completed[bonusQuestion.id] ? "✓" : ""}</summary>
    <p>{locale === "zh-TW" ? "主案件已完成！有興趣再追查細胞裡的構造。" : "Main case complete! Explore structures inside cells if you are curious."}</p>
    {bonus.finished ? <InvestigationEvidence question={bonusQuestion} locale={locale} /> : <QuestionCard
      state={{ ...state, ...bonus, screen: "game" }}
      question={bonusQuestion} stage={stages.find(s => s.id === "final")!} locale={locale}
      dispatch={action => {
        switch (action.type) {
          case "ANSWER": case "SELECT": case "HINT": case "ASSIST": case "NEXT": case "EXPLORE":
            dispatch({ type: "BONUS", action });
            if (action.type === "NEXT") summary.current?.focus();
        }
      }}
      total={1} finalIndex={0} finalTotal={1}
      nextLabel={locale === "zh-TW" ? "收好進階證據" : "Keep the bonus evidence"}
    />}
  </details>;
}
