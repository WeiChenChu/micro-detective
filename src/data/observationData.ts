import { bi, type Choice, type Question, type Stage } from "./types";

export const observationUI = {
  order: bi(
    "肉眼 → 放大鏡 → 解剖顯微鏡 → 複式光學顯微鏡 → 螢光顯微鏡 → 電子顯微鏡",
    "Eyes → Magnifying glass → Stereomicroscope → Compound light microscope → Fluorescence microscope → Electron microscope",
  ),
  orderNote: bi(
    "這是探索順序，不是工具的厲害排行榜。先想想要看什麼，再選工具！",
    "This is an exploration route, not a ranking. First decide what to observe, then choose a tool!",
  ),
  familyTitle: bi("這些工具有什麼關係？", "How are these tools related?"),
  family: bi(
    "解剖顯微鏡與螢光顯微鏡都使用光，屬於光學顯微鏡。這裡的「複式光學顯微鏡」常用來看細胞。它們有不同用途，但都可以用光來觀察。",
    "Stereo and fluorescence microscopes both use light and belong to light microscopy. Here, “compound light microscope” names the tool commonly used for cells; these categories are not mutually exclusive.",
  ),
  practice: bi("你會選哪一種工具？", "Which tool would you choose?"),
  practiceIntro: bi(
    "四個觀察任務。先想知道什麼，再選最適合回答問題的工具！",
    "Four observation tasks. First decide what you want to know, then choose the tool that best answers the question!",
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
    "探索中：移向翅膀、頭部或腳；也可以換一片葉子。",
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
    "倍率較低時，能看到的範圍較大，比較容易一次看完整隻小生物。",
    "Lower magnification and a wider field help you see a small organism as a whole.",
  ),
  stereoClose: bi(
    "靠近觀察翅膀與表面；別忘了，原本的整體位置也很重要。",
    "Look closer at wings and surfaces; their position on the whole organism still matters.",
  ),
  stereoDepth: bi(
    "兩隻眼睛從稍微不同的角度看，讓我們感覺到高低和立體形狀。這張平面示意圖，無法呈現真正的雙眼立體感。",
    "The two eyes see slightly different angles, creating a sense of depth. This flat screen diagram does not reproduce true binocular stereo vision.",
  ),
  stereoExamples: bi(
    "還能觀察：昆蟲、種子、花、魚卵、斑馬魚胚胎。",
    "Other subjects: insects, seeds, flowers, fish eggs and zebrafish embryos.",
  ),
  stereoClarify: bi(
    "名字有「解剖」，不代表一定要切開樣品；它也適合觀察完整的小生物和物體表面。",
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
    name: bi("成體果蠅", "Adult fruit fly"),
    spots: [
      { x: 0.5, y: 0.34, r: 0.10, label: bi("發現眼睛：頭部兩側有一對眼睛。", "Eye discovery: a pair of eyes on the head.") },
      { x: 0.68, y: 0.62, r: 0.10, label: bi("發現腳：沿著細長的腳找找關節。", "Leg discovery: trace the slender legs and joints.") },
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
    description: bi("找到位置與大概的樣子", "Find the object and its rough outline"),
  },
  {
    id: "magnifier",
    title: bi("放大鏡", "Magnifying glass"),
    description: bi("稍微放大肉眼可見的表面", "Enlarge visible surface features a little"),
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
    title: bi("複式光學顯微鏡", "Compound light microscope"),
    description: bi("用光和鏡片看細胞", "Light and lenses reveal cells"),
  },
  {
    id: "electron",
    title: bi("電子顯微鏡", "Electron microscope"),
    description: bi("看清楚非常細小的構造", "Resolve very fine structures"),
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
export const practiceQuestions: Question[] = [
  {
    id: "practice-whole",
    observation: bi("成體果蠅肉眼看得到，但細節很小。這次想仔細比較牠的頭、胸、腹與翅膀。", "The fly is small, with a head, thorax, abdomen and wings. We want to compare its complete shape in one view."),
    answerExplanations: {
      "naked-eye": bi("肉眼能發現果蠅；要仔細比較這麼小的身體各部分，細節還不夠清楚。", "Our eyes find the fly, but do not show enough detail to compare its tiny body parts closely."),
      magnifier: bi("放大鏡也能幫忙看局部；這次要穩定地比較完整外形，較大視野與立體感更有幫助。", "A hand lens helps with local details. For a steady comparison of the whole shape, a wider field and sense of depth help more."),
      optical: bi("複式光學顯微鏡常用於薄樣品的細胞；完整果蠅較厚，這次想一次看完整隻，也看清楚表面。", "Compound light microscopy often suits cells in thin specimens. An intact fly is thick; this question needs a whole-body field and surface view."),
      electron: bi("電子顯微鏡能看細小結構，但通常需特殊處理；這次看完整成體果蠅的外形，不需要這麼複雜的準備。", "Electron microscopy resolves fine structure but usually needs special preparation. The whole fly’s shape does not require that tradeoff."),
    },
    stage: "tools",
    type: "single",
    toolSelection: true,
    title: bi("任務 1 · 看整體", "Task 1 · See the whole"),
    question: bi(
      "想仔細觀察完整成體果蠅的頭、胸、腹和翅膀形狀，哪一種工具最適合？",
      "Which tool is best for closely observing the head, thorax, abdomen and wing shapes of an intact adult fruit fly?",
    ),
    image: "fruit-fly",
    choices: practiceTools,
    correctAnswer: ["stereo"],
    hint: bi(
      "肉眼確實可以看到成體果蠅，但細節很小。想一邊看細節、一邊看完整外形，需要多大的視野？",
      "Our eyes can see an adult fruit fly, but its details are tiny. How wide a view helps us see its details and whole shape together?",
    ),
    strongHint: bi(
      "放大鏡也能幫忙；再找找哪種工具有較大的視野，也能讓你感覺到高低。",
      "A hand lens can help too. Look for a tool with a wider field and a sense of depth.",
    ),
    explanation: bi(
      "解剖顯微鏡的視野較大，也能感覺到高低，適合仔細看完整成體果蠅的頭、胸、腹和翅膀。",
      "An adult fruit fly is visible to our eyes. A stereomicroscope’s wider field and sense of depth better suit a close view of its head, thorax, abdomen and wings.",
    ),
    funFact: bi("解剖顯微鏡也常叫立體顯微鏡，名字有「解剖」，但不一定需要把樣品切開。", "A stereomicroscope is also called a dissecting microscope, but you do not always need to cut the specimen open."),
  },
  {
    id: "practice-wing",
    stage: "tools",
    type: "single",
    toolSelection: true,
    title: bi("任務 2 · 葉脈線索", "Task 2 · Leaf vein clues"),
    question: bi(
      "在戶外，想把肉眼看得到的葉脈稍微放大，哪一種隨手攜帶的工具最適合？",
      "Outdoors, which handy portable tool best enlarges leaf veins that you can already see?",
    ),
    image: "leaf",
    choices: practiceTools,
    correctAnswer: ["magnifier"],
    hint: bi(
      "葉脈已經看得到，這次只想方便地放大局部，不是觀察細胞。",
      "The veins are already visible. We just want a convenient closer look, not a view of cells.",
    ),
    strongHint: bi(
      "放大鏡方便攜帶，能讓葉脈分支更容易看清楚。",
      "A magnifying glass is easy to carry and makes branching leaf veins easier to see.",
    ),
    explanation: bi(
      "放大鏡方便攜帶，能把肉眼看得到的葉脈稍微放大，適合這次戶外觀察。",
      "A magnifying glass is handy outdoors for enlarging visible surface features such as leaf veins, feathers or larger insect wings. Match the tool to the question and setting.",
    ),
    funFact: bi("葉脈像葉子裡的小路，能幫忙運送水分和養分。", "Leaf veins are like tiny paths that carry water and nutrients."),
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
      "選常用於細胞觀察的複式光學顯微鏡，讓光和鏡片一起幫忙。",
      "Choose the compound light microscope commonly used for cells: light and lenses work together.",
    ),
    explanation: bi(
      "複式光學顯微鏡用光和鏡片，幫你看見薄樣品裡一格格的細胞。",
      "A compound light microscope uses light and lenses to show individual cells in a thin sample.",
    ),
    funFact: bi("洋蔥細胞外面有細胞壁，所以看起來像一格格小房間。動物細胞沒有細胞壁。", "Onion cells have cell walls, so they look like little rooms. Animal cells do not have cell walls."),
  },
  {
    id: "practice-fine",
    stage: "tools",
    type: "single",
    toolSelection: true,
    title: bi("任務 4 · 深入構造", "Task 4 · Explore structures"),
    question: bi(
      "想看清楚細胞內很細小、複式光學顯微鏡看不清的構造，選哪種工具？",
      "Which tool reveals very fine structures inside cells beyond compound light microscopy?",
    ),
    image: "electron-mitochondrion",
    choices: practiceTools,
    correctAnswer: ["electron"],
    hint: bi(
      "想想看：把模糊的照片拉大，原本看不清的細節會出現嗎？",
      "We need to distinguish finer details, not stretch the same picture.",
    ),
    strongHint: bi(
      "電子顯微鏡利用電子形成影像，適合追查這些細小構造。",
      "Electron microscopes form images with electrons to investigate these fine structures.",
    ),
    explanation: bi(
      "電子顯微鏡能看清楚非常細小的結構，這次的問題需要這種細節。但樣品通常需要特殊準備，並非每個問題都適合用它。",
      "Electron microscopy resolves the fine structures this question asks about. But samples usually need special preparation, so it does not suit every question.",
    ),
    funFact: bi("同一個樣品可以用不同工具回答不同問題：先找位置，再看更細的構造。", "Different tools can answer different questions about one sample: first find a location, then look at finer structures."),
  },
];
