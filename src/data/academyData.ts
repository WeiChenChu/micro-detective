import { bi, type Choice, type Text } from "./types";
import { closeObservationLessons } from "./academyExtensions";

export interface AcademyLesson {
  id: string;
  icon: string;
  title: Text;
  opening: Text;
  concept: Text;
  clue: Text;
  question: Text;
  choices: Choice[];
  answer: string;
  feedback: Text;
  hint: Text;
  strongHint: Text;
  sendoff: Text;
}

export const academyModules: AcademyLesson[] = [
  {
    id: "scale",
    icon: "search",
    title: bi("肉眼觀察：我們能看多小？", "Naked eye: how small can we see?"),
    opening: bi(
      "你的眼睛找得到一條魚，也找得到一個細胞嗎？",
      "Your eyes can find a fish. Can they find a single cell?",
    ),
    concept: bi(
      "有些東西小到我們的眼睛看不到，因此科學家需要不同的觀察工具。",
      "Some things are too small for our eyes, so scientists need different observation tools.",
    ),
    clue: bi(
      "看得到，不一定看得清楚；看得清楚，也不一定看得到你想找的線索。先問「我想知道什麼？」再選工具。",
      "Seeing something is not the same as seeing it clearly, and seeing it clearly may not reveal the clue you want. First ask what you want to know, then choose a tool.",
    ),
    question: bi(
      "如果我們想仔細觀察細胞，只用眼睛夠嗎？",
      "Are our eyes alone enough to observe a typical cell closely?",
    ),
    choices: [
      {
        id: "eyes",
        title: bi("夠，把眼睛睜大就好", "Yes, just open our eyes wider"),
      },
      {
        id: "tool",
        title: bi("不夠，需要顯微鏡幫忙", "No, a microscope can help"),
      },
    ],
    answer: "tool",
    feedback: bi(
      "你找到了工具的用途！一般細胞太小，顯微鏡能幫我們觀察肉眼看不清楚的細節。",
      "You found why tools matter! Typical cells are tiny; microscopes reveal details our eyes cannot see.",
    ),
    hint: bi(
      "想想看：細胞卡片已經放大，才方便我們觀察。",
      "Remember: the cell card is enlarged so we can observe it.",
    ),
    strongHint: bi(
      "把眼睛睜大不會放大細胞；選擇能幫忙形成影像的工具。",
      "Opening your eyes wider will not enlarge a cell. Choose the answer with a tool.",
    ),
    sendoff: bi(
      "準備好你的第一個微觀偵探工具吧！",
      "Get ready for your first microscopic detective tool!",
    ),
  },
  ...closeObservationLessons,
  {
    id: "optical",
    icon: "microscope",
    title: bi("複式光學顯微鏡", "Compound light microscope"),
    opening: bi(
      "薄薄的洋蔥表皮裡，藏著什麼？",
      "What is hidden in a thin piece of onion skin?",
    ),
    concept: bi(
      "使用光和鏡片，幫助我們觀察肉眼看不清楚的微小世界。",
      "Light and lenses help us observe a tiny world that our eyes cannot see clearly.",
    ),
    clue: bi(
      "看見：鏡片形成放大的影像；放得更大，不一定代表看得更清楚。",
      "SEE: lenses form a magnified image. Bigger does not always mean clearer.",
    ),
    question: bi(
      "要讓這台複式光學顯微鏡顯示細胞，需要什麼？",
      "What does this compound light microscope need to show cells?",
    ),
    choices: [
      {
        id: "light-lenses",
        title: bi("光和鏡片一起幫忙", "Light and lenses working together"),
      },
      {
        id: "zoom",
        title: bi("只要一直把圖片放大", "Just keep enlarging a picture"),
      },
    ],
    answer: "light-lenses",
    feedback: bi(
      "看見了！光經過樣品，鏡片幫忙形成放大的細胞影像。只把圖片拉大，不會自動增加細節。",
      "Now we can see! Light passes through the specimen, and lenses form a magnified image. Enlarging a picture alone adds no detail.",
    ),
    hint: bi(
      "回頭看看光 → 樣品 → 鏡片 → 影像的路線。",
      "Look at the light → specimen → lenses → image path.",
    ),
    strongHint: bi(
      "沒有光，就沒有這個觀察訊號；鏡片也要一起工作。",
      "Without light, this signal is missing. The lenses need to work with it.",
    ),
    sendoff: bi("你獲得了「看見」的能力！", "You have the power to SEE!"),
  },
  {
    id: "fluorescence",
    icon: "sparkle",
    title: bi("螢光顯微鏡", "Fluorescence microscope"),
    opening: bi(
      "細胞裡有很多構造，只想找到其中一種，該怎麼辦？",
      "There are many structures inside a cell. How can we find just one kind?",
    ),
    concept: bi(
      "螢光顯微鏡是光學顯微鏡的一種。螢光標記可以幫助科學家找到特定的細胞或構造。",
      "Fluorescence microscopy is a type of light microscopy. Fluorescent labels help scientists find particular cells or structures.",
    ),
    clue: bi(
      "尋找：螢光標記就像標出重要線索；影像的顏色不一定是天然顏色。",
      "FIND: fluorescent labels mark important clues. Image colors are not necessarily natural colors.",
    ),
    question: bi(
      "細胞在身體裡本來就是綠色和紫色嗎？",
      "Are cells naturally green and purple inside the body?",
    ),
    choices: [
      {
        id: "natural",
        title: bi(
          "是，細胞本來就是這些顏色",
          "Yes, cells naturally have these colors",
        ),
      },
      {
        id: "labels",
        title: bi(
          "不一定。螢光標記讓特定構造產生訊號",
          "Not necessarily. Fluorescent labels reveal signals from selected structures",
        ),
      },
      {
        id: "pens",
        title: bi(
          "是科學家用彩色筆畫上去的",
          "Scientists drew on them with marker pens",
        ),
      },
    ],
    answer: "labels",
    feedback: bi(
      "你找到了訊號！螢光影像中的顏色常常代表不同的標記或訊號，不一定是細胞原本的顏色。",
      "You found the signal! Colors in fluorescence images often represent different labels or signals, not the natural colors of cells.",
    ),
    hint: bi(
      "觀察加入標記、用適合的光照射之後，哪些地方亮起來？",
      "After adding labels and suitable light, which areas glow?",
    ),
    strongHint: bi(
      "線索是「標記」產生的訊號；不是細胞本來的顏色，也不是彩色筆。",
      "The clue is a signal from labels, not natural cell colors or marker pens.",
    ),
    sendoff: bi("你獲得了「尋找」的能力！", "You have the power to FIND!"),
  },
  {
    id: "electron",
    icon: "bolt",
    title: bi("電子顯微鏡", "Electron microscope"),
    opening: bi(
      "想分辨細胞內非常細微的構造，哪種工具能幫忙？",
      "Which tool can help distinguish very fine structures inside cells?",
    ),
    concept: bi(
      "使用電子形成影像，可以觀察非常細微的結構。但樣品通常需要特殊準備，而且通常不能直接觀察活著、正在活動的生物。",
      "Electrons form images that reveal very fine structures. But samples usually need special preparation, and living, moving organisms usually cannot be observed directly.",
    ),
    clue: bi(
      "深入：看得更細也有代價，不是所有問題都適合用電子顯微鏡。",
      "EXPLORE: finer detail comes with tradeoffs. Electron microscopy does not suit every question.",
    ),
    question: bi(
      "想分辨粒線體裡細小的皺摺，你會怎麼做？",
      "How would you distinguish tiny folds inside a mitochondrion?",
    ),
    choices: [
      {
        id: "stretch",
        title: bi("把原本模糊的照片拉大", "Stretch the same blurry picture"),
      },
      {
        id: "electrons",
        title: bi(
          "用電子形成影像，觀察更細微的結構",
          "Use electrons to image finer structures",
        ),
      },
    ],
    answer: "electrons",
    feedback: bi(
      "你深入找到細節了！複式光學顯微鏡利用光；電子顯微鏡利用電子形成影像，能分辨更細微的結構。",
      "You explored the detail! Compound light microscopes use light; electron microscopes form images with electrons and resolve finer structures.",
    ),
    hint: bi(
      "圖片變大，和出現原本看不清楚的皺摺，是同一件事嗎？",
      "Is a bigger picture the same as revealing folds you could not distinguish before?",
    ),
    strongHint: bi(
      "拉大模糊照片還是模糊；這次需要使用電子的觀察工具。",
      "A stretched blurry picture stays blurry. This investigation needs a tool that uses electrons.",
    ),
    sendoff: bi("你獲得了「深入」的能力！", "You have the power to EXPLORE!"),
  },
];

