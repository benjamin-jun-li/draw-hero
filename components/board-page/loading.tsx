"use client";

import { Loader } from "lucide-react";
import Info from "./canvas-content/info";
import Participants from "./canvas-content/participants";
import Toolbar from "./canvas-content/toolbar";
const Loading = () => {
  return (
    <main className="h-full w-full bg-neutral-200 touch-none grid place-items-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  );
};

export default Loading;
