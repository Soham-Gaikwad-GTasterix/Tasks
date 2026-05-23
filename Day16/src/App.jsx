import {
  useState
} from "react";

import Modal from "./components/Modal";

import Form from "./components/Form";

import Toggle from "./components/Toggle";


function App() {

  const [isOpen, setIsOpen] =
    useState(false);


  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-100
        to-indigo-200
        p-10
      "
    >

      <h1
        className="
          text-6xl
          font-bold
          text-center
          text-blue-700
          mb-16
        "
      >
        Advanced React Patterns
      </h1>


      {/* ========================= */}
      {/* TASK 1 — MODAL */}
      {/* ========================= */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          p-8
          mb-10
        "
      >

        <h2
          className="
            text-4xl
            font-bold
            mb-5
          "
        >
          Task 1 — Reusable Modal
        </h2>


        <button

          onClick={() =>
            setIsOpen(true)
          }

          className="
            bg-blue-600
            hover:bg-blue-700
            transition-all
            text-white
            px-6
            py-4
            rounded-2xl
            font-bold
          "
        >
          Open Modal
        </button>


        <Modal

          isOpen={isOpen}

          onClose={() =>
            setIsOpen(false)
          }
        >

          <h1
            className="
              text-4xl
              font-bold
              text-blue-700
            "
          >
            Reusable Modal System
          </h1>


          <p
            className="
              mt-4
              text-gray-500
            "
          >
            This modal can be reused
            anywhere in the application.
          </p>

        </Modal>

      </div>


      {/* ========================= */}
      {/* TASK 2 — COMPOUND FORM */}
      {/* ========================= */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          p-8
          mb-10
        "
      >

        <h2
          className="
            text-4xl
            font-bold
            mb-8
          "
        >
          Task 2 — Compound Components
        </h2>


        <Form>

          <Form.Input
            label="Username"
            placeholder="Enter username"
          />


          <Form.Input
            label="Password"
            placeholder="Enter password"
            type="password"
          />


          <Form.Button>
            Submit Form
          </Form.Button>

        </Form>

      </div>


      {/* ========================= */}
      {/* TASK 3 — RENDER PROPS */}
      {/* ========================= */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          p-8
        "
      >

        <h2
          className="
            text-4xl
            font-bold
            mb-8
          "
        >
          Task 3 — Render Props Toggle
        </h2>


        <Toggle

          render={({

            isOn,

            toggle

          }) => (

            <div>

              <div
                className={`
                  text-5xl
                  font-bold
                  transition-all

                  ${
                    isOn
                      ? "text-green-600"
                      : "text-red-500"
                  }
                `}
              >
                {
                  isOn
                    ? "SYSTEM ON"
                    : "SYSTEM OFF"
                }
              </div>


              <button

                onClick={toggle}

                className={`
                  mt-8
                  px-6
                  py-4
                  rounded-2xl
                  text-white
                  font-bold
                  transition-all

                  ${
                    isOn
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }
                `}
              >
                Toggle System
              </button>

            </div>
          )}
        />

      </div>

    </div>
  );
}

export default App;