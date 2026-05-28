function PatientCard({

  patient,

  onDelete,

  onUpdate

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
        {patient.name}
      </h1>


      <p
        className="
          mt-3
          text-gray-500
        "
      >
        {patient.email}
      </p>


        <div
        className="
            flex
            gap-4
            mt-5
        "
        >

        <button

            onClick={() =>
            onUpdate(patient)
            }

            className="
            flex-1
            bg-blue-500
            hover:bg-blue-600
            transition-all
            text-white
            px-5
            py-3
            rounded-xl
            font-semibold
            "
        >
            Update
        </button>


        <button

            onClick={() =>
            onDelete(patient.id)
            }

            className="
            flex-1
            bg-red-500
            hover:bg-red-600
            transition-all
            text-white
            px-5
            py-3
            rounded-xl
            font-semibold
            "
        >
            Delete
        </button>

        </div>

    </div>
  );
}

export default PatientCard;