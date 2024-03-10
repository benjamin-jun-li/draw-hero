import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { cn, colorToHex, getContrastingTextColor } from "@/lib/utils";
import { NoteProps } from "@/lib/types";
import { useMutation } from "@/liveblocks.config";
import { calcFontSize } from "./text";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const Note = ({ layer, onPointerDown, selectionColor, id }: NoteProps) => {
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
        backgroundColor: fill ? colorToHex(fill) : "#eee",
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        html={value || ""}
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none",
          font.className
        )}
        style={{
          color: fill ? getContrastingTextColor(fill) : "#eee",
          fontSize: calcFontSize(width, height),
        }}
        onChange={onTextChange}
      />
    </foreignObject>
  );
};

export default Note;
