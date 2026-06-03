import {

  FaEllipsisVertical

} from "react-icons/fa6";

import { useTheme } from "../context/ThemeContext"

function LatestAppointments() {

  const appointments = [

    {

      id: "#APT001",

      patient: "John Doe",

      doctor: "Dr. Smith",

      date: "2026-06-25",

      status: "Completed"

    },

    {

      id: "#APT002",

      patient: "Jane Smith",

      doctor: "Dr. Wilson",

      date: "2026-06-26",

      status: "Pending"

    },

    {

      id: "#APT003",

      patient: "Michael Brown",

      doctor: "Dr. Adams",

      date: "2026-06-27",

      status: "Cancelled"

    },

    {

      id: "#APT004",

      patient: "Emma Johnson",

      doctor: "Dr. Lee",

      date: "2026-06-28",

      status: "Completed"

    },

    {

      id: "#APT005",

      patient: "David Clark",

      doctor: "Dr. White",

      date: "2026-06-29",

      status: "Pending"

    }

  ];

  const getStatusClass = (

    status

  ) => {

    switch (status) {

      case "Completed":

        return "bg-green-500/20 text-green-400";

      case "Pending":

        return "bg-yellow-500/20 text-yellow-400";

      case "Cancelled":

        return "bg-red-500/20 text-red-400";

      default:

        return "bg-slate-500/20 text-slate-400";

    }

  };

  const { colors, darkMode } = useTheme();

  return (

    <div

      style={{ backgroundColor: colors.card }}

      className="

        mt-8

        border

        border-slate-800

        rounded-3xl

        overflow-hidden

        shadow-xl

      "

    >

      {/* HEADER */}

      <div

        className="

          px-6

          py-5

          border-b

          border-slate-800

          flex

          justify-between

          items-center

        "

      >

        <div>

          <h2

            style={{ color: colors.text }}

            className="

              text-2xl

              font-bold

            "

          >

            Latest Appointments

          </h2>

          <p

            style={{ color: colors.text }}

            className="

              mt-1

            "

          >

            Recent hospital bookings

          </p>

        </div>

        <button

          type="button"

          className="

            px-4

            py-2

            bg-indigo-600

            hover:bg-indigo-700

            text-white

            rounded-xl

            transition-all

          "

        >

          View All

        </button>

      </div>

      {/* TABLE */}

      <div

        className="
          overflow-x-auto
        "

      >

        <table

          className="
            w-full
          "

        >

          <thead>

            <tr

              style={{ backgroundColor: colors.card }}

            >

              <th

                style={{ color: colors.text }}


                className="

                  text-left

                  px-6

                  py-4

                "

              >

                ID

              </th>

              <th

                style={{ color: colors.text }}

                className="

                  text-left

                  px-6

                  py-4

                "

              >

                Patient

              </th>

              <th

                style={{ color: colors.text }}

                className="

                  text-left

                  px-6

                  py-4
                "

              >

                Doctor

              </th>

              <th

              style={{ color: colors.text }}

                className="

                  text-left

                  px-6

                  py-4

                "

              >

                Date

              </th>

              <th

                style={{ color: colors.text }}

                className="

                  text-left

                  px-6

                  py-4
                "

              >

                Status

              </th>

              <th

                style={{ color: colors.text }}

                className="

                  text-center

                  px-6

                  py-4

                "

              >

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {

              appointments.map(

                (

                  appointment

                ) => (

                  <tr

                    key={

                      appointment.id

                    }

                    className="

                      border-t

                      border-slate-800

                      transition-all

                    "

                  >

                    <td

                      style={{ color: colors.text }}

                      className="

                        px-6

                        py-5

                      "

                    >

                      {

                        appointment.id

                      }

                    </td>

                    <td

                      style={{ color: colors.text }}

                      className="

                        px-6

                        py-5

                      "

                    >

                      {

                        appointment.patient

                      }

                    </td>

                    <td
                    
                      style={{ color: colors.text }}

                      className="

                        px-6

                        py-5
                      "

                    >

                      {

                        appointment.doctor

                      }

                    </td>

                    <td

                      style={{ color: colors.text }}

                      className="

                        px-6

                        py-5

                      "

                    >

                      {

                        appointment.date

                      }

                    </td>

                    <td

                      className="

                        px-6

                        py-5

                      "

                    >

                      <span

                        className={`

                          px-3

                          py-1

                          rounded-full

                          text-sm

                          font-medium

                          ${

                            getStatusClass(

                              appointment.status

                            )

                          }

                        `}

                      >

                        {

                          appointment.status

                        }

                      </span>

                    </td>

                    <td

                      className="

                        px-6

                        py-5

                        text-center

                      "

                    >

                      <button

                        type="button"

                        style={{ color: colors.text }}

                        className="

                          hover:text-white

                        "

                      >

                        <FaEllipsisVertical />

                      </button>

                    </td>

                  </tr>

                )

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default LatestAppointments;