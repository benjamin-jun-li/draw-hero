"use client";
import { BoardListProps } from "@/lib/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/lib/hooks/use_api_mutation";
import { toast } from "sonner";
import BoardCard from "./board-card/board_card";
import NewBoardButton from "./new_board_button";

const BoardList = ({ orgID, searchParams }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgID });

  if (data === undefined) return (
    <>
      <h2 className="text-3xl">
        {searchParams.favorites ? "Favorite Boards" : "Team boards"}
      </h2>
      <div className="container px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        <NewBoardButton orgID={orgID} disabled />
        <BoardCard.Skeleton />
        <BoardCard.Skeleton />
        <BoardCard.Skeleton />
        <BoardCard.Skeleton />
      </div>
    </> 
  );

  if (!data?.length && searchParams.search) return <EmptySearch />;

  if (!data?.length && searchParams.favorites) return <EmptyFav />;

  if (!data?.length) return <EmptyData />;

  return (
    <>
      <h2 className="text-3xl">
        {searchParams.favorites ? "Favorite Boards" : "Team boards"}
      </h2>
      <div className="container px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        <NewBoardButton orgID={orgID}/>
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorID={board.authorID}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgID={board.orgID}
            isFavorite={false}
          />
        ))}
      </div>
    </>
  );
};

/**
 * @Info The components below are sub components for this board list
 */
const EmptyData = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const handleClick = () => {
    if (!organization) return;

    mutate({
      orgID: organization.id,
      title: "untitled",
    })
      .then((id) => {
        toast.success("Board created");
        //TODO redirect to board
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <div className="h-4/5 flex flex-col justify-center items-center">
      <Image src="./empty-box.svg" alt="empty board" width={200} height={200} />
      <h2 className="text-2xl font-semibold">Create your first board!</h2>
      <p className="text-muted-foreground text-md">
        Start by creating a board for your organization
      </p>
      <Button
        disabled={pending}
        className="mt-3"
        size="lg"
        onClick={handleClick}
      >
        Create Board
      </Button>
    </div>
  );
};

const EmptyFav = () => {
  return (
    <div className="h-4/5 flex flex-col justify-center items-center">
      <Image src="./empty-fav.svg" alt="empty fav" width={200} height={200} />
      <h2 className="text-2xl font-semibold">No favorite boards</h2>
      <p className="mt-1 text-muted-foreground text-md">
        Try favoriting a board!
      </p>
    </div>
  );
};

const EmptySearch = () => {
  return (
    <div className="h-4/5 flex flex-col justify-center items-center">
      <Image
        src="./empty-search.svg"
        alt="empty search"
        width={200}
        height={200}
      />
      <h2 className="text-2xl font-semibold">No results found!</h2>
      <p className="mt-1 text-muted-foreground text-md">
        Try searching for something else!
      </p>
    </div>
  );
};

export default BoardList;
