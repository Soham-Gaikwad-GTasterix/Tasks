function Card({
  title,
  value,
  status,
  children
}) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        p-6
        shadow-lg
        hover:scale-105
        transition-all
        duration-300
      "
    >

      <h3
        className="
          text-gray-500
          text-sm
          mb-2
        "
      >
        {title}
      </h3>

      <h1
        className="
          text-4xl
          font-bold
          text-gray-800
        "
      >
        {value}
      </h1>

      <p
        className="
          mt-3
          text-green-600
          font-medium
        "
      >
        {status}
      </p>

      {/* Dynamic Content */}
      <div className="mt-5">
        {children}
      </div>

    </div>
  );
}

export default Card;