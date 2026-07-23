import { View, KeyboardAvoidingView, ScrollView, Platform, Pressable, Text } from "react-native";

import NavigationHeader from "../components/NavigationHeader";

import DynamicForm from "../components/DynamicForm";

import { router } from "expo-router";

import { nanoid } from "nanoid";

import { useState } from "react";

import { registerPatient } from "@/services/authService";

import {
    showSuccess,
    showError
} from "@/services/toastService";

export default function Register() {

    const [step, setStep] = useState(1);

    const [patientData, setPatientData] = useState({});

    const personalFieds = [
        {
            name: "name",
            placeholder: "Full Name"
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
        }
    ];

    const passwordFields = [
        {
            name: "password",
            placeholder: "Password",
            secureTextEntry: true
        },
        {
            name: "confirmPassword",
            placeholder: "Confirm Password",
            secureTextEntry: true
        }
    ];

    async function handleSubmit(data) {

        if (step === 1) {
            setPatientData(data);
            setStep(2);
            return;
        }

        if (data.password !== data.confirmPassword) {
            showError("Passwords do not match.");
            return;
        }

        try {

            const registerData = {
                ...patientData,
                password: data.password,
                role: "patient"
            };

            console.log(registerData);

            await registerPatient(registerData);

            showSuccess("Registration Successful");

            router.replace("/login");

        } catch (error) {

            console.log(error);

            showError("Registration Failed");
        }
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
                title="Patient Registration"
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
                    <Text
                        style={{
                            fontSize: 54,
                            textAlign: "center",
                            marginBottom: 12
                        }}
                    >
                        🏥
                    </Text>

                    <Text
                        style={{
                            fontSize: 26,
                            fontWeight: "700",
                            color: "#0f172a",
                            textAlign: "center"
                        }}
                    >
                        {
                            step === 1
                                ? "Create Account"
                                : "Secure Your Account"
                        }
                    </Text>

                    <Text
                        style={{
                            textAlign: "center",
                            color: "#64748b",
                            marginTop: 8,
                            marginBottom: 24
                        }}
                    >
                        {
                            step === 1
                                ? "Step 1 of 2 • Personal Details"
                                : "Step 2 of 2 • Set Password"
                        }
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 28
                        }}
                    >
                        <View
                            style={{
                                width: 38,
                                height: 38,
                                borderRadius: 19,
                                backgroundColor: "#2563eb",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: "700",
                                    fontSize: 16
                                }}
                            >
                                1
                            </Text>
                        </View>

                        <View
                            style={{
                                width: 60,
                                height: 3,
                                backgroundColor:
                                    step === 2
                                        ? "#2563eb"
                                        : "#cbd5e1"
                            }}
                        />

                        <View
                            style={{
                                width: 38,
                                height: 38,
                                borderRadius: 19,
                                backgroundColor:
                                    step === 2
                                        ? "#2563eb"
                                        : "#cbd5e1",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: "700",
                                    fontSize: 16
                                }}
                            >
                                2
                            </Text>
                        </View>
                    </View>

                    <DynamicForm
                        buttonText={
                            step === 1
                                ? "Next"
                                : "Register"
                        }
                        fields={
                            step === 1
                                ? personalFieds
                                : passwordFields
                        }
                        onSubmit={handleSubmit}
                    />

                    {
                        step === 2 && (
                            <Pressable
                                onPress={() =>
                                    setStep(1)
                                }
                                style={{
                                    marginTop: 20,
                                    alignSelf: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#2563eb",
                                        fontWeight: "700",
                                        fontSize: 16
                                    }}
                                >
                                    ← Back
                                </Text>
                            </Pressable>
                        )
                    }

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 30
                        }}
                    >
                        <Text
                            style={{
                                color: "#64748b",
                                fontSize: 15
                            }}
                        >
                            Already have an account?
                        </Text>

                        <Pressable
                            onPress={() =>
                                router.replace("/login")
                            }
                        >
                            <Text
                                style={{
                                    color: "#2563eb",
                                    fontWeight: "700",
                                    marginLeft: 6,
                                    fontSize: 15
                                }}
                            >
                                Login
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}