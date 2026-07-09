import { View, ScrollView, ActivityIndicator, Text, ImageBackground } from "react-native";

import ScreenTitle from "../../components/ScreenTitle";

import DashboardCard from "../../components/DashboardCard";

import CustomButton from "../../components/CustomButton";

import Section from "../../components/Section";

import { Color, router, useFocusEffect } from "expo-router";

import { useState, useCallback } from "react";

import { getPatients } from "@/services/patientService";

import { getDoctors } from "@/services/doctorService";

import { getAppointments } from "@/services/appointmentService";

export default function HomeScreen() {

  const [
    patientCount,
    setPatientCount
  ] = useState(0);

  const [
    doctorCount,
    setDoctorCount
  ] = useState(0);

  const [
    appointmentCount,
    setAppointmentCount
  ] = useState(0);

  const [
    loading,
    setLoading
  ] = useState(true);

  async function loadDashboard() {
    try {
      setLoading(true);

      const [
        patients,
        doctors,
        appointments
      ] = await Promise.all([
        getPatients(),
        getDoctors(),
        getAppointments()
      ]);
      setPatientCount(patients.length);
      setDoctorCount(doctors.length);
      setAppointmentCount(appointments.length);
    } catch (error) {
      console.log("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [])
  );

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
            title="Admin Dashboard"
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
            <ActivityIndicator
              style={{
                display: "none"
              }}
            />
            <Text
              style={{
                color: "#dbeafe",
                fontSize: 16
              }}
            >
              Welcome
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 28,
                fontWeight: "700",
                marginTop: 6
              }}
            >
              Hospital Admin
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >

            <DashboardCard
              title="🙍🏽 Patients"
              count={patientCount}
              color="#22c55eb3"
            />

            <DashboardCard
              title="🧑🏽‍⚕️ Doctors"
              count={doctorCount}
              color="#3b82f6b3"
            />

          </View>

          <Section
            title="Summary"
          >

            <DashboardCard
              title="📅 Appointments"
              count={appointmentCount}
              color="#f59e0bb3"
              fullWidth
            />

            <DashboardCard
              title="💰 Revenue"
              count="₹ 50,000"
              color="#fb923cb3"
              fullWidth
            />

          </Section>

          <Section
            title="Quick Actions"
          >

            <CustomButton
              title="🙍🏽 Patients"
              onPress={() =>
                router.push("/patients")
              }
            />

            <CustomButton
              title="🧑🏽‍⚕️ Doctors"
              onPress={() =>
                router.push("/doctors")
              }
            />

            <CustomButton
              title="📅 Appointments"
              onPress={() =>
                router.push("/appointments")
              }
            />

          </Section>

        </ScrollView>
      </View>
    </ImageBackground>
  );
}