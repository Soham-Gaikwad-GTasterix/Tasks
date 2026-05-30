function StatCard({

  title,
  value,
  trend,
  icon

}) {

  return (

    <div

      className="
        bg-[var(--card)]

        p-6

        rounded-3xl

        shadow-xl

        hover:scale-105

        transition-all
      "
    >

      <div
        className="
          flex
          justify-between
          items-center
        "
      >

        <div>

          <h3
            className="
              text-gray-500
            "
          >
            {title}
          </h3>

          <h1
            className="
              text-3xl
              md:text-5xl
              font-bold
              mt-3
            "
          >
            {value}
          </h1>

        </div>

        <div
          className="
            text-4xl
          "
        >
          {icon}
        </div>

      </div>

      <p
        className="
          text-green-500
          mt-4
        "
      >
        {trend}
      </p>

    </div>

  );
}

export default StatCard;