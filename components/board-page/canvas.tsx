"use client";
import { nanoid } from "nanoid";
import {
  Camera,
  CanvasLayerType,
  CanvasMode,
  CanvasProps,
  CanvasState,
  Color,
  Point,
  Side,
  XYWH,
} from "@/lib/types";
import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
  useOthersMapped,
} from "@/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import React, { useCallback, useMemo, useState } from "react";
import Info from "./canvas-content/info";
import Participants from "./canvas-content/participants";
import Toolbar from "./canvas-content/toolbar";
import LayerPreview from "./canvas-content/layers/layer_preview";
import CursorsPresence from "./canvas-content/cursors_presence";
import {
  connectionIdToColor,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "@/lib/utils";
import SelectionBox from "./canvas-content/selection_box";

const MAX_LAYERS = 150;

const Canvas = ({ boardID }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | CanvasLayerType.Ellipse
        | CanvasLayerType.Rectangle
        | CanvasLayerType.Note
        | CanvasLayerType.Text,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) return;

      const liveLayerIDs = storage.get("layerIds");
      const layerID = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });
      liveLayerIDs.push(layerID);
      liveLayers.set(layerID, layer);

      setMyPresence({ selection: [layerID] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) return;

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      console.log(corner, initialBounds);

      history.pause();
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history]
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer]
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const curr = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(curr);
      }

      setMyPresence({ cursor: curr });
    },
    [canvasState, resizeSelectedLayer, camera]
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const selections = useOthersMapped((other) => other.presence.selection);
  const layerIDsToColorSelection = useMemo(() => {
    const layerIDsToColorSelection: Record<string, string> = {};
    for (const user of selections) {
      const [connectionId, selection] = user;
      for (const layerID of selection) {
        layerIDsToColorSelection[layerID] = connectionIdToColor(connectionId);
      }
    }
    return layerIDsToColorSelection;
  }, [selections]);

  const onLayerPointDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerID: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      )
        return;

      history.pause();
      e.stopPropagation();
      const point = pointerEventToCanvasPoint(e, camera);
      if (!self.presence.selection.includes(layerID)) {
        setMyPresence({ selection: [layerID] }, { addToHistory: true });
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode]
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
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointDown={onLayerPointDown}
              selectionColor={layerIDsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
