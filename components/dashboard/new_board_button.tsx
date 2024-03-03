"use client";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/lib/hooks/use_api_mutation";
import { NewBoardButtonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const NewBoardButton = ({ orgID, disabled }: NewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.create);
  const handleClick = () => {
    mutate({
      orgID,
      title: "Untitled",
    })
    .then(id => toast.success("Board created"))
    .catch(() => toast.error("Failed to create board"));
  };
  return (
    <button
      disabled={pending || disabled}
      onClick={handleClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-500 rounded-lg hover:shadow-xl hover:from-emerald-500 hover:via-cyan-600 hover:to-blue-700 flex flex-col items-center justify-center py-6",
        (pending || disabled) && "opacity-75"
      )}
    >
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-md text-slate-100">New Board</p>
    </button>
  );
};

export default NewBoardButton;
