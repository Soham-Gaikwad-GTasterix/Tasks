import { Text, View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import NavigationHeader from "@/components/NavigationHeader";

import DynamicForm from "@/components/DynamicForm";

import { router } from "expo-router";

import { createDoctor } from "@/services/doctorService";

import { nanoid } from "nanoid";

import {
    showSuccess,
    showError
} from "@/services/toastService";

export default function AddDoctor() {

    return(

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
                title="Add Doctor"
                showBack
            />

            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 50
                }}
            >
                <View
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: 22,
                        padding: 22,
                        marginBottom: 20,
                        elevation: 4,
                        shadowColor: "#000",
                        shadowOpacity: 0.08,
                        shadowRadius: 8
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "700",
                            color: "#0f172a"
                        }}
                    >
                        New Doctor
                    </Text>

                    <Text
                        style={{
                            marginTop: 8,
                            color: "#64748b",
                            fontSize: 15
                        }}
                    >
                        Fill in the doctor's information. A doctor account will be created automatically.
                    </Text>
                </View>
                <DynamicForm
                    buttonText="Add Doctor"
                    fields={[
                        {
                            name: "name",
                            placeholder: "Doctor Name"
                        },
                        {
                            name: "email",
                            placeholder: "Email Address",
                            keyboardType: "email-address",
                            maxLength: 50
                        },
                        {
                            name: "specialization",
                            placeholder: "Specialization"
                        },
                        {
                            name: "experience",
                            placeholder: "Experience (Years)",
                            keyboardType: "number-pad",
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
                            placeholder: "Phone Number",
                            keyboardType: "number-pad",
                            maxLength: 10
                        },
                        {
                            name: "password",
                            placeholder: "Create Password",
                            secureTextEntry: true,
                            maxLength: 20
                        },
                        {
                            name: "photo",
                            placeholder: "Doctor Photo",
                            type: "image"
                        }
                    ]}
                    onSubmit={async (data) => {
                        try {

                            if (!data.name?.trim()) {
                                return showError("Doctor name is required.");
                            }

                            if (!data.email?.trim()) {
                                return showError("Email is required.");
                            }

                            if (!data.password?.trim()) {
                                return showError("Password is required.");
                            }

                            if (
                                data.phoneNo &&
                                data.phoneNo.length !== 10
                            ) {
                                return showError("Phone number must contain 10 digits.");
                            }

                            await createDoctor({
                                id: `DOC-${nanoid(8)}`,
                                role: "doctor",
                                ...data
                            });

                            showSuccess("Doctor added successfully.");

                            router.back();

                        } catch (error) {
                            console.log(error);

                            showError(
                                error?.response?.data?.message ||
                                "Failed to add doctor."
                            );
                        }
                    }}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}