import { useQuery } from "@tanstack/react-query";
import { getPlayers } from "../../services/API";
import { useState } from "react";
import { Player, Team, TeamPickingForm } from "../../utils/typing";
import { SubmitHandler, useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import PlayerCard from "../Players/PlayerCard";
import SelectedPlayers from "./SelectedPlayers";
import { createTeams, selectPlayerForTeam } from "../../utils/helpers";
import { set } from "lodash";
import { useNavigate } from "react-router";
import { useTeams } from "../../contexts/useTeams";

const CreateTeams = () => {
  // Using teams context
  const { selectedPlayers, teamsNumber, dispatch } = useTeams();

  const {
    data: players,
    isPending,
    error: queryError,
  } = useQuery({
    queryKey: ["players"],
    queryFn: () => getPlayers(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm<TeamPickingForm>({
    defaultValues: { teamsNumber: 2, playersPerTeam: 2 },
  });

  const navigate = useNavigate();

  // Checking teams needs x amount of players
  // if isDisabled > 0, we have more players than needed. If isDisabled < 0, we lack players to create teams. If isDisabled === 0, we have the exact amount of players needed.
  const isDisabled =
    selectedPlayers.length - watch("teamsNumber") * watch("playersPerTeam");

  // const handlePlayerSelection = (currentPlayer: Player) => {
  //   setSelectedPlayers((prevSelected: Player[]) => {
  //     if (prevSelected.some((player) => currentPlayer.id === player.id)) {
  //       return prevSelected.filter((player) => currentPlayer.id !== player.id);
  //     }
  //     return [...prevSelected, currentPlayer];
  //   });
  // };

  const handlePlayerSelection = (player: Player) => {
    dispatch({
      type: "player/selected",
      payload: selectPlayerForTeam(selectedPlayers, player),
    });
  };

  const handleTeamNumberUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "teams/update",
      payload: Number(e.target.value),
    });
  };

  const handleTeamsCreation: SubmitHandler<TeamPickingForm> = (data) => {
    navigate("/teams/created");
  };

  if (isPending) return <Spinner />;
  if (queryError) return <div>Error: {queryError.message}</div>;

  return (
    <div className="flex flex-1 bg-[url(/fieldVertical.jpg)] bg-contain">
      {/* Content section */}
      <div className="m-4 flex flex-1 flex-col rounded-[5px] bg-neutral-300/70">
        {/* Header Section */}
        <div className="flex flex-col gap-4 p-4 text-xl">
          <form
            className="flex flex-1 flex-col"
            onSubmit={handleSubmit(handleTeamsCreation)}
          >
            {/* h1 and buttons section */}
            <div className="mb-4 flex h-10 justify-between">
              <h1 className="mr-8 text-5xl text-green-800">
                Teams configuration
              </h1>
              <div>
                <button
                  className={`mx-2 h-full w-30 rounded-[5px] border-2 border-green-800 text-green-800 transition duration-300 hover:bg-white`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`mx-2 h-full rounded-[5px] px-2 ${isDisabled ? "cursor-not-allowed border-2 border-green-800 bg-none text-green-800" : "bg-green-800 text-white transition duration-300 hover:bg-white hover:text-green-800"}`}
                  disabled={Boolean(isDisabled)}
                >
                  {isDisabled < 0
                    ? `Select at least ${watch("teamsNumber") * watch("playersPerTeam") - selectedPlayers.length} more players to go`
                    : isDisabled > 0
                      ? `Remove ${isDisabled} players to go`
                      : "Create Teams"}
                </button>
              </div>
            </div>
            {/* inputs and errors section */}
            <div className="flex">
              {/* inputs */}
              <div className="">
                <label htmlFor="teamsNumber">Number of Teams:</label>
                <input
                  type="number"
                  id="teamsNumber"
                  className="mx-2 w-12 rounded-[5px] bg-white pl-2"
                  min={2}
                  {...register("teamsNumber", {
                    required: true,
                    min: { value: 2, message: "Minimum 2 teams" },
                  })}
                  onChange={handleTeamNumberUpdate}
                />
                <label htmlFor="playersPerTeam">Players per Team:</label>
                <input
                  type="number"
                  id="playersPerTeam"
                  className="mx-2 w-12 rounded-[5px] bg-white pl-2"
                  min={2}
                  {...register("playersPerTeam", {
                    required: true,
                    min: { value: 1, message: "Minimum 2 players" },
                  })}
                />
              </div>
              {/* errors */}
              <div>
                <p>{formErrors.playersPerTeam?.message}</p>
                <p>{formErrors.teamsNumber?.message}</p>
              </div>
            </div>
          </form>
          <div>
            <p>{formErrors.teamsNumber?.message}</p>
          </div>
        </div>

        {/* Player Selection */}
        <ul className="flex flex-1">
          {players.map((player) => (
            <li key={player.id} onClick={() => handlePlayerSelection(player)}>
              <PlayerCard
                player={player}
                isSelected={selectedPlayers.some((p) => p.id === player.id)}
              />
            </li>
          ))}
        </ul>

        {/* Players Selected */}
        {selectedPlayers.length > 0 && (
          <div className="m-2 h-36 rounded-[5px] border-2 border-green-800 p-2">
            <SelectedPlayers selectedPlayers={selectedPlayers} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTeams;
