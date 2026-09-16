import { useState } from "react";
import type { Locale } from "../data/types";
import { MicroscopyImage } from "./MicroscopyImage";
import { FluorescenceLab } from "./FluorescenceLab";
import { MagnifierLab } from "./MagnifierLab";
import { StereoLab } from "./StereoLab";
export function ConceptReveal({ id, locale, step, onStep }: {
  id: string; locale: Locale; step: number; onStep: (n: number) => void;
}) {
  const [focus, setFocus] = useState(10);
  const [zoom, setZoom] = useState(10);
  const [seen, setSeen] = useState<number[]>([]);
  const t = (zh: string, en: string) => locale === "zh-TW" ? zh : en;
  if (id === "magnifier") return <MagnifierLab locale={locale} onExplore={() => onStep(1)} />;
  if (id === "stereo") return <StereoLab locale={locale} step={step} onStep={onStep} />;
  if (id === "fluorescence") return <FluorescenceLab locale={locale} step={step} onStep={onStep} />;
  if (id === "scale") return <section>
    <div className={`naked-view ${step ? "naked-near" : ""}`}><MicroscopyImage id="fruit-fly" locale={locale} /></div>
    <div className="specimen-switch">
      {[t("看看桌上的果蠅", "Find the fly"), t("靠近一點看看", "Look a little closer")].map((label, i) => <button key={i} className="button" aria-pressed={step === i} onClick={() => onStep(i)}>{label}</button>)}
    </div>
    <p role="status">{t("看得到牠！但翅膀的細線還很難分辨。下一站用放大鏡找找看。", "There it is! Fine wing lines are still hard to distinguish. Next, try a magnifying glass.")}</p>
    <p className="exhibit-note">{t("大小與距離為教學示意，並非實際尺寸。", "Size and distance are illustrative, not life-size.")}</p>
  </section>;
  if (id === "optical") return <section>
    <div className="exploration-window"><div style={{ filter: `blur(${Math.abs(focus - 65) / 9}px)`, transform: `scale(${zoom / 10})` }}><MicroscopyImage id="optical-onion" locale={locale} /></div></div>
    <p className="exhibit-note">{t("洋蔥表皮染色示意。倍率僅作比較；放大同一張圖不會增加解析度。", "Stained onion-skin diagram. Magnifications illustrate comparison; enlarging this image adds no resolution.")}</p>
    <label className="explore-slider">{t("調整焦點", "Adjust focus")} · {focus}
      <input type="range" min="0" max="100" value={focus} onChange={e => { const n = Number(e.target.value); setFocus(n); if (Math.abs(n - 65) <= 8) onStep(1); }} />
    </label>
    <div className="specimen-switch" role="group" aria-label={t("倍率", "Magnification")}>
      {[10, 20, 40].map(n => <button key={n} className="button" aria-pressed={zoom === n} onClick={() => setZoom(n)}>{n}×</button>)}
    </div>
    <p role="status">{Math.abs(focus - 65) <= 8 ? t("發現線索！對焦後，可以分辨細胞邊界和染色的細胞核。", "Discovery! In focus, cell boundaries and stained nuclei become distinguishable.") : t("目前還是模糊的影子。慢慢調整焦點，觀察邊界的變化。", "The image is blurry. Adjust focus slowly and watch the boundaries change.")}</p>
    <p>{t("試試放大：影像變大、視野變小，但不會憑空多出新的細節。", "Try enlarging: the view grows and the field narrows, but no new detail is created.")}</p>
  </section>;
  return <section>
    <div className="specimen-switch" role="group" aria-label={t("觀察需求", "Observation goal")}>
      {[t("我想看表面", "Explore surfaces"), t("我想看裡面", "Explore inside")].map((label, i) => <button key={i} className="button" aria-pressed={step === i} onClick={() => { setSeen(s => [...new Set([...s, i])]); onStep(i); }}>{label}</button>)}
    </div>
    <MicroscopyImage id={step ? "electron-mitochondrion" : "electron-surface"} locale={locale} showCaption />
    <p role="status">{step ? t("TEM 常用來觀察薄切片內部：沿著粒線體內膜找找彎曲的皺摺。", "TEM is often used for thin sections: trace the folds of the inner mitochondrial membrane.") : t("SEM 擅長呈現表面形貌：找找果蠅複眼上重複的小面與細毛。", "SEM excels at surface morphology: look for repeating facets and hairs on the fly eye.")}</p>
    <p>{t("兩張是不同樣品的示意，不是同一個樣品直接切換拍攝。電子顯微鏡通常需要特殊樣品準備。", "These diagrams show different specimens, not a live switch on one sample. Electron microscopy usually requires special preparation.")}</p>
    <p>{seen.length === 2 ? t("兩種線索都找到了！沒有一台最厲害的顯微鏡，只有適不適合你想找的線索。", "Both views explored! No microscope is best for everything; choose one that suits your clue.") : t("也可以切換另一種觀察，看看會得到什麼不同線索。", "Switch views to discover a different kind of clue.")}</p>
  </section>;
}
