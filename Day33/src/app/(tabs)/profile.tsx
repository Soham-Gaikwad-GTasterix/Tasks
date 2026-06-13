import { View, Text } from "react-native";

import ScreenTitle from "../../components/ScreenTitle";

export default function Profile() {
    return (
        <View
            style={{
                flex: 1,
                padding: 20
            }}
        >
            <ScreenTitle
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