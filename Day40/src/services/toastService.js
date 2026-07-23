import Toast from "react-native-toast-message";

export function showSuccess(text) {
    Toast.show({
        type: "success",
        text1: text,
        position: "top",
        visibilityTime: 2500
    });
}

export function showError(text) {
    Toast.show({
        type: "error",
        text1: text,
        position: "top",
        visibilityTime: 3000
    });
}

export function showWarning(text) {
    Toast.show({
        type: "info",
        text1: text,
        position: "top",
        visibilityTime: 3000
    });
}

export function showInfo(text) {
    Toast.show({
        type: "info",
        text1: text,
        position: "top",
        visibilityTime: 2500
    });
}