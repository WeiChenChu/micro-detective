import { bi, type Choice, type Question, type Stage } from "./types";

export const CONTENT_VERSION = 1;
export const stages: Stage[] = [
  {
    id: "naked-eye",
    number: "01",
    icon: "eye",
    title: bi("肉眼觀察", "Naked-eye observation"),
    shortTitle: bi("肉眼", "Naked eye"),
    subtitle: bi("從看得見的世界開始", "Start with the world you can see"),
    introduction: bi(
      "偵探的第一件工具，就是你的眼睛！先觀察生物的整體外形。",
      "Your first detective tool is your eyes! Start by observing the whole shape of living things.",
    ),
    reward: bi(
      "獲得第一個偵探工具：放大鏡 🔍",
      "First detective tool collected: magnifying glass 🔍",
    ),
  },
  {
    id: "optical",
    number: "02",
    icon: "microscope",
    title: bi("複式光學顯微鏡", "Compound light microscopy"),
    shortTitle: bi("複式光學顯微鏡", "Compound light microscope"),
    subtitle: bi(
      "光與鏡片，打開細胞世界",
      "Light and lenses reveal a world of cells",
    ),
    introduction: bi(
      "這一站探索複式光學顯微鏡觀察「明視野」。光穿過薄薄的標本，鏡片幫我們看清楚。",
      "Here we explore compound light microscopy: brightfield. Light passes through a thin specimen, and lenses help us see it.",
    ),
    reward: bi("解鎖：複式光學顯微鏡 🔬", "Unlocked: compound light microscope 🔬"),
  },
  {
    id: "fluorescence",
    number: "03",
    icon: "sparkle",
    title: bi("螢光顯微鏡", "Fluorescence microscopy"),
    shortTitle: bi("螢光", "Fluorescence"),
    subtitle: bi("讓想找的線索，亮起來", "Make the clues you want light up"),
    introduction: bi(
      "螢光也是光學顯微鏡的一種。這次，我們用發光標記找出特定構造！",
      "Fluorescence is also a kind of light microscopy. This time, glowing labels help us find selected structures!",
    ),
    reward: bi("獲得螢光線索 🌈", "Fluorescent clue collected 🌈"),
  },
  {
    id: "electron",
    number: "04",
    icon: "bolt",
    title: bi("電子顯微鏡", "Electron microscopy"),
    shortTitle: bi("電子", "Electron"),
    subtitle: bi("發現更細小的結構", "Discover even smaller structures"),
    introduction: bi(
      "想研究更細小的構造？換上使用電子的觀察工具，繼續追查！",
      "Want to study even smaller structures? Try a tool that uses electrons and follow the clues!",
    ),
    reward: bi("解鎖：電子顯微鏡 ⚡", "Unlocked: electron microscope ⚡"),
  },
  {
    id: "final",
    number: "05",
    icon: "detective",
    title: bi("最終偵探挑戰", "The final detective challenge"),
    shortTitle: bi("最終挑戰", "Final case"),
    subtitle: bi(
      "5 份影像檔案，等你破解",
      "5 image files. One detective: you.",
    ),
    introduction: bi(
      "讀取每張影像的觀察線索，選出這次使用的工具。你可以隨時翻開筆記本！",
      "Read each image’s observation clue and choose the tool used for that image. Your notebook is always here to help!",
    ),
    reward: bi("全部案件破解！🕵️", "Every case solved! 🕵️"),
  },
];

export const toolChoices: Choice[] = [
  {
    id: "naked-eye",
    title: bi("肉眼觀察", "Naked-eye observation"),
    description: bi("看整體外形", "See whole shapes"),
  },
  {
    id: "optical",
    title: bi("複式光學顯微鏡（明視野）", "Compound light microscope (brightfield)"),
    description: bi("用光與鏡片觀察", "Observe with light and lenses"),
  },
  {
    id: "fluorescence",
    title: bi("螢光顯微鏡", "Fluorescence microscope"),
    description: bi("用發光標記找目標", "Locate glowing labels"),
  },
  {
    id: "electron",
    title: bi("電子顯微鏡", "Electron microscope"),
    description: bi("用電子看細小結構", "Use electrons for fine structures"),
  },
];

