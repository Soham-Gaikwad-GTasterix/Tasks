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
                padding: 18,
                borderRadius: 22,
                marginTop: 20,
                marginBottom: 16,
                borderWidth: 1.2,
                borderColor: color,
                flexDirection: "row",
                gap: 6,
                elevation: 6,
                shadowColor: color,
                shadowOpacity: 0.18,
                shadowRadius: 10,
                shadowOffset: {
                    width: 0,
                    height: 6
                },
                width: fullWidth
                    ? "100%"
                    : "48%",
                overflow: "hidden"
            }}
        >
            <View
                style={{
                    position:"absolute",
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    backgroundColor: color + "22",
                    top: -45,
                    right: -35
                }}
            />
            <View
                style={{
                    width: 6,
                    height: 42,
                    borderRadius: 10,
                    backgroundColor: color,
                    marginBottom: 12
                }}
            />
            <View
                style={{
                    flex: 1
                }}
            >    
                <Text
                    style={{
                        color: "#374151",
                        fontSize: 15,
                        fontWeight: "600"
                    }}
                >
                    {title}
                </Text>

                <Text
                    style={{
                        color: "#111827",
                        fontSize: 30,
                        fontWeight: "700",
                        marginTop: 10
                    }}
                >
                    {count}
                </Text>
            </View>
            
        </View>
    );
}

export default DashboardCard;