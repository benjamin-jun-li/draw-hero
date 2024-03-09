import { ColorButtonProps, ColorPickerProps } from "@/lib/types";
import { colorToHex } from "@/lib/utils";

const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-300">
      <ColorBtn onClick={onChange} color={{ r: 243, g: 82, b: 100 }} />
      <ColorBtn color={{ r: 255, g: 249, b: 177 }} onClick={onChange} />
      <ColorBtn color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
      <ColorBtn color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
      <ColorBtn color={{ r: 155, g: 105, b: 245 }} onClick={onChange} />
      <ColorBtn color={{ r: 252, g: 142, b: 42 }} onClick={onChange} />
      <ColorBtn color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
      <ColorBtn color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
    </div>
  );
};

const ColorBtn = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      onClick={() => onClick(color)}
      className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
    >
      <div className="h-8 w-8 rounded-md border border-neutral-400" style={{ background: colorToHex(color)}}></div>
    </button>
  );
};

export default ColorPicker;
