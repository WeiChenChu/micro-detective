import type { ImageData, Locale } from "../data/types";

export function ImageAttribution({ image, locale, compact = false }: { image: ImageData; locale: Locale; compact?: boolean }) {
  const c = image.credit;
  const external = { target: "_blank", rel: "noopener noreferrer" };
  const creditLine = <p className="image-credit-line">
      {locale === "zh-TW" ? "圖片來源：" : "Image source: "}
      {c.creatorUrl ? <a href={c.creatorUrl} {...external}>{c.creator}</a> : c.creator}
      {" · "}{c.licenseUrl ? <a href={c.licenseUrl} {...external}>{c.license}</a> : c.license}
      {!compact && c.sourceUrl && <> · <a href={c.sourceUrl} {...external}>{c.source ?? (locale === "zh-TW" ? "原始來源" : "Original source")}</a></>}
    </p>;
  return <div className="image-attribution">
    {creditLine}
    {(compact || c.originalTitle || c.details || c.changes) && <details>
      <summary>{locale === "zh-TW" ? "圖片來源與授權詳情" : "Image source & license details"}</summary>
      {c.originalTitle && <p>{c.originalTitle}</p>}
      {compact && c.sourceUrl && <p><a href={c.sourceUrl} {...external}>{c.source ?? (locale === "zh-TW" ? "原始來源" : "Original source")}</a></p>}
      {c.details && <p>{c.details[locale]}</p>}
      {c.changes && <p>{typeof c.changes === "string" ? c.changes : c.changes[locale]}</p>}
    </details>}
  </div>;
}
