import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LayoutTwo() {

  const navigate =
    useNavigate();

  const [stats,
    setStats] =
      useState({

        revenue: 50000,

        patients: 1240,

        doctors: 84,

        appointments: 312

      });


  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        p-10
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          justify-between
          items-center
          mb-10
        "
      >

        <h1
          className="
            text-5xl
            font-bold
            text-blue-700
          "
        >
          Analytics Dashboard
        </h1>


        <button

          onClick={() =>
            navigate("/")
          }

          className="
            bg-blue-600
            hover:bg-blue-700
            transition-all
            text-white
            px-5
            py-3
            rounded-xl
          "
        >
          Back
        </button>

      </div>


      {/* GRID */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
        "
      >

        {/* REVENUE */}

        <div

          onClick={() =>

            setStats({

              ...stats,

              revenue:
                stats.revenue + 1000

            })

          }

          className="
            bg-white
            rounded-3xl
            p-8
            shadow-xl
            cursor-pointer
            hover:scale-105
            transition-all
          "
        >

          <h2
            className="
              text-gray-500
              text-xl
            "
          >
            Revenue
          </h2>


          <h1
            className="
              text-5xl
              font-bold
              text-green-600
              mt-4
            "
          >
            ₹{stats.revenue}
          </h1>


          <p
            className="
              mt-4
              text-green-500
            "
          >
            Click To Add Revenue
          </p>

        </div>


        {/* PATIENTS */}

        <div

          onClick={() =>

            setStats({

              ...stats,

              patients:
                stats.patients + 1

            })

          }

          className="
            bg-white
            rounded-3xl
            p-8
            shadow-xl
            cursor-pointer
            hover:scale-105
            transition-all
          "
        >

          <h2
            className="
              text-gray-500
              text-xl
            "
          >
            Patients
          </h2>


          <h1
            className="
              text-5xl
              font-bold
              text-blue-600
              mt-4
            "
          >
            {stats.patients}
          </h1>


          <p
            className="
              mt-4
              text-blue-500
            "
          >
            Click To Add Patient
          </p>

        </div>


        {/* DOCTORS */}

        <div

          onClick={() =>

            setStats({

              ...stats,

              doctors:
                stats.doctors + 1

            })

          }

          className="
            bg-white
            rounded-3xl
            p-8
            shadow-xl
            cursor-pointer
            hover:scale-105
            transition-all
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
              text-5xl
              font-bold
              text-purple-600
              mt-4
            "
          >
            {stats.doctors}
          </h1>


          <p
            className="
              mt-4
              text-purple-500
            "
          >
            Click To Hire Doctor
          </p>

        </div>


        {/* APPOINTMENTS */}

        <div

          onClick={() =>

            setStats({

              ...stats,

              appointments:
                stats.appointments + 1

            })

          }

          className="
            bg-white
            rounded-3xl
            p-8
            shadow-xl
            cursor-pointer
            hover:scale-105
            transition-all
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
              text-5xl
              font-bold
              text-red-600
              mt-4
            "
          >
            {stats.appointments}
          </h1>


          <p
            className="
              mt-4
              text-red-500
            "
          >
            Click To Add Appointment
          </p>

        </div>

      </div>


      {/* SUMMARY */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-xl
          p-8
          mt-10
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Hospital Summary
        </h2>


        <div
          className="
            space-y-3
            text-lg
          "
        >

          <p>
            Revenue: ₹{stats.revenue}
          </p>

          <p>
            Patients: {stats.patients}
          </p>

          <p>
            Doctors: {stats.doctors}
          </p>

          <p>
            Appointments: {stats.appointments}
          </p>

        </div>

      </div>

    </div>

  );
}

export default LayoutTwo;