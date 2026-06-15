import { View, Text } from "react-native";

function DashboardCard({
    title,
    count,
    color,
    fullWidth = false
}) {
    return (
        <View
            style={{
                backgroundColor: color,
                padding: 20,
                borderRadius: 16,
                marginTop: 20,
                width: fullWidth
                    ? "100%"
                    : "48%"
            }}
        >
            <Text
                style={{
                    color: "white"
                }}
            >
                {title}
            </Text>

            <Text
                style={{
                    color: "white",
                    fontSize: 26,
                    fontWeight: "bold"
                }}
            >
                {count}
            </Text>
        </View>
    );
}

export default DashboardCard;