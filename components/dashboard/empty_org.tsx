import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { CreateOrganization } from "@clerk/nextjs";
import EmptyGif from "@/public/empty-org-gif.gif";

const EmptyOrg = () => {
  return (
    <div className="flex flex-col justify-start items-center h-full">
      <Image
        className="-mt-[4rem]"
        src={EmptyGif}
        alt="empty org"
        width={500}
        height={400}
      />
      <h2 className="-mt-8 text-2xl font-semibold">Welcome to Board</h2>
      <p className="text-muted-foreground text-md mt-1">
        Create an organization to get started
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-2" size="lg">
            Create Organization
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
          <CreateOrganization />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmptyOrg;
