import { useKeyState } from "../key-state/keyState";
import { RegularCell } from "../types/mainTypes";

type SubCellId =
  | "top-left"
  | "top"
  | "top-right"
  | "left"
  | "center"
  | "right"
  | "bottom-left"
  | "bottom"
  | "bottom-right";

function RegularCellBlock({ data }: { data: RegularCell }) {
  const shiftDown = useKeyState((state) => state.shift);

  return (
    <div
      className="
        grid [grid-template-columns:16px_1fr_16px] [grid-template-rows:16px_1fr_16px] 
        w-16 h-16 
        bg-secondary border border-secondary-content"
    >
      <div className="flex items-center justify-center hover:bg-base-content"></div>
      <div className="flex items-center justify-center hover:bg-base-content"></div>
      <div className="flex items-center justify-center hover:bg-base-content"></div>
      <div className="flex items-center justify-center hover:bg-base-content"></div>
      <div className="flex items-center justify-center hover:bg-base-content"></div>
      <div className="flex items-center justify-center hover:bg-base-content"></div>
      <div className="flex items-center justify-center hover:bg-base-content"></div>
      <div className="flex items-center justify-center hover:bg-base-content"></div>
      <div className="flex items-center justify-center hover:bg-base-content"></div>
    </div>
  );
}

export default RegularCellBlock;
