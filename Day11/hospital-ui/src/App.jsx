import { useState } from "react";


function Button({ text, onClick }) {

  return (

    <button
      onClick={onClick}
      className="
        bg-blue-600
        hover:bg-blue-700
        transition-all
        duration-300
        px-5
        py-3
        rounded-xl
        text-white
        font-semibold
        shadow-lg
      "
    >
      {text}
    </button>
  );
}


function Card({
  title,
  value,
  status,
  children
}) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        p-6
        shadow-lg
        hover:scale-105
        transition-all
        duration-300
      "
    >

      <h3
        className="
          text-gray-500
          text-sm
          mb-2
        "
      >
        {title}
      </h3>

      <h1
        className="
          text-4xl
          font-bold
          text-gray-800
        "
      >
        {value}
      </h1>

      <p
        className="
          mt-3
          text-green-600
          font-medium
        "
      >
        {status}
      </p>


      {/* Dynamic Content */}
      <div className="mt-5">
        {children}
      </div>

    </div>
  );
}


function Layout({ children }) {

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        p-8
      "
    >

      <div
        className="
          bg-blue-700
          text-white
          rounded-3xl
          p-8
          shadow-xl
          mb-8
        "
      >

        <h1
          className="
            text-5xl
            font-bold
          "
        >
          Hospital Dashboard
        </h1>

        <p
          className="
            mt-3
            text-blue-100
          "
        >
          Manage patients, doctors and appointments
        </p>

      </div>

      {children}

    </div>
  );
}


function App() {

  const [patients, setPatients] =
    useState(1248);

  const [doctors, setDoctors] =
    useState(86);

  const [appointments, setAppointments] =
    useState(312);

  return (

    <Layout>

      {/* Dashboard Cards */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
          mb-10
        "
      >

        {/* Patients */}
        <Card
          title="Total Patients"
          value={patients}
          status="Stable"
        >

          <div className="flex gap-3">

            <button
              onClick={() =>
                setPatients(patients + 1)
              }

              className="
                bg-green-500
                hover:bg-green-600
                text-white
                px-4
                py-2
                rounded-lg
                text-xl
                font-bold
              "
            >
              +
            </button>


            <button
              onClick={() =>
                setPatients(patients - 1)
              }

              className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-4
                py-2
                rounded-lg
                text-xl
                font-bold
              "
            >
              -
            </button>

          </div>

        </Card>


        {/* Doctors */}
        <Card
          title="Doctors Available"
          value={doctors}
          status="Active"
        >

          <div className="flex gap-3">

            <button
              onClick={() =>
                setDoctors(doctors + 1)
              }

              className="
                bg-green-500
                hover:bg-green-600
                text-white
                px-4
                py-2
                rounded-lg
                text-xl
                font-bold
              "
            >
              +
            </button>


            <button
              onClick={() =>
                setDoctors(doctors - 1)
              }

              className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-4
                py-2
                rounded-lg
                text-xl
                font-bold
              "
            >
              -
            </button>

          </div>

        </Card>


        {/* Appointments */}
        <Card
          title="Appointments"
          value={appointments}
          status="Updated"
        >

          <div className="flex gap-3">

            <button
              onClick={() =>
                setAppointments(
                  appointments + 1
                )
              }

              className="
                bg-green-500
                hover:bg-green-600
                text-white
                px-4
                py-2
                rounded-lg
                text-xl
                font-bold
              "
            >
              +
            </button>


            <button
              onClick={() =>
                setAppointments(
                  appointments - 1
                )
              }

              className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-4
                py-2
                rounded-lg
                text-xl
                font-bold
              "
            >
              -
            </button>

          </div>

        </Card>

      </div>


      {/* Re-render Demo */}
      <div
        className="
          bg-white
          rounded-3xl
          shadow-lg
          p-8
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            text-gray-800
          "
        >
          React Re-render Demo
        </h2>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Updating state causes component re-render.
        </p>

        <div
          className="
            flex
            items-center
            gap-5
            mt-6
          "
        >

          <Button
            text="Reset"
            onClick={() =>
              {

                setPatients(0);
                setDoctors(0);
                setAppointments(0);

              }
            }
          />

        </div>

      </div>

    </Layout>
  );
}

export default App;