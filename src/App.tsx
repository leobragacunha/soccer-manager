import { Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./features/Home";
import StdLayout from "./layouts/StdLayout";
import Players from "./features/Players/Players";
import CreatePlayer from "./features/Players/CreatePlayer";
import EditPlayer from "./features/Players/EditPlayer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index path="/" element={<Home />} />

        <Route element={<StdLayout />}>
          <Route path="players" element={<Players />} />
          <Route path="players/new-player" element={<CreatePlayer />} />
          <Route path="players/:playerId" element={<EditPlayer />} />
          <Route path="teams" />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
