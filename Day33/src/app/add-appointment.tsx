import { View, Alert } from "react-native";

import NavigationHeader from "../components/NavigationHeader";

import DynamicForm from "../components/DynamicForm";

export default function AddAppointment() {
    
    function handleSubmit(
        appointment
    ) {
        Alert.alert(
            "Appointent Created",
            JSON.stringify(
                appointment,
                null,
                2
            )
        );
    }

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
                    buttonText="Add Patient"
                    fields={[
                        {
                            name: "name",
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
                    onSubmit={(data) => 
                        console.log(data)
                    }
                />
            </View>
        </View>
    );
}