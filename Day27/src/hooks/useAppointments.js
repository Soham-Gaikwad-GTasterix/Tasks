import {

  useEffect,
  useState

} from "react";

import hospitalApi
from "../api/hospitalApi";

function useAppointments() {

  const [

    appointments,

    setAppointments

  ] = useState([]);

  const [

    loading,

    setLoading

  ] = useState(true);

  const [

    error,

    setError

  ] = useState(null);

  async function fetchAppointments() {

    try {

      setLoading(true);

      setError(null);

      await new Promise(

      (resolve) =>

        setTimeout(resolve, 1000)

      ); 

      const response =

        await hospitalApi.get(
          "/appointments"
        );

      setAppointments(
        response.data
      );

    } catch (err) {

      console.error(err);

      setAppointments([]);

      setError(
        err.message ||
        "Failed to load appointments"
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    fetchAppointments();

  }, []);

  async function addAppointment(
    appointment
  ) {

    const response =

      await hospitalApi.post(

        "/appointments",

        appointment

      );

    setAppointments(

      [

        ...appointments,

        response.data

      ]

    );

  }

  async function deleteAppointment(
    id
  ) {

    await hospitalApi.delete(

      `/appointments/${id}`

    );

    setAppointments(

      appointments.filter(

        (appointment) =>

          appointment.id !== id

      )

    );

  }

  async function updateAppointment(
    updatedAppointment
  ) {

    const response =

      await hospitalApi.put(

        `/appointments/${updatedAppointment.id}`,

        updatedAppointment

      );

    setAppointments(

      appointments.map(

        (appointment) =>

          appointment.id ===
          updatedAppointment.id

            ? response.data

            : appointment

      )

    );

  }

  return {

    appointments,

    loading,

    error,

    addAppointment,

    deleteAppointment,

    updateAppointment

  };

}

export default useAppointments;