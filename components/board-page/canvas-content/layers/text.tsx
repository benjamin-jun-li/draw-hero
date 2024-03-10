import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { cn, colorToHex } from "@/lib/utils";
import { TextProps } from "@/lib/types";
import { useMutation } from "@/liveblocks.config";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

export const calcFontSize = (width: number, height: number, maxSize?: number) => {
  const maxFontSize = maxSize || 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;
  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

const Text = ({ layer, id, onPointerDown, selectionColor }: TextProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateTextVal = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const onTextChange = (e: ContentEditableEvent) =>
    updateTextVal(e.target.value);

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? "1px solid " + selectionColor : "none",
      }}
    >
      <ContentEditable
        html={value || "Text"}
        className={cn(
          "h-full w-full  flex items-center justify-center text-center drop-shadow-md outline-none",
          font.className
        )}
        style={{
          color: fill ? colorToHex(fill) : "#eee",
          fontSize: calcFontSize(width, height),
        }}
        onChange={onTextChange}
      />
    </foreignObject>
  );
};

export default Text;
