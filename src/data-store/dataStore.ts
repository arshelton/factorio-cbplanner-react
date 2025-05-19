import { create } from "zustand";
import { deflateRaw, inflateRaw } from "pako";
import { Cell, Grid } from "../types/mainTypes";

interface GridState {
  grid: Grid;
  setGrid: (grid: Grid) => void;
  addCell: (key: string) => void;
}

const defaultGrid: () => Grid = () => {
  const defaultMap: Grid = new Map();
  defaultMap.set("0,0", {
    icons: [],
    sideRoutes: {
      left: [],
      right: [],
      top: [],
      bottom: [],
    },
  });
  return defaultMap;
};

const getInitialData = (): Grid => {
  const hash = window.location.hash;
  if (hash.startsWith("#grid=")) {
    try {
      return decodeGrid(hash.slice(6));
    } catch {
      console.log("Failed to decode URL state");
    }
  }
  return defaultGrid();
};

export const useGridState = create<GridState>()((set, get) => ({
  grid: getInitialData(),

  setGrid: (newGrid) => {
    set({ grid: newGrid });
    const encoded = encodeGrid(newGrid);
    window.history.replaceState(null, "", `#grid=${encoded}`);
  },

  addCell: (key) => {
    const currentGrid = get().grid;
    const newGrid = new Map(currentGrid);
    newGrid.set(key, {
      icons: [],
      sideRoutes: {
        left: [],
        right: [],
        top: [],
        bottom: [],
      },
    });

    get().setGrid(newGrid);
  },
}));

function encodeGrid(state: Grid): string {
  const plain = Array.from(state.entries()); //Convert map to array for JSON serialization
  const json = JSON.stringify(plain);
  const deflated = deflateRaw(json);
  return btoa(String.fromCharCode(...deflated));
}

function decodeGrid(base64: string): Grid {
  try {
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const json = inflateRaw(bytes, { to: "string" });
    const entries: [string, Cell][] = JSON.parse(json);
    return new Map(entries);
  } catch (e) {
    console.error("Failed to decode state from URL: ", e);
    return defaultGrid();
  }
}
