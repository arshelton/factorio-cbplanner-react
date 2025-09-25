import { useGridState, useRouteState } from "../data-store/dataStore";
import { useKeyState } from "../key-state/keyState";
import { useRef } from "react";
import { CELL_SIZE } from "../config/config";
import { RoutePosition } from "../types/mainTypes";

type Props = {
  cellKey: string;
};

function BusCellBlock({ cellKey }: Props) {
  const ctrlDown = useKeyState((state) => state.ctrl);
  const altDown = useKeyState((state) => state.alt);

  const { setSelectedKey, removeCell, convertToRegular } = useGridState();
  const {
    areThereRoutesInCell,
    hoveredPosition,
    setHoveredPosition,
    isDrawingRoute,
  } = useRouteState();
  const mouseDownOnCell = useRef(false);

  const handleMouseDown = () => {
    mouseDownOnCell.current = true;
  };
  const handleMouseUp = () => {
    setSelectedKey(cellKey);
    if (
      hoveredPosition !== null &&
      mouseDownOnCell.current == true &&
      !isDrawingRoute
    ) {
      if (ctrlDown && !areThereRoutesInCell(cellKey)) {
        removeCell(cellKey);
      } else if (altDown && !areThereRoutesInCell(cellKey)) {
        convertToRegular(cellKey);
      }
    }

    mouseDownOnCell.current = false;
  };

  return (
    <div
      className="grid border border-secondary-content"
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOver={() =>
        setHoveredPosition({ position: RoutePosition.Bus, key: cellKey })
      }
    ></div>
  );
}

export default BusCellBlock;
