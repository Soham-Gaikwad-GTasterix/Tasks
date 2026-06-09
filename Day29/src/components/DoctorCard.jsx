import { useTheme } from "../context/ThemeContext";

function DoctorCard({

  doctor,

  onUpdate,

  onDelete

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
        p-6
      "
    >

      <h1
        aria-label="Doctor Name"
        style={{
          color: colors.text
        }}
        className="
          text-3xl
          font-bold
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

        <button

          aria-label="Update Doctor"

          onClick={() =>
            onUpdate(doctor)
          }

          className="
            flex-1
            bg-blue-500
            text-white
            py-3
            rounded-xl
          "
        >
          Update
        </button>

        <button

          aria-label="Delete Doctor"

          onClick={() =>
            onDelete(
              doctor.id
            )
          }

          className="
            flex-1
            bg-red-500
            text-white
            py-3
            rounded-xl
          "
        >
          Delete
        </button>

      </div>

    </div>

  );

}

export default DoctorCard;