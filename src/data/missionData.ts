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
const mysteryLabels: Record<string, Text[]> = {
  "mystery-light": [bi("細胞邊界", "Cell boundary"), bi("圓形區域", "Round region"), bi("空白區域", "Empty region")],
  "mystery-glow": [bi("圓形亮區", "Bright oval"), bi("短絲訊號", "Filament signals"), bi("深色背景", "Dark background")],
  "mystery-sem": [bi("表面凸起 · SEM（掃描式電子顯微鏡）", "Raised surface · SEM (scanning electron microscope)"), bi("內部排列 · TEM（穿透式電子顯微鏡）", "Inside · TEM (transmission electron microscope)"), bi("標記亮點 · 螢光顯微鏡", "Labeled signals · fluorescence microscope")],
  "mystery-tem": [bi("看裡面 · TEM（穿透式電子顯微鏡）", "Inside · TEM (transmission electron microscope)"), bi("看表面 · SEM（掃描式電子顯微鏡）", "Surface · SEM (scanning electron microscope)"), bi("找標記 · 螢光顯微鏡", "Labels · fluorescence microscope")],
};
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
  question: id === "mystery-light" ? bi("點出一格格細胞的邊界。", "Tap the boundaries between cells.")
    : id === "mystery-glow" ? bi("點出被標記的細胞核。", "Tap the labeled nucleus.")
    : id === "mystery-sem" ? bi("這些凸起的小面，是表面還是裡面的線索？", "Are these raised facets clues from the surface or inside?")
    : bi("這次看到橢圓構造裡的皺摺，用哪種方法觀察？", "This time we see folds inside an oval. Which method shows them?"),
  choices: choices.map((choice, index) => ({ ...choice, title: mysteryLabels[id][index] })),
  evidenceTargets: id === "mystery-light" ? [{ choiceId: "walls", x: 27, y: 82 }, { choiceId: "color", x: 42, y: 56 }, { choiceId: "zoom", x: 69, y: 56 }]
    : id === "mystery-glow" ? [{ choiceId: "signals", x: 51, y: 49 }, { choiceId: "natural", x: 29, y: 48 }, { choiceId: "electrons", x: 84, y: 18 }] : undefined,
  answerExplanations: id === "mystery-light" ? { color: bi("這是細胞裡的圓形區域。找找把細胞隔開的線。", "This is a round region inside a cell. Find the lines between cells."), zoom: bi("這是細胞裡的空白區域，邊界在外圍的線上。", "This is an empty-looking region within a cell; its boundary is the outline.") }
    : id === "mystery-glow" ? { natural: bi("這些短絲是另一種標記。細胞核是較大的圓形區域。", "These filaments use another label. The nucleus is the larger round region."), electrons: bi("這是背景。找找細胞裡較大的圓形亮區。", "This is the background. Find the larger bright round region inside the cell.") } : undefined,
  correctAnswer: [answer],
  microscopeType: tool,
  hint: bi("先找出邊界、表面或特定亮點：哪個選項描述了你實際看到的形狀與位置？", "Look for boundaries, surfaces or selected bright spots. Which option describes the shapes and positions you can actually see?"),
  strongHint: id === "mystery-sem"
    ? bi("再看一條記錄：儀器利用電子掃描樣品表面。哪個選項描述的是表面的形狀？", "Another lab note: electrons scanned the specimen surface. Which option describes shapes on the surface?")
    : id === "mystery-tem"
      ? bi("再看一條記錄：電子穿過很薄的樣品，讓我們看見內部。哪個選項描述的是裡面的皺摺？", "Another lab note: electrons passed through a very thin specimen to reveal the inside. Which option describes internal folds?")
      : id === "mystery-light"
        ? bi("找找 1 號圈：把一格格細胞隔開的線，就是細胞邊界。", "Look at circle 1: the lines separating the cells are their boundaries.")
        : bi("找找 1 號圈：較大的藍紫色圓形亮區，是標記的細胞核。", "Look at circle 1: the larger blue-violet bright region is the labeled nucleus."),
  explanation,
  funFact: id === "mystery-light"
    ? bi("圖裡一格格的框線是細胞壁；動物細胞沒有細胞壁，不是所有細胞都像小方格。", "The box-like outlines are cell walls. Animal cells have no cell wall; not all cells look like little boxes.")
    : id === "mystery-glow"
      ? bi("用不同的螢光標記，可以一起比較兩種構造的位置。", "Different fluorescent labels let us compare the positions of two kinds of structures.")
      : id === "mystery-sem"
        ? bi("成體果蠅的複眼由許多小眼組成；圖裡重複的小面，就是觀察複眼的線索。", "An adult fruit fly’s compound eye has many small units. The repeating facets are clues to its structure.")
        : bi("粒線體能幫細胞利用養分中的能量。內膜的皺摺讓它有更多表面可用。", "Mitochondria help cells use energy from nutrients. The inner membrane folds provide more surface area."),
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
      "深色背景上，特定區域很亮。記錄：樣品加了標記，並用適合的光照射。",
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
          "表面有凸起的小面與細毛 → 推測是 SEM（掃描式電子顯微鏡）",
          "Raised surface facets and hairs → likely SEM（掃描式電子顯微鏡）",
        ),
      },
      {
        id: "gray",
        title: bi(
          "像薄切片，看見內部排列 → 推測是 TEM（穿透式電子顯微鏡）",
          "Looks like internal arrangements in a thin section → likely TEM（穿透式電子顯微鏡）",
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
      "你找到了表面細節！凸起的小面、細毛與電子掃描記錄，支持 SEM（掃描式電子顯微鏡）。只看灰色還不能判斷。",
      "You found surface detail! Raised facets, tiny hairs and the electron scanning note support SEM（掃描式電子顯微鏡）. Gray alone is not enough evidence.",
    ),
  ),
  mystery(
    "mystery-tem",
    "electron-mitochondrion",
    bi("檔案 D · 內部皺摺", "File D · Internal folds"),
    bi(
      "橢圓形構造裡有一道道細小皺摺，沿著裡面的線條找找看。",
      "Fine folds appear inside an oval structure; trace them along its internal boundaries.",
    ),
    [
      {
        id: "inside",
        title: bi(
          "橢圓構造內部的細小皺摺 → 推測是 TEM（穿透式電子顯微鏡）",
          "Fine folds inside an oval structure → likely TEM（穿透式電子顯微鏡）",
        ),
      },
      {
        id: "surface",
        title: bi(
          "凸起的表面形狀 → 推測是 SEM（掃描式電子顯微鏡）",
          "Raised surface shapes → likely SEM（掃描式電子顯微鏡）",
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
      "你找到了粒線體內部的皺摺！加上電子穿過薄樣品的記錄，支持 TEM（穿透式電子顯微鏡）的判斷。不能只靠灰色判斷觀察工具。",
      "You found folds inside a mitochondrion! The note about electrons passing through a thin sample supports TEM（穿透式電子顯微鏡）. Gray alone does not identify the tool.",
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
