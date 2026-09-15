import { useEffect, useId, useRef, type ReactNode } from "react";
import type { Locale } from "../data/types";
import { ui } from "../data/ui";
import { Icon } from "./Icon";

export function Modal({
  title,
  locale,
  onClose,
  children,
  className = "",
}: {
  title: string;
  locale: Locale;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const el = dialog.current;
    el?.showModal();
    return () => {
      el?.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      className={`modal ${className}`}
      ref={dialog}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <header className="modal-header">
          <h2 id={titleId}>{title}</h2>
          <button
            className="icon-button"
            aria-label={ui.close[locale]}
            onClick={onClose}
          >
            <Icon name="close" />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
}
