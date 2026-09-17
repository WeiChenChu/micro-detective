import { images, realImageExamples } from "../data/images";
import type { Locale } from "../data/types";
import { MicroscopyImage } from "./MicroscopyImage";

export function RealImageExample({ illustrationId, locale }: { illustrationId: string; locale: Locale }) {
  const slot = realImageExamples[illustrationId];
  if (!slot) return null;
  const real = slot.imageId && images[slot.imageId];
  return <details className="real-image-example">
    <summary>{slot.title[locale]}</summary>
    {real && real.type === "real" ? <>
      <p>{locale === "zh-TW" ? "從示意圖走進真實觀察：找找相似的線索。這是另一份樣品，不是剛才示意圖的連續放大。" : "Connect the diagram to a real observation: look for similar clues. This is a different specimen, not a continuous zoom."}</p>
      <MicroscopyImage id={real.id} locale={locale} showCaption />
    </> : <p>{locale === "zh-TW" ? "真實影像準備中。先用上方示意圖探索，之後再來看看科學家的觀察！" : "A real image is on its way. Explore the diagram above for now, then return to see a scientist’s observation!"}</p>}
  </details>;
}