export const toolAbilities = [
  {
    id: "optical",
    icon: "microscope",
    verb: bi("看見", "SEE"),
    name: bi("複式光學顯微鏡", "Compound light microscope"),
    description: bi(
      "讓肉眼看不清楚的東西變得可以觀察",
      "Observe things our eyes cannot see clearly",
    ),
  },
  {
    id: "fluorescence",
    icon: "sparkle",
    verb: bi("尋找", "FIND"),
    name: bi("螢光顯微鏡", "Fluorescence microscope"),
    description: bi(
      "讓特定的細胞或構造成為明顯的線索",
      "Make particular cells or structures stand out",
    ),
  },
  {
    id: "electron",
    icon: "bolt",
    verb: bi("深入", "EXPLORE"),
    name: bi("電子顯微鏡", "Electron microscope"),
    description: bi("觀察更細微的結構", "Observe finer structures"),
  },
];

export const scaleSequence = [
  { label: bi("小朋友", "Child"), icon: "people" },
  { label: bi("斑馬魚", "Zebrafish"), image: "zebrafish" },
  { label: bi("果蠅", "Fruit fly"), image: "fruit-fly" },
  { label: bi("細胞", "Cell"), image: "animal-cell" },
  { label: bi("細菌", "Bacterium"), image: "bacterium" },
  { label: bi("病毒", "Virus"), icon: "search" },
  { label: bi("更細微的細胞構造", "Finer cell structures"), icon: "search" },
];

