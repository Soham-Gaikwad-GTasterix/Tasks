import {

  FaBell,

  FaSearch,

  FaMoon,

  FaSun,

  FaChevronDown

} from "react-icons/fa";

import ThemeToggle from "./ThemeToggle";

import {
  useTheme
} from "../context/ThemeContext";

function Navbar({

  darkMode,

  setDarkMode

}) {

  const { colors } = useTheme();

  const user = 

    JSON.parse(

      localStorage.getItem(

        "user"

      )
      
    );

  return (

    <header

      style={{
        backgroundColor: colors.card
      }}

      className="
        fixed
        top-0
        z-30
        w-[stretch]
        backdrop-blur-xl

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

            style={{
              color: colors.text
            }}

            className="

              absolute

              left-4

            "

          />

          <input

            type="text"

            placeholder="Search dashboard..."

            style={{
              backgroundColor: colors.card,
              color: colors.text
            }}

            className="
              w-full

              border

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

            type="button"

            onClick={() =>

              setDarkMode(

                !darkMode

              )

            }

            style={{
              backgroundColor: colors.card,
              color: colors.text
            }}

            className="
              w-11
              h-11

              flex
              items-center
              justify-center

              rounded-2xl

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

            type="button"

            style={{
              backgroundColor: colors.card,
              color: colors.text
            }}

            className="
              relative

              w-11
              h-11

              flex
              items-center
              justify-center

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

              style={{
                color: colors.text,
                backgroundColor: colors.danger
              }}

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

              "

            >

              3

            </span>

          </button>

          {/* PROFILE */}

          <div

            style={{
              backgroundColor: colors.card
            }}

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

            "

          >

            <img

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

                style={{
                  color: colors.text
                }}

                className="

                  text-sm

                  font-semibold

                "

              >

                {user?.name}

              </h3>

              <p

                style={{
                  color: colors.text
                }}

                className="

                  text-xs

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