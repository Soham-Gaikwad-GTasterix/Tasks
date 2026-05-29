import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LayoutOne() {

  const navigate =
    useNavigate();

  const [selectedPage,
    setSelectedPage] =
      useState("Dashboard");


  function renderContent() {

    switch (selectedPage) {

      case "Patients":

        return (

          <div>

            <h1
              className="
                text-4xl
                font-bold
                text-blue-700
              "
            >
              Patients
            </h1>

            <p className="mt-4">
              Total Patients: 1240
            </p>

          </div>

        );


      case "Doctors":

        return (

          <div>

            <h1
              className="
                text-4xl
                font-bold
                text-green-700
              "
            >
              Doctors
            </h1>

            <p className="mt-4">
              Active Doctors: 84
            </p>

          </div>

        );


      case "Appointments":

        return (

          <div>

            <h1
              className="
                text-4xl
                font-bold
                text-red-700
              "
            >
              Appointments
            </h1>

            <p className="mt-4">
              Today's Appointments: 312
            </p>

          </div>

        );


      default:

        return (

          <div>

            <h1
              className="
                text-4xl
                font-bold
                text-blue-700
                mb-8
              "
            >
              Dashboard
            </h1>


            <div
              className="
                grid
                md:grid-cols-3
                gap-6
              "
            >

              <div
                className="
                  bg-blue-100
                  p-6
                  rounded-2xl
                "
              >
                <h2>Patients</h2>

                <h1
                  className="
                    text-4xl
                    font-bold
                  "
                >
                  1240
                </h1>

              </div>


              <div
                className="
                  bg-green-100
                  p-6
                  rounded-2xl
                "
              >
                <h2>Doctors</h2>

                <h1
                  className="
                    text-4xl
                    font-bold
                  "
                >
                  84
                </h1>

              </div>


              <div
                className="
                  bg-red-100
                  p-6
                  rounded-2xl
                "
              >
                <h2>Appointments</h2>

                <h1
                  className="
                    text-4xl
                    font-bold
                  "
                >
                  312
                </h1>

              </div>

            </div>

          </div>

        );
    }
  }


  return (

    <div
      className="
        min-h-screen
        bg-gray-100
      "
    >

      {/* Header */}

      <header
        className="
          bg-blue-700
          text-white
          p-5
          flex
          justify-between
          items-center
        "
      >

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Admin Layout
        </h1>


        <button

          onClick={() =>
            navigate("/")
          }

          className="
            bg-white
            text-blue-700
            px-4
            py-2
            rounded-xl
          "
        >
          Back
        </button>

      </header>


      <div className="flex">

        {/* Sidebar */}

        <aside
          className="
            w-64
            bg-white
            min-h-screen
            shadow-xl
            p-5
          "
        >

          <h2
            className="
              text-xl
              font-bold
              mb-6
            "
          >
            Menu
          </h2>


          <div
            className="
              flex
              flex-col
              gap-3
            "
          >

            <button

              onClick={() =>
                setSelectedPage(
                  "Dashboard"
                )
              }

              className={`
                p-3
                rounded-xl
                text-left

                ${
                  selectedPage ===
                  "Dashboard"

                    ? "bg-blue-500 text-white"

                    : "bg-gray-100"
                }
              `}
            >
              Dashboard
            </button>


            <button

              onClick={() =>
                setSelectedPage(
                  "Patients"
                )
              }

              className={`
                p-3
                rounded-xl
                text-left

                ${
                  selectedPage ===
                  "Patients"

                    ? "bg-blue-500 text-white"

                    : "bg-gray-100"
                }
              `}
            >
              Patients
            </button>


            <button

              onClick={() =>
                setSelectedPage(
                  "Doctors"
                )
              }

              className={`
                p-3
                rounded-xl
                text-left

                ${
                  selectedPage ===
                  "Doctors"

                    ? "bg-blue-500 text-white"

                    : "bg-gray-100"
                }
              `}
            >
              Doctors
            </button>


            <button

              onClick={() =>
                setSelectedPage(
                  "Appointments"
                )
              }

              className={`
                p-3
                rounded-xl
                text-left

                ${
                  selectedPage ===
                  "Appointments"

                    ? "bg-blue-500 text-white"

                    : "bg-gray-100"
                }
              `}
            >
              Appointments
            </button>

          </div>

        </aside>


        {/* Main Content */}

        <main
          className="
            flex-1
            p-10
          "
        >
          {renderContent()}
        </main>

      </div>

    </div>

  );
}

export default LayoutOne;