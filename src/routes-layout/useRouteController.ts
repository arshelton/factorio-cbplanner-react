import { useEffect, useRef } from "react";
import { useRouteState, useGridState } from "../data-store/dataStore";
import { RoutePoint, RoutePosition } from "../types/mainTypes";

export default function useRouteController() {
  const { hoveredPosition, addRoute, extendRoute, pruneRoute } =
    useRouteState();
  const grid = useGridState((s) => s.grid);

  const mouseDownOnCenter = useRef(false);
  const activeId = useRef<number | null>(null);
  const currentRoute = useRef<RoutePoint[]>([]); //Track route locally - zustand too slow for mouse drag

  //Handle window mouse down and up events
  useEffect(() => {
    const handleMouseDown = () => {
      const { hoveredPosition } = useRouteState.getState();
      if (!hoveredPosition) return;

      if (hoveredPosition.position == RoutePosition.Center) {
        mouseDownOnCenter.current = true;
      }
    };

    const handleMouseUp = () => {
      activeId.current = null;
      mouseDownOnCenter.current = false;
      currentRoute.current = [];
      useRouteState.getState().setIsDrawingRoute(false);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  //Handle route drawing when mouse was pressed on center
  useEffect(() => {
    if (hoveredPosition) {
      if (mouseDownOnCenter.current) {
        useRouteState.getState().setIsDrawingRoute(true);

        const originPoint = {
          ...hoveredPosition,
          position: RoutePosition.Center,
        };
        activeId.current = addRoute(
          getOriginIcon(hoveredPosition),
          originPoint
        );
        extendRoute(activeId.current, hoveredPosition);

        currentRoute.current = [originPoint, hoveredPosition];
      } else if (activeId.current !== null) {
        if (!currentRoute.current || currentRoute.current.length === 0) return;

        const existingIndex = currentRoute.current.findIndex(
          (p) =>
            p.key === hoveredPosition.key &&
            p.position === hoveredPosition.position
        );

        if (existingIndex >= 0) {
          currentRoute.current = currentRoute.current.slice(
            0,
            existingIndex + 1
          );
          pruneRoute(activeId.current, hoveredPosition);
        } else {
          currentRoute.current.push(hoveredPosition);
          extendRoute(activeId.current, hoveredPosition);
        }
      }
    }
    mouseDownOnCenter.current = false;
  }, [hoveredPosition, addRoute, extendRoute, pruneRoute]);

  //Prevent annoying default dnd behavior
  useEffect(() => {
    const handler = (e: DragEvent) => e.preventDefault();
    window.addEventListener("dragstart", handler);
    return () => window.removeEventListener("dragstart", handler);
  }, []);

  const getOriginIcon = (originPosition: RoutePoint): string | null => {
    const cell = grid.get(originPosition.key);

    if (!cell) return null;
    if ("icons" in cell && cell.icons.length > 0) {
      return cell.icons[0];
    }
    return null;
  };
}
