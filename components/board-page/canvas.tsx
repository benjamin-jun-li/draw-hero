"use client";
import { CanvasProps } from "@/lib/types";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

const Canvas = ({ boardID }: CanvasProps ) => {
  return (
    <main className="h-full w-full bg-neutral-200 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
