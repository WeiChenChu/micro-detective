import { ImageAttribution } from "./ImageAttribution";
import type { Locale } from "../data/types";
import { ui } from "../data/ui";
import { gameUI } from "../data/gameUI";
import { images } from "../data/images";

export function Credits({ locale }: { locale: Locale }) {
  return (
    <>
      <p className="modal-intro">{ui.creditsIntro[locale]}</p>
      <h3>{locale === "zh-TW" ? "圖片來源與授權" : "Image credits & licenses"}</h3>
      <ul className="credits-list">
        {Object.values(images).map((image) => (
          <li key={image.id}>
            <strong>{image.title[locale]}</strong>
            <ImageAttribution image={image} locale={locale} />
          </li>
        ))}
      </ul>
      <h3>{gameUI.sources[locale]}</h3>
      <ul className="science-sources">
        <li>
          <a
            href="https://www.microscopyu.com/techniques/fluorescence/introduction-to-fluorescence-microscopy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nikon MicroscopyU — Fluorescence microscopy ↗
            <span className="sr-only"> ({gameUI.externalLink[locale]})</span>
          </a>
        </li>
        <li>
          <a
            href="https://open.oregonstate.education/cellbiology/chapter/microscopy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Oregon State University — Visualizing cells ↗
            <span className="sr-only"> ({gameUI.externalLink[locale]})</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.jeol.com/products/science/sem.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            JEOL — Electron microscopy ↗
            <span className="sr-only"> ({gameUI.externalLink[locale]})</span>
          </a>
        </li>
      </ul>
    </>
  );
}
