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
          mt-2
          text-gray-500
        "
      >
        {patient.email}
      </p>

      <div
        className="
          mt-4
          space-y-2
          text-gray-600
        "
      >

        <p>
          Age: {patient.age}
        </p>

        <p>
          Gender: {patient.gender}
        </p>

        <p>
          Disease: {patient.disease}
        </p>

        <p>
          Admission: {patient.admissionDate}
        </p>

        <p>
          Phone: {patient.phone}
        </p>

        <p>
          Blood Group: {patient.bloodGroup}
        </p>

        <p>
          Room: {patient.roomNumber}
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
            onUpdate(patient)
          }
          className="
            flex-1
            bg-blue-500
            hover:bg-blue-600
            text-white
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
            text-white
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