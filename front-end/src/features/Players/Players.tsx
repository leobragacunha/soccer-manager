import { useCallback } from "react";
import { createPlayer, getPlayers, Player } from "../../services/API";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";

const Players = () => {
  const {
    data: players,
    isPending,
    error,
  } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  if (isPending) return <div>Loading</div>;

  // const player: Player = {
  //   id: `${uuidv4()}`,
  //   name: "Rafael Braga Cunha",
  //   nickName: "Rafonesz",
  //   height: 169,
  //   foot: "left",
  //   speed: 70,
  //   stamina: 80,
  //   pass: 85,
  //   shoot: 85,
  //   dribbling: 90,
  //   defense: 70,
  //   physics: 70,
  // };

  // const handleCreatePlayer = useCallback(
  //   async (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     try {
  //       const result = await createPlayer(player);
  //       console.log("Resultado:", result);
  //     } catch (error: unknown) {
  //       const errorMessage =
  //         error instanceof Error ? error.message : "Unknown error";
  //       console.error(`Error creating player: ${errorMessage}`);
  //     }
  //   },
  //   [player],
  // );

  //
  return (
    <div className="flex h-screen flex-1 bg-[url(/fieldFromAboveBall.jpg)] bg-cover">
      <div className="m-4 flex-1 rounded-[5px] bg-neutral-300/70 p-4">
        {/* Header from section */}
        <div className="flex items-center justify-between border-b-2 border-green-800 pb-4">
          <h1 className="text-5xl text-green-800">Players</h1>
          <button className="duration:300 rounded-[5px] bg-green-800 p-2 text-xl text-white transition-colors hover:bg-white hover:text-green-800">
            + New Player
          </button>
        </div>

        {/* Players section */}
        <ul>
          {players.map((player: Player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Players;
