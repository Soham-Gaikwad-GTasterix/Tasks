import { View, Text } from "react-native";

import { useLocalSearchParams } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

export default function AppointmentDetails() {
    const {
        id,
        name,
        doctor,
        date,
        time,
        status
    } = useLocalSearchParams();

    return (
        <View
            style={{
                flex: 1,
                marginTop: 30
            }}
        >
            <NavigationHeader
                title="Appointment Details"
                showBack
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
                    Appointment ID: {id}
                </Text>
                <Text>
                    Patient Name: {name}
                </Text>
                <Text>
                    Doctor Name: {doctor}
                </Text>
                <Text>
                    Date: {date}
                </Text>
                <Text>
                    Time: {time}
                </Text>
                <Text>
                    Status: {status}
                </Text>
            </View>
        </View>
    );
}