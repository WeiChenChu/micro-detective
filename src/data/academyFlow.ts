import { bi, type Text } from "./types";
import type { AcademyLesson } from "./academyData";
import { practiceQuestions } from "./observationData";
import { toolIllustrations } from "./toolIllustrations";
type Check = NonNullable<AcademyLesson["check"]>;
type Tool = keyof typeof toolIllustrations;
const toolChoice = (id: Tool, feedback: Text) => ({ id, label: toolIllustrations[id].toolName, image: toolIllustrations[id].image, imageAlt: toolIllustrations[id].imageAlt, feedback });
// Reuse the original leaf/onion challenges within the relevant experience.
const reuse = (index: number): Check => {
  const q = practiceQuestions[index];
  return { question: q.question, answer: q.correctAnswer[0], choices: q.choices.filter(c => ["magnifier", "stereo", "optical"].includes(c.id)).map(c => ({ id: c.id, label: c.title, feedback: c.id === q.correctAnswer[0] ? q.explanation : q.hint })) };
};
export const academyChallenges: Record<string, Check> = {
  magnifier: reuse(1),
  stereo: {
    question: bi("想看果蠅翅膀上的小紋路，哪個工具比較適合？", "Which tool helps reveal the tiny lines on a fruit fly’s wings?"), answer: "stereo",
    choices: [
      toolChoice("scale", bi("肉眼找得到果蠅，小紋路還看不清楚。再試試！", "Our eyes find the fly, but not its tiny wing lines. Try again!")),
      toolChoice("magnifier", bi("放大鏡讓果蠅更容易辨認，翅膀的小紋路還不夠清楚喔。", "A hand lens makes the fly easier to recognize, but the tiny wing lines remain unclear.")),
      toolChoice("stereo", bi("對！解剖顯微鏡能幫我們看清楚較細的外部構造。", "Yes! A stereomicroscope reveals finer external structures.")),
    ],
  },
  optical: reuse(2),
  fluorescence: {
    question: bi("想知道細胞核在哪裡，哪個工具搭配標記最能幫忙？", "Which tool with labels helps locate the nuclei?"), answer: "fluorescence",
    choices: [
      toolChoice("optical", bi("能看見細胞了！再找找能讓特定目標亮起來的方法。", "We can see cells! Which method makes a selected target light up?")),
      toolChoice("fluorescence", bi("找到了！合適的螢光標記能指出細胞核的位置。", "Found it! Suitable fluorescent labels locate nuclei.")),
    ],
  },
  electron: {
    question: bi("想看很細的表面構造，應該選哪一種？", "Which view reveals very fine surface structures?"), answer: "sem",
    choices: [
      { id: "sem", label: bi("SEM（掃描式電子顯微鏡）", "SEM (scanning electron microscope)"), feedback: bi("對！剛才凸起的小面，就是表面的線索。", "Yes! Those raised facets are surface clues.") },
      { id: "tem", label: bi("TEM（穿透式電子顯微鏡）", "TEM (transmission electron microscope)"), feedback: bi("這種方法幫我們看薄樣品的裡面。這次想看表面，再試試！", "This view shows inside a thin sample. This time we want the surface; try again!") },
    ],
  },
};
export const discoveries: Record<string, Text> = {
  scale: bi("看得到，還不一定看得清楚。用放大鏡試試吧！", "Visible does not always mean clear. Try a magnifying glass!"),
  magnifier: bi("好多了！現在比較容易分辨頭、身體、翅膀和腳。可是，翅膀上的小紋路呢？", "Better! Head, body, wings and legs are easier to distinguish. But what about tiny wing lines?"),
  stereo: bi("低倍率看整體、找位置；高倍率看細節。接下來換個問題：細胞長什麼樣？", "Low magnification finds the whole; high reveals details. Next question: what do cells look like?"),
  optical: bi("看到了！薄薄的樣品能讓光穿過，對焦後就能看清楚一格格的細胞。", "Found them! Light passes through the thin specimen; focusing reveals individual cells."),
  fluorescence: bi("不同的螢光標記，可以幫我們找到細胞裡不同的構造。", "Different fluorescent labels help locate different cell structures."),
  electron: bi("找到了兩種線索：表面的凸起，和裡面的皺摺！", "Two clues found: raised surfaces and folds inside!"),
};
export const toolRecap: Record<string, Text> = {
  scale: bi("看大小、位置與整體外觀", "See size, location and overall appearance"),
  magnifier: bi("讓原本看得到的東西更容易辨認", "Make visible objects easier to recognize"),
  stereo: bi("看小型立體樣品與較細的外部構造", "See small intact specimens and finer external structures"),
  optical: bi("看細胞與薄樣品", "See cells and thin specimens"),
  fluorescence: bi("利用不同標記找出特定細胞構造", "Locate specific cell structures with different labels"),
  electron: bi("看非常細小的表面或內部構造", "See very fine surface or internal structures"),
};
