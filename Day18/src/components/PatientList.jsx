import {
  useQuery
} from "@tanstack/react-query";

import api from "../api/axios";


/*
=====================================
FETCH FUNCTION
=====================================
*/

async function fetchPatients() {

  const response =
    await api.get("/users");

  return response.data;
}


function PatientList() {

  /*
  =====================================
  REACT QUERY
  =====================================
  */

  const {

    data,

    isLoading,

    error,

    refetch

  } = useQuery({

    queryKey: ["patients"],

    queryFn: fetchPatients,

    staleTime: 1000 * 60,

    gcTime: 1000 * 60 * 5

  });


  /*
  =====================================
  LOADING
  =====================================
  */

  if (isLoading) {

    return (

      <h1
        className="
          text-4xl
          font-bold
        "
      >
        Loading Patients...
      </h1>

    );
  }


  /*
  =====================================
  ERROR
  =====================================
  */

  if (error) {

    return (

      <h1
        className="
          text-red-500
          text-4xl
          font-bold
        "
      >
        Failed To Load Patients
      </h1>

    );
  }


  return (

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
          className="
            text-5xl
            font-bold
            text-blue-700
          "
        >
          Hospital Patients
        </h1>


        <button

          onClick={refetch}

          className="
            bg-blue-600
            hover:bg-blue-700
            transition-all
            text-white
            px-5
            py-3
            rounded-xl
          "
        >
          Refresh
        </button>

      </div>


      <div
        className="
          grid
          md:grid-cols-2
          gap-6
        "
      >

        {
          data.map((patient) => (

            <div

              key={patient.id}

              className="
                bg-white
                rounded-3xl
                shadow-xl
                p-6
                hover:scale-105
                transition-all
              "
            >

              <h2
                className="
                  text-3xl
                  font-bold
                "
              >
                {patient.name}
              </h2>


              <p
                className="
                  mt-3
                  text-gray-500
                "
              >
                {patient.email}
              </p>


              <div
                className="
                  mt-5
                  bg-green-100
                  text-green-700
                  px-4
                  py-2
                  rounded-xl
                  inline-block
                "
              >
                Active Patient
              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default PatientList;