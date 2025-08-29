import { CELL_SIZE } from "../../config/config";
import { keyToCoord } from "../../main-layout/utils/gridUtils";
import { RoutePosition, RoutePoint } from "../../types/mainTypes";

export const routePointToPixel = (point: RoutePoint): [number, number] => {
  const [row, col] = keyToCoord(point.key);
  const [ox, oy] = routePositionOffset(point.position);
  return [col * CELL_SIZE + ox, row * CELL_SIZE + oy];
};

export const routePositionOffset = (pos: RoutePosition): [number, number] => {
  const f = CELL_SIZE;
  const h = CELL_SIZE / 2;
  const hhh = CELL_SIZE / 8;
  switch (pos) {
    case RoutePosition.TopLeft:
      return [hhh, hhh];
    case RoutePosition.Top:
      return [h, hhh];
    case RoutePosition.TopRight:
      return [f - hhh - 1, hhh];
    case RoutePosition.Left:
      return [hhh, h];
    case RoutePosition.Center:
      return [h, h];
    case RoutePosition.Right:
      return [f - hhh - 1, h];
    case RoutePosition.BottomLeft:
      return [hhh, f - hhh];
    case RoutePosition.Bottom:
      return [h, f - hhh];
    case RoutePosition.BottomRight:
      return [f - hhh - 1, f - hhh];
    case RoutePosition.Bus:
      console.warn("RoutePosition.Bus not implemented");
      return [h, h]; //TODO: DYNAMIC BUS ROUTING
  }
};
