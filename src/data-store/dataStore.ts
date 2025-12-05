import { create } from "zustand";
import { deflateRaw, inflateRaw } from "pako";
import { Cell, Grid, Route, RouteMap, RoutePoint } from "../types/mainTypes";

//#region Grid State
interface GridState {
  grid: Grid;
  setGrid: (grid: Grid) => void;
  addCell: (key: string) => void;
  removeCell: (key: string) => void;
  convertToBus: (key: string) => void;
  convertToRegular: (key: string) => void;
  addIcon: (key: string, icon: string) => void;
  clearIcons: (key: string) => void;

  selectedKey: string | null;
  setSelectedKey: (key: string | null) => void;
}

const defaultGrid: () => Grid = () => {
  const defaultMap: Grid = new Map();
  defaultMap.set("0,0", {
    icons: [],
  });
  return defaultMap;
};

const getInitialGrid = (): Grid => {
  const encoded = getHashParam("grid");
  if (encoded) {
    try {
      return decodeState<Cell>(encoded);
    } catch {
      console.log("Failed to decode URL state for grid");
    }
  }
  return defaultGrid();
};

export const useGridState = create<GridState>()((set, get) => ({
  grid: getInitialGrid(),

  setGrid: (newGrid) => {
    set({ grid: newGrid });
    const encoded = encodeState<Cell>(newGrid);
    updateHashParam("grid", encoded);
  },

  addCell: (key) => {
    const newGrid = new Map(get().grid);
    newGrid.set(key, {
      icons: [],
    });

    get().setGrid(newGrid);
  },

  removeCell: (key) => {
    const newGrid = new Map(get().grid);
    newGrid.delete(key);

    get().setGrid(newGrid);
  },

  convertToBus: (key) => {
    const newGrid = new Map(get().grid);
    newGrid.set(key, {
      isHorizontal: false,
    });

    get().setGrid(newGrid);
  },

  convertToRegular: (key) => {
    const newGrid = new Map(get().grid);
    newGrid.set(key, {
      icons: [],
    });

    get().setGrid(newGrid);
  },

  addIcon: (key, icon) => {
    const newGrid = new Map(get().grid);

    const currentCell = newGrid.get(key);
    if (!currentCell || "isHorizontal" in currentCell) return;

    newGrid.set(key, {
      ...currentCell,
      icons: [...currentCell.icons, icon],
    });

    get().setGrid(newGrid);
  },

  clearIcons: (key) => {
    const newGrid = new Map(get().grid);

    const currentCell = newGrid.get(key);
    if (!currentCell || "isHorizontal" in currentCell) return;

    const updatedCell = {
      ...currentCell,
      icons: [],
    };
    newGrid.set(key, updatedCell);

    get().setGrid(newGrid);
  },

  selectedKey: null,
  setSelectedKey: (key) => set({ selectedKey: key }),
}));
//#endregion

//#region Route State
interface RouteState {
  routeMap: RouteMap;
  setRouteMap: (routeMap: RouteMap) => void;
  addRoute: (icon: string | null, origin: RoutePoint) => number;
  extendRoute: (id: number, nextPoint: RoutePoint) => void;
  pruneRoute: (id: number, prunePoint: RoutePoint) => void;
  deleteRoute: (id: number) => void;
  branchRoute: (id: number, branchPoint: RoutePoint) => void;
  changeRouteIcon: (id: number, newIcon: string | null) => void;

  areThereRoutesInCell: (key: string) => boolean;

  nextId: number;

  hoveredPosition: RoutePoint | null;
  setHoveredPosition: (hoveredPosition: RoutePoint | null) => void;

  hoveredRoute: number | null;
  setHoveredRoute: (hoveredRoute: number | null) => void;

  selectedRoute: number | null;
  setSelectedRoute: (selectedRoute: number | null) => void;

  isDrawingRoute: boolean;
  setIsDrawingRoute: (isDrawingRoute: boolean) => void;
}

const defaultRouteMap: () => RouteMap = () => {
  return new Map<number, Route>();
};

const getInitialRoutes = (): RouteMap => {
  const encoded = getHashParam("routes");
  if (encoded) {
    try {
      const decoded = decodeState<Route>(encoded);

      const routeMap = new Map<number, Route>();
      for (const [key, val] of decoded.entries()) {
        routeMap.set(Number(key), val);
      }

      return routeMap;
    } catch {
      console.log("Failed to decode URL state for Routes");
    }
  }
  return defaultRouteMap();
};

