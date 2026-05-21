import {
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";

import Admin from "./pages/Admin";

import Users from "./pages/Users";

import Settings from "./pages/Settings";

import DashboardLayout from "./layouts/DashboardLayout";

import PrivateRoute from "./routes/PrivateRoute";


function App() {

  const isAuthenticated = true;

  return (

    <Routes>

      {/* Home */}
      <Route
        path="/"
        element={<Home />}
      />


      {/* Nested Dashboard Routes */}
      <Route
        path="/dashboard"
        element={<DashboardLayout />}
      >

        <Route
          path="users"
          element={<Users />}
        />

        <Route
          path="settings"
          element={<Settings />}
        />

      </Route>


      {/* Protected Route */}
      <Route
        path="/admin"

        element={

          <PrivateRoute
            isAuthenticated={
              isAuthenticated
            }
          >

            <Admin />

          </PrivateRoute>

        }
      />

    </Routes>
  );
}

export default App;