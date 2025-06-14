import { create } from "zustand";
import { deflateRaw, inflateRaw } from "pako";
import { Cell, Grid, Route, RouteMap } from "../types/mainTypes";

interface GridState {
  grid: Grid;
  setGrid: (grid: Grid) => void;
  addCell: (key: string) => void;
  removeCell: (key: string) => void;
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
      console.log("Failed to decode URL state");
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
    const currentGrid = get().grid;
    const newGrid = new Map(currentGrid);
    newGrid.set(key, {
      icons: [],
    });

    get().setGrid(newGrid);
  },

  removeCell: (key) => {
    const currentGrid = get().grid;
    const newGrid = new Map(currentGrid);
    newGrid.delete(key);

    get().setGrid(newGrid);
  },

  addIcon: (key, icon) => {
    const currentGrid = get().grid;
    const newGrid = new Map(currentGrid);

    const currentCell = newGrid.get(key);
    if (!currentCell) return;

    let updatedCell;
    if ("icons" in currentCell) {
      updatedCell = {
        ...currentCell,
        icons: [...currentCell.icons, icon],
      };
    } else {
      updatedCell = {
        ...currentCell,
        routes: [...currentCell.routes, icon],
      };
    }

    newGrid.set(key, updatedCell);
    get().setGrid(newGrid);
  },

  clearIcons: (key) => {
    const currentGrid = get().grid;
    const newGrid = new Map(currentGrid);

    const currentCell = newGrid.get(key);
    if (!currentCell) return;

    let updatedCell;
    if ("icons" in currentCell) {
      updatedCell = {
        ...currentCell,
        icons: [],
      };
    } else {
      updatedCell = {
        ...currentCell,
        routes: [],
      };
    }

    newGrid.set(key, updatedCell);
    get().setGrid(newGrid);
  },

  selectedKey: null,
  setSelectedKey: (key) => {
    set({ selectedKey: key });
  },
}));

/////////////////////////////////////////////////////
interface RouteState {
  routeMap: RouteMap;
  setRouteMap: (routeMap: RouteMap) => void;
}

const defaultRouteMap: () => RouteMap = () => {
  const defaultMap: RouteMap = new Map<string, Route>();
  return defaultMap;
};

const getInitialRoutes = (): RouteMap => {
  const encoded = getHashParam("routes");
  if (encoded) {
    try {
      return decodeState<Route>(encoded);
    } catch {
      console.log("Failed to decode URL stat for Routes");
    }
  }
  return defaultRouteMap();
};

export const useRouteState = create<RouteState>()((set, get) => ({
  routeMap: getInitialRoutes(),
  setRouteMap: (newRouteMap) => {
    set({ routeMap: newRouteMap });
    const encoded = encodeState<Route>(newRouteMap);
    updateHashParam("routes", encoded);
  },
}));

/////////////////////////////////////////////////
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
