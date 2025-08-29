import { useGridState } from "../data-store/dataStore";
import { getBoundingBox } from "../main-layout/utils/gridUtils";
import { CELL_SIZE } from "../config/config";

export function useGridLayout() {
  const grid = useGridState((s) => s.grid);
  const { minRow, maxRow, minCol, maxCol } = getBoundingBox(grid);

  const width = (maxCol - minCol + 1) * CELL_SIZE;
  const height = (maxRow - minRow + 1) * CELL_SIZE;

  const offsetX = minCol * CELL_SIZE - 0.5 * CELL_SIZE;
  const offsetY = minRow * CELL_SIZE - 0.5 * CELL_SIZE;

  const cellOffsetX = width - CELL_SIZE - maxCol * CELL_SIZE;
  const cellOffsetY = height - CELL_SIZE - maxRow * CELL_SIZE;

  return { width, height, offsetX, offsetY, cellOffsetX, cellOffsetY };
}
