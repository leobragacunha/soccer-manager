import { Outlet } from "react-router";
import Sidebar from "../ui/Sidebar";

const StdLayout = () => {
  return (
    <div className="flex h-[100vh] items-stretch">
      <Sidebar />

      <Outlet />
    </div>
  );
};

export default StdLayout;
