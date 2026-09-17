import {
  caseQuestions,
  CONTENT_VERSION,
  finalQuestions,
  questionsById,
} from "../data/missionData";
import type { Locale, Question } from "../data/types";
import { academyModules } from "../data/academyData";
import { practiceQuestions } from "../data/observationData";

export const LEGACY_STORAGE_KEY = "microscopic-detective:progress";
export const STORAGE_KEY = "microscopic-detective:progress:v2";
export const MAX_AGE_MS = 24 * 60 * 60 * 1000;
export type Resolution = "solved" | "assisted";
export interface GameState {
  schemaVersion: 2;
  notebookHintSeen?: boolean;
  notebookReviewSeen?: boolean;
  academyRevision: 2;
  practice: PracticeProgress;
  contentVersion: number;
  updatedAt: number;
  locale: Locale;
  screen: "landing" | "academy" | "practice" | "game" | "complete";
  academyCompleted: string[];
  academyModule: number | null;
  migratedFromV1: boolean;
  started: boolean;
  finalOrder: string[];
  cursor: number;
  selected: string[];
  completed: Record<string, Resolution>;
  attempts: number;
  feedback: "correct" | "retry" | "assisted" | null;
  showHint: boolean;
  exploreStep: number;
}

export type PracticeProgress = Pick<
  GameState,
  | "cursor"
  | "selected"
  | "completed"
  | "attempts"
  | "feedback"
  | "showHint"
  | "exploreStep"
> & { finished: boolean };
export const createPractice = (): PracticeProgress => ({
  cursor: 0,
  selected: [],
  completed: {},
  attempts: 0,
  feedback: null,
  showHint: false,
  exploreStep: 0,
  finished: false,
});

