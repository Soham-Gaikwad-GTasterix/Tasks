import { View, ScrollView, ActivityIndicator, Text, ImageBackground, Pressable } from "react-native";

import ScreenTitle from "../../components/ScreenTitle";

import DashboardCard from "../../components/DashboardCard";

import { getUsers } from "@/services/authService";

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

  const [activities, setActivities] = useState([]);

  const [
    userCount,
    setUserCount
] = useState(0);

  async function loadDashboard() {
    try {
      setLoading(true);

      const [
          patients,
          doctors,
          appointments,
          users
      ] = await Promise.all([
          getPatients(),
          getDoctors(),
          getAppointments(),
          getUsers()
      ]);

      const activity = [];

      patients.forEach(patient => {
          if (patient.createdAt) {
              activity.push({
                  type: "patient",
                  title: `${patient.name} admitted`,
                  subtitle: `Room ${patient.roomNo}`,
                  time: patient.createdAt
              });
          }

          if (patient.dischargeDate) {
              activity.push({
                  type: "discharge",
                  title: `${patient.name} discharged`,
                  subtitle: patient.dischargeDate,
                  time: patient.updatedAt || patient.dischargeDate
              });
          }
      });

      doctors.forEach(doctor => {
          if (doctor.createdAt) {
              activity.push({
                  type: "doctor",
                  title: `Dr. ${doctor.name} added`,
                  subtitle: doctor.specialization,
                  time: doctor.createdAt
              });
          }
      });

      appointments.forEach(appointment => {
          if (appointment.status === "Cancelled") {
              activity.push({
                  type: "cancelled",
                  title: `${appointment.patient}'s appointment cancelled`,
                  subtitle: appointment.date,
                  time: appointment.updatedAt || appointment.date
              });
          }
      });

      activity.sort(
          (a, b) =>
              new Date(b.time) - new Date(a.time)
      );

      setActivities(
          activity.slice(0, 5)
      );
      setPatientCount(patients.length);
      setDoctorCount(doctors.length);
      setAppointmentCount(appointments.length);
      setUserCount(
          users.filter(
              user => user.role === "patient"
          ).length
      );
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
        uri: "https://plus.unsplash.com/premium_photo-1726485333647-e8048192b5b5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                    borderRadius: 28,
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
                    Hospital Admin
                </Text>

                <Text
                    style={{
                        color: "#dbeafe",
                        marginTop: 10,
                        fontSize: 15
                    }}
                >
                    Manage doctors, patients and appointments.
                </Text>
            </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20
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
                title="👥 Users"
                count={userCount}
                color="#8b5cf6b3"
                marginTop={20}
                marginBottom={10}
                fullWidth
            />

          </Section>

          <Section
            title="Quick Actions"
          >

            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    marginTop: 10
                }}
            >

                <Pressable
                    onPress={() => router.push("/patients")}
                    style={{
                        width: "48%",
                        backgroundColor: "#ffffff",
                        borderRadius: 22,
                        paddingVertical: 24,
                        alignItems: "center",
                        marginBottom: 16,
                        elevation: 4
                    }}
                >
                    <Text
                        style={{
                            fontSize: 42
                        }}
                    >
                        👤
                    </Text>

                    <Text
                        style={{
                            marginTop: 12,
                            fontWeight: "700",
                            fontSize: 17,
                            color: "#0f172a"
                        }}
                    >
                        Patients
                    </Text>

                    <Text
                        style={{
                            marginTop: 4,
                            color: "#64748b"
                        }}
                    >
                        View & Manage
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => router.push("/doctors")}
                    style={{
                        width: "48%",
                        backgroundColor: "#ffffff",
                        borderRadius: 22,
                        paddingVertical: 24,
                        alignItems: "center",
                        marginBottom: 16,
                        elevation: 4
                    }}
                >
                    <Text
                        style={{
                            fontSize: 42
                        }}
                    >
                        🩺
                    </Text>

                    <Text
                        style={{
                            marginTop: 12,
                            fontWeight: "700",
                            fontSize: 17,
                            color: "#0f172a"
                        }}
                    >
                        Doctors
                    </Text>

                    <Text
                        style={{
                            marginTop: 4,
                            color: "#64748b"
                        }}
                    >
                        View & Manage
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => router.push("/appointments")}
                    style={{
                        width: "48%",
                        backgroundColor: "#ffffff",
                        borderRadius: 22,
                        paddingVertical: 24,
                        alignItems: "center",
                        elevation: 4
                    }}
                >
                    <Text
                        style={{
                            fontSize: 42
                        }}
                    >
                        📅
                    </Text>

                    <Text
                        style={{
                            marginTop: 12,
                            fontWeight: "700",
                            fontSize: 17,
                            color: "#0f172a"
                        }}
                    >
                        Appointments
                    </Text>

                    <Text
                        style={{
                            marginTop: 4,
                            color: "#64748b"
                        }}
                    >
                        View Schedule
                    </Text>
                </Pressable>

                {/* <Pressable
                    onPress={() => router.push("/holidays")}
                    style={{
                        width: "48%",
                        backgroundColor: "#ffffff",
                        borderRadius: 22,
                        paddingVertical: 24,
                        alignItems: "center",
                        elevation: 4
                    }}
                >
                    <Text
                        style={{
                            fontSize: 42
                        }}
                    >
                        🏥
                    </Text>

                    <Text
                        style={{
                            marginTop: 12,
                            fontWeight: "700",
                            fontSize: 17,
                            color: "#0f172a"
                        }}
                    >
                        Hospital
                    </Text>

                    <Text
                        style={{
                            marginTop: 4,
                            color: "#64748b"
                        }}
                    >
                        Administration
                    </Text>
                </Pressable> */}

            </View>

          </Section>

          <Section
              title="Recent Activity"
          >
              {
                  activities.length === 0 ? (
                      <Text
                          style={{
                              color: "#64748b",
                              textAlign: "center",
                              paddingVertical: 20
                          }}
                      >
                          No recent activity.
                      </Text>
                  ) : (
                      activities.map((item, index) => (
                          <View
                              key={index}
                              style={{
                                  backgroundColor: "#fff",
                                  borderRadius: 18,
                                  padding: 16,
                                  marginBottom: 12,
                                  flexDirection: "row",
                                  alignItems: "center",
                                  elevation: 3
                              }}
                          >
                              <Text
                                  style={{
                                      fontSize: 28,
                                      marginRight: 14
                                  }}
                              >
                                  {
                                      item.type === "patient"
                                          ? "🏥"
                                          : item.type === "doctor"
                                          ? "🩺"
                                          : item.type === "cancelled"
                                          ? "❌"
                                          : "✔"
                                  }
                              </Text>

                              <View
                                  style={{
                                      flex: 1
                                  }}
                              >
                                  <Text
                                      style={{
                                          fontWeight: "700",
                                          fontSize: 16,
                                          color: "#0f172a"
                                      }}
                                  >
                                      {item.title}
                                  </Text>

                                  <Text
                                      style={{
                                          color: "#64748b",
                                          marginTop: 3
                                      }}
                                  >
                                      {item.subtitle}
                                  </Text>
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