import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Camera, Color, Point, Side, XYWH } from "./types";
import { HeartIcon } from "lucide-react";

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
