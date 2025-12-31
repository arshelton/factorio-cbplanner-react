import { useGridState, useRouteState } from "../../data-store/dataStore";
import { useKeyState } from "../../key-state/keyState";
import { useRef } from "react";
import { CELL_SIZE, ROUTE_WIDTH_NORMAL } from "../../config/config";
import { BusCell, RoutePosition } from "../../types/mainTypes";
import { getIconColor } from "../../routes-layout/utils/routeUtils";
import { getAdjacentBusCells } from "../utils/busUtils";

type Props = {
  data: BusCell;
  cellKey: string;
};

function BusCellBlock({ data, cellKey }: Props) {
  const { grid } = useGridState();
  const ctrlDown = useKeyState((state) => state.ctrl);
  const altDown = useKeyState((state) => state.alt);

  const { removeCell, convertToRegular } = useGridState();
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

  const adjacentCells = getAdjacentBusCells(cellKey, grid);
  const routeDivsCenter =
    CELL_SIZE / 2 - (ROUTE_WIDTH_NORMAL * data.routes.length) / 2;
  const routeDivsFullLength = CELL_SIZE - 2;
  const routeDivsHalfLength = CELL_SIZE / 2 - 2;

  return (
    <div
      className="border border-secondary-content relative"
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOver={() =>
        setHoveredPosition({ position: RoutePosition.Bus, key: cellKey })
      }
    >
      {(adjacentCells.left || adjacentCells.right) && (
        <div className="absolute">
          {data.routes?.map((route, i) => (
            <div
              key={i}
              style={{
                width:
                  adjacentCells.left && adjacentCells.right
                    ? routeDivsFullLength
                    : routeDivsHalfLength,
                height: ROUTE_WIDTH_NORMAL,
                top: routeDivsCenter,
                left: adjacentCells.left ? 0 : CELL_SIZE / 2,
                backgroundColor: getIconColor(route),
              }}
              className="bg-primary relative"
            />
          ))}
        </div>
      )}
      {(adjacentCells.top || adjacentCells.bottom) && (
        <div className="flex absolute">
          {data.routes?.map((route, i) => (
            <div
              key={i}
              style={{
                width: ROUTE_WIDTH_NORMAL,
                height:
                  adjacentCells.top && adjacentCells.bottom
                    ? routeDivsFullLength
                    : routeDivsHalfLength,
                top: adjacentCells.top ? 0 : CELL_SIZE / 2,
                left: routeDivsCenter,
                backgroundColor: getIconColor(route),
              }}
              className="bg-primary relative"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BusCellBlock;
