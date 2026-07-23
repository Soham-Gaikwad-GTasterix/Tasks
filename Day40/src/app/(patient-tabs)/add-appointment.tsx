import { Text, View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import NavigationHeader from "@/components/NavigationHeader";

import DynamicForm from "@/components/DynamicForm";

import { router } from "expo-router";

import { createAppointment, getAppointments } from "@/services/appointmentService";

import { nanoid } from "nanoid";

import { getDoctors } from "@/services/doctorService";

import { getUser } from "@/storage/authStorage";

import { useState, useEffect } from "react";

import { scheduleAppointmentTimeNotifications, scheduleReminderNotification } from "@/services/notificationService";

import { getPatients } from "@/services/patientService";

import {
    showSuccess,
    showError
} from "@/services/toastService";

import ConfirmationDialog from "@/components/ConfirmationDialog";

export default function AddAppointment() {

    const [ doctors, setDoctors ] = useState([]);

    const [dialogVisible, setDialogVisible] = useState(false);

    const [appointmentReminder, setAppointmentReminder] = useState(null);

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

        const patients = await getPatients();

        const selectedDateTime = new Date(
            `${data.date}T${data.time}`
        );

        const now = new Date();

        const diffMinutes =
            (selectedDateTime - now) /
            (1000 * 60);

        if (diffMinutes < 30) {

            showError(
                "Please select a future date and time."
            );

            return false;
        }

        const existingScheduledAppointment = appointments.find(
            appointment =>
                appointment.patientUserId === user.patientUserId &&
                appointment.status === "Scheduled"
        );

        if (existingScheduledAppointment) {

            showError(
                "You already have a scheduled appointment."
            );

            return false;
        }

        const patientHistory = patients
            .filter(
                patient =>
                    patient.patientUserId === user.patientUserId
            )
            .sort(
                (a, b) =>
                    new Date(b.createdAt || b.admissionDate) -
                    new Date(a.createdAt || a.admissionDate)
            );

        const latestPatient = patientHistory[0];

        if (
            latestPatient &&
            latestPatient.status === "Admitted"
        ) {

            showError(
                "You are currently admitted in the hospital. Please get discharged before booking another appointment."
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

            showError(
                "The selected doctor already has an appointment at this time."
            );

            return false;
        }

        return true;
    }

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                backgroundColor: "#f4f8fc"
            }}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : "height"
            }
        >
            <NavigationHeader
                title="Book Appointment"
                showBack
            />

            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 40
                }}
            >
                <View
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 24,
                        padding: 24,
                        elevation: 5,
                        shadowColor: "#000",
                        shadowOpacity: 0.08,
                        shadowRadius: 10,
                        shadowOffset: {
                            width: 0,
                            height: 4
                        }
                    }}
                >
                    <View
                        style={{
                            alignItems: "center",
                            marginBottom: 20
                        }}
                    >
                        <View
                            style={{
                                width: 72,
                                height: 72,
                                borderRadius: 36,
                                backgroundColor: "#dbeafe",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <View
                                style={{
                                    transform: [
                                        {
                                            scale: 1.5
                                        }
                                    ]
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 28
                                    }}
                                >
                                    📅
                                </Text>
                            </View>
                        </View>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: "700",
                                color: "#0f172a",
                                marginTop: 18
                            }}
                        >
                            Book Appointment
                        </Text>

                        <Text
                            style={{
                                textAlign: "center",
                                color: "#64748b",
                                marginTop: 8,
                                fontSize: 15,
                                lineHeight: 22
                            }}
                        >
                            Select your preferred doctor, date and
                            appointment time.
                        </Text>
                    </View>

                    <DynamicForm
                        buttonText="Book Appointment"
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

                                const canBook =
                                    await handleBookAppointment(data);

                                if (!canBook) {
                                    return;
                                }

                                const selectedDoctor =
                                    doctors.find(
                                        doctor =>
                                            doctor.id === data.doctorId
                                    );

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

                                await createAppointment(
                                    appointmentData
                                );

                                await scheduleAppointmentTimeNotifications({
                                    patient: currentUser.name,
                                    doctor: selectedDoctor.name,
                                    date: data.date,
                                    time: data.time
                                });

                                setAppointmentReminder({
                                    ...data,
                                    doctor: selectedDoctor.name
                                });

                                setDialogVisible(true);

                            } catch (error) {

                                console.log(error);

                                showError(
                                    error?.response?.data?.message ||
                                    "Unable to book appointment."
                                );
                            }
                        }}
                    />
                </View>
            </ScrollView>

            <ConfirmationDialog
                visible={dialogVisible}
                title="Appointment Booked"
                message="Would you like a reminder 10 minutes before your appointment?"
                confirmText="Yes"
                confirmColor="#2563eb"
                onCancel={() => {
                    setDialogVisible(false);
                    router.back();
                }}
                onConfirm={async () => {
                    await scheduleReminderNotification(
                        appointmentReminder
                    );

                    setDialogVisible(false);

                    router.back();
                }}
            />

        </KeyboardAvoidingView>
    );
}