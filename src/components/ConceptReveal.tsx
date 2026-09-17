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
    <div className={`naked-view naked-distance-${step}`}><MicroscopyImage id={step === 0 ? "zebrafish" : "fruit-fly"} locale={locale} /></div>
    <div className="specimen-switch">
      {[t("成魚 · 看游動方向", "Adult fish · swimming direction"), t("果蠅 · 找大致輪廓", "Fly · find its outline"), t("靠近果蠅 · 找翅膀細線", "Closer fly · look for wing lines")].map((label, i) => <button key={i} className="button" aria-pressed={step === i} onClick={() => { const next = [...new Set([...seen, i])]; setSeen(next); onStep(i, next.length === 3); }}>{label}</button>)}
    </div>
    <p role="status">{step === 0 ? t("成魚的輪廓肉眼可見，看牠往哪裡游就夠了。再看看更小的果蠅。", "An adult fish is visible: our eyes can follow its direction. Now try a smaller fly.") : step === 1 ? t("果蠅也看得到！但這次想知道翅膀上的線長什麼樣，靠近一點試試。", "The fly is visible too! But what do its wing lines look like? Try moving closer.") : t("翅膀的細線還很難分辨。問題從「在哪裡」變成「細節是什麼」，下一站用放大鏡找找看。", "Fine wing lines remain hard to distinguish. The question changed from where to what detail: next, try a hand lens.")}</p>
    <p>{t("比較三個觀察位置後，把發現收進筆記。細胞比果蠅還小，後面的課程會用另一種工具找它。", "Compare all three views to collect your discovery. Cells are smaller still; a later lesson explores them with another tool.")}</p>
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
    <RealImageExample illustrationId="optical-onion" locale={locale} />
  </section>;
  return <section>
    <div className="specimen-switch" role="group" aria-label={t("觀察需求", "Observation goal")}>
      {[t("我想看表面", "Explore surfaces"), t("我想看裡面", "Explore inside")].map((label, i) => <button key={i} className="button" aria-pressed={step === i} onClick={() => { const next = [...new Set([...seen, i])]; setSeen(next); onStep(i, next.length === 2); }}>{label}</button>)}
    </div>
    <MicroscopyImage id={step ? "electron-mitochondrion" : "electron-surface"} locale={locale} showCaption />
    <RealImageExample key={step} illustrationId={step ? "electron-mitochondrion" : "electron-surface"} locale={locale} />
    <p role="status">{step ? t("TEM（穿透式電子顯微鏡） 常用來觀察薄切片內部：沿著粒線體內膜找找彎曲的皺摺。", "TEM（穿透式電子顯微鏡） is often used for thin sections: trace the folds of the inner mitochondrial membrane.") : t("SEM（掃描式電子顯微鏡） 擅長呈現表面形貌：找找果蠅複眼上重複的小面與細毛。", "SEM（掃描式電子顯微鏡） excels at surface morphology: look for repeating facets and hairs on the fly eye.")}</p>
    <p>{t("兩張是不同樣品的示意，不是同一個樣品直接切換拍攝。電子顯微鏡通常需要特殊樣品準備。", "These diagrams show different specimens, not a live switch on one sample. Electron microscopy usually requires special preparation.")}</p>
    <p>{seen.length === 2 ? t("兩種線索都找到了！沒有一台最厲害的顯微鏡，只有適不適合你想找的線索。", "Both views explored! No microscope is best for everything; choose one that suits your clue.") : t("也可以切換另一種觀察，看看會得到什麼不同線索。", "Switch views to discover a different kind of clue.")}</p>
  </section>;
}
