"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { Menu } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { InfoProps } from "@/lib/types";
import { useQuery } from "convex/react";
import { font } from "../../dashboard/org_sidebar";
import Hint from "../../hint";
import Actions from "../../actions";
import useRenameModal from "@/store/use_rename_modal";

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5"></div>;
};

const Info = ({ boardID }: InfoProps) => {
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, {
    id: boardID as Id<"boards">,
  });

  if (!data) return <Info.Skeleton />;

  return (
    <div className="absolute top-2 left-2 bg-neutral-100 rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Link href="/dashboard">
          <Button variant="board" className="px-2">
            <Image src="/logo.svg" alt="logo" width={40} height={40} />
            <span
              className={cn("text-xl ml-2 text-neutral-900", font.className)}
            >
              Board
            </span>
          </Button>
        </Link>
      </Hint>
      <TabSeparator />
      <Hint label="Edit Title" side="bottom" sideOffset={10}>
        <Button
          onClick={() => onOpen(data._id, data.title)}
          variant="board"
          className="text-base font-normal px-2"
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </>
      </Actions>
    </div>
  );
};

Info.Skeleton = function InfoSkeletion() {
  return (
    <div className="absolute top-2 left-2 bg-neutral-100 rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"></div>
  );
};

export default Info;
