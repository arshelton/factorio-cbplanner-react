import { useGridState } from "../data-store/dataStore";
import AddButton from "./AddButton";
import BusCellBlock from "./BusCellBlock";
import RegularCellBlock from "./RegularCellBlock";
import { getAddablePositions, getBoundingBox } from "./utils/gridUtils";

const CELL_SIZE = 64; // 64 px = Tailwind's w-16/h-16

function Grid() {
  const grid = useGridState((s) => s.grid);
  const { minRow, maxRow, minCol, maxCol } = getBoundingBox(grid);
  const addable = getAddablePositions(grid);

  const numRows = maxRow - minRow + 3; // +1 to be inclusive, +2 for buffer
  const numCols = maxCol - minCol + 3;

  const renderedCells: React.ReactNode[] = [];

  for (let r = minRow - 1; r <= maxRow + 1; r++) {
    for (let c = minCol - 1; c <= maxCol + 1; c++) {
      const key = `${r},${c}`;
      const cell = grid.get(key);

      const left = c * CELL_SIZE;
      const top = r * CELL_SIZE;

      let content: React.ReactNode = null;

      if (cell) {
        if ("routes" in cell) {
          content = <BusCellBlock />;
        } else if ("sideRoutes" in cell) {
          content = <RegularCellBlock data={cell} cellKey={key} />;
        }
      } else if (addable.has(key)) {
        content = <AddButton coord={key} />;
      }

      if (content) {
        renderedCells.push(
          <div
            key={key}
            className="absolute w-16 h-16 flex items-center justify-center border border-white/10 bg-gray-800"
            style={{ left, top }}
          >
            {content}
          </div>
        );
      }
    }
  }

  const width = numCols * CELL_SIZE;
  const height = numRows * CELL_SIZE;

  return (
    <div className="flex-1 relative overflow-hidden w-screen h-screen">
      <div
        className="absolute"
        style={{
          left: `calc(50vw - ${CELL_SIZE / 2}px)`,
          top: `calc(50vh - ${CELL_SIZE / 2}px - 32px)`,
          width,
          height,
        }}
      >
        <div className="relative w-full h-full" style={{ width, height }}>
          {renderedCells}
        </div>
      </div>
    </div>
  );
}

export default Grid;
