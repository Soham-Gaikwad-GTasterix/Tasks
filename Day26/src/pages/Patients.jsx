import { useState } from "react";
import Loader from "../components/Loader";
import PatientCard from "../components/PatientCard";
import usePatients from "../hooks/usePatients";

import { useTheme } from "../context/ThemeContext";

function Patients() {

  const { colors } =useTheme();

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [patientName, setPatientName] =
    useState("");

  const [patientEmail, setPatientEmail] =
    useState("");

  const [patientAge, setPatientAge] =
    useState("");

  const [patientGender, setPatientGender] =
    useState("");

  const [patientDisease, setPatientDisease] =
    useState("");

  const [patientAdmissionDate,
    setPatientAdmissionDate] =
      useState("");

  const [patientPhone, setPatientPhone] =
    useState("");

  const [patientBloodGroup,
    setPatientBloodGroup] =
      useState("");

  const [patientRoomNumber,
    setPatientRoomNumber] =
      useState("");

  const [editingPatient,
    setEditingPatient] =
      useState(null);

  const {
    patients,
    loading,
    error,
    addPatient,
    deletePatient,
    updatePatient
  } = usePatients();

  if (loading) {
    return <Loader />;
  }

  if (error) {

    return (

      <div
        style={{
          backgroundColor: colors.background,
        }}
        className="
          min-h-screen
        "
      >

        <Navbar />

        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            mt-32
          "
        >

          <h1
            className="
              text-5xl
              font-bold
              text-white
            "
          >
            No Patients Found
          </h1>

          <p
            className="
              text-white
              mt-4
            "
          >
            Click Add Patient
            to create one.
          </p>

        </div>

      </div>

    );

  }

  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text
      }}
      className="
        min-h-screen
        sm:px-6
        sm:pt-24
        lg:px-8
        lg:pt-28
      "
    >

      <div>

        <div
          className="
            flex
            justify-between
            items-center
            mb-10
          "
        >
          <h1
            style={{
              color: colors.text
            }}
            className="
              text-3xl
              md:text-4xl
              font-bold
            "
          >
            Patients
          </h1>

          <button

            type="button"

            onClick={() => {
              setEditingPatient(null);

              setPatientName("");
              setPatientEmail("");
              setPatientAge("");
              setPatientGender("");
              setPatientDisease("");
              setPatientAdmissionDate("");
              setPatientPhone("");
              setPatientBloodGroup("");
              setPatientRoomNumber("");

              setIsModalOpen(true);
            }}
            className="
              bg-indigo-600
              hover:bg-indigo-700
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

        {isModalOpen && (

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
              style={{
                backgroundColor: colors.background,
              }}
              className="
                rounded-3xl
                shadow-2xl
                p-8
                w-full
                max-w-2xl
                max-h-[90vh]
                overflow-y-auto
              "
            >

              <h2
                style={{
                  color: colors.text
                }}
                className="
                  text-4xl
                  font-bold
                  mb-8
                "
              >
                {
                  editingPatient
                    ? "Update Patient"
                    : "Add New Patient"
                }
              </h2>

              <input
                type="text"
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) =>
                  setPatientName(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  mb-5
                "
              />

              <input
                type="email"
                placeholder="Patient Email"
                value={patientEmail}
                onChange={(e) =>
                  setPatientEmail(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  mb-5
                "
              />

              <input
                type="number"
                placeholder="Age"
                value={patientAge}
                onChange={(e) =>
                  setPatientAge(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  mb-5
                "
              />

              <select
                value={patientGender}
                onChange={(e) =>
                  setPatientGender(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  mb-5
                "
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>
              </select>

              <input
                type="text"
                placeholder="Disease"
                value={patientDisease}
                onChange={(e) =>
                  setPatientDisease(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  mb-5
                "
              />

              <input
                type="date"
                value={patientAdmissionDate}
                onChange={(e) =>
                  setPatientAdmissionDate(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  mb-5
                "
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={patientPhone}
                onChange={(e) =>
                  setPatientPhone(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  mb-5
                "
              />

              <input
                type="text"
                placeholder="Blood Group"
                value={patientBloodGroup}
                onChange={(e) =>
                  setPatientBloodGroup(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  mb-5
                "
              />

              <input
                type="text"
                placeholder="Room Number"
                value={patientRoomNumber}
                onChange={(e) =>
                  setPatientRoomNumber(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  mb-8
                "
              />

              <div className="flex gap-4">

                <button

                  type="button"

                  onClick={() => {

                    const patientData = {

                      name: patientName,
                      email: patientEmail,
                      age: patientAge,
                      gender: patientGender,
                      disease: patientDisease,
                      admissionDate:
                        patientAdmissionDate,
                      phone: patientPhone,
                      bloodGroup:
                        patientBloodGroup,
                      roomNumber:
                        patientRoomNumber

                    };

                    if (editingPatient) {

                      updatePatient({

                        ...editingPatient,

                        ...patientData

                      });

                    } else {

                      addPatient(
                        patientData
                      );

                    }

                    setIsModalOpen(false);

                  }}
                  className="
                    flex-1
                    bg-green-500
                    text-white
                    py-4
                    rounded-2xl
                    font-bold
                  "
                >
                  Save Patient
                </button>

                <button

                  type="button"
                  
                  onClick={() =>
                    setIsModalOpen(false)
                  }
                  className="
                    flex-1
                    bg-red-500
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

        )}

        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >

          {patients.map((patient) => (

            <PatientCard
              key={patient.id}
              patient={patient}
              onDelete={deletePatient}
              onUpdate={(patient) => {

                setEditingPatient(patient);

                setPatientName(
                  patient.name || ""
                );

                setPatientEmail(
                  patient.email || ""
                );

                setPatientAge(
                  patient.age || ""
                );

                setPatientGender(
                  patient.gender || ""
                );

                setPatientDisease(
                  patient.disease || ""
                );

                setPatientAdmissionDate(
                  patient.admissionDate || ""
                );

                setPatientPhone(
                  patient.phone || ""
                );

                setPatientBloodGroup(
                  patient.bloodGroup || ""
                );

                setPatientRoomNumber(
                  patient.roomNumber || ""
                );

                setIsModalOpen(true);

              }}
            />

          ))}

        </div>

      </div>

      </div>

    
  );
}

export default Patients;