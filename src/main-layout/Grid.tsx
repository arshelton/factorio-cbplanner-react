import { useGridState } from "../data-store/dataStore";
import AddButton from "./AddButton";
import BusCellBlock from "./BusCellBlock";
import RegularCellBlock from "./RegularCellBlock";
import { getAddablePositions } from "./utils/gridUtils";

import { CELL_SIZE } from "../config/config";
import { useGridLayout } from "../hooks/useGridLayout";

function Grid() {
  const grid = useGridState((s) => s.grid);
  const addable = getAddablePositions(grid);

  const { width, height, offsetX, offsetY, cellOffsetX, cellOffsetY } =
    useGridLayout();

  const renderedCells: React.ReactNode[] = [];

  for (const [key, cell] of grid.entries()) {
    const [row, col] = key.split(",").map(Number);

    let content: React.ReactNode = null;

    if (cell == null) return;

    if ("routes" in cell) {
      content = <BusCellBlock />;
    } else if ("icons" in cell) {
      content = <RegularCellBlock data={cell} cellKey={key} />;
    }

    if (content) {
      renderedCells.push(
        <div
          key={key}
          className="absolute flex items-center justify-center box-border border-white/10 bg-gray-800"
          style={{
            left: col * CELL_SIZE + cellOffsetX,
            top: row * CELL_SIZE + cellOffsetY,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        >
          {content}
        </div>
      );
    }
  }

  for (const coord of addable) {
    const [row, col] = coord.split(",").map(Number);

    renderedCells.push(
      <div
        key={`add-${coord}`}
        className="absolute flex items-center justify-center"
        style={{
          left: col * CELL_SIZE + cellOffsetX,
          top: row * CELL_SIZE + cellOffsetY,
          width: CELL_SIZE,
          height: CELL_SIZE,
        }}
      >
        <AddButton coord={coord} />
      </div>
    );
  }

  return (
    <div
      className="absolute z-10"
      style={{
        width,
        height,
        left: `calc(50% + ${offsetX}px)`,
        top: `calc(50% + ${offsetY}px)`,
      }}
    >
      <div className="relative w-full h-full">{renderedCells}</div>
    </div>
  );
}

export default Grid;
