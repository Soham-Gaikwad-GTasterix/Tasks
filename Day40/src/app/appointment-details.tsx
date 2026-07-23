import { View, Text, ScrollView } from "react-native";

import { useLocalSearchParams } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import Animated, { SlideInRight } from "react-native-reanimated";

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
                backgroundColor: "#f4f8fc"
            }}
        >
            <NavigationHeader
                title="Appointment Details"
                showBack
            />

            <ScrollView
                style={{
                    backgroundColor: "#fff",
                    borderRadius: 28,
                    marginTop: 20,
                    marginHorizontal: 20,
                    marginBottom: 50,
                    maxHeight: 430,
                    elevation: 6,
                    shadowColor: "#000",
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    shadowOffset: {
                        width: 0,
                        height: 4
                    }
                }}
                contentContainerStyle={{
                    padding: 24
                }}
                showsVerticalScrollIndicator={false}
            >
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "700",
                        textAlign: "center",
                        color: "#0f172a"
                    }}
                >
                    {appointment?.patient}
                </Text>
                <View
                    style={{
                        marginBottom:16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Appointment ID
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {appointment?.id}
                    </Text>
                </View>
                <View
                    style={{
                        marginBottom:16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Doctor Name
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {appointment?.doctor}
                    </Text>
                </View>
                <View
                    style={{
                        marginBottom:16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Date
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {appointment?.date}
                    </Text>
                </View>
                <View
                    style={{
                        marginBottom:16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Time
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {appointment?.time}
                    </Text>
                </View>
                <View
                    style={{
                        alignSelf: "center",
                        backgroundColor: appointment?.status === "Completed"
                            ? "#dcfce7"
                            : appointment?.status === "Cancelled"
                                ? "#fee2e2"
                                : "#fef3c7",
                        paddingHorizontal: 18,
                        paddingVertical: 8,
                        borderRadius: 20,
                        marginBottom: 20
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "700"
                        }}
                    >
                        {appointment?.status}
                    </Text>
                </View>
            </ScrollView>
        </Animated.View>
    );
}