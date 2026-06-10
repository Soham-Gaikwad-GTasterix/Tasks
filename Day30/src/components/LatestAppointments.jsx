import {

  FaEllipsisVertical

} from "react-icons/fa6";

import { useTheme } from "../context/ThemeContext"

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { fetchAppointments } from "../store/appointmentSlice";

import { useNavigate } from "react-router-dom";

import Card from "./ui/Card";

import Button from "./ui/Button";

import Table from "./ui/Table";

import Badge from "./ui/Badge";

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

    <Card

      style={{ backgroundColor: colors.card }}

      className="

        mt-8

        border

        border-slate-800

        rounded-3xl

        overflow-hidden

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

        <Button

          variant="primary"

          type="button"

          onClick={() =>
            navigate("/appointments")
          }

        >

          View All

        </Button>

      </div>

      {/* TABLE */}

      <div

        className="
          overflow-x-auto
        "

      >

        <Table

          columns={[
            "ID",
            "Patient",
            "Doctor",
            "Date & Time",
            "Status",
            "Actions"
          ]}

        >

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

                        uppercase

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

                        uppercase
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

                      <Badge

                        className={
                          getStatusClass(
                            appointment.status
                            ?? "-"
                          )
                        }

                      >

                        {

                          appointment.status
                          ?? "-"

                        }

                      </Badge>

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

          

        </Table>

      </div>

    </Card>

  );

}

export default LatestAppointments;