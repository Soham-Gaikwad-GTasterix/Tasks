import { View, KeyboardAvoidingView, ScrollView, Platform, Pressable, Alert, Text } from "react-native";

import NavigationHeader from "../components/NavigationHeader";

import DynamicForm from "../components/DynamicForm";

import { router } from "expo-router";

import { nanoid } from "nanoid";

import { useState } from "react";

import { registerPatient } from "@/services/authService";

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
            alert("Passwords do not match.");
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
            alert ("Registration Successful");
            router.replace("/login");
        } catch (error) {
            console.log(error);
            alert("Registration Failed");
        }
    }

    return(

        <KeyboardAvoidingView
            style={{
                flex: 1
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
                    paddingBottom: 40
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#f4f8fc"
                    }}
                >
                    <NavigationHeader
                        title="Patient Registration"
                        showBack
                    />
                    <View
                        style={{
                            padding: 20,
                            backgroundColor: "#fff"
                        }}
                    >
                        
                            <Text
                                style={{
                                    fontSize: 26,
                                    fontWeight: "700",
                                    color: "#0f172a",
                                    testAlign: "center"
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
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 24
                                }}
                            >
                                <View
                                    style={{
                                        width: 40,
                                        height: 6,
                                        borderRadius: 3,
                                        backgroundColor: "#2563eb"
                                    }}
                                />
                                <View
                                    style={{
                                        width: 40,
                                        height: 6,
                                        borderRadius: 3,
                                        marginLeft: 8,
                                        backgroundColor:
                                            step === 2
                                                ? "#2563eb"
                                                : "#cbd5e1"
                                    }}
                                />
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
                            <Pressable
                                onPress={() =>
                                    router.replace("/login")
                                }
                                style={{
                                    marginTop: 28,
                                    alignSelf: "center"
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
                                <Text
                                    style={{
                                        color: "#2563eb",
                                        fontWeight: "700",
                                        textAlign: "center",
                                        marginTop: 6,
                                        fontSize: 16
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