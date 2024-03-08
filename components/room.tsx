"use client";
import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";
import { RoomProps } from "@/lib/types";

const Room = ({ children, roomID, fallback }: RoomProps) => {
  return (
    <RoomProvider id={roomID} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
