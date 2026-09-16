import type { AcademyLesson } from "./academyData";
import { bi } from "./types";
export const closeObservationLessons: AcademyLesson[] = [
  {
    id: "magnifier",
    icon: "search",
    title: bi("放大鏡", "Magnifying glass"),
    opening: bi(
      "葉脈和昆蟲翅膀，藏著哪些局部線索？",
      "What local clues hide in leaf veins and insect wings?",
    ),
    concept: bi(
      "放大鏡利用鏡片，讓局部細節更容易看見；適合觀察葉片、昆蟲或羽毛。",
      "A magnifying glass uses a lens to make local details easier to see on leaves, insects or feathers.",
    ),
    clue: bi(
      "看見：先找整體，再放大感興趣的地方；圖片變大不一定增加細節。",
      "SEE: start with the whole, then enlarge an interesting area. A bigger image does not necessarily add detail.",
    ),
    question: bi(
      "想在戶外看看葉脈的分支，可以先用什麼？",
      "What could you start with to look at branching leaf veins outdoors?",
    ),
    choices: [
      {
        id: "magnifier",
        title: bi(
          "拿放大鏡觀察葉片局部",
          "Use a magnifying glass on part of the leaf",
        ),
      },
      {
        id: "most",
        title: bi(
          "一定要用倍率最高的工具",
          "Always choose the highest magnification",
        ),
      },
    ],
    answer: "magnifier",
    feedback: bi(
      "放大鏡方便觀察局部葉脈；合適的工具比一味追求高倍率更重要。",
      "A magnifying glass is handy for leaf veins. A suitable tool matters more than maximum magnification.",
    ),
    hint: bi(
      "葉片就在眼前，先用方便攜帶、能放大局部的工具。",
      "The leaf is right here. Start with a portable tool that enlarges an area.",
    ),
    strongHint: bi(
      "放大鏡就能幫你找葉脈，不必每次都用最高倍率。",
      "A magnifying glass helps you find the veins; maximum magnification is not always needed.",
    ),
    sendoff: bi(
      "你會用放大鏡追查局部線索了！",
      "You can now explore local clues with a magnifying glass!",
    ),
  },
  {
    id: "stereo",
    icon: "microscope",
    title: bi("解剖顯微鏡", "Stereomicroscope"),
    opening: bi(
      "想看完整的小昆蟲，又想看清楚表面，該怎麼辦？",
      "How can you see a whole small insect and inspect its surface?",
    ),
    concept: bi(
      "解剖顯微鏡使用光，通常以較低倍率、較大視野觀察完整小生物或物體表面，並具有立體感。",
      "A stereomicroscope uses light, usually with lower magnification and a wider field, to observe intact small organisms or surfaces with a sense of depth.",
    ),
    clue: bi(
      "看見：保留整體與高低線索。解剖顯微鏡也是光學顯微鏡，不一定要把樣本切開。",
      "SEE: keep the whole object and depth clues. A stereomicroscope is a light microscope; specimens need not be cut open.",
    ),
    question: bi(
      "想觀察完整果蠅與表面形狀，哪種做法更適合？",
      "Which approach fits observing an intact fruit fly and its surface shape?",
    ),
    choices: [
      {
        id: "highest",
        title: bi(
          "只選最高倍率，不管看得到多少範圍",
          "Choose only the highest magnification, ignoring the field of view",
        ),
      },
      {
        id: "stereo",
        title: bi(
          "用解剖顯微鏡，保留較大視野與立體感",
          "Use a stereomicroscope for a wider field and sense of depth",
        ),
      },
    ],
    answer: "stereo",
    feedback: bi(
      "較大視野方便看完整果蠅，兩眼從略不同角度觀察還能感覺立體形狀。",
      "A wider field helps you see the whole fruit fly, and slightly different views for each eye create a sense of depth.",
    ),
    hint: bi(
      "這次需要完整小生物和表面，不是細胞內最細的構造。",
      "We need the intact organism and its surface, not the finest structures inside cells.",
    ),
    strongHint: bi(
      "選擇解剖顯微鏡：較低倍率、較大視野，幫助觀察完整物體。",
      "Choose a stereomicroscope: lower magnification and a wider field help you observe intact objects.",
    ),
    sendoff: bi(
      "完整的小生物，也藏著豐富線索！",
      "Whole small organisms have plenty of clues too!",
    ),
  },
];
