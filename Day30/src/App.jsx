import {
  useState,
  useEffect
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  ThemeContext
} from "./context/ThemeContext";

import {
  lightPalette,
  darkPalette
} from "./theme/palette";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import DashboardLayout from "./layouts/DashboardLayout";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  const [

    darkMode,

    setDarkMode

  ] = useState(true);

  const colors =

    darkMode

      ? darkPalette

      : lightPalette;  

  const [

    collapsed,

    setCollapsed

  ] = useState(false);

  useEffect(() => {

    const savedTheme =

      localStorage.getItem(
        "theme"
      );

    if (savedTheme) {

      setDarkMode(
        savedTheme === "dark"
      );

    }

  }, []);  

  useEffect(() => {

    localStorage.setItem(

      "theme",

      darkMode

        ? "dark"

        : "light"

    );

  }, [darkMode]);

  return (

    <ThemeContext.Provider

      value={{

        darkMode,

        setDarkMode,

        colors

      }}

    >

      <BrowserRouter>

        <Routes>

          <Route
          
            path="/"

            element={<Login/>}

          />

          <Route
            
            element={

              <ProtectedRoute>

              
                <DashboardLayout
                
                  darkMode={darkMode}
                  
                  setDarkMode={setDarkMode}
                  
                  collapsed={collapsed}
                  
                  setCollapsed={setCollapsed}
                
                />

              </ProtectedRoute>
              
            }
            
          >

            <Route

              path="/dashboard"
              
              element={

                <Dashboard
                  
                  darkMode={darkMode}
                    
                  setDarkMode={setDarkMode}
                    
                  collapsed={collapsed}
                    
                  setCollapsed={setCollapsed}
                  
                />
                
              }
              
            />

            
            <Route
              path="/patients"
              element={<Patients/>}
            />

            <Route
              path="/doctors"
              element={<Doctors/>}
            />

            <Route
              path="/appointments"
              element={<Appointments/>}
            />

          </Route>

          <Route

            path="*"

            element={
              <Navigate
                to="/"
              />
            }

          />
        
        </Routes>

      </BrowserRouter>

    </ThemeContext.Provider>

  );

}

export default App;