export const caseQuestions: Question[] = [
  {
    id: "case-eye",
    stage: "naked-eye",
    type: "multiple",
    title: bi("第一眼的線索", "Clues at first sight"),
    question: bi(
      "哪些可以直接用肉眼看見整體外形？",
      "Which can you see as a whole with your eyes?",
    ),
    choices: [
      { id: "leaf", title: bi("葉片", "Leaf"), image: "leaf" },
      {
        id: "fruit-fly",
        title: bi("成體果蠅", "Adult fruit fly"),
        image: "fruit-fly",
      },
      {
        id: "zebrafish",
        title: bi("成體斑馬魚", "Adult zebrafish"),
        image: "zebrafish",
      },
      {
        id: "animal-cell",
        title: bi("一般動物細胞", "Typical animal cell"),
        description: bi("單個細胞", "One cell"),
        image: "animal-cell",
      },
      {
        id: "bacterium",
        title: bi("常見細菌", "Common bacterium"),
        description: bi("單隻細菌", "One bacterium"),
        image: "bacterium",
      },
    ],
    correctAnswer: ["leaf", "fruit-fly", "zebrafish"],
    hint: bi(
      "找找葉子、成體果蠅和成魚的外形。卡片上的細胞和細菌示意圖已經放大了！",
      "Look for the leaf, adult fly and adult fish. The cell and bacterium on the cards are already enlarged!",
    ),
    explanation: bi(
      "葉片、成體果蠅和成體斑馬魚，肉眼就能看見。一般動物細胞與單隻常見細菌通常太小，需要顯微鏡的幫忙！",
      "We can see leaves, adult fruit flies and adult zebrafish with our eyes. Typical animal cells and single common bacteria are usually too small, so microscopes help!",
    ),
    funFact: bi(
      "果蠅和斑馬魚都是科學家常研究的小夥伴。認識牠們，從仔細觀察開始！",
      "Fruit flies and zebrafish are often studied by scientists. Get to know them by looking closely!",
    ),
    microscopeType: "naked-eye",
  },
  {
    id: "case-optical",
    stage: "optical",
    type: "single",
    title: bi("細胞的秘密房間", "The cells’ secret rooms"),
    question: bi(
      "哪張代表用光和鏡片，觀察洋蔥的一格格細胞？",
      "Which shows onion cells observed with light and lenses?",
    ),
    choices: [
      {
        id: "fluorescent",
        title: bi("影像 A", "Image A"),
        image: "fluorescence-cell",
        description: bi(
          "標記受光後發光，指出特定構造。",
          "Labels glow under light to locate selected structures.",
        ),
      },
      {
        id: "brightfield",
        title: bi("影像 B", "Image B"),
        image: "optical-onion",
        description: bi(
          "光穿過薄薄表皮，鏡片形成細胞影像。",
          "Light passes through thin skin; lenses form an image of cells.",
        ),
      },
      {
        id: "electron",
        title: bi("影像 C", "Image C"),
        image: "electron-mitochondrion",
        description: bi(
          "電子穿過薄樣品，揭露內部皺摺。",
          "Electrons pass through a thin sample to reveal internal folds.",
        ),
      },
    ],
    correctAnswer: ["brightfield"],
    hint: bi(
      "找找像一格格小房間的細胞，也讀讀卡片上的觀察方法。",
      "Look for cells like little rooms, and read the observation method on the card.",
    ),
    explanation: bi(
      "複式光學顯微鏡利用光和鏡片，讓我們看清楚洋蔥表皮的一格格細胞。這種觀察方式叫做「明視野」。",
      "A compound light microscope uses light and lenses to reveal individual onion skin cells. This method is called brightfield microscopy.",
    ),
    funFact: bi(
      "螢光顯微鏡也是光學顯微鏡的一種！洋蔥圖裡的框線是細胞壁，並非所有細胞都長得方方的。",
      "Fluorescence is also a kind of light microscopy! The onion cells have cell walls; not all cells are box-shaped.",
    ),
    microscopeType: "optical",
  },
  {
    id: "case-fluorescence",
    stage: "fluorescence",
    type: "single",
    title: bi("誰讓細胞亮起來？", "Who made the cells glow?"),
    image: "fluorescence-cell",
    question: bi(
      "科學家真的把細胞塗成綠色和紫色了嗎？",
      "Did scientists really paint the cells green and purple?",
    ),
    choices: [
      {
        id: "pens",
        title: bi(
          "是，用彩色筆染上去的",
          "Yes, they used colored marker pens.",
        ),
      },
      {
        id: "natural",
        title: bi(
          "細胞本來就是這些顏色",
          "The cells naturally have these colors.",
        ),
      },
      {
        id: "labels",
        title: bi(
          "科學家利用螢光標記，讓特定構造發光",
          "Scientists use fluorescent labels to make selected structures glow.",
        ),
      },
    ],
    correctAnswer: ["labels"],
    hint: bi(
      "找找「標記」和「發光」這兩個線索。試試上面的四個步驟！",
      "Look for two clues: “labels” and “glow.” Try the four steps above!",
    ),
    explanation: bi(
      "螢光標記受到適合的光照射後會發光，幫助科學家找到想研究的構造。畫面顏色也可以由電腦指定，不代表細胞原本就是這些顏色。",
      "Fluorescent labels glow under suitable light, helping scientists find structures they want to study. Display colors can also be assigned by a computer; they do not show the cells’ natural colors.",
    ),
    funFact: bi(
      "這張示意圖中，大圓區域代表細胞核；短絲狀訊號代表粒線體，幫細胞利用養分中的能量。",
      "In this illustration, large round regions represent nuclei. Short filaments represent mitochondria, which help cells use energy from nutrients.",
    ),
    microscopeType: "fluorescence",
  },
  {
    id: "case-electron",
    stage: "electron",
    type: "single",
    title: bi("追查最細小的線索", "Follow the finest clues"),
    question: bi(
      "哪一張能看到粒線體裡細小的皺摺？",
      "Which image reveals tiny folds inside a mitochondrion?",
    ),
    choices: [
      {
        id: "whole",
        title: bi("葉片整體", "A whole leaf"),
        image: "leaf",
        description: bi("肉眼：看見整體外形", "Eyes: see the whole shape"),
      },
      {
        id: "cells",
        title: bi("洋蔥細胞", "Onion cells"),
        image: "optical-onion",
        description: bi("明視野：光與鏡片", "Brightfield: light and lenses"),
      },
      {
        id: "folds",
        title: bi("粒線體內部", "Inside a mitochondrion"),
        image: "electron-mitochondrion",
        description: bi(
          "電子顯微鏡：揭露內部細節",
          "Electron microscopy: reveal internal detail",
        ),
      },
    ],
    correctAnswer: ["folds"],
    hint: bi(
      "找找有內部皺摺，而且使用「電子」的觀察方法。",
      "Find the internal folds and a method that uses electrons.",
    ),
    explanation: bi(
      "電子顯微鏡使用電子觀察樣品，能分辨比複式光學顯微鏡更細小的結構。把圖片放得更大，不一定能看見更多細節！",
      "Electron microscopes use electrons to observe samples and can distinguish smaller structures than compound light microscopes. Making a picture bigger does not always reveal more detail!",
    ),
    funFact: bi(
      "SEM（掃描式電子顯微鏡）常用來看表面或表面附近的細節。TEM（穿透式電子顯微鏡）適合看很薄樣品的內部構造。這張粒線體圖是後者的概念示意。",
      "Scanning electron microscopy (SEM) shows surface detail; transmission electron microscopy (TEM) shows inside thin samples. This mitochondrion is a TEM teaching illustration.",
    ),
    microscopeType: "electron",
  },
];

