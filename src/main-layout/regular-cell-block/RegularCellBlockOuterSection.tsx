import { useRouteState } from "../../data-store/dataStore";
import { RoutePosition } from "../../types/mainTypes";

type Props = {
  position: RoutePosition;
  cellKey: string;
};

function RegularCellBlockOuterSection({ position, cellKey }: Props) {
  const setHoveredPosition = useRouteState((s) => s.setHoveredPosition);

  return (
    <div
      onMouseEnter={() =>
        setHoveredPosition({ position: position, key: cellKey })
      }
    />
  );
}

export default RegularCellBlockOuterSection;
