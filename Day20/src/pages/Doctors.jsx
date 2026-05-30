import {
  useState
} from "react";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import useDoctors from "../hooks/useDoctors";

import DoctorCard
from "../components/DoctorCard";

import Sidebar
from "../components/Sidebar";

function Doctors({

  sidebarCollapsed,

  setSidebarCollapsed

}) {

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


  return (

    <div
      className="
        min-h-screen
        bg-green-50
      "
    >

      <Sidebar

        sidebarCollapsed={
          sidebarCollapsed
        }

        setSidebarCollapsed={
          setSidebarCollapsed
        }

      />

      <div

        className={`

          transition-all
          duration-300

          ${
            sidebarCollapsed

              ? "ml-20"

              : "ml-72"
          }

        `}

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
                className="
                  text-4xl
                  font-bold
                  text-gray-500
                "
              >
                No Doctors Found
              </h2>

              <p
                className="
                  mt-4
                  text-gray-400
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
                onDelete={deleteDoctor}
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

    </div>

  );
}

export default Doctors;