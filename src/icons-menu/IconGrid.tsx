import IconButton from "./IconButton";

type Props = {
  rows: string[][];
  sslayout: Record<
    string,
    { x: number; y: number; width: number; height: number }
  >;
};

function IconGrid({ rows, sslayout }: Props) {
  return (
    <div className="space-y-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap gap-2">
          {row.map((iconName) => (
            <IconButton
              key={iconName}
              name={iconName}
              spriteInfo={sslayout[iconName]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default IconGrid;
