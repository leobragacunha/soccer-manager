import { Route, Routes } from "react-router";
import Home from "./features/Home";
import StdLayout from "./layouts/StdLayout";
import Players from "./features/Players/Players";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index path="/" element={<Home />} />

        <Route element={<StdLayout />}>
          <Route path="players" element={<Players />} />
          <Route path="teams" />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
