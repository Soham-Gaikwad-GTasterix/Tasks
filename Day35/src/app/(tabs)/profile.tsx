import { View, Text } from "react-native";

import ScreenTitle from "../../components/ScreenTitle";

import { router } from "expo-router";

import CustomButton from "@/components/CustomButton";

import { logout } from "@/storage/authStorage";

export default function Profile() {

    async function handleLogout() {
        await logout();
        router.replace(
            "/login"
        );
    }

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
                <CustomButton
                    title="Logout"
                    onPress={handleLogout}
                    backgroundColor="#dc2626"
                />
            </View>
        </View>
    );
}