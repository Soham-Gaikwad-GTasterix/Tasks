import {
  useContext,
  useState
} from "react";

import {
  AuthContext
} from "../context/AuthContext";


function Login() {

  const {
    dispatch
  } = useContext(AuthContext);


  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");


  function handleLogin() {

    /*
    Admin Login
    */

    if (

      username === "admin" &&
      password === "admin123"

    ) {

      dispatch({

        type: "LOGIN",

        payload: {

          name: "Soham",

          role: "admin"

        }

      });

      return;
    }


    /*
    User Login
    */

    if (

      username === "user" &&
      password === "user123"

    ) {

      dispatch({

        type: "LOGIN",

        payload: {

          name: "Rahul",

          role: "user"

        }

      });

      return;
    }


    /*
    Invalid Credentials
    */

    setError(
      "Invalid username or password"
    );
  }


  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-500
        to-indigo-700
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
          w-full
          max-w-md
        "
      >

        <h1
          className="
            text-5xl
            font-bold
            text-center
            text-blue-700
          "
        >
          Hospital Login
        </h1>


        <p
          className="
            text-center
            text-gray-500
            mt-4
          "
        >
          Enter your credentials
        </p>


        {/* Username */}
        <div className="mt-8">

          <label
            className="
              font-semibold
            "
          >
            Username
          </label>

          <input
            type="text"

            value={username}

            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }

            placeholder="Enter username"

            className="
              w-full
              mt-2
              border
              border-gray-300
              p-4
              rounded-xl
              outline-none
              focus:ring-4
              focus:ring-blue-300
            "
          />

        </div>


        {/* Password */}
        <div className="mt-6">

          <label
            className="
              font-semibold
            "
          >
            Password
          </label>

          <input
            type="password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            placeholder="Enter password"

            className="
              w-full
              mt-2
              border
              border-gray-300
              p-4
              rounded-xl
              outline-none
              focus:ring-4
              focus:ring-blue-300
            "
          />

        </div>


        {/* Error */}
        {
          error && (

            <p
              className="
                text-red-500
                mt-5
                font-semibold
              "
            >
              {error}
            </p>

          )
        }


        {/* Login Button */}
        <button

          onClick={handleLogin}

          className="
            w-full
            mt-8
            bg-blue-600
            hover:bg-blue-700
            transition-all
            text-white
            py-4
            rounded-xl
            font-bold
            text-lg
            shadow-lg
          "
        >
          Login
        </button>


        {/* Demo Credentials */}
        <div
          className="
            mt-8
            bg-gray-100
            p-5
            rounded-2xl
            text-sm
          "
        >

          <h2
            className="
              font-bold
              mb-3
            "
          >
            Demo Credentials
          </h2>

          <p>
            Admin:
            {" "}
            admin / admin123
          </p>

          <p className="mt-2">
            User:
            {" "}
            user / user123
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;