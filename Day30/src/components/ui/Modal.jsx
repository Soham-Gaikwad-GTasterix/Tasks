import { useTheme } from "../../context/ThemeContext";

function Modal({
    open,
    children
}) {

    const { colors } =useTheme();

    if (!open)
        return null;

    return(
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
            <div
                style={{
                    backgroundColor: colors.background
                }}
                className="rounded-3xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
                {children}

            </div>

        </div>
    );
}

export default Modal;