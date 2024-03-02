"use client";
import { BoardListProps } from "@/lib/types";
import Image from "next/image";
import { Button } from "../ui/button";

const BoardList = ({ orgID, searchParams }: BoardListProps) => {
  const data = [];

  if (!data?.length && searchParams.search) return <EmptySearch />;

  if (!data?.length && searchParams.favorites) return <EmptyFav />;

  if (!data?.length) return <EmptyData />;

  return <div>{JSON.stringify(searchParams)}</div>;
};

const EmptyData = () => {
  return (
    <div className="h-4/5 flex flex-col justify-center items-center">
      <Image src="./empty-box.svg" alt="empty board" width={200} height={200} />
      <h2 className="text-2xl font-semibold">Create your first board!</h2>
      <p className="text-muted-foreground text-md">
        Start by creating a board for your organization
      </p>
      <Button className="mt-3" size="lg">
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
