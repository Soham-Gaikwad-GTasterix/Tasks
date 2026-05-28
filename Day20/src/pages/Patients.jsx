import {useState} from "react";

import Navbar from "../components/Navbar";

import Loader from "../components/Loader";

import PatientCard from "../components/PatientCard";

import usePatients from "../hooks/usePatients";


function Patients() {

  const [isModalOpen,setIsModalOpen] = useState(false);


  const [patientName,setPatientName] = useState("");


  const [patientEmail,setPatientEmail] = useState("");

  const [editingPatient,setEditingPatient] = useState(null);

  const {

    patients,

    loading,

    error,

    addPatient,

    deletePatient,

    updatePatient

  } = usePatients();


  /*
  =====================================
  LOADING
  =====================================
  */

  if (loading) {

    return <Loader />;
  }


  /*
  =====================================
  ERROR
  =====================================
  */

  if (error) {

    return (

      <div
        className="
          text-red-500
          text-4xl
          font-bold
          mt-20
          text-center
        "
      >
        {error}
      </div>

    );
  }


  return (

    <div
      className="
        min-h-screen
        bg-gray-100
      "
    >

      <Navbar />


      <div
        className="
          p-10
        "
      >

        <div
        className="
            flex
            justify-between
            items-center
            mb-10
        "
        >

        <h1
            className="
            text-5xl
            font-bold
            text-blue-700
            "
        >
            Patients
        </h1>


        <button

            onClick={() =>
            setIsModalOpen(true)
            }

            className="
            bg-green-500
            hover:bg-green-600
            transition-all
            text-white
            px-6
            py-4
            rounded-2xl
            font-bold
            shadow-lg
            "
        >
            Add Patient
        </button>

        </div>

        {
        isModalOpen && (

            <div
            className="
                fixed
                inset-0
                bg-black/50
                flex
                items-center
                justify-center
                z-50
            "
            >

            <div
                className="
                bg-white
                rounded-3xl
                shadow-2xl
                p-8
                w-full
                max-w-lg
                "
            >

                <h2
                className="
                    text-4xl
                    font-bold
                    text-blue-700
                    mb-8
                "
                >
                Add New Patient
                </h2>


                {/* NAME */}
                <input

                type="text"

                placeholder="Patient Name"

                value={patientName}

                onChange={(e) =>

                    setPatientName(
                    e.target.value
                    )

                }

                className="
                    w-full
                    border
                    border-gray-300
                    p-4
                    rounded-xl
                    mb-5
                    outline-none
                    focus:ring-4
                    focus:ring-blue-300
                "
                />


                {/* EMAIL */}
                <input

                type="email"

                placeholder="Patient Email"

                value={patientEmail}

                onChange={(e) =>

                    setPatientEmail(
                    e.target.value
                    )

                }

                className="
                    w-full
                    border
                    border-gray-300
                    p-4
                    rounded-xl
                    mb-8
                    outline-none
                    focus:ring-4
                    focus:ring-blue-300
                "
                />


                {/* BUTTONS */}
                <div
                className="
                    flex
                    gap-4
                "
                >

                <button

                    onClick={() => {

                    if (editingPatient) {

                    updatePatient({

                        ...editingPatient,

                        name: patientName,

                        email: patientEmail

                    });

                    } else {

                    addPatient({

                        name: patientName,

                        email: patientEmail

                    });

                    }

                    setPatientName("");

                    setPatientEmail("");

                    setEditingPatient(null);

                    setIsModalOpen(false);

                    }}

                    className="
                    flex-1
                    bg-green-500
                    hover:bg-green-600
                    transition-all
                    text-white
                    py-4
                    rounded-2xl
                    font-bold
                    "
                >
                    Save Patient
                </button>


                <button

                    onClick={() =>

                    setIsModalOpen(false)

                    }

                    className="
                    flex-1
                    bg-red-500
                    hover:bg-red-600
                    transition-all
                    text-white
                    py-4
                    rounded-2xl
                    font-bold
                    "
                >
                    Cancel
                </button>

                </div>

            </div>

            </div>

        )
        }        


        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >

          {
            patients.map(
              (patient) => (

                <PatientCard

                  key={patient.id}

                  patient={patient}

                  onDelete={
                    deletePatient
                  }

                  onUpdate={(patient) => {

                    setEditingPatient(patient);

                    setPatientName(
                        patient.name
                    );

                    setPatientEmail(
                        patient.email
                    );

                    setIsModalOpen(true);

                  }}

                />

              )
            )
          }

        </div>

      </div>

    </div>
  );
}

export default Patients;