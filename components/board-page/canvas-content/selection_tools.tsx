import { useSelectionBounds } from "@/lib/hooks/use_selection_bounds";
import { SelectionToolsProps, Color } from "@/lib/types";
import { useMutation, useSelf } from "@/liveblocks.config";
import { memo } from "react";
import ColorPicker from "./canvas_gadgets/color_picker";
import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";
import { useDeleteLayers } from "@/lib/hooks/use_delete_layers";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const moveToBack = useMutation(({ storage }) => {
      const liveLayersIDs = storage.get("layerIds");
      const arr = liveLayersIDs.toImmutable();
      const indices: number[] = [];
      for (let i = 0; i < arr.length; ++i) {
        if (selection.includes(arr[i])) indices.push(i);
      }

      for (let i = 0; i < indices.length; ++i) {
        liveLayersIDs.move(indices[i], i);
      }
    }, [selection]);

    const bringToFront = useMutation(({ storage }) => {
      const liveLayersIDs = storage.get("layerIds");
      const arr = liveLayersIDs.toImmutable();
      const indices: number[] = [];
      for (let i = 0; i < arr.length; ++i) {
        if (selection.includes(arr[i])) indices.push(i);
      }

      for (let i = indices.length - 1; i >= 0; --i) {
        liveLayersIDs.move(
          indices[i],
          arr.length - 1 - (indices.length - 1 - i)
        );
      }
    }, [selection]);

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    const deleteLayers = useDeleteLayers();
    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) return null;
    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;
    return (
      <aside
        className="absolute p-3 rounded-xl bg-neutral-50 shadow-sm border flex select-none"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
        }}
      >
        <ColorPicker onChange={setFill} />
        <div className="flex flex-col gap-y-0.5">
          <Hint label="Bring to front">
            <Button onClick={bringToFront} variant="board" size="icon">
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="Send to back" side="bottom">
            <Button onClick={moveToBack} variant="board" size="icon">
              <SendToBack />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center pl-2 ml-2 border-l border-neutral-300">
          <Hint label="Delete">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </aside>
    );
  }
);

SelectionTools.displayName = "SelectionTools";

export default SelectionTools;
