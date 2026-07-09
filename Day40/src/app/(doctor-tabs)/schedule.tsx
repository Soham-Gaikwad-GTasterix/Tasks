import { View, RefreshControl, FlatList, Text, Alert } from "react-native";

import ScreenTitle from "@/components/ScreenTitle";

import { useEffect, useState, useRef } from "react";

import { getAppointments, updateAppointment } from "@/services/appointmentService";

import { getUser } from "@/storage/authStorage";

import { router } from "expo-router";

import CustomButton from "@/components/CustomButton";

export default function Schedule() {
    const [appointments, setAppointments] = useState([]);

    const [visibleIds, setVisibleIds] = useState([]);

    const onViewableItemChanged = useRef(
        ({ viewableItems }) => {
            setVisibleIds(
                prev => [
                    ...new Set([
                        ...prev,
                        ...viewableItems.map(
                            item => item.item.id
                        )
                    ])
                ]
            );
        }
    ).current;

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 70
    };

    async function loadAppointments() {
        try {
            const user = await getUser();

            const data = await getAppointments();

            const statusOrder = {
                Scheduled: 0,
                Completed: 1,
                Cancelled: 2,
                Admitted: 3
            };

            const myAppointments = data
                .filter(item => item.doctorId === user.doctorId)
                .sort((a, b) => {
                    const statusDiff =
                        statusOrder[a.status] - statusOrder[b.status];

                    if (statusDiff !== 0) {
                        return statusDiff;
                    }

                    return (
                        new Date(`${a.date}T${a.time}`) -
                        new Date(`${b.date}T${b.time}`)
                    );
                });

            setAppointments(myAppointments);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadAppointments();
    }, []);

    const [refreshing, setRefreshing] = useState(false);

    async function onRefresh() {
        setRefreshing(true);
        await loadAppointments();
        setRefreshing(false);
    }

    async function handleStatusChange(
        appointment
     ) {
        if (appointment.status !== "Scheduled") {
            return;
        }

        const appointmentDateTime = new Date(
            `${appointment.date}T${appointment.time}`
        );

        if (appointmentDateTime > new Date()) {
            Alert.alert(
                "Appointment Not Started",
                "You can complete an appointment only after its scheduled time."
            );
            return;
        }

        Alert.alert(
            "Appointment Finished",
            "Would you like to admit this patient?",
            [
                {
                    text: "No",
                    onPress: async () => {
                        try {
                            await updateAppointment(
                                appointment.id,
                                {
                                    ...appointment,
                                    status: "Completed"
                                }
                            );
                            await loadAppointments();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
                {
                    text: "Yes",
                    onPress: () => {
                        router.push({
                            pathname: "../admit-patient",
                            params: {
                                appointment: JSON.stringify(
                                    appointment
                                )
                            }
                        });
                    }
                }
            ]
        );
    }

    async function handleCancel(appointment) {
        const apointmentDateTime = new Date(
            `${appointment.date}T${appointment.time}`
        );
        const now = new Date();
        const diffHours = (apointmentDateTime - now) / (1000 * 60 * 60);
        if (diffHours < 3) {
            Alert.alert(
                "Cannot Cancel",
                "Appointments cannot be cancelled within 3 hours."
            );
            return;
        }
        try {
            await updateAppointment(
                appointment.id,
                {
                    ...appointment,
                    status: "Cancelled"
                }
            );
            await loadAppointments();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View
            style={{
                flex: 1,
                marginTop: 30,
                paddingHorizontal: 20,
                backgroundColor: "#f4f8fc"
            }}
        >
            <ScreenTitle
                title="My Schedule"
            />
        
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingBottom: 30
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 22,
                            padding: 18,
                            marginBottom: 18,
                            elevation: 5,
                            shadowColor: "#000",
                            shadowOpacity: 0.08,
                            shadowRadius: 8,
                            borderLeftWidth: 6,
                            borderLeftColor:
                                item.status === "Scheduled"
                                    ? "#2563eb"
                                    : item.status === "Completed"
                                    ? "#22c55e"
                                    : item.status === "Cancelled"
                                    ? "#ef4444"
                                    : "#7c3aed"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "700",
                                        color: "#0f172a"
                                    }}
                                >
                                    👤 {item.patient}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 8,
                                        color: "#64748b"
                                    }}
                                >
                                    📅 {item.date}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 3,
                                        color: "#64748b"
                                    }}
                                >
                                    🕒 {item.time}
                                </Text>
                            </View>

                            <View
                                style={{
                                    backgroundColor:
                                        item.status === "Scheduled"
                                            ? "#dbeafe"
                                            : item.status === "Completed"
                                            ? "#dcfce7"
                                            : item.status === "Cancelled"
                                            ? "#fee2e2"
                                            : "#ede9fe",
                                    paddingHorizontal: 14,
                                    paddingVertical: 8,
                                    borderRadius: 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "700",
                                        color:
                                            item.status === "Scheduled"
                                                ? "#2563eb"
                                                : item.status === "Completed"
                                                ? "#15803d"
                                                : item.status === "Cancelled"
                                                ? "#dc2626"
                                                : "#6d28d9"
                                    }}
                                >
                                    {item.status}
                                </Text>
                            </View>
                        </View>

                        {
                            item.status === "Scheduled" ? (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: 12,
                                        marginTop: 20
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <CustomButton
                                            title="Complete"
                                            onPress={() =>
                                                handleStatusChange(item)
                                            }
                                        />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <CustomButton
                                            title="Cancel"
                                            backgroundColor="#dc2626"
                                            onPress={() =>
                                                handleCancel(item)
                                            }
                                        />
                                    </View>
                                </View>
                            ) : (
                                <View
                                    style={{
                                        marginTop: 18,
                                        alignItems: "center"
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#64748b",
                                            fontWeight: "600"
                                        }}
                                    >
                                        {
                                            item.status === "Completed"
                                                ? "✔ Appointment Completed"
                                                : item.status === "Cancelled"
                                                ? "❌ Appointment Cancelled"
                                                : "🏥 Patient Admitted"
                                        }
                                    </Text>
                                </View>
                            )
                        }
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#2563eb"]}
                        tintColor="#2563eb"
                    />
                }
                onViewableItemsChanged={onViewableItemChanged}
                viewabilityConfig={viewabilityConfig}
                ListHeaderComponent={
                    <View
                        style={{
                            height:10
                        }}
                    />
                }
                ListEmptyComponent={
                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 80
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 60
                            }}
                        >
                            📅
                        </Text>
                        <Text
                            style={{
                                marginTop: 12,
                                fontSize: 20,
                                fontWeight: "700",
                                color: "#334155"
                            }}
                        >
                            No Appointments
                        </Text>
                        <Text
                            style={{
                                marginTop: 8,
                                color: "#64748b",
                                textAlign: "center"
                            }}
                        >
                            Your upcoming appointments will appear here.
                        </Text>
                    </View>
                }
            />
        </View>
    );
}