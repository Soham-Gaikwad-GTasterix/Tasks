function Settings() {

  return (

    <div>

      <h1
        className="
          text-5xl
          font-bold
          text-green-600
          mb-10
        "
      >
        Settings
      </h1>


      <div
        className="
          space-y-5
        "
      >

        <div
          className="
            bg-green-100
            p-5
            rounded-2xl
            shadow-md
          "
        >
          Notifications Enabled
        </div>


        <div
          className="
            bg-yellow-100
            p-5
            rounded-2xl
            shadow-md
          "
        >
          Dark Mode Disabled
        </div>


        <div
          className="
            bg-red-100
            p-5
            rounded-2xl
            shadow-md
          "
        >
          Security Check Pending
        </div>

      </div>

    </div>
  );
}

export default Settings;