import { JSX } from "react";
import { useRouteState } from "../data-store/dataStore";
import { routePointToPixel } from "./utils/routeUtils";
import { useGridLayout } from "../hooks/useGridLayout";

function RouteOverlaySVG() {
  const routeMap = useRouteState((s) => s.routeMap);
  const hoveredRoute = useRouteState((s) => s.hoveredRoute);
  const setHoveredRoute = useRouteState((s) => s.setHoveredRoute);
  const isDrawingRoute = useRouteState((s) => s.isDrawingRoute);
  const { width, height, offsetX, offsetY, cellOffsetX, cellOffsetY } =
    useGridLayout();

  const routeLines: JSX.Element[] = [];

  for (const [id, route] of routeMap.entries()) {
    const path = route.path;
    const isHovered = hoveredRoute === id;

    for (let i = 0; i < path.length - 1; i++) {
      const [x1, y1] = routePointToPixel(path[i]);
      const [x2, y2] = routePointToPixel(path[i + 1]);

      routeLines.push(
        <line
          key={`${id}-${i}`}
          x1={x1 + cellOffsetX}
          y1={y1 + cellOffsetY}
          x2={x2 + cellOffsetX}
          y2={y2 + cellOffsetY}
          stroke="white"
          strokeWidth={isHovered && !isDrawingRoute ? 4 : 3}
          onMouseOver={() => setHoveredRoute(id)}
          onMouseLeave={() => setHoveredRoute(null)}
          style={{ pointerEvents: "stroke" }}
        />
      );
    }
  }

  return (
    <svg
      className="absolute z-20"
      width={width}
      height={height}
      style={{
        left: `calc(50% + ${offsetX}px)`,
        top: `calc(50% + ${offsetY}px)`,
        pointerEvents: "none",
      }}
      viewBox={`0 0 ${width} ${height}`}
    >
      {routeLines}
    </svg>
  );
}

export default RouteOverlaySVG;
