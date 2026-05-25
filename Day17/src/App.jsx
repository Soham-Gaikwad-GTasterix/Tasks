import {
  useForm
} from "react-hook-form";

import {
  yupResolver
} from "@hookform/resolvers/yup";

import * as yup from "yup";


/*
=====================================
YUP VALIDATION SCHEMA
=====================================
*/

const schema = yup.object({

  fullName:

    yup
      .string()
      .required(
        "Full name is required"
      ),


  email:

    yup
      .string()
      .email(
        "Invalid email"
      )
      .required(
        "Email is required"
      ),


  password:

    yup
      .string()
      .min(
        6,
        "Minimum 6 characters"
      )
      .required(
        "Password is required"
      ),


  age:

    yup
      .number()
      .typeError(
        "Age must be number"
      )
      .min(
        18,
        "Minimum age is 18"
      )
      .required(
        "Age is required"
      )

});


function App() {

  /*
  =====================================
  REACT HOOK FORM
  =====================================
  */

  const {

    register,

    handleSubmit,

    formState: {

      errors

    }

  } = useForm({

    resolver:
      yupResolver(schema),

    mode: "onChange"

  });


  /*
  =====================================
  FORM SUBMIT
  =====================================
  */

  function onSubmit(data) {

    console.log(data);

    alert(
      "Registration Successful"
    );
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
          rounded-3xl
          shadow-2xl
          p-10
          w-full
          max-w-2xl
        "
      >

        <h1
          className="
            text-5xl
            font-bold
            text-blue-700
            text-center
          "
        >
          Registration Form
        </h1>


        <p
          className="
            text-center
            text-gray-500
            mt-4
          "
        >
          React Hook Form + Yup
        </p>


        {/* FORM */}
        <form

          onSubmit={
            handleSubmit(onSubmit)
          }

          className="
            mt-10
            space-y-6
          "
        >

          {/* FULL NAME */}
          <div>

            <label
              className="
                font-semibold
              "
            >
              Full Name
            </label>


            <input

              type="text"

              placeholder="Enter full name"

              {...register(
                "fullName"
              )}

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


            <p
              className="
                text-red-500
                mt-2
              "
            >
              {
                errors.fullName
                  ?.message
              }
            </p>

          </div>


          {/* EMAIL */}
          <div>

            <label
              className="
                font-semibold
              "
            >
              Email
            </label>


            <input

              type="email"

              placeholder="Enter email"

              {...register(
                "email"
              )}

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


            <p
              className="
                text-red-500
                mt-2
              "
            >
              {
                errors.email
                  ?.message
              }
            </p>

          </div>


          {/* PASSWORD */}
          <div>

            <label
              className="
                font-semibold
              "
            >
              Password
            </label>


            <input

              type="password"

              placeholder="Enter password"

              {...register(
                "password"
              )}

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


            <p
              className="
                text-red-500
                mt-2
              "
            >
              {
                errors.password
                  ?.message
              }
            </p>

          </div>


          {/* AGE */}
          <div>

            <label
              className="
                font-semibold
              "
            >
              Age
            </label>


            <input

              type="number"

              placeholder="Enter age"

              {...register(
                "age"
              )}

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


            <p
              className="
                text-red-500
                mt-2
              "
            >
              {
                errors.age
                  ?.message
              }
            </p>

          </div>


          {/* SUBMIT */}
          <button

            type="submit"

            className="
              w-full
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
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default App;