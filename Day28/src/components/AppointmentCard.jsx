import { useTheme } from "../context/ThemeContext";

function AppointmentCard({

  appointment,

  onDelete,

  onUpdateStatus

}) {

  const { colors } = useTheme();

  return (

      <div
        style={{
          backgroundColor: colors.card
        }}
        className="
          rounded-3xl
          shadow-xl
          py-2
          px-6
          flex
          justify-between
          items-center
          hover:scale-[1.01]
          transition-all
          duration-300
        "
      >

      {/* LEFT */}

      <div>

        <h1
          aria-label="Patient Name"
          style={{
            color: colors.text
          }}
          className="
            text-2xl
            font-bold
          "
        >
          {appointment.patient}
        </h1>

        <p
          aria-label="Doctor Name"
          style={{
            color: colors.text
          }}
        >
          {appointment.doctor}
        </p>

        <p 
          aria-label="Appointment Date"
          style={{
            color: colors.text
          }}
        >
          Date:
          {" "}
          {appointment.date}
        </p>

        <p
          aria-label="Appointment Time"
          style={{
            color: colors.text
          }}
        >
          Time:
          {" "}
          {appointment.time}
        </p>

      </div>


      {/* RIGHT */}

      <div
        className="
          flex
          items-end
          gap-3
        "
      >

        <span
          aria-label="Appointment Status"
          className="
            px-4
            py-2
            rounded-full
            bg-white
          "
        >
          {appointment.status}
        </span>

        <button

          aria-label="Update Status"

          type="button"

          onClick={() =>

            onUpdateStatus(
              appointment
            )

          }

          className="
            bg-blue-500
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Update Status
        </button>

        <button

          aria-label="Remove Appointment"

          type="button"

          onClick={() =>
            onDelete(
              appointment.id
            )
          }

          className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Remove
        </button>

      </div>

    </div>

  );

}

export default AppointmentCard;