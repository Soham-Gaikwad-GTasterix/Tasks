import {

  useEffect,

  useState

} from "react";

import hospitalApi
from "../api/hospitalApi";


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

  async function fetchDoctors() {

    try {

      setLoading(true);

      setError(null);

      await new Promise(

      (resolve) =>

        setTimeout(resolve, 1000)

      );      

      const response =
        await hospitalApi.get(
          "/doctors"
        );

      setDoctors(
        response.data || []
      );

    } 
    
    catch (err) {

      console.error(err);

      setDoctors([]);

      setError(
        err.message ||
        "Failed to load doctors"
      );

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    fetchDoctors();

  }, []);


  /*
  =====================================
  ADD DOCTOR
  =====================================
  */

  async function addDoctor(
    doctorData
  ) {

    try {

      const response =
        await hospitalApi.post(

          "/doctors",

          doctorData

        );

      setDoctors(

        [...doctors,
          response.data]

      );

    } catch (error) {

      console.error(error);

    }

  }


  /*
  =====================================
  DELETE DOCTOR
  =====================================
  */

  async function deleteDoctor(id) {

    try {

      await hospitalApi.delete(
        `/doctors/${id}`
      );

      setDoctors(

        doctors.filter(

          (doctor) =>

            doctor.id !== id

        )

      );

    } catch (error) {

      console.error(error);

    }

  }


  /*
  =====================================
  UPDATE DOCTOR
  =====================================
  */

  async function updateDoctor(
    updatedDoctor
  ) {

    try {

      const response =
        await hospitalApi.put(

          `/doctors/${updatedDoctor.id}`,

          updatedDoctor

        );

      setDoctors(

        doctors.map(

          (doctor) =>

            doctor.id ===
            updatedDoctor.id

              ? response.data

              : doctor

        )

      );

    } catch (error) {

      console.error(error);

    }

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