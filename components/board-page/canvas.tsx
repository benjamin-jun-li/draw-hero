"use client";
import { Camera, CanvasMode, CanvasProps, CanvasState } from "@/lib/types";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
} from "@/liveblocks.config";
import React, { useCallback, useState } from "react";
import { CursorsPresence } from "./cursors_presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";

const Canvas = ({ boardID }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const curr = pointerEventToCanvasPoint(e, camera);
      setMyPresence({ cursor: curr });
    },
    []
  );

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      setCamera((camera) => ({
        x: camera.x - e.deltaX,
        y: camera.y - e.deltaY,
      })); 
    },
    []
  );

  return (
    <main className="h-full w-full bg-neutral-200 touch-none">
      <Info boardID={boardID} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
