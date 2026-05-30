import {

  useContext

} from "react";

import {

  ThemeContext

} from "../context/ThemeContext";

function ThemeToggle() {

  const {

    darkMode,
    setDarkMode

  } = useContext(
    ThemeContext
  );

  return (

    <button

      onClick={() =>

        setDarkMode(
          !darkMode
        )

      }

      className="
        bg-blue-500
        text-white
        px-4
        py-2
        rounded-xl

        hover:scale-105

        transition-all

        focus:ring-4
        focus:ring-blue-300
      "
    >

      {
        darkMode

          ? "☀️"

          : "🌙"
      }

    </button>

  );
}

export default ThemeToggle;