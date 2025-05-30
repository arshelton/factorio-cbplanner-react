import toast from "react-hot-toast";
import { useGridState } from "../data-store/dataStore";
import Icon from "../icons-menu/Icon";
import { useKeyState } from "../key-state/keyState";
import { RegularCell, SideRoutes } from "../types/mainTypes";
import { useState } from "react";
import { Sides } from "../types/mainTypes";

type Props = {
  data: RegularCell;
  cellKey: string;
};

function RegularCellBlock({ data, cellKey }: Props) {
  const [sideHovered, setSideHovered] = useState<Sides | null>(null);
  const hoverStyle = (...sides: Sides[]): string => {
    return `${
      sideHovered !== null && sides.includes(sideHovered)
        ? "bg-base-content"
        : ""
    }`;
  };

  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const shiftDown = useKeyState((state) => state.shift);
  const ctrlDown = useKeyState((state) => state.ctrl);
  const { setSelectedKey, setSelectedSide, clearIcons, removeCell } =
    useGridState();

  const handleClick = () => {
    setSelectedKey(cellKey);
    setSelectedSide(sideHovered);

    if (shiftDown) {
      clearIcons(cellKey, sideHovered);
    } else if (ctrlDown) {
      removeCell(cellKey);
    } else {
      if (sideHovered !== null) {
        const sideKey = Sides[sideHovered].toLowerCase() as keyof SideRoutes;

        if (data.sideRoutes[sideKey].length >= 3) {
          toast.error("Maximum Side Route Icons Reached");
        } else {
          (
            document.getElementById("menu-modal") as HTMLDialogElement
          )?.showModal();
        }
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
  };

  return (
    <div
      className="
        grid [grid-template-columns:16px_1fr_16px] [grid-template-rows:16px_1fr_16px] 
        w-16 h-16 
        bg-secondary border border-secondary-content"
      onClick={handleClick}
    >
      <div className={`w-4 h-4 relative ${hoverStyle(Sides.Top, Sides.Left)}`}>
        <div
          className="absolute inset-0 clip-triangle-backward-alt"
          onPointerEnter={(e) => {
            setSideHovered(Sides.Left);
            setTooltipPos({ x: e.clientX, y: e.clientY });
          }}
          onPointerLeave={() => {
            setSideHovered(null);
            setTooltipPos(null);
          }}
          onPointerMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
        />
        <div
          className="absolute inset-0 clip-triangle-backward"
          onPointerEnter={(e) => {
            setSideHovered(Sides.Top);
            setTooltipPos({ x: e.clientX, y: e.clientY });
          }}
          onPointerLeave={() => {
            setSideHovered(null);
            setTooltipPos(null);
          }}
          onPointerMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
        />
      </div>
      <div
        className={`flex items-center justify-center ${hoverStyle(Sides.Top)}`}
        onPointerEnter={(e) => {
          setSideHovered(Sides.Top);
          setTooltipPos({ x: e.clientX, y: e.clientY });
        }}
        onPointerLeave={() => {
          setSideHovered(null);
          setTooltipPos(null);
        }}
        onPointerMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
      ></div>
      <div className={`w-4 h-4 relative ${hoverStyle(Sides.Top, Sides.Right)}`}>
        <div
          className="absolute inset-0 clip-triangle-forward-alt"
          onPointerEnter={(e) => {
            setSideHovered(Sides.Top);
            setTooltipPos({ x: e.clientX, y: e.clientY });
          }}
          onPointerLeave={() => {
            setSideHovered(null);
            setTooltipPos(null);
          }}
          onPointerMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
        />
        <div
          className="absolute inset-0 clip-triangle-forward"
          onPointerEnter={(e) => {
            setSideHovered(Sides.Right);
            setTooltipPos({ x: e.clientX, y: e.clientY });
          }}
          onPointerLeave={() => {
            setSideHovered(null);
            setTooltipPos(null);
          }}
          onPointerMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
        />
      </div>
      <div
        className={`flex items-center justify-center ${hoverStyle(Sides.Left)}`}
        onPointerEnter={(e) => {
          setSideHovered(Sides.Left);
          setTooltipPos({ x: e.clientX, y: e.clientY });
        }}
        onPointerLeave={() => {
          setSideHovered(null);
          setTooltipPos(null);
        }}
        onPointerMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
      ></div>
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
      <div
        className={`flex items-center justify-center ${hoverStyle(
          Sides.Right
        )}`}
        onPointerEnter={(e) => {
          setSideHovered(Sides.Right);
          setTooltipPos({ x: e.clientX, y: e.clientY });
        }}
        onPointerLeave={() => {
          setSideHovered(null);
          setTooltipPos(null);
        }}
        onPointerMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
      ></div>
      <div
        className={`w-4 h-4 relative ${hoverStyle(Sides.Left, Sides.Bottom)}`}
      >
        <div
          className="absolute inset-0 clip-triangle-forward-alt"
          onPointerEnter={(e) => {
            setSideHovered(Sides.Left);
            setTooltipPos({ x: e.clientX, y: e.clientY });
          }}
          onPointerLeave={() => {
            setSideHovered(null);
            setTooltipPos(null);
          }}
          onPointerMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
        />
        <div
          className="absolute inset-0 clip-triangle-forward"
          onPointerEnter={(e) => {
            setSideHovered(Sides.Bottom);
            setTooltipPos({ x: e.clientX, y: e.clientY });
          }}
          onPointerLeave={() => {
            setSideHovered(null);
            setTooltipPos(null);
          }}
          onPointerMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
        />
      </div>
      <div
        className={`flex items-center justify-center ${hoverStyle(
          Sides.Bottom
        )}`}
        onPointerEnter={(e) => {
          setSideHovered(Sides.Bottom);
          setTooltipPos({ x: e.clientX, y: e.clientY });
        }}
        onPointerLeave={() => {
          setSideHovered(null);
          setTooltipPos(null);
        }}
        onPointerMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
      ></div>
      <div
        className={`w-4 h-4 relative ${hoverStyle(Sides.Bottom, Sides.Right)}`}
      >
        <div
          className="absolute inset-0 clip-triangle-backward-alt"
          onPointerEnter={(e) => {
            setSideHovered(Sides.Bottom);
            setTooltipPos({ x: e.clientX, y: e.clientY });
          }}
          onPointerLeave={() => {
            setSideHovered(null);
            setTooltipPos(null);
          }}
          onPointerMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
        />
        <div
          className="absolute inset-0 clip-triangle-backward"
          onPointerEnter={(e) => {
            setSideHovered(Sides.Right);
            setTooltipPos({ x: e.clientX, y: e.clientY });
          }}
          onPointerLeave={() => {
            setSideHovered(null);
            setTooltipPos(null);
          }}
          onPointerMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
        />
      </div>

      {/* SIDE ROUTES */}
      {data.sideRoutes.top.length > 0 && (
        <div
          className="absolute left-0 w-full h-[2px] bg-error pointer-events-none"
          style={{ top: "8px" }}
        />
      )}
      {data.sideRoutes.bottom.length > 0 && (
        <div
          className="absolute left-0 w-full h-[2px] bg-error pointer-events-none"
          style={{ bottom: "8px" }}
        />
      )}
      {data.sideRoutes.left.length > 0 && (
        <div
          className="absolute top-0 h-full w-[2px] bg-error pointer-events-none"
          style={{ left: "8px" }}
        />
      )}
      {data.sideRoutes.right.length > 0 && (
        <div
          className="absolute top-0 h-full w-[2px] bg-error pointer-events-none"
          style={{ right: "8px" }}
        />
      )}

      {/* TOOLTIP */}
      {sideHovered !== null &&
        tooltipPos &&
        data.sideRoutes?.[
          Sides[sideHovered].toLowerCase() as keyof typeof data.sideRoutes
        ]?.length > 0 && (
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
        )}
    </div>
  );
}

export default RegularCellBlock;
