"use client";
import { memo } from "react";
import { connectionIdToColor } from "@/lib/utils";
import { CursorProps } from "@/lib/types";
import { useOther } from "@/liveblocks.config";
import { MousePointer2 } from "lucide-react";

const Cursor = ({ connectionID }: CursorProps) => {
  const info = useOther(connectionID, (user) => user?.info);
  const cursor = useOther(connectionID, (user) => user.presence.cursor);

  const name = info?.name || "Teammate";

  if (!cursor) return null;
  const { x, y } = cursor;

  return (
    <foreignObject
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md z-10"
    >
      <div>
        <MousePointer2
          className="h-5 w-5"
          style={{
            fill: connectionIdToColor(connectionID),
            color: connectionIdToColor(connectionID),
          }}
        />
      </div>

      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
        style={{ backgroundColor: connectionIdToColor(connectionID) }}
      >
        {name}
      </div>
    </foreignObject>
  );
};

Cursor.displayName = "Cursor";
export default Cursor;