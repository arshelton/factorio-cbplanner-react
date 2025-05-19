import { useGridState } from "../data-store/dataStore";

function AddButton({ coord }: { coord: string }) {
  const { addCell } = useGridState();

  return (
    <button className="btn btn-md btn-secondary" onClick={() => addCell(coord)}>
      +
    </button>
  );
}

export default AddButton;
