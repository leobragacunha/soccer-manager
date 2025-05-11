import { IconContext } from "react-icons";
import { GiSoccerBall } from "react-icons/gi";

const Spinner = () => {
  return (
    <div className="flex h-screen flex-1 items-center justify-center bg-neutral-300">
      <IconContext.Provider
        value={{ className: "animate-spin w-50 h-50 text-neutral-800" }}
      >
        <GiSoccerBall />
      </IconContext.Provider>
    </div>
  );
};

export default Spinner;
