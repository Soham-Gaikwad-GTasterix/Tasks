import {

  createContext,
  useEffect,
  useState

} from "react";

export const ThemeContext =
  createContext();

function ThemeProvider({
  children
}) {

  const [darkMode,
    setDarkMode] =
      useState(false);

  useEffect(() => {

    const savedTheme =

      localStorage.getItem(
        "theme"
      );

    if (savedTheme) {

      setDarkMode(
        JSON.parse(
          savedTheme
        )
      );

    }

  }, []);

  useEffect(() => {

    localStorage.setItem(

      "theme",

      JSON.stringify(
        darkMode
      )

    );

    if (darkMode) {

      document.documentElement
        .classList.add("dark");

    } else {

      document.documentElement
        .classList.remove("dark");

    }

  }, [darkMode]);

  return (

    <ThemeContext.Provider

      value={{

        darkMode,

        setDarkMode

      }}

    >

      {children}

    </ThemeContext.Provider>

  );
}

export default ThemeProvider;