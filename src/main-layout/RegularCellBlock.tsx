import toast from "react-hot-toast";
import { useGridState } from "../data-store/dataStore";
import Icon from "../icons-menu/Icon";
import { useKeyState } from "../key-state/keyState";
import { RegularCell, RoutePosition } from "../types/mainTypes";
import { useRef, useState } from "react";

type Props = {
  data: RegularCell;
  cellKey: string;
};

function RegularCellBlock({ data, cellKey }: Props) {
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const shiftDown = useKeyState((state) => state.shift);
  const ctrlDown = useKeyState((state) => state.ctrl);

  const { setSelectedKey, clearIcons, removeCell } = useGridState();

  const mousePos = useRef<RoutePosition | null>(null);

  const handleClick = () => {
    setSelectedKey(cellKey);

    if (shiftDown) {
      clearIcons(cellKey);
    } else if (ctrlDown) {
      removeCell(cellKey);
    } else {
      if (data.icons.length >= 9) {
        toast.error("Maximum Icons Reached");
      } else {
        (
          document.getElementById("menu-modal") as HTMLDialogElement
        )?.showModal();
      }
    }
  };

  return (
    <div
      className="
        grid [grid-template-columns:16px_1fr_16px] [grid-template-rows:16px_1fr_16px] 
        w-16 h-16 
        bg-secondary border border-secondary-content"
      onClick={handleClick}
    >
      <div className={`w-4 h-4 relative`}></div>
      <div className={`flex items-center justify-center`}></div>
      <div className={`w-4 h-4 relative`}></div>
      <div className={`flex items-center justify-center`}></div>
      <div className="flex items-center justify-center hover:bg-base-content overflow-hidden">
        {data.icons.length === 1 && <Icon iconName={data.icons[0]} size={32} />}
        {data.icons.length >= 2 && data.icons.length <= 4 && (
          <div className="grid grid-cols-2 grid-rows-2">
            {data.icons.map((icon, i) => (
              <Icon key={i} iconName={icon} size={16} />
            ))}
          </div>
        )}
        {data.icons.length >= 5 && data.icons.length <= 9 && (
          <div className="grid grid-cols-3 grid-rows-3 gap-[1px]">
            {data.icons.map((icon, i) => (
              <Icon key={i} iconName={icon} size={10} />
            ))}
          </div>
        )}
      </div>
      <div className={`flex items-center justify-center`}></div>
      <div className={`w-4 h-4 relative`}></div>
      <div className={`flex items-center justify-center`}></div>
      <div className={`w-4 h-4 relative`}></div>

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
