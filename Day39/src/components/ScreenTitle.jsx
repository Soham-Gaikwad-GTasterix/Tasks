import { Text } from "react-native";

function ScreenTitle({
    title
}) {
    return (
        <Text
            style={{
                fontSize: 28,
                fontWeight: "bold",
                marginBottom: 20,
                marginTop: 30
            }}
        >
            {title}
        </Text>
    );
}

export default ScreenTitle;