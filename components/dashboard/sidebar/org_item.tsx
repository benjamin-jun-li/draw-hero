"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { OrgItemProps } from "@/lib/types";
import Hint from "@/components/hint";

const OrgItem = ({ id, name, imageUrl }: OrgItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;
  return (
    <Hint
      label={name}
      side="right"
      align="start"
      sideOffset={12}
      alignOffset={-17}
    >
      <Image
        src={imageUrl}
        alt={name}
        onClick={() => {
          if (!setActive) return;
          setActive({ organization: id });
        }}
        width={60}
        height={60}
        className={cn(
          "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
          isActive && "opacity-100"
        )}
      />
    </Hint>
  );
};

export default OrgItem;
