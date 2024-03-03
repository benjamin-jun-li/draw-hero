"use client";
import { ActionsProps } from "@/lib/types";
import { Link2, Pencil, Trash2 } from "lucide-react";
import ConfirmModal from "./confirm_modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useApiMutation } from "@/lib/hooks/use_api_mutation";
import { api } from "@/convex/_generated/api";
import useRenameModal from "@/store/use_rename_modal";

const Actions = ({ children, side, sideOffset, title, id }: ActionsProps) => {
  const { onOpen } = useRenameModal();
  const { mutate, pending } = useApiMutation(api.board.remove);
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Copy failed"));
  };
  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete board"));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="h-4 w-4 mr-2" />
          Copy Board Link
        </DropdownMenuItem>
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => onOpen(id, title)}>
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete board?"
          description="This will delete the board and all of its contents."
          onConfirm={onDelete}
          disabled={pending}
        >
          <Button
            variant="ghost"
            className="text-sm p-3 cursor-pointer w-full justify-start font-normal"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove Board
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
