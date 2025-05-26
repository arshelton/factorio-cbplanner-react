import sslayout from "./sslayout.json";
import ssinfo from "./ssinfo.json";

type SpriteInfo = {
  x: number;
  y: number;
  width: number;
  height: number;
};
type SpriteLayout = Record<string, SpriteInfo>;

type LayoutInfo = {
  height: number;
  width: number;
  padding: number;
};

type Props = {
  size: number;
  iconName: string;
};

function Icon({ size, iconName }: Props) {
  const { x, y, width, height } = (sslayout as SpriteLayout)[iconName];
  const { width: ssWidth, height: ssHeight, padding } = ssinfo as LayoutInfo;

  const xScale = size / width;
  const yScale = size / height;
  const adjX = x * xScale;
  const adjY = y * yScale;
  const adjSSWidth = ssWidth * xScale;
  const adjSSHeight = ssHeight * yScale;
  const adjPaddingX = padding * xScale;
  const adjPaddingY = padding * yScale;

  return (
    <div
      className="bg-no-repeat"
      style={{
        backgroundImage: `url('/spritesheet.png')`,
        backgroundPosition: `-${adjX + adjPaddingX}px -${adjY + adjPaddingY}px`,
        backgroundSize: `${adjSSWidth}px ${adjSSHeight}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></div>
  );
}

export default Icon;
