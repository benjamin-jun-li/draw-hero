import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import {
  Camera,
  CanvasLayerType,
  Color,
  Layer,
  PathLayer,
  Point,
  Side,
  XYWH,
} from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const colors = [
  "#ffb2e6",
  "#ffffe8",
  "#8447FF",
  "#DD6031",
  "#D9DD92",
  "#967AA1",
  "#FFC07F",
  "#721121",
  "#FFC07F",
  "#4D6A6D",
  "#983628",
  "#A5B452",
  "#D9B8C4",
  "#EAF27C",
  "#4FB0C6",
];

export const connectionIdToColor = (connId: number): string => {
  return colors[connId % colors.length];
};

export const pointerEventToCanvasPoint = (
  e: React.PointerEvent,
  camera: Camera
) => {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
};

export const colorToHex = (color: Color): string => {
  const pattern = (pos: number) => `${pos.toString(16).padStart(2, "0")}`;
  return "#" + pattern(color.r) + pattern(color.g) + pattern(color.b);
};

export const resizeBounds = (
  bounds: XYWH,
  corner: Side,
  point: Point
): XYWH => {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
};

export const findIntersectingLayersWithRectangle = (
  layerIDs: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point
) => {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids = [];

  for (const layerID of layerIDs) {
    const layer = layers.get(layerID);
    if (!layer) continue;

    const { x, y, height, width } = layer;

    if (
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height
    ) {
      ids.push(layerID);
    }
  }

  return ids;
};

export const getContrastingTextColor = (color: Color): string => {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
  return luminance > 182 ? "black" : "white";
};

export const penPointsToPathLayer = (
  points: number[][],
  color: Color
): PathLayer => {
  if (points.length < 2)
    throw new Error("Cannot transform points with less than 2 points");

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;
    if (left > x) left = x;
    if (top > y) top = y;
    if (right < x) right = x;
    if (bottom < y) bottom = y;
  }

  return {
    type: CanvasLayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
};

export const getSvgPathFromStroke = (stroke: number[][]) : string => {
  if (!stroke.length) return "";
  
  const d = stroke.reduce((acc, [x0, y0], i, arr) => {
    const [x1, y1] = arr[(i + 1) % arr.length];
    acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
    return acc
  }, ["M", ...stroke[0], "Q"]);

  d.push("Z");
  return d.join(" ");
}