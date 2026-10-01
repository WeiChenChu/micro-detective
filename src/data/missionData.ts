import {
  bi,
  type Question,
  type Stage,
  type MicroscopeType,
  type Text,
  type Choice,
} from "./types";
import {
  caseQuestions as originalCases,
  toolChoices as originalTools,
} from "./gameData";
import { makeInvestigations, makeBonus, synthesisQuestion } from "./investigationData";
import { toolIllustrations, type ObservationToolId } from "./toolIllustrations";

export const CONTENT_VERSION = 7;
export const toolIcons: Record<MicroscopeType, string> = {
  "naked-eye": "eye",
  magnifier: "search",
  stereo: "microscope",
  optical: "microscope",
  fluorescence: "sparkle",
  electron: "bolt",
};
const missionToolVisuals: Record<string, ObservationToolId> = {
  "naked-eye": "scale", magnifier: "magnifier", stereo: "stereo",
  optical: "optical", fluorescence: "fluorescence", electron: "electron",
};
export const toolChoices: Choice[] = originalTools.map((tool) => ({
  ...tool,
  toolVisualId: missionToolVisuals[tool.id],
  title:
    tool.id === "optical"
      ? bi("複式光學顯微鏡", "Compound light microscope")
      : tool.title,
  description:
    tool.id === "optical"
      ? bi("看見 · 光與鏡片", "SEE · Light and lenses")
      : tool.id === "fluorescence"
        ? bi(
            "尋找 · 螢光標記（光學的一種）",
            "FIND · Labels (a type of light microscopy)",
          )
        : tool.id === "electron"
          ? bi("深入 · 電子形成影像", "EXPLORE · Images formed with electrons")
          : tool.description,
}));
export const stages: Stage[] = [
  {
    id: "scale",
    number: "01",
    icon: "eye",
    title: bi("誰需要顯微鏡？", "Who needs a microscope?"),
    shortTitle: bi("觀察大小", "Observe size"),
    subtitle: bi("先觀察整體，再找細節", "See the whole, then look for detail"),
    introduction: bi(
      "這次只想知道它在哪裡、看出大概的樣子。哪些東西太小，通常需要顯微鏡幫忙才看得到？",
      "This time we only want to find each object and see its rough outline, not inspect details. Which are usually too small to see without a microscope?",
    ),
    reward: bi("尺度線索已收進筆記本", "Scale clue collected"),
  },
  {
    id: "mystery",
    number: "02",
    icon: "search",
    title: bi("神秘影像", "Mystery images"),
    shortTitle: bi("讀懂證據", "Read evidence"),
    subtitle: bi("先說你看到了什麼", "Start with what you can see"),
    introduction: bi(
      "實驗室留下四張真實顯微影像。先觀察，再依問題選工具；需要時可以打開提示。",
      "The lab left four real micrographs. Observe, then choose a tool for the question. Open a hint if you need one.",
    ),
    reward: bi("影像證據已收進筆記本", "Image evidence collected"),
  },
  {
    id: "tools",
    number: "03",
    icon: "microscope",
    title: bi("幫科學家選工具", "Choose a scientist’s tool"),
    shortTitle: bi("選對工具", "Choose a tool"),
    subtitle: bi("先問問題，再選工具", "Ask a question, then choose a tool"),
    introduction: bi(
      "現在真的換你自己做判斷了！科學家想找什麼線索？",
      "Now it is your turn to decide! What clue does the scientist need?",
    ),
    reward: bi("研究線索已收進筆記本", "Research clue collected"),
  },
  {
    id: "final",
    number: "04",
    icon: "detective",
    title: bi("最終案件：重新長回來的尾鰭", "Final Case: How Does a Zebrafish Fin Grow Back?"),
    shortTitle: bi("最終案件", "Final case"),
    subtitle: bi(
      "三份證據，一個解釋",
      "Three clues, one explanation",
    ),
    introduction: bi(
      "斑馬魚的尾鰭受傷後，竟然可以慢慢長回來。它是怎麼辦到的？幫研究員找到三份證據，破解再生的秘密！",
      "A zebrafish’s injured tail fin can grow back over time. How does it happen? Help the researcher find three clues and solve the case!",
    ),
    reward: bi("案件破解！", "Case closed!"),
  },
];

