"use client";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";
import { RoomProvider } from "@/liveblocks.config";
import { RoomProps, Layer } from "@/lib/types";
const Room = ({ children, roomID, fallback }: RoomProps) => {
  return (
    <RoomProvider
      id={roomID}
      initialPresence={{ cursor: null, selection: [], pencilDraft: null, penColor: null }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
