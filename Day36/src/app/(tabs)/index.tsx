import { View, ScrollView, ActivityIndicator } from "react-native";

import ScreenTitle from "../../components/ScreenTitle";

import DashboardCard from "../../components/DashboardCard";

import CustomButton from "../../components/CustomButton";

import Section from "../../components/Section";

import { router, useFocusEffect } from "expo-router";

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
    <ScrollView
      contentContainerStyle={{
        padding: 20
      }}
    >
      <ScreenTitle
        title="Dashboard"
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >

        <DashboardCard
          title="Patients"
          count={patientCount}
          color="#3b82f6"
        />

        <DashboardCard
          title="Doctors"
          count={doctorCount}
          color="#3b82f6"
        />

      </View>

      <Section
        title="Summary"
      >

        <DashboardCard
          title="Appointments"
          count={appointmentCount}
          color="#3b82f6"
          fullWidth
        />

        <DashboardCard
          title="Revenue"
          count="₹ 50,000"
          color="#3b82f6"
          fullWidth
        />

      </Section>

      <Section
        title="Manage"
      >

        <CustomButton
          title="Patients"
          onPress={() =>
            router.push("/patients")
          }
        />

        <CustomButton
          title="Doctors"
          onPress={() =>
            router.push("/doctors")
          }
        />

        <CustomButton
          title="Appointments"
          onPress={() =>
            router.push("/appointments")
          }
        />

      </Section>

    </ScrollView>
  );
}