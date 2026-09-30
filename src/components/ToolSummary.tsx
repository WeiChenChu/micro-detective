import { observationTools } from "../data/academyData";
import { toolRecap } from "../data/academyFlow";
import type { Locale } from "../data/types";
import { ToolVisual } from "./ToolVisual";
export function ToolSummary({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  if (compact) return <div className="compact-tool-recap">
    <p>{locale === "zh-TW" ? "你已經認識六種觀察工具：" : "You have explored six observation tools:"}</p>
    <ul>{observationTools.map(tool => <li key={tool.id}>
      <ToolVisual tool={tool.id} locale={locale} variant="compact" decorative />
      <span>{tool.toolName[locale]}</span>
    </li>)}</ul>
  </div>;
  return <section className="tool-summary" aria-labelledby="tool-summary-heading">
    <h2 id="tool-summary-heading">{locale === "zh-TW" ? "你已經認識所有偵探工具了！" : "You have explored all the detective tools!"}</h2>
    <div className="ability-grid tool-recap">{observationTools.map(tool => <article key={tool.id}>
      <img src={tool.image} alt={tool.imageAlt[locale]} width="120" height="105" />
      <h3>{tool.toolName[locale]}</h3><p>{toolRecap[tool.id][locale]}</p>
      {tool.detailViews && <dl className="tool-detail-views">{tool.detailViews.map(view => <div key={view.name.en}>
        <dt>{view.name[locale]}</dt><dd>{view.description[locale]}</dd>
      </div>)}</dl>}
    </article>)}</div>
    <p className="central-message">{locale === "zh-TW" ? "不同問題，需要不同工具。這些發現都在你的偵探筆記本裡。" : "Different questions need different tools. Your notebook keeps these discoveries."}</p>
  </section>;
}
