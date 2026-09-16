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
  showCaption = false,
  showAttribution = true,
}: {
  id: string;
  locale: Locale;
  className?: string;
  showCaption?: boolean;
  showAttribution?: boolean;
}) {
  const image = images[id];
  const [failedSrc, setFailedSrc] = useState("");
  if (!image)
    return <div className="image-fallback">{gameUI.missingImage[locale]}</div>;
  const src = imageUrl(image);
  return (
    <div className={`microscopy-image ${className}`}>
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
            width="800"
            height="600"
            alt={image.imageAlt[locale]}
            onError={() => setFailedSrc(src)}
          />
        )}
      </div>
      {image.type === "illustration" && (
        <span className="image-disclaimer">{ui.imageNote[locale]}</span>
      )}
      {(showCaption || image.type === "real") && <p className="image-caption">{image.caption[locale]}</p>}
      {image.type === "real" && showAttribution && <ImageAttribution image={image} locale={locale} />}
    </div>
  );
}
