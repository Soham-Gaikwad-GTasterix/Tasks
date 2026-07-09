import { Text } from "react-native";

function ScreenTitle({
    title
}) {
    return (
        <Text
            style={{
                fontSize: 32,
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: 6,
                marginTop: 20
            }}
        >
            {title}
        </Text>
    );
}

export default ScreenTitle;