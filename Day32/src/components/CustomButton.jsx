import { TouchableOpacity, Text } from "react-native";

function CustomButton({
    title,
    onPress
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: "#2563eb",
                padding: 16,
                borderRadius: 12,
                marginTop: 20
            }}
        >
            <Text
                style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold"
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export default CustomButton;