import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import ToolBtn from "./tool_button";
import { CanvasLayerType, CanvasMode, ToolBarProps } from "@/lib/types";

const Toolbar = ({
  canvasState,
  setCanvasState,
  redo,
  canRedo,
  undo,
  canUndo,
}: ToolBarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <ul className="bg-neutral-100 rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <li>
          <ToolBtn
            label="Select"
            icon={MousePointer2}
            onClick={() => setCanvasState({ mode: CanvasMode.None })}
            isActive={
              [
                CanvasMode.None,
                CanvasMode.Translating,
                CanvasMode.SelectionNet,
                CanvasMode.Pressing,
                CanvasMode.Resizing,
              ].indexOf(canvasState.mode) !== -1
            }
          />
        </li>
        <li>
          <ToolBtn
            label="Text"
            icon={Type}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: CanvasLayerType.Text,
              })
            }
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === CanvasLayerType.Text
            }
          />
        </li>
        <li>
          <ToolBtn
            label="Sticky Note"
            icon={StickyNote}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: CanvasLayerType.Note,
              })
            }
            isActive={canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === CanvasLayerType.Note}
          />
        </li>
        <li>
          <ToolBtn
            label="Rectangle"
            icon={Square}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: CanvasLayerType.Rectangle,
            })}
            isActive={canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === CanvasLayerType.Rectangle}
          />
        </li>
        <li>
          <ToolBtn
            label="Ellips"
            icon={Circle}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: CanvasLayerType.Ellipse,
            })}
            isActive={canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === CanvasLayerType.Ellipse}
          />
        </li>
        <li>
          <ToolBtn
            label="Pen"
            icon={Pencil}
            onClick={() => setCanvasState({
              mode: CanvasMode.Pencil,
            })}
            isActive={canvasState.mode === CanvasMode.Pencil}
          />
        </li>
      </ul>
      <ul className="bg-neutral-100 rounded-md p-1.5 flex flex-col items-center shadow-md">
        <li>
          <ToolBtn
            label="Undo"
            icon={Undo2}
            onClick={undo}
            isDisabled={canUndo}
          />
        </li>
        <li>
          <ToolBtn
            label="Redo"
            icon={Redo2}
            onClick={redo}
            isDisabled={canRedo}
          />
        </li>
      </ul>
    </div>
  );
};

Toolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-neutral-100 h-[360px] w-[52px] shadow-md rounded-md"></div>
  );
};

export default Toolbar;
