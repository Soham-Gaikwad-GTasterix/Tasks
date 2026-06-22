import { View, Text } from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import Animated, { SlideInRight } from "react-native-reanimated";

import CustomButton from "@/components/CustomButton";

import { useFocusEffect } from "expo-router";

import { useCallback, useState } from "react";

import { getAppointments } from "@/services/appointmentService";

export default function AppointmentDetails() {
    const { id } = useLocalSearchParams();

    const [appointment, setAppointment] = useState(null);

    useFocusEffect(
            useCallback (() => {
                async function loadAppointment() {
                    const appointments = await getAppointments();
                    const found = appointments.find(
                        d => d.id === id
                    );
                    setAppointment(found);
                }
                loadAppointment();
            }, [id])
        );

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
                    Appointment ID: {appointment?.id}
                </Text>
                <Text>
                    Patient Name: {appointment?.patient}
                </Text>
                <Text>
                    Doctor Name: {appointment?.doctor}
                </Text>
                <Text>
                    Date: {appointment?.date}
                </Text>
                <Text>
                    Time: {appointment?.time}
                </Text>
                <Text>
                    Status: {appointment?.status}
                </Text>
                <CustomButton
                    title="Edit"
                    onPress={() =>
                        router.push({
                            pathname: "/edit-details",
                            params: {
                                type: "appointment",
                                data: JSON.stringify({
                                    id: appointment?.id,
                                    patient: appointment?.patient,
                                    doctor: appointment?.doctor,
                                    date: appointment?.date,
                                    time: appointment?.time,
                                    status: appointment?.status
                                })
                            }
                        })
                    }
                />
            </View>
        </Animated.View>
    );
}