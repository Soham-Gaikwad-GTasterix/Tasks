import { 
  useState,
  useEffect,
  useRef
} from "react";

import Loader from "../components/Loader";
import PatientCard from "../components/PatientCard";

import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, addPatient, deletePatient, updatePatient } from "../store/patientSlice";

import { useTheme } from "../context/ThemeContext";

import Button from "../components/ui/Button";

import Input from "../components/ui/Input";

import Modal from "../components/ui/Modal";

function Patients() {

  const { colors } =useTheme();

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const patientInputRef = useRef(null);

  useEffect(() => {
    if (
      isModalOpen && 
      patientInputRef.current
    ) {
      patientInputRef.current.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (
        e.key === "Escape"
      ) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener(
      "keydown",
      handleEscape
    );
    return() => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

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

  const dispatch = useDispatch();

  const {
    data: patients,
    loading,
    error
  } = useSelector(
    (state) => 
      state.patients
  );

  useEffect(() => {
    dispatch(
      fetchPatients()
    );
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {

    return (

      <div
        style={{
          backgroundColor: colors.background
        }}
        className="
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          pt-28
        "
      >

          <h1
            style={{
              color: colors.text
            }}
            className="
              text-5xl
              font-bold
            "
          >
            Failed To Load Patients
          </h1>

          <p
            style={{
              color: colors.text
            }}
            className="
              mt-4
            "
          >
            Please check your server connection and try again.
          </p>

        

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

          <Button

            variant="primary"

            aria-label="Add Patient"

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
          >
            Add Patient
          </Button>
        </div>

        <Modal
          open={isModalOpen}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="patient-modal-title"
            
          >

              <h2
                id="patient-modal-title"
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

              <Input
                ref={patientInputRef}
                aria-label="Patient Name"
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
              />

              <Input
                aria-label="Patient Email"
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
              />

              <Input
                aria-label="Patient Age"
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
              />

              <select
                aria-label="Patient Gender"
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

              <Input
                aria-label="Patient Disease"
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
              />

              <Input
                aria-label="Admission Date"
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
              />

              <Input
                aria-label="Phone Number"
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
              />

              <Input
                aria-label="Blood Group"
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
              />

              <Input
                aria-label="Room Number"
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
              />

              <div className="flex gap-4">

                <Button

                  variant="success"

                  aria-label="Save Patient"

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

                      dispatch(
                        updatePatient({

                          ...editingPatient,

                          ...patientData

                        })
                      )

                    } else {

                      dispatch(
                        addPatient(patientData)
                      );

                    }

                    setIsModalOpen(false);

                  }}
                  className="
                    flex-1
                  "
                >
                  Save Patient
                </Button>

                <Button

                  variant="danger"

                  aria-label="Cancel Patient"

                  type="button"
                  
                  onClick={() =>
                    setIsModalOpen(false)
                  }
                  
                  className="
                    flex-1
                  "
                >
                  Cancel
                </Button>

            </div>

          </div>

        </Modal>

        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >

          {patients.length === 0 ? (
            <div
              className="
                col-span-full
                flex
                flex-col
                items-center
                justify-center
              "
            >
              <h1
                style={{
                  color: colors.text
                }}
                className="
                  text-4xl
                  font-bold
                "
              >
                No Patients Found
              </h1>

              <p
                style={{
                  color: colors.text
                }}
                className="
                  mt-4
                "
              >
                Click Add Patient
                to create one.
              </p>

            </div>

          ) : (

          patients.map((patient) => (

            <PatientCard
              key={patient.id}
              patient={patient}
              onDelete={(id) => 
                dispatch(
                  deletePatient(id)
                )
              }
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

          )))}

        </div>

      </div>

      </div>

    
  );
}

export default Patients;