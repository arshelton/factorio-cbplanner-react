import IconButton from "./IconButton";

type Props = {
  rows: string[][];
};

function IconGrid({ rows }: Props) {
  return (
    <div className="space-y-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap gap-2">
          {row.map((iconName) => (
            <IconButton key={iconName} name={iconName} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default IconGrid;
