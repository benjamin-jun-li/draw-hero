import { colorToHex } from "@/lib/utils";
import { EllipseLayer, EllipseProps } from "@/lib/types";

const Ellipse = ({
  id,
  onPointerDown,
  layer,
  selectionColor,
}: EllipseProps) => {
  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{ transform: `translate(${layer.x}px, ${layer.y}px)` }}
      cx={layer.width / 2}
      cy={layer.height / 2}
      rx={layer.width / 2}
      ry={layer.height / 2}
      fill={layer.fill ? colorToHex(layer.fill) : "#000"}
    />
  );
};

export default Ellipse;
