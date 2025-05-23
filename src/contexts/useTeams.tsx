import { createContext, useContext, useReducer } from "react";
import {
  ActionType,
  Player,
  StateType,
  Team,
  TeamsContextType,
} from "../utils/typing";
import { createTeams, selectPlayerForTeam } from "../utils/helpers";

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

const initialState: { selectedPlayers: Player[]; teamsNumber: number } = {
  selectedPlayers: [],
  teamsNumber: 2,
};

// Reducer outside so we don't create the function on each render
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "player/selected":
      return { ...state, selectedPlayers: action.payload as Player[] };
    case "teams/update":
      return { ...state, teamsNumber: action.payload as number };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const TeamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ selectedPlayers, teamsNumber }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <TeamsContext.Provider value={{ selectedPlayers, teamsNumber, dispatch }}>
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeams = () => {
  const context = useContext(TeamsContext);
  if (context === undefined)
    throw new Error("Teams context used outside of scope");
  return context;
};
