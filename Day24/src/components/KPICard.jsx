import {
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";

import {
  typography
} from "../theme/typography";

import {
  useTheme
} from "../context/ThemeContext";

function KPICard({
  title,
  value,
  icon,
  change,
  positive = true,
  color
}) {

  const { colors } = useTheme();
  
  return (
    <div   
    
      style={{
        backgroundColor: colors.card
      }}

      className="
        relative

        overflow-hidden

        backdrop-blur-xl

        border

        border-slate-800

        rounded-3xl

        p-6
        md:p-7

        shadow-xl

        hover:border-indigo-500

        hover:-translate-y-1

        transition-all

        duration-300
      "
    >

      <div 

        style={{
          backgroundColor: colors.background
        }}

        className="
          absolute
          top-0
          right-0
          w-24
          h-24

          blur-3xl

          rounded-full
        "
      />

      <div
        className="
          relative

          flex

          justify-between

          items-start
        "
      >

        <div>

          <p

            style={{
              color: colors.text
            }}

            className="

              ${typography.small}

              uppercase

              tracking-[0.2em]

              font-medium
            "
          >
            {title}
          </p>

          <h2

            style={{
              color: colors.text
            }}

            className="

              text-3xl

              md:text-4xl

              font-bold

              mt-4
            "
          >
            {value}
          </h2>

        </div>

        <div
          className={`
            w-14
            h-14

            md:w-16
            md:h-16

            rounded-2xl

            flex

            items-center

            justify-center

            text-white

            text-xl

            shadow-lg

            ${color}
          `}
        >
          {icon}
        </div>

      </div>

      <div
        className="
          flex

          items-center

          gap-2

          mt-8
        "
      >

        {positive ? (
          <FaArrowUp className="text-green-500" />
        ) : (
          <FaArrowDown className="text-red-500" />
        )}

        <span
          className={
            positive
              ? "text-green-500 font-semibold"
              : "text-red-500 font-semibold"
          }
        >
          {change}
        </span>

        <span

          style={{
            color: colors.text
          }}

          className="

            ${typography.small}
          "
        >
          vs last month
        </span>

      </div>

    </div>
  );
}

export default KPICard;