import { Tabs } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="add"
                options={{
                    title: "Add",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="add-circle"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}