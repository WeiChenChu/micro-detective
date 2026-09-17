import { bi, type Text } from "./types";

export interface ToolCardVisual {
  image: string;
  imageAlt: Text;
  toolName: Text;
  shortDescription: Text;
}

// Original project assets; literal URLs let Vite fingerprint and bundle each SVG.
export const toolIllustrations = {
  scale: {
    image: new URL("../assets/tools/naked-eye.svg", import.meta.url).href,
    imageAlt: bi("肉眼示意圖", "Illustration of an eye"),
    toolName: bi("肉眼", "Naked eye"),
    shortDescription: bi("先看整體、找位置。", "See the whole specimen and find its position."),
  },
  magnifier: {
    image: new URL("../assets/tools/magnifying-glass.svg", import.meta.url).href,
    imageAlt: bi("放大鏡示意圖", "Illustration of a magnifying glass"),
    toolName: bi("放大鏡", "Magnifying glass"),
    shortDescription: bi("看清楚肉眼已經看得到的小細節。", "See small details on things already visible to your eyes."),
  },
  stereo: {
    image: new URL("../assets/tools/stereo-microscope.svg", import.meta.url).href,
    imageAlt: bi("解剖顯微鏡示意圖", "Illustration of a stereomicroscope"),
    toolName: bi("解剖顯微鏡", "Stereomicroscope"),
    shortDescription: bi("觀察較大的樣品與表面構造。", "Observe larger specimens and surface structures."),
  },
  optical: {
    image: new URL("../assets/tools/compound-microscope.svg", import.meta.url).href,
    imageAlt: bi("複式光學顯微鏡示意圖", "Illustration of a compound light microscope"),
    toolName: bi("複式光學顯微鏡", "Compound light microscope"),
    shortDescription: bi("觀察薄樣品、細胞與組織。", "Observe thin specimens, cells and tissues."),
  },
  fluorescence: {
    image: new URL("../assets/tools/fluorescence-microscope.svg", import.meta.url).href,
    imageAlt: bi("螢光顯微鏡示意圖", "Illustration of a fluorescence microscope"),
    toolName: bi("螢光顯微鏡", "Fluorescence microscope"),
    shortDescription: bi("利用螢光標記找到特定的細胞或構造。", "Use fluorescent labels to find specific cells or structures."),
  },
  electron: {
    image: new URL("../assets/tools/electron-microscope.svg", import.meta.url).href,
    imageAlt: bi("電子顯微鏡示意圖", "Illustration of an electron microscope"),
    toolName: bi("電子顯微鏡", "Electron microscope"),
    shortDescription: bi("觀察光學顯微鏡看不清楚的更細微構造。", "Observe finer structures that light microscopes cannot resolve."),
  },
} satisfies Record<string, ToolCardVisual>;
