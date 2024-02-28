"use client";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="w-full h-[7%] px-2 flex flex-row items-center bg-orange-300">
      <div className="hidden lg:flex lg:flex-1">{/* add search */}</div>
      <UserButton />
    </nav>
  );
};

export default Navbar;
