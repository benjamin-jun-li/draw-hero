import { LayoutProps } from "@/lib/types";
import SideBar from "@/components/dashboard/sidebar/sidebar";
import OrgSideBar from "@/components/dashboard/org_sidebar";
import Navbar from "@/components/navbar";

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <main className="h-full">
      <SideBar />
      <div className="h-full ml-[3rem] flex">
        <OrgSideBar />
        <div className="flex-1">
          <Navbar />
          <div className="h-full flex flex-row">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
