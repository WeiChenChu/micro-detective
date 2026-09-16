import type { AcademyLesson } from "./academyData";
import { bi } from "./types";
export const closeObservationLessons: AcademyLesson[] = [
  {
    id: "magnifier",
    icon: "search",
    title: bi("放大鏡", "Magnifying glass"),
    opening: bi(
      "果蠅的細節太小了。移動放大鏡，找找翅膀、眼睛和腳。",
      "The fly’s details are tiny. Move a lens to find wings, eyes and legs.",
    ),
    concept: bi(
      "放大鏡利用鏡片，讓局部細節更容易看見；適合觀察葉脈、羽毛或較大型昆蟲翅膀等肉眼可見的表面特徵。",
      "A magnifying glass uses a lens to make local details easier to see on visible surfaces such as leaf veins, feathers or larger insect wings.",
    ),
    clue: bi(
      "放大鏡讓原本肉眼看得到的小東西更容易觀察；圖片變大不一定增加細節。",
      "A hand lens makes small, visible objects easier to observe. A bigger image does not necessarily add detail.",
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
      "放大鏡還不夠清楚？用解剖顯微鏡探索同一隻果蠅。",
      "Need a closer view than a hand lens? Explore the same fly with a stereomicroscope.",
    ),
    concept: bi(
      "解剖顯微鏡使用光，通常以較低倍率、較大視野觀察完整小生物或物體表面，並具有立體感。",
      "A stereomicroscope uses light, usually with lower magnification and a wider field, to observe intact small organisms or surfaces with a sense of depth.",
    ),
    clue: bi(
      "看見：保留整體與高低線索。解剖顯微鏡也是光學顯微鏡，不一定要把樣本切開。",
      "SEE: keep the whole object and depth clues. A stereomicroscope is a light microscope; specimens need not be cut open.",
    ),
    sendoff: bi(
      "完整的小生物，也藏著豐富線索！",
      "Whole small organisms have plenty of clues too!",
    ),
  },
];
