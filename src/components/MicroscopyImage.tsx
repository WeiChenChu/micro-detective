import { useState } from "react";
import { imageUrl, images } from "../data/images";
import { ui } from "../data/ui";
import { gameUI } from "../data/gameUI";
import type { Locale } from "../data/types";

export function MicroscopyImage({
  id,
  locale,
  className = "",
  showCaption = false,
}: {
  id: string;
  locale: Locale;
  className?: string;
  showCaption?: boolean;
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
      {image.placeholder && (
        <span className="image-disclaimer">{ui.imageNote[locale]}</span>
      )}
      {showCaption && <p className="image-caption">{image.caption[locale]}</p>}
    </div>
  );
}
