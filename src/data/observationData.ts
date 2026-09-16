import { bi, type Choice, type Question, type Stage } from "./types";

export const observationUI = {
  order: bi(
    "肉眼 → 放大鏡 → 解剖顯微鏡 → 光學顯微鏡 → 螢光顯微鏡 → 電子顯微鏡",
    "Eyes → Magnifying glass → Stereomicroscope → Light microscope → Fluorescence microscope → Electron microscope",
  ),
  orderNote: bi(
    "這是探索順序，不是工具的厲害排行榜。先想想要看什麼，再選工具！",
    "This is an exploration route, not a ranking. First decide what to observe, then choose a tool!",
  ),
  familyTitle: bi("這些工具有什麼關係？", "How are these tools related?"),
  family: bi(
    "解剖顯微鏡與螢光顯微鏡都使用光，屬於光學顯微鏡。這裡的「光學顯微鏡」指常用來看細胞的複式顯微鏡。",
    "Stereo and fluorescence microscopes both use light and belong to light microscopy. Here, “light microscope” refers to the compound microscope commonly used to observe cells.",
  ),
  practice: bi("你會選哪一種工具？", "Which tool would you choose?"),
  practiceIntro: bi(
    "四個觀察任務。每題選一種合適的工具，有些問題不只一個合理答案！",
    "Four observation tasks. Choose one suitable tool each time; some questions have more than one reasonable answer!",
  ),
  practiceAction: bi("試試選工具小遊戲", "Try the tool-choice game"),
  skill: bi(
    "你已經學會第一個偵探技能：選擇正確的觀察工具！",
    "You have learned your first detective skill: choosing the right observation tool!",
  ),
  skillTitle: bi(
    "偵探技能：選擇觀察工具",
    "Detective skill: choosing observation tools",
  ),
  next: bi("下一個觀察任務", "Next observation task"),
  finish: bi("領取偵探技能", "Collect your detective skill"),
  again: bi("再練習一次", "Practice again"),
  reward: bi("找到合適的工具了！", "You found a suitable tool!"),
  drag: bi(
    "移動放大鏡，找找看你能發現什麼？",
    "Move the magnifying glass. What can you discover?",
  ),
  keyboard: bi(
    "拖曳鏡片，或用下方方向按鈕。鏡片也可用鍵盤方向鍵移動。",
    "Drag the lens or use the direction buttons below. You can also focus the lens and use the arrow keys.",
  ),
  magnifierLabel: bi(
    "可拖曳的虛擬放大鏡",
    "Draggable virtual magnifying glass",
  ),
  left: bi("向左", "Left"),
  right: bi("向右", "Right"),
  up: bi("向上", "Up"),
  down: bi("向下", "Down"),
  magnifierNote: bi(
    "這是局部放大的教學示意，不代表真實倍率；放大原圖不會創造新的細節。",
    "This diagram demonstrates local enlargement, not a calibrated magnification. Enlarging an image creates no new detail.",
  ),
  discover: bi(
    "探索中：移向葉脈、葉緣，或昆蟲翅膀。",
    "Explore: move toward leaf veins, leaf edges or insect wings.",
  ),
  specimens: bi("選擇觀察對象", "Choose a specimen"),
  stereoAliases: bi(
    "解剖顯微鏡（實體顯微鏡／立體顯微鏡）",
    "Stereomicroscope / dissecting microscope",
  ),
  stereoEnglish: "stereomicroscope / dissecting microscope",
  stereoFeatures: [
    bi("較低倍率", "Lower magnification"),
    bi("較大視野", "Wider field of view"),
    bi("具有立體感", "A sense of depth"),
  ],
  stereoLook: bi("先看完整果蠅", "See the whole fruit fly"),
  stereoDetail: bi("再找翅膀表面的細節", "Find details on the wing"),
  stereoWhole: bi(
    "較低倍率、較大視野，方便把完整的小型生物放進視野裡。",
    "Lower magnification and a wider field help you see a small organism as a whole.",
  ),
  stereoClose: bi(
    "靠近觀察翅膀與表面；別忘了，原本的整體位置也很重要。",
    "Look closer at wings and surfaces; their position on the whole organism still matters.",
  ),
  stereoDepth: bi(
    "兩眼從略不同的角度觀察，讓我們感覺到高低與立體形狀。螢幕上的平面示意無法重現真正的雙眼立體視覺。",
    "The two eyes see slightly different angles, creating a sense of depth. This flat screen diagram does not reproduce true binocular stereo vision.",
  ),
  stereoExamples: bi(
    "還能觀察：昆蟲、種子、花、魚卵、斑馬魚胚胎。",
    "Other subjects: insects, seeds, flowers, fish eggs and zebrafish embryos.",
  ),
  stereoClarify: bi(
    "名字有「解剖」，不代表一定要切開樣本；它也適合觀察完整的小生物和物體表面。",
    "Despite the name “dissecting microscope,” a specimen need not be cut open. It is also useful for intact small organisms and object surfaces.",
  ),
};

