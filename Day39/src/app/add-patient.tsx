import { View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import NavigationHeader from "../components/NavigationHeader";

import DynamicForm from "../components/DynamicForm";

import { router } from "expo-router";

import { createPatient } from "../services/patientService";

import { nanoid } from "nanoid";

import NetInfo from "@react-native-community/netinfo";

import { addToQueue } from "@/services/offlineQueueService";

export default function AddPatient() {

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
                                },
                                {
                                    name: "photo",
                                    placeholder: "Photo",
                                    type: "image"
                                }
                            ]}
                            onSubmit={async (data) => {

                                try {
                                    await createPatient({
                                        id: `PAT-${nanoid(8)}`,
                                        ...data
                                    });
                                    
                                    const state = await NetInfo.fetch();

                                    if (state.isConnected) {
                                        await createPatient(data);
                                    } else {
                                        await addToQueue({
                                            method: "POST",
                                            endpoint: "/patients",
                                            data
                                        });
                                        alert("Saved offline. Will sync later.");
                                        router.back();
                                        return;
                                    }

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