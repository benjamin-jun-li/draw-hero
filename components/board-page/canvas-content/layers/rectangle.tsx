import { RectangleProps } from "@/lib/types";
import { colorToHex } from "@/lib/utils";

const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill } = layer;
  return (
    <rect
      className="drop-shadow-md "
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? colorToHex(fill) : "#eee"}
      stroke={selectionColor || "transparent"}
    />
  );
};

export default Rectangle;
