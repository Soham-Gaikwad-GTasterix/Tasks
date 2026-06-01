function ThemeToggle({

  darkMode,

  setDarkMode

}) {

  return (

    <button

      onClick={() =>

        setDarkMode(

          !darkMode

        )

      }

      className="
        px-5
        py-3
        rounded-xl
        bg-blue-500
        text-white
      "
    >

      {

        darkMode

          ? "Light Mode"

          : "Dark Mode"

      }

    </button>

  );

}

export default ThemeToggle;