import type { Locale } from "../data/types";
import { ui } from "../data/ui";
import { gameUI } from "../data/gameUI";
import { images } from "../data/images";

export function Credits({ locale }: { locale: Locale }) {
  return (
    <>
      <p className="modal-intro">{ui.creditsIntro[locale]}</p>
      <ul className="credits-list">
        {Object.values(images).map((image) => (
          <li key={image.id}>
            <strong>{image.title[locale]}</strong>
            <span>
              {image.credit.creator} · {image.credit.license}
            </span>
            {image.credit.sourceUrl && (
              <a href={image.credit.sourceUrl} target="_blank" rel="noreferrer">
                {image.credit.sourceUrl}
              </a>
            )}
            {image.credit.licenseUrl && (
              <a
                href={image.credit.licenseUrl}
                target="_blank"
                rel="noreferrer"
              >
                {image.credit.license}
              </a>
            )}
            {image.credit.changes && <p>{image.credit.changes}</p>}
          </li>
        ))}
      </ul>
      <h3>{gameUI.sources[locale]}</h3>
      <ul className="science-sources">
        <li>
          <a
            href="https://www.microscopyu.com/techniques/fluorescence/introduction-to-fluorescence-microscopy"
            target="_blank"
            rel="noreferrer"
          >
            Nikon MicroscopyU — Fluorescence microscopy ↗
            <span className="sr-only"> ({gameUI.externalLink[locale]})</span>
          </a>
        </li>
        <li>
          <a
            href="https://open.oregonstate.education/cellbiology/chapter/microscopy/"
            target="_blank"
            rel="noreferrer"
          >
            Oregon State University — Visualizing cells ↗
            <span className="sr-only"> ({gameUI.externalLink[locale]})</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.jeol.com/products/science/sem.php"
            target="_blank"
            rel="noreferrer"
          >
            JEOL — Electron microscopy ↗
            <span className="sr-only"> ({gameUI.externalLink[locale]})</span>
          </a>
        </li>
      </ul>
    </>
  );
}
