import { View, ScrollView, ActivityIndicator, Text, Alert, ImageBackground } from "react-native";

import { useState, useCallback } from "react";

import { useFocusEffect } from "expo-router";

import ScreenTitle from "@/components/ScreenTitle";

import DashboardCard from "@/components/DashboardCard";

import Section from "@/components/Section";

import { getAppointments, updateAppointment } from "@/services/appointmentService";

import { getUser } from "@/storage/authStorage";

import CustomButton from "@/components/CustomButton";

export default function PatientDashboard() {
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState({
        scheduled: 0,
        completed: 0,
        cancelled: 0
    });
    const [nextAppointment, setNextAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    useFocusEffect(
        useCallback(() => {
            loadDashboard();
        }, [])
    );
    async function loadDashboard() {
        try {
            setLoading(true);
            const currentUser = await getUser();
            setUser(currentUser);
            const allAppointments = await getAppointments();
            const myAppointments = allAppointments.filter(
                item => item.patientEmail === currentUser.email
            );
            setAppointments(myAppointments);
            const today = new Date()
                .toISOString()
                .split("T")[0];
            
            const upcomingAppointments = myAppointments.filter(
                item => item.date >= today && item.status === "Scheduled"
            );
            
            upcomingAppointments.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            setNextAppointment(
                upcomingAppointments[0] || null
            );
            setStats({
                scheduled: myAppointments.filter(
                    item => item.status === "Scheduled"
                ).length,
                completed: myAppointments.filter(
                    item => item.status === "Completed"
                ).length,
                cancelled: myAppointments.filter(
                    item => item.status === "Cancelled"
                ).length
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <ActivityIndicator
                    size= "large"
                />
            </View>
        );
    }

    async function handleCancelAppointment() {
        if (!nextAppointment) {
            return;
        }

        Alert.alert(
            "Cancel Appointment",
            "Are you sure you want to cancel this appointment?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await updateAppointment(
                                nextAppointment.id,
                                {
                                    status: "Cancelled"
                                }
                            );

                            Alert.alert(
                                "Success",
                                "Appointment cancelled successfully."
                            );

                            loadDashboard();
                        } catch (error) {
                            console.log(error);

                            Alert.alert(
                                "Error",
                                "Failed to cancel appointment."
                            );
                        }
                    }
                }
            ]
        );
    }

    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }}
            resizeMode="cover"
            style={{
                flex: 1
              }}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#ffffff99"
                }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 20,
                        paddingBottom: 40
                    }}
                >
                    <ScreenTitle
                        title= "Patient Dashboard"
                    />
                    <View
                        style={{
                            backgroundColor: "#2563eb",
                            borderRadius: 28,
                            padding: 24,
                            marginBottom: 24,
                            elevation: 6,
                            shadowColor: "#000",
                            shadowOpacity: 0.15,
                            shadowRadius: 10
                        }}
                    >
                        <Text
                            style={{
                                color: "#dbeafe",
                                fontSize: 16
                            }}
                        >
                            👋 Welcome
                        </Text>

                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 30,
                                fontWeight: "700",
                                marginTop: 6
                            }}
                        >
                            {user?.name}
                        </Text>

                        <Text
                            style={{
                                color: "#dbeafe",
                                fontSize: 15,
                                marginTop: 10
                            }}
                        >
                            {
                                stats.scheduled > 0
                                    ? `You have ${stats.scheduled} upcoming appointment${stats.scheduled > 1 ? "s" : ""}.`
                                    : "No upcoming appointments today."
                            }
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 10
                        }}
                    >
                        <DashboardCard
                            title="🟡 Scheduled"
                            count={stats.scheduled}
                            color="#f59e0bb3"
                        />

                        <DashboardCard
                            title="🟢 Completed"
                            count={stats.completed}
                            color="#22c55eb3"
                        />
                    </View>

                    <View
                        style={{
                            marginBottom: 22
                        }}
                    >
                        <DashboardCard
                            title="🔴 Cancelled"
                            count={stats.cancelled}
                            color="#dc2626b3"
                            fullWidth
                        />
                    </View>
                    <Section
                        title="Upcoming Appointment"
                    >
                        {
                            nextAppointment ? (
                                <View
                                    style={{
                                        backgroundColor: "#fff",
                                        borderRadius: 22,
                                        padding: 20,
                                        elevation: 5,
                                        shadowColor: "#000",
                                        shadowOpacity: 0.08,
                                        shadowRadius: 8,
                                        borderLeftWidth: 6,
                                        borderLeftColor: "#2563eb"
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#64748b",
                                            fontWeight: "600",
                                            marginBottom: 10
                                        }}
                                    >
                                        🩺 Next Consultation
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 22,
                                            fontWeight: "700",
                                            color: "#0f172a"
                                        }}
                                    >
                                        Dr. {nextAppointment.doctor}
                                    </Text>

                                    <Text
                                        style={{
                                            marginTop: 12,
                                            color: "#475569",
                                            fontSize: 15
                                        }}
                                    >
                                        📅 {nextAppointment.date}
                                    </Text>

                                    <Text
                                        style={{
                                            marginTop: 4,
                                            color: "#475569",
                                            fontSize: 15
                                        }}
                                    >
                                        🕒 {nextAppointment.time}
                                    </Text>

                                    <View
                                        style={{
                                            alignSelf: "flex-start",
                                            marginTop: 18,
                                            backgroundColor: "#fef3c7",
                                            paddingHorizontal: 14,
                                            paddingVertical: 8,
                                            borderRadius: 20
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: "700",
                                                color: "#a16207"
                                            }}
                                        >
                                            {nextAppointment.status}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            marginTop: 20
                                        }}
                                    >
                                        <CustomButton
                                            title="Cancel Appointment"
                                            backgroundColor="#dc2626"
                                            onPress={handleCancelAppointment}
                                        />
                                    </View>
                                </View>
                            ) : (
                                <View
                                    style={{
                                        backgroundColor: "#fff",
                                        borderRadius: 22,
                                        padding: 30,
                                        alignItems: "center"
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
                                        No Upcoming Appointments
                                    </Text>

                                    <Text
                                        style={{
                                            marginTop: 8,
                                            color: "#64748b",
                                            textAlign: "center"
                                        }}
                                    >
                                        Book an appointment to see it here.
                                    </Text>
                                </View>
                            )
                        }
                    </Section>
                    <Section
                        title="Recent Appointments"
                    >
                        {
                            appointments.length === 0 ? (
                                <View
                                    style={{
                                        backgroundColor: "#fff",
                                        borderRadius: 22,
                                        padding: 30,
                                        alignItems: "center"
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
                                        No Appointments Yet
                                    </Text>

                                    <Text
                                        style={{
                                            marginTop: 8,
                                            color: "#64748b",
                                            textAlign: "center"
                                        }}
                                    >
                                        Your appointment history will appear here.
                                    </Text>
                                </View>
                            ) : (
                                appointments
                                    .sort(
                                        (a, b) =>
                                            new Date(`${b.date} ${b.time}`) -
                                            new Date(`${a.date} ${a.time}`)
                                    )
                                    .slice(0, 5)
                                    .map(appointment => (
                                        <View
                                            key={appointment.id}
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
                                                    appointment.status === "Scheduled"
                                                        ? "#2563eb"
                                                        : appointment.status === "Completed"
                                                        ? "#22c55e"
                                                        : "#ef4444"
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 20,
                                                            fontWeight: "700",
                                                            color: "#0f172a"
                                                        }}
                                                    >
                                                        🩺 Dr. {appointment.doctor}
                                                    </Text>

                                                    <Text
                                                        style={{
                                                            marginTop: 10,
                                                            color: "#64748b"
                                                        }}
                                                    >
                                                        📅 {appointment.date}
                                                    </Text>

                                                    <Text
                                                        style={{
                                                            marginTop: 3,
                                                            color: "#64748b"
                                                        }}
                                                    >
                                                        🕒 {appointment.time}
                                                    </Text>
                                                </View>

                                                <View
                                                    style={{
                                                        backgroundColor:
                                                            appointment.status === "Scheduled"
                                                                ? "#dbeafe"
                                                                : appointment.status === "Completed"
                                                                ? "#dcfce7"
                                                                : "#fee2e2",
                                                        paddingHorizontal: 14,
                                                        paddingVertical: 8,
                                                        borderRadius: 20
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontWeight: "700",
                                                            color:
                                                                appointment.status === "Scheduled"
                                                                    ? "#2563eb"
                                                                    : appointment.status === "Completed"
                                                                    ? "#15803d"
                                                                    : "#dc2626"
                                                        }}
                                                    >
                                                        {appointment.status}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                            )
                        }
                    </Section>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}