import {

  useContext

} from "react";

import {

  useNavigate

} from "react-router-dom";

import {

  AuthContext

} from "../context/AuthContext";


function Navbar() {

  const { dispatch } =
    useContext(AuthContext);

  const navigate =
    useNavigate();


  function logout() {

    dispatch({

      type: "LOGOUT"

    });

    navigate("/");
  }


  return (

    <div
      className="
        bg-blue-700
        text-white
        px-10
        py-5
        flex
        justify-between
        items-center
      "
    >

      <h1
        className="
          text-3xl
          font-bold
        "
      >
        Hospital System
      </h1>


      <button

        onClick={logout}

        className="
          bg-red-500
          hover:bg-red-600
          transition-all
          px-5
          py-3
          rounded-xl
          font-semibold
        "
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;