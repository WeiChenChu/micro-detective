import { useState } from "react";
import type { Locale } from "../data/types";
import { observationUI as o } from "../data/observationData";
import { MicroscopyImage } from "./MicroscopyImage";
export function StereoLab({ locale, onStep }: { locale: Locale; step: number; onStep: (n: number) => void }) {
  const [zoom, setZoom] = useState(1);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [seen, setSeen] = useState<number[]>([1]);
  const t = (zh: string, en: string) => locale === "zh-TW" ? zh : en;
  return <section className="stereo-lab">
    <ul className="stereo-features">{o.stereoFeatures.map(feature => <li key={feature.en}>{feature[locale]}</li>)}</ul>
    <div className="exploration-window"><div style={{ transform: `scale(${zoom})`, transformOrigin: `${x}% ${y}%` }}><MicroscopyImage id="fruit-fly" locale={locale} /></div></div>
    <div className="specimen-switch" role="group" aria-label={t("倍率", "Magnification")}>
      {[1, 1.8, 2.5].map((n, i) => <button className="button" key={n} aria-pressed={zoom === n} onClick={() => { setZoom(n); const next = [...new Set([...seen, n])]; setSeen(next); if (next.includes(2.5) && n === 1) onStep(i); }}>{[t("低倍率 · 完整果蠅", "Low · whole fly"), t("中倍率", "Medium"), t("高倍率 · 局部", "High · details")][i]}</button>)}
    </div>
    {([[t("左右移動視野", "Move view horizontally"), x, setX], [t("上下移動視野", "Move view vertically"), y, setY]] as const).map(([label, value, setter], i) => <label className="explore-slider" key={i}>{label}
      <input type="range" min="15" max="85" value={value} onChange={e => setter(Number(e.target.value))} />
    </label>)}
    <p role="status">{zoom === 1 ? o.stereoWhole[locale] : t("局部放大後，翅脈更容易看清楚，但完整果蠅跑出視野了！移動視野找眼睛或腳。", "Enlargement makes wing veins easier to distinguish, but the whole fly no longer fits! Move the view to find eyes or legs.")}</p>
    <p>{t("先切到高倍率看局部，再回低倍率找完整果蠅，完成比較。想看完整外形時，大視野很有用。", "Try high magnification for a detail, then return to low to complete the comparison. A wide field helps with the whole shape.")}</p>
    <p className="exhibit-note">{o.magnifierNote[locale]}</p>
    <p className="exhibit-note">{o.stereoDepth[locale]}</p>
  </section>;
}
