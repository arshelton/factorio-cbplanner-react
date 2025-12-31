import { Grid, RoutePoint, RoutePosition } from "../../types/mainTypes";
import { coordToKey, keyToCoord } from "./gridUtils";

export const correspondingBusPosition = (
  regularPoint: RoutePoint,
  busPoint: RoutePoint
): RoutePosition => {
  if (busPoint.position !== RoutePosition.Bus)
    throw new Error("Input busCell is not a busCell");

  const [lastRow, lastCol] = keyToCoord(regularPoint.key);
  const [busRow, busCol] = keyToCoord(busPoint.key);

  if (lastRow === busRow) {
    return Math.floor(regularPoint.position / 3) * 3 + 1;
  } else if (lastCol === busCol) {
    return (regularPoint.position % 3) + 3;
  } else {
    throw new Error("Input points not adjacent");
  }
};

export const getAdjacentBusCells = (
  key: string,
  grid: Grid
): { left: string; right: string; top: string; bottom: string } => {
  const [row, col] = keyToCoord(key);
  const leftCell = coordToKey([row, col - 1]);
  const rightCell = coordToKey([row, col + 1]);
  const topCell = coordToKey([row - 1, col]);
  const bottomCell = coordToKey([row + 1, col]);

  return {
    left: isBusCell(leftCell, grid) ? leftCell : "",
    right: isBusCell(rightCell, grid) ? leftCell : "",
    top: isBusCell(topCell, grid) ? leftCell : "",
    bottom: isBusCell(bottomCell, grid) ? leftCell : "",
  };
};

export const isBusCell = (key: string, grid: Grid) => {
  const cell = grid.get(key);
  return cell && "routes" in cell;
};
