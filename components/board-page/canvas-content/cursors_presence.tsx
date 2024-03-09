"use client";
import { memo } from "react";
import { useOthersConnectionIds } from "@/liveblocks.config";
import Cursor from "./canvas_gadgets/cursor";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return ids.map((connID) => <Cursor key={connID} connectionID={connID} />);
};

const CursorsPresence = memo(() => {
  return (
    <>
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
export default CursorsPresence;
