import {
  useNavigate
} from "react-router-dom";

function HospitalDashboard() {

  const navigate =
    useNavigate();

  return (
    <div className="min-h-screen">

      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-8 py-5 flex justify-between items-center shadow-lg">

        <h1 className="text-3xl font-bold">
          Hospital Dashboard
        </h1>

        <div className="flex gap-4">

          <button className="bg-white text-blue-700 px-4 py-2 rounded-xl font-semibold">
            Profile
          </button>

          <button className="bg-red-500 px-4 py-2 rounded-xl">
            Logout
          </button>

        </div>

      </nav>


      <div className="flex">

        {/* Sidebar */}
        <aside
        className="
            w-64
            bg-white
            shadow-xl
            min-h-screen
            p-6
        "
        >

        <h2
            className="
            font-bold
            text-xl
            mb-6
            "
        >
            Layout Menu
        </h2>

        <ul className="space-y-4">

            <li>

            <button

                onClick={() =>
                navigate("/layout1")
                }

                className="
                w-full
                text-left
                bg-blue-100
                hover:bg-blue-200
                transition-all
                p-3
                rounded-xl
                "
            >
                Layout 1
            </button>

            </li>

            <li>

            <button

                onClick={() =>
                navigate("/layout2")
                }

                className="
                w-full
                text-left
                bg-green-100
                hover:bg-green-200
                transition-all
                p-3
                rounded-xl
                "
            >
                Layout 2
            </button>

            </li>

            <li>

            <button

                onClick={() =>
                navigate("/layout3")
                }

                className="
                w-full
                text-left
                bg-purple-100
                hover:bg-purple-200
                transition-all
                p-3
                rounded-xl
                "
            >
                Layout 3
            </button>

            </li>

        </ul>

        </aside>


        {/* Main Content */}
        <main className="flex-1 p-8">

          <h1 className="text-4xl font-bold text-blue-700 mb-8">
            Overview
          </h1>


          {/* Flexbox Cards */}
          <div className="flex gap-6 flex-wrap">

            <div className="flex-1 min-w-[250px] bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition-all">

              <h2 className="text-gray-500">
                Patients
              </h2>

              <h1 className="text-5xl font-bold text-blue-700 mt-4">
                1240
              </h1>

              <p className="text-green-500 mt-4">
                +12% This Month
              </p>

            </div>


            <div className="flex-1 min-w-[250px] bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition-all">

              <h2 className="text-gray-500">
                Doctors
              </h2>

              <h1 className="text-5xl font-bold text-green-600 mt-4">
                84
              </h1>

              <p className="text-green-500 mt-4">
                Active Staff
              </p>

            </div>


            <div className="flex-1 min-w-[250px] bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition-all">

              <h2 className="text-gray-500">
                Appointments
              </h2>

              <h1 className="text-5xl font-bold text-red-600 mt-4">
                312
              </h1>

              <p className="text-yellow-500 mt-4">
                Pending Reviews
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default HospitalDashboard;