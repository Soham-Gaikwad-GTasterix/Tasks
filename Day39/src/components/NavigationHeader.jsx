import { View, Text, TouchableOpacity } from "react-native";

import { router } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

function NavigationHeader({
    title,
    showBack = false
}) {
    return (
        <View
            style={{
                padding: 10,
                backgroundColor: "#2563eb",
                flexDirection: "row",
                alignItems: "center"
            }}
        >
            {showBack && (
                <TouchableOpacity
                    onPress={() =>
                        router.back()
                    }
                    style={{
                        marginRight: 15
                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            )}
            <Text
                style={{
                    color: "white",
                    fontSize: 28,
                    fontWeight: "bold"
                }}
            >
                {title}
            </Text>
        </View>
    );
}

export default NavigationHeader;