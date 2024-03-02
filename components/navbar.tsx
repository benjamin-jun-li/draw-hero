"use client";
import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import SearchInput from "./dashboard/sidebar/search_input";
import InviteBtn from "./dashboard/invite_btn";

const Navbar = () => {
  const { organization } = useOrganization();
  return (
    <nav className="w-full h-[7%] p-2 flex flex-row items-center space-x-2">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
              },
              organizationSwitcherTrigger: {
                padding: "3px",
                borderRadius: "8px",
                width: "100%",
                border: "1px solid #E5E7EB",
                justifyContent: "space-between",
                backgroundColor: "white",
              },
            },
          }}
        />
      </div>
      {organization && <InviteBtn />}
      <UserButton />
    </nav>
  );
};

export default Navbar;
