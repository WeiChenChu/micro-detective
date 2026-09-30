import { bi, type Choice, type Question } from "./types";

export const investigationUI = {
  evidence: bi("案件證據", "Case evidence"),
  locked: bi("尚未發現", "Undiscovered"),
  next: bi("證據帶來的新問題", "A new question from the evidence"),
  continue: bi("帶著證據，繼續調查", "Continue with this evidence"),
  synthesis: bi("整合三份證據", "Connect the three clues"),
  summary: bi("三份證據，一個解釋", "Three clues, one explanation"),
  explanation: bi("尾鰭受傷後，傷口先癒合，附近啟動再生反應。多種細胞參與、增殖，逐漸建立新組織，讓尾鰭長回來。", "After injury, the wound heals and regeneration begins nearby. Different cells take part, multiply and rebuild tissue as the fin grows back."),
  conclusion: bi("沒有一台顯微鏡可以回答所有問題。先想知道什麼，再選適合的觀察工具，最後把證據放在一起！", "No microscope answers every question. Ask what you want to know, choose a suitable tool, then put the evidence together!"),
  note: bi("影像與流程為教學示意；不同觀察可能需要不同樣品準備，不是同一份樣品一路放大。", "Images and steps are teaching models. Different observations may need different specimen preparation; these are not successive enlargements of one specimen."),
  bonus: bi("進階調查・TEM（選修）", "Bonus investigation · TEM (optional)"),
};

