import { View, Alert } from "react-native";

import NavigationHeader from "../../components/NavigationHeader";

import AppointmentForm from "../../components/AppointmentForm";

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
            />
            <AppointmentForm
                onSubmit={
                    handleSubmit
                }
            />
        </View>
    );
}