import { useGridState } from "../data-store/dataStore";
import AddButton from "./AddButton";
import BusCellBlock from "./BusCellBlock";
import RegularCellBlock from "./RegularCellBlock";
import CellBlock from "./RegularCellBlock";
import { getAddablePositions, getBoundingBox } from "./utils/gridUtils";

function Grid() {
  const grid = useGridState((s) => s.grid);

  const { minRow, maxRow, minCol, maxCol } = getBoundingBox(grid);
  const addable = getAddablePositions(grid);

  const rows = [];

  for (let r = minRow - 1; r <= maxRow + 1; r++) {
    const cols = [];
    for (let c = minCol - 1; c <= maxCol + 1; c++) {
      const key = `${r},${c}`;
      const cell = grid.get(key);

      let content;
      if (cell) {
        if ("routes" in cell) content = <BusCellBlock data={cell} />;
        else if ("sideRoutes" in cell)
          content = <RegularCellBlock data={cell} />;
      } else if (addable.has(key)) content = <AddButton />;

      cols.push(
        <div
          key={key}
          className="w-16 h-16 flex items-center justify-center border border-white/10"
        >
          {content}
        </div>
      );
    }

    rows.push(
      <div key={r} className="flex flex-row">
        {cols}
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col">{rows}</div>
    </div>
  );
}

export default Grid;
