import { BaseToast } from "react-native-toast-message";

export const toastConfig = {
    success: props => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: "#22c55e",
                borderRadius: 16,
                minHeight: 70
            }}
            text1Style={{
                fontSize: 16,
                fontWeight: "700"
            }}
        />
    ),

    error: props => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: "#ef4444",
                borderRadius: 16,
                minHeight: 70
            }}
            text1Style={{
                fontSize: 16,
                fontWeight: "700"
            }}
        />
    ),

    info: props => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: "#2563eb",
                borderRadius: 16,
                minHeight: 70
            }}
            text1Style={{
                fontSize: 16,
                fontWeight: "700"
            }}
        />
    )
};