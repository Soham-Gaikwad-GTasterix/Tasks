import { View, Alert } from "react-native";

import NavigationHeader from "../components/NavigationHeader";

import DynamicForm from "../components/DynamicForm";

import { router } from "expo-router";

import { createAppointment } from "../services/appointmentService";

import { nanoid } from "nanoid";

export default function AddAppointment() {

    return (
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
                            placeholder: "Date"
                        },
                        {
                            name: "time",
                            placeholder: "Time"
                        },
                        {
                            name: "status",
                            placeholder: "Status"
                        }
                    ]}
                    onSubmit={async (data) => {

                        try {
                            await createAppointment({
                                id: `APT-${nanoid(8)}`,
                                ...data
                            });

                            alert( "Appointment Added" );

                            router.back();
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
    );
}