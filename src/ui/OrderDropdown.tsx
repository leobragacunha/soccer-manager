import { useCallback, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { getPlayers } from "../services/API";

const OrderDropdown = ({ searchString }: { searchString: string }) => {
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleDropdownToggle = () => {
    setShowOptions((prev) => !prev);
  };

  const handleSort = useCallback(
    (sortParam: "name" | "nickname" | "rank", orderParam: "asc" | "desc") => {
      const searchParams = new URLSearchParams();

      searchParams.set("sort", sortParam);
      searchParams.set("order", orderParam);
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });

      handleDropdownToggle();
    },
    [location, navigate],
  );

  return (
    <div className="relative z-10 h-10 w-40 rounded-[5px] bg-white p-2">
      <p
        className={`flex cursor-pointer items-center justify-between ${showOptions && "border-b-2 border-green-800 text-green-800"}`}
        onClick={handleDropdownToggle}
      >
        Order By
        <span
          className={`hover:text-green-900 ${showOptions && "text-green-800"}`}
        >
          <IoIosArrowDown />
        </span>
      </p>
      <ul className="flex flex-col items-center justify-center">
        <li
          className={`${showOptions ? "relative" : "hidden"} w-40 cursor-pointer bg-white p-2 hover:font-bold hover:text-green-800`}
          onClick={() => handleSort("name", "asc")}
        >
          Name (A-Z)
        </li>
        <li
          className={`${showOptions ? "relative" : "hidden"} w-40 cursor-pointer bg-white p-2 hover:font-bold hover:text-green-800`}
          onClick={() => handleSort("name", "desc")}
        >
          Name (Z-A)
        </li>
        <li
          className={`${showOptions ? "relative" : "hidden"} w-40 cursor-pointer bg-white p-2 hover:font-bold hover:text-green-800`}
          onClick={() => handleSort("nickname", "asc")}
        >
          Nick Name (A-Z)
        </li>
        <li
          className={`${showOptions ? "relative" : "hidden"} w-40 cursor-pointer bg-white p-2 hover:font-bold hover:text-green-800`}
          onClick={() => handleSort("nickname", "desc")}
        >
          Nick Name (Z-A)
        </li>
        <li
          className={`${showOptions ? "relative" : "hidden"} w-40 cursor-pointer bg-white p-2 hover:font-bold hover:text-green-800`}
          onClick={() => handleSort("rank", "asc")}
        >
          Rank (Ascending)
        </li>
        <li
          className={`${showOptions ? "relative" : "hidden"} w-40 cursor-pointer rounded-[5px] bg-white p-2 hover:font-bold hover:text-green-800`}
          onClick={() => handleSort("rank", "desc")}
        >
          Rank (Descending)
        </li>
      </ul>
    </div>
  );
};

export default OrderDropdown;