export function shuffle<T>(items: readonly T[], random = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
export function createGame(
  locale: Locale = "zh-TW",
  _random = Math.random,
): GameState {
  return {
    schemaVersion: 2,
    notebookHintSeen: false,
    notebookReviewSeen: false,
    academyRevision: 2,
    practice: createPractice(),
    academyCompleted: [],
    academyModule: null,
    migratedFromV1: false,
    contentVersion: CONTENT_VERSION,
    updatedAt: Date.now(),
    locale,
    screen: "landing",
    started: false,
    finalOrder: finalQuestions.map((q) => q.id),
    cursor: 0,
    selected: [],
    completed: {},
    attempts: 0,
    feedback: null,
    showHint: false,
    exploreStep: 0,
  };
}
export const questionOrder = (state: GameState) => [
  ...caseQuestions.map((q) => q.id),
  ...state.finalOrder,
];
export const currentQuestion = (state: GameState): Question =>
  questionsById[questionOrder(state)[state.cursor]];
export const evidenceCount = (state: GameState) =>
  Object.keys(state.completed).length;
export const answersMatch = (question: Question, selected: string[]) =>
  question.type === "single" && question.acceptedAnswers
    ? selected.length === 1 && question.acceptedAnswers.includes(selected[0])
    : selected.length === question.correctAnswer.length &&
      new Set(selected).size === selected.length &&
      question.correctAnswer.every((id) => selected.includes(id));

export type QuestionAction =
  | { type: "SELECT"; id: string }
  | { type: "ANSWER"; ids?: string[] }
  | { type: "HINT" }
  | { type: "ASSIST" }
  | { type: "NEXT" }
  | { type: "EXPLORE"; step: number };
export type Action =
  | QuestionAction
  | { type: "START"; fresh: GameState }
  | { type: "RESET"; fresh: GameState }
  | { type: "RESUME" }
  | { type: "HOME" }
  | { type: "ACADEMY"; module?: number }
  | { type: "COLLECT_LESSON"; id: string }
  | { type: "DISMISS_MIGRATION" }
  | { type: "NOTEBOOK_HINT_SEEN" }
  | { type: "NOTEBOOK_REVIEW_SEEN" }
  | { type: "LOCALE"; locale: Locale }
  | { type: "PRACTICE_OPEN" }
  | { type: "PRACTICE_RESTART" }
  | { type: "PRACTICE"; action: QuestionAction };

export function gameReducer(state: GameState, action: Action): GameState {
  if (action.type === "RESET") return action.fresh;
  if (action.type === "START")
    return {
      ...action.fresh,
      academyCompleted: state.academyCompleted,
      notebookHintSeen: state.notebookHintSeen,
      notebookReviewSeen: state.notebookReviewSeen,
      practice: state.practice,
      screen: "game",
      started: true,
    };
  if (action.type === "NOTEBOOK_HINT_SEEN") return { ...state, notebookHintSeen: true };
  if (action.type === "NOTEBOOK_REVIEW_SEEN") return { ...state, notebookReviewSeen: true };
  if (action.type === "ACADEMY") {
    if (
      action.module !== undefined &&
      (!Number.isInteger(action.module) ||
        action.module < 0 ||
        action.module >= academyModules.length)
    )
      return state;
    return {
      ...state,
      screen: "academy",
      academyModule: action.module ?? null,
    };
  }
  if (action.type === "COLLECT_LESSON") {
    if (
      state.screen !== "academy" ||
      state.academyModule === null ||
      academyModules[state.academyModule].id !== action.id ||
      state.academyCompleted.includes(action.id)
    )
      return state;
    return {
      ...state,
      academyCompleted: [...state.academyCompleted, action.id],
    };
  }
  if (action.type === "DISMISS_MIGRATION")
    return { ...state, migratedFromV1: false };
  if (action.type === "PRACTICE_OPEN") return { ...state, screen: "practice" };
  if (action.type === "PRACTICE_RESTART")
    return { ...state, screen: "practice", practice: createPractice() };
  if (action.type === "PRACTICE") {
    if (state.screen !== "practice") return state;
    const next = reduceQuestion(
      {
        ...state,
        ...state.practice,
        screen: state.practice.finished ? "complete" : "game",
      },
      action.action,
      practiceQuestions[state.practice.cursor],
      practiceQuestions.length,
    );
    const {
      cursor,
      selected,
      completed,
      attempts,
      feedback,
      showHint,
      exploreStep,
    } = next;
    return {
      ...state,
      practice: {
        cursor,
        selected,
        completed,
        attempts,
        feedback,
        showHint,
        exploreStep,
        finished: next.screen === "complete",
      },
    };
  }
  if (action.type === "LOCALE") return { ...state, locale: action.locale };
  if (action.type === "HOME") return { ...state, screen: "landing" };
  if (action.type === "RESUME")
    return {
      ...state,
      screen:
        evidenceCount(state) === questionOrder(state).length
          ? "complete"
          : "game",
      started: true,
    };
  return reduceQuestion(
    state,
    action,
    currentQuestion(state),
    questionOrder(state).length,
  );
}

// Shared by the original missions and the new tool-choice practice.
export function reduceQuestion(
  state: GameState,
  action: QuestionAction,
  q: Question,
  total: number,
): GameState {
  if (state.screen !== "game") return state;
  const done = !!state.completed[q.id];
  switch (action.type) {
    case "SELECT": {
      if (done || !q.choices.some((c) => c.id === action.id)) return state;
      const selected =
        q.type === "single"
          ? [action.id]
          : state.selected.includes(action.id)
            ? state.selected.filter((id) => id !== action.id)
            : [...state.selected, action.id];
      return { ...state, selected, feedback: null };
    }
    case "ANSWER": {
      if (done) return state;
      const selected = action.ids ?? state.selected;
      if (
        !selected.length ||
        selected.some((id) => !q.choices.some((c) => c.id === id)) ||
        (q.type === "single" && selected.length !== 1)
      )
        return state;
      const correct = answersMatch(q, selected);
      return {
        ...state,
        selected: [...selected],
        attempts: state.attempts + 1,
        feedback: correct ? "correct" : "retry",
        showHint: !correct || state.showHint,
        completed: correct
          ? { ...state.completed, [q.id]: "solved" }
          : state.completed,
      };
    }
    case "HINT":
      return { ...state, showHint: true };
    case "ASSIST": {
      if (done || state.attempts < 2) return state;
      return {
        ...state,
        selected: [...q.correctAnswer],
        completed: { ...state.completed, [q.id]: "assisted" },
        feedback: "assisted",
        showHint: true,
      };
    }
    case "EXPLORE":
      return action.step >= 0 && action.step <= 3
        ? { ...state, exploreStep: action.step }
        : state;
    case "NEXT": {
      if (!done) return state;
      if (state.cursor === total - 1) return { ...state, screen: "complete" };
      return {
        ...state,
        cursor: state.cursor + 1,
        selected: [],
        attempts: 0,
        feedback: null,
        showHint: false,
        exploreStep: 0,
      };
    }
  }
}

// Validate all persisted fields; changed question sets never silently reuse old progress.
export function validateProgress(
  value: unknown,
  now = Date.now(),
): value is GameState {
  if (!value || typeof value !== "object") return false;
  const s = value as GameState;
  // Optional flags preserve valid v0.25 saves without changing the schema or IDs.
  if ([s.notebookHintSeen, s.notebookReviewSeen].some(flag => flag !== undefined && typeof flag !== "boolean")) return false;
  if (
    s.schemaVersion !== 2 ||
    s.academyRevision !== 2 ||
    !validatePractice(s.practice) ||
    s.contentVersion !== CONTENT_VERSION ||
    !Number.isFinite(s.updatedAt) ||
    now - s.updatedAt > MAX_AGE_MS ||
    s.updatedAt > now + 60000
  )
    return false;
  if (
    !["zh-TW", "en"].includes(s.locale) ||
    !["landing", "academy", "practice", "game", "complete"].includes(
      s.screen,
    ) ||
    typeof s.started !== "boolean"
  )
    return false;
  if (
    !Array.isArray(s.academyCompleted) ||
    new Set(s.academyCompleted).size !== s.academyCompleted.length ||
    s.academyCompleted.some((id) => !academyModules.some((m) => m.id === id)) ||
    typeof s.migratedFromV1 !== "boolean" ||
    (s.academyModule !== null &&
      (!Number.isInteger(s.academyModule) ||
        s.academyModule < 0 ||
        s.academyModule >= academyModules.length))
  )
    return false;
  const finals = finalQuestions.map((q) => q.id);
  if (
    !Array.isArray(s.finalOrder) ||
    s.finalOrder.length !== finals.length ||
    new Set(s.finalOrder).size !== finals.length ||
    s.finalOrder.some((id, index) => id !== finals[index])
  )
    return false;
  const order = questionOrder(s);
  if (!Number.isInteger(s.cursor) || s.cursor < 0 || s.cursor >= order.length)
    return false;
  if (
    !s.completed ||
    typeof s.completed !== "object" ||
    Array.isArray(s.completed)
  )
    return false;
  if (
    Object.entries(s.completed).some(
      ([id, result]) =>
        !order.includes(id) || !["solved", "assisted"].includes(result),
    )
  )
    return false;
  if (
    order.slice(0, s.cursor).some((id) => !s.completed[id]) ||
    order.slice(s.cursor + 1).some((id) => s.completed[id])
  )
    return false;
  const q = currentQuestion(s);
  if (
    !Array.isArray(s.selected) ||
    new Set(s.selected).size !== s.selected.length ||
    s.selected.some((id) => !q.choices.some((c) => c.id === id)) ||
    (q.type === "single" && s.selected.length > 1)
  )
    return false;
  if (
    !Number.isInteger(s.attempts) ||
    s.attempts < 0 ||
    ![null, "correct", "retry", "assisted"].includes(s.feedback)
  )
    return false;
  if (
    typeof s.showHint !== "boolean" ||
    !Number.isInteger(s.exploreStep) ||
    s.exploreStep < 0 ||
    s.exploreStep > 3
  )
    return false;
  const done = !!s.completed[q.id];
  if (
    done &&
    (!answersMatch(q, s.selected) ||
      !["correct", "assisted"].includes(s.feedback ?? ""))
  )
    return false;
  if (!done && (s.feedback === "correct" || s.feedback === "assisted"))
    return false;
  if (
    s.screen === "complete" &&
    Object.keys(s.completed).length !== order.length
  )
    return false;
  if (
    !s.started &&
    (!["landing", "academy", "practice"].includes(s.screen) ||
      s.cursor !== 0 ||
      Object.keys(s.completed).length > 0)
  )
    return false;
  return true;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
export function readProgress(
  storage: StorageLike,
  now = Date.now(),
): GameState | null {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) {
      const old = storage.getItem(LEGACY_STORAGE_KEY);
      if (!old) return null;
      try {
        const legacy = JSON.parse(old);
        if (legacy?.schemaVersion === 1 && legacy?.contentVersion === 1)
          return {
            ...createGame(legacy.locale === "en" ? "en" : "zh-TW"),
            migratedFromV1: true,
          };
      } catch {
        /* Preserve the original v0.1 save, even if unreadable. */
      }
      return null;
    }
    const value: unknown = upgradeAcademyProgress(JSON.parse(raw));
    if (validateProgress(value, now)) return value;
    storage.removeItem(STORAGE_KEY);
    return null;
  } catch {
    return null;
  }
}
export function writeProgress(
  storage: StorageLike,
  state: GameState,
  now = Date.now(),
): boolean {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({ ...state, updatedAt: now }));
    return true;
  } catch {
    return false;
  }
}
export function clearProgress(storage: StorageLike) {
  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    /* In-memory play remains available. */
  }
}

