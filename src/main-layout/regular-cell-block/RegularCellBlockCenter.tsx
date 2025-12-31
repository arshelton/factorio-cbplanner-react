import { useRouteState } from "../../data-store/dataStore";
import Icon from "../../icons-menu/Icon";
import { RegularCell, RoutePosition } from "../../types/mainTypes";

type Props = {
  cellData: RegularCell;
  cellKey: string;
};

function RegularCellBlockCenter({ cellData, cellKey }: Props) {
  const setHoveredPosition = useRouteState((s) => s.setHoveredPosition);

  return (
    <div
      className="flex items-center justify-center hover:bg-base-content overflow-hidden"
      onMouseEnter={() =>
        setHoveredPosition({ position: RoutePosition.Center, key: cellKey })
      }
    >
      {cellData.icons.length === 1 && (
        <Icon iconName={cellData.icons[0]} size={32} />
      )}
      {cellData.icons.length >= 2 && cellData.icons.length <= 4 && (
        <div className="grid grid-cols-2 grid-rows-2">
          {cellData.icons.map((icon, i) => (
            <Icon key={i} iconName={icon} size={16} />
          ))}
        </div>
      )}
      {cellData.icons.length >= 5 && cellData.icons.length <= 9 && (
        <div className="grid grid-cols-3 grid-rows-3 gap-[1px]">
          {cellData.icons.map((icon, i) => (
            <Icon key={i} iconName={icon} size={10} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RegularCellBlockCenter;
