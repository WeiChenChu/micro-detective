import { bi, type Question } from "./types";

// Stable question/answer IDs preserve v0.23 saves. Evidence is derived from completion.
export const investigationSteps: Pick<Question, "image" | "observation" | "investigation">[] = [
  {
    observation: bi("樣品 A：研究員收到一小份生物組織。肉眼只能看見一小片，還無法分辨裡面的單位。", "Sample A: a researcher received a small piece of biological tissue. Our eyes see a piece, but cannot distinguish its tiny units."),
    investigation: {
      evidenceImage: "cell-unmarked",
      evidenceTitle: bi("找到清楚的細胞輪廓！", "Clear cell outlines found!"),
      evidence: bi("觀察到一個個有邊界的細胞。這份證據回答了第一個問題，卻還沒告訴我們蛋白質 X 在哪裡。", "We see individual bounded cells. This answers the first question, but does not locate protein X."),
      preparation: bi("研究員取適合透光的薄樣品觀察。以下是合成教學案件的示意，並非同一真實樣品的連續影像。", "The researcher prepares a thin specimen for transmitted light. This is a constructed teaching case, not sequential images of one real specimen."),
      nextQuestion: bi("細胞找到了。蛋白質 X 出現在哪些位置？", "Cells found. Where does protein X appear?"),
    },
  },
  {
    image: "cell-unmarked",
    observation: bi("前一份證據：細胞輪廓清楚，但不能只憑輪廓找到蛋白質 X。", "Previous evidence: clear cell outlines alone do not locate protein X."),
    investigation: {
      evidenceImage: "fluorescence-cell",
      evidenceTitle: bi("特定位置出現螢光訊號！", "Signals appeared at specific locations!"),
      evidence: bi("在這個教學案件中，蛋白質 X 的標記出現在綠色短絲狀區域；藍紫色圓形標出細胞核，幫助定位。顏色代表訊號，不一定是天然顏色。", "In this teaching case, the label for protein X appears in green filament-like regions. Blue-violet circles mark nuclei for orientation. Colors represent signals, not necessarily natural colors."),
      preparation: bi("研究員先加入針對目標的標記，再用適當照明觀察。訊號位置還不能讓我們分辨附近的細微膜構造。", "The researcher adds target-specific labels and uses suitable illumination. The signal location does not yet resolve nearby fine membrane structures."),
      nextQuestion: bi("訊號附近的膜長什麼樣？光學影像還分不開這些細節。", "What do membranes near the signal look like? The light image cannot resolve these details."),
    },
  },
  {
    image: "fluorescence-cell",
    observation: bi("前一份證據：已找到目標訊號的位置；現在要調查更細微的內部結構。", "Previous evidence: the target signal is located. Now investigate finer internal structures."),
    investigation: {
      evidenceImage: "electron-mitochondrion",
      evidenceTitle: bi("看清楚內部的細微皺摺！", "Fine internal folds resolved!"),
      evidence: bi("TEM 影像示意中，可分辨粒線體內膜的皺摺。它回答內部結構的問題，不能單靠這張圖認出蛋白質 X。", "The TEM diagram resolves folds in a mitochondrial inner membrane. It answers the structure question, but does not identify protein X by itself."),
      preparation: bi("研究員另行準備適合 TEM 的薄切片；通常需要特殊處理，並非直接觀看活動中的活細胞。此圖也不是將前一張螢光圖放大。", "The researcher prepares a suitable thin section for TEM. Special treatment is usually needed; this is not direct viewing of moving live cells, nor an enlargement of the fluorescence image."),
    },
  },
];

export const investigationUI = {
  evidence: bi("新的觀察證據", "New observation evidence"),
  next: bi("證據帶來的新問題", "A new question from the evidence"),
  continue: bi("帶著證據，繼續調查", "Continue with this evidence"),
  summary: bi("🕵️ 案件破解！回看你的調查", "🕵️ Case closed! Review your investigation"),
  conclusion: bi("你根據每一次新的研究問題，選擇不同的觀察方法。問題改變，適合的工具也會改變。", "You chose a different observation method for each new research question. When the question changes, the suitable tool can change too."),
};
