import {

  useState,

  useContext

} from "react";

import {

  useNavigate

} from "react-router-dom";

import {

  AuthContext

} from "../context/AuthContext";


function Login() {

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
      useState("");

  const [error, setError] =
    useState("");


  const { dispatch } =
    useContext(AuthContext);

  const navigate =
    useNavigate();


  function handleLogin() {

    if (

      email ===
        "admin@hospital.com"

      &&

      password ===
        "admin123"

    ) {

      dispatch({

        type: "LOGIN",

        payload: {

          email

        }

      });

      navigate("/dashboard");

    } else {

      setError(
        "Invalid Credentials"
      );
    }
  }


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
          p-10
          rounded-3xl
          shadow-2xl
          w-full
          max-w-md
        "
      >

        <h1
          className="
            text-5xl
            font-bold
            text-blue-700
            mb-8
            text-center
          "
        >
          Hospital Login
        </h1>


        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          className="
            w-full
            border
            p-4
            rounded-xl
            mb-5
          "
        />


        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          className="
            w-full
            border
            p-4
            rounded-xl
            mb-5
          "
        />


        {
          error && (

            <p
              className="
                text-red-500
                mb-5
              "
            >
              {error}
            </p>

          )
        }


        <button

          onClick={handleLogin}

          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            transition-all
            text-white
            py-4
            rounded-2xl
            font-bold
          "
        >
          Login
        </button>


        <div
          className="
            mt-6
            text-gray-500
            text-sm
          "
        >
          admin@hospital.com
          <br />
          admin123
        </div>

      </div>

    </div>
  );
}

export default Login;