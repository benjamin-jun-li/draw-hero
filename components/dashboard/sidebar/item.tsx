"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { OrgItemProps } from "@/lib/types";

const Item = ({ id, name, imageUrl }: OrgItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;
  return (
    <div className="aspect-square relative">
      <Image
        fill
        src={imageUrl}
        alt={name}
        onClick={() => {
          if (!setActive) return;
          setActive({organization: id});
        }}
        className={cn("rounded-md cursor-pointer opacity-75 hover:opacity-100")}
      />
    </div>
  );
};

export default Item;
