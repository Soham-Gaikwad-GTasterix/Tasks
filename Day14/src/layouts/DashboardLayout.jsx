import {
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";


function DashboardLayout() {

  const navigate =
    useNavigate();


  function handleLogout() {

    navigate("/");
  }


  return (

    <div
      className="
        min-h-screen
        flex
        bg-gray-100
      "
    >

      {/* Sidebar */}
      <aside
        className="
          w-72
          bg-gray-900
          text-white
          p-8
          shadow-2xl
          flex
          flex-col
          justify-between
        "
      >

        <div>

          <h1
            className="
              text-4xl
              font-bold
              mb-10
            "
          >
            Dashboard
          </h1>


          <nav
            className="
              flex
              flex-col
              gap-5
            "
          >

            <Link
              to="users"

              className="
                bg-blue-950
                hover:bg-blue-900
                p-4
                rounded-xl
                transition-all
              "
            >
              Users
            </Link>


            <Link
              to="settings"

              className="
                bg-blue-950
                hover:bg-blue-900
                p-4
                rounded-xl
                transition-all
              "
            >
              Settings
            </Link>

          </nav>

        </div>


        {/* Logout Button */}
        <button
          onClick={handleLogout}

          className="
            bg-red-500
            hover:bg-red-600
            transition-all
            p-4
            rounded-xl
            font-bold
            shadow-lg
          "
        >
          Logout
        </button>

      </aside>


      {/* Main Content */}
      <main
        className="
          flex-1
          p-10
        "
      >

        <div
          className="
            bg-white
            p-8
            rounded-3xl
            shadow-xl
            min-h-full
          "
        >

          <Outlet />

        </div>

      </main>

    </div>
  );
}

export default DashboardLayout;