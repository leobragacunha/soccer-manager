import { getPlayers } from "../../services/API";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import PlayerCard from "./PlayerCard";
import { PlayerFromDB } from "../../utils/typing";

const Players = () => {
  const navigate = useNavigate();

  const {
    data: players,
    isPending,
    error,
  } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  if (isPending) return <div>Loading</div>;

  return (
    <div className="flex h-screen flex-1 bg-[url(/fieldFromAboveBall.jpg)] bg-cover">
      <div className="m-4 flex-1 rounded-[5px] bg-neutral-300/70 p-4">
        {/* Header from section */}
        <div className="flex items-center justify-between border-b-2 border-green-800 pb-4">
          <h1 className="text-5xl text-green-800">Players</h1>
          <button
            onClick={() => navigate("/players/new-player")}
            className="duration:300 rounded-[5px] bg-green-800 p-2 text-xl text-white transition-colors hover:bg-white hover:text-green-800"
          >
            + New Player
          </button>
        </div>

        {/* Players section */}
        <ul className="flex flex-wrap gap-2">
          {players.map((player: PlayerFromDB) => (
            <li key={player.id}>
              <PlayerCard player={player} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Players;
