import {

  useState,

  useEffect

} from "react";

import { List } from "react-window";

import Navbar
from "../components/Navbar";

import Loader
from "../components/Loader";

import hospitalApi
from "../api/hospitalApi";


function Appointments() {

  /*
  =====================================
  STATES
  =====================================
  */

  const [appointments,
    setAppointments] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  const [error,
    setError] =
      useState(null);

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

  /*
  =====================================
  FETCH
  =====================================
  */

  useEffect(() => {

    async function fetchAppointments() {

      try {

        setLoading(true);


        await new Promise(

          (resolve) =>

            setTimeout(
              resolve,
              1500
            )

        );


        const response =
          await fetch(

            "/appointments"

          );

        const data =
          await response.json();


        /*
        =====================================
        LARGE DATASET
        =====================================
        */

        const generatedAppointments =

          Array.from(

            { length: 100 },

            (_, index) => ({

              id: index + 1,

              patient:
                data[
                  index % data.length
                ].name,

              doctor:
                `Dr. ${
                  data[
                    index % data.length
                  ].username
                }`,

              date:
                `2026-06-${
                  (index % 30) + 1
                }`,

              time:
                `${9 + (index % 8)}:00`,

              status:
                "Scheduled"

            })

          );


        setAppointments(
          generatedAppointments
        );

      } catch (err) {

        setError(
          "Failed To Fetch Appointments"
        );

      } finally {

        setLoading(false);
      }
    }

    fetchAppointments();

  }, []);


  /*
  =====================================
  DELETE
  =====================================
  */

  function deleteAppointment(id) {

    setAppointments(

      appointments.filter(

        (appointment) =>

          appointment.id !== id

      )

    );
  }

  function addAppointment() {

    const newAppointment = {

      id: Date.now(),

      patient: patientName,

      doctor: doctorName,

      date: appointmentDate,

      time: appointmentTime,

      status: appointmentStatus

    };

    setAppointments(

      [newAppointment, ...appointments]

    );

  }

  /*
  =====================================
  LOADING
  =====================================
  */

  if (loading) {

    return <Loader />;
  }


  /*
  =====================================
  ERROR
  =====================================
  */

  if (error) {

    return (

      <div
        className="
          text-red-500
          text-4xl
          font-bold
          mt-20
          text-center
        "
      >
        {error}
      </div>

    );
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

      <div
        className="
          bg-white
          rounded-3xl
          shadow-xl
          p-3
          flex
          justify-between
          items-center
          hover:scale-[1.01]
          transition-all
          duration-300
        "
      >

        {/* LEFT SIDE */}

        <div
          className="
            px-2
        ">

          <h1
            className="
              text-2xl
              font-bold
              text-blue-700
            "
          >
            {appointment.patient}
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            {appointment.doctor}
          </p>

          <p
            className="
              text-sm
              text-gray-500
              mt-2
            "
          >
            Date:
            {" "}
            {appointment.date}
          </p>

          <p
            className="
              text-sm
              text-gray-500
            "
          >
            Time:
            {" "}
            {appointment.time}
          </p>

        </div>


        {/* RIGHT SIDE */}

        <div
          className="
            flex
            items-end
            gap-3
            px-2
          "
        >

          <span
            className={`
              px-4
              py-2
              rounded-full
              text-sm
              font-bold

              ${
                appointment.status === "Completed"

                  ? "bg-green-100 text-green-700"

                : appointment.status === "Cancelled"

                  ? "bg-red-100 text-red-700"

                : "bg-yellow-100 text-yellow-700"
              }
            `}
          >
            {appointment.status}
          </span>


          <button

            onClick={() => {

              const newStatus =

                appointment.status ===
                "Scheduled"

                  ? "Completed"

                : appointment.status ===
                  "Completed"

                  ? "Cancelled"

                  : "Scheduled";


              setAppointments(

                appointments.map(

                  (item) =>

                    item.id ===
                    appointment.id

                      ? {

                          ...item,

                          status:
                            newStatus

                        }

                      : item

                )

              );

            }}

            className="
              bg-blue-500
              hover:bg-blue-600
              text-white
              px-5
              py-2
              rounded-xl
              font-semibold
            "
          >
            Update Status
          </button>


          <button

            onClick={() =>

              deleteAppointment(
                appointment.id
              )

            }

            className="
              bg-red-500
              hover:bg-red-600
              text-white
              px-5
              py-2
              rounded-xl
              font-semibold
            "
          >
            Remove
          </button>

        </div>

      </div>

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

                    onClick={() => {

                    addAppointment();

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

          <List

            defaultHeight={650}
            rowCount={appointments.length}
            rowHeight={140}
            rowComponent={Row}
            rowProps={{ appointments }}

          >

            {Row}

          </List>

        </div>

      </div>

    </div>
  );
}

export default Appointments;