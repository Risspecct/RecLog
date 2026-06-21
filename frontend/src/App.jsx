import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Hotspots from "./pages/Hotspots";

import MapPage from "./pages/MapPage";
import CopilotPage from "./pages/CopilotPage";
import DeploymentPage from "./pages/DeploymentPage";
import SimulatorPage from "./pages/SimulatorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/hotspots"
          element={<Hotspots />}
        />

        <Route
          path="/map"
          element={<MapPage />}
        />

        <Route
          path="/copilot"
          element={<CopilotPage />}
        />

        <Route
          path="/deployment"
          element={<DeploymentPage />}
        />

        <Route
          path="/simulator"
          element={<SimulatorPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;