const finalQuestion = (
  id: string,
  image: string,
  microscopeType: Question["microscopeType"],
  clue: ReturnType<typeof bi>,
  explanation: ReturnType<typeof bi>,
): Question => ({
  id,
  stage: "final",
  type: "single",
  image,
  microscopeType,
  title: bi("神秘影像檔案", "Mystery image file"),
  question: bi(
    "這份影像使用了哪種觀察工具？",
    "Which observation tool was used for this image?",
  ),
  choices: toolChoices,
  correctAnswer: [microscopeType!],
  hint: clue,
  explanation,
  funFact: bi(
    "同一種生物可以用不同工具研究。這次要找的是這張影像使用的方法！",
    "The same organism can be studied with different tools. Identify the method used for this particular image!",
  ),
});

// Shuffled once per game. All four observation methods remain represented.
export const finalQuestions: Question[] = [
  finalQuestion(
    "final-leaf",
    "leaf",
    "naked-eye",
    bi(
      "沒有使用放大工具，直接看見整片葉子的外形。",
      "No magnifying tool was used to see the whole leaf.",
    ),
    bi(
      "肉眼能看見葉片的整體外形；想看細胞，就要繼續深入觀察。",
      "Our eyes show a whole leaf. To see its cells, we need a closer look.",
    ),
  ),
  finalQuestion(
    "final-fish",
    "zebrafish",
    "naked-eye",
    bi(
      "直接觀察水中的成魚，看見牠的身體和條紋。",
      "An adult fish was viewed directly in water, showing its body and stripes.",
    ),
    bi(
      "成體斑馬魚的整體外形，肉眼就能看見。",
      "An adult zebrafish’s overall shape is visible to our eyes.",
    ),
  ),
  finalQuestion(
    "final-onion",
    "optical-onion",
    "optical",
    bi(
      "光穿過薄薄的洋蔥表皮，由鏡片形成細胞的影像。",
      "Light passed through thin onion skin, and lenses formed an image of its cells.",
    ),
    bi(
      "光與鏡片幫我們看清楚洋蔥細胞，這是一般明視野觀察。",
      "Light and lenses help us see onion cells clearly. This is ordinary brightfield observation.",
    ),
  ),
  finalQuestion(
    "final-glow",
    "fluorescence-cell",
    "fluorescence",
    bi(
      "特定構造加上標記，受到適合的光照射後發光。",
      "Selected structures were labeled and glowed under suitable light.",
    ),
    bi(
      "發光標記幫助我們找到目標構造，顏色不代表細胞原本的顏色。",
      "Glowing labels locate target structures. The colors do not show the cells’ natural colors.",
    ),
  ),
  finalQuestion(
    "final-folds",
    "electron-mitochondrion",
    "electron",
    bi(
      "電子穿過很薄的樣品，揭露粒線體內部皺摺。",
      "Electrons passed through a very thin sample to reveal folds inside a mitochondrion.",
    ),
    bi(
      "電子顯微鏡能揭露粒線體內部很細小的結構。",
      "Electron microscopy can reveal very small structures inside mitochondria.",
    ),
  ),
];

