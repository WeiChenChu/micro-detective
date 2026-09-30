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
import { ObservationView } from "./ObservationView";
import {
  constrainLens,
  specimenFrame,
  specimenPoint,
  specimenLensOffset,
  type LensPoint,
} from "../game/lensGeometry";

export function MagnifierLab({
  locale,
  step,
  onStep,
}: {
  locale: Locale;
  step: number;
  onStep: (step: number, complete?: boolean) => void;
}) {
  const t = (zh: string, en: string) => locale === "zh-TW" ? zh : en;
  const usingLens = step >= 2;
  const frame = specimenFrame(step);
  const [point, setPoint] = useState<LensPoint>({ x: 0.3, y: 0.7 });
  const [size, setSize] = useState({ width: 400, height: 300 });
  const board = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLButtonElement>(null);
  const [specimenIndex, setSpecimenIndex] = useState(1);
  const specimen = magnifierSpecimens[specimenIndex];
  const radius = Math.min(72, size.width * 0.2);
  const location = constrainLens(point, size.width, size.height, radius);
  const offset = specimenLensOffset(location, size.width, size.height, radius, frame);
  const spots = specimen.spots.map(spot => ({ ...spot, ...specimenPoint(spot, frame), r: spot.r * frame.scale }));
  const discovery = usingLens && spots.find(
    (spot) => Math.hypot(spot.x - location.x, spot.y - location.y) < spot.r,
  );
  const exploreHint = specimen.id === "leaf"
    ? t("把鏡片移到葉脈或葉緣，看看哪裡變清楚了。", "Move the lens to the leaf veins or edges. What becomes clearer?")
    : t("把鏡片移到果蠅的頭、翅膀、身體或腳，看看哪裡變清楚了。", "Move the lens to the fly’s head, wings, body or legs. What becomes clearer?");
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
  useEffect(() => {
    if (usingLens) lens.current?.focus({ preventScroll: true });
  }, [usingLens]);
  const move = (next: LensPoint) => {
    setPoint(constrainLens(next, size.width, size.height, radius));
    const nextPoint = constrainLens(next, size.width, size.height, radius);
    if (usingLens && spots.some(spot => Math.hypot(spot.x - nextPoint.x, spot.y - nextPoint.y) < spot.r)) onStep(3, true);
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
    <section className="magnifier-lab" aria-label={t("果蠅觀察", "Fruit fly observation")}>
      <ObservationView tool={usingLens ? "magnifier" : "scale"} locale={locale}>
      <div
        ref={board}
        className={`magnifier-board ${usingLens ? "with-lens" : "without-lens"}`}
        onPointerDown={(event) => {
          if (!usingLens || event.button !== 0) return;
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
        <img className="observation-specimen" src={imageUrl(images[specimen.image])}
          alt={images[specimen.image].imageAlt[locale]} draggable={false}
          style={{ left: `${frame.x * 100}%`, top: `${frame.y * 100}%`, width: `${frame.scale * 100}%`, height: `${frame.scale * 100}%` }} />
        {usingLens && <button
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
        </button>}
      </div>
      </ObservationView>
      <p className="image-disclaimer">{ui.imageNote[locale]}</p>
      {!usingLens && <>
        <p role="status">{step === 0
          ? t("我看得到果蠅！可是頭、翅膀和腳還小小的。靠近看看？", "I can see the fly! But its head, wings and legs look tiny. Shall we look closer?")
          : t("靠近只幫了一點點。看得到，不一定看得清楚。試試讓放大鏡幫忙！", "Getting closer helps only a little. Being able to see something does not mean we can see it clearly. Try a magnifying glass!")}</p>
        <button className="button primary" onClick={() => onStep(step + 1, false)}>
          {step === 0 ? t("靠近看看", "Look closer") : t("拿起放大鏡", "Pick up the magnifying glass")}
        </button>
      </>}
      {usingLens && <>
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
        🔎 {discovery ? discovery.label[locale] : exploreHint}
      </p>
      {step === 3 && <details className="observation-notes">
        <summary>{t("也試試葉片（自由探索）", "Try a leaf too (optional)")}</summary>
        <div className="specimen-switch" role="group" aria-label={o.specimens[locale]}>
          {magnifierSpecimens.map((item, index) => <button className="button" key={item.id}
            aria-pressed={specimenIndex === index} onClick={() => setSpecimenIndex(index)}>{item.name[locale]}</button>)}
        </div>
      </details>}
      </>}
      <p className="exhibit-note">{usingLens
        ? t("樣品留在原位，只有鏡片內放大約 2.5 倍。這是教學示意；放大圖片不會增加解析度。", "The specimen stays in place; only the lens view enlarges it about 2.5×. This teaching simulation adds no new resolution.")
        : t("大小與距離為教學示意，並非實際尺寸。", "Size and distance are illustrative, not life-size.")}</p>
    </section>
  );
}
