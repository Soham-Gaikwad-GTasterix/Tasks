import { View, Text } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import InfoCard from "../components/InfoCard";

export default function Appointments() {
    return (
        <View
            style={{
                flex: 1,
                marginTop:30
            }}
        >
            <NavigationHeader
                title="Appointments"
                showBack
            />

            <InfoCard
                title="Patient Name"
                subtitle="Soham"
                buttonText="View Details"
                onPress={() =>
                    router.push({
                        pathname: "/appointment-details",
                        params: {
                            id: "1",
                            name: "Soham",
                            doctor: "raj",
                            date: "2026-06-05",
                            time: "19:23",
                            status: "Completed"
                        }
                    })
                }
            />

            <InfoCard
                title="Patient Name"
                subtitle="Test"
                buttonText="View Details"
                onPress={() =>
                    router.push({
                        pathname: "/appointment-details",
                        params: {
                            id: "2",
                            name: "Test",
                            doctor: "raj",
                            date: "2026-06-10",
                            time: "19:23",
                            status: "Scheduled"
                        }
                    })
                }
            />

            <InfoCard
                title="Patient Name"
                subtitle="Ketan"
                buttonText="View Details"
                onPress={() =>
                    router.push({
                        pathname: "/appointment-details",
                        params: {
                            id: "3",
                            name: "Ketan",
                            doctor: "raj",
                            date: "2026-06-15",
                            time: "19:23",
                            status: "Cancelled"
                        }
                    })
                }
            />

        </View>
    );
}