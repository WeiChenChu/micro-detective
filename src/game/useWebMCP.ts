import { useEffect, useLayoutEffect, useRef } from "react";
import {
  currentQuestion,
  evidenceCount,
  questionOrder,
  type GameState,
} from "./gameState";

interface ModelContext {
  registerTool(
    tool: {
      name: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
      execute: (input: unknown) => unknown;
    },
    options: { signal: AbortSignal },
  ): void | Promise<void>;
}

// Optional browser capability; ordinary browsers require no polyfill or service.
// Read-only and uses exactly the same state as the visible game.
export function useWebMCP(state: GameState) {
  const stateRef = useRef(state);
  useLayoutEffect(() => {
    stateRef.current = state;
  }, [state]);
  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext })
      .modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      Promise.resolve(
        context.registerTool(
          {
            name: "read_investigation_progress",
            description:
              "Read the visible Microscopic Detective game progress, language and current question. Does not reveal answers or change the game.",
            inputSchema: {
              type: "object",
              properties: {},
              additionalProperties: false,
            },
            annotations: { readOnlyHint: true, untrustedContentHint: false },
            execute(input: unknown) {
              if (
                !input ||
                typeof input !== "object" ||
                Array.isArray(input) ||
                Object.keys(input).length
              )
                throw new Error("Expected an empty object.");
              const s = stateRef.current;
              const q = currentQuestion(s);
              return {
                screen: s.screen,
                locale: s.locale,
                clues: evidenceCount(s),
                total: questionOrder(s).length,
                stage: s.screen === "game" ? q.stage : null,
                question: s.screen === "game" ? q.question[s.locale] : null,
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {
        /* Unsupported optional capability does not affect play. */
      });
    } catch {
      /* Browsers without support continue with the standard UI. */
    }
    return () => lifecycle.abort();
  }, []);
}
