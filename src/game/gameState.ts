import {
  caseQuestions,
  CONTENT_VERSION,
  finalQuestions,
  questionsById,
} from "../data/gameData";
import type { Locale, Question } from "../data/types";

export const STORAGE_KEY = "microscopic-detective:progress";
export const MAX_AGE_MS = 24 * 60 * 60 * 1000;
export type Resolution = "solved" | "assisted";
export interface GameState {
  schemaVersion: 1;
  contentVersion: number;
  updatedAt: number;
  locale: Locale;
  screen: "landing" | "game" | "complete";
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
  random = Math.random,
): GameState {
  return {
    schemaVersion: 1,
    contentVersion: CONTENT_VERSION,
    updatedAt: Date.now(),
    locale,
    screen: "landing",
    started: false,
    finalOrder: shuffle(
      finalQuestions.map((q) => q.id),
      random,
    ),
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
  selected.length === question.correctAnswer.length &&
  new Set(selected).size === selected.length &&
  question.correctAnswer.every((id) => selected.includes(id));

export type Action =
  | { type: "START"; fresh: GameState }
  | { type: "RESET"; fresh: GameState }
  | { type: "RESUME" }
  | { type: "HOME" }
  | { type: "LOCALE"; locale: Locale }
  | { type: "SELECT"; id: string }
  | { type: "ANSWER"; ids?: string[] }
  | { type: "HINT" }
  | { type: "ASSIST" }
  | { type: "NEXT" }
  | { type: "EXPLORE"; step: number };

export function gameReducer(state: GameState, action: Action): GameState {
  if (action.type === "RESET") return action.fresh;
  if (action.type === "START")
    return { ...action.fresh, screen: "game", started: true };
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
  if (state.screen !== "game") return state;
  const q = currentQuestion(state);
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
      if (state.cursor === questionOrder(state).length - 1)
        return { ...state, screen: "complete" };
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
  if (
    s.schemaVersion !== 1 ||
    s.contentVersion !== CONTENT_VERSION ||
    !Number.isFinite(s.updatedAt) ||
    now - s.updatedAt > MAX_AGE_MS ||
    s.updatedAt > now + 60000
  )
    return false;
  if (
    !["zh-TW", "en"].includes(s.locale) ||
    !["landing", "game", "complete"].includes(s.screen) ||
    typeof s.started !== "boolean"
  )
    return false;
  const finals = finalQuestions.map((q) => q.id);
  if (
    !Array.isArray(s.finalOrder) ||
    s.finalOrder.length !== finals.length ||
    new Set(s.finalOrder).size !== finals.length ||
    s.finalOrder.some((id) => !finals.includes(id))
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
    (s.screen !== "landing" ||
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
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
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
