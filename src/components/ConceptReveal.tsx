import { useState } from "react";
import type { Locale } from "../data/types";
import { MicroscopyImage } from "./MicroscopyImage";
import { FluorescenceLab } from "./FluorescenceLab";
import { MagnifierLab } from "./MagnifierLab";
import { StereoLab } from "./StereoLab";
import { RealImageExample } from "./RealImageExample";
export function ConceptReveal({ id, locale, step, onStep }: {
  id: string; locale: Locale; step: number; onStep: (n: number, complete?: boolean) => void;
}) {
  const [focus, setFocus] = useState(10);
  const [zoom, setZoom] = useState(10);
  const [seen, setSeen] = useState<number[]>([0]);
  const t = (zh: string, en: string) => locale === "zh-TW" ? zh : en;
  if (id === "magnifier") return <MagnifierLab locale={locale} onExplore={() => onStep(1)} />;
  if (id === "stereo") return <StereoLab locale={locale} step={step} onStep={onStep} />;
  if (id === "fluorescence") return <FluorescenceLab locale={locale} step={step} onStep={onStep} />;
  if (id === "scale") return <section>
    <div className={`naked-view ${step ? "fly-near" : "fly-far"}`}><MicroscopyImage id="fruit-fly-outline" locale={locale} /></div>
    <p role="status">{step ? t("靠近了！還是看不清楚小小的身體細節。", "Closer! The tiny body details are still hard to see.") : t("成體果蠅本來就可以用肉眼看見。靠近一點看看！", "An adult fruit fly is visible to our eyes. Move a little closer!")}</p>
    <button className="button" aria-pressed={step === 1} onClick={() => onStep(step ? 0 : 1, true)}>{step ? t("回到原來的位置（自由探索）", "Move back (optional)") : t("靠近看看", "Look closer")}</button>
    <p className="exhibit-note">{t("大小與距離為教學示意，並非實際尺寸。", "Size and distance are illustrative, not life-size.")}</p>
  </section>;
  if (id === "optical") return <section>
    <div className="exploration-window"><div style={{ filter: `blur(${Math.abs(focus - 65) / 9}px)`, transform: `scale(${zoom / 10})` }}><MicroscopyImage id="optical-onion" locale={locale} /></div></div>
    <p className="exhibit-note">{t("這是染色的洋蔥表皮示意圖，倍率只用來比較。把同一張圖片放大，不會增加新的細節。", "Stained onion-skin diagram. Magnifications illustrate comparison; enlarging this image adds no resolution.")}</p>
    <label className="explore-slider">{t("調整焦點", "Adjust focus")} · {focus}
      <input type="range" min="0" max="100" value={focus} onChange={e => { const n = Number(e.target.value); setFocus(n); if (Math.abs(n - 65) <= 8) onStep(1); }} />
    </label>
    <details className="observation-notes"><summary>{t("試試不同倍率（自由探索）", "Try magnifications (optional)")}</summary>
    <div className="specimen-switch" role="group" aria-label={t("倍率", "Magnification")}>
      {[10, 20, 40].map(n => <button key={n} className="button" aria-pressed={zoom === n} onClick={() => setZoom(n)}>{n}×</button>)}
    </div>
    </details>
    <p role="status">{Math.abs(focus - 65) <= 8 ? t("發現線索！對焦後，可以看清楚細胞邊界和染色的細胞核。", "Discovery! In focus, cell boundaries and stained nuclei become distinguishable.") : t("目前還是模糊的影子。慢慢調整焦點，觀察邊界的變化。", "The image is blurry. Adjust focus slowly and watch the boundaries change.")}</p>
    <RealImageExample illustrationId="optical-onion" locale={locale} />
  </section>;
  return <section>
    <div className="specimen-switch" role="group" aria-label={t("觀察需求", "Observation goal")}>
      {[t("我想看表面", "Explore surfaces"), t("我想看裡面", "Explore inside")].map((label, i) => <button key={i} className="button" aria-pressed={step === i} onClick={() => { const next = [...new Set([...seen, i])]; setSeen(next); onStep(i, next.length === 2); }}>{label}</button>)}
    </div>
    <MicroscopyImage id={step ? "electron-mitochondrion" : "electron-surface"} locale={locale} />
    <RealImageExample key={step} illustrationId={step ? "electron-mitochondrion" : "electron-surface"} locale={locale} />
    <p role="status">{step ? t("看裡面：這個橢圓構造內有一道道皺摺。這是 TEM（穿透式電子顯微鏡）的觀察示意。", "Look inside: folds lie within this oval structure. This is a TEM (transmission electron microscope) diagram.") : t("看表面：找找凸起的小面與細毛。這是 SEM（掃描式電子顯微鏡）的觀察示意。", "Look at the surface: find raised facets and hairs. This is an SEM (scanning electron microscope) diagram.")}</p>
    <p>{t("兩張是不同樣品的示意，不是同一個樣品直接切換拍攝。電子顯微鏡通常需要特殊樣品準備。", "These diagrams show different specimens, not a live switch on one sample. Electron microscopy usually requires special preparation.")}</p>

  </section>;
}