export const magnifierSpecimens = [
  {
    id: "leaf",
    name: bi("葉片", "Leaf"),
    spots: [
      {
        x: 0.48,
        y: 0.55,
        r: 0.14,
        label: bi(
          "發現葉脈：較粗的主脈連著分支，像一張網。",
          "Leaf veins: a thicker main vein connects to branches like a network.",
        ),
      },
      {
        x: 0.65,
        y: 0.43,
        r: 0.12,
        label: bi(
          "發現葉緣：觀察葉子的外圍形狀。",
          "Leaf edge: observe the shape around the leaf.",
        ),
      },
    ],
  },
  {
    id: "fruit-fly",
    name: bi("果蠅", "Fruit fly"),
    spots: [
      {
        x: 0.33,
        y: 0.39,
        r: 0.16,
        label: bi(
          "發現翅膀：薄薄的翅膀裡有細線般的翅脈。",
          "Wing discovery: thin vein-like lines run across the delicate wings.",
        ),
      },
      {
        x: 0.5,
        y: 0.64,
        r: 0.13,
        label: bi(
          "發現腹部：留意一節一節的紋路。",
          "Abdomen discovery: notice the repeating segmented pattern.",
        ),
      },
    ],
  },
];

export const practiceTools: Choice[] = [
  {
    id: "naked-eye",
    title: bi("肉眼", "Naked eye"),
    description: bi("先看整體", "Start with the whole"),
  },
  {
    id: "magnifier",
    title: bi("放大鏡", "Magnifying glass"),
    description: bi("局部放大", "Enlarge an area"),
  },
  {
    id: "stereo",
    title: bi("解剖顯微鏡", "Stereomicroscope"),
    description: bi(
      "小生物與表面・有立體感",
      "Small organisms and surfaces · a sense of depth",
    ),
  },
  {
    id: "optical",
    title: bi("光學顯微鏡", "Light microscope"),
    description: bi("用光和鏡片看細胞", "Light and lenses reveal cells"),
  },
  {
    id: "electron",
    title: bi("電子顯微鏡", "Electron microscope"),
    description: bi("分辨非常細微的構造", "Resolve very fine structures"),
  },
];
export const practiceStage: Stage = {
  id: "tools",
  number: "01",
  icon: "search",
  title: observationUI.practice,
  shortTitle: observationUI.practice,
  subtitle: bi("觀察工具練習", "Observation tool practice"),
  introduction: observationUI.practiceIntro,
  reward: observationUI.reward,
};
const principle = bi(
  "放得更大不一定更好，工具要配合觀察對象與問題。",
  "More magnification is not always better. Match the tool to the subject and question.",
);
export const practiceQuestions: Question[] = [
  {
    id: "practice-whole",
    stage: "tools",
    type: "single",
    toolSelection: true,
    title: bi("任務 1 · 看整體", "Task 1 · See the whole"),
    question: bi(
      "想看一隻成果蠅的完整外形，可以選哪一種工具？",
      "Which tool can show the whole shape of an adult fruit fly?",
    ),
    image: "fruit-fly",
    choices: practiceTools,
    correctAnswer: ["naked-eye"],
    acceptedAnswers: ["naked-eye", "magnifier", "stereo"],
    hint: bi(
      "先看完整的小生物，不用追查細胞內部。",
      "Look at the whole small organism; we are not investigating inside cells.",
    ),
    strongHint: bi(
      "肉眼看得見成果蠅；解剖顯微鏡也能讓完整小生物更容易觀察。放大鏡也能幫忙看整體。選一種就好。",
      "Adult fruit flies are visible to our eyes, and a stereomicroscope helps observe them whole. A magnifying glass can also help. Choose one.",
    ),
    explanation: bi(
      "肉眼或解剖顯微鏡都能觀察成果蠅的整體外形。",
      "Both your eyes and a stereomicroscope can show the overall shape of an adult fruit fly.",
    ),
    answerExplanations: {
      magnifier: bi(
        "放大鏡也能幫你看清楚果蠅的整體外形；先保留全貌，再找細節。",
        "A magnifying glass can help show the whole fruit fly too. Keep its overall shape in view before looking for detail.",
      ),
      "naked-eye": bi(
        "成果蠅的整體外形肉眼就看得見，先觀察全貌就很有用！",
        "An adult fruit fly is visible to your eyes; starting with its whole shape is useful!",
      ),
      stereo: bi(
        "解剖顯微鏡的較大視野適合看完整小生物，還能感覺到立體形狀。",
        "A stereomicroscope’s wider field fits a small organism and adds a sense of depth.",
      ),
    },
    funFact: principle,
  },
  {
    id: "practice-wing",
    stage: "tools",
    type: "single",
    toolSelection: true,
    title: bi("任務 2 · 翅膀線索", "Task 2 · Wing clues"),
    question: bi(
      "想看昆蟲翅膀的大致翅脈與表面細節，可以先選哪種工具？",
      "Which tool could you start with to inspect an insect wing’s larger veins and surface details?",
    ),
    image: "fruit-fly",
    choices: practiceTools,
    correctAnswer: ["magnifier"],
    acceptedAnswers: ["magnifier", "stereo"],
    hint: bi(
      "這次比整體外形更靠近一些，但還不需要看細胞內部。",
      "Look a little closer than the whole body; we do not need to see inside cells.",
    ),
    strongHint: bi(
      "放大鏡能放大局部；解剖顯微鏡也適合看翅膀表面。選一種即可。",
      "A magnifying glass enlarges a local area; a stereomicroscope also suits wing surfaces. Choose either.",
    ),
    explanation: bi(
      "放大鏡與解剖顯微鏡都能幫忙；能看清楚多少，還要看昆蟲大小與工具能力。",
      "Both can help; the visible detail also depends on the insect’s size and the tool.",
    ),
    answerExplanations: {
      magnifier: bi(
        "放大鏡讓局部翅脈更容易看見，是方便的第一步。",
        "A magnifying glass makes larger wing veins easier to see: a handy first step.",
      ),
      stereo: bi(
        "解剖顯微鏡適合觀察翅膀表面，也保留高低與形狀的立體感。",
        "A stereomicroscope suits wing surfaces and offers a sense of shape and depth.",
      ),
    },
    funFact: principle,
  },
  {
    id: "practice-cells",
    stage: "tools",
    type: "single",
    toolSelection: true,
    title: bi("任務 3 · 一格格細胞", "Task 3 · Individual cells"),
    question: bi(
      "想看薄薄洋蔥表皮的一格格細胞，最適合先用哪種工具？",
      "Which tool is a good first choice to see individual cells in thin onion skin?",
    ),
    image: "optical-onion",
    choices: practiceTools,
    correctAnswer: ["optical"],
    hint: bi(
      "要看一般大小的細胞，肉眼與放大鏡通常不夠。",
      "Typical cells need more help than our eyes or a magnifying glass.",
    ),
    strongHint: bi(
      "選常用於細胞觀察的光學顯微鏡，讓光和鏡片一起幫忙。",
      "Choose the light microscope commonly used for cells: light and lenses work together.",
    ),
    explanation: bi(
      "光學顯微鏡用光和鏡片，幫你看見薄樣本裡一格格的細胞。",
      "A light microscope uses light and lenses to show individual cells in a thin sample.",
    ),
    funFact: principle,
  },
  {
    id: "practice-fine",
    stage: "tools",
    type: "single",
    toolSelection: true,
    title: bi("任務 4 · 深入構造", "Task 4 · Explore structures"),
    question: bi(
      "想分辨細胞內一般光學看不清楚的非常細微構造，選哪種工具？",
      "Which tool reveals very fine structures inside cells beyond ordinary light microscopy?",
    ),
    image: "electron-mitochondrion",
    choices: practiceTools,
    correctAnswer: ["electron"],
    hint: bi(
      "需要分辨更細微的細節，不是把同一張照片拉大。",
      "We need to distinguish finer details, not stretch the same picture.",
    ),
    strongHint: bi(
      "電子顯微鏡利用電子形成影像，適合追查這些細微構造。",
      "Electron microscopes form images with electrons to investigate these fine structures.",
    ),
    explanation: bi(
      "電子顯微鏡能分辨非常細微的結構，這次的問題需要這種細節。",
      "Electron microscopy resolves very fine structures: this question needs that detail.",
    ),
    funFact: principle,
  },
];
