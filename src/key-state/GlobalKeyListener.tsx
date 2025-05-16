import { useEffect } from "react";
import { useKeyState } from "../key-state/keyState";

const GlobalKeyListener = () => {
  const setKey = useKeyState((state) => state.setKey);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") setKey("shift", true);
      //   if (e.key === "Control") setKey("ctrl", true);
      //   if (e.key === "Alt") setKey("alt", true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") setKey("shift", false);
      //   if (e.key === "Control") setKey("ctrl", false);
      //   if (e.key === "Alt") setKey("alt", false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [setKey]);

  return null;
};

export default GlobalKeyListener;
