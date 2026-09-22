import {
  bi,
  type Question,
  type Stage,
  type MicroscopeType,
  type Text,
} from "./types";
import {
  caseQuestions as originalCases,
  toolChoices as originalTools,
} from "./gameData";
import { investigationSteps } from "./investigationData";

export const CONTENT_VERSION = 4;
export const toolIcons: Record<MicroscopeType, string> = {
  "naked-eye": "eye",
  magnifier: "search",
  stereo: "microscope",
  optical: "microscope",
  fluorescence: "sparkle",
  electron: "bolt",
};
export const toolChoices = originalTools.map((tool) => ({
  ...tool,
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
    id: "target",
    number: "02",
    icon: "sparkle",
    title: bi("找出微觀線索", "Find microscopic clues"),
    shortTitle: bi("尋找目標", "Find a target"),
    subtitle: bi("讓重要線索浮現", "Make important clues stand out"),
    introduction: bi(
      "不是每個細節都要一起看！這次只追查細胞核的位置。",
      "We do not need every detail at once! This time, find the nuclei.",
    ),
    reward: bi("目標線索已收進筆記本", "Target clue collected"),
  },
  {
    id: "mystery",
    number: "03",
    icon: "search",
    title: bi("神秘影像", "Mystery images"),
    shortTitle: bi("讀懂證據", "Read evidence"),
    subtitle: bi("先說你看到了什麼", "Start with what you can see"),
    introduction: bi(
      "實驗室留下四張新的真實顯微影像與觀察記錄。找出支持判斷的證據；只靠顏色還不夠！",
      "The lab left four new real micrographs and observation notes. Find evidence for your judgment; color alone is not enough!",
    ),
    reward: bi("影像證據已收進筆記本", "Image evidence collected"),
  },
  {
    id: "tools",
    number: "04",
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
    number: "05",
    icon: "detective",
    title: bi("微觀案件調查", "The microscopic investigation"),
    shortTitle: bi("最終案件", "Final case"),
    subtitle: bi(
      "一個神秘樣品，三個問題",
      "One mystery sample, three questions",
    ),
    introduction: bi(
      "實驗室收到神秘樣品！先想知道什麼，再選工具觀察。每一份新證據，都可能帶來下一個問題。",
      "A mystery sample arrived! Start with a question, choose a tool and observe. Each new piece of evidence may lead to another question.",
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
    id: "mission-target",
    stage: "target",
    type: "single",
    title: bi("細胞核在哪裡？", "Where are the nuclei?"),
    question: bi(
      "想更容易找到細胞核的位置，哪種方法最能幫忙？",
      "Which method best helps the nuclei stand out?",
    ),
    choices: [
      {
        id: "ordinary",
        title: bi(
          "一般觀察：許多構造一起看",
          "Ordinary observation: many structures together",
        ),
        image: "cell-unmarked",
      },
      {
        id: "labels",
        title: bi(
          "幫細胞核加上螢光標記",
          "Fluorescent labels on nuclei",
        ),
        image: "fluorescence-cell",
      },
    ],
    correctAnswer: ["labels"],
    microscopeType: "fluorescence",
    hint: bi(
      "這兩張示意圖裡，哪張讓細胞核和背景更容易分開看清楚？",
      "In these two diagrams, which makes the nuclei easier to see against the background?",
    ),
    strongHint: bi(
      "這張示意圖裡，藍紫色的圓形區域代表細胞核。找找哪種方法能讓它亮起來。",
      "In this diagram, blue-violet circles represent nuclei. Which method can make them light up?",
    ),
    explanation: bi(
      "你找到目標了！幫細胞核加上螢光標記，再用適合的光照射，就更容易找到它的位置。圖裡的綠色短絲用了另一種標記。",
      "You found the target! Label the nuclei and shine suitable light to find them more easily. The green filaments use another label.",
    ),
    funFact: bi(
      "螢光顯微鏡是光學顯微鏡的一種。這兩張示意圖用了相同的位置來比較，圖中的顏色不一定是細胞原本的天然顏色。",
      "Fluorescence is a type of light microscopy. These matched teaching diagrams do not show natural cell colors.",
    ),
  },
  {
    id: "mystery-light", stage: "mystery", type: "single",
    image: "mission-blood-real",
    title: bi("檔案 A・好多圓圓的小東西", "File A · Lots of tiny round shapes"),
    question: bi("想看這些細胞的形狀與分布，哪種工具最適合先用？", "Which tool would you use first to see these cells’ shapes and distribution?"),
    observation: bi("許多圓形細胞散布在視野中。記錄：用光和鏡片觀察，沒有加上螢光標記。", "Many round cells fill the field of view. Lab note: observed using light and lenses, without fluorescent labels."),
    choices: [
      { id: "optical", title: bi("複式光學顯微鏡・看細胞形狀", "Compound light microscope · cell shapes") },
      { id: "fluorescence", title: bi("螢光顯微鏡・找標記訊號", "Fluorescence microscope · labeled signals") },
      { id: "tem", title: bi("穿透式電子顯微鏡（TEM）・看內部細節", "Transmission electron microscope (TEM) · fine internal detail") },
    ],
    correctAnswer: ["optical"], microscopeType: "optical",
    hint: bi("先看細胞的外形和分布，不需要先找標記，也不需要看極細小的內部構造。", "Start with cell shapes and distribution; we do not need labels or very fine internal structures."),
    strongHint: bi("記錄提到光和鏡片。一般光學顯微鏡就能幫我們看這些細胞。", "The note mentions light and lenses. A compound light microscope can show these cells."),
    explanation: bi("這是真正的顯微鏡血液影像。一般光學顯微鏡可以讓我們看到許多細胞的形狀與分布；細胞不一定像洋蔥表皮的小方格。", "This is a real micrograph of blood. A compound light microscope shows the shapes and distribution of many cells; cells do not all look like the little boxes in onion skin."),
    funFact: bi("不同細胞有不同外形。選工具時，要先想知道什麼，不是只看細胞圓不圓。", "Cells come in different shapes. Choose a tool for your question, not just because a cell looks round."),
  },
  {
    id: "mystery-glow", stage: "mystery", type: "single",
    image: "mission-fluorescence-real",
    title: bi("檔案 B・不同顏色的線索", "File B · Clues in different colors"),
    question: bi("研究人員想分開看不同細胞構造，哪種方法能讓標記發出不同訊號？", "Which method lets labels give different signals so researchers can distinguish cell structures?"),
    observation: bi("紅綠色的細絲與藍色區域出現在不同位置。記錄：樣品加了標記，並用適合的光照射。", "Red and green filaments and blue regions appear in different places. Lab note: labels were added and illuminated with suitable light."),
    choices: [
      { id: "fluorescence", title: bi("螢光顯微鏡・觀察標記訊號", "Fluorescence microscope · labeled signals") },
      { id: "ordinary", title: bi("一般光學觀察・只比較外形", "Ordinary light observation · shapes alone") },
      { id: "sem", title: bi("掃描式電子顯微鏡（SEM）・看表面紋路", "Scanning electron microscope (SEM) · surface patterns") },
    ],
    correctAnswer: ["fluorescence"], microscopeType: "fluorescence",
    hint: bi("重點是記錄中的標記與照光，不只是圖片有很多顏色。", "The key clues are labeling and illumination, not just a colorful picture."),
    strongHint: bi("螢光標記配合適合的光，會發出可以偵測的訊號。找找能觀察這些訊號的工具。", "Fluorescent labels emit detectable signals under suitable light. Find the tool that observes those signals."),
    explanation: bi("這是真正的螢光影像！不同標記讓不同細胞構造顯出不同訊號。要一起看標記與照光記錄，不能只靠顏色判斷。", "This is a real fluorescence image! Different labels reveal different cell structures. Use the labeling and illumination notes too; color alone does not identify the method."),
    funFact: bi("這張影像使用共軛焦螢光顯微鏡拍攝，是螢光觀察的一種。顏色代表哪些構造，要查這張圖的標記記錄。", "This image was captured with a confocal fluorescence microscope. Check each image’s labeling notes to learn which structures its colors represent."),
  },
  {
    id: "mystery-sem", stage: "mystery", type: "single",
    image: "mission-pollen-real",
    title: bi("檔案 C・神秘小顆粒", "File C · Mysterious tiny particles"),
    question: bi("想看清楚這些小顆粒表面的凹凸和紋路，哪種工具最適合？", "Which tool best reveals the bumps and patterns on these tiny particles’ surfaces?"),
    observation: bi("長圓形小顆粒的表面有細密紋路與溝槽。這次想找的是外面的細節。", "The elongated particles have fine surface patterns and grooves. This question is about details on the outside."),
    choices: [
      { id: "surface", title: bi("掃描式電子顯微鏡（SEM）・看表面", "Scanning electron microscope (SEM) · surfaces") },
      { id: "section", title: bi("穿透式電子顯微鏡（TEM）・看薄切片內部", "Transmission electron microscope (TEM) · inside thin sections") },
      { id: "signals", title: bi("螢光顯微鏡・找標記訊號", "Fluorescence microscope · labeled signals") },
    ],
    correctAnswer: ["surface"], microscopeType: "electron",
    hint: bi("跟著表面的紋路看：這次要看外面，不是切片裡的構造。", "Follow the surface patterns: we want the outside, not structures inside a section."),
    strongHint: bi("再看一條記錄：儀器利用電子掃描樣品表面。找找擅長呈現表面細節的工具。", "Another lab note: electrons scanned the specimen surface. Look for the tool suited to surface detail."),
    explanation: bi("這些神秘小顆粒是花粉！掃描式電子顯微鏡（SEM）呈現了表面的凹凸與紋路。判斷的線索是表面細節，不是只因為影像是灰色。", "These mysterious particles are pollen! A scanning electron microscope (SEM) reveals their surface bumps and patterns. Surface detail is the clue, not simply the gray color."),
    funFact: bi("果蠅複眼和花粉外形很不同，卻都能用 SEM 觀察表面。先想知道什麼，再選適合的工具。", "Fly eyes and pollen look different, but SEM can reveal both surfaces. Start with your question, then choose a suitable tool."),
  },
  {
    id: "mystery-tem", stage: "mystery", type: "single",
    image: "mission-tem-real",
    title: bi("檔案 D・細胞裡的秘密", "File D · Secrets inside a cell"),
    question: bi("這張影像呈現細胞裡非常細小的內部構造。哪種工具最適合取得這類影像？", "This image reveals very fine structures inside a cell. Which tool best produces this kind of image?"),
    observation: bi("細胞裡可見細密的線條與不同區域。記錄：樣品另外製備成非常薄的切片。", "Fine lines and different regions are visible inside the cell. Lab note: the specimen was separately prepared as a very thin section."),
    choices: [
      { id: "inside", title: bi("穿透式電子顯微鏡（TEM）・看薄切片內部", "Transmission electron microscope (TEM) · inside thin sections") },
      { id: "surface", title: bi("掃描式電子顯微鏡（SEM）・看表面", "Scanning electron microscope (SEM) · surfaces") },
      { id: "signals", title: bi("螢光顯微鏡・找標記訊號", "Fluorescence microscope · labeled signals") },
    ],
    correctAnswer: ["inside"], microscopeType: "electron",
    hint: bi("這次看的是非常薄的切片裡的細微構造，不是外表，也不是找標記。", "We are looking at fine structures inside a very thin section, not its outer surface or labeled targets."),
    strongHint: bi("再看一條記錄：電子穿過很薄的樣品，讓我們看見內部。這是穿透式電子顯微鏡（TEM）。", "Another lab note: electrons passed through a very thin specimen to reveal the inside. This is transmission electron microscopy (TEM)."),
    explanation: bi("這是真正的單細胞生物內部影像。穿透式電子顯微鏡（TEM）通常需要非常薄的切片，才能觀察內部細節；不是把前一張光學或螢光圖片繼續放大。", "This real image shows inside a single-celled organism. Transmission electron microscopy (TEM) usually needs a very thin section to reveal internal detail; it is not a further enlargement of the previous light or fluorescence image."),
    funFact: bi("這份樣品是一種叫作衣藻的單細胞生物。不用記住它的名字，也能從薄切片與內部細節選出觀察方法。", "The specimen is a single-celled alga called Chlamydomonas. You can choose the method from the thin section and internal detail without remembering its name."),
  },
  research(
    "tools-protein",
    "tools",
    bi("蛋白質的地址", "A protein’s address"),
    bi(
      "科學家想知道某種蛋白質位在細胞的哪裡，最適合先選哪種方法？",
      "A scientist wants to locate a particular protein in a cell. Which method best fits?",
    ),
    "fluorescence",
    bi(
      "問題是找出特定目標的位置，不是所有細節。",
      "The question is about locating a specific target, not every detail.",
    ),
    bi(
      "選擇螢光顯微鏡，搭配能標記這種蛋白質的螢光標記，就能追查它的位置。",
      "Use fluorescence microscopy with a label for that protein to investigate its location.",
    ),
  ),
  research(
    "tools-fine",
    "tools",
    bi("更細小的構造", "Finer structures"),
    bi(
      "科學家想看清楚細胞內很細小的膜，複式光學顯微鏡看不清楚。哪種工具比較適合？",
      "A scientist needs to distinguish very fine membrane structures beyond compound light microscopy. Which tool fits?",
    ),
    "electron",
    bi(
      "這次要看到新的細節。把同一張圖片拉大，夠不夠呢？",
      "We need images that resolve finer structures, not just larger pictures.",
    ),
    bi(
      "電子顯微鏡能看清楚更細小的結構，適合追查這些膜的細節。但樣品通常需要特殊準備，通常不能直接觀察活著、正在活動的生物。工具要符合問題。",
      "Electron microscopy suits this investigation of fine membrane structures. But samples usually need special preparation, and living, moving organisms usually cannot be observed directly. Match the tool to the question.",
    ),
  ),
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

// Fixed narrative order: see cells → locate a target → investigate finer detail.
export const finalQuestions: Question[] = [
  research(
    "investigation-cells",
    "final",
    bi("調查 1 · 有沒有細胞？", "Investigation 1 · Are there cells?"),
    bi(
      "神秘樣品裡藏著肉眼看不清楚的細胞嗎？想先看清楚細胞的整體輪廓，該選哪種觀察工具？",
      "Does the mystery sample contain typical cells? Which method should first reveal their outlines?",
    ),
    "optical",
    bi(
      "先看見細胞的輪廓，還不需要追蹤某種蛋白質。",
      "First see cell outlines; we do not yet need to track a particular protein.",
    ),
    bi(
      "用複式光學顯微鏡，光與鏡片幫你看見細胞輪廓。調查結果：發現細胞！接下來找一種蛋白質的位置。",
      "Compound light microscopy uses light and lenses to reveal cell outlines. Result: cells found! Next, locate a protein.",
    ),
  ),
  research(
    "investigation-protein",
    "final",
    bi("調查 2 · 蛋白質在哪裡？", "Investigation 2 · Where is the protein?"),
    bi(
      "樣品裡找到細胞了！現在想追查蛋白質 X 的位置，選哪種方法？",
      "We found cells! Now we want to locate protein X. Which method fits?",
    ),
    "fluorescence",
    bi(
      "這次的任務是「尋找」：讓一種特定目標成為明顯線索。",
      "This task is to FIND: make one specific target stand out.",
    ),
    bi(
      "用螢光顯微鏡搭配針對這種蛋白質的標記，讓發光的標記指出它的位置。調查結果：找到目標位置！",
      "Use fluorescence microscopy with a label targeting that protein. Its signal reveals the location. Result: target located!",
    ),
  ),
  research(
    "investigation-detail",
    "final",
    bi(
      "調查 3 · 還藏著哪些細節？",
      "Investigation 3 · What finer details remain?",
    ),
    bi(
      "最後，想看清楚細胞內很細小、複式光學顯微鏡看不清的構造，選哪種工具？",
      "Finally, which tool can distinguish internal structures too fine for compound light microscopy?",
    ),
    "electron",
    bi(
      "這次要「深入」：看清楚更細小的構造。",
      "Now EXPLORE: distinguish finer structures.",
    ),
    bi(
      "電子顯微鏡使用電子形成影像，讓你深入觀察細小結構。三個問題，選擇不同工具，案件破解！",
      "Electron microscopes form images with electrons to reveal fine structures. Three questions, different tools: case closed!",
    ),
  ),
].map((question, index) => ({ ...question, ...investigationSteps[index] }));
export const questionsById = Object.fromEntries(
  [...caseQuestions, ...finalQuestions].map((q) => [q.id, q]),
);
