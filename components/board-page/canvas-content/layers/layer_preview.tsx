"use client";
import { memo } from "react";
import { CanvasLayerType, LayerPreviewProps } from "@/lib/types";
import { useStorage } from "@/liveblocks.config";
import Rectangle from "./rectangle";
import Ellipse from "./ellipse";
import Text from "./text";
import Note from "./note";

const LayerPreview = memo(
  ({ id, onLayerPointDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) return null;

    switch (layer.type) {
      case CanvasLayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        );
      case CanvasLayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        );
      case CanvasLayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        );
      case CanvasLayerType.Note:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        );
      default:
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";

export default LayerPreview;
