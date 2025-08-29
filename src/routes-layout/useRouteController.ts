import { useEffect, useRef } from "react";
import { useRouteState } from "../data-store/dataStore";
import { RoutePosition } from "../types/mainTypes";

export default function useRouteController() {
  const { hoveredPosition, addRoute, extendRoute } = useRouteState();

  const mouseDownOnCenter = useRef(false);
  const activeId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseDown = () => {
      if (!hoveredPosition) return;

      if (hoveredPosition.position == RoutePosition.Center) {
        mouseDownOnCenter.current = true;
      }
    };

    const handleMouseUp = () => {
      activeId.current = null;
      mouseDownOnCenter.current = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  useEffect(() => {
    if (hoveredPosition) {
      if (mouseDownOnCenter.current) {
        activeId.current = addRoute("rail", {
          ...hoveredPosition,
          position: RoutePosition.Center,
        });
        extendRoute(activeId.current, hoveredPosition);
      } else if (activeId.current !== null) {
        extendRoute(activeId.current, hoveredPosition);
      }
    }
    mouseDownOnCenter.current = false;
  }, [hoveredPosition, addRoute, extendRoute]);

  //Prevent annoying default dnd behavior
  useEffect(() => {
    const handler = (e: DragEvent) => e.preventDefault();
    window.addEventListener("dragstart", handler);
    return () => window.removeEventListener("dragstart", handler);
  });
}
