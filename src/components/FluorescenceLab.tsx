import { useState } from "react";
import type { Locale } from "../data/types";
export function FluorescenceLab({ locale, onStep }: { locale: Locale; step: number; onStep: (n: number) => void }) {
  const [channels, setChannels] = useState([false, false]);
  const t = (zh: string, en: string) => locale === "zh-TW" ? zh : en;
  const names = [t("細胞核標記 · 圓形區域", "Nucleus label · round areas"), t("粒線體標記 · 短絲狀", "Mitochondrial label · short filaments")];
  const change = (next: boolean[]) => { setChannels(next); if (next.some(Boolean)) onStep(1); };
  return <section>
    <p>{t("在相同細胞中，開關不同標記的訊號，再疊在一起看看。", "Switch labeled signals in the same cells, then combine them.")}</p>
    <div className="channel-view" role="img" aria-label={t("螢光示意，目前顯示：", "Fluorescence diagram, showing: ") + (names.filter((_, i) => channels[i]).join("、") || t("所有訊號已關閉", "all signals off"))}>
      {["nuclei", "mitochondria"].map((name, i) => channels[i] && <img key={name} src={`${import.meta.env.BASE_URL}images/fluorescence/channel-${name}.svg`} alt="" />)}
      {!channels.some(Boolean) && <span>{t("訊號已關閉；不代表沒有細胞", "Signals off does not mean no cells")}</span>}
    </div>
    <div className="specimen-switch">
      {names.map((name, i) => <button className="button" key={name} aria-pressed={channels[i]} onClick={() => change(channels.map((v, j) => i === j ? !v : v))}>{channels[i] ? "☑" : "☐"} {name}</button>)}
      <button className="button" onClick={() => change([true, true])}>{t("疊合 Overlay", "Overlay both")}</button>
      <button className="button" onClick={() => change([false, false])}>{t("關閉所有訊號", "Hide all signals")}</button>
    </div>
    <p role="status">{channels.every(Boolean) ? t("疊合後可以比較兩種結構的位置；看得清楚，也不一定看得到你想找的線索，還需要合適的標記。", "Overlay reveals relative positions. A clear image may still lack your clue; suitable labels help find it.") : channels.some(Boolean) ? t("只有開啟的標記訊號出現；其他結構沒有消失，只是沒有顯示它的訊號。", "Only enabled signals appear; hidden structures have not disappeared.") : t("開啟一個標記，看看它讓哪些位置亮起來。", "Enable a label and observe where its signal appears.")}</p>
    <p className="exhibit-note">{t("教學示意，非真實顯微照片。兩種標記顯示不同結構；顏色代表訊號，不是天然顏色。螢光顯微鏡是光學顯微鏡的一種。", "Teaching diagram, not a micrograph. Two labels reveal different structures; colors represent signals, not natural colors. Fluorescence microscopy is a type of light microscopy.")}</p>
  </section>;
}
