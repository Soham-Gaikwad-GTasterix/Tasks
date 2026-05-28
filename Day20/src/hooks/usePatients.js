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
          "/users"
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

    function addPatient(patientData) {

    if (
        !patientData.name.trim()
    ) return;


    const newPatient = {

        id: Date.now(),

        name: patientData.name,

        email: patientData.email

    };


    setPatients(

        [...patients, newPatient]

    );
    }

  function deletePatient(id) {

    setPatients(

      patients.filter(

        (patient) =>

          patient.id !== id

      )

    );
  }

  function updatePatient(
    updatedPatient
  ) {

    setPatients(

        patients.map((patient) =>

        patient.id ===
        updatedPatient.id

            ? updatedPatient

            : patient

        )

    );
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