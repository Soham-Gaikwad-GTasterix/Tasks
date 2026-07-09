import { View, ScrollView, ActivityIndicator, Text } from "react-native";

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
    <ScrollView
      contentContainerStyle={{
        padding: 20
      }}
    >
      <ScreenTitle
        title="Doctor Dashboard"
      />

      <Text
        style={{
            fontSize: 18,
            marginBottom: 20
        }}
      >
        Welcome Dr. {user?.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >

        <DashboardCard
          title="Today"
          count={stats.today}
          color="#3b82f6"
        />

        <DashboardCard
          title="Upcoming"
          count={stats.upcoming}
          color="#3b82f6"
        />

      </View>

      <Section
        title="Summary"
      >

        <DashboardCard
          title="Completed"
          count={stats.completed}
          color="#3b82f6"
          fullWidth
        />

        <DashboardCard
          title="Cancelled"
          count={stats.cancelled}
          color="#3b82f6"
          fullWidth
        />

      </Section>

      <Section
        title="Recent Appointments"
      >

        {
            appointments
                .slice(0, 5)
                .map(
                    appointment => (
                        <View
                            key={appointment.id}
                            style={{
                                borderWidth: 1,
                                borderRadius: 12,
                                padding: 12,
                                marginBottom: 10
                            }}
                        >
                            <Text>
                                Patient:
                                {" "}
                                {appointment.patient}
                            </Text>
                            <Text>
                                Date:
                                {" "}
                                {appointment.date}
                            </Text>
                            <Text>
                                Time:
                                {" "}
                                {appointment.time}
                            </Text>
                            <Text>
                                Status:
                                {" "}
                                {appointment.status}
                            </Text>
                        </View>
                    )
                )
        }

      </Section>

    </ScrollView>
  );
}