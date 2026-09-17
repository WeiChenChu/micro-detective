import { toolAbilities } from "../data/academyData";
import { academyUI as a } from "../data/academyUI";
import type { Locale } from "../data/types";
import { Icon } from "./Icon";
export function ToolSummary({ locale }: { locale: Locale }) {
  return (
    <section className="tool-summary" aria-labelledby="tool-summary-heading">
      <h2 id="tool-summary-heading">{a.summary[locale]}</h2>
      <p className="journey">{a.journey[locale]}</p>
      <p className="family-note">{a.everyday[locale]}</p>
      <div className="ability-grid">
        {toolAbilities.map((tool) => (
          <article key={tool.id}>
            <Icon name={tool.icon} size={30} />
            <h3>{tool.verb[locale]}</h3>
            <strong>{tool.name[locale]}</strong>
            <p>{tool.description[locale]}</p>
          </article>
        ))}
      </div>
      <p className="family-note">{a.family[locale]}</p>
      <p className="central-message">{a.conclusion[locale]}</p>
    </section>
  );
}
