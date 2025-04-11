import { Route, Routes } from "react-router";
import Home from "./features/Home";
import StdLayout from "./layouts/StdLayout";
import Players from "./features/showPlayers/Players";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />

      <Route element={<StdLayout />}>
        <Route path="players" element={<Players />} />
        <Route path="teams" />
      </Route>
    </Routes>
  );
}

export default App;
