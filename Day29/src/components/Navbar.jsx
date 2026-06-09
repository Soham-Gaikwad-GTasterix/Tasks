import {

  FaBell,

  FaSearch,

  FaMoon,

  FaSun,

  FaChevronDown

} from "react-icons/fa";

import {
  useTheme
} from "../context/ThemeContext";

function Navbar({

  darkMode,

  setDarkMode

}) {

  const user = 

    JSON.parse(

      localStorage.getItem(

        "user"

      )
      
    );

  return (

    <header

      className="
        fixed
        top-0
        z-30
        w-[stretch]
        backdrop-blur-xl
        bg-slate-950
        border-b

        border-slate-800/50

        px-4
        sm:px-6
        lg:px-8

        py-4
      "
    >

      <div

        className="

          flex

          items-center

          justify-between

          gap-6

        "

      >

        {/* SEARCH */}

        <div

          aria-label="Search Bar"

          className="

            hidden

            md:flex

            items-center

            relative

            flex-1

            max-w-md

          "

        >

          <FaSearch

            className="

              absolute

              left-4

              text-slate-400

            "

          />

          <input

            type="text"

            placeholder="Search dashboard..."

            className="
              w-full

              border

              bg-slate-900

              text-white

              border-slate-800

              rounded-2xl

              py-3

              pl-12

              pr-4

              outline-none

              transition-all

              focus:border-indigo-500

              focus:ring-2

              focus:ring-indigo-500/20
            "

          />

        </div>

        {/* RIGHT SIDE */}

        <div

          className="

            flex

            items-center

            gap-3

            ml-auto

          "

        >

          {/* THEME */}

          <button

            aria-label="Change Theme"

            type="button"

            onClick={() =>

              setDarkMode(

                !darkMode

              )

            }

            className="
              w-11
              h-11

              flex
              items-center
              justify-center

              rounded-2xl

              bg-slate-900

              text-white

              border

              border-slate-800

              hover:border-indigo-500

              hover:bg-slate-800

              transition-all
            "

          >

            {

              darkMode

                ? <FaSun />

                : <FaMoon />

            }

          </button>

          {/* NOTIFICATION */}

          <button

            aria-label="Notification"

            type="button"

            className="
              relative

              w-11
              h-11

              flex
              items-center
              justify-center

              bg-slate-900
              text-white

              rounded-2xl

              border

              border-slate-800

              hover:border-indigo-500

              hover:bg-slate-800

              transition-all
            "

          >

            <FaBell />

            <span

              className="

                absolute

                -top-1

                -right-1

                text-xs

                w-5

                h-5

                rounded-full

                flex

                items-center

                justify-center

                bg-red-500

                text-white

              "

            >

              3

            </span>

          </button>

          {/* PROFILE */}

          <div

            className="

              flex

              items-center

              gap-3

              border

              border-slate-800

              px-2

              py-2

              rounded-xl

              cursor-pointer

              hover:border-indigo-500

              transition-all

              bg-slate-900

            "

          >

            <img

              aria-label="Profile Image"

              src="https://i.pravatar.cc/100"

              alt="Profile"

              className="

                w-9

                h-9

                rounded-full

              "

            />

            <div

              className="

                hidden

                lg:block

              "

            >

              <h3

                aria-label="Username"

                className="

                  text-sm

                  font-semibold

                  text-white

                "

              >

                {user?.name}

              </h3>

              <p

                aria-label="Role"

                className="

                  text-xs

                  text-slate-400

                "

              >

                Administrator

              </p>

            </div>

            <FaChevronDown

              className="

                text-slate-400

              "

            />

          </div>

        </div>

      </div>

    </header>

  );

}

export default Navbar;