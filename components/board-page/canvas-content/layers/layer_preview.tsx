"use client";
import { memo } from "react";
import { CanvasLayerType, LayerPreviewProps } from "@/lib/types";
import { useStorage } from "@/liveblocks.config";
import Rectangle from "./rectangle";

const LayerPreview = memo(
  ({ id, onLayerPointDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));
    console.log(layer);

    if (!layer) return null;

    switch (layer.type) {
      case CanvasLayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        );
      default:
        console.warn("Unknown layer type");
    }
    return <></>;
  }
);

LayerPreview.displayName = "LayerPreview";

export default LayerPreview;
