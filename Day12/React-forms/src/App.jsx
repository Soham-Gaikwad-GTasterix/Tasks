import { useState } from "react";

function App() {

  /*
  =====================================
  TASK 1 — Controlled Input
  =====================================
  */

  const [name, setName] =
    useState("");


  /*
  =====================================
  TASK 2 — Multi-field Form State
  =====================================
  */

  const [formData, setFormData] =
    useState({

      email: "",
      age: ""

    });


  /*
  =====================================
  TASK 3 — Dynamic Validation
  =====================================
  */

  const [error, setError] =
    useState("");


  /*
  =====================================
  HANDLE MULTI-FIELD INPUT
  =====================================
  */

  function handleChange(e) {

    const { name, value } = e.target;


    /*
    Prevent negative age
    */

    if (
      name === "age" &&
      value < 0
    ) {

      return;
    }


    setFormData({

      ...formData,

      [name]: value

    });


    /*
    Email Validation
    */

    if (
      name === "email"
    ) {

      if (!value.includes("@")) {

        setError(
          "Invalid Email"
        );

      } else {

        setError("");
      }
    }
  }


  return (

    <div className="min-h-screen bg-gray-100 p-10">
      
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-lg space-y-10">

        <h1 className="text-4xl font-bold text-blue-700">
          React Forms
        </h1>


        {/* =====================================
            TASK 1
        ===================================== */}

        <div>

          <h2 className="text-2xl font-bold mb-4">
            Task 1 — Controlled Input
          </h2>

          <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
            placeholder="Enter Name" className="w-full border p-3 rounded-xl"/>

          <p className="mt-4 text-lg">
            Name:
            {" "}
            <span className="font-bold">
              {name}
            </span>
          </p>

        </div>


        {/* =====================================
            TASK 2
        ===================================== */}

        <div>

          <h2 className="text-2xl font-bold mb-4">
            Task 2 — Multi-field Form
          </h2>


          <div className="space-y-4">

            <input type="email" name="email" value={formData.email} onChange={handleChange} 
              placeholder="Enter Email" className="w-full border p-3 rounded-xl"/>

            <input type="number" name="age" value={formData.age} onChange={handleChange} 
              placeholder="Enter Age" className="w-full border p-3 rounded-xl"/>

          </div>


          <div className="mt-5 space-y-2">

            <p>
              Email:
              {" "}
              <span className="font-semibold">
                {formData.email}
              </span>
            </p>

            <p>
              Age:
              {" "}
              <span className="font-semibold">
                {formData.age}
              </span>
            </p>

          </div>

        </div>


        {/* =====================================
            TASK 3
        ===================================== */}

        <div>

          <h2 className="text-2xl font-bold mb-4">
            Task 3 — Dynamic Validation (Email)
          </h2>


          {
            error && (

              <p className="text-red-500 font-semibold mb-4">
                {error}
              </p>

            )
          }

        </div>

      </div>

    </div>
  );
}

export default App;