import { RectangleProps } from "@/lib/types";
import { colorToHex } from "@/lib/utils";

const Rectangle = ({
  id,
  layer,
  onPointDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill } = layer;
  return (
    <rect
      className="drop-shadow-md "
      onPointerDown={(e) => onPointDown(e, id)}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? colorToHex(fill) : "#CCC"}
      stroke={selectionColor || "transparent"}
    />
  );
};

export default Rectangle;
