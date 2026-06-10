function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}) {
    const variants ={
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white",

        success: "bg-green-500 hover:bg-green-600 text-white",

        danger: "bg-red-500 hover:bg-red-600 text-white",

        warning: "bg-yellow-500 hover:bg-yellow-600 text-white",

        secondary: "bg-slate-700 hover:bg-slate-800 text-white",
    };

    return(
        <button
            {...props}
            className={`
                px-4 py-3 rounded-xl font-semibold transition-all ${variants[variant] || variants.primary} ${className}
            `}
        >

        {children}

        </button>

    );
}

export default Button;