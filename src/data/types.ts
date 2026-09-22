export type Locale = "zh-TW" | "en";
export type Text = Record<Locale, string>;
export const bi = (zh: string, en: string): Text => ({ "zh-TW": zh, en });
export type MicroscopeType =
  | "naked-eye"
  | "magnifier"
  | "stereo"
  | "optical"
  | "fluorescence"
  | "electron";
export type StageId =
  | MicroscopeType
  | "scale"
  | "target"
  | "mystery"
  | "tools"
  | "final";
export interface ImageData {
  id: string;
  src: string;
  title: Text;
  imageAlt: Text;
  caption: Text;
  microscopeType: MicroscopeType;
  placeholder: boolean;
  type: "illustration" | "real";
  width?: number;
  height?: number;
  modality?: "optical" | "fluorescence" | "sem" | "tem";
  observationClue?: Text;
  credit: {
    originalTitle?: string;
    details?: Text;
    creator: string;
    source?: string;
    creatorUrl?: string;
    license: string;
    sourceUrl?: string;
    licenseUrl?: string;
    changes?: string | Text;
  };
}
export interface Choice {
  id: string;
  title: Text;
  description?: Text;
  image?: string;
}
export interface Question {
  id: string;
  stage: StageId;
  title: Text;
  question: Text;
  type: "single" | "multiple";
  image?: string;
  choices: Choice[];
  evidenceTargets?: { choiceId: string; x: number; y: number }[];
  correctAnswer: string[];
  /** In single-choice activities, any ONE of these choices is acceptable. */
  acceptedAnswers?: string[];
  answerExplanations?: Record<string, Text>;
  explanation: Text;
  funFact: Text;
  hint: Text;
  strongHint?: Text;
  observation?: Text;
  investigation?: {
    evidenceImage: string;
    evidenceTitle: Text;
    evidence: Text;
    preparation: Text;
    nextQuestion?: Text;
  };
  toolSelection?: boolean;
  microscopeType?: MicroscopeType;
}
export interface Stage {
  id: StageId;
  number: string;
  title: Text;
  shortTitle: Text;
  subtitle: Text;
  introduction: Text;
  reward: Text;
  icon: string;
}
