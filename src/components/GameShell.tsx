import type { ReactNode } from "react";
import type { Locale } from "../data/types";
import { ui } from "../data/ui";
import { Icon } from "./Icon";
import { version } from "../../package.json";

export function GameShell({
  locale,
  onLocale,
  onNotebook,
  onRestart,
  onCredits,
  onHome,
  playing,
  children,
  count,
}: {
  locale: Locale;
  onLocale: (l: Locale) => void;
  onNotebook: () => void;
  onRestart: () => void;
  onCredits: () => void;
  onHome: () => void;
  playing: boolean;
  children: ReactNode;
  count: number;
}) {
  return (
    <div className={`app ${playing ? "in-game" : ""}`}>
      <a className="skip-link" href="#main">
        {ui.skip[locale]}
      </a>
      <header className="site-header">
        <button
          className="brand brand-button"
          onClick={onHome}
          aria-label={ui.name[locale]}
        >
          <span className="brand-mark">
            <Icon name="search" size={27} />
          </span>
          <span>
            <strong>{ui.name[locale]}</strong>
            <small>{ui.brand[locale]}</small>
          </span>
        </button>
        <div className="header-tools">
          {playing && (
            <>
              <button className="notebook-trigger" onClick={onNotebook}>
                <Icon name="book" size={20} />
                <span className="desktop-label">{ui.notebook[locale]}</span>
                <span className="count-pill">{count}</span>
                <span className="sr-only mobile-label">
                  {ui.notebook[locale]}
                </span>
              </button>
              <button
                className="icon-button restart-trigger"
                aria-label={ui.restart[locale]}
                title={ui.restart[locale]}
                onClick={onRestart}
              >
                <Icon name="reset" size={20} />
              </button>
            </>
          )}
          <div className="language-switch" aria-label="中文 / English">
            <button
              lang="zh-TW"
              aria-pressed={locale === "zh-TW"}
              className={locale === "zh-TW" ? "active" : ""}
              onClick={() => onLocale("zh-TW")}
            >
              中文
            </button>
            <button
              lang="en"
              aria-label="English"
              aria-pressed={locale === "en"}
              className={locale === "en" ? "active" : ""}
              onClick={() => onLocale("en")}
            >
              EN
            </button>
          </div>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <span>
          <Icon name="lock" size={15} />
          {ui.privacy[locale]}
        </span>
        <button className="footer-link" onClick={onCredits}>
          {ui.sources[locale]} ↗
        </button>
        <span lang="en">MICROSCOPIC DETECTIVE · v{version}</span>
      </footer>
    </div>
  );
}
