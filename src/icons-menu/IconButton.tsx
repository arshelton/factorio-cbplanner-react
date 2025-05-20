type SpriteInfo = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Props = {
  name: string;
  spriteInfo: SpriteInfo;
};

function IconButton({ name, spriteInfo }: Props) {
  const { x, y, width, height } = spriteInfo;

  return (
    <button
      className="w-[40px] h-[40px] bg-no-repeat bg-[length:auto] bg-[image:var(--sprite-url)]"
      style={{
        backgroundImage: `url('/spritesheet.png')`,
        backgroundPosition: `-${x}px -${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      title={name}
    />
  );
}

export default IconButton;
