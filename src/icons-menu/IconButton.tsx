import { useGridState } from "../data-store/dataStore";
import Icon from "./Icon";

type Props = {
  name: string;
};

const SIZE = 60;

function IconButton({ name }: Props) {
  const { selectedKey, selectedSide, addIcon } = useGridState();

  const handleClick = () => {
    if (selectedKey) {
      if (selectedSide !== null) {
        addIcon(selectedKey, name, selectedSide);
      } else {
        addIcon(selectedKey, name);
      }
    }
    (document.getElementById("menu-modal") as HTMLDialogElement)?.close();
  };

  return (
    <button
      className="btn btn-ghost p-0 min-w-0 min-h-0"
      style={{ width: SIZE, height: SIZE }}
      onClick={handleClick}
    >
      <Icon size={SIZE} iconName={name} />
    </button>
  );
}

export default IconButton;
