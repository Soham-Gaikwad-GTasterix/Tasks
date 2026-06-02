import {
  FaMoon,
  FaSun
} from "react-icons/fa";

import {
  useTheme
} from "../context/ThemeContext";

function ThemeToggle() {

  const {

    darkMode,

    setDarkMode

  } = useTheme();

  return (

    <button

      type="button"

      onClick={() =>

        setDarkMode(
          !darkMode
        )

      }

    >

      {

        darkMode

          ? <FaSun />

          : <FaMoon />

      }

    </button>

  );

}

export default ThemeToggle;