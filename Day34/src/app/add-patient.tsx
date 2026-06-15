import { View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import NavigationHeader from "../components/NavigationHeader";

import DynamicForm from "../components/DynamicForm";

import { router } from "expo-router";

import { createPatient } from "../services/patientService";

import { nanoid } from "nanoid";

export default function AddPatient() {
    return(

        <KeyboardAvoidingView
            style={{
                flex:1
            }}
            behavior={
                Platform.OS === "android"
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
                        title="Add Patient"
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
                                    name: "email",
                                    placeholder: "Email"
                                },
                                {
                                    name: "age",
                                    placeholder: "Age"
                                },
                                {
                                    name: "gender",
                                    placeholder: "Gender"
                                },
                                {
                                    name: "disease",
                                    placeholder: "Disease"
                                },
                                {
                                    name: "date",
                                    placeholder: "Admission Date"
                                },
                                {
                                    name: "phoneNo",
                                    placeholder: "Phone No."
                                },
                                {
                                    name: "bloodGroup",
                                    placeholder: "Blood Group"
                                },
                                {
                                    name: "roomNo",
                                    placeholder: "Room No."
                                }
                            ]}
                            onSubmit={async (data) => {

                                try {
                                    await createPatient({
                                        id: `PAT-${nanoid(8)}`,
                                        ...data
                                    });

                                    alert( "Patient Added" );

                                    router.back();
                                } catch (
                                    error
                                ) {
                                    console.log(error);

                                    alert("Failed to Add Patient");
                                }
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}