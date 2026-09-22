import { images, realImageExamples } from "../data/images";
import type { Locale } from "../data/types";
import { MicroscopyImage } from "./MicroscopyImage";
import { ImageAttribution } from "./ImageAttribution";

export function RealImageExample({ illustrationId, locale }: { illustrationId: string; locale: Locale }) {
  const slot = realImageExamples[illustrationId];
  if (!slot) return null;
  const real = slot.imageId && images[slot.imageId];
  return <section className="real-image-example" aria-label={real ? real.title[locale] : slot.title[locale]}>
    <h3>{real ? real.title[locale] : slot.title[locale]}</h3>
    {real && real.type === "real" ? <>
      {illustrationId === "optical-onion" && <p className="real-image-intro">{locale === "zh-TW" ? "前面的圖是幫助理解的示意圖；下面是顯微鏡拍到的另一份樣品，不是把示意圖繼續放大。形狀、顏色和位置不會完全一樣。" : "The diagram helps explain the idea. Below is a microscope image of a different specimen, not a further zoom into the diagram. Shapes, colors and positions will differ."}</p>}
      <MicroscopyImage id={real.id} locale={locale} showCaption showObservation differentSpecimen showAttribution={false} />
      <a className="real-image-continue" href="#academy-continue">{locale === "zh-TW" ? "觀察完了？往下繼續探索 ↓" : "Finished looking? Continue exploring below ↓"}</a>
      <ImageAttribution image={real} locale={locale} compact />
    </> : <p>{locale === "zh-TW" ? "真實影像準備中。先用上方示意圖探索，之後再來看看科學家的觀察！" : "A real image is on its way. Explore the diagram above for now, then return to see a scientist’s observation!"}</p>}
  </section>;
}
