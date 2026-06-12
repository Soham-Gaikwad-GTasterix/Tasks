import { View, TextInput } from "react-native";

import { useState } from "react";

import CustomButton from "./CustomButton";

function AppointmentForm({
    onSubmit
}) {
    const [
        patientName,
        setPatientName
    ] = useState("");

    const [
        doctorName,
        setDoctorName
    ] = useState("");

    const [
        appointmentDate,
        setAppointmentDate
    ] = useState("");

    const [
        appointmentTime,
        setAppointmentTime
    ] = useState("");

    return(
        <View
            style={{
                padding: 20,
                borderWidth: 1,
                borderRadius: 16,
                margin: 20
            }}
        >
            <TextInput
                placeholder="Patient Name"
                value={patientName}
                onChangeText={
                    setPatientName
                }
                style={{
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 12
                }}
            />
            <TextInput
                placeholder="Doctor Name"
                value={doctorName}
                onChangeText={
                    setDoctorName
                }
                style={{
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 12
                }}
            />
            <TextInput
                placeholder="Date"
                value={appointmentDate}
                onChangeText={
                    setAppointmentDate
                }
                style={{
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 12
                }}
            />
            <TextInput
                placeholder="Time"
                value={appointmentTime}
                onChangeText={
                    setAppointmentTime
                }
                style={{
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 12
                }}
            />
            <CustomButton
                title="Create Appointment"
                onPress={() =>
                    onSubmit({
                        patientName,
                        doctorName,
                        appointmentDate,
                        appointmentTime
                    })
                }
            />
        </View>
    );
}

export default AppointmentForm;