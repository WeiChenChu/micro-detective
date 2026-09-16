import type { ImageData, Locale } from "../data/types";

export function ImageAttribution({ image, locale }: { image: ImageData; locale: Locale }) {
  const c = image.credit;
  return <details className="image-attribution">
    <summary>{locale === "zh-TW" ? "圖片來源 / 授權" : "Image source / license"}</summary>
    <p>{c.creator}{c.source && ` · ${c.source}`}</p>
    <p>{c.license}</p>
    {c.sourceUrl && <a href={c.sourceUrl} target="_blank" rel="noreferrer">{locale === "zh-TW" ? "原始來源（另開分頁）" : "Original source (new tab)"}</a>}
    {c.licenseUrl && <a href={c.licenseUrl} target="_blank" rel="noreferrer">{locale === "zh-TW" ? "授權說明（另開分頁）" : "License details (new tab)"}</a>}
    {c.changes && <p>{c.changes}</p>}
  </details>;
}
