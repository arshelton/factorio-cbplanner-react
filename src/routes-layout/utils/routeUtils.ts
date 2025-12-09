import { CELL_SIZE } from "../../config/config";
import { keyToCoord } from "../../main-layout/utils/gridUtils";
import { RoutePosition, RoutePoint } from "../../types/mainTypes";
import iconColors from "../icon-colors.json";

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

export const getIconColor = (icon: string): string => {
  if (icon in iconColors) {
    return iconColors[icon as keyof typeof iconColors];
  }
  return "white";
};

export const areRoutePointsAdjacent = (
  point1: RoutePoint,
  point2: RoutePoint
): boolean => {
  const { key: key1, position: pos1 } = point1;
  const { key: key2, position: pos2 } = point2;

  if (key1 === key2) {
    //Same-key case
    return (
      (Math.abs(pos1 - pos2) === 1 &&
        Math.floor(pos1 / 3) === Math.floor(pos2 / 3)) ||
      Math.abs(pos1 - pos2) === 3
    );
  } else {
    //Different-key case
    const [row1, col1] = keyToCoord(key1);
    const [row2, col2] = keyToCoord(key2);
    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);

    const subrow1 = Math.floor(pos1 / 3);
    const subrow2 = Math.floor(pos2 / 3);
    const subcol1 = pos1 % 3;
    const subcol2 = pos2 % 3;

    if (colDiff === 1 && rowDiff === 0) {
      //Horizontally-adjacent-key case
      if (subrow1 !== subrow2) return false;
      if (col1 < col2) return subcol1 === 2 && subcol2 === 0;
      else return subcol1 === 0 && subcol2 === 2;
    } else if (rowDiff === 1 && colDiff === 0) {
      //Vertically-adjacent-key case
      if (subcol1 !== subcol2) return false;
      if (row1 < row2) return subrow1 === 2 && subrow2 === 0;
      else return subrow1 === 0 && subrow2 === 2;
    } else {
      return false;
    }
  }
};
