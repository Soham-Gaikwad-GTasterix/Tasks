import { View } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import NavigationHeader from "@/components/NavigationHeader";

import DynamicForm from "@/components/DynamicForm";

import { updatePatient } from "@/services/patientService";

import { updateDoctor } from "@/services/doctorService";

import { updateAppointment } from "@/services/appointmentService";

export default function EditDetails() {
    const params = useLocalSearchParams();

    const data = JSON.parse(params.data);

    function getFields() {
        switch (params.type) {
            case "patient":
                return[
                    {
                        name: "name",
                        placeholder: "Patient Name"
                    },
                    {
                        name: "email",
                        placeholder: "Email",
                        keyboardType: "email-address",
                        maxLength: 50
                    },
                    {
                        name: "age",
                        placeholder: "Age",
                        keyboardType: "numeric"
                    },
                    {
                        name: "gender",
                        placeholder: "Gender",
                        type: "select",
                        options: [
                            "Male",
                            "Female",
                            "Other"
                        ]
                    },
                    {
                        name: "disease",
                        placeholder: "Disease"
                    },
                    {
                        name: "date",
                        placeholder: "Admission Date",
                        type: "date"
                    },
                    {
                        name: "phoneNo",
                        placeholder: "Phone No.",
                        keyboardType: "numeric",
                        maxLength: 10
                    },
                    {
                        name: "bloodGroup",
                        placeholder: "Blood Group",
                        type: "select",
                        options: [
                            "A+",
                            "A-",
                            "B+",
                            "B-",
                            "AB+",
                            "AB-",
                            "O+",
                            "O-",
                            "unknown"
                        ]
                    },
                    {
                        name: "roomNo",
                        placeholder: "Room No.",
                        keyboardType: "numeric"
                    }
                ];
            case "doctor":
                return [
                    {
                        name: "name",
                        placeholder: "Doctor Name"
                    },
                    {
                        name: "email",
                        placeholder: "Email",
                        keyboardType: "email-address",
                        maxLength: 50
                    },
                    {
                        name: "specialization",
                        placeholder: "Specialization"
                    },
                    {
                        name: "experience",
                        placeholder: "Experience",
                        keyboardType: "numeric",
                        maxLength: 2
                    },
                    {
                        name: "department",
                        placeholder: "Department"
                    },
                    {
                        name: "qualification",
                        placeholder: "Qualification"
                    },
                    {
                        name: "phoneNo",
                        placeholder: "Phone No.",
                        keyboardType: "numeric",
                        maxLength: 10
                    }
                ];
            default:
                return [
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
                        placeholder: "Date",
                        type: "date"
                    },
                    {
                        name: "time",
                        placeholder: "Time",
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
                ];
        }
    }

    async function handleSubmit(values) {
        if (
            params.type === "patient"
        ) {
            await updatePatient(
                data.id,
                values
            );
        } else if (
            params.type === "doctor"
        ) {
            await updateDoctor(
                data.id,
                values
            );
        } else {
            await updateAppointment(
                data.id,
                values
            );
        }
        alert("Updated");
        router.back();
    }

    return (
        <View
            style={{
                flex: 1,
                marginTop: 30
            }}
        >
            <NavigationHeader
                title={`Edit ${params.type}`}
                showBack
            />
            <View
                style={{
                    padding: 20
                }}
            >
                <DynamicForm
                    fields={getFields()}
                    initialValues={data}
                    buttonText="Update"
                    onSubmit={handleSubmit}
                />
            </View>
        </View>
    );
}