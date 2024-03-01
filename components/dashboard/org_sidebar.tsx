"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Logo from "@/public/logo.svg";
import { LayoutDashboard, Star } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const OrgSideBar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  return (
    <aside className="hidden lg:flex flex-2 flex-col items-center justify-start gap-y-4 h-full p-2 w-fit">
      <Link className="flex items-center space-x-1" href={"/"}>
        <Image alt="logo" src={Logo} height={50} width={50} />
        <span className={cn("font-semibold text-xl", font.className)}>
          DrawHero
        </span>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              borderRadius: "8px",
              width: "100%",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />
      <div className="w-full flex flex-col gap-y-2">
        <Button
          asChild
          size="lg"
          variant={favorites ? "ghost" : "secondary"}
          className="w-full"
        >
          <Link href={"/"} className="px-0 flex-nowrap">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team Boards
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant={favorites ? "secondary" : "ghost"}
          className="w-full"
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
            className="px-0 flex-nowrap"
          >
            <Star className="h-4 w-4 mr-2" />
            Favorite Boards
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default OrgSideBar;
