import {

  lazy,

  Suspense

} from "react";

import {

  Routes,

  Route

} from "react-router-dom";


const Dashboard =
  lazy(() =>
    import("./pages/Dashboard")
  );

const PatientList =
  lazy(() =>
    import("./pages/PatientList")
  );

const DoctorList =
  lazy(() =>
    import("./pages/DoctorList")
  );

const AppointmentList =
  lazy(() =>
    import("./pages/AppointmentList")
  );

const PatientDetails =
  lazy(() =>
    import(
      "./pages/PatientDetails"
    )
  );


function App() {

  return (

    <Suspense

      fallback={

        <div
          className="
            min-h-screen
            flex
            items-center
            justify-center
            text-5xl
            font-bold
          "
        >
          Loading...
        </div>

      }
    >

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/patients"
          element={<PatientList />}
        />

        <Route
          path="/doctors"
          element={<DoctorList />}
        />

        <Route
          path="/appointments"
          element={<AppointmentList />}
        />

        <Route

          path="/patients/:id"

          element={
            <PatientDetails />
          }

        />

      </Routes>

    </Suspense>

  );
}

export default App;