const getInitialNextId = (): number => {
  let maxId = 0;
  const initialRoutes = getInitialRoutes();
  for (const key of initialRoutes.keys()) {
    maxId = key > maxId ? key : maxId;
  }
  return maxId;
};

export const useRouteState = create<RouteState>()((set, get) => ({
  routeMap: getInitialRoutes(),
  setRouteMap: (newRouteMap) => {
    set({ routeMap: newRouteMap });

    const stringMap = new Map<string, Route>();
    for (const [key, val] of newRouteMap.entries()) {
      stringMap.set(String(key), val);
    }
    const encoded = encodeState<Route>(stringMap);

    updateHashParam("routes", encoded);
  },

  addRoute: (icon, origin) => {
    const newRouteMap = new Map(get().routeMap);
    const id = get().nextId;

    const newRoute = {
      icon: icon,
      path: [origin],
    };

    newRouteMap.set(id, newRoute);

    set({
      nextId: id + 1,
    });
    get().setRouteMap(newRouteMap);
    return id;
  },

  deleteRoute: (id) => {
    const newRouteMap = new Map(get().routeMap);
    newRouteMap.delete(id);
    get().setRouteMap(newRouteMap);
  },

  extendRoute: (id, nextPoint) => {
    const newRouteMap = new Map(get().routeMap);

    const currentRoute = newRouteMap.get(id);
    if (!currentRoute) return;

    newRouteMap.set(id, {
      ...currentRoute,
      path: [...currentRoute.path, nextPoint],
    });

    get().setRouteMap(newRouteMap);
  },

  //MAY NEED TO ADD LOGIC TO DEAL WITH DOWNSTREAM BRANCHES HERE
  pruneRoute: (id, prunePoint) => {
    const newRouteMap = new Map(get().routeMap);

    const currentRoute = newRouteMap.get(id);
    if (!currentRoute) return;

    const pruneIndex = currentRoute.path.findIndex(
      (p) => p.key === prunePoint.key && p.position === prunePoint.position
    );
    if (pruneIndex === 0) {
      get().deleteRoute(id);
      return;
    }

    newRouteMap.set(id, {
      ...currentRoute,
      path: currentRoute.path.slice(0, pruneIndex + 1),
    });

    get().setRouteMap(newRouteMap);
  },

  branchRoute: (route, branchPoint) => {},

  changeRouteIcon: (id, newIcon) => {
    const newRouteMap = new Map(get().routeMap);

    const currentRoute = newRouteMap.get(id);
    if (!currentRoute) return;

    newRouteMap.set(id, {
      ...currentRoute,
      icon: newIcon,
    });

    get().setRouteMap(newRouteMap);
  },

  areThereRoutesInCell: (key) => {
    return Array.from(get().routeMap.values()).some((route) =>
      route.path.some((routePoint) => routePoint.key == key)
    );
  },

  nextId: getInitialNextId(),

  hoveredPosition: null,
  setHoveredPosition: (hoveredPosition) => set({ hoveredPosition }),

  hoveredRoute: null,
  setHoveredRoute: (hoveredRoute) => set({ hoveredRoute }),

  selectedRoute: null,
  setSelectedRoute: (selectedRoute) => set({ selectedRoute }),
  isDrawingRoute: false,
  setIsDrawingRoute: (isDrawingRoute) => set({ isDrawingRoute }),
}));
//#endregion

//#region URL Encoding
function encodeState<T>(state: Map<string, T>): string {
  const plain = Array.from(state.entries()); //Convert map to array for JSON serialization
  const json = JSON.stringify(plain);
  const deflated = deflateRaw(json);
  return btoa(String.fromCharCode(...deflated));
}

function decodeState<T>(base64: string): Map<string, T> {
  try {
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const json = inflateRaw(bytes, { to: "string" });
    const entries: [string, T][] = JSON.parse(json);
    return new Map(entries);
  } catch (e) {
    console.error("Failed to decode state from URL");
    throw e;
  }
}

function getHashParam(key: string): string | null {
  const params = new URLSearchParams(window.location.hash.slice(1));
  return params.get(key);
}

function updateHashParam(key: string, value: string) {
  const params = new URLSearchParams(window.location.hash.slice(1));
  params.set(key, value);
  window.history.replaceState(null, "", `#${params.toString()}`);
}
//#endregion
