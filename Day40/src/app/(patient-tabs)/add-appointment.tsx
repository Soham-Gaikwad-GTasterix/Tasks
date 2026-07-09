import { View, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import NavigationHeader from "@/components/NavigationHeader";

import DynamicForm from "@/components/DynamicForm";

import { router } from "expo-router";

import { createAppointment, getAppointments } from "@/services/appointmentService";

import { nanoid } from "nanoid";

import { getDoctors } from "@/services/doctorService";

import { getUser } from "@/storage/authStorage";

import { useState, useEffect } from "react";

import { scheduleAppointmentTimeNotifications, scheduleReminderNotification } from "@/services/notificationService";

export default function AddAppointment() {

    const [ doctors, setDoctors ] = useState([]);

    useEffect(() => {
        loadDoctors();
    }, []);

    async function loadDoctors() {
        try {
            const data = await getDoctors();
            setDoctors(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleBookAppointment(data) {
        const user = await getUser();
        const appointments = await getAppointments();

        const selectedDateTime = new Date(
            `${data.date}T${data.time}`
        );

        const now = new Date();

        if (selectedDateTime <= now) {
            Alert.alert(
                "Invalid Appointment",
                "Please select a future date and time."
            );

            return false;
        }

        const existingAppointment = appointments.find(
            appointment =>
                appointment.patientUserId === user.patientId &&
                appointment.status === "Scheduled"
        );

        if (existingAppointment) {
            Alert.alert(
                "Appointment Already Exists",
                "You already have a scheduled appointment."
            );
            return false;
    }

    const doctorBusy = appointments.find(
        appointment =>
            appointment.doctorId === data.doctorId &&
            appointment.date === data.date &&
            appointment.time === data.time &&
            appointment.status === "Scheduled"
    );

    if (doctorBusy) {
        Alert.alert(
            "Slot Unavailable",
            "The selected doctor already has an appointment at this time."
        );
        return false;
    }

    return true;
}

    return (
        <KeyboardAvoidingView
                    style={{
                        flex:1
                    }}
                    behavior={
                        Platform.OS === "ios"
                            ? "padding"
                            : "height"   
                    }
                >
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{
                            paddingBottom: 50
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "#f4f8fc"
                            }}
                        >

                            <NavigationHeader
                                title="Add Appointment"
                                showBack
                            />
                            <View
                                style={{
                                    padding: 20,
                                    backgroundColor: "#fff"
                                }}
                            >
                                <DynamicForm
                                    buttonText="Add Appointment"
                                    fields={[
                                        {
                                            name: "doctorId",
                                            placeholder: "Select Doctor",
                                            type: "doctor-select",
                                            options: doctors
                                        },
                                        {
                                            name: "date",
                                            placeholder: "Appointment Date",
                                            type: "date"
                                        },
                                        {
                                            name: "time",
                                            placeholder: "Appointment Time",
                                            type: "time"
                                        }
                                    ]}
                                    onSubmit={async (data) => {

                                        try {

                                            const currentUser = await getUser();

                                            console.log("CURRENT USER =", currentUser);
                                            
                                            const canBook = await handleBookAppointment(data);

                                            if (!canBook) {
                                                return;
                                            }
                                            
                                            const selectedDoctor = doctors.find(
                                                doctor => doctor.id === data.doctorId
                                            );

                                            console.log(currentUser);

                                            const appointmentData = {
                                                id: `APT-${nanoid(8)}`,
                                                patientUserId: currentUser.patientUserId,
                                                patient: currentUser.name,
                                                patientEmail: currentUser.email,
                                                age: currentUser.age,
                                                gender: currentUser.gender,
                                                phoneNo: currentUser.phoneNo,
                                                bloodGroup: currentUser.bloodGroup,
                                                photo: currentUser.photo,
                                                doctor: selectedDoctor.name,
                                                doctorId: selectedDoctor.id,
                                                date: data.date,
                                                time: data.time,
                                                status: "Scheduled"
                                            };

                                            console.log("SENDING =", appointmentData);

                                            await createAppointment(appointmentData);

                                            await scheduleAppointmentTimeNotifications({
                                                patient: currentUser.name,
                                                doctor: selectedDoctor?.name,
                                                date: data.date,
                                                time: data.time
                                            });

                                            Alert.alert(
                                                "Appointment Added", "Would you like a reminder 10 minutes before?",
                                                [
                                                    {
                                                        text: "No",
                                                        onPress: () => {
                                                            router.back();
                                                        }
                                                    },
                                                    {
                                                        text: "Yes",
                                                        onPress: async () => {
                                                            await scheduleReminderNotification({
                                                                ...data,
                                                                doctor: selectedDoctor?.name
                                                            });
                                                            router.back();
                                                        }
                                                    }
                                                ]
                                            );
                                        } catch (
                                            error
                                        ) {
                                            console.log(error);

                                            alert("Failed to Add Appointment");

                                            Alert.alert(
                                                "Error",
                                                JSON.stringify(error.response?.data || error.message)
                                            );
                                        }
                                    }}
                                />
                            </View>
                        </View>
                </ScrollView>
        </KeyboardAvoidingView>
    );
}