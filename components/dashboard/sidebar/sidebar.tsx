import NewButton from "./new_btn";
import OrgList from "./org_list";

const SideBar = () => {
  return (
    <aside
      className="fixed flex flex-col items-center z-10 left-0 h-full w-[3rem] py-2 gap-y-4 text-slate-100 shadow-lg shadow-indigo-500/50
    bg-gradient-to-b from-blue-600 via-cyan-600 to-emerald-500 from-20% via-40% to-75%"
    >
      <OrgList />
      <NewButton />
    </aside>
  );
};

export default SideBar;
