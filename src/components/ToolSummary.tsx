import { academyModules } from "../data/academyData";
import { toolRecap } from "../data/academyFlow";
import type { Locale } from "../data/types";
export function ToolSummary({ locale }: { locale: Locale }) {
  return <section className="tool-summary" aria-labelledby="tool-summary-heading">
    <h2 id="tool-summary-heading">{locale === "zh-TW" ? "你已經認識所有偵探工具了！" : "You have explored all the detective tools!"}</h2>
    <div className="ability-grid tool-recap">{academyModules.map(tool => <article key={tool.id}>
      <img src={tool.image} alt={tool.imageAlt[locale]} width="120" height="105" />
      <h3>{tool.toolName[locale]}</h3><p>{toolRecap[tool.id][locale]}</p>
      {tool.detailViews && <dl className="tool-detail-views">{tool.detailViews.map(view => <div key={view.name.en}>
        <dt>{view.name[locale]}</dt><dd>{view.description[locale]}</dd>
      </div>)}</dl>}
    </article>)}</div>
    <p className="central-message">{locale === "zh-TW" ? "不同問題，需要不同工具。這些發現都在你的偵探筆記本裡。" : "Different questions need different tools. Your notebook keeps these discoveries."}</p>
  </section>;
}
