import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LayoutThree() {

  const navigate =
    useNavigate();

  const [patientName,
    setPatientName] =
      useState("");

  const [doctorName,
    setDoctorName] =
      useState("");

  const [appointments,
    setAppointments] =
      useState([]);


  function addAppointment() {

    if (
      !patientName.trim() ||
      !doctorName.trim()
    ) {
      return;
    }

    setAppointments([

      ...appointments,

      {
        id: Date.now(),
        patient: patientName,
        doctor: doctorName
      }

    ]);

    setPatientName("");
    setDoctorName("");
  }


  function deleteAppointment(id) {

    setAppointments(

      appointments.filter(

        (appointment) =>

          appointment.id !== id

      )

    );
  }


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
            text-purple-700
          "
        >
          Appointment Booking
        </h1>


        <button

          onClick={() =>
            navigate("/")
          }

          className="
            bg-purple-600
            hover:bg-purple-700
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


      {/* FLEXBOX LAYOUT */}

      <div
        className="
          flex
          gap-8
          flex-col
          lg:flex-row
        "
      >

        {/* LEFT PANEL */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-xl
            p-8
            flex-1
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              mb-6
            "
          >
            Book Appointment
          </h2>


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
              p-4
              rounded-xl
              mb-4
            "
          />


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
              p-4
              rounded-xl
              mb-6
            "
          />


          <button

            onClick={addAppointment}

            className="
              w-full
              bg-purple-600
              hover:bg-purple-700
              transition-all
              text-white
              py-4
              rounded-xl
              font-bold
            "
          >
            Add Appointment
          </button>

        </div>


        {/* RIGHT PANEL */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-xl
            p-8
            flex-1
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              mb-6
            "
          >
            Appointment List
          </h2>


          <div
            className="
              space-y-4
            "
          >

            {
              appointments.map(

                (appointment) => (

                  <div

                    key={appointment.id}

                    className="
                      bg-purple-50
                      rounded-2xl
                      p-5
                      flex
                      justify-between
                      items-center
                    "
                  >

                    <div>

                      <h3
                        className="
                          font-bold
                          text-xl
                        "
                      >
                        {
                          appointment.patient
                        }
                      </h3>

                      <p>
                        Doctor:
                        {" "}
                        {
                          appointment.doctor
                        }
                      </p>

                    </div>


                    <button

                      onClick={() =>

                        deleteAppointment(
                          appointment.id
                        )

                      }

                      className="
                        bg-red-500
                        hover:bg-red-600
                        transition-all
                        text-white
                        px-4
                        py-2
                        rounded-xl
                      "
                    >
                      Delete
                    </button>

                  </div>

                )

              )
            }

          </div>

        </div>

      </div>

    </div>

  );
}

export default LayoutThree;