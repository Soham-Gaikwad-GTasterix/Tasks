import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import HospitalDashboard from "./pages/HospitalDashboard";
import LayoutOne from "./pages/LayoutOne";
import LayoutTwo from "./pages/LayoutTwo";
import LayoutThree from "./pages/LayoutThree";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HospitalDashboard />}
        />

        <Route
          path="/layout1"
          element={<LayoutOne />}
        />

        <Route
          path="/layout2"
          element={<LayoutTwo />}
        />

        <Route
          path="/layout3"
          element={<LayoutThree />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;