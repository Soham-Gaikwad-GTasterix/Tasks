import { Pressable, Text } from "react-native";

function CustomButton({
    title,
    onPress
}) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed}) => ({
                opacity: pressed
                    ? 0.7
                    : 1,
            
                backgroundColor: "#2563eb",
                padding: 16,
                borderRadius: 12,
                marginTop: 20
            })}
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
        </Pressable>
    );
}

export default CustomButton;