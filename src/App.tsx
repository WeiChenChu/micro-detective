import { useEffect, useReducer, useState } from "react";
import { ui } from "./data/ui";
import { gameUI } from "./data/gameUI";
import { caseQuestions, finalQuestions, stages } from "./data/missionData";
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
import { ToolPractice } from "./components/ToolPractice";
import { AcademyHome } from "./components/AcademyHome";
import { AcademyModule } from "./components/AcademyModule";
import { academyModules } from "./data/academyData";
import { academyUI as a } from "./data/academyUI";

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
      state.screen === "game" ||
      (state.screen === "practice" && !state.practice.finished)
        ? "question-heading"
        : state.screen === "practice"
          ? "practice-completion-heading"
          : state.screen === "complete"
            ? "completion-heading"
            : "main";
    document.getElementById(id)?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [
    state.cursor,
    state.screen,
    state.finalOrder,
    state.academyModule,
    state.practice.cursor,
    state.practice.finished,
  ]);
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
      count={count + state.academyCompleted.length}
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
          onAcademy={() => dispatch({ type: "ACADEMY" })}
        />
      )}
      {state.migratedFromV1 && (
        <aside className="migration-note" role="status">
          <p>{a.migration[locale]}</p>
          <button
            className="button"
            onClick={() => dispatch({ type: "DISMISS_MIGRATION" })}
          >
            {a.dismiss[locale]}
          </button>
        </aside>
      )}
      {state.screen === "academy" &&
        (state.academyModule === null ? (
          <AcademyHome
            locale={locale}
            completed={state.academyCompleted}
            onPractice={() => dispatch({ type: "PRACTICE_OPEN" })}
            onModule={(module) => dispatch({ type: "ACADEMY", module })}
            onMissions={() =>
              state.started ? dispatch({ type: "RESUME" }) : start()
            }
          />
        ) : (
          <AcademyModule
            key={state.academyModule}
            index={state.academyModule}
            locale={locale}
            collected={state.academyCompleted.includes(
              academyModules[state.academyModule].id,
            )}
            onComplete={() =>
              dispatch({
                type: "COLLECT_LESSON",
                id: academyModules[state.academyModule!].id,
              })
            }
            onBack={() => dispatch({ type: "ACADEMY" })}
            onNext={() =>
              dispatch(
                state.academyModule! < academyModules.length - 1
                  ? { type: "ACADEMY", module: state.academyModule! + 1 }
                  : { type: "ACADEMY" },
              )
            }
          />
        ))}
      {state.screen === "practice" && (
        <ToolPractice
          state={state}
          locale={locale}
          onAction={(action) => dispatch({ type: "PRACTICE", action })}
          onBack={() => dispatch({ type: "ACADEMY" })}
          onMissions={() =>
            state.started ? dispatch({ type: "RESUME" }) : start()
          }
          onAgain={() => dispatch({ type: "PRACTICE_RESTART" })}
        />
      )}
      {state.screen === "game" && (
        <main id="main" className="game-main" tabIndex={-1}>
          <div className="mission-navigation">
            <button
              className="button text-button"
              onClick={() => dispatch({ type: "ACADEMY" })}
            >
              ← {a.academy[locale]}
            </button>
            <span>{a.missions[locale]}</span>
          </div>
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
          onHome={home}
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
              <div className="new-player-section">
                <p>{a.nextPlayerNote[locale]}</p>
                <button
                  className="button"
                  onClick={() => {
                    setModal(null);
                    dispatch({ type: "RESET", fresh: createGame() });
                  }}
                >
                  {a.nextPlayer[locale]}
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </GameShell>
  );
}
