import {
  useState,
  useEffect,
  useRef
} from "react";

import Loader from "../components/Loader";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchDoctors,
  addDoctor,
  deleteDoctor,
  updateDoctor
} from "../store/doctorSlice";

import DoctorCard
from "../components/DoctorCard";

import { useTheme } from "../context/ThemeContext";

function Doctors() {

  const { colors } = useTheme();

  const dispatch = useDispatch();

  const {
    data: doctors,
    loading,
    error
  } = useSelector(
    (state) => state.doctors
  );

  useEffect(() => {
    dispatch(
      fetchDoctors()
    );
  }, [dispatch]);

  const [isModalOpen,
    setIsModalOpen] =
      useState(false);

  const doctorInputRef = useRef(null);

  useEffect(() => {
    if (
      isModalOpen &&
      doctorInputRef.current
    ) {
      doctorInputRef.current.focus();
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

  const [doctorName,
    setDoctorName] =
      useState("");

  const [doctorEmail,
    setDoctorEmail] =
      useState("");

  const [specialization,
    setSpecialization] =
      useState("");

  const [experience,
    setExperience] =
      useState("");

  const [department,
    setDepartment] =
      useState("");

  const [qualification,
    setQualification] =
      useState("");

  const [phone,
    setPhone] =
      useState("");

  const [editingDoctor,
    setEditingDoctor] =
      useState(null);

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
          Failed to Load Doctors
        </h1>
        <p
          style={{
            color: colors.text
          }}
          className="pt-4"
        >
          Please check your server connection and try again.
        </p>

      </div>

    );

  }

  return (

    <div
      style={{
        backgroundColor: colors.background
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
            Doctors
          </h1>

          <button

            aria-label="Add Doctor"

            type="button"

            onClick={() => {

              setEditingDoctor(null);

              setDoctorName("");
              setDoctorEmail("");
              setSpecialization("");
              setExperience("");
              setDepartment("");
              setQualification("");
              setPhone("");

              setIsModalOpen(true);

            }}

            className="
              bg-indigo-600
              hover:bg-indigo-700
              transition-all
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
            "
          >
            Add Doctor
          </button>

        </div>

        {isModalOpen && (

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="doctor-modal-title"
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
                backgroundColor: colors.background
              }}
              className="
                rounded-3xl
                p-8
                w-full
                max-w-2xl
                max-h-[90vh]
                overflow-y-auto
              "
            >

              <h2
                id="doctor-modal-title"
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
                  editingDoctor
                    ? "Update Doctor"
                    : "Add Doctor"
                }
              </h2>

              <input
                ref={doctorInputRef}
                aria-label="Doctor Name"
                type="text"
                placeholder="Doctor Name"
                value={doctorName}
                onChange={(e)=>
                  setDoctorName(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-5
                "
              />

              <input
                aria-label="Doctor Email"
                type="email"
                placeholder="Doctor Email"
                value={doctorEmail}
                onChange={(e)=>
                  setDoctorEmail(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-5
                "
              />

              <input
                aria-label="Doctor Specialization"
                type="text"
                placeholder="Specialization"
                value={specialization}
                onChange={(e)=>
                  setSpecialization(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-5
                "
              />

              <input
                aria-label="Doctor Experience"
                type="text"
                placeholder="Experience"
                value={experience}
                onChange={(e)=>
                  setExperience(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-5
                "
              />

              <input
                aria-label="Doctor Department"
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e)=>
                  setDepartment(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-5
                "
              />

              <input
                aria-label="Doctor Qualification"
                type="text"
                placeholder="Qualification"
                value={qualification}
                onChange={(e)=>
                  setQualification(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-5
                "
              />

              <input
                aria-label="Doctor Phone Number"
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e)=>
                  setPhone(
                    e.target.value
                  )
                }
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-8
                "
              />

              <div className="flex gap-4">

                <button

                  aria-label="Save Doctor"

                  type="button"

                  onClick={() => {

                    const doctorData = {

                      name: doctorName,
                      email: doctorEmail,
                      specialization,
                      experience,
                      department,
                      qualification,
                      phone

                    };

                    if (
                      editingDoctor
                    ) {

                      dispatch(
                        updateDoctor({

                          ...editingDoctor,

                          ...doctorData

                        })
                      )

                    } else {

                      dispatch(
                        addDoctor(
                          doctorData
                        )
                      );
                    }

                    setIsModalOpen(
                      false
                    );

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
                  Save
                </button>

                <button

                  aria-label="Cancel Doctor"

                  type="button"

                  onClick={() =>
                    setIsModalOpen(
                      false
                    )
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

        {
          doctors.length === 0 ? (

            <div
              className="
                col-span-full
                flex
                flex-col
                items-center
                justify-center
                py-20
              "
            >

              <h2
                style={{
                  color: colors.text
                }}
                className="
                  text-4xl
                  font-bold
                "
              >
                No Doctors Found
              </h2>

              <p
                style={{
                  color:colors.text
                }}
                className="
                  pt-4
                "
              >
                Click Add Doctor to create one.
              </p>

            </div>

          ) : (

            doctors.map((doctor) => (

              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onDelete={(id) =>
                  dispatch(
                    deleteDoctor(id)
                  )
                }
                onUpdate={(doctor) => {

                  setEditingDoctor(
                    doctor
                  );

                  setDoctorName(
                    doctor.name || ""
                  );

                  setDoctorEmail(
                    doctor.email || ""
                  );

                  setSpecialization(
                    doctor.specialization || ""
                  );

                  setExperience(
                    doctor.experience || ""
                  );

                  setDepartment(
                    doctor.department || ""
                  );

                  setQualification(
                    doctor.qualification || ""
                  );

                  setPhone(
                    doctor.phone || ""
                  );

                  setIsModalOpen(
                    true
                  );

                }}
              />

            ))

          )
        }

        </div>

      </div>

      </div>

    

  );
}

export default Doctors;