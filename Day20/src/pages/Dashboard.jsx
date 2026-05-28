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

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div
          className="
            flex
            justify-between
            items-center
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
              Welcome back, Admin
            </p>

          </div>


          {/* LIVE CLOCK */}
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


        {/* ========================= */}
        {/* STATS CARDS */}
        {/* ========================= */}

        <div
          className="
            grid
            grid-cols-3
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

          </div>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;