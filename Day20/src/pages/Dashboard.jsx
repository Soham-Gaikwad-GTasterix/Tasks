import {
  Link
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import Navbar
from "../components/Navbar";


function Dashboard() {

  const [time, setTime] =
    useState(
      new Date()
    );

  const [activities] =
    useState([

      "Patient Added",

      "Doctor Updated",

      "Appointment Scheduled",

      "New Admission",

      "Discharge Completed"

    ]);


  /*
  =====================================
  LIVE CLOCK
  =====================================
  */

  useEffect(() => {

    const interval =

      setInterval(() => {

        setTime(
          new Date()
        );

      }, 1000);

    return () =>
      clearInterval(interval);

  }, []);


  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-100
        via-indigo-100
        to-purple-100
      "
    >

      <Navbar />


      <div
        className="
          p-10
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            justify-between
            items-center
            gap-6
            mb-12
          "
        >

          <div>

            <h1
              className="
                text-6xl
                font-black
                text-blue-700
              "
            >
              Hospital Dashboard
            </h1>

            <p
              className="
                text-gray-500
                text-xl
                mt-3
              "
            >
              Welcome Back, Admin
            </p>

          </div>


          <div
            className="
              bg-white
              px-8
              py-5
              rounded-3xl
              shadow-xl
              text-center
            "
          >

            <h2
              className="
                text-gray-500
                text-lg
              "
            >
              Current Time
            </h2>

            <h1
              className="
                text-3xl
                font-bold
                text-blue-700
                mt-2
              "
            >
              {
                time.toLocaleTimeString()
              }
            </h1>

          </div>

        </div>


        {/* STATS */}

        <div
          className="
            grid
            md:grid-cols-3
            gap-8
            mb-12
          "
        >

          {/* PATIENTS */}

          <Link to="/patients">

            <div
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-2xl
                hover:scale-105
                transition-all
                cursor-pointer
                border-l-8
                border-blue-500
              "
            >

              <h2
                className="
                  text-gray-500
                  text-xl
                "
              >
                Total Patients
              </h2>

              <h1
                className="
                  text-6xl
                  font-black
                  text-blue-700
                  mt-4
                "
              >
                10
              </h1>

              <p
                className="
                  text-blue-500
                  mt-4
                "
              >
                Manage Patients →
              </p>

            </div>

          </Link>


          {/* DOCTORS */}

          <Link to="/doctors">

            <div
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-2xl
                hover:scale-105
                transition-all
                cursor-pointer
                border-l-8
                border-green-500
              "
            >

              <h2
                className="
                  text-gray-500
                  text-xl
                "
              >
                Doctors
              </h2>

              <h1
                className="
                  text-6xl
                  font-black
                  text-green-600
                  mt-4
                "
              >
                10
              </h1>

              <p
                className="
                  text-green-500
                  mt-4
                "
              >
                Manage Doctors →
              </p>

            </div>

          </Link>


          {/* APPOINTMENTS */}

          <Link to="/appointments">

            <div
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-2xl
                hover:scale-105
                transition-all
                cursor-pointer
                border-l-8
                border-red-500
              "
            >

              <h2
                className="
                  text-gray-500
                  text-xl
                "
              >
                Appointments
              </h2>

              <h1
                className="
                  text-6xl
                  font-black
                  text-red-600
                  mt-4
                "
              >
                100
              </h1>

              <p
                className="
                  text-red-500
                  mt-4
                "
              >
                View Appointments →
              </p>

            </div>

          </Link>

        </div>


        {/* QUICK ACTIONS + ACTIVITY */}

        <div
          className="
            grid
            lg:grid-cols-2
            gap-8
          "
        >

          {/* QUICK ACTIONS */}

          <div
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-xl
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-6
              "
            >
              Quick Actions
            </h2>

            <div
              className="
                flex
                flex-col
                gap-4
              "
            >

              <Link to="/patients">

                <button
                  className="
                    w-full
                    bg-blue-500
                    hover:bg-blue-600
                    text-white
                    py-4
                    rounded-xl
                    transition-all
                  "
                >
                  Add Patient
                </button>

              </Link>


              <Link to="/doctors">

                <button
                  className="
                    w-full
                    bg-green-500
                    hover:bg-green-600
                    text-white
                    py-4
                    rounded-xl
                    transition-all
                  "
                >
                  Add Doctor
                </button>

              </Link>


              <Link to="/appointments">

                <button
                  className="
                    w-full
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    py-4
                    rounded-xl
                    transition-all
                  "
                >
                  Book Appointment
                </button>

              </Link>

            </div>

          </div>


          {/* RECENT ACTIVITY */}

          <div
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-xl
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-6
              "
            >
              Recent Activity
            </h2>

            <div
              className="
                space-y-4
              "
            >

              {
                activities.map(

                  (activity, index) => (

                    <div

                      key={index}

                      className="
                        bg-gray-100
                        p-4
                        rounded-xl
                      "
                    >

                      ✅ {activity}

                    </div>

                  )

                )
              }

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;