export type Locale = "zh-TW" | "en";
export type Text = Record<Locale, string>;
export const bi = (zh: string, en: string): Text => ({ "zh-TW": zh, en });
export type MicroscopeType =
  | "naked-eye"
  | "optical"
  | "fluorescence"
  | "electron";
export type StageId = MicroscopeType | "final";
export interface ImageData {
  id: string;
  src: string;
  title: Text;
  imageAlt: Text;
  caption: Text;
  microscopeType: MicroscopeType;
  placeholder: boolean;
  credit: {
    creator: string;
    license: string;
    sourceUrl?: string;
    licenseUrl?: string;
    changes?: string;
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
  correctAnswer: string[];
  explanation: Text;
  funFact: Text;
  hint: Text;
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
