import toast from "react-hot-toast";
import { useGridState, useRouteState } from "../data-store/dataStore";
import { useKeyState } from "../key-state/keyState";
import { RegularCell, RoutePosition } from "../types/mainTypes";
import { useRef } from "react";
import { CELL_SIZE } from "../config/config";
import RegularCellBlockOuterSection from "./RegularCellBlockOuterSection";
import RegularCellBlockCenter from "./RegularCellBlockCenter";

type Props = {
  data: RegularCell;
  cellKey: string;
};

function RegularCellBlock({ data, cellKey }: Props) {
  const shiftDown = useKeyState((state) => state.shift);
  const ctrlDown = useKeyState((state) => state.ctrl);
  const altDown = useKeyState((state) => state.alt);

  const { setSelectedKey, clearIcons, removeCell, convertToBus } =
    useGridState();
  const { areThereRoutesInCell, hoveredPosition, isDrawingRoute } =
    useRouteState();
  const mouseDownOnCenter = useRef(false);

  const handleMouseDown = () => {
    if (hoveredPosition?.position === RoutePosition.Center) {
      mouseDownOnCenter.current = true;
    }
  };
  const handleMouseUp = () => {
    setSelectedKey(cellKey);
    if (
      hoveredPosition !== null &&
      mouseDownOnCenter.current == true &&
      !isDrawingRoute
    ) {
      if (ctrlDown && !areThereRoutesInCell(cellKey)) {
        removeCell(cellKey);
      } else if (altDown && !areThereRoutesInCell(cellKey)) {
        convertToBus(cellKey);
      } else {
        if (shiftDown) {
          clearIcons(cellKey);
        } else {
          if (data.icons.length >= 9) {
            toast.error("Maximum Icons Reached");
          } else {
            (
              document.getElementById("menu-modal") as HTMLDialogElement
            )?.showModal();
          }
        }
      }
    }

    mouseDownOnCenter.current = false;
  };

  return (
    <div
      className="grid bg-secondary border border-secondary-content"
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
        gridTemplateColumns: "1fr 2fr 1fr",
        gridTemplateRows: `1fr 2fr 1fr`,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <RegularCellBlockOuterSection
        cellKey={cellKey}
        position={RoutePosition.TopLeft}
      />
      <RegularCellBlockOuterSection
        cellKey={cellKey}
        position={RoutePosition.Top}
      />
      <RegularCellBlockOuterSection
        cellKey={cellKey}
        position={RoutePosition.TopRight}
      />
      <RegularCellBlockOuterSection
        cellKey={cellKey}
        position={RoutePosition.Left}
      />
      <RegularCellBlockCenter cellData={data} cellKey={cellKey} />
      <RegularCellBlockOuterSection
        cellKey={cellKey}
        position={RoutePosition.Right}
      />
      <RegularCellBlockOuterSection
        cellKey={cellKey}
        position={RoutePosition.BottomLeft}
      />
      <RegularCellBlockOuterSection
        cellKey={cellKey}
        position={RoutePosition.Bottom}
      />
      <RegularCellBlockOuterSection
        cellKey={cellKey}
        position={RoutePosition.BottomRight}
      />
    </div>
  );
}

export default RegularCellBlock;
