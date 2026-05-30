function Loader() {

  return (

    <div
      className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        bg-slate-950
      "
    >

      {/* Logo */}

      <div
        className="
          relative
          w-24
          h-24
          mb-8
        "
      >

        <div
          className="
            absolute
            inset-0
            border-4
            border-cyan-500
            rounded-full
            animate-ping
          "
        />

        <div
          className="
            absolute
            inset-0
            border-4
            border-cyan-400
            rounded-full
          "
        />

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            text-4xl
          "
        >
          🏥
        </div>

      </div>

      {/* Title */}

      <h1
        className="
          text-4xl
          font-bold
          text-cyan-400
          tracking-wide
        "
      >
        Hospital Management
      </h1>

      <p
        className="
          text-slate-400
          mt-3
          text-lg
        "
      >
        Loading...
      </p>

      {/* Progress Bar */}

      <div
        className="
          w-72
          h-2
          bg-slate-800
          rounded-full
          overflow-hidden
          mt-8
        "
      >

        <div
          className="
            h-full
            bg-cyan-400
            animate-pulse
            w-full
          "
        />

      </div>

    </div>

  );

}

export default Loader;