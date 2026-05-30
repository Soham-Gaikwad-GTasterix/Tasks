function AppointmentCard({

  appointment,

  onDelete,

  onUpdateStatus

}) {

  return (

      <div
        className="
          bg-white
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
          "
        >
          {appointment.doctor}
        </p>

        <p>
          Date:
          {" "}
          {appointment.date}
        </p>

        <p>
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
            bg-yellow-100
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