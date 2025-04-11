import { useNavigate } from "react-router";

function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="mt-8 flex justify-around">
      <button
        className="w-28 rounded-[5px] bg-green-800 p-4 text-white transition-colors duration-200 hover:bg-white hover:text-green-800"
        onClick={() => navigate("/players")}
      >
        Players
      </button>

      <button
        className="w-28 rounded-[5px] bg-green-800 p-4 text-white transition-colors duration-200 hover:bg-white hover:text-green-800"
        onClick={() => navigate("/teams")}
      >
        Pick Teams
      </button>
    </div>
  );
}

export default MainMenu;
