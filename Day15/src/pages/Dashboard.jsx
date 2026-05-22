import {
  useContext
} from "react";

import {
  AuthContext
} from "../context/AuthContext";


function Dashboard() {

  const {
    user,
    dispatch
  } = useContext(AuthContext);


  function logout() {

    dispatch({
      type: "LOGOUT"
    });
  }


  return (

    <div
      className="
        min-h-screen
        flex
      "
    >

      {/* Sidebar */}
      <aside
        className={`
          w-72
          p-8
          flex
          flex-col
          justify-between
          text-white

          ${
            user.role === "admin"
              ? "bg-black"
              : "bg-gray-900"
          }
        `}
      >

        <div>

          <h1
            className={`
              text-4xl
              font-bold

              ${
                user.role === "admin"
                  ? "text-red-500"
                  : "text-white"
              }
            `}
          >
            {
              user.role === "admin"
                ? "Admin Panel"
                : "User Dashboard"
            }
          </h1>


          <div
            className="
              mt-10
              space-y-5
            "
          >

            {
              user.role === "admin"
                ? (
                  <>
                    <div
                      className="
                        bg-gray-800
                        p-4
                        rounded-xl
                      "
                    >
                      Analytics
                    </div>

                    <div
                      className="
                        bg-gray-800
                        p-4
                        rounded-xl
                      "
                    >
                      Manage Doctors
                    </div>

                    <div
                      className="
                        bg-gray-800
                        p-4
                        rounded-xl
                      "
                    >
                      System Logs
                    </div>
                  </>
                )

                : (

                  <>
                    <div
                      className="
                        bg-blue-900
                        p-4
                        rounded-xl
                      "
                    >
                      My Appointments
                    </div>

                    <div
                      className="
                        bg-blue-900
                        p-4
                        rounded-xl
                      "
                    >
                      Health Reports
                    </div>
                  </>
                )
            }

          </div>

        </div>


        <button

          onClick={logout}

          className="
            bg-red-500
            hover:bg-red-600
            transition-all
            py-3
            rounded-xl
            font-bold
          "
        >
          Logout
        </button>

      </aside>


      {/* Main Content */}
      <main
        className="
          flex-1
          bg-gray-100
          p-10
        "
      >

        <h1
          className="
            text-5xl
            font-bold
          "
        >
          Welcome,
          {" "}
          {user.name}
        </h1>


        <p
          className="
            mt-3
            text-gray-500
            text-xl
          "
        >
          Role:
          {" "}
          {user.role}
        </p>


        <div
          className="
            mt-10
            grid
            md:grid-cols-3
            gap-6
          "
        >

          {
            user.role === "admin"
              ? (
                <>
                  <div
                    className="
                      bg-white
                      p-8
                      rounded-3xl
                      shadow-xl
                    "
                  >
                    <h2
                      className="
                        text-3xl
                        font-bold
                      "
                    >
                      1,240
                    </h2>

                    <p
                      className="
                        mt-2
                        text-gray-500
                      "
                    >
                      Total Patients
                    </p>

                  </div>


                  <div
                    className="
                      bg-white
                      p-8
                      rounded-3xl
                      shadow-xl
                    "
                  >
                    <h2
                      className="
                        text-3xl
                        font-bold
                      "
                    >
                      84
                    </h2>

                    <p
                      className="
                        mt-2
                        text-gray-500
                      "
                    >
                      Doctors
                    </p>

                  </div>


                  <div
                    className="
                      bg-white
                      p-8
                      rounded-3xl
                      shadow-xl
                    "
                  >
                    <h2
                      className="
                        text-3xl
                        font-bold
                      "
                    >
                      312
                    </h2>

                    <p
                      className="
                        mt-2
                        text-gray-500
                      "
                    >
                      Appointments
                    </p>

                  </div>
                </>
              )

              : (

                <>
                  <div
                    className="
                      bg-blue-100
                      p-8
                      rounded-3xl
                    "
                  >
                    <h2
                      className="
                        text-3xl
                        font-bold
                      "
                    >
                      Next Appointment
                    </h2>

                    <p className="mt-3">
                      Dr. Smith — 4 PM
                    </p>

                  </div>


                  <div
                    className="
                      bg-green-100
                      p-8
                      rounded-3xl
                    "
                  >
                    <h2
                      className="
                        text-3xl
                        font-bold
                      "
                    >
                      Health Status
                    </h2>

                    <p className="mt-3">
                      Stable
                    </p>

                  </div>

                </>
              )
          }

        </div>

      </main>

    </div>
  );
}

export default Dashboard;