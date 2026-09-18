import { useState } from "react";
import { fluorescenceSignals, fluorescenceViews, fluorescenceComplete } from "../data/fluorescenceData";
import type { Locale } from "../data/types";
export function FluorescenceLab({ locale, step, onStep }: { locale: Locale; step: number; onStep: (n: number, complete?: boolean) => void }) {
  const [exploring, setExploring] = useState<string[] | null>(null);
  const active = exploring ?? fluorescenceViews[step];
  const t = (zh: string, en: string) => locale === "zh-TW" ? zh : en;
  const messages = [
    t("先看看一般影像。試著讓細胞核亮起來！", "First look at the ordinary image. Try lighting up the nuclei!"),
    t("找到了！亮起來的地方是細胞核。可是，一個細胞的邊界在哪裡？", "Found them! The bright ovals are nuclei. But where does each cell end?"),
    t("看到了！亮起來的線把一個個細胞圈出來了。細胞裡還有其他小構造嗎？", "The bright lines outline each cell! Are there other small structures inside?"),
    t("有喔！這些小短條是粒線體，也是細胞裡的小構造。把三種訊號放在一起看看！", "Yes! The small rods are mitochondria, structures inside cells. Combine all three signals!"),
    t("把不同的螢光訊號放在一起，就能同時看到細胞裡不同的構造！", "Combine different fluorescent signals to see different structures together!"),
  ];
  return <section>
    <div className="channel-view" role="img" aria-label={step === 0 ? t("一般細胞示意影像", "Ordinary cell diagram") : t("螢光示意，目前顯示：", "Fluorescence diagram showing: ") + (fluorescenceSignals.filter(s => active.includes(s.id)).map(s => `${s.name[locale]}（${s.shape[locale]}）`).join("、") || t("沒有開啟訊號", "no signals enabled"))}>
      {step === 0 && <img src={`${import.meta.env.BASE_URL}images/fluorescence/academy-cells.svg`} alt="" />}
      {fluorescenceSignals.map(s => active.includes(s.id) && <img key={s.id} src={`${import.meta.env.BASE_URL}images/fluorescence/channel-${s.id}.svg`} alt="" />)}
    </div>
    <p className="fluorescence-message" role="status">{messages[step]}</p>
    {step < 4 ? <button className="button primary" onClick={() => { const next = step + 1; onStep(next, fluorescenceComplete(next)); }}>
      {step === 3 ? t("合併三種訊號", "Combine three signals") : `${t("開啟", "Show")}：${fluorescenceSignals[step].name[locale]}`}
    </button> : <>
      <ul className="signal-legend">{fluorescenceSignals.map(s => <li key={s.id}><span style={{ background: s.color }} aria-hidden="true" />{s.name[locale]} · {s.shape[locale]}</li>)}</ul>
      <details className="observation-notes"><summary>{t("自由探索：比較其他組合", "Explore other combinations (optional)")}</summary>
        <div className="specimen-switch">{fluorescenceSignals.map(s => <button className="button" key={s.id} aria-pressed={active.includes(s.id)} onClick={() => setExploring(active.includes(s.id) ? active.filter(id => id !== s.id) : [...active, s.id])}>{s.name[locale]}</button>)}</div>
      </details>
    </>}
    <p className="exhibit-note">{t("螢光的顏色是我們用標記顯示出來的，不一定是它原本的顏色喔！", "The colors come from fluorescent labels; they are not necessarily the structures’ natural colors!")}</p>
    <details className="observation-notes"><summary>{t("關於這張示意圖", "About this diagram")}</summary><p>{t("這是同一組細胞的教學示意。外框表示細胞的大致邊界；粒線體在細胞裡、細胞核外。真實實驗需要準備標記與合適照明，這裡的按鈕只是切換顯示的訊號。", "Aligned teaching diagrams of the same cells. Outlines show approximate cell boundaries; mitochondria are inside cells, outside nuclei. Real experiments require labeling and suitable illumination; these buttons only change displayed signals.")}</p></details>
  </section>;
}
