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
import { academyUI } from "./academyUI";
import { investigationSteps } from "./investigationData";

export const CONTENT_VERSION = 3;
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
      "這次只想發現目標在哪裡、看見大致輪廓，還不追查細節。哪些太小，通常需要顯微鏡幫忙？",
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
      "實驗室留下四份影像示意與觀察記錄。找出支持判斷的證據；只靠顏色還不夠！",
      "The lab left four image diagrams and observation notes. Find evidence for your judgment; color alone is not enough!",
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
      "科學家想回答什麼？選擇最適合這個問題的方法。",
      "What does the scientist want to know? Choose the method that fits the question.",
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
    optical: bi("一般光學影像能看細胞輪廓，但輪廓本身不會指出某種蛋白質的位置，需要針對目標的訊號。", "An ordinary light image shows cell outlines, but outlines alone do not identify a particular protein. We need a target-specific signal."),
    electron: bi("電子顯微鏡能分辨細微結構，卻不會自動認出蛋白質 X；這次先需要特定標記，通常也不必先做電子影像的特殊處理。", "Electron microscopy resolves fine structure but does not automatically identify protein X. This question first needs a specific label, usually without electron microscopy’s special preparation."),
    "naked-eye": bi("這次目標在細胞內，肉眼的解析能力不足以定位這種蛋白質。", "The target is inside cells; our eyes cannot resolve the location of this protein."),
  } : answer === "electron" ? {
    optical: bi("光學影像可以顯示細胞，這次的膜細節卻小到分不開；只增加倍率也無法補出這些結構。", "The light image shows cells, but these membrane details cannot be resolved; magnification alone cannot supply them."),
    fluorescence: bi("螢光標記適合定位目標；這次想分開更細微的膜形狀，需要不同的解析能力與樣品準備。", "Fluorescence labels locate targets. Resolving finer membrane shapes needs different resolving power and specimen preparation."),
  } : answer === "optical" ? {
    electron: bi("電子影像能看得更細，但通常需要特殊處理；先看一般細胞的輪廓，用適合薄樣品的光學觀察就能回答。", "Electron imaging reveals finer detail but usually needs special preparation. Light observation of a suitable thin specimen can answer this first question about cell outlines."),
    fluorescence: bi("螢光適合尋找已標記的目標；目前還沒指定要追蹤哪種分子，先觀察細胞輪廓即可。", "Fluorescence suits labeled targets. No specific molecule is being tracked yet; start with cell outlines."),
  } : undefined,
  correctAnswer: [answer],
  microscopeType: answer,
  toolSelection: true,
  image,
  hint,
  strongHint: explanation,
  explanation,
  funFact: academyUI.conclusion,
});
const mystery = (
  id: string,
  image: string,
  title: Text,
  observation: Text,
  choices: Question["choices"],
  answer: string,
  tool: MicroscopeType,
  explanation: Text,
): Question => ({
  id,
  stage: "mystery",
  type: "single",
  title,
  image,
  observation,
  question: bi(
    "這張影像裡，哪個線索最能支持你的判斷？",
    "Which clue in this image best supports your judgment?",
  ),
  choices,
  correctAnswer: [answer],
  microscopeType: tool,
  hint: bi("先找出邊界、表面或特定亮點：哪個選項描述了你實際看到的形狀與位置？", "Look for boundaries, surfaces or selected bright spots. Which option describes the shapes and positions you can actually see?"),
  strongHint: id === "mystery-sem"
    ? bi("調查記錄：儀器利用電子掃描樣品表面。搭配凸起的小面與細毛，支持 SEM 的判斷；灰色本身不是充分證據。", "Investigation note: electrons scanned the specimen surface. Together with raised facets and hairs, this supports SEM; gray alone is not enough.")
    : id === "mystery-tem"
      ? bi("調查記錄：電子穿過很薄的樣品，呈現內部。搭配構造內的細微皺摺，支持 TEM 的判斷。", "Investigation note: electrons passed through a very thin specimen to reveal the inside. Fine internal folds support TEM.")
      : explanation,
  explanation,
  funFact: bi(
    "同一個樣品可以用不同工具觀察。要搭配影像細節與觀察方法，不能只猜顏色！",
    "One sample can be studied with different tools. Use image details and the observation method, not color alone!",
  ),
});

