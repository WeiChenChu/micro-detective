import { bi } from "./types";
export const fluorescenceSignals = [
  { id: "nuclei", name: bi("細胞核", "Nuclei"), shape: bi("較大的橢圓", "Large ovals"), color: "#67e8f9" },
  { id: "boundary", name: bi("細胞邊界", "Cell boundaries"), shape: bi("外圍的線", "Outlines"), color: "#f472b6" },
  { id: "mitochondria", name: bi("粒線體", "Mitochondria"), shape: bi("細胞內的小短條", "Small rods inside cells"), color: "#fde047" },
];
// Each guided view contributes new spatial evidence; no off/on permutations required.
export const fluorescenceViews = [
  [], ["nuclei"], ["boundary"], ["mitochondria"], ["nuclei", "boundary", "mitochondria"],
];
export const fluorescenceComplete = (view: number) => view === fluorescenceViews.length - 1;
