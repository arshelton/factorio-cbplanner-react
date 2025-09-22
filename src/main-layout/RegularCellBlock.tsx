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

  const { setSelectedKey, clearIcons, removeCell } = useGridState();
  const { hoveredPosition } = useRouteState();
  const mouseDownOnCenter = useRef(false);

  const handleMouseDown = () => {
    if (hoveredPosition?.position === RoutePosition.Center) {
      mouseDownOnCenter.current = true;
    }
  };
  const handleMouseUp = () => {
    setSelectedKey(cellKey);

    if (hoveredPosition !== null) {
      if (ctrlDown) {
        removeCell(cellKey);
      } else if (mouseDownOnCenter.current == true) {
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

      {/* TOOLTIP */}
      {/* {
        tooltipPos 
         && (
          <div
            className="absolute z-50 bg-primary border border-primary-content p-1 shadow"
            style={{
              position: "fixed",
              top: `${tooltipPos.y + 8}px`,
              left: `${tooltipPos.x + 8}px`,
            }}
          >
            {data.sideRoutes[
              Sides[sideHovered].toLowerCase() as keyof typeof data.sideRoutes
            ].map((icon, i) => (
              <div key={i} className="flex items-center">
                <Icon iconName={icon} size={16} />
              </div>
            ))}
          </div>
        )} */}
    </div>
  );
}

export default RegularCellBlock;
