import {

  Routes,

  Route,

  Navigate

} from "react-router-dom";

import AuthProvider
from "./context/AuthContext";

import Login
from "./pages/Login";

import Dashboard
from "./pages/Dashboard";

import Patients
from "./pages/Patients";

import Doctors
from "./pages/Doctors";

import Appointments
from "./pages/Appointments";

import PrivateRoute
from "./routes/PrivateRoute";

import { useState } from "react";


function App() {

  const [

    sidebarCollapsed,

    setSidebarCollapsed

  ] = useState(false);

  return (

    <AuthProvider>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />


        {/* DASHBOARD */}
        <Route

          path="/dashboard"

          element={

            <PrivateRoute>

            <Dashboard

              sidebarCollapsed={
                sidebarCollapsed
              }

              setSidebarCollapsed={
                setSidebarCollapsed
              }

            />

            </PrivateRoute>

          }

        />


        {/* PATIENTS */}
        <Route

          path="/patients"

          element={

            <PrivateRoute>

            <Patients

              sidebarCollapsed={
                sidebarCollapsed
              }

              setSidebarCollapsed={
                setSidebarCollapsed
              }

            />

            </PrivateRoute>

          }

        />


        {/* DOCTORS */}
        <Route

          path="/doctors"

          element={

            <PrivateRoute>

            <Doctors

              sidebarCollapsed={
                sidebarCollapsed
              }

              setSidebarCollapsed={
                setSidebarCollapsed
              }

            />

            </PrivateRoute>

          }

        />

        {/* APPOINTMENTS */}
        <Route

          path="/appointments"

          element={

            <PrivateRoute>

            <Appointments

              sidebarCollapsed={
                sidebarCollapsed
              }

              setSidebarCollapsed={
                setSidebarCollapsed
              }

            />

            </PrivateRoute>

          }

        />        


        {/* INVALID ROUTE */}
        <Route

          path="*"

          element={
            <Navigate to="/" />
          }

        />

      </Routes>

    </AuthProvider>

  );
}

export default App;