function DoctorCard({

  doctor,

  onUpdate,

  onDelete

}) {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-xl
        p-6
      "
    >

      <h1
        className="
          text-3xl
          font-bold
        "
      >
        {doctor.name}
      </h1>

      <p
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

        <p>
          Specialization:
          {" "}
          {doctor.specialization}
        </p>

        <p>
          Experience:
          {" "}
          {doctor.experience}
        </p>

        <p>
          Department:
          {" "}
          {doctor.department}
        </p>

        <p>
          Qualification:
          {" "}
          {doctor.qualification}
        </p>

        <p>
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