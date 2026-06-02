import {

  useState

} from "react";

import {
  FaBars,
  FaTimes,
  FaChartPie,
  FaUsers,
  FaBox,
  FaClipboardList,
  FaUserCircle,
  FaCog,
  FaHospital
} from "react-icons/fa";

import {
  useTheme
} from "../context/ThemeContext";

function Sidebar({

  collapsed,

  setCollapsed

}) {

  const [

    mobileOpen,

    setMobileOpen

  ] = useState(false);

  const menuItems = [

    {

      id: 1,

      title: "Overview",

      icon: <FaChartPie />

    },

    {

      id: 2,

      title: "Customers",

      icon: <FaUsers />

    },

    {

      id: 3,

      title: "Products",

      icon: <FaBox />

    },

    {

      id: 4,

      title: "Orders",

      icon: <FaClipboardList />

    },

    {

      id: 5,

      title: "Account",

      icon: <FaUserCircle />

    },

    {

      id: 6,

      title: "Settings",

      icon: <FaCog />

    }

  ];

  const [

    active,

    setActive

  ] = useState("Overview");

  const { colors, darkMode } = useTheme();

  return (

    <>

      {/* MOBILE BUTTON */}

      <button

        type="button"

        onClick={() =>

          setMobileOpen(true)

        }

        style={{
          backgroundColor: colors.card,
          color: colors.text
        }}

        className="

          fixed
          top-5
          left-5

          z-[60]

          md:hidden

          p-3

          rounded-xl

          shadow-xl

        "

      >

        <FaBars />

      </button>

      {/* OVERLAY */}

      {

        mobileOpen && (

          <div

            onClick={() =>

              setMobileOpen(false)

            }

            className="

              fixed
              inset-0

              bg-black/60

              z-40

              md:hidden

            "

          />

        )

      }

      {/* SIDEBAR */}

      <aside

        style={{
          backgroundColor: colors.sidebar
        }}

        className={`

          fixed

          left-0
          top-0

          h-dvh

          overflow-hidden

          z-50

          border-r

          border-slate-800

          transition-all

          duration-300

          shadow-2xl

          ${
            collapsed

              ? "w-20"

              : "w-72"
          }

          ${
            mobileOpen

              ? "translate-x-0"

              : "-translate-x-full md:translate-x-0"
          }

        `}

      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            p-5
            border-b
            border-slate-800
            min-h-[80px]
          "
        >
          {!collapsed ? (
            <div>
              <h1 style={{ color: colors.text }} className="text-2xl font-bold">
                Hospital
              </h1>

              <p style={{ color: colors.text }} className="text-slate-400 text-sm">
                Admin Dashboard
              </p>
            </div>
          ) : (
            <div
              className="
                w-full
                flex
                justify-center
              "
            >
              <FaHospital
                className="
                  text-indigo-500
                  text-3xl
                "
              />
            </div>
          )}

          {!collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="
                text-slate-500
              "
            >
              <FaBars />
            </button>
          )}

          {collapsed && (
            <div
              className="
                flex
                justify-center
                py-4
              "
            >
              <button
                type="button"
                onClick={() => setCollapsed(false)}
                className="
                  text-slate-500
                "
              >
                <FaBars />
              </button>
            </div>
          )}
        </div>

        {/* USER */}

        {

          !collapsed && (

            <div

              className="

                p-6

                border-b

                border-slate-800

              "

            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <img

                  src="https://i.pravatar.cc/100"

                  alt="Profile"

                  className="

                    w-12

                    h-12

                    rounded-full

                  "

                />

                <div>

                  <h3

                    style={{ color: colors.text }}

                    className="
                      font-semibold
                    "
                  >

                    John Carter

                  </h3>

                  <p

                    style={{ color: colors.text }}
                    
                    className="              
                      text-sm
                    "
                  >

                    Administrator

                  </p>

                </div>

              </div>

            </div>

          )

        }

        {/* MENU */}

        <nav
          className="
            mt-4
            flex
            flex-col
            gap-2
            px-3
            overflow-y-auto
            h-[calc(100%-220px)]
          "
        >

          {

            menuItems.map(

              (item) => (

                <button

                  title={item.title}

                  key={item.id}

                  type="button"

                  onClick={() =>

                    setActive(

                      item.title

                    )

                  }

                  className={`
                    flex
                    items-center
                    ${
                      collapsed
                        ? "justify-center"
                        : "gap-4"
                    }
                    px-4
                    py-4
                    rounded-xl
                    transition-all
                    w-full

                    ${
                      active ===

                      item.title

                        ? `
                          bg-gradient-to-r
                          from-indigo-600
                          to-violet-600
                          text-white
                        `
                        : `
                          text-slate-600
                        `
                    }

                  `}

                >

                  <span
                    className="
                      text-lg
                    "
                  >

                    {item.icon}

                  </span>

                  {

                    !collapsed && (

                      <span>

                        {item.title}

                      </span>

                    )

                  }

                </button>

              )

            )

          }

        </nav>

      </aside>

    </>

  );

}

export default Sidebar;