export const academyVisuals = {
  scaleNote: bi(
    "由大到小的典型例子，卡片未按比例繪製；不同種類的大小會不同。不用背數字！",
    "Typical examples from large to small, not drawn to scale. Sizes vary between kinds. No numbers to memorize!",
  ),
  lightPath: [
    bi("💡 光", "💡 Light"),
    bi("🧫 樣品", "🧫 Specimen"),
    bi("🔬 鏡片", "🔬 Lenses"),
    bi("👁 影像", "👁 Image"),
  ],
  lightOn: bi("打開光源，看看樣品", "Turn on the light and observe"),
  lightOff: bi("關掉光源，再試一次", "Turn off the light and try again"),
  dark: bi(
    "光源還沒開，細胞線索藏在哪裡？",
    "The light is off. Where are the cell clues?",
  ),
  lightNote: bi(
    "光與鏡片幫你看見細胞；只拉大圖片，不會增加新的細節。",
    "Light and lenses reveal cells. Enlarging a picture alone adds no new details.",
  ),
  electronBefore: bi(
    "先看看細胞的整體構造",
    "First, observe the cell as a whole",
  ),
  electronAction: bi(
    "用電子顯微鏡，深入粒線體",
    "Explore mitochondria with an electron microscope",
  ),
  electronAfter: bi(
    "發現了：內部有許多細小皺摺！",
    "Discovery: many tiny folds inside!",
  ),
  electronNote: bi(
    "不同觀察方法的教學示意，並非同一張照片連續放大。",
    "Diagrams of different observation methods, not a continuous zoom of one photo.",
  ),
  grayQuestion: bi(
    "為什麼很多電子顯微鏡影像是灰色的？",
    "Why are many electron microscope images gray?",
  ),
  grayAnswer: bi(
    "電子顯微鏡不是像眼睛一樣直接看到物體的顏色。有些彩色影像是後來加上顏色，讓不同構造更容易辨認。",
    "Electron microscopes do not directly see visible colors as our eyes do. Some images are colored later to help distinguish structures.",
  ),
};
