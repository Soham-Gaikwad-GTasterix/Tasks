import { forwardRef } from "react";

const Input = forwardRef(
    (
        {
            className = "",
            ...props
        },
        ref
    ) => {
        return (
            <input
                ref={ref}
                {...props}
                className={`
                    w-full border p-3 rounded-xl outline-none mb-3 ${className}
                `}
            />
        );
    }
);

Input.displayName = "Input";

export default Input;