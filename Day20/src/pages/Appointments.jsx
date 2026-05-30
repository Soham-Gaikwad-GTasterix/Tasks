import {

  useState,

  useEffect

} from "react";

import { List } from "react-window";

import Navbar
from "../components/Navbar";

import Loader
from "../components/Loader";

import useAppointments
from "../hooks/useAppointments";

import AppointmentCard
from "../components/AppointmentCard";

import Sidebar
from "../components/Sidebar";


function Appointments({

  sidebarCollapsed,

  setSidebarCollapsed

}) {

  /*
  =====================================
  STATES
  =====================================
  */

  const [isModalOpen,
    setIsModalOpen] =
      useState(false);


  const [patientName,
    setPatientName] =
      useState("");


  const [doctorName,
    setDoctorName] =
      useState("");


  const [appointmentDate,
    setAppointmentDate] =
      useState("");    

  const [appointmentTime,
    setAppointmentTime] =
      useState("");

  const [appointmentStatus,
    setAppointmentStatus] =
      useState("Scheduled");      

  const {

    appointments,

    loading,

    error,

    addAppointment,

    deleteAppointment,

    updateAppointment

  } = useAppointments();




  /*
  =====================================
  LOADING
  =====================================
  */

  if (loading) {

    return <Loader />;
  }


  async function updateAppointmentStatus(
    appointment
  ) {

    const nextStatus =

      appointment.status ===
      "Scheduled"

        ? "Completed"

      : appointment.status ===
        "Completed"

        ? "Cancelled"

        : "Scheduled";

    await updateAppointment({

      ...appointment,

      status: nextStatus

    });

  }


  /*
  =====================================
  VIRTUALIZED ROW
  =====================================
  */

    function Row({

    index,

    style,

    appointments

    }) {

    const appointment =
      appointments[index];


    return (

      <div
        style={style}
        className="
          px-4
          py-3
        "
      >

        <AppointmentCard

          appointment={
            appointment
          }

          onDelete={
            deleteAppointment
          }

          onUpdateStatus={
            updateAppointmentStatus
          }

        />

      </div>

    );
  }


  return (

    <div
      className="
        min-h-screen
        bg-red-50
      "
    >

      <Sidebar

        sidebarCollapsed={
          sidebarCollapsed
        }

        setSidebarCollapsed={
          setSidebarCollapsed
        }

      />

      <div

        className={`

          transition-all
          duration-300

          ${
            sidebarCollapsed

              ? "ml-20"

              : "ml-72"
          }

        `}

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
            justify-between
            items-center
            mb-10
        "
        >

        <div>

            <h1
            className="
                text-6xl
                font-black
                text-red-600
            "
            >
            Appointments
            </h1>


            <p
            className="
                text-gray-500
                text-xl
                mt-3
            "
            >
            Virtualized Appointment List
            </p>

        </div>


        <button

            onClick={() =>
            setIsModalOpen(true)
            }

            className="
            bg-red-500
            hover:bg-red-600
            transition-all
            text-white
            px-6
            py-4
            rounded-2xl
            font-bold
            shadow-xl
            "
        >
            Add Appointment
        </button>

        </div>

        {
        isModalOpen && (

            <div
            className="
                fixed
                inset-0
                bg-black/50
                flex
                items-center
                justify-center
                z-50
            "
            >

            <div
                className="
                bg-white
                rounded-3xl
                shadow-2xl
                p-8
                w-full
                max-w-lg
                "
            >

                <h1
                className="
                    text-4xl
                    font-black
                    text-red-600
                    mb-8
                "
                >
                Add Appointment
                </h1>


                {/* PATIENT */}
                <input

                type="text"

                placeholder="Patient Name"

                value={patientName}

                onChange={(e) =>

                    setPatientName(
                    e.target.value
                    )

                }

                className="
                    w-full
                    border
                    border-gray-300
                    p-4
                    rounded-xl
                    mb-5
                "
                />


                {/* DOCTOR */}
                <input

                type="text"

                placeholder="Doctor Name"

                value={doctorName}

                onChange={(e) =>

                    setDoctorName(
                    e.target.value
                    )

                }

                className="
                    w-full
                    border
                    border-gray-300
                    p-4
                    rounded-xl
                    mb-5
                "
                />


                {/* DATE */}
                <input

                type="date"

                value={appointmentDate}

                onChange={(e) =>

                    setAppointmentDate(
                    e.target.value
                    )

                }

                className="
                    w-full
                    border
                    border-gray-300
                    p-4
                    rounded-xl
                    mb-8
                "
                />

                <input

                  type="time"

                  value={appointmentTime}

                  onChange={(e) =>

                    setAppointmentTime(
                      e.target.value
                    )

                  }

                  className="
                    w-full
                    border
                    border-gray-300
                    p-4
                    rounded-xl
                    mb-5
                  "

                />

                <select

                  value={appointmentStatus}

                  onChange={(e) =>

                    setAppointmentStatus(
                      e.target.value
                    )

                  }

                  className="
                    w-full
                    border
                    border-gray-300
                    p-4
                    rounded-xl
                    mb-8
                  "
                >

                  <option value="Scheduled">
                    Scheduled
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>


                {/* BUTTONS */}
                <div
                className="
                    flex
                    gap-4
                "
                >

                <button

                  type="button"

                  onClick={async () => {

                    await addAppointment({

                      patient: patientName,

                      doctor: doctorName,

                      date: appointmentDate,

                      time: appointmentTime,

                      status: appointmentStatus

                    });

                    setPatientName("");

                    setDoctorName("");

                    setAppointmentDate("");

                    setAppointmentTime("");

                    setAppointmentStatus(
                      "Scheduled"
                    );

                    setIsModalOpen(false);

                  }}

                    className="
                    flex-1
                    bg-red-500
                    hover:bg-red-600
                    transition-all
                    text-white
                    py-4
                    rounded-2xl
                    font-bold
                    "
                >
                    Save
                </button>


                <button

                    type="button"

                    onClick={() =>

                    setIsModalOpen(false)

                    }

                    className="
                    flex-1
                    bg-gray-400
                    hover:bg-gray-500
                    transition-all
                    text-white
                    py-4
                    rounded-2xl
                    font-bold
                    "
                >
                    Cancel
                </button>

                </div>

            </div>

            </div>

        )
        }        

        {/* VIRTUALIZED LIST */}
        <div
          className="
            bg-white/40
            rounded-3xl
            p-4
            shadow-2xl
          "
        >

        {
          appointments.length === 0 ? (

            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                py-20
              "
            >

              <h2
                className="
                  text-5xl
                  font-bold
                  text-gray-500
                "
              >
                No Appointments Found
              </h2>

              <p
                className="
                  text-gray-400
                  mt-4
                "
              >
                Click Add Appointment
                to create one.
              </p>

            </div>

          ) : (

            <List

              defaultHeight={650}
              rowCount={appointments.length}
              rowHeight={140}
              rowComponent={Row}
              rowProps={{

                appointments

              }}

            >


            </List>

          )
        }

        </div>

      </div>

      </div>

    </div>
  );
}

export default Appointments;