import {

  FaEllipsisVertical

} from "react-icons/fa6";

import { useTheme } from "../context/ThemeContext"

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { fetchAppointments } from "../store/appointmentSlice";

import { useNavigate } from "react-router-dom";

function LatestAppointments() {

  const {
    data: appointments
  } = useSelector(
    (state) => state.appointments
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      appointments.length === 0
    ) {
      dispatch(
        fetchAppointments()
      );
    }
  }, [
    dispatch,
    appointments.length
  ]);

  const getStatusClass = (

    status

  ) => {

    switch (status) {

      case "Completed":

        return "bg-green-500/20 text-green-400";

      case "Scheduled":

        return "bg-yellow-500/20 text-yellow-400";

      case "Cancelled":

        return "bg-red-500/20 text-red-400";

      default:

        return "bg-orange-500/20 text-orange-400";

    }

  };

  const { colors} = useTheme();

  const navigate = useNavigate();

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

          onClick={() =>
            navigate("/appointments")
          }

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

                Date & Time

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

              appointments?.slice(-5).reverse().map(
                ( appointment ) => (

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
                    
                      aria-label="Appointment ID"

                      style={{ color: colors.text }}

                      className="

                        px-6

                        py-5

                      "

                    >

                      {

                        appointment.id
                        ?? "-"

                      }

                    </td>

                    <td

                      aria-label="Patient Name"

                      style={{ color: colors.text }}

                      className="

                        px-6

                        py-5

                      "

                    >

                      {

                        appointment.patient
                        ?? "-"

                      }

                    </td>

                    <td

                      aria-label="Doctor Name"
                    
                      style={{ color: colors.text }}

                      className="

                        px-6

                        py-5
                      "

                    >

                      {

                        appointment.doctor
                        ?? "-"

                      }

                    </td>

                    <td

                      aria-label="Appointment Date & Time"

                      style={{ color: colors.text }}

                      className="

                        px-6

                        py-5

                      "

                    >

                      {

                        appointment.date
                        ?? "-"

                      }
                      {" "}
                      at
                      {" "}
                      {

                        appointment.time
                        ?? "-"

                      }

                    </td>

                    <td

                      aria-label="Appointment Status"

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
                              ?? "-"

                            )

                          }

                        `}

                      >

                        {

                          appointment.status
                          ?? "-"

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