import { useEffect, useRef } from "react";
import { useRouteState, useGridState } from "../data-store/dataStore";
import { BusCell, Route, RoutePoint, RoutePosition } from "../types/mainTypes";
import { areRoutePointsAdjacent } from "./utils/routeUtils";
import { correspondingBusPosition } from "../main-layout/utils/busUtils";

export default function useRouteController() {
  const { hoveredPosition, addRoute, extendRoute, pruneRoute } =
    useRouteState();
  const addRouteToBus = useGridState((s) => s.addRouteToBus);

  const mouseDownOnCenter = useRef(false);
  const drawingRouteId = useRef<number | null>(null);
  const currentRoute = useRef<Route>({ path: [], icon: null }); //Track route locally - zustand too slow for mouse drag

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
      drawingRouteId.current = null;
      mouseDownOnCenter.current = false;
      currentRoute.current = {
        path: [],
        icon: null,
      };
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
    const getOriginIcon = (originPosition: RoutePoint): string | null => {
      const cell = useGridState.getState().grid.get(originPosition.key);

      if (!cell) return null;
      if ("icons" in cell && cell.icons.length > 0) {
        return cell.icons[0];
      }
      return null;
    };

    if (hoveredPosition) {
      if (mouseDownOnCenter.current) {
        useRouteState.getState().setIsDrawingRoute(true);

        const originPoint = {
          ...hoveredPosition,
          position: RoutePosition.Center,
        };
        drawingRouteId.current = addRoute(
          getOriginIcon(hoveredPosition),
          originPoint
        );
        extendRoute(drawingRouteId.current, hoveredPosition);

        currentRoute.current = {
          path: [originPoint, hoveredPosition],
          icon: getOriginIcon(hoveredPosition),
        };
      } else if (drawingRouteId.current !== null) {
        if (!currentRoute.current || currentRoute.current.path.length === 0)
          throw new Error("currentRoute missing despite drawingRoute not null");

        //Abort if last and current point are not adjacent
        const lastPosition = currentRoute.current.path.slice(-1)[0];
        if (
          lastPosition !== hoveredPosition &&
          !areRoutePointsAdjacent(lastPosition, hoveredPosition)
        )
          return;

        //Prune route if looping back on itself
        const existingIndex = currentRoute.current.path.findIndex(
          (p) =>
            p.key === hoveredPosition.key &&
            p.position === hoveredPosition.position
        );
        if (existingIndex !== -1) {
          currentRoute.current.path = currentRoute.current.path.slice(
            0,
            existingIndex + 1
          );
          pruneRoute(drawingRouteId.current, hoveredPosition);
        } else {
          //Correct and terminate route if bus
          if (hoveredPosition.position === RoutePosition.Bus) {
            //Correct route position to align with bus properly
            const correctedPosition = hoveredPosition;
            correctedPosition.position = correspondingBusPosition(
              lastPosition,
              hoveredPosition
            );

            currentRoute.current.path.push(hoveredPosition);
            extendRoute(drawingRouteId.current, correctedPosition);
            if (
              currentRoute.current.icon &&
              !(
                useGridState.getState().grid.get(hoveredPosition.key) as BusCell
              ).routes.includes(currentRoute.current.icon)
            )
              addRouteToBus(hoveredPosition.key, currentRoute.current.icon);

            drawingRouteId.current = null;
          } else {
            //Otherwise, extend as normal
            currentRoute.current.path.push(hoveredPosition);
            extendRoute(drawingRouteId.current, hoveredPosition);
          }
        }
      }
    }

    mouseDownOnCenter.current = false;
  }, [hoveredPosition, addRoute, extendRoute, pruneRoute, addRouteToBus]);

  //Prevent annoying default dnd behavior
  useEffect(() => {
    const handler = (e: DragEvent) => e.preventDefault();
    window.addEventListener("dragstart", handler);
    return () => window.removeEventListener("dragstart", handler);
  }, []);
}
