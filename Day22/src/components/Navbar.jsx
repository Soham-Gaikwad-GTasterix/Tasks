import {

  FaBars,
  FaUserCircle

} from "react-icons/fa";

import ThemeToggle
from "./ThemeToggle";

function Navbar({

  setSidebarOpen

}) {

  return (

    <header

      className="
        bg-[var(--card)]

        shadow-lg

        px-4
        md:px-8

        py-4

        flex
        justify-between
        items-center
      "
    >

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <button

          onClick={() =>
            setSidebarOpen(true)
          }

          className="
            lg:hidden
            text-2xl
          "
        >

          <FaBars />

        </button>

        <h1
          className="
            text-xl
            md:text-3xl
            font-bold
          "
        >
          Dashboard
        </h1>

      </div>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <ThemeToggle />

        <FaUserCircle
          size={35}
        />

      </div>

    </header>

  );
}

export default Navbar;