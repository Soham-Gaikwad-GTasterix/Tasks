import {

  useState,

  useEffect,

  useRef

} from "react";

import { List } from "react-window";

import Loader
from "../components/Loader";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchAppointments,
  addAppointment,
  deleteAppointment,
  updateAppointment
} from "../store/appointmentSlice";

import AppointmentCard
from "../components/AppointmentCard";

import { useTheme } from "../context/ThemeContext"

import Button from "../components/ui/Button";

import Input from "../components/ui/Input";

import Modal from "../components/ui/Modal"

function Appointments() {

  const [isModalOpen,
    setIsModalOpen] =
      useState(false);

  const patientInputRef = useRef(null);

  useEffect(() => {
    if (
      isModalOpen && 
      patientInputRef.current
    ) {
      patientInputRef.current.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (
        e.key === "Escape"
      ) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener(
      "keydown",
      handleEscape
    );
    return() => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const { colors } = useTheme();

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

  const dispatch = useDispatch();

  const {
    data: appointments,
    loading,
    error
  } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    dispatch(
      fetchAppointments()
    );
  }, [dispatch]);

  if (loading) {

    return <Loader />;
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: colors.background
        }}
        className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        "
      >
        <h1
          style={{
            color: colors.text
          }}
          className="
          text-5xl
          font-bold
          "
        >
          Failed To Load Appointments
        </h1>
        <p
          style={{
            color: colors.text
          }}
          className="pt-4"
        >
          Please check your server connection and try again.
        </p>

      </div>

    );
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

    await dispatch(
      updateAppointment({

        ...appointment,

        status: nextStatus

      })
    );

  }

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

          onDelete={(id) =>
            dispatch(
              deleteAppointment(id)
            )
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
      style={{
        backgroundColor: colors.background
      }}
      className="
        min-h-screen
        sm:px-6
        sm:pt-24
        lg:px-8
        lg:pt-28
      "
    >

      <div>

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
              style={{
                color: colors.text
              }}
              className="
                text-3xl
                md:text-4xl
                font-bold
              "
            >
            Appointments
            </h1>

        </div>


        <Button

            variant="primary"

            aria-label="Add Appointment"

            onClick={() =>
            setIsModalOpen(true)
            }
        >
            Add Appointment
        </Button>

        </div>

        <Modal
          open={isModalOpen}
        >

            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="appointment-modal-title"
            >

            

                <h1
                  id="appointment-modal-title"
                  style={{
                    color: colors.text
                  }}
                  className="
                    text-4xl
                    font-black
                    mb-8
                  "
                >
                Add Appointment
                </h1>


                {/* PATIENT */}
                <Input

                ref={patientInputRef}

                aria-label="Patient Name"

                type="text"

                placeholder="Patient Name"

                value={patientName}

                onChange={(e) =>

                    setPatientName(
                    e.target.value
                    )

                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                
                />


                {/* DOCTOR */}
                <Input

                aria-label="Doctor Name"

                type="text"

                placeholder="Doctor Name"

                value={doctorName}

                onChange={(e) =>

                    setDoctorName(
                    e.target.value
                    )

                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                
                />


                {/* DATE */}
                <Input

                aria-label="Appointment Date"

                type="date"

                value={appointmentDate}

                onChange={(e) =>

                    setAppointmentDate(
                    e.target.value
                    )

                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                
                />

                <Input

                  aria-label="Appointment Time"

                  type="time"

                  value={appointmentTime}

                  onChange={(e) =>

                    setAppointmentTime(
                      e.target.value
                    )

                  }
                  style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                  }}
                  
                />

                <select

                  aria-label="Appointment Status"

                  value={appointmentStatus}

                  onChange={(e) =>

                    setAppointmentStatus(
                      e.target.value
                    )

                  }
                  style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
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

                <Button

                  variant="success"

                  aria-label="Save Appointment"

                  type="button"

                  onClick={async () => {

                    await dispatch( 
                      addAppointment({

                        patient: patientName,

                        doctor: doctorName,

                        date: appointmentDate,

                        time: appointmentTime,

                        status: appointmentStatus

                      })
                    );

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
                    "
                >
                    Save
                </Button>


                <Button

                  variant="danger"

                  aria-label="Cancel Appointment"

                    type="button"

                    onClick={() =>

                    setIsModalOpen(false)

                    }

                    className="
                      flex-1
                    "
                >
                    Cancel
                </Button>

                </div>

            

            </div>

        </Modal>       

        {/* VIRTUALIZED LIST */}
        <div
          className="
            border
            border-slate-800
            rounded-2xl
            p-4
            shadow-xl
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
                pt-20
              "
            >

              <h2
                style={{
                  color: colors.text
                }}
                className="
                  text-5xl
                  font-bold
                "
              >
                No Appointments Found
              </h2>

              <p
                style={{
                  color: colors.text
                }}
                className="
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

    
  );
}

export default Appointments;