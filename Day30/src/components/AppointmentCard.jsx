import { useTheme } from "../context/ThemeContext";

import Card from "./ui/Card";

import Button from "./ui/Button";

import Badge from "./ui/Badge";

function AppointmentCard({

  appointment,

  onDelete,

  onUpdateStatus

}) {

  const { colors } = useTheme();

  return (

      <Card
        style={{
          backgroundColor: colors.card
        }}
        className="
          py-3
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
            uppercase
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
          Dr. {appointment.doctor}
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

        <Badge
          className={
            appointment.status === "Completed"
              ? "bg-green-500/20 text-green-400"
              :appointment.status === "Scheduled"
              ? "bg-yellow-500/20 text-yellow-400"
              :"bg-red-500/20 text-red-400"
          }
        >
          {appointment.status}
        </Badge>

        <Button

          variant="primary"

          aria-label="Update Status"

          type="button"

          onClick={() =>

            onUpdateStatus(
              appointment
            )

          }
        >
          Update Status
        </Button>

        <Button

          variant="danger"

          aria-label="Remove Appointment"

          type="button"

          onClick={() =>
            onDelete(
              appointment.id
            )
          }
        >
          Remove
        </Button>

      </div>

    </Card>

  );

}

export default AppointmentCard;