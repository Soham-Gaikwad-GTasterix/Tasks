import { List }
from "react-window";

import {

  Link,

  useNavigate

} from "react-router-dom";


const patients = Array.from(

  { length: 20 },

  (_, index) => ({

    id: index + 1,

    name:
      `Patient ${index + 1}`

  })

);


function Row({

  index,

  style

}) {

  const navigate =
    useNavigate();


  return (

    <div

      style={style}

      onClick={() =>

        navigate(

          `/patients/${
            patients[index].id
          }`

        )

      }

      className="
        flex
        items-center
        justify-between
        px-6
        border-b
        cursor-pointer
        hover:bg-blue-50
        transition-all
      "
    >

      <h1
        className="
          text-xl
          font-semibold
        "
      >
        {patients[index].name}
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
        Active
      </div>

    </div>

  );
}


function PatientList() {

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
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
            text-blue-700
          "
        >
          Virtualized Patients
        </h1>


        <Link to="/">

          <button
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

          rowCount={patients.length}

          rowHeight={70}

          rowComponent={Row}

          rowProps={{}}

        />

      </div>

    </div>
  );
}

export default PatientList;