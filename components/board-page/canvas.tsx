"use client";
import { CanvasMode, CanvasProps } from "@/lib/types";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useHistory, useCanRedo, useCanUndo } from "@/liveblocks.config";
import { useState } from "react";
import { CanvasState } from "@/lib/types";

const Canvas = ({ boardID }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  return (
    <main className="h-full w-full bg-neutral-200 touch-none">
      <Info boardID={boardID} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={!canRedo}
        canUndo={!canUndo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  );
};

export default Canvas;