/** v0.2 lesson indices are remapped by stable ID; mission answers stay intact. */
export function upgradeAcademyProgress(value: unknown): unknown {
  if (!value || typeof value !== "object") return value;
  const old = value as Record<string, unknown>;
  if (
    old.schemaVersion !== 2 ||
    old.contentVersion !== CONTENT_VERSION ||
    old.academyRevision !== undefined
  )
    return value;
  const oldIds = ["scale", "optical", "fluorescence", "electron"];
  const index = old.academyModule;
  if (
    index !== null &&
    (typeof index !== "number" ||
      !Number.isInteger(index) ||
      index < 0 ||
      index >= oldIds.length)
  )
    return value;
  return {
    ...old,
    academyRevision: 2,
    practice: createPractice(),
    academyModule:
      index === null
        ? null
        : academyModules.findIndex(
            (lesson) => lesson.id === oldIds[index as number],
          ),
  };
}

function validatePractice(value: unknown): value is PracticeProgress {
  if (!value || typeof value !== "object") return false;
  const p = value as PracticeProgress;
  if (
    !Number.isInteger(p.cursor) ||
    p.cursor < 0 ||
    p.cursor >= practiceQuestions.length ||
    typeof p.finished !== "boolean" ||
    typeof p.showHint !== "boolean" ||
    !Number.isInteger(p.attempts) ||
    p.attempts < 0 ||
    !Number.isInteger(p.exploreStep) ||
    p.exploreStep < 0 ||
    p.exploreStep > 3 ||
    ![null, "correct", "retry", "assisted"].includes(p.feedback)
  )
    return false;
  if (
    !p.completed ||
    typeof p.completed !== "object" ||
    Array.isArray(p.completed) ||
    !Array.isArray(p.selected) ||
    p.selected.length > 1
  )
    return false;
  const ids = practiceQuestions.map((q) => q.id),
    q = practiceQuestions[p.cursor];
  if (
    Object.entries(p.completed).some(
      ([id, result]) =>
        !ids.includes(id) || !["solved", "assisted"].includes(result),
    ) ||
    ids.slice(0, p.cursor).some((id) => !p.completed[id]) ||
    ids.slice(p.cursor + 1).some((id) => p.completed[id]) ||
    p.selected.some((id) => !q.choices.some((c) => c.id === id))
  )
    return false;
  const done = !!p.completed[q.id];
  if (
    done &&
    (!answersMatch(q, p.selected) ||
      !["correct", "assisted"].includes(p.feedback ?? ""))
  )
    return false;
  if (!done && (p.feedback === "correct" || p.feedback === "assisted"))
    return false;
  return !p.finished || Object.keys(p.completed).length === ids.length;
}
