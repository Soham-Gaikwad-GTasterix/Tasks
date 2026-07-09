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
                paddingTop: 55,
                paddingBottom: 20,
                paddingHorizontal: 20,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
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
                    fontSize: 30,
                    fontWeight: "700"
                }}
            >
                {title}
            </Text>
        </View>
    );
}

export default NavigationHeader;