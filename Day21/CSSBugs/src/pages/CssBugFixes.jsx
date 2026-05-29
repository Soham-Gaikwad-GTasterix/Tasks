import { useState } from "react";

function CssBugFixes() {

  const [showNavbarFix,
    setShowNavbarFix] =
      useState(false);

  const [showAbsoluteFix,
    setShowAbsoluteFix] =
      useState(false);

  const [showZFix,
    setShowZFix] =
      useState(false);

  const [showStickyFix,
    setShowStickyFix] =
      useState(false);

  const [showOverlapFix,
    setShowOverlapFix] =
      useState(false);


  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        p-10
      "
    >

      <h1
        className="
          text-5xl
          font-bold
          text-center
          mb-12
        "
      >
        CSS Bug Playground
      </h1>


    {/* ========================= */}
    {/* BUG 1 */}
    {/* ========================= */}

    <div
    className="
        bg-white
        p-8
        rounded-3xl
        shadow-xl
        mb-10
    "
    >

    <h2
        className="
        text-3xl
        font-bold
        mb-5
        "
    >
        Bug 1: Fixed Navbar Hiding Content
    </h2>

    <button

        onClick={() =>

        setShowNavbarFix(
            !showNavbarFix
        )

        }

        className="
        bg-orange-500
        text-white
        px-4
        py-2
        rounded-xl
        mb-5
        "
    >
        {
        showNavbarFix

            ? "Remove Fix"

            : "Apply Fix"
        }
    </button>


    {/* DEMO */}

    <div
        className="
        border
        rounded-2xl
        overflow-hidden
        bg-gray-50
        "
    >

        {/* MINI PAGE */}

        <div
        className="
            relative
            h-72
            overflow-auto
        "
        >

        {/* NAVBAR */}

        <div
            className="
            sticky
            top-0
            left-0
            right-0
            bg-black
            text-white
            px-6
            py-4
            z-50
            "
        >
            Fixed Navbar
        </div>


        {/* CONTENT */}

        <div

            className={

            showNavbarFix

                ? "pt-6 px-6"

                : "-mt-8 px-6"

            }

        >

            <div
            className="
                bg-blue-100
                p-5
                rounded-xl
                mb-4
            "
            >
            Content Block 1
            </div>

            <div
            className="
                bg-green-100
                p-5
                rounded-xl
                mb-4
            "
            >
            Content Block 2
            </div>

            <div
            className="
                bg-yellow-100
                p-5
                rounded-xl
                mb-4
            "
            >
            Content Block 3
            </div>

            <div
            className="
                bg-purple-100
                p-5
                rounded-xl
                mb-4
            "
            >
            Content Block 4
            </div>

            <div
            className="
                bg-red-100
                p-5
                rounded-xl
            "
            >
            Content Block 5
            </div>

        </div>

        </div>

    </div>


    <p
        className="
        mt-5
        text-gray-600
        "
    >
        Before fix, content starts underneath the navbar.
        After fix, spacing is added so content begins below the navbar.
    </p>

    </div>


      {/* ========================= */}
      {/* BUG 2 */}
      {/* ========================= */}

      <div
        className="
          bg-white
          p-8
          rounded-3xl
          shadow-xl
          mb-10
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            mb-5
          "
        >
          Bug 2: Absolute Element Escaping Parent
        </h2>

        <button

          onClick={() =>

            setShowAbsoluteFix(
              !showAbsoluteFix
            )

          }

          className="
            bg-blue-500
            text-white
            px-4
            py-2
            rounded-xl
            mb-5
          "
        >
          {
            showAbsoluteFix

              ? "Remove Fix"

              : "Apply Fix"
          }
        </button>


        <div
          className={`
            h-40
            bg-gray-200

            ${
              showAbsoluteFix

                ? "relative"

                : ""
            }
          `}
        >

          <div
            className="
              absolute
              top-2
              right-2
              bg-red-500
              text-white
              px-4
              py-2
            "
          >
            Absolute Box
          </div>

        </div>

      </div>


      {/* ========================= */}
      {/* BUG 3 */}
      {/* ========================= */}

      <div
        className="
          bg-white
          p-8
          rounded-3xl
          shadow-xl
          mb-10
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            mb-5
          "
        >
          Bug 3: z-index Not Working
        </h2>

        <button

          onClick={() =>

            setShowZFix(
              !showZFix
            )

          }

          className="
            bg-green-500
            text-white
            px-4
            py-2
            rounded-xl
            mb-5
          "
        >
          {
            showZFix

              ? "Remove Fix"

              : "Apply Fix"
          }
        </button>


        <div
          className="
            relative
            h-40
          "
        >

          <div
            className={`
              absolute
              top-10
              left-10
              w-40
              h-20
              bg-blue-500

              ${
                showZFix

                  ? "relative z-10"

                  : ""
              }
            `}
          />

          <div
            className="
              absolute
              top-16
              left-20
              w-40
              h-20
              bg-red-500
            "
          />

        </div>

      </div>


      {/* ========================= */}
      {/* BUG 4 */}
      {/* ========================= */}

      <div
        className="
          bg-white
          p-8
          rounded-3xl
          shadow-xl
          mb-10
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            mb-5
          "
        >
          Bug 4: Sticky Not Working
        </h2>

        <button

          onClick={() =>

            setShowStickyFix(
              !showStickyFix
            )

          }

          className="
            bg-purple-500
            text-white
            px-4
            py-2
            rounded-xl
            mb-5
          "
        >
          {
            showStickyFix

              ? "Remove Fix"

              : "Apply Fix"
          }
        </button>


        <div
          className="
            h-64
            overflow-y-scroll
            border
          "
        >

          <div
            className={`
              bg-purple-500
              text-white
              p-4

              ${
                showStickyFix

                  ? "sticky top-0"

                  : ""
              }
            `}
          >
            Sticky Header
          </div>

          <div className="h-[600px]" />

        </div>

      </div>


      {/* ========================= */}
      {/* BUG 5 */}
      {/* ========================= */}

      <div
        className="
          bg-white
          p-8
          rounded-3xl
          shadow-xl
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            mb-5
          "
        >
          Bug 5: Overlapping Elements
        </h2>

        <button

          onClick={() =>

            setShowOverlapFix(
              !showOverlapFix
            )

          }

          className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-xl
            mb-5
          "
        >
          {
            showOverlapFix

              ? "Remove Fix"

              : "Apply Fix"
          }
        </button>


        <div

          className={
            showOverlapFix

              ? "flex gap-5"

              : ""
          }

        >

          <div
            className="
              bg-blue-500
              text-white
              p-6
            "
          >
            Box 1
          </div>

          <div
            className="
              bg-green-500
              text-white
              p-6
            "
          >
            Box 2
          </div>

        </div>

      </div>

    </div>

  );
}

export default CssBugFixes;