import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
