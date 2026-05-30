import {

  FaChartLine,
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaTimes

} from "react-icons/fa";

function Sidebar({

  sidebarOpen,
  setSidebarOpen

}) {

  return (

    <>

      {/* MOBILE OVERLAY */}

      {
        sidebarOpen && (

          <div

            onClick={() =>
              setSidebarOpen(false)
            }

            className="
              fixed
              inset-0
              bg-black/50
              z-40
              lg:hidden
            "
          />

        )
      }

      <aside

        className={`

          fixed
          top-0
          left-0
          h-screen
          w-72

          bg-[var(--card)]

          shadow-2xl

          z-50

          transition-transform
          duration-300

          ${
            sidebarOpen

              ? "translate-x-0"

              : "-translate-x-full"
          }

          lg:translate-x-0

        `}
      >

        <div
          className="
            flex
            justify-between
            items-center
            p-6
            border-b
          "
        >

          <h1
            className="
              text-2xl
              font-bold
              text-blue-500
            "
          >
            Admin Panel
          </h1>

          <button

            onClick={() =>
              setSidebarOpen(false)
            }

            className="
              lg:hidden
            "
          >

            <FaTimes />

          </button>

        </div>

        <nav
          className="
            p-6
            space-y-6
          "
        >

          <SidebarItem
            icon={<FaChartLine />}
            label="Dashboard"
          />

          <SidebarItem
            icon={<FaUsers />}
            label="Users"
          />

          <SidebarItem
            icon={<FaShoppingCart />}
            label="Orders"
          />

          <SidebarItem
            icon={<FaCog />}
            label="Settings"
          />

        </nav>

      </aside>

    </>

  );
}

function SidebarItem({

  icon,
  label

}) {

  return (

    <div

      className="
        flex
        items-center
        gap-4

        cursor-pointer

        p-4

        rounded-xl

        hover:bg-blue-100

        transition-all
      "
    >

      {icon}

      <span>
        {label}
      </span>

    </div>

  );
}

export default Sidebar;