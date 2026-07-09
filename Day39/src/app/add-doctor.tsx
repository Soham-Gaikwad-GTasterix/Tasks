import { View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import NavigationHeader from "../components/NavigationHeader";

import DynamicForm from "../components/DynamicForm";

import { router } from "expo-router";

import { createDoctor } from "../services/doctorService";

import { nanoid } from "nanoid";

export default function AddDoctor() {

    return(

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
                        title="Add Doctor"
                        showBack
                    />
                    <View
                        style={{
                            padding: 20
                        }}
                    >
                        <DynamicForm
                            buttonText="Add Doctor"
                            fields={[
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
                                    name: "password",
                                    placeholder: "Password",
                                    maxLength: 20,
                                    secureTextEntry: true
                                },
                                {
                                    name: "photo",
                                    placeholder: "Photo",
                                    type: "image"
                                }
                            ]}
                            onSubmit={async (data) => {

                                try {
                                    await createDoctor({
                                        id: `DOC-${nanoid(8)}`,
                                        ...data
                                    });

                                    alert( "Doctor Added" );

                                    router.back();
                                } catch (
                                    error
                                ) {
                                    console.log(error);

                                    alert("Failed to Add Doctor");
                                }
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}