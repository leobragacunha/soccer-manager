import { Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TeamsProvider } from "./contexts/useTeams";

import Home from "./features/Home";
import StdLayout from "./layouts/StdLayout";
import Players from "./features/Players/Players";
import CreatePlayer from "./features/Players/CreatePlayer";
import EditPlayer from "./features/Players/EditPlayer";
import CreateTeams from "./features/TeamsPicking/CreateTeams";
import Teams from "./features/TeamsPicking/Teams";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TeamsProvider>
        <Routes>
          <Route index path="/" element={<Home />} />

          <Route element={<StdLayout />}>
            <Route path="players" element={<Players />} />
            <Route path="players/new-player" element={<CreatePlayer />} />
            <Route path="players/:playerId" element={<EditPlayer />} />
            <Route path="create-teams" element={<CreateTeams />} />
            <Route path="teams/created" element={<Teams />} />
          </Route>
        </Routes>
      </TeamsProvider>
    </QueryClientProvider>
  );
}

export default App;
