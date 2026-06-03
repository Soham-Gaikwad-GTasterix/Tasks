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
            
            path="/dashboard"
            
            element={

              <ProtectedRoute>

              
                <Dashboard
                
                darkMode={darkMode}
                
                setDarkMode={setDarkMode}
                
                collapsed={collapsed}
                
                setCollapsed={setCollapsed}
                
                />

              </ProtectedRoute>
              
            }
            
          />

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