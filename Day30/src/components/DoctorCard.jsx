import { useTheme } from "../context/ThemeContext";

import Card from "./ui/Card";

import Button from "./ui/Button";

function DoctorCard({

  doctor,

  onUpdate,

  onDelete

}) {

  const { colors } = useTheme();

  return (

    <Card
      style={{
        backgroundColor: colors.card
      }}
    >

      <h1
        aria-label="Doctor Name"
        style={{
          color: colors.text
        }}
        className="
          text-3xl
          font-bold
          uppercase
        "
      >
        {doctor.name}
      </h1>

      <p
        aria-label="Doctor Email"
        className="
          text-gray-500
          mt-2
        "
      >
        {doctor.email}
      </p>

      <div
        className="
          mt-4
          space-y-2
          text-gray-600
        "
      >

        <p
          aria-label="Doctor Specialization"
        >
          Specialization:
          {" "}
          {doctor.specialization}
        </p>

        <p
          aria-label="Doctor Experience"
        >
          Experience:
          {" "}
          {doctor.experience}
        </p>

        <p
          aria-label="Doctor Department"
        >
          Department:
          {" "}
          {doctor.department}
        </p>

        <p
          aria-label="Doctor Qualification"
        >
          Qualification:
          {" "}
          {doctor.qualification}
        </p>

        <p
          aria-label="Doctor Phone"
        >
          Phone:
          {" "}
          {doctor.phone}
        </p>

      </div>

      <div
        className="
          flex
          gap-4
          mt-6
        "
      >

        <Button

          variant="primary"

          aria-label="Update Doctor"

          onClick={() =>
            onUpdate(doctor)
          }

          className="
            flex-1
          "
        >
          Update
        </Button>

        <Button

          variant="danger"

          aria-label="Delete Doctor"

          onClick={() =>
            onDelete(
              doctor.id
            )
          }

          className="
            flex-1
          "
        >
          Delete
        </Button>

      </div>

    </Card>

  );

}

export default DoctorCard;