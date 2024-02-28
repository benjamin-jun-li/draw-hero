"use client";
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <button className="bg-white/25 w-full h-full rounded-full p-1 opacity-70 hover:opacity-100 grid place-items-center">
            <Plus className="text-white" />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none w-fit sm:max-w-[480px]">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};

export default NewButton;
