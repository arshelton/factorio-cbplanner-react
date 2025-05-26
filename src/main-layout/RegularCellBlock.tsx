import { useGridState } from "../data-store/dataStore";
import Icon from "../icons-menu/Icon";
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

type Props = {
  data: RegularCell;
  cellKey: string;
};

function RegularCellBlock({ data, cellKey }: Props) {
  const shiftDown = useKeyState((state) => state.shift);

  const { setSelectedKey } = useGridState();

  const handleClick = () => {
    setSelectedKey(cellKey);
    (document.getElementById("menu-modal") as HTMLDialogElement)?.showModal();
  };

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
      <div
        className="flex items-center justify-center hover:bg-base-content"
        onClick={handleClick}
      >
        {data.icons[0] && <Icon iconName={data.icons[0]} size={24} />}
      </div>
      <div className="flex items-center justify-center hover:bg-base-content"></div>
      <div className="flex items-center justify-center hover:bg-base-content"></div>
      <div className="flex items-center justify-center hover:bg-base-content"></div>
      <div className="flex items-center justify-center hover:bg-base-content"></div>
    </div>
  );
}

export default RegularCellBlock;
