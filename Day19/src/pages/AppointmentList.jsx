import { List }
from "react-window";

import {
  Link
} from "react-router-dom";


const appointments = Array.from(

  { length: 1000 },

  (_, index) => ({

    id: index + 1,

    patient:
      `Patient ${index + 1}`,

    doctor:
      `Dr. ${index % 50}`

  })

);


function Row({

  index,

  style

}) {

  return (

    <div

      style={style}

      className="
        flex
        items-center
        justify-between
        px-6
        border-b
      "
    >

      <div>

        <h1
          className="
            text-xl
            font-semibold
          "
        >
          {
            appointments[index]
              .patient
          }
        </h1>

        <p
          className="
            text-gray-500
          "
        >
          {
            appointments[index]
              .doctor
          }
        </p>

      </div>


      <div
        className="
          bg-red-100
          text-red-700
          px-4
          py-2
          rounded-xl
        "
      >
        Scheduled
      </div>

    </div>

  );
}


function AppointmentList() {

  return (

    <div
      className="
        min-h-screen
        bg-red-50
        p-10
      "
    >

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
            text-red-700
          "
        >
          Appointment List
        </h1>


        <Link to="/">

          <button
            className="
              bg-red-600
              hover:bg-red-700
              transition-all
              text-white
              px-5
              py-3
              rounded-xl
            "
          >
            Back Dashboard
          </button>

        </Link>

      </div>


      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >

        <List

          height={700}

          width={1200}

          rowCount={
            appointments.length
          }

          rowHeight={80}

          rowComponent={Row}

          rowProps={{}}

        />

      </div>

    </div>
  );
}

export default AppointmentList;