const records: Omit<Question, "choices">[] = [
  {
    id: "fin-shape", stage: "final", type: "single", toolSelection: true, microscopeType: "stereo",
    title: bi("尾鰭真的在長回來嗎？", "Is the fin growing back?"),
    question: bi("想比較受傷後幾天的整片尾鰭形狀，哪種工具最適合？", "Which tool best compares the whole fin’s shape over several days after injury?"),
    image: "fin-injury",
    observation: bi("看這條斑馬魚的尾鰭：缺了一部分！先觀察整片尾鰭。", "Part of this zebrafish’s tail fin is missing! Start with the whole fin."),
    correctAnswer: ["stereo"],
    hint: bi("這次比較毫米尺度的整片尾鰭，還不需要看個別細胞。", "Compare the whole, millimeter-scale fin; we do not need individual cells yet."),
    strongHint: bi("解剖顯微鏡能讓整片小尾鰭的形狀更清楚，方便比較。", "A stereo microscope gives a clear view of the small, whole fin for comparison."),
    explanation: bi("解剖顯微鏡適合比較整片尾鰭的輪廓；連續觀察顯示缺少的部分逐漸長回。", "A stereo microscope suits whole-fin outlines. Observations over time show the missing part gradually returning."),
    funFact: bi("第 0、3、7、14 天只是示意時間點；生長速度會受年齡、環境與受傷程度影響。", "Days 0, 3, 7 and 14 are illustrative time points. Regrowth varies with age, conditions and the injury."),
    investigation: {
      evidenceImage: "fin-regrowth", evidenceTitle: bi("證據 01：尾鰭慢慢長回來了！", "Evidence 01: The fin is growing back!"),
      evidence: bi("比較同一方向的尾鰭輪廓：缺少的部分逐漸長回。", "Compare the fin outlines in the same orientation: the missing part gradually returns."),
      preparation: bi("在合適的研究照護與觀察條件下，記錄不同天的整片尾鰭。這些圖不是實測數據，也不是保證的再生時程。", "Researchers record whole-fin views on different days under suitable care and observation conditions. These diagrams are not measurements or a guaranteed timeline."),
      nextQuestion: bi("尾鰭真的長回來了。新組織是怎麼出現的？到傷口附近找線索！", "The fin grows back. How does new tissue appear? Look near the wound!"),
    },
  },
  {
    id: "fin-tissue", stage: "final", type: "single", toolSelection: true, microscopeType: "optical",
    title: bi("新組織從哪裡來？", "Where does new tissue come from?"),
    question: bi("想看看傷口附近的細胞與組織，哪種工具最適合？", "Which tool best shows cells and tissue near the wound?"),
    image: "fin-regrowth", observation: bi("尾鰭正在長回來。這次把問題轉向傷口附近的組織。", "The fin is growing back. Now focus on the tissue near the wound."),
    correctAnswer: ["optical"],
    hint: bi("研究員已準備能透光的薄切片，想看細胞輪廓和排列。", "The researcher has prepared a thin section that transmits light to examine cell outlines and arrangement."),
    strongHint: bi("複式光學顯微鏡適合觀察薄切片裡的細胞與組織。", "A compound light microscope suits cells and tissue in thin sections."),
    explanation: bi("薄切片顯示傷口附近有許多細胞。配合研究資料，我們知道這個區域有多種細胞參與再生。", "A thin section reveals many cells near the wound. Together with research findings, we know different cells take part in regeneration here."),
    funFact: bi("再生芽基（blastema）是重要的再生區域，包含不同來源的細胞，不是一堆完全相同的幹細胞。", "The blastema is an important regenerating region with cells from different origins, not a pile of identical stem cells."),
    investigation: {
      evidenceImage: "fin-tissue", evidenceTitle: bi("證據 02：傷口附近有許多細胞！", "Evidence 02: Many cells are near the wound!"),
      evidence: bi("薄切片讓我們看見細胞和組織排列。這個再生區域有許多參與再生的細胞。", "A thin section reveals cells and tissue arrangement. Many cells participate in this regenerating region."),
      preparation: bi("另外準備尾鰭組織的薄切片並染色。只看輪廓，還不能知道哪些細胞正在增殖。", "Prepare and stain a thin section of fin tissue. Outlines alone do not tell us which cells are proliferating."),
      nextQuestion: bi("看見許多細胞了！哪些細胞正在增殖、增加數量？", "We see many cells! Which ones are multiplying?"),
    },
  },
  {
    id: "fin-proliferation", stage: "final", type: "single", toolSelection: true, microscopeType: "fluorescence",
    title: bi("哪些細胞正在增殖？", "Which cells are multiplying?"),
    question: bi("研究員讓正在增殖的細胞帶上螢光標記。要找到這些細胞，選哪種工具？", "The researcher adds a fluorescent label to proliferating cells. Which tool finds these labeled cells?"),
    image: "fin-tissue", observation: bi("同一傷口區域的示意：細胞輪廓還不能告訴我們哪些正在增殖。", "A model of the same wound region: outlines alone do not show which cells are multiplying."),
    correctAnswer: ["fluorescence"],
    hint: bi("這次要偵測指定標記的訊號，不是把外形放得更大。", "We need to detect a specific label’s signal, rather than enlarge cell outlines."),
    strongHint: bi("螢光顯微鏡搭配合適的光，可以找到發出訊號的標記。", "A fluorescence microscope uses suitable illumination to detect the label’s signal."),
    explanation: bi("螢光標記指出在標記期間合成新 DNA 的細胞，提供增殖活動的線索。傷口附近有許多這樣的細胞。", "The fluorescent label identifies cells making new DNA during labeling, a clue to proliferation. Many are near the wound."),
    funFact: bi("亮點代表指定標記，不是細胞天生發光，也不是所有參與再生的細胞都會同時亮起。", "Bright spots represent the selected label, not natural glow. Not every cell involved in regeneration lights up at once."),
    investigation: {
      evidenceImage: "fin-fluorescence", evidenceTitle: bi("證據 03：附近有許多正在增殖的細胞！", "Evidence 03: Many nearby cells are multiplying!"),
      evidence: bi("帶亮色外圈的細胞核有增殖標記，集中在再生區域附近；其他細胞核以藍色表示。", "Nuclei with bright rings carry the proliferation label and cluster near the regenerating region; other nuclei appear blue."),
      preparation: bi("教學模型使用 EdU 標記合成新 DNA 的細胞，再以螢光反應偵測。這是增殖的指標，不等於直接看到每個細胞分裂，也不能單靠影像證明再生的原因。", "This model uses EdU to label cells synthesizing new DNA, detected by a fluorescent reaction. It indicates proliferation, rather than directly showing every cell dividing, and images alone do not establish causality."),
      nextQuestion: bi("把三份證據放在一起：怎樣解釋尾鰭長回來？", "Put all three clues together: how can we explain fin regrowth?"),
    },
  },
];

