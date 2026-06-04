import {

  useState

} from "react";

import { 
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaChartPie,
  FaUsers,
  FaBox,
  FaClipboardList,
  FaUserCircle,
  FaCog,
  FaHospital,
  FaBed,
  FaStethoscope
} from "react-icons/fa";

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

      icon: <FaChartPie />,

      path: "/dashboard"

    },

    {

      id: 2,

      title: "Patients",

      icon: <FaBed />,

      path: "/patients"

    },

    {

      id: 3,

      title: "Doctors",

      icon: <FaStethoscope />,

      path: "/doctors"

    },

    {

      id: 4,

      title: "Appointments",

      icon: <FaClipboardList />,

      path: "/appointments"

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

  const navigate = useNavigate();

  const location = useLocation();

  const user = 

    JSON.parse(

      localStorage.getItem(

        "user"

      )
      
    );  
  
  const handleLogout = () => {

    localStorage.removeItem(

      "user"

    );

    navigate("/");

  };

  return (

    <>

      {/* MOBILE BUTTON */}

      <button

        type="button"

        onClick={() =>

          setMobileOpen(true)

        }

        className="

          fixed
          top-5
          left-5

          z-[60]

          md:hidden

          p-3

          rounded-xl

          shadow-xl

          bg-slate-950

          text-white

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

        className={`

          bg-slate-950

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

      <div className="h-full flex flex-col">  

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
              <h1 className="text-2xl font-bold text-white">
                Hospital
              </h1>

              <p className="text-slate-400 text-sm">
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

                    className="
                      font-semibold
                      text-white
                    "
                  >

                    {user?.name}

                  </h3>

                  <p
                    
                    className="              
                      text-sm
                      text-slate-400
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
            flex-1
            min-h-0
            overflow-y-auto
            flex
            flex-col
            gap-2
            px-3
          "
        >

          {

            menuItems.map(

              (item) => (

                <button

                  title={item.title}

                  key={item.id}

                  type="button"

                  onClick={() => {

                    navigate(item.path);

                    setMobileOpen(false);

                  }}

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
                      location.pathname ===

                      item.path

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

        {/* FOOTER */}

        {

          !collapsed && (

            <div className="shrink-0 p-6 border-t border-slate-800">

              <button 
                
                onClick={handleLogout} 
                
                className="mt-3 w-full text-white py-2 rounded-xl bg-red-500 hover:bg-red-600 transition-colors"
                
              >
                
                Logout

              </button>

            </div>

          )

        }

      </div>

      </aside>

    </>

  );

}

export default Sidebar;