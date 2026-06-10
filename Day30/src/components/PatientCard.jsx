import { useTheme } from "../context/ThemeContext";

import Card from "./ui/Card";

import Button from "./ui/Button";

function PatientCard({

  patient,
  onDelete,
  onUpdate

}) {

  const { colors } = useTheme();

  return (

    <Card
      style={{
        backgroundColor: colors.card
      }}
    >

      <h1
        aria-label="Patient Name"
        className="
          text-3xl
          font-bold
          uppercase
        "
      >
        {patient.name}
      </h1>

      <p
        aria-label="Patient Email"
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

        <p
          aria-label="Patient Age"
        >
          Age: {patient.age}
        </p>

        <p
          aria-label="Patient Gender"
        >
          Gender: {patient.gender}
        </p>

        <p
          aria-label="Patient Disease"
        >
          Disease: {patient.disease}
        </p>

        <p
          aria-label="Admission Date"
        >
          Admission: {patient.admissionDate}
        </p>

        <p
          aria-label="Patient Phone"
        >
          Phone: {patient.phone}
        </p>

        <p
          aria-label="Patient Blood Group"
        >
          Blood Group: {patient.bloodGroup}
        </p>

        <p
          aria-label="Patient Room Number"
        >
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

        <Button

          variant="primary"

          aria-label="Update Button"

          type="button"

          onClick={() =>
            onUpdate(patient)
          }
          className="
            flex-1
          "
        >
          Update
        </Button>

        <Button

          variant="danger"

          aria-label="Delete Button"

          type="button"
          
          onClick={() =>
            onDelete(patient.id)
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

export default PatientCard;