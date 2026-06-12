import { View, Text } from "react-native";

import NavigationHeader from "../../components/NavigationHeader";

export default function Profile() {
    return (
        <View
            style={{
                flex: 1,
                marginTop: 30
            }}
        >
            <NavigationHeader
                title="Profile"
            />

            <View
                style={{
                    padding: 20,
                    borderWidth: 1,
                    borderRadius: 16,
                    margin: 20
                }}
            >
                <Text>
                    User Profile
                </Text>
            </View>
        </View>
    );
}