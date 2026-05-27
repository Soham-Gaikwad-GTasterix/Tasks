import {
  Link
} from "react-router-dom";


function Dashboard() {

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
          max-w-5xl
          w-full
          text-center
        "
      >

        <h1
          className="
            text-6xl
            font-bold
            text-blue-700
          "
        >
          Hospital Dashboard
        </h1>


        <p
          className="
            mt-5
            text-gray-500
            text-xl
          "
        >
          Virtualized Hospital System
        </p>


        <div
          className="
            grid
            md:grid-cols-3
            gap-6
            mt-12
          "
        >

          {/* PATIENTS */}
          <Link to="/patients">

            <div
              className="
                bg-blue-100
                hover:bg-blue-200
                hover:scale-105
                transition-all
                duration-300
                p-8
                rounded-3xl
                cursor-pointer
              "
            >

              <h2
                className="
                  text-5xl
                  font-bold
                "
              >
                1240
              </h2>

              <p
                className="
                  mt-3
                  text-xl
                "
              >
                Patients
              </p>

            </div>

          </Link>


          {/* DOCTORS */}
          <Link to="/doctors">

            <div
              className="
                bg-green-100
                hover:bg-green-200
                hover:scale-105
                transition-all
                duration-300
                p-8
                rounded-3xl
                cursor-pointer
              "
            >

              <h2
                className="
                  text-5xl
                  font-bold
                "
              >
                84
              </h2>

              <p
                className="
                  mt-3
                  text-xl
                "
              >
                Doctors
              </p>

            </div>

          </Link>


          {/* APPOINTMENTS */}
          <Link to="/appointments">

            <div
              className="
                bg-red-100
                hover:bg-red-200
                hover:scale-105
                transition-all
                duration-300
                p-8
                rounded-3xl
                cursor-pointer
              "
            >

              <h2
                className="
                  text-5xl
                  font-bold
                "
              >
                312
              </h2>

              <p
                className="
                  mt-3
                  text-xl
                "
              >
                Appointments
              </p>

            </div>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;