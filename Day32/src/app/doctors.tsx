import { View, Text } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import InfoCard from "../components/InfoCard";

export default function Doctors() {
    return (
        <View
            style={{
                flex: 1,
                marginTop:30
            }}
        >
            <NavigationHeader
                title="Doctors"
                showBack
            />

            <InfoCard
                title="Doctor Name"
                subtitle="Raj"
                buttonText="View Details"
                onPress={() =>
                    router.push({
                        pathname: "/doctor-details",
                        params: {
                            id: "1",
                            name: "Raj",
                            email: "raj@hospital.com",
                            specialization: "Surgery",
                            experience: "10+",
                            department: "Surgery",
                            qualification: "MBBS",
                            phone: "7891230456"
                        }
                    })
                }
            />

        </View>
    );
}