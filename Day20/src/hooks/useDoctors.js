import {

  useEffect,

  useState

} from "react";


function useDoctors() {

  /*
  =====================================
  STATES
  =====================================
  */

  const [doctors, setDoctors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  /*
  =====================================
  FETCH DOCTORS
  =====================================
  */

  useEffect(() => {

    async function fetchDoctors() {

      try {

        setLoading(true);


        await new Promise(

          (resolve) =>

            setTimeout(
              resolve,
              1500
            )

        );


        const response =
          await fetch(

            "https://jsonplaceholder.typicode.com/users"

          );

        const data =
          await response.json();

        setDoctors(data);

      } catch (err) {

        setError(
          "Failed To Fetch Doctors"
        );

      } finally {

        setLoading(false);
      }
    }

    fetchDoctors();

  }, []);


  /*
  =====================================
  ADD DOCTOR
  =====================================
  */

  function addDoctor(
    doctorData
  ) {

    if (
      !doctorData.name.trim()
    ) return;


    const newDoctor = {

      id: Date.now(),

      name: doctorData.name,

      email: doctorData.email

    };


    setDoctors(

      [...doctors, newDoctor]

    );
  }


  /*
  =====================================
  DELETE DOCTOR
  =====================================
  */

  function deleteDoctor(id) {

    setDoctors(

      doctors.filter(

        (doctor) =>

          doctor.id !== id

      )

    );
  }


  /*
  =====================================
  UPDATE DOCTOR
  =====================================
  */

  function updateDoctor(
    updatedDoctor
  ) {

    setDoctors(

      doctors.map((doctor) =>

        doctor.id ===
        updatedDoctor.id

          ? updatedDoctor

          : doctor

      )

    );
  }


  return {

    doctors,

    loading,

    error,

    addDoctor,

    deleteDoctor,

    updateDoctor

  };
}

export default useDoctors;