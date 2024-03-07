"use client";
import { connectionIdToColor } from "@/lib/utils";
import UserAvatar from "./user_avatar";
import { useOthers, useSelf } from "@/liveblocks.config";

const MAX_OTHERUSER_SHOWN = 3;

const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_OTHERUSER_SHOWN;
  return (
    <div className="absolute h-12 top-2 right-2 bg-neutral-100 rounded-md p-3 flex items-center shadow-md">
      {users.slice(0, MAX_OTHERUSER_SHOWN).map(({ connectionId, info }) => (
        <UserAvatar
          key={connectionId}
          src={info?.picture}
          name={info?.name}
          fallback={info?.name?.[0] || "T"}
          borderColor={connectionIdToColor(connectionId)}
        ></UserAvatar>
      ))}
      {currentUser && (
        <UserAvatar
          src={currentUser.info?.picture}
          name={`${currentUser.info?.name} (You)`}
          fallback={currentUser.info?.name?.[0]}
          borderColor={connectionIdToColor(currentUser.connectionId)}
        ></UserAvatar>
      )}
      {hasMoreUsers && (
        <UserAvatar name={`${users.length - MAX_OTHERUSER_SHOWN} more`} fallback={`+${users.length - MAX_OTHERUSER_SHOWN}`}></UserAvatar>
      )}
    </div>
  );
};

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-neutral-100 rounded-md p-3 flex items-center shadow-md w-[100px]"></div>
  );
};

export default Participants;
