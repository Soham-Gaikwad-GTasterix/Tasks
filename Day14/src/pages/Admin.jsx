function Admin() {

  return (

    <div
      className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      "
    >

      <div
        className="
          text-center
        "
      >

        <h1
          className="
            text-7xl
            font-bold
            text-red-500
          "
        >
          Admin Panel
        </h1>

        <p
          className="
            mt-5
            text-xl
            text-gray-400
          "
        >
          Restricted Access Area
        </p>

      </div>

    </div>
  );
}

export default Admin;