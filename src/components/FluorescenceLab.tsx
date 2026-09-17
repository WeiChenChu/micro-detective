import { useState } from "react";
import { RealImageExample } from "./RealImageExample";
import type { Locale } from "../data/types";
export function FluorescenceLab({ locale, onStep }: { locale: Locale; step: number; onStep: (n: number) => void }) {
  const [channels, setChannels] = useState([false, false]);
  const [light, setLight] = useState(true);
  const [sawSignal, setSawSignal] = useState(false);
  const [compared, setCompared] = useState(false);
  const signal = light && channels.some(Boolean);
  const t = (zh: string, en: string) => locale === "zh-TW" ? zh : en;
  const names = [t("細胞核標記 · 圖中的圓形", "Nucleus label · circles in this diagram"), t("粒線體標記 · 短絲狀", "Mitochondrial label · short filaments")];
  const change = (next: boolean[], nextLight = light) => {
    setChannels(next); setLight(nextLight);
    if (nextLight && next.some(Boolean)) setSawSignal(true);
    if (sawSignal && !nextLight) { setCompared(true); onStep(1); }
  };
  return <section>
    <p>{t("先加上一種標記，觀察亮起的位置；再關閉照明，看看訊號怎麼變。", "Add a label and watch where it lights up; then turn illumination off and observe the change.")}</p>
    <div className="channel-view" role="img" aria-label={t("螢光示意，目前顯示：", "Fluorescence diagram, showing: ") + (names.filter((_, i) => light && channels[i]).join("、") || t("所有訊號已關閉", "all signals off"))}>
      {["nuclei", "mitochondria"].map((name, i) => light && channels[i] && <img key={name} src={`${import.meta.env.BASE_URL}images/fluorescence/channel-${name}.svg`} alt="" />)}
      {!signal && <span>{light ? t("還沒加標記，照光也找不到這個目標", "No label · light alone does not reveal this target signal") : t("照明關閉 · 標記仍在，訊號暫時看不見", "Light off · labels remain, signal is not visible")}</span>}
    </div>
    <div className="specimen-switch">
      {names.map((name, i) => <button className="button" key={name} aria-pressed={channels[i]} onClick={() => change(channels.map((v, j) => i === j ? !v : v))}>{channels[i] ? "☑" : "☐"} {name}</button>)}
      <button className="button" aria-pressed={light} onClick={() => change(channels, !light)}>{t("適合的光", "Suitable illumination")} · {light ? "ON" : "OFF"}</button>
      <button className="button" onClick={() => change([true, true])}>{t("一起顯示兩種標記", "Overlay both")}</button>
      <button className="button" onClick={() => change([false, false])}>{t("移除所有標記", "Remove all labels")}</button>
    </div>
    <p role="status">{!light ? t("沒有看到發光，不代表沒有細胞，也不代表目標一定不在。", "No signal does not mean no cells, or prove the target is absent.") : channels.every(Boolean) ? t("一起顯示兩種標記，就能比較它們的位置。想找哪種構造，要選合適的標記。", "Overlay reveals relative positions. A clear image may still lack your clue; suitable labels help find it.") : channels.some(Boolean) ? t("只有開啟的標記訊號出現；其他結構沒有消失，只是沒有顯示它的訊號。", "Only enabled signals appear; hidden structures have not disappeared.") : t("開啟一個標記，看看它讓哪些位置亮起來。", "Enable a label and observe where its signal appears.")}</p>
    <p>{compared ? t("✓ 你看過亮起和變暗的差別了！再打開光，一起顯示兩種標記看看。", "✓ You compared signal appearance and disappearance! Restore light and combine labels.") : sawSignal ? t("找到發光位置了！現在關掉光，比較有什麼不同。", "Signal found. Now turn suitable illumination off to complete the comparison.") : t("加上一種標記，再打開適合的光，找找哪裡亮起來。", "Add a label and turn suitable illumination on to find the target signal.")}</p>
    <p className="exhibit-note">{t("教學示意，非真實顯微照片。兩種標記顯示不同結構；這些顏色代表我們追蹤的螢光訊號，不一定是細胞原本的顏色。螢光顯微鏡是光學顯微鏡的一種。", "Teaching diagram, not a micrograph. Two labels reveal different structures; colors represent tracked fluorescence signals, not necessarily natural cell colors. Fluorescence microscopy is a type of light microscopy.")}</p>
    <p className="exhibit-note">{t("為了方便觀察，這裡省略了背景的光和樣品自己發出的螢光。真的做實驗時，要先準備樣品，不能像按鈕一樣立刻加上或拿掉標記。", "This diagram omits background and autofluorescence. Real labeling requires specimen preparation; the buttons do not represent instant labeling in an instrument.")}</p>
    <RealImageExample illustrationId="fluorescence-cell" locale={locale} />
  </section>;
}
