import {

  useEffect,

  useState

} from "react";

import hospitalApi
from "../api/hospitalApi";


function usePatients() {

  const [patients, setPatients] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  /*
  =====================================
  FETCH PATIENTS
  =====================================
  */

  async function fetchPatients() {

    try {

      setLoading(true);

      await new Promise(

      (resolve) =>

        setTimeout(resolve, 2000)

      );

      const response =
        await hospitalApi.get(
          "/patients"
        );

      setPatients(
        response.data
      );

      setError(null);

    } catch (err) {

      setError(
        "Failed To Fetch Patients"
      );

    } finally {

      setLoading(false);
    }
  }


  /*
  =====================================
  CRUD
  =====================================
  */

  async function addPatient(
    patientData
  ) {

    try {

      const response =
        await hospitalApi.post(
          "/patients",
          patientData
        );

      setPatients(

        [...patients,
          response.data]

      );

    } catch (error) {

      console.error(error);

    }

  }

  async function deletePatient(id) {

    try {

      await hospitalApi.delete(
        `/patients/${id}`
      );

      setPatients(

        patients.filter(

          (patient) =>

            patient.id !== id

        )

      );

    } catch (error) {

      console.error(error);

    }

  }

  async function updatePatient(
    updatedPatient
  ) {

    try {

      const response =
        await hospitalApi.put(

          `/patients/${updatedPatient.id}`,

          updatedPatient

        );

      setPatients(

        patients.map(

          (patient) =>

            patient.id ===
            updatedPatient.id

              ? response.data

              : patient

        )

      );

    } catch (error) {

      console.error(error);

    }

  }


  useEffect(() => {

    fetchPatients();

  }, []);


    return {

        patients,

        loading,

        error,

        addPatient,

        deletePatient,

        updatePatient

    };
}

export default usePatients;