const research = (
  id: string,
  stage: "tools" | "final",
  title: Text,
  question: Text,
  answer: MicroscopeType,
  hint: Text,
  explanation: Text,
  image?: string,
): Question => ({
  id,
  stage,
  title,
  question,
  type: "single",
  choices: toolChoices,
  answerExplanations: answer === "fluorescence" ? {
    optical: bi("一般光學影像能看見細胞的外形，卻不能光靠外形找到某種蛋白質。要先幫它做記號。", "An ordinary light image shows cell outlines, but outlines alone do not identify a particular protein. We need a target-specific signal."),
    electron: bi("電子顯微鏡能看清楚細小構造，卻不會自動認出要找的蛋白質。這次先幫它加上標記，通常不必先做電子顯微鏡需要的特別準備。", "Electron microscopy resolves fine structure but does not automatically identify protein X. This question first needs a specific label, usually without electron microscopy’s special preparation."),
    "naked-eye": bi("這次要找細胞裡的蛋白質，肉眼看不出它在哪裡。", "The target is inside cells; our eyes cannot resolve the location of this protein."),
  } : answer === "electron" ? {
    optical: bi("光學影像可以顯示細胞，這次的膜細節卻小到分不開；只增加倍率也無法補出這些結構。", "The light image shows cells, but these membrane details cannot be resolved; magnification alone cannot supply them."),
    fluorescence: bi("螢光標記能幫你找出目標在哪裡。這次想看清楚更細小的膜，需要換一種觀察方法，也要另外準備樣品。", "Fluorescence labels locate targets. Resolving finer membrane shapes needs different resolving power and specimen preparation."),
  } : answer === "optical" ? {
    electron: bi("電子顯微鏡能看得更細，但通常需要特別準備樣品。這次先看細胞外形，用薄薄、能透光的樣品和光學顯微鏡就能回答。", "Electron imaging reveals finer detail but usually needs special preparation. Light observation of a suitable thin specimen can answer this first question about cell outlines."),
    fluorescence: bi("螢光適合找有標記的目標。這次還沒要找哪一種分子，先看看細胞外形就好。", "Fluorescence suits labeled targets. No specific molecule is being tracked yet; start with cell outlines."),
  } : undefined,
  correctAnswer: [answer],
  microscopeType: answer,
  toolSelection: true,
  image,
  hint,
  strongHint: answer === "fluorescence"
    ? bi("找找能搭配螢光標記，讓特定目標亮起來的工具。", "Look for a tool that uses fluorescent labels to light up a selected target.")
    : answer === "electron"
      ? bi("光學影像還看不清楚，找找用電子形成影像的工具。", "The light image cannot show these details. Look for a tool that forms images with electrons.")
      : answer === "optical"
        ? bi("這次先看薄樣品裡的細胞邊界，找找用光和鏡片觀察的工具。", "Start with cell boundaries in a thin sample. Look for a tool that uses light and lenses.")
        : bi("這次只看整條成魚往哪裡游，先試試自己的眼睛。", "We only want to follow the whole adult fish. Try your own eyes first."),
  explanation,
  funFact: answer === "fluorescence"
    ? bi("螢光影像的顏色也可以由電腦指定，不一定是樣品原本的天然顏色。", "A computer can assign fluorescence image colors; they are not necessarily the sample’s natural colors.")
    : answer === "electron"
      ? bi("電子顯微鏡影像也可以後來加上顏色，幫助我們認出不同構造。", "Electron microscope images can be colored later to help us recognize different structures.")
      : answer === "optical"
        ? bi("有些細胞很透明，染色可以讓它們的構造更容易看清楚。", "Some cells are very transparent. Staining can make their structures easier to see.")
        : bi("想看游動方向，可以看整條魚；想看魚身上的細胞，就要換一個觀察方法。", "Watch the whole fish for swimming direction. To see its cells, choose another observation method."),
});
export const caseQuestions: Question[] = [
  {
    ...originalCases[0],
    id: "mission-scale",
    stage: "scale",
    title: bi("誰需要工具幫忙？", "Who needs a tool?"),
    question: bi(
      "如果只想知道它在哪裡、看出大概的形狀，哪些東西通常小到需要顯微鏡幫忙才看得到？",
      "If we only want to find it and see its rough outline, which are usually small enough to need a microscope?",
    ),
    choices: originalCases[0].choices.filter((c) => c.id !== "leaf"),
    correctAnswer: ["animal-cell", "bacterium"],
    hint: bi(
      "卡片上的圖已經放大了。想想平常看到的大小，哪些小到很難直接找到？",
      "The pictures are enlarged. Think about their usual sizes: which are too small to spot directly?",
    ),
    strongHint: bi(
      "選出「一般動物細胞」和「常見細菌」。成體果蠅雖然小，肉眼就能看出大概的樣子。",
      "Choose the typical animal cell and common bacterium. An adult fly is small but its overall shape is visible.",
    ),
    explanation: bi(
      "你注意到大小的差別！一般動物細胞和單隻常見細菌通常需要顯微鏡；成魚與成體果蠅，肉眼就能看出大概的樣子。肉眼可見，不代表肉眼適合觀察細節；仔細看完整果蠅可用解剖顯微鏡。",
      "You noticed the difference in size! Typical animal cells and single common bacteria need microscopes. Adult fish and flies have outlines visible to our eyes. Being visible does not make our eyes best for details; use a stereomicroscope for a close view of an intact fruit fly.",
    ),
  },
  {
    id: "mystery-light", stage: "mystery", type: "single",
    image: "mission-blood-real",
    title: bi("檔案 A・好多圓圓的小東西", "File A · Lots of tiny round shapes"),
    question: bi("想看這些細胞的形狀與分布，哪種工具最適合先用？", "Which tool would you use first to see these cells’ shapes and distribution?"),
    observation: bi("許多圓形細胞散布在明亮的背景上。看看它們的輪廓和排列。", "Many round cells lie against a bright background. Look at their outlines and arrangement."),
    choices: [
      { id: "optical", toolVisualId: "optical", title: bi("複式光學顯微鏡", "Compound light microscope"), description: bi("看細胞形狀", "Cell shapes") },
      { id: "fluorescence", toolVisualId: "fluorescence", title: bi("螢光顯微鏡", "Fluorescence microscope"), description: bi("找標記訊號", "Labeled signals") },
      { id: "tem", toolVisualId: "electron", toolMode: "TEM", title: bi("穿透式電子顯微鏡", "Transmission electron microscope"), description: bi("看內部細節", "Fine internal detail") },
    ],
    correctAnswer: ["optical"], microscopeType: "optical",
    hint: bi("這次看整體細胞形狀，不是極細微的表面或內部構造。", "Think about whole cell shapes, rather than extremely fine surface or internal structures."),
    strongHint: bi("補充記錄：這類影像可以利用可見光和鏡片觀察。", "Extra lab note: visible light and lenses can show this kind of view."),
    explanation: bi("這是真正的顯微鏡血液影像。一般光學顯微鏡可以讓我們看到許多細胞的形狀與分布；細胞不一定像洋蔥表皮的小方格。", "This is a real micrograph of blood. A compound light microscope shows the shapes and distribution of many cells; cells do not all look like the little boxes in onion skin."),
    funFact: bi("不同細胞有不同外形。選工具時，要先想知道什麼，不是只看細胞圓不圓。", "Cells come in different shapes. Choose a tool for your question, not just because a cell looks round."),
  },
  {
    id: "mystery-glow", stage: "mystery", type: "single",
    image: "mission-fluorescence-real",
    title: bi("檔案 B・不同顏色的線索", "File B · Clues in different colors"),
    question: bi("想分開找出細胞裡不同構造的位置，哪種方法最適合？", "Which method best helps locate different structures within cells?"),
    observation: bi("紅綠色細絲與藍色橢圓區域出現在不同位置。哪些區域聚在一起，哪些向外延伸？", "Red and green threads and blue oval regions appear in different places. Which cluster together, and which extend outward?"),
    choices: [
      { id: "fluorescence", toolVisualId: "fluorescence", title: bi("螢光顯微鏡", "Fluorescence microscope"), description: bi("觀察標記訊號", "Labeled signals") },
      { id: "ordinary", toolVisualId: "optical", title: bi("一般光學觀察", "Ordinary light observation"), description: bi("只比較外形", "Shapes alone") },
      { id: "sem", toolVisualId: "electron", toolMode: "SEM", title: bi("掃描式電子顯微鏡", "Scanning electron microscope"), description: bi("看表面紋路", "Surface patterns") },
    ],
    correctAnswer: ["fluorescence"], microscopeType: "fluorescence",
    hint: bi("這次想分開找特定構造的位置，不只是看細胞外形。顏色本身不能證明拍攝方法。", "We want to locate specific structures separately, beyond cell outlines. Color alone cannot prove how an image was made."),
    strongHint: bi("補充記錄：研究人員加上螢光標記，再用適合的光照射，偵測它們發出的訊號。", "Extra lab note: researchers added fluorescent labels, illuminated them with suitable light, and detected their signals."),
    explanation: bi("螢光顯微鏡搭配不同標記，能分開找出細胞構造的位置。這張照片的記錄確認用了螢光標記與適合的光；不能只靠顏色認定拍攝方法。", "Fluorescence microscopy with different labels helps locate cell structures separately. This photo’s records confirm fluorescent labels and suitable illumination; color alone cannot identify the method."),
    funFact: bi("這張影像使用共軛焦螢光顯微鏡拍攝，是螢光觀察的一種。顏色代表哪些構造，要查這張圖的標記記錄。", "This image was captured with a confocal fluorescence microscope. Check each image’s labeling notes to learn which structures its colors represent."),
  },
  {
    id: "mystery-sem", stage: "mystery", type: "single",
    image: "mission-pollen-real",
    title: bi("檔案 C・神秘小顆粒", "File C · Mysterious tiny particles"),
    question: bi("想看清楚這些小顆粒表面的凹凸和紋路，哪種工具最適合？", "Which tool best reveals the bumps and patterns on these tiny particles’ surfaces?"),
    observation: bi("長圓形小顆粒的表面有細密紋路與溝槽。這次想找的是外面的細節。", "The elongated particles have fine surface patterns and grooves. This question is about details on the outside."),
    choices: [
      { id: "surface", toolVisualId: "electron", toolMode: "SEM", title: bi("掃描式電子顯微鏡", "Scanning electron microscope"), description: bi("看表面", "Surfaces") },
      { id: "section", toolVisualId: "electron", toolMode: "TEM", title: bi("穿透式電子顯微鏡", "Transmission electron microscope"), description: bi("看薄切片內部", "Inside thin sections") },
      { id: "signals", toolVisualId: "fluorescence", title: bi("螢光顯微鏡", "Fluorescence microscope"), description: bi("找標記訊號", "Labeled signals") },
    ],
    correctAnswer: ["surface"], microscopeType: "electron",
    hint: bi("跟著表面的紋路看：這次要看外面，不是切片裡的構造。", "Follow the surface patterns: we want the outside, not structures inside a section."),
    strongHint: bi("再看一條記錄：儀器利用電子掃描樣品表面。找找擅長呈現表面細節的工具。", "Another lab note: electrons scanned the specimen surface. Look for the tool suited to surface detail."),
    explanation: bi("這些神秘小顆粒是花粉！SEM（掃描式電子顯微鏡）呈現了表面的凹凸與紋路。判斷的線索是表面細節，不是只因為影像是灰色。", "These mysterious particles are pollen! A scanning electron microscope (SEM) reveals their surface bumps and patterns. Surface detail is the clue, not simply the gray color."),
    funFact: bi("果蠅複眼和花粉外形很不同，卻都能用 SEM（掃描式電子顯微鏡）觀察表面。先想知道什麼，再選適合的工具。", "Fly eyes and pollen look different, but SEM can reveal both surfaces. Start with your question, then choose a suitable tool."),
  },
  {
    id: "mystery-tem", stage: "mystery", type: "single",
    image: "mission-tem-real",
    title: bi("檔案 D・細胞裡的秘密", "File D · Secrets inside a cell"),
    question: bi("這張影像呈現細胞裡非常細小的內部構造。哪種工具最適合取得這類影像？", "This image reveals very fine structures inside a cell. Which tool best produces this kind of image?"),
    observation: bi("細胞的輪廓裡有細密線條、深色區域與較亮的空間。仔細看看裡面的細節。", "Fine lines, dark regions and lighter spaces lie within the cell outline. Look closely at the details inside."),
    choices: [
      { id: "inside", toolVisualId: "electron", toolMode: "TEM", title: bi("穿透式電子顯微鏡", "Transmission electron microscope"), description: bi("看薄切片內部", "Inside thin sections") },
      { id: "surface", toolVisualId: "electron", toolMode: "SEM", title: bi("掃描式電子顯微鏡", "Scanning electron microscope"), description: bi("看表面", "Surfaces") },
      { id: "signals", toolVisualId: "fluorescence", title: bi("螢光顯微鏡", "Fluorescence microscope"), description: bi("找標記訊號", "Labeled signals") },
    ],
    correctAnswer: ["inside"], microscopeType: "electron",
    hint: bi("這次看的是非常薄的切片裡的細微構造，不是外表，也不是找標記。", "We are looking at fine structures inside a very thin section, not its outer surface or labeled targets."),
    strongHint: bi("再看一條記錄：電子穿過很薄的樣品，讓我們看見內部。這是 TEM（穿透式電子顯微鏡）。", "Another lab note: electrons passed through a very thin specimen to reveal the inside. This is transmission electron microscopy (TEM)."),
    explanation: bi("這是真正的單細胞生物內部影像。TEM（穿透式電子顯微鏡）通常需要非常薄的切片，才能觀察內部細節；不是把前一張光學或螢光圖片繼續放大。", "This real image shows inside a single-celled organism. Transmission electron microscopy (TEM) usually needs a very thin section to reveal internal detail; it is not a further enlargement of the previous light or fluorescence image."),
    funFact: bi("這份樣品是一種叫作衣藻的單細胞生物。不用記住它的名字，也能從薄切片與內部細節選出觀察方法。", "The specimen is a single-celled alga called Chlamydomonas. You can choose the method from the thin section and internal detail without remembering its name."),
  },
  research(
    "tools-fish",
    "tools",
    bi("看魚游泳", "Watch a fish swim"),
    bi(
      "只想知道水缸裡的成體斑馬魚往哪裡游，需要先用什麼觀察？",
      "You only want to see which way an adult zebrafish swims in a tank. What should you use first?",
    ),
    "naked-eye",
    bi(
      "先想想整條成魚是否能直接看見。",
      "Can you see the whole adult fish directly?",
    ),
    bi(
      "肉眼就能觀察成魚的游動！這個問題不需要最能放大或分辨細節的工具。",
      "Your eyes can observe an adult fish swimming! This question does not need the greatest magnification or finest detail.",
    ),
    "zebrafish",
  ),
];

// Fixed evidence chain, followed by interpretation. TEM never gates completion.
export const investigationQuestions = makeInvestigations([...toolChoices, {
  id: "stereo", toolVisualId: "stereo", title: toolIllustrations.stereo.toolName,
}]);
export const finalQuestions: Question[] = [...investigationQuestions, synthesisQuestion];
export const bonusQuestion = makeBonus(toolChoices);
export const questionsById = Object.fromEntries(
  [...caseQuestions, ...finalQuestions].map((q) => [q.id, q]),
);
