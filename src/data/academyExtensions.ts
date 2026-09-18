import { toolIllustrations } from "./toolIllustrations";
import type { AcademyLesson } from "./academyData";
import { bi } from "./types";
export const closeObservationLessons: AcademyLesson[] = [
  {
    ...toolIllustrations.magnifier,
    id: "magnifier",
    icon: "search",
    title: bi("放大鏡", "Magnifying glass"),
    opening: bi(
      "移動放大鏡，看看果蠅的頭、身體、翅膀或腳。",
      "Move the lens to find the fly’s head, body, wings or legs.",
    ),
    concept: bi(
      "放大鏡能把局部放大，讓小細節更容易看清楚。可以用來看看葉脈、羽毛或較大昆蟲的翅膀表面。",
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
    ...toolIllustrations.stereo,
    id: "stereo",
    icon: "microscope",
    title: bi("解剖顯微鏡", "Stereomicroscope"),
    opening: bi(
      "放大鏡還不夠清楚？用解剖顯微鏡探索同一隻果蠅。",
      "Need a closer view than a hand lens? Explore the same fly with a stereomicroscope.",
    ),
    concept: bi(
      "解剖顯微鏡使用光，通常倍率較低，能看到的範圍較大，這叫「視野」。它適合看完整的小生物或物體表面，也能讓我們感覺到高低。",
      "A stereomicroscope uses light, usually with lower magnification and a wider field, to observe intact small organisms or surfaces with a sense of depth.",
    ),
    clue: bi(
      "看見：倍率較低時，比較容易一次看完整隻成體果蠅。想看整體，較大的視野很有幫助！",
      "SEE: lower magnification makes it easier to fit the whole adult fly in view. A wider field helps us see its whole shape!",
    ),
    sendoff: bi(
      "完整的小生物，也藏著豐富線索！",
      "Whole small organisms have plenty of clues too!",
    ),
  },
];
