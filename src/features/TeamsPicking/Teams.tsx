import { useState } from "react";
import { useTeams } from "../../contexts/useTeams";
import { createTeams } from "../../utils/helpers";

const Teams = () => {
  const { selectedPlayers, teamsNumber } = useTeams();

  const [teams, setTeams] = useState(
    createTeams(selectedPlayers, teamsNumber) || [],
  );

  return (
    <ul>
      {teams.map((team, teamIndex) =>
        team.players.map((player) => (
          <li>
            Team {teamIndex + 1} (rank: {team.averageRank}) : {player.name}
          </li>
        )),
      )}
    </ul>
  );
};

export default Teams;
