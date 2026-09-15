import { useEffect, useReducer, useState } from "react";
import { ui } from "./data/ui";
import { gameUI } from "./data/gameUI";
import { caseQuestions, finalQuestions, stages } from "./data/gameData";
import {
  createGame,
  currentQuestion,
  evidenceCount,
  gameReducer,
  readProgress,
  writeProgress,
  questionOrder,
} from "./game/gameState";
import { Landing } from "./components/Landing";
import { GameShell } from "./components/GameShell";
import { ProgressTracker } from "./components/ProgressTracker";
import { StageIntro } from "./components/StageIntro";
import { QuestionCard } from "./components/QuestionCard";
import { Modal } from "./components/Modal";
import { DetectiveNotebook } from "./components/DetectiveNotebook";
import { BadgeScreen } from "./components/BadgeScreen";
import { Credits } from "./components/Credits";
import { useWebMCP } from "./game/useWebMCP";

function initialize() {
  try {
    return readProgress(window.localStorage) ?? createGame();
  } catch {
    return createGame();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, initialize);
  useWebMCP(state);
  const [modal, setModal] = useState<"notebook" | "restart" | "credits" | null>(
    null,
  );
  const [storageAvailable, setStorageAvailable] = useState(true);
  const locale = state.locale;
  const question = currentQuestion(state);
  const stage = stages.find((s) => s.id === question.stage)!;
  const count = evidenceCount(state);
  const total = questionOrder(state).length;
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `${ui.name[locale]} · ${locale === "zh-TW" ? "Microscopic Detective" : "微觀小偵探"}`;
  }, [locale]);
  useEffect(() => {
    try {
      setStorageAvailable(writeProgress(window.localStorage, state));
    } catch {
      setStorageAvailable(false);
    }
  }, [state]);
  useEffect(() => {
    const id =
      state.screen === "game"
        ? "question-heading"
        : state.screen === "complete"
          ? "completion-heading"
          : "main";
    document.getElementById(id)?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [state.cursor, state.screen, state.finalOrder]);
  const start = () => {
    setModal(null);
    dispatch({ type: "START", fresh: createGame(locale) });
  };
  const home = () => {
    setModal(null);
    dispatch({ type: "HOME" });
  };
  return (
    <GameShell
      locale={locale}
      onLocale={(value) => dispatch({ type: "LOCALE", locale: value })}
      onNotebook={() => setModal("notebook")}
      onRestart={() => setModal("restart")}
      onCredits={() => setModal("credits")}
      onHome={home}
      playing={state.screen !== "landing"}
      count={count}
    >
      {!storageAvailable && (
        <p className="storage-note" role="status">
          {gameUI.storageNote[locale]}
        </p>
      )}
      {state.screen === "landing" && (
        <Landing
          locale={locale}
          onStart={start}
          hasProgress={state.started}
          onResume={() => dispatch({ type: "RESUME" })}
        />
      )}
      {state.screen === "game" && (
        <main id="main" className="game-main" tabIndex={-1}>
          <ProgressTracker
            stageId={stage.id}
            count={count}
            total={total}
            locale={locale}
          />
          <StageIntro stage={stage} locale={locale} />
          <QuestionCard
            key={question.id}
            state={state}
            question={question}
            stage={stage}
            locale={locale}
            dispatch={dispatch}
            total={total}
            finalIndex={state.cursor - caseQuestions.length + 1}
            finalTotal={finalQuestions.length}
          />
        </main>
      )}
      {state.screen === "complete" && (
        <BadgeScreen
          locale={locale}
          count={count}
          onAgain={start}
          onHome={() => dispatch({ type: "RESET", fresh: createGame() })}
          onNotebook={() => setModal("notebook")}
        />
      )}
      {modal && (
        <Modal
          title={
            modal === "notebook"
              ? ui.notebook[locale]
              : modal === "restart"
                ? gameUI.restartTitle[locale]
                : ui.sources[locale]
          }
          locale={locale}
          onClose={() => setModal(null)}
          className={modal === "restart" ? "compact-modal" : ""}
        >
          {modal === "notebook" && (
            <DetectiveNotebook state={state} locale={locale} />
          )}
          {modal === "credits" && <Credits locale={locale} />}
          {modal === "restart" && (
            <>
              <p className="modal-intro">{gameUI.restartText[locale]}</p>
              <div className="modal-actions">
                <button
                  className="button"
                  onClick={() => setModal(null)}
                  autoFocus
                >
                  {gameUI.cancel[locale]}
                </button>
                <button className="button primary" onClick={start}>
                  {gameUI.confirmRestart[locale]}
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </GameShell>
  );
}
