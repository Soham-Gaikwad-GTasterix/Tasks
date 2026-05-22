import {
  useContext
} from "react";

import {
  AuthContext
} from "./context/AuthContext";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";


function App() {

  const {
    user
  } = useContext(AuthContext);


  return (

    <div>

      {
        user
          ? <Dashboard />
          : <Login />
      }

    </div>
  );
}

export default App;