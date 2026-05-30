import {

  Link

} from "react-router-dom";

import {

  FaBars,
  FaChevronLeft,
  FaUserInjured,
  FaUserMd,
  FaCalendarAlt,
  FaTachometerAlt

} from "react-icons/fa";

function Sidebar({

  sidebarCollapsed,

  setSidebarCollapsed

}) {

  return (

    <aside

      className={`

        fixed
        left-0
        top-0
        h-screen
        bg-slate-900
        text-white
        transition-all
        duration-300

        ${
          sidebarCollapsed

            ? "w-20"

            : "w-72"
        }

      `}

    >

      <div

        className="
          flex
          justify-between
          items-center
          p-5
        "

      >

        {

          !sidebarCollapsed &&

          <h1
            className="
              text-2xl
              font-bold
              tracking-wide
              text-cyan-400              
            "
          >
            Hospital
          </h1>

        }

        <button

          type="button"

          onClick={() =>

            setSidebarCollapsed(

              !sidebarCollapsed

            )

          }

        >

          {

            sidebarCollapsed

              ? <FaBars />

              : <FaChevronLeft />

          }

        </button>

      </div>

      <nav
        className="
          flex
          flex-col
          mt-10
        "
      >

        <MenuItem
          icon={<FaTachometerAlt />}
          text="Dashboard"
          to="/dashboard"
          collapsed={sidebarCollapsed}
        />

        <MenuItem
          icon={<FaUserInjured />}
          text="Patients"
          to="/patients"
          collapsed={sidebarCollapsed}
        />

        <MenuItem
          icon={<FaUserMd />}
          text="Doctors"
          to="/doctors"
          collapsed={sidebarCollapsed}
        />

        <MenuItem
          icon={<FaCalendarAlt />}
          text="Appointments"
          to="/appointments"
          collapsed={sidebarCollapsed}
        />

      </nav>

    </aside>

  );

}

function MenuItem({

  icon,

  text,

  to,

  collapsed

}) {

  return (

    <Link

      to={to}

      className="
        flex
        items-center
        gap-4

        px-6
        py-4

        hover:bg-slate-800
      "

    >

      {icon}

      {

        !collapsed &&

        <span>{text}</span>

      }

    </Link>

  );

}

export default Sidebar;