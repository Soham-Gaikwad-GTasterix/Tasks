import {
  Link
} from "react-router-dom";


function Home() {

  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-100
        to-blue-300
        flex
        items-center
        justify-center
        p-10
      "
    >

      <div
        className="
          bg-white
          p-10
          rounded-3xl
          shadow-2xl
          max-w-2xl
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
          Hospital Portal
        </h1>

        <p
          className="
            mt-5
            text-gray-600
            text-lg
          "
        >
          Manage hospital analytics,
          doctors, patients and
          secure admin controls.
        </p>


        <div
          className="
            flex
            justify-center
            gap-5
            mt-10
          "
        >

          <Link to="/dashboard/users">

            <button
              className="
                bg-blue-600
                hover:bg-blue-700
                transition-all
                text-white
                px-6
                py-4
                rounded-4xl
                shadow-lg
                cursor-pointer
              "
            >
              Open Dashboard
            </button>
          
          </Link>


          <Link to="/admin">

            <button
              className="
                bg-red-500
                hover:bg-red-600
                transition-all
                text-white
                px-6
                py-4
                rounded-4xl
                shadow-lg
                cursor-pointer
              "
            >
              Admin Access
            </button>
          
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;