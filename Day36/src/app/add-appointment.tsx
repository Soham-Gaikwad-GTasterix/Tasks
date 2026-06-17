import { View, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import NavigationHeader from "../components/NavigationHeader";

import DynamicForm from "../components/DynamicForm";

import { router } from "expo-router";

import { createAppointment } from "../services/appointmentService";

import { nanoid } from "nanoid";

import { scheduleAppointmentTimeNotifications, scheduleReminderNotification } from "@/services/notificationService";

export default function AddAppointment() {

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
                                marginTop: 30
                            }}
                        >

                            <NavigationHeader
                                title="Add Appointment"
                                showBack
                            />
                            <View
                                style={{
                                    padding: 20
                                }}
                            >
                                <DynamicForm
                                    buttonText="Add Appointment"
                                    fields={[
                                        {
                                            name: "patient",
                                            placeholder: "Patient Name"
                                        },
                                        {
                                            name: "doctor",
                                            placeholder: "Doctor Name"
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
                                        },
                                        {
                                            name: "status",
                                            placeholder: "Status",
                                            type: "select",
                                            options: [
                                                "Scheduled",
                                                "Completed",
                                                "Cancelled"
                                            ]
                                        }
                                    ]}
                                    onSubmit={async (data) => {

                                        try {
                                            await createAppointment({
                                                id: `APT-${nanoid(8)}`,
                                                ...data
                                            });

                                            await scheduleAppointmentTimeNotifications(data);

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
                                                            await scheduleReminderNotification(data);
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
                                        }
                                    }}
                                />
                            </View>
                        </View>
                </ScrollView>
        </KeyboardAvoidingView>
    );
}