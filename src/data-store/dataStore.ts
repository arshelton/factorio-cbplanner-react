import { create } from "zustand";
import { deflateRaw, inflateRaw } from "pako";
import { Grid } from "../types/mainTypes";

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

interface GridState {
  grid: Grid;
  setGrid: (grid: Grid) => void;
}

function encodeGrid(state: Grid): string {
  console.log("encodeGrid");
  const json = JSON.stringify(state);
  const deflated = deflateRaw(json);
  return btoa(String.fromCharCode(...deflated));
}

function decodeGrid(base64: string): Grid {
  console.log("decodeGrid");
  try {
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const json = inflateRaw(bytes, { to: "string" });
    return JSON.parse(json) as Grid;
  } catch (e) {
    console.error("Failed to decode state from URL: ", e);
    return defaultGrid();
  }
}

const getInitialData = (): Grid => {
  const hash = window.location.hash;
  if (hash.startsWith("#grid=")) {
    try {
      return decodeGrid(hash.slice(5));
    } catch {
      console.log("Failed to decode URL state");
    }
  }
  return defaultGrid();
};

export const useGridState = create<GridState>()((set) => ({
  grid: getInitialData(),

  setGrid: (newGrid) => {
    const nextState = newGrid;
    const encoded = encodeGrid(nextState);
    window.history.replaceState(null, "", `#grid=${encoded}`);
    set({ grid: newGrid });
  },
}));
