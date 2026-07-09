import { View, Text, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert } from "react-native";

import { useState } from "react";

import { router, useLocalSearchParams } from "expo-router";

import NavigationHeader from "@/components/NavigationHeader";

import DynamicForm from "@/components/DynamicForm";

import CustomButton from "@/components/CustomButton";

import { updatePatient } from "@/services/patientService";

import { updateDoctor } from "@/services/doctorService";

export default function EditDetails() {
    const params = useLocalSearchParams();

    const data = JSON.parse(params.data);

    const [disease, setDisease] = useState(data.disease);

    const [roomNo, setRoomNo] = useState(data.roomNo);

    function getFields() {
        switch (params.type) {
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
                    },
                    {
                        name: "photo",
                        placeholder: "Photo",
                        type: "image"
                    }
                ];
        }
    }

    async function handleSubmit(values) {
        if (params.type === "patient") {
            await updatePatient(
                data.id,
                {
                    ...data,
                    disease:
                        params.role === "doctor"
                            ? disease
                            : data.disease,

                    roomNo:
                        params.role === "admin"
                            ? roomNo
                            : data.roomNo
                }
            );
        } else if (params.type === "doctor") {
            await updateDoctor(
                data.id,
                values
            );
        } else {
            return;
        }

        alert("Updated");
        router.back();
    }

    return (
        <KeyboardAvoidingView
            style={{
                flex:1,
                backgroundColor: "#f4f8fc"
            }}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : "height"   
            }
        >
            <View
                style={{
                    paddingBottom: 40,
                    flex: 1
                }}
            >
                <NavigationHeader
                    title={
                        params.type === "patient"
                            ? "Update Patient Details"
                            : "Edit Doctor Details"
                    }
                    showBack
                />
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 20
                    }}
                    style={{
                        margin: 20,
                        backgroundColor: "#fff",
                        borderRadius: 28,
                        elevation: 6,
                        shadowColor: "#000",
                        shadowOpacity: 0.08,
                        shadowRadius: 8,
                        shadowOffset: {
                            width: 0,
                            height: 4
                        }
                    }}
                >
                    {
                        params.type === "patient" ? (
                            <>
                                <Image
                                    source={{
                                        uri: data.photo
                                    }}
                                    style={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 75,
                                        borderWidth: 4,
                                        alignSelf: "center",
                                        marginBottom: 20,
                                        borderColor: "#2563eb",
                                        backgroundColor: "#e0f2fe"
                                    }}
                                />

                                <Text
                                    style={{
                                        fontSize: 28,
                                        fontWeight: "700",
                                        textAlign: "center",
                                        color: "#0f172a",
                                        marginBottom: 24
                                    }}
                                >
                                    {data.name}
                                </Text>

                                {[
                                    ["Patient ID", data.id],
                                    ["Email", data.email],
                                    ["Age", data.age],
                                    ["Gender", data.gender],
                                    ["Admission Date", data.admissionDate],
                                    ["Phone No.", data.phoneNo],
                                    ["Blood Group", data.bloodGroup]
                                ].map(([label, value]) => (
                                    <View
                                        key={label}
                                        style={{
                                            marginBottom: 18
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "#64748b",
                                                fontSize: 14,
                                                marginBottom: 6
                                            }}
                                        >
                                            {label}
                                        </Text>

                                        <TextInput
                                            value={String(value ?? "")}
                                            editable={false}
                                            style={{
                                                backgroundColor: "#f8fafc",
                                                borderWidth: 1,
                                                borderColor: "#e2e8f0",
                                                borderRadius: 12,
                                                padding: 14,
                                                color: "#0f172a"
                                            }}
                                        />
                                    </View>
                                ))}

                                <View
                                    style={{
                                        marginBottom: 18
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#64748b",
                                            fontSize: 14,
                                            marginBottom: 6
                                        }}
                                    >
                                        Room No.
                                    </Text>

                                    <TextInput
                                        value={roomNo}
                                        editable={params.role === "admin"}
                                        onChangeText={setRoomNo}
                                        style={{
                                            backgroundColor:
                                                params.role === "admin"
                                                    ? "#fff"
                                                    : "#f8fafc",
                                            borderWidth: 1,
                                            borderColor: "#2563eb",
                                            borderRadius: 12,
                                            padding: 14,
                                            color: "#0f172a"
                                        }}
                                    />
                                </View>

                                <View
                                    style={{
                                        marginBottom: 24
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#64748b",
                                            fontSize: 14,
                                            marginBottom: 6
                                        }}
                                    >
                                        Disease
                                    </Text>

                                    <TextInput
                                        value={disease}
                                        editable={params.role === "doctor"}
                                        onChangeText={setDisease}
                                        multiline
                                        style={{
                                            backgroundColor:
                                                params.role === "doctor"
                                                    ? "#fff"
                                                    : "#f8fafc",
                                            borderWidth: 1,
                                            borderColor: "#2563eb",
                                            borderRadius: 12,
                                            padding: 14,
                                            minHeight: 100,
                                            textAlignVertical: "top",
                                            color: "#0f172a"
                                        }}
                                    />
                                </View>

                                <CustomButton
                                    title="Save Changes"
                                    onPress={() => handleSubmit()}
                                />
                            </>
                        ) : params.type === "doctor" ? (
                            <DynamicForm
                                fields={getFields()}
                                initialValues={data}
                                buttonText="Save Changes"
                                onSubmit={handleSubmit}
                            />
                        ) : null
                    }
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}