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
                            borderRadius: 24,
                            padding: 24,
                            marginBottom: 24,
                            elevation: 6
                        }}
                    >
                        <Text
                            style={{
                                color: "#dbeafe",
                                fontSize: 16
                            }}
                        >
                            Welcome Back
                        </Text>
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 28,
                                fontWeight: "700",
                                marginTop: 6
                            }}
                        >
                            {user?.name}
                        </Text>
                        <Text
                            style={{
                                color: "#dbeafe",
                                fontSize: 16
                            }}
                        >
                            Stay healthy! Your appointments are listed below.
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
                            title="Scheduled"
                            count={stats.scheduled}
                            color="#f59e0bb3"
                        />
                        <DashboardCard
                            title="Completed"
                            count={stats.completed}
                            color="#22c55eb3"
                        />
                    </View>

                    <View
                        style={{
                            marginBottom: 10
                        }}
                    >
                        <DashboardCard
                            title="Cancelled"
                            count={stats.cancelled}
                            color="#dc2626b3"
                            fullWidth
                        />
                    </View>
                    <Section
                        title="Upcoming Appointment"
                    >
                        {
                            nextAppointment ?
                            (
                                <View
                                    style={{
                                        backgroundColor: "#fff",
                                        borderRadius: 18,
                                        padding: 18,
                                        borderWidth: 1,
                                        borderColor: "#e2e8f0"
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: "700",
                                            color: "#0f172a"
                                        }}
                                    >
                                        Dr. {nextAppointment.doctor}
                                    </Text>
                                    <Text>
                                        📅 {nextAppointment.date}
                                    </Text>
                                    <Text>
                                        🕒 {nextAppointment.time}
                                    </Text>
                                    <Text>
                                        📌 {nextAppointment.status}
                                    </Text>
                                    <View
                                        style={{
                                            marginTop: 18
                                        }}
                                    >
                                        <CustomButton
                                            title="Cancel Appointment"
                                            onPress={handleCancelAppointment}
                                        />
                                    </View>
                                </View>
                            ) : (
                                <Text
                                    style={{
                                        color: "#64748b"
                                    }}
                                >
                                    No upcoming appointments.
                                </Text>
                            )
                        }
                    </Section>
                    <Section
                        title= "Recent Appointments"
                    >
                        {
                            appointments.length === 0 ? (
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: "#64748b",
                                        paddingVertical: 20
                                    }}
                                >
                                    No appointments booked yet.
                                </Text>
                            ):(
                            appointments
                                .sort(
                                    (a, b) => new Date(b.date) - new Date(a.date)
                                )
                                .slice(0,5)
                                .map(
                                    appointment => (
                                        <View
                                            key={appointment.id}
                                            style={{
                                                backgroundColor: "#fff",
                                                borderRadius: 16,
                                                padding: 16,
                                                marginBottom: 12,
                                                borderWidth: 1,
                                                borderColor: "#e2e8f0"
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontWeight: "700",
                                                    fontSize: 17
                                                }}
                                            >
                                                Dr. {appointment.doctor}
                                            </Text>
                                            <Text>
                                                📅 Date: {appointment.date}
                                            </Text>
                                            <Text>
                                                🕒 Time: {appointment.time}
                                            </Text>
                                            <View
                                                style={{
                                                    marginTop: 10,
                                                    alignSelf: "flex-start",
                                                    backgroundColor: appointment?.status === "Completed"
                                                        ? "#dcfce7"
                                                        : appointment?.status === "Cancelled"
                                                            ? "#fee2e2"
                                                            : "#fef3c7",
                                                    paddingHorizontal: 12,
                                                    paddingVertical: 6,
                                                    borderRadius: 20
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
                                        </View>
                                    )
                                )
                            )
                        }
                    </Section>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}