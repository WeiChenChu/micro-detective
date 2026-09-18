import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type KeyboardEvent,
} from "react";
import type { Locale } from "../data/types";
import {
  magnifierSpecimens,
  observationUI as o,
} from "../data/observationData";
import { images, imageUrl } from "../data/images";
import { ui } from "../data/ui";
import { MicroscopyImage } from "./MicroscopyImage";
import {
  constrainLens,
  lensImageOffset,
  type LensPoint,
} from "../game/lensGeometry";

export function MagnifierLab({
  locale,
  onExplore,
}: {
  locale: Locale;
  onExplore: () => void;
}) {
  const [specimenIndex, setSpecimenIndex] = useState(1);
  const [point, setPoint] = useState<LensPoint>({ x: 0.3, y: 0.7 });
  const [size, setSize] = useState({ width: 400, height: 300 });
  const board = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLButtonElement>(null);
  const specimen = magnifierSpecimens[specimenIndex];
  const radius = Math.min(72, size.width * 0.2);
  const location = constrainLens(point, size.width, size.height, radius);
  const offset = lensImageOffset(location, size.width, size.height, radius);
  const discovery = specimen.spots.find(
    (spot) => Math.hypot(spot.x - location.x, spot.y - location.y) < spot.r,
  );
  useEffect(() => {
    const element = board.current;
    if (!element) return;
    const measure = () =>
      setSize({ width: element.clientWidth, height: element.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const move = (next: LensPoint) => {
    setPoint(constrainLens(next, size.width, size.height, radius));
    const nextPoint = constrainLens(next, size.width, size.height, radius);
    if (specimen.spots.some(spot => Math.hypot(spot.x - nextPoint.x, spot.y - nextPoint.y) < spot.r)) onExplore();
  };
  const movePointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    move({
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    });
  };
  const nudge = (x: number, y: number) =>
    move({ x: location.x + x, y: location.y + y });
  const onKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const directions: Record<string, [number, number]> = {
      ArrowLeft: [-0.06, 0],
      ArrowRight: [0.06, 0],
      ArrowUp: [0, -0.06],
      ArrowDown: [0, 0.06],
    };
    if (directions[event.key]) {
      event.preventDefault();
      nudge(...directions[event.key]);
    }
  };
  return (
    <section className="magnifier-lab" aria-label={o.magnifierLabel[locale]}>
      <div
        className="specimen-switch"
        role="group"
        aria-label={o.specimens[locale]}
      >
        {magnifierSpecimens.map((item, i) => (
          <button
            key={item.id}
            className="button"
            aria-pressed={i === specimenIndex}
            onClick={() => setSpecimenIndex(i)}
          >
            {item.name[locale]}
          </button>
        ))}
      </div>
      <div
        ref={board}
        className="magnifier-board"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.preventDefault();
          event.currentTarget.setPointerCapture(event.pointerId);
          lens.current?.focus({ preventScroll: true });
          movePointer(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            movePointer(event);
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
      >
        <MicroscopyImage id={specimen.image} locale={locale} />
        <button
          ref={lens}
          type="button"
          className="virtual-lens"
          style={{
            left: `${location.x * 100}%`,
            top: `${location.y * 100}%`,
            width: radius * 2,
            height: radius * 2,
          }}
          aria-label={o.magnifierLabel[locale]}
          aria-describedby="lens-instructions"
          onKeyDown={onKey}
        >
          <img
            src={imageUrl(images[specimen.image])}
            alt=""
            aria-hidden="true"
            draggable={false}
            style={offset}
          />
          <span className="lens-crosshair" aria-hidden="true">
            +
          </span>
        </button>
      </div>
      <p className="image-disclaimer">{ui.imageNote[locale]}</p>
      <p id="lens-instructions" className="exhibit-note">
        {o.keyboard[locale]}
      </p>
      <div
        className="lens-controls"
        role="group"
        aria-label={o.magnifierLabel[locale]}
      >
        {(
          [
            ["left", "←", -0.06, 0],
            ["up", "↑", 0, -0.06],
            ["down", "↓", 0, 0.06],
            ["right", "→", 0.06, 0],
          ] as const
        ).map(([label, arrow, x, y]) => (
          <button
            key={label}
            className="button"
            onClick={() => nudge(x, y)}
            aria-label={o[label][locale]}
          >
            {arrow}
            <span>{o[label][locale]}</span>
          </button>
        ))}
      </div>
      <p className="lens-discovery" role="status" aria-live="polite">
        🔎 {(discovery?.label ?? o.discover)[locale]}
      </p>
      <p className="exhibit-note">{o.magnifierNote[locale]}</p>
    </section>
  );
}
