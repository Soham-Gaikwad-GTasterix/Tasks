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
          style={{
            color: colors.text
          }}
        >
          {appointment.doctor}
        </p>

        <p 
          style={{
            color: colors.text
          }}
        >
          Date:
          {" "}
          {appointment.date}
        </p>

        <p
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