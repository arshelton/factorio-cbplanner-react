import { JSX } from "react";
import { useRouteState } from "../data-store/dataStore";
import { routePointToPixel } from "./utils/routeUtils";
import { useGridLayout } from "../hooks/useGridLayout";
import { RoutePoint } from "../types/mainTypes";
import { ROUTE_SPACING } from "../config/config";

function RouteOverlaySVG() {
  const routeMap = useRouteState((s) => s.routeMap);
  const hoveredRoute = useRouteState((s) => s.hoveredRoute);
  const setHoveredRoute = useRouteState((s) => s.setHoveredRoute);
  const isDrawingRoute = useRouteState((s) => s.isDrawingRoute);
  const { width, height, offsetX, offsetY, cellOffsetX, cellOffsetY } =
    useGridLayout();

  //Precompute route segments
  const segmentsMap = new Map<string, Array<{ id: number; segIdx: number }>>();
  const createSegmentKey = (p1: RoutePoint, p2: RoutePoint): string => {
    const [x1, y1] = routePointToPixel(p1);
    const [x2, y2] = routePointToPixel(p2);

    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return `${x1},${y1}-${x2},${y2}`;
    }
    return `${x2},${y2}-${x1},${y1}`;
  };
  for (const [id, route] of routeMap.entries()) {
    const path = route.path;
    for (let i = 0; i < path.length - 1; i++) {
      const key = createSegmentKey(path[i], path[i + 1]);
      if (!segmentsMap.has(key)) {
        segmentsMap.set(key, []);
      }
      segmentsMap.get(key)!.push({ id, segIdx: i });
    }
  }

  const getRouteOffset = (
    id: number,
    segIdx: number,
    p1: RoutePoint,
    p2: RoutePoint
  ): [number, number] => {
    const key = createSegmentKey(p1, p2);
    const parallelRoutes = segmentsMap.get(key)!;

    if (parallelRoutes.length <= 1) {
      return [0, 0];
    }

    const routeIdx = parallelRoutes.findIndex(
      (r) => r.id === id && r.segIdx === segIdx
    );

    const [x1, y1] = routePointToPixel(p1);
    const [x2, y2] = routePointToPixel(p2);
    const dx = x2 - x1;
    const dy = y2 - y1;

    const totalOffset = (parallelRoutes.length - 1) * ROUTE_SPACING;
    const centerOffset = totalOffset / 2;
    const thisOffset = routeIdx * ROUTE_SPACING - centerOffset;

    if (Math.abs(dx) > Math.abs(dy)) {
      return [0, thisOffset];
    } else {
      return [thisOffset, 0];
    }
  };

  const routeLines: JSX.Element[] = [];
  for (const [id, route] of routeMap.entries()) {
    const path = route.path;
    const isHovered = hoveredRoute === id;

    const points: string[] = [];

    for (let i = 0; i < path.length; i++) {
      const [x, y] = routePointToPixel(path[i]);

      let segmentOffsetX = 0;
      let segmentOffsetY = 0;

      if (i === 0 && path.length > 1) {
        [segmentOffsetX, segmentOffsetY] = getRouteOffset(
          id,
          0,
          path[0],
          path[1]
        );
      } else if (i > 0) {
        [segmentOffsetX, segmentOffsetY] = getRouteOffset(
          id,
          i - 1,
          path[i - 1],
          path[i]
        );
      }

      points.push(
        `${x + cellOffsetX + segmentOffsetX},
        ${y + cellOffsetY + segmentOffsetY}`
      );
    }

    routeLines.push(
      <polyline
        key={id}
        points={points.join(" ")}
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={isHovered && !isDrawingRoute ? 4 : 3}
        onMouseOver={() => setHoveredRoute(id)}
        onMouseLeave={() => setHoveredRoute(null)}
        style={{ pointerEvents: "stroke" }}
      />
    );
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
