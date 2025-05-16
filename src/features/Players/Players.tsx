import { useCallback, useState } from "react";
import { getPlayers } from "../../services/API";
import { useQuery } from "@tanstack/react-query";
import { Player } from "../../utils/typing";
import { useNavigate, useSearchParams } from "react-router";

import PlayerCard from "./PlayerCard";
import Spinner from "../../ui/Spinner";
import SearchBar from "../../ui/SearchBar";
import OrderDropdown from "../../ui/OrderDropdown";

const Players = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort: "name" | "nickname" | "rank" =
    (searchParams.get("sort") as "name" | "nickname" | "rank") || "name";
  const order: "asc" | "desc" =
    (searchParams.get("order") as "asc" | "desc") || "asc";

  const [searchString, setSearchString] = useState("");
  const [debouncedSearchString, setDebouncedSearchString] =
    useState(searchString);

  const {
    data: players,
    isPending,
    error,
  } = useQuery({
    queryKey: ["players", debouncedSearchString, sort, order],
    queryFn: () => getPlayers(searchString, sort, order),
  });

  if (isPending) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex h-screen flex-1 bg-[url(/fieldFromAboveBall.jpg)] bg-cover">
      <div className="m-4 flex-1 rounded-[5px] bg-neutral-300/70 p-4">
        {/* Header from section */}
        <div className="flex items-center justify-between border-b-2 border-green-800 pb-4">
          <div className="flex gap-8">
            <h1 className="text-5xl text-green-800">Players</h1>
            <SearchBar
              searchString={searchString}
              setSearchString={setSearchString}
              setDebouncedSearchString={setDebouncedSearchString}
            />
            <OrderDropdown searchString={searchString} />
          </div>
          <button
            onClick={() => navigate("/players/new-player")}
            className="duration:300 rounded-[5px] bg-green-800 p-2 text-xl text-white transition-colors hover:bg-white hover:text-green-800"
          >
            + New Player
          </button>
        </div>

        {/* Players section */}
        <ul className="flex flex-wrap gap-2">
          {players.map((player: Player) => (
            <li key={player.id} onClick={() => navigate(`${player.id}`)}>
              <PlayerCard player={player} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Players;
