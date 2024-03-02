"use client";
import BoardList from "@/components/dashboard/board_list";
import EmptyOrg from "@/components/dashboard/empty_org";
import { DashboardPageProps } from "@/lib/types";
import { useOrganization } from "@clerk/nextjs";

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization();

  return (
    <main className="flex-1 h-full p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgID={organization.id} searchParams={searchParams} />
      )}
    </main>
  );
};

export default DashboardPage;