export const questionsById = Object.fromEntries(
  [...caseQuestions, ...finalQuestions].map((q) => [q.id, q]),
);
export const fluorescenceSteps = [
  {
    title: bi("細胞", "Cells"),
    description: bi(
      "先看看尚未標記的細胞示意。",
      "Start with a diagram of unlabeled cells.",
    ),
    image: "cell-unmarked",
  },
  {
    title: bi("加入螢光標記", "Add labels"),
    description: bi(
      "用標記，認出我們想研究的構造。",
      "Use labels to identify structures we want to study.",
    ),
    image: "cell-unmarked",
  },
  {
    title: bi("用適合的光照射", "Shine suitable light"),
    description: bi(
      "用適合的光照射，讓螢光標記發光。",
      "Suitable light excites the fluorescent labels.",
    ),
    image: "cell-unmarked",
  },
  {
    title: bi("構造發出螢光", "See the glow"),
    description: bi(
      "標記發光了！這張示意圖裡，圓形區域代表細胞核，短絲狀訊號代表粒線體。",
      "The labels glow! In this diagram, round regions represent nuclei and short filaments represent mitochondria.",
    ),
    image: "fluorescence-cell",
  },
];
export const observationLevels = [
  {
    icon: "eye",
    tool: bi("肉眼", "Eyes"),
    label: bi("整體外形", "Whole shapes"),
  },
  {
    icon: "microscope",
    tool: bi("複式光學顯微鏡", "Compound light microscope"),
    label: bi("細胞世界", "A world of cells"),
  },
  {
    icon: "bolt",
    tool: bi("電子顯微鏡", "Electron microscope"),
    label: bi("更細小的構造", "Smaller structures"),
  },
];
