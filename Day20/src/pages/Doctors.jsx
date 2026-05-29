import {
  useState
} from "react";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import useDoctors from "../hooks/useDoctors";

function Doctors() {

  const {
    doctors,
    loading,
    error,
    addDoctor,
    deleteDoctor,
    updateDoctor
  } = useDoctors();

  const [isModalOpen,
    setIsModalOpen] =
      useState(false);

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
        bg-green-50
      "
    >

      <Navbar />

      <div className="p-10">

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
              text-green-700
            "
          >
            Doctors
          </h1>

          <button

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
              bg-green-500
              hover:bg-green-600
              text-white
              px-6
              py-4
              rounded-2xl
              font-bold
            "
          >
            Add Doctor
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
              className="
                bg-white
                rounded-3xl
                p-8
                w-full
                max-w-2xl
                max-h-[90vh]
                overflow-y-auto
              "
            >

              <h2
                className="
                  text-4xl
                  font-bold
                  text-green-700
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
                type="text"
                placeholder="Doctor Name"
                value={doctorName}
                onChange={(e)=>
                  setDoctorName(
                    e.target.value
                  )
                }
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-5
                "
              />

              <input
                type="email"
                placeholder="Doctor Email"
                value={doctorEmail}
                onChange={(e)=>
                  setDoctorEmail(
                    e.target.value
                  )
                }
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-5
                "
              />

              <input
                type="text"
                placeholder="Specialization"
                value={specialization}
                onChange={(e)=>
                  setSpecialization(
                    e.target.value
                  )
                }
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-5
                "
              />

              <input
                type="text"
                placeholder="Experience"
                value={experience}
                onChange={(e)=>
                  setExperience(
                    e.target.value
                  )
                }
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-5
                "
              />

              <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e)=>
                  setDepartment(
                    e.target.value
                  )
                }
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-5
                "
              />

              <input
                type="text"
                placeholder="Qualification"
                value={qualification}
                onChange={(e)=>
                  setQualification(
                    e.target.value
                  )
                }
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-5
                "
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e)=>
                  setPhone(
                    e.target.value
                  )
                }
                className="
                  w-full border
                  p-4 rounded-xl
                  mb-8
                "
              />

              <div className="flex gap-4">

                <button

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

                      updateDoctor({

                        ...editingDoctor,

                        ...doctorData

                      });

                    } else {

                      addDoctor(
                        doctorData
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
            doctors.map((doctor) => (

              <div

                key={doctor.id}

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

                    onClick={() => {

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
                      deleteDoctor(
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

            ))
          }

        </div>

      </div>

    </div>

  );
}

export default Doctors;