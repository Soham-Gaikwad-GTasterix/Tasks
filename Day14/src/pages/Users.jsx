function Users() {

  const users = [
    "John",
    "Emma",
    "Sophia",
    "Michael"
  ];

  return (

    <div>

      <h1
        className="
          text-5xl
          font-bold
          text-blue-700
          mb-8
        "
      >
        Users Page
      </h1>


      <div
        className="
          grid
          md:grid-cols-2
          gap-6
        "
      >

        {
          users.map((user) => (

            <div
              key={user}

              className="
                bg-blue-50
                p-6
                rounded-2xl
                shadow-md
                hover:scale-105
                transition-all
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                {user}
              </h2>

              <p
                className="
                  text-gray-500
                  mt-2
                "
              >
                Active Patient
              </p>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Users;