"use client";
import { BoardCardProps } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import Overlay from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import CardContent from "./card_content";
import Actions from "@/components/actions";
import { useApiMutation } from "@/lib/hooks/use_api_mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const BoardCard = ({
  id,
  title,
  authorName,
  authorID,
  createdAt,
  imageUrl,
  orgID,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorID ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite
  );
  const { mutate: onUnFavorite, pending: pendingUnFavorite } = useApiMutation(
    api.board.unfavorite
  );

  const toggleFav = () => {
    if (isFavorite) {
      onUnFavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
    } else {
      onFavorite({ id }).catch(() => toast.error("Failed to favorite"));
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div
        className="group aspect-[100/127] border rounded-lg 
            flex flex-col justify-between overflow-hidden"
      >
        <div className="relative flex-1 bg-slate-50">
          <Image
            src={imageUrl}
            alt="board-img"
            fill
            className="object-contain"
          />
          <Overlay />
          <Actions id={id} title={title} side="right" sideOffset={10}>
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-slate-100 opacity-60 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <CardContent
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFav}
          disabled={pendingFavorite || pendingUnFavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeletion() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default BoardCard;