export const synthesisQuestion: Question = {
  id: "fin-explanation", stage: "final", type: "single",
  title: investigationUI.synthesis,
  question: bi("根據三份證據，尾鰭是怎麼重新長回來的？", "What explanation fits all three pieces of evidence?"),
  choices: [
    { id: "stretch", title: bi("剩下的尾鰭只是被拉長了", "The remaining fin only stretched") },
    { id: "rebuild", title: bi("傷口附近的細胞參與再生、增殖，逐漸形成新組織", "Cells near the wound multiply and gradually rebuild tissue") },
    { id: "cover", title: bi("傷口表面蓋起來，就已經長回完整尾鰭", "Covering the wound alone restores the whole fin") },
  ],
  correctAnswer: ["rebuild"],
  hint: bi("不只尾鰭輪廓改變了：我們還看到細胞與增殖標記。哪個解釋能連起三份證據？", "The outline changed, and we found cells and proliferation labels. Which explanation connects all three?"),
  strongHint: bi("傷口癒合很重要，但重建尾鰭還需要細胞參與、增殖並建立新組織。", "Wound healing matters, but rebuilding the fin also involves cells multiplying and forming new tissue."),
  explanation: investigationUI.explanation,
  funFact: bi("不同觀察一起支持這個解釋；研究員還會用其他實驗檢驗細胞的作用。", "These observations support the explanation together; researchers use further experiments to test what the cells do."),
};

export function makeInvestigations(tools: Choice[]): Question[] {
  const options = [["naked-eye", "stereo", "optical"], ["optical", "stereo", "fluorescence"], ["optical", "fluorescence", "electron"]];
  return records.map((q, i) => ({ ...q, choices: options[i].map(id => ({ ...tools.find(t => t.id === id)!, description: undefined })) }));
}

export function makeBonus(tools: Choice[]): Question {
  return {
    id: "fin-bonus-tem", stage: "final", type: "single", toolSelection: true, microscopeType: "electron",
    title: investigationUI.bonus,
    question: bi("另一個問題：想看清楚細胞裡極細微的膜構造，該用什麼工具？", "A different question: which tool can resolve extremely fine membranes inside a cell?"),
    image: "fin-tissue", observation: bi("從組織裡的一個細胞，追查它內部的細微構造。", "From a cell in the tissue, investigate its fine internal structures."),
    choices: ["optical", "fluorescence", "electron"].map(id => ({ ...tools.find(t => t.id === id)!, description: undefined, ...(id === "electron" ? { title: bi("穿透式電子顯微鏡", "Transmission electron microscope"), toolMode: "TEM" as const } : {}) })),
    correctAnswer: ["electron"],
    hint: bi("要分辨很細微的內膜，需要合適的解析能力與另外準備的薄切片。", "Resolving fine inner membranes needs suitable resolving power and a separately prepared thin section."),
    strongHint: bi("TEM 讓電子穿過很薄的樣品，呈現內部超微構造。", "TEM passes electrons through a very thin specimen to reveal internal ultrastructure."),
    explanation: bi("TEM 可以分辨光學顯微鏡看不清楚的超微細胞結構。這不是更好的顯微鏡，而是在回答另一個問題。", "TEM resolves cellular ultrastructure beyond light microscopy. It is not simply a better microscope—it answers a different question."),
    funFact: investigationUI.note,
    investigation: {
      evidenceImage: "electron-mitochondrion", evidenceTitle: bi("進階證據：粒線體內膜的皺摺", "Bonus evidence: folds of a mitochondrial inner membrane"),
      evidence: bi("這張粒線體示意圖呈現內膜皺摺。這不是更好的顯微鏡，而是在回答另一個問題。TEM 不是破解主案件的必要步驟。", "This mitochondrial diagram shows inner membrane folds. It is not simply a better microscope—it answers a different question. TEM is not needed to solve the main case."),
      preparation: bi("另外準備適合電子顯微鏡的樣品：極薄切片通常需要固定等處理。這是沿用的粒線體教學圖，不是這條魚的實測影像，也不是前一張圖的放大。", "Prepare a separate specimen suitable for electron microscopy: an ultrathin section usually requires fixation and other treatments. This reused mitochondrial diagram is not measured from this fish or an enlargement of the preceding image."),
    },
  };
}
