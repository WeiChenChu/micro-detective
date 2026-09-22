import { useState } from "react";
import { imageUrl, images } from "../data/images";
import { ui } from "../data/ui";
import { gameUI } from "../data/gameUI";
import type { Locale } from "../data/types";
import { ImageAttribution } from "./ImageAttribution";

export function MicroscopyImage({
  id,
  locale,
  className = "",
  showCaption,
  showObservation = false,
  differentSpecimen = false,
  showAttribution = true,
  compactAttribution = false,
}: {
  id: string;
  locale: Locale;
  className?: string;
  showCaption?: boolean;
  showObservation?: boolean;
  differentSpecimen?: boolean;
  showAttribution?: boolean;
  compactAttribution?: boolean;
}) {
  const image = images[id];
  const [failedSrc, setFailedSrc] = useState("");
  if (!image)
    return <div className="image-fallback">{gameUI.missingImage[locale]}</div>;
  const src = imageUrl(image);
  return (
    <div className={`microscopy-image ${image.type === "real" ? "real-micrograph" : ""} ${className}`}>
      <div className="image-frame">
        {failedSrc === src ? (
          <div className="image-fallback">
            <span aria-hidden="true">🔎</span>
            <p>{gameUI.missingImage[locale]}</p>
            <p>{image.imageAlt[locale]}</p>
          </div>
        ) : (
          <img
            src={src}
            width={image.width ?? 800}
            height={image.height ?? 600}
            alt={image.imageAlt[locale]}
            onError={() => setFailedSrc(src)}
          />
        )}
      </div>
      {image.type === "real" && <span className="image-disclaimer">{differentSpecimen
        ? (locale === "zh-TW" ? "🔬 真實顯微影像・不同樣品" : "🔬 Real microscopy image · different specimen")
        : (locale === "zh-TW" ? "真實顯微影像" : "Real microscopy image")}</span>}
      {image.type === "illustration" && (
        <span className="image-disclaimer">{ui.imageNote[locale]}</span>
      )}
      {showObservation && image.observationClue && <div className="observation-clue detective-observation">
        <strong>{locale === "zh-TW" ? "🔎 偵探觀察" : "🔎 Detective Observation"}</strong>
        <p>{image.observationClue[locale]}</p>
      </div>}
      {(showCaption ?? image.type === "real") && <p className="image-caption">{image.caption[locale]}</p>}
      {image.type === "real" && showAttribution && <ImageAttribution image={image} locale={locale} compact={compactAttribution} />}
    </div>
  );
}
