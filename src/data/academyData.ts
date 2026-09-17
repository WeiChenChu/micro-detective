import { bi, type Text } from "./types";
import { closeObservationLessons } from "./academyExtensions";

export interface AcademyLesson {
  id: string;
  icon: string;
  title: Text;
  opening: Text;
  concept: Text;
  clue: Text;
  sendoff: Text;
  check?: {
    question: Text;
    choices: { id: string; label: Text; feedback: Text }[];
    answer: string;
  };
}

export const academyModules: AcademyLesson[] = [
  {
    id: "scale",
    icon: "search",
    title: bi("肉眼觀察：我們能看多小？", "Naked eye: how small can we see?"),
    opening: bi(
      "從成魚到小果蠅：看得到牠，也看得清楚細節嗎？",
      "From an adult fish to a tiny fly: visible, but are the details clear?",
    ),
    concept: bi(
      "果蠅肉眼可以看到，但眼睛、翅膀和腳的細節不容易看清楚；不同工具能幫我們觀察。",
      "A fruit fly is visible to our eyes, but details of its eyes, wings and legs are hard to distinguish. Observation tools can help.",
    ),
    clue: bi(
      "看得到，不一定看得清楚；看得清楚，也不一定看得到你想找的線索。先問「我想知道什麼？」再選工具。",
      "Seeing something is not the same as seeing it clearly, and seeing it clearly may not reveal the clue you want. First ask what you want to know, then choose a tool.",
    ),
    sendoff: bi(
      "準備好你的第一個微觀偵探工具吧！",
      "Get ready for your first microscopic detective tool!",
    ),
  },
  ...closeObservationLessons,
  {
    id: "optical",
    check: {
      question: bi("這次換成薄薄的洋蔥表皮，為什麼適合用複式光學顯微鏡？", "Why does a compound light microscope suit this thin onion skin?"),
      answer: "sample",
      choices: [
        { id: "power", label: bi("倍率較高，所以任何樣品都適合", "Higher magnification suits every specimen"), feedback: bi("完整果蠅需要較大視野；這次薄表皮能透光，問題也改成看細胞。樣品和問題都要考慮。", "A whole fly needs a wider view. This thin skin transmits light and the question is about cells. Consider both specimen and question.") },
        { id: "sample", label: bi("薄樣品能透光，這次想分辨細胞邊界", "The thin specimen transmits light; we want cell boundaries"), feedback: bi("是的！合適的樣品、照明與對焦一起幫你分辨細胞，不只是倍率比較高。", "Yes! A suitable specimen, illumination and focus reveal cells, beyond just magnification.") },
      ],
    },
    icon: "microscope",
    title: bi("複式光學顯微鏡", "Compound light microscope"),
    opening: bi(
      "果蠅肉眼看得到，那細胞呢？換一片薄薄的洋蔥表皮來觀察。",
      "We can see a fly with our eyes. What about cells? Try a thin piece of onion skin.",
    ),
    concept: bi(
      "使用光和鏡片，幫助我們觀察肉眼看不清楚的微小世界。",
      "Light and lenses help us observe a tiny world that our eyes cannot see clearly.",
    ),
    clue: bi(
      "看見：對焦後才能分辨細胞的細節；放得更大，不一定代表看得更清楚。",
      "SEE: focusing reveals cell details. Bigger does not always mean clearer.",
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
    sendoff: bi("你獲得了「尋找」的能力！", "You have the power to FIND!"),
  },
  {
    id: "electron",
    check: {
      question: bi("想看光學影像分不開的內膜細節，下一步怎麼做？", "How can we resolve inner membrane details beyond the light image?"),
      answer: "prepare",
      choices: [
        { id: "live", label: bi("把活樣品直接放進電子顯微鏡，看它活動", "Put the living sample straight into an electron microscope to watch it move"), feedback: bi("電子顯微鏡通常需要特殊處理，不能像一般光學觀察那樣直接追蹤活體活動。", "Electron microscopy usually needs special preparation, rather than directly following living activity as in light microscopy.") },
        { id: "prepare", label: bi("準備適合的薄樣品，用 TEM（穿透式電子顯微鏡） 看內部細節", "Prepare a suitable thin specimen and use TEM（穿透式電子顯微鏡） for internal detail"), feedback: bi("TEM（穿透式電子顯微鏡） 適合薄樣品內部的超微結構，SEM（掃描式電子顯微鏡） 偏向表面。看得更細，也要考慮樣品處理。", "TEM（穿透式電子顯微鏡） suits ultrastructure inside thin samples; SEM（掃描式電子顯微鏡） emphasizes surfaces. Finer detail also requires specimen preparation.") },
      ],
    },
    icon: "bolt",
    title: bi("電子顯微鏡", "Electron microscope"),
    opening: bi(
      "找到訊號之後，還想分辨更細微的構造？探索電子顯微鏡的兩種觀察。",
      "After finding signals, explore finer structures with two electron microscopy views.",
    ),
    concept: bi(
      "使用電子形成影像，可以觀察非常細微的結構。但樣品通常需要特殊準備，而且通常不能直接觀察活著、正在活動的生物。",
      "Electrons form images that reveal very fine structures. But samples usually need special preparation, and living, moving organisms usually cannot be observed directly.",
    ),
    clue: bi(
      "深入：看得更細也有代價，不是所有問題都適合用電子顯微鏡。",
      "EXPLORE: finer detail comes with tradeoffs. Electron microscopy does not suit every question.",
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
