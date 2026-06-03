import {
  useTheme
} from "../context/ThemeContext";

function RevenueChart() {

  const chartData = [

    { month: "Jan", value: 40 },

    { month: "Feb", value: 60 },

    { month: "Mar", value: 55 },

    { month: "Apr", value: 80 },

    { month: "May", value: 70 },

    { month: "Jun", value: 95 },

    { month: "Jul", value: 85 },

    { month: "Aug", value: 100 }

  ];

  const { colors, darkMode } = useTheme();

  return (

    <div

      style={{
        backgroundColor: colors.card
      }}

      className="

        border

        border-slate-800

        rounded-3xl

        p-6

        shadow-xl

      "

    >

      {/* HEADER */}

      <div

        className="

          flex

          justify-between

          items-center

          mb-8

        "

      >

        <div>

          <h2

            style={{
              color: colors.text
            }}

            className="

              text-2xl

              font-bold

            "

          >

            Revenue Overview

          </h2>

          <p

            className="

              text-slate-400

              mt-1

            "

          >

            Monthly performance analytics

          </p>

        </div>

        <button

          type="button"

          className="

            px-4

            py-2

            bg-indigo-600

            hover:bg-indigo-700

            text-white

            rounded-xl

            transition-all

          "

        >

          Export

        </button>

      </div>

      {/* CHART */}

      <div

        className="

          h-80

          flex

          items-end

          justify-between

          gap-4

        "

      >

        {

          chartData.map(

            (item) => (

              <div

                key={item.month}

                className="

                  flex

                  flex-col

                  items-center

                  flex-1

                "

              >

                <div

                  className="

                    w-full

                    bg-indigo-600

                    hover:bg-indigo-500

                    rounded-t-xl

                    transition-all

                    cursor-pointer

                  "

                  style={{

                    height:

                      `${item.value * 2.5}px`

                  }}

                />

                <span
                
                  style={{
                    color: colors.text
                  }}

                  className="

                    mt-3

                    text-sm

                  "

                >

                  {item.month}

                </span>

              </div>

            )

          )

        }

      </div>

    </div>

  );

}

export default RevenueChart;