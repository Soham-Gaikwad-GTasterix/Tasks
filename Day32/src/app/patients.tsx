import { View, Text } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import InfoCard from "../components/InfoCard";

export default function Patients() {
    return (
        <View
            style={{
                flex: 1,
                marginTop:30
            }}
        >
            <NavigationHeader
                title="Patients"
                showBack
            />

            <InfoCard
                title="Patient Name"
                subtitle="Soham"
                buttonText="View Details"
                onPress={() =>
                    router.push({
                        pathname: "/patient-details",
                        params: {
                            id: "1",
                            name: "Soham",
                            email: "soham@test.com",
                            age: "26",
                            gender: "Male",
                            disease: "Flu",
                            admissionDate: "2026-06-05",
                            phone: "9518462370",
                            bloodGroup: "A+",
                            roomNumber: "201"
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
                        pathname: "/patient-details",
                        params: {
                            id: "2",
                            name: "Test",
                            email: "test@test.com",
                            age: "25",
                            gender: "Feale",
                            disease: "Cold",
                            admissionDate: "2026-06-10",
                            phone: "7891230458",
                            bloodGroup: "B+",
                            roomNumber: "208"
                        }
                    })
                }
            />
        </View>
    );
}