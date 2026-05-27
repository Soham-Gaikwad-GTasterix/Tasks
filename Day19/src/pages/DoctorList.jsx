import { List }
from "react-window";

import {
  Link
} from "react-router-dom";


const doctors = Array.from(

  { length: 500 },

  (_, index) => ({

    id: index + 1,

    name:
      `Dr. ${index + 1}`

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

      <h1
        className="
          text-xl
          font-semibold
        "
      >
        {doctors[index].name}
      </h1>


      <div
        className="
          bg-green-100
          text-green-700
          px-4
          py-2
          rounded-xl
        "
      >
        Available
      </div>

    </div>

  );
}


function DoctorList() {

  return (

    <div
      className="
        min-h-screen
        bg-green-50
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
            text-green-700
          "
        >
          Doctors List
        </h1>


        <Link to="/">

          <button
            className="
              bg-green-600
              hover:bg-green-700
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

          rowCount={doctors.length}

          rowHeight={70}

          rowComponent={Row}

          rowProps={{}}

        />

      </div>

    </div>
  );
}

export default DoctorList;