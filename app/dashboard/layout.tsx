import { LayoutProps } from "@/lib/types";
import SideBar from "@/components/dashboard/sidebar/sidebar";
import OrgSideBar from "@/components/dashboard/org_sidebar";
import Navbar from "@/components/navbar";
import { Suspense } from "react";
import Loading from "@/components/auth/loading";
const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <main className="h-full">
        <SideBar />
        <div className="h-full ml-[3rem] flex">
          <OrgSideBar />
          <div className="flex-1">
            <Navbar />
            <div className="h-[93%] flex flex-row">{children}</div>
          </div>
        </div>
      </main>
    </Suspense>
  );
};

export default DashboardLayout;
