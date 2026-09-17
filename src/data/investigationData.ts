import { bi, type Question } from "./types";

// Stable question/answer IDs preserve v0.23 saves. Evidence is derived from completion.
export const investigationSteps: Pick<Question, "image" | "observation" | "investigation">[] = [
  {
    observation: bi("樣品 A：研究員收到一小片生物組織。肉眼看得到這一片，卻看不清楚裡面有什麼。", "Sample A: a researcher received a small piece of biological tissue. Our eyes see a piece, but cannot distinguish its tiny units."),
    investigation: {
      evidenceImage: "cell-unmarked",
      evidenceTitle: bi("找到清楚的細胞輪廓！", "Clear cell outlines found!"),
      evidence: bi("觀察到一個個有邊界的細胞。這份證據回答了第一個問題，卻還沒告訴我們蛋白質 X 在哪裡。", "We see individual bounded cells. This answers the first question, but does not locate protein X."),
      preparation: bi("研究員先準備一片薄薄、可以讓光穿過的樣品。這是為學習設計的案件示意，不是同一個真實樣品連續拍下的影像。", "The researcher prepares a thin specimen for transmitted light. This is a constructed teaching case, not sequential images of one real specimen."),
      nextQuestion: bi("細胞找到了。蛋白質 X 出現在哪些位置？", "Cells found. Where does protein X appear?"),
    },
  },
  {
    image: "cell-unmarked",
    observation: bi("前一份證據：細胞輪廓清楚，但不能只憑輪廓找到蛋白質 X。", "Previous evidence: clear cell outlines alone do not locate protein X."),
    investigation: {
      evidenceImage: "fluorescence-cell",
      evidenceTitle: bi("特定位置出現螢光訊號！", "Signals appeared at specific locations!"),
      evidence: bi("這張案件示意圖裡，綠色短絲上的標記指出蛋白質 X 的位置。藍紫色圓形代表細胞核，幫我們比較位置。這些是螢光訊號的顏色，不一定是天然顏色。", "In this teaching case, the label for protein X appears in green filament-like regions. Blue-violet circles mark nuclei for orientation. Colors represent signals, not necessarily natural colors."),
      preparation: bi("研究員先幫目標加上標記，再用適合的光照射。我們知道目標在哪裡了，但附近更細小的膜還看不清楚。", "The researcher adds target-specific labels and uses suitable illumination. The signal location does not yet resolve nearby fine membrane structures."),
      nextQuestion: bi("發光位置附近的膜長什麼樣？光學影像還看不清楚這些細節。", "What do membranes near the signal look like? The light image cannot resolve these details."),
    },
  },
  {
    image: "fluorescence-cell",
    observation: bi("前一份證據：知道目標在哪裡了！現在想看清楚裡面更細小的構造。", "Previous evidence: the target signal is located. Now investigate finer internal structures."),
    investigation: {
      evidenceImage: "electron-mitochondrion",
      evidenceTitle: bi("看清楚內部的細小皺摺！", "Fine internal folds resolved!"),
      evidence: bi("這張 TEM（穿透式電子顯微鏡）示意圖讓我們看清楚粒線體內膜的皺摺。不過，只看這張圖，不能知道哪裡是蛋白質 X。", "The TEM（穿透式電子顯微鏡） diagram resolves folds in a mitochondrial inner membrane. It answers the structure question, but does not identify protein X by itself."),
      preparation: bi("研究員另外把樣品準備成很薄的切片，再用 TEM（穿透式電子顯微鏡）觀察。樣品通常需要特別處理，通常不能直接看活著的細胞活動。這張圖也不是把前一張螢光圖放大。", "The researcher prepares a suitable thin section for TEM（穿透式電子顯微鏡）. Special treatment is usually needed; this is not direct viewing of moving live cells, nor an enlargement of the fluorescence image."),
    },
  },
];

export const investigationUI = {
  evidence: bi("新的觀察證據", "New observation evidence"),
  next: bi("證據帶來的新問題", "A new question from the evidence"),
  continue: bi("帶著證據，繼續調查", "Continue with this evidence"),
  summary: bi("🕵️ 案件破解！回看你的調查", "🕵️ Case closed! Review your investigation"),
  conclusion: bi("你跟著新問題，選了不同的觀察工具。想知道的事變了，適合的工具也可能改變。", "You chose a different observation method for each new research question. When the question changes, the suitable tool can change too."),
};
