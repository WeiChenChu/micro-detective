export interface LensPoint {
  x: number;
  y: number;
}
/** One centered specimen frame shared by the background, lens and hotspots.
 * Moving closer changes the viewing distance slightly; introducing the lens
 * never changes the frame. Values are teaching proportions, not real size.
 */
export function specimenFrame(step: number) {
  const scale = step === 0 ? 0.38 : 0.44;
  return { scale, x: (1 - scale) / 2, y: (1 - scale) / 2 };
}

export function specimenPoint(point: LensPoint, frame: ReturnType<typeof specimenFrame>): LensPoint {
  return { x: frame.x + point.x * frame.scale, y: frame.y + point.y * frame.scale };
}

export function specimenLensOffset(point: LensPoint, width: number, height: number, radius: number, frame: ReturnType<typeof specimenFrame>, zoom = 2.5) {
  const scene = lensImageOffset(point, width, height, radius, zoom);
  return {
    left: scene.left + frame.x * width * zoom,
    top: scene.top + frame.y * height * zoom,
    width: width * frame.scale * zoom,
    height: height * frame.scale * zoom,
  };
}
/** Coordinates are normalized to the specimen, so resizing preserves the target. */
export function constrainLens(
  point: LensPoint,
  width: number,
  height: number,
  radius: number,
): LensPoint {
  const mx = Math.min(0.5, radius / Math.max(1, width));
  const my = Math.min(0.5, radius / Math.max(1, height));
  return {
    x: Math.max(mx, Math.min(1 - mx, point.x)),
    y: Math.max(my, Math.min(1 - my, point.y)),
  };
}
export function lensImageOffset(
  point: LensPoint,
  width: number,
  height: number,
  radius: number,
  zoom = 2,
) {
  return {
    left: radius - point.x * width * zoom,
    top: radius - point.y * height * zoom,
    width: width * zoom,
    height: height * zoom,
  };
}
