import { useEffect, useState } from "react";
import { useRouteState } from "../data-store/dataStore";
import Icon from "../icons-menu/Icon";

function RouteIconsTooltip() {
  const routeMap = useRouteState((s) => s.routeMap);
  const hoveredRoute = useRouteState((s) => s.hoveredRoute);
  const isDrawingRoute = useRouteState((s) => s.isDrawingRoute);

  const [tooltipPos, setToolTipPos] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredRoute != null) {
        setToolTipPos({ x: e.clientX, y: e.clientY });
      }
    };

    if (hoveredRoute != null) {
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [hoveredRoute]);

  return (
    !isDrawingRoute &&
    hoveredRoute != null &&
    routeMap.get(hoveredRoute) != undefined &&
    routeMap.get(hoveredRoute)!.icon !== null &&
    tooltipPos != null && (
      <div
        className="absolute z-50 bg-primary border border-primary-content p-1 shadow"
        style={{
          position: "fixed",
          top: `${tooltipPos.y + 8}px`,
          left: `${tooltipPos.x + 8}px`,
        }}
      >
        <div className="flex items-center">
          <Icon
            iconName={
              routeMap.get(hoveredRoute)?.icon || "deconstruction-planner"
            }
            size={16}
          />
        </div>
      </div>
    )
  );
}

export default RouteIconsTooltip;
