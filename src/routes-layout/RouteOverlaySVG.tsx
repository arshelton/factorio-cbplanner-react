import { JSX } from "react";
import { useRouteState } from "../data-store/dataStore";
import { getIconColor, routePointToPixel } from "./utils/routeUtils";
import { useGridLayout } from "../hooks/useGridLayout";
import { ROUTE_SPACING } from "../config/config";
import { useKeyState } from "../key-state/keyState";

function RouteOverlaySVG() {
  const routeMap = useRouteState((s) => s.routeMap);
  const hoveredRoute = useRouteState((s) => s.hoveredRoute);
  const setHoveredRoute = useRouteState((s) => s.setHoveredRoute);
  const isDrawingRoute = useRouteState((s) => s.isDrawingRoute);
  const deleteRoute = useRouteState((s) => s.deleteRoute);
  const changeRouteIcon = useRouteState((s) => s.changeRouteIcon);
  const setSelectedRoute = useRouteState((s) => s.setSelectedRoute);
  const { width, height, offsetX, offsetY, cellOffsetX, cellOffsetY } =
    useGridLayout();
  const ctrlDown = useKeyState((state) => state.ctrl);
  const shiftDown = useKeyState((state) => state.shift);
  const routeLines: JSX.Element[] = [];

  const handleMouseUp = () => {
    if (!isDrawingRoute && hoveredRoute !== null) {
      if (ctrlDown) deleteRoute(hoveredRoute);
      else if (shiftDown) changeRouteIcon(hoveredRoute, null);
      else {
        setSelectedRoute(hoveredRoute);
        (
          document.getElementById("menu-modal") as HTMLDialogElement
        )?.showModal();
      }
    }
  };

  //Converts routes into line segments, create a map of segments
  class LineSegment {
    constructor(public start: [number, number], public end: [number, number]) {}

    public offset: number = 0;

    public isHorizontal(): boolean {
      if (this.start[0] === this.end[0]) return false;
      else if (this.start[1] === this.end[1]) return true;
      else throw new Error("Segment isn't vertical or horizontal.\n" + this);
    }

    public getTrack(): number {
      return this.isHorizontal() ? this.start[1] : this.start[0];
    }

    public getRange(): [number, number] {
      if (this.isHorizontal()) {
        const [x1, x2] = [this.start[0], this.end[0]];
        return [Math.min(x1, x2), Math.max(x1, x2)];
      } else {
        const [y1, y2] = [this.start[1], this.end[1]];
        return [Math.min(y1, y2), Math.max(y1, y2)];
      }
    }

    public isOverlapping(other: LineSegment): boolean {
      if (this.isHorizontal() !== other.isHorizontal()) return false;
      if (this.getTrack() !== other.getTrack()) return false;

      const [min1, max1] = this.getRange();
      const [min2, max2] = other.getRange();
      return !(max1 < min2 || max2 < min1);
    }

    public getParallelGroupKey(): string {
      return `${this.isHorizontal()}-${this.getTrack()}`;
    }
  }

  // Convert routes into line segments based on where they turn
  const routeSegments = new Map<number, LineSegment[]>();
  for (const [id, route] of routeMap.entries()) {
    const path = route.path;
    if (path.length < 2) continue;

    const segments: LineSegment[] = [];
    let currentSegment = new LineSegment(
      routePointToPixel(path[0]),
      routePointToPixel(path[1])
    );

    for (let i = 1; i < path.length - 1; i++) {
      const nextPoint = routePointToPixel(path[i + 1]);
      const pointIndexToCheck = currentSegment.isHorizontal() ? 1 : 0;

      if (
        currentSegment.end[pointIndexToCheck] === nextPoint[pointIndexToCheck]
      ) {
        currentSegment.end = nextPoint;
      } else {
        segments.push(currentSegment);
        currentSegment = new LineSegment(currentSegment.end, nextPoint);
      }
    }
    segments.push(currentSegment);
    routeSegments.set(id, segments);
  }

  // Group segments that are on the same track
  const trackGroups = new Map<string, LineSegment[]>();
  for (const segments of routeSegments.values()) {
    for (const segment of segments) {
      const key = segment.getParallelGroupKey();
      if (trackGroups.has(key)) {
        trackGroups.get(key)!.push(segment);
      } else {
        trackGroups.set(key, [segment]);
      }
    }
  }

  //Assign offsets to overlapping segments
  for (const segments of trackGroups.values()) {
    segments.sort((a, b) => {
      return a.getRange()[0] - b.getRange()[0];
    });

    const lanes: Array<{ segmentIndices: number[]; maxEnd: number }> = [];
    const segmentLanes: number[] = new Array(segments.length).fill(0);

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const end = segment.getRange()[1];

      let assignedLaneIndex = -1;

      for (let laneIndex = 0; laneIndex < lanes.length; laneIndex++) {
        const lane = lanes[laneIndex];

        let canFit = true;
        for (const otherIndex of lane.segmentIndices) {
          if (segments[i].isOverlapping(segments[otherIndex])) {
            canFit = false;
            break;
          }
        }

        if (canFit) {
          assignedLaneIndex = laneIndex;
          break;
        }
      }

      if (assignedLaneIndex === -1) {
        assignedLaneIndex = lanes.length;
        lanes.push({ segmentIndices: [], maxEnd: 0 });
      }

      segmentLanes[i] = assignedLaneIndex;
      lanes[assignedLaneIndex].segmentIndices.push(i);
      lanes[assignedLaneIndex].maxEnd = Math.max(
        lanes[assignedLaneIndex].maxEnd,
        end
      );
    }

    const numLanes = lanes.length;
    const centerOffset = ((numLanes - 1) * ROUTE_SPACING) / 2;
    for (let i = 0; i < segments.length; i++) {
      segments[i].offset = segmentLanes[i] * ROUTE_SPACING - centerOffset;
    }
  }

  //Calculate the pixels, create the line render and push to routelines
  for (const [id, segments] of routeSegments.entries()) {
    for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
      const segment = segments[segmentIndex];
      const prevSegment = segmentIndex > 0 ? segments[segmentIndex - 1] : null;
      const nextSegment =
        segmentIndex < segments.length - 1 ? segments[segmentIndex + 1] : null;

      let startX, startY, endX, endY;
      if (segment.isHorizontal()) {
        startY = segment.start[1] + segment.offset;
        endY = segment.end[1] + segment.offset;

        startX =
          segment.start[0] + (prevSegment !== null ? prevSegment.offset : 0);
        endX = segment.end[0] + (nextSegment !== null ? nextSegment.offset : 0);
      } else {
        startX = segment.start[0] + segment.offset;
        endX = segment.end[0] + segment.offset;

        startY =
          segment.start[1] + (prevSegment !== null ? prevSegment.offset : 0);
        endY = segment.end[1] + (nextSegment !== null ? nextSegment.offset : 0);
      }

      routeLines.push(
        <line
          key={`${id}-${segment.start}`}
          x1={startX + cellOffsetX}
          y1={startY + cellOffsetY}
          x2={endX + cellOffsetX}
          y2={endY + cellOffsetY}
          stroke={
            routeMap.get(id)?.icon
              ? getIconColor(routeMap.get(id)!.icon!)
              : "white"
          }
          strokeWidth={hoveredRoute === id && !isDrawingRoute ? 4 : 3}
          onMouseOver={() => setHoveredRoute(id)}
          onMouseLeave={() => setHoveredRoute(null)}
          onMouseUp={handleMouseUp}
          pointerEvents="auto"
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
