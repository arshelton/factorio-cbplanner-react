import { Coord, Grid } from "../../types/mainTypes";

export function coordToKey([x, y]: Coord): string {
  return `${x},${y}`;
}

export function keyToCoord(key: string): Coord {
  return key.split(",").map(Number) as Coord;
}

export function getBoundingBox(cellMap: Grid): {
  minRow: number;
  maxRow: number;
  minCol: number;
  maxCol: number;
} {
  let minRow = Infinity,
    maxRow = -Infinity;
  let minCol = Infinity,
    maxCol = -Infinity;

  for (const key of cellMap.keys()) {
    const [r, c]: Coord = key.split(",").map(Number) as Coord;
    minRow = Math.min(minRow, r);
    maxRow = Math.max(maxRow, r);
    minCol = Math.min(minCol, c);
    maxCol = Math.max(maxCol, c);
  }

  return { minRow, maxRow, minCol, maxCol };
}

export function getAddablePositions(grid: Grid): Set<string> {
  const addable = new Set<string>();
  const directions: Coord[] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  for (const [key, cell] of grid.entries()) {
    if (!cell) continue;
    const [r, c] = keyToCoord(key);

    for (const [dr, dc] of directions) {
      const neighborCoord: Coord = [r + dr, c + dc];
      const neighborKey = coordToKey(neighborCoord);
      const neighborCell = grid.get(neighborKey);

      if (!neighborCell) {
        addable.add(neighborKey);
      }
    }
  }

  return addable;
}