export const caseQuestions: Question[] = [
  {
    ...originalCases[0],
    id: "mission-scale",
    stage: "scale",
    title: bi("誰需要工具幫忙？", "Who needs a tool?"),
    question: bi(
      "如果只想知道它在哪裡，並看見大致輪廓，哪些小到通常需要顯微鏡幫忙？",
      "If we only want to find it and see its rough outline, which are usually small enough to need a microscope?",
    ),
    choices: originalCases[0].choices.filter((c) => c.id !== "leaf"),
    correctAnswer: ["animal-cell", "bacterium"],
    hint: bi(
      "成魚和成果蠅的大致輪廓肉眼可見；卡片上的細胞與細菌已經放大了。",
      "An adult fish or fly is visible to our eyes. The cell and bacterium cards are already enlarged.",
    ),
    strongHint: bi(
      "選出「一般動物細胞」和「常見細菌」。成果蠅雖然小，肉眼仍能發現牠、看見大致輪廓。",
      "Choose the typical animal cell and common bacterium. An adult fly is small but its overall shape is visible.",
    ),
    explanation: bi(
      "你注意到大小的差別！一般動物細胞和單隻常見細菌通常需要顯微鏡；成魚與成果蠅的大致輪廓肉眼可見。肉眼可見，不代表肉眼適合觀察細節；仔細看完整果蠅可用解剖顯微鏡。",
      "You noticed the difference in size! Typical animal cells and single common bacteria need microscopes. Adult fish and flies have outlines visible to our eyes. Being visible does not make our eyes best for details; use a stereomicroscope for a close view of an intact fruit fly.",
    ),
  },
  {
    id: "mission-target",
    stage: "target",
    type: "single",
    title: bi("細胞核在哪裡？", "Where are the nuclei?"),
    question: bi(
      "想讓細胞核的位置更容易辨認，哪種方法最能幫忙？",
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
          "螢光標記細胞核，再用適合的光照射",
          "Label nuclei and illuminate them with suitable light",
        ),
        image: "fluorescence-cell",
      },
    ],
    correctAnswer: ["labels"],
    microscopeType: "fluorescence",
    hint: bi(
      "找找讓目標與背景分開的訊號。哪張圖的大圓區域更明顯？",
      "Look for a signal that separates the target from its background. Which image makes the large round areas stand out?",
    ),
    strongHint: bi(
      "藍紫色的大圓區域標出了細胞核。選擇針對細胞核加上螢光標記的方法。",
      "The large blue-violet regions mark nuclei. Choose the method that labels the nuclei.",
    ),
    explanation: bi(
      "你找到目標了！大圓的藍紫色訊號標出了細胞核。螢光標記讓特定構造更明顯；綠色短絲是另一種標記的訊號。",
      "You found the target! The large blue-violet signals mark nuclei. Labels make selected structures stand out; green short filaments represent another label.",
    ),
    funFact: bi(
      "螢光是光學顯微鏡的一種。這兩張是同構圖教學示意，顏色不代表細胞天然的顏色。",
      "Fluorescence is a type of light microscopy. These matched teaching diagrams do not show natural cell colors.",
    ),
  },
  mystery(
    "mystery-light",
    "optical-onion",
    bi("檔案 A · 小房間", "File A · Little rooms"),
    bi(
      "看見一格格邊界。記錄：光穿過薄薄的洋蔥表皮。",
      "Notice the repeating boundaries. Lab note: light passed through thin onion skin.",
    ),
    [
      {
        id: "walls",
        title: bi(
          "光與鏡片呈現一格格細胞邊界 → 複式光學顯微鏡",
          "Light and lenses reveal cell boundaries → compound light microscope",
        ),
      },
      {
        id: "color",
        title: bi(
          "只要有顏色，就一定是螢光",
          "Any colored image must be fluorescence",
        ),
      },
      {
        id: "zoom",
        title: bi(
          "圖片很大，所以一定是電子顯微鏡",
          "A big picture must be electron microscopy",
        ),
      },
    ],
    "walls",
    "optical",
    bi(
      "你看見一格格細胞壁，也讀到光穿過表皮的記錄！這支持複式光學顯微鏡觀察。染色也能讓光學影像有顏色，不能只靠顏色判斷螢光。",
      "You saw cell walls and read that light passed through the skin! This supports compound light microscopy. Staining can add color too, so color alone does not prove fluorescence.",
    ),
  ),
  mystery(
    "mystery-glow",
    "fluorescence-cell",
    bi("檔案 B · 發光線索", "File B · Glowing clues"),
    bi(
      "深色背景上，特定區域很亮。記錄：樣本加了標記，並用適合的光照射。",
      "Selected regions shine against a dark background. Lab note: labels were added and illuminated with suitable light.",
    ),
    [
      {
        id: "signals",
        title: bi(
          "特定構造的標記發出訊號 → 螢光",
          "Labels on selected structures emit signals → fluorescence",
        ),
      },
      {
        id: "natural",
        title: bi(
          "綠色和紫色就是細胞的天然顏色",
          "Green and purple are the cells’ natural colors",
        ),
      },
      {
        id: "electrons",
        title: bi(
          "背景暗，所以一定使用電子",
          "A dark background means electrons were used",
        ),
      },
    ],
    "signals",
    "fluorescence",
    bi(
      "你注意到特定構造正在發光！加上標記與照光的記錄，這是螢光觀察的重要證據；它也是光學顯微鏡的一種。",
      "You noticed selected structures glowing! With the labeling and illumination notes, this supports fluorescence microscopy, a type of light microscopy.",
    ),
  ),
  mystery(
    "mystery-sem",
    "electron-surface",
    bi("檔案 C · 昆蟲眼睛表面", "File C · Insect eye surface"),
    bi(
      "影像呈現大量凸起的小面與細毛，主要看見樣品表面的細節。",
      "Raised facets and tiny hairs cover a curved surface; the visible clues are on the outside.",
    ),
    [
      {
        id: "surface",
        title: bi(
          "表面有凸起的小面與細毛 → 推測是 SEM",
          "Raised surface facets and hairs → likely SEM",
        ),
      },
      {
        id: "gray",
        title: bi(
          "像薄切片，看見內部排列 → 推測是 TEM",
          "Looks like internal arrangements in a thin section → likely TEM",
        ),
      },
      {
        id: "inside",
        title: bi(
          "亮點標出特定構造的位置 → 推測是螢光",
          "Bright signals locate selected structures → likely fluorescence",
        ),
      },
    ],
    "surface",
    "electron",
    bi(
      "你找到了表面細節！凸起的小面、細毛與電子掃描記錄，支持掃描式電子顯微鏡（SEM）。灰色本身不是充分證據。",
      "You found surface detail! Raised facets, tiny hairs and the electron scanning note support scanning electron microscopy (SEM). Gray alone is not enough evidence.",
    ),
  ),
  mystery(
    "mystery-tem",
    "electron-mitochondrion",
    bi("檔案 D · 內部皺摺", "File D · Internal folds"),
    bi(
      "橢圓形構造內有一道道細微皺摺，能沿著內部邊界追蹤它們。",
      "Fine folds appear inside an oval structure; trace them along its internal boundaries.",
    ),
    [
      {
        id: "inside",
        title: bi(
          "橢圓構造內部的細微皺摺 → 推測是 TEM",
          "Fine folds inside an oval structure → likely TEM",
        ),
      },
      {
        id: "surface",
        title: bi(
          "凸起的表面形狀 → 推測是 SEM",
          "Raised surface shapes → likely SEM",
        ),
      },
      {
        id: "natural",
        title: bi(
          "特定位置的標記訊號 → 推測是螢光",
          "Labeled signals in selected locations → likely fluorescence",
        ),
      },
    ],
    "inside",
    "electron",
    bi(
      "你深入找到粒線體的內部皺摺！搭配電子穿過薄樣本的記錄，支持穿透式電子顯微鏡（TEM），不是天然顏色的照片。",
      "You explored the folds inside a mitochondrion! Electrons passing through a thin sample support transmission electron microscopy (TEM), not a photo of natural colors.",
    ),
  ),
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
    bi("更細微的構造", "Finer structures"),
    bi(
      "科學家想分辨細胞內非常細微的膜構造，複式光學顯微鏡看不清楚。該用什麼？",
      "A scientist needs to distinguish very fine membrane structures beyond compound light microscopy. Which tool fits?",
    ),
    "electron",
    bi(
      "需要能分辨更細微構造的影像，不只是更大的圖片。",
      "We need images that resolve finer structures, not just larger pictures.",
    ),
    bi(
      "電子顯微鏡能分辨更細微的結構，適合追查這些膜的細節。但樣品通常需要特殊準備，通常不能直接觀察活著、正在活動的生物。工具要符合問題。",
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
      "神秘樣品裡有沒有一般大小的細胞？先用哪種方法觀察整體細胞輪廓？",
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
      "用螢光顯微鏡搭配針對這種蛋白質的標記，讓訊號指出它的位置。調查結果：找到目標位置！",
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
      "最後，想分辨複式光學顯微鏡看不清楚的細胞內部細微結構，選哪種工具？",
      "Finally, which tool can distinguish internal structures too fine for compound light microscopy?",
    ),
    "electron",
    bi(
      "這次要「深入」：分辨更細微的構造。",
      "Now EXPLORE: distinguish finer structures.",
    ),
    bi(
      "電子顯微鏡使用電子形成影像，讓你深入觀察細微結構。三個問題，選擇不同工具，案件破解！",
      "Electron microscopes form images with electrons to reveal fine structures. Three questions, different tools: case closed!",
    ),
  ),
].map((question, index) => ({ ...question, ...investigationSteps[index] }));
export const questionsById = Object.fromEntries(
  [...caseQuestions, ...finalQuestions].map((q) => [q.id, q]),
);
