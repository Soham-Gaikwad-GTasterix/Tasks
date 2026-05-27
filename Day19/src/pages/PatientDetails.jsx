import {

  useParams,

  Link

} from "react-router-dom";


function PatientDetails() {

  const {
    id
  } = useParams();


  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-100
        to-indigo-200
        flex
        items-center
        justify-center
        p-10
      "
    >

      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          p-10
          max-w-xl
          w-full
        "
      >

        <h1
          className="
            text-5xl
            font-bold
            text-blue-700
          "
        >
          Patient #{id}
        </h1>


        <p
          className="
            mt-5
            text-xl
            text-gray-500
          "
        >
          Detailed patient profile page.
        </p>


        <div
          className="
            mt-10
            space-y-4
          "
        >

          <div
            className="
              bg-blue-100
              p-5
              rounded-2xl
            "
          >
            Name:
            {" "}
            Patient {id}
          </div>


          <div
            className="
              bg-green-100
              p-5
              rounded-2xl
            "
          >
            Status:
            {" "}
            Active
          </div>


          <div
            className="
              bg-yellow-100
              p-5
              rounded-2xl
            "
          >
            Doctor:
            {" "}
            Dr. Smith
          </div>

        </div>


        <Link to="/patients">

          <button
            className="
              mt-10
              bg-blue-600
              hover:bg-blue-700
              transition-all
              text-white
              px-6
              py-4
              rounded-2xl
              font-bold
              w-full
            "
          >
            Back To Patients
          </button>

        </Link>

      </div>

    </div>
  );
}

export default PatientDetails;