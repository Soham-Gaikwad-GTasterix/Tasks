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

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [showPassword,
    setShowPassword] =
      useState(false);

  const [loading,
    setLoading] =
      useState(false);


  const { dispatch } =
    useContext(AuthContext);

  const navigate =
    useNavigate();


  function handleLogin() {

    setError("");

    setLoading(true);

    setTimeout(() => {

      const users = [

        {
          email:
            "admin@hospital.com",

          password:
            "admin123",

          role:
            "admin"
        }

      ];


      const user =
        users.find(

          (u) =>

            u.email === email

            &&

            u.password === password

        );


      if (user) {

        dispatch({

          type: "LOGIN",

          payload: {

            email:
              user.email,

            role:
              user.role

          }

        });

        navigate("/dashboard");

      } else {

        setError(
          "Invalid Credentials"
        );
      }

      setLoading(false);

    }, 1500);

  }


  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-100
        via-indigo-100
        to-purple-200
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
          hover:scale-[1.02]
          transition-all
        "
      >

        {/* LOGO */}

        <div
          className="
            text-center
            mb-8
          "
        >

          <div
            className="
              text-6xl
            "
          >
            🏥
          </div>

          <h1
            className="
              text-5xl
              font-bold
              text-blue-700
              mt-4
            "
          >
            Hospital Login
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Welcome Back
          </p>

        </div>


        {/* EMAIL */}

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
            border-gray-300
            p-4
            rounded-xl
            mb-5
            outline-none
            focus:border-blue-500
          "
        />


        {/* PASSWORD */}

        <div
          className="
            relative
            mb-5
          "
        >

          <input

            type={
              showPassword

                ? "text"

                : "password"
            }

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
              border-gray-300
              p-4
              rounded-xl
              outline-none
              focus:border-blue-500
            "
          />


          <button

            type="button"

            onClick={() =>

              setShowPassword(
                !showPassword
              )

            }

            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-blue-600
              font-semibold
            "
          >
            {
              showPassword

                ? "Hide"

                : "Show"
            }
          </button>

        </div>


        {/* ERROR */}

        {
          error && (

            <p
              className="
                text-red-500
                mb-5
                font-medium
              "
            >
              {error}
            </p>

          )
        }


        {/* LOGIN BUTTON */}

        <button

          onClick={handleLogin}

          disabled={loading}

          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            transition-all
            text-white
            py-4
            rounded-2xl
            font-bold
            disabled:opacity-50
          "
        >

          {
            loading

              ? "Signing In..."

              : "Login"
          }

        </button>


        {/* FOOTER */}

        <p
          className="
            text-center
            text-gray-400
            mt-6
            text-sm
          "
        >
          Hospital Management System
        </p>

      </div>

    </div>

  );
}

export default Login;