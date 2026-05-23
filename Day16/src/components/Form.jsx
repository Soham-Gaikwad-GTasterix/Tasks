function Form({ children }) {

  return (

    <form
      className="
        bg-white
        p-8
        rounded-3xl
        shadow-2xl
        space-y-5
      "
    >

      {children}

    </form>
  );
}


/*
=====================================
INPUT
=====================================
*/

Form.Input =
function Input({

  label,

  ...props

}) {

  return (

    <div>

      <label
        className="
          block
          mb-2
          font-semibold
          text-gray-700
        "
      >
        {label}
      </label>


      <input

        {...props}

        className="
          w-full
          border
          border-gray-300
          p-4
          rounded-xl
          outline-none
          focus:ring-4
          focus:ring-blue-300
        "
      />

    </div>
  );
};


/*
=====================================
BUTTON
=====================================
*/

Form.Button =
function Button({

  children

}) {

  return (

    <button
      className="
        bg-blue-600
        hover:bg-blue-700
        transition-all
        text-white
        px-5
        py-3
        rounded-xl
        w-full
        font-bold
      "
    >
      {children}
    </button>
  );
};

export default Form;