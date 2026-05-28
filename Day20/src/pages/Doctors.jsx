import {

  useState

} from "react";

import Navbar
from "../components/Navbar";

import Loader
from "../components/Loader";

import useDoctors
from "../hooks/useDoctors";


function Doctors() {

  /*
  =====================================
  CUSTOM HOOK
  =====================================
  */

  const {

    doctors,

    loading,

    error,

    addDoctor,

    deleteDoctor,

    updateDoctor

  } = useDoctors();


  /*
  =====================================
  STATES
  =====================================
  */

  const [isModalOpen,
    setIsModalOpen] =
      useState(false);

  const [doctorName,
    setDoctorName] =
      useState("");

  const [doctorEmail,
    setDoctorEmail] =
      useState("");

  const [editingDoctor,
    setEditingDoctor] =
      useState(null);


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
        bg-green-50
      "
    >

      <Navbar />


      <div
        className="
          p-10
        "
      >

        {/* HEADER */}
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
            Add Doctor
          </button>

        </div>


        {/* MODAL */}
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


                {/* NAME */}
                <input

                  type="text"

                  placeholder="Doctor Name"

                  value={doctorName}

                  onChange={(e) =>

                    setDoctorName(
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
                  "
                />


                {/* EMAIL */}
                <input

                  type="email"

                  placeholder="Doctor Email"

                  value={doctorEmail}

                  onChange={(e) =>

                    setDoctorEmail(
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

                      if (
                        editingDoctor
                      ) {

                        updateDoctor({

                          ...editingDoctor,

                          name: doctorName,

                          email: doctorEmail

                        });

                      } else {

                        addDoctor({

                          name: doctorName,

                          email: doctorEmail

                        });

                      }


                      setDoctorName("");

                      setDoctorEmail("");

                      setEditingDoctor(
                        null
                      );

                      setIsModalOpen(
                        false
                      );

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
                    Save
                  </button>


                  <button

                    onClick={() => {

                      setIsModalOpen(
                        false
                      );

                      setEditingDoctor(
                        null
                      );

                    }}

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


        {/* DOCTOR GRID */}
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
                  hover:scale-105
                  transition-all
                  duration-300
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
                    mt-3
                    text-gray-500
                  "
                >
                  {doctor.email}
                </p>


                <div
                  className="
                    flex
                    gap-4
                    mt-5
                  "
                >

                  <button

                    onClick={() => {

                      setEditingDoctor(
                        doctor
                      );

                      setDoctorName(
                        doctor.name
                      );

                      setDoctorEmail(
                        doctor.email
                      );

                      setIsModalOpen(
                        true
                      );

                    }}

                    className="
                      flex-1
                      bg-blue-500
                      hover:bg-blue-600
                      transition-all
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
                      hover:bg-red-600
                      transition-all
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