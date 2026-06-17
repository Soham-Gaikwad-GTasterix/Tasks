import { View, Text } from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import Animated, { SlideInRight } from "react-native-reanimated";

import CustomButton from "@/components/CustomButton";

export default function AppointmentDetails() {
    const {
        id,
        patient,
        doctor,
        date,
        time,
        status
    } = useLocalSearchParams();

    return (
        <Animated.View
            entering={
                SlideInRight
                    .duration(400)
            }
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
                    Patient Name: {patient}
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
                <CustomButton
                    title="Edit"
                    onPress={() =>
                        router.push({
                            pathname: "/edit-details",
                            params: {
                                type: "appointment",
                                data: JSON.stringify({
                                    id,
                                    patient,
                                    doctor,
                                    date,
                                    time,
                                    status
                                })
                            }
                        })
                    }
                />
            </View>
        </Animated.View>
    );
}