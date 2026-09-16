export interface LensPoint {
  x: number;
  y: number;
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
