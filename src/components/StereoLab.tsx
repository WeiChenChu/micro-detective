import { useState } from "react";
import type { Locale } from "../data/types";
import { observationUI as o } from "../data/observationData";
import { MicroscopyImage } from "./MicroscopyImage";
export function StereoLab({ locale, onStep }: { locale: Locale; step: number; onStep: (n: number) => void }) {
  const [zoom, setZoom] = useState(1);
  const [x, setX] = useState(33);
  const [y, setY] = useState(50);
  const t = (zh: string, en: string) => locale === "zh-TW" ? zh : en;
  return <section className="stereo-lab">
    <p>{t("先找到完整果蠅，再切到高倍率看看翅膀。", "Find the whole fly, then try high magnification on its wing.")}</p>
    <div className="exploration-window"><div style={{ transform: `scale(${zoom})`, transformOrigin: `${x}% ${y}%` }}><MicroscopyImage id={zoom === 1 ? "fruit-fly-outline" : "fruit-fly"} locale={locale} /></div></div>
    <div className="specimen-switch" role="group" aria-label={t("倍率", "Magnification")}>
      {[1, 1.8, 2.5].map((n, i) => <button className="button" key={n} aria-pressed={zoom === n} onClick={() => { setZoom(n); if (n === 2.5) onStep(i); }}>{[t("低倍率 · 完整果蠅", "Low · whole fly"), t("中倍率", "Medium"), t("高倍率 · 局部", "High · details")][i]}</button>)}
    </div>
    <details className="observation-notes"><summary>{t("移動視野（自由探索）", "Move the view (optional)")}</summary>
    {([[t("左右移動視野", "Move view horizontally"), x, setX], [t("上下移動視野", "Move view vertically"), y, setY]] as const).map(([label, value, setter], i) => <label className="explore-slider" key={i}>{label}
      <input type="range" min="15" max="85" value={value} onChange={e => setter(Number(e.target.value))} />
    </label>)}
    </details>
    <p role="status">{zoom === 1 ? o.stereoWhole[locale] : t("高倍率看見了翅膀的小紋路，但完整果蠅跑出視野了！也可以移動視野找細毛、眼睛或腳。", "High magnification reveals wing lines, but the whole fly no longer fits! Explore hairs, eyes or legs by moving the view.")}</p>
    <p>{t("低倍率看整體，高倍率看細節。找到新細節後，帶著發現繼續探索吧！", "Low magnification shows the whole; high shows detail. Take your new discovery to the next exploration!")}</p>
    <p className="exhibit-note">{t("不同清晰程度的教學示意，不是真實倍率。只是拉大同一張圖片，不會多出新細節。", "Teaching views illustrate different levels of detail, not calibrated magnification. Merely enlarging one image adds no detail.")}</p>
    <details className="observation-notes"><summary>{t("為什麼有立體感？", "Why a sense of depth?")}</summary><p>{o.stereoDepth[locale]}</p></details>
  </section>;
}
