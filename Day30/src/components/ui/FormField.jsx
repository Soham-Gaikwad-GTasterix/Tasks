import { useTheme } from "../../context/ThemeContext";

function FormField({
    label,
    children,
    className=""
}) {

    const { colors } =useTheme();

    return (
        <div
            className={`mb-2 ${className}`}
        >

            {label && (

                <label
                    style={{
                        color: colors.text
                    }}
                    className="block mb-2 font-medium"
                >

                    {label}

                </label>
            )}

            {children}

        </div>
    );
}

export default FormField;