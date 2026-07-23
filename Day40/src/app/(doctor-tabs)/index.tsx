import { View, ScrollView, ActivityIndicator, Text, ImageBackground } from "react-native";

import ScreenTitle from "../../components/ScreenTitle";

import DashboardCard from "../../components/DashboardCard";

import Section from "../../components/Section";

import { useFocusEffect } from "expo-router";

import { useState, useCallback } from "react";

import { getUser } from "@/storage/authStorage";

import { getAppointments } from "@/services/appointmentService";

export default function DoctorDashboard() {

  const [
    user,
    setUser
  ] = useState(null);

  const [
    appointments,
    setAppointments
  ] = useState([]);

  const [
    stats,
    setStats
  ] = useState({
    today: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0
  });

  const [
    loading,
    setLoading
  ] = useState(true);

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
        appointment => appointment?.doctorId === currentUser.doctorId
      );
      setAppointments(myAppointments);

      const today = new Date()
        .toISOString()
        .split("T")[0];

      setStats({
        today: myAppointments.filter(
            appointment => appointment.date === today
        ).length,
        upcoming: myAppointments.filter(
            appointment => appointment.status === "Scheduled"
        ).length,
        completed: myAppointments.filter(
            appointment => appointment.status === "Completed"
        ).length,
        cancelled: myAppointments.filter(
            appointment => appointment.status === "Cancelled"
        ).length
      });

    } catch (error) {
      console.log("Dashboard Error:", error);
    } finally {
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
          size="large"
        />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://plus.unsplash.com/premium_photo-1726862445541-5032bb3ec5f7?q=80&w=416&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            title="Doctor Dashboard"
          />

          <View
            style={{
              backgroundColor: "#2563eb",
              borderRadius: 24,
              padding: 24,
              marginBottom: 20,
              elevation: 6
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
                  Dr. {user?.name}
              </Text>

              <Text
                  style={{
                      color: "#dbeafe",
                      marginTop: 10,
                      fontSize: 15
                  }}
              >
                  {
                      stats.upcoming > 0
                          ? `You have ${stats.upcoming} scheduled appointment${stats.upcoming > 1 ? "s" : ""}.`
                          : "No scheduled appointments."
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
              title="Today's Appointments"
              count={stats.today}
              color="#3b82f6b3"
            />

            <DashboardCard
              title="Scheduled"
              count={stats.upcoming}
              color="#f59e0bb3"
            />

          </View>

          <Section
            title="Summary"
          >

            <DashboardCard
              title="Completed Visits"
              count={stats.completed}
              color="#22c55eb3"
              fullWidth
            />

            <DashboardCard
              title="Cancelled Visits"
              count={stats.cancelled}
              color="#dc2626b3"
              marginTop={20}
              marginBottom={10}
              fullWidth
            />

          </Section>

          <Section
            title="Recent Appointments"
          >

            {
              appointments.length === 0 ? (
                <View
                  style={{
                    alignItems: "center",
                    paddingVertical: 40
                  }}
                >
                  <Text
                    style={{
                      fontSize: 50
                    }}
                  >
                    📅
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#64748b"
                    }}
                  >
                    No Appointments Today
                  </Text>
                </View>
              ) : (
                appointments
                  .sort((a, b) => {
                      
                      if (a.status === "Scheduled" && b.status !== "Scheduled") {
                        return -1;
                      }

                      if (a.status !== "Scheduled" && b.status === "Scheduled") {
                        return 1;
                      }

                      const dateCompare =
                        new Date(`${b.date} ${b.time}`) -
                        new Date(`${a.date} ${a.time}`);

                      if (dateCompare !== 0) {
                        return dateCompare;
                      }

                      return (b.createdAt || "").localeCompare(a.createdAt || "");
                  })
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
                                            : appointment.status === "Cancelled"
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
                                            👤 {appointment.patient}
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
                                                marginTop: 4,
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
                                                    : appointment.status === "Cancelled"
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
                                                    appointment.status === "Scheduled"
                                                        ? "#2563eb"
                                                        : appointment.status === "Completed"
                                                        ? "#15803d"
                                                        : appointment.status === "Cancelled"
                                                        ? "#dc2626"
                                                        : "#6d28d9"
                                            }}
                                        >
                                            {appointment.status}
                                        </Text>
                                    </View>
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