function Modal({

  isOpen,

  onClose,

  children

}) {

  if (!isOpen) return null;


  return (

    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-white
          w-[500px]
          p-8
          rounded-3xl
          shadow-2xl
        "
      >

        {children}

        <button

          onClick={onClose}

          className="
            mt-6
            bg-red-500
            hover:bg-red-600
            transition-all
            text-white
            px-5
            py-3
            rounded-xl
            w-full
          "
        >
          Close Modal
        </button>

      </div>

    </div>
  );
}

export default Modal;