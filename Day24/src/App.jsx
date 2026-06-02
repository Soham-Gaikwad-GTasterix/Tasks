import {
  useState,
  useEffect
} from "react";

import {
  ThemeContext
} from "./context/ThemeContext";

import {
  lightPalette,
  darkPalette
} from "./theme/palette";

import Dashboard from "./pages/Dashboard";

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

    <Dashboard

      darkMode={darkMode}

      setDarkMode={setDarkMode}

      collapsed={collapsed}

      setCollapsed={setCollapsed}

    />

    </ThemeContext.Provider>

  );

}

export default App;