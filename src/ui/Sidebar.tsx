import { NavLink } from "react-router";
import LogoTitle from "./LogoTitle";

const Sidebar = () => {
  return (
    // Sidebar container
    <div className="flex h-full flex-col justify-between bg-neutral-300">
      {/* Icon and buttons */}
      <div className="flex flex-col items-center">
        <LogoTitle kind="sidebar" />
        <NavLink
          className={`w-full p-4 transition-colors duration-300 hover:bg-green-800 hover:text-white`}
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }: { isActive: boolean }) =>
            `w-full p-4 transition-colors duration-300 hover:bg-green-800 hover:text-white ${isActive && "bg-green-800 text-white"}`
          }
          to="players"
        >
          Players
        </NavLink>
        <NavLink
          className={({ isActive }: { isActive: boolean }) =>
            `w-full p-4 transition-colors duration-300 hover:bg-green-800 hover:text-white ${isActive && "bg-green-800 text-white"}`
          }
          to="create-teams"
        >
          Teams
        </NavLink>
      </div>

      {/* Footer */}
      <div className="pb-2 text-center">
        Developed by{" "}
        <a
          href="https://github.com/leobragacunha"
          className="lato-regular-italic transition-colors duration-300 hover:text-green-800"
        >
          <span className="hover:font-bold">Leonardo Cunha</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
