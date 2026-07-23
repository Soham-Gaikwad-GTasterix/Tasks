import { View, Text, Image, ScrollView } from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import Animated, { SlideInRight } from "react-native-reanimated";

import CustomButton from "@/components/CustomButton";

import { useEffect, useState } from "react";

import { getPatients } from "@/services/patientService";

import { useFocusEffect } from "expo-router";

import { useCallback } from "react";

import { updatePatient } from "@/services/patientService";

import { getUser } from "@/storage/authStorage";

import {
    showSuccess,
    showError
} from "@/services/toastService";

import ConfirmationDialog from "@/components/ConfirmationDialog";

export default function PatientDetails() {
    const { id } = useLocalSearchParams();

    const [patient, setPatient] = useState(null);

    const [user, setUser] = useState(null);

    const [dialogVisible, setDialogVisible] = useState(false);

    useEffect(() => {
        async function loadUser() {
            setUser(await getUser());
        }
        loadUser();
    }, []);

    useFocusEffect(
        useCallback (() => {
            async function loadPatient() {
                const patients = await getPatients();
                const found = patients.find (
                    p => p.id === id
                );
                setPatient(found);
            }
            loadPatient();
        }, [id])
    );

    async function handleDischarge() {
        try {

            const updated = {
                ...patient,
                status: "Discharged",
                roomNo: `${patient.roomNo} (Discharged)`,
                dischargeDate: new Date()
                    .toISOString()
                    .split("T")[0]
            };

            await updatePatient(
                patient.id,
                updated
            );

            setPatient(updated);

            showSuccess(
                "Patient discharged successfully."
            );

        } catch (error) {

            console.log(error);

            showError(
                "Failed to discharge patient."
            );

        } finally {

            setDialogVisible(false);

        }
    }

    return (
        <Animated.View
            entering={
                SlideInRight
                    .duration(400)
            }
            style={{
                flex: 1,
                backgroundColor: "#f4f8fc"
            }}
        >
            <NavigationHeader
                title="Patient Profile"
                showBack
            />
            <ScrollView
                style={{
                    backgroundColor: "#fff",
                    borderRadius: 28,
                    marginTop: 20,
                    marginHorizontal: 20,
                    marginBottom: 50,
                    elevation: 6,
                    shadowColor: "#000",
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    shadowOffset: {
                        width: 0,
                        height: 4
                    }
                }}
                contentContainerStyle={{
                    padding: 24
                }}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={{
                        uri: patient?.photo
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
                        color: "#0f172a"
                    }}
                >
                    {patient?.name}
                </Text>
                <View
                    style={{
                        marginBottom:16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Patient ID
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {patient?.id}
                    </Text>
                </View>
                <View
                    style={{
                        marginBottom:16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Email
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {patient?.email}
                    </Text>
                </View>
                <View
                    style={{
                        marginBottom:16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Age
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {patient?.age}
                    </Text>
                </View>
                <View
                    style={{
                        marginBottom:16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Gender
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {patient?.gender}
                    </Text>
                </View>
                <View
                    style={{
                        marginBottom:16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Disease
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {patient?.disease}
                    </Text>
                </View>
                <View
                    style={{
                        marginBottom:16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Admission Date
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {patient?.admissionDate}
                    </Text>
                </View>
                <View
                    style={{
                        marginBottom:16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Phone No.
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {patient?.phoneNo}
                    </Text>
                </View>
                <View
                    style={{
                        marginBottom:16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Blood Group
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {patient?.bloodGroup}
                    </Text>
                </View>
                <View
                    style={{
                        marginBottom: 16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Doctor
                    </Text>

                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {patient?.doctorName}
                    </Text>
                </View>
                <View
                    style={{
                        marginBottom: 16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Room No.
                    </Text>

                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {patient?.roomNo}
                    </Text>
                </View>

                <View
                    style={{
                        marginBottom: 16
                    }}
                >
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Bed No.
                    </Text>

                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {patient?.bedNo || " "}
                    </Text>
                </View>
                {
                    patient?.status === "Discharged" && (
                        <>
                            <View
                                style={{
                                    marginBottom: 16
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#64748b",
                                        fontSize: 14
                                    }}
                                >
                                    Discharge Date
                                </Text>
                                <Text
                                    style={{
                                        fontSize:17,
                                        fontWeight: "600",
                                        color: "#0f172a"
                                    }}
                                >
                                    {patient?.dischargeDate}
                                </Text>
                            </View>
                            <View
                                style={{
                                    backgroundColor: "#dcfce7",
                                    padding: 14,
                                    borderRadius: 12,
                                    alignItems: "center",
                                    marginBottom: 20
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#15803d",
                                        fontWeight: "700",
                                        fontSize: 16
                                    }}
                                >
                                    ✔ Patient Discharged
                                </Text>
                            </View>
                        </>
                    )
                }
                {
                    patient?.status !== "Discharged" && (
                        <>
                            <CustomButton
                                title="Update Details"
                                onPress={() =>
                                    router.push({
                                        pathname: "/edit-details",
                                        params: {
                                            type: "patient",
                                            role: user?.role,
                                            data: JSON.stringify(patient)
                                        }
                                    })
                                }
                            />
                            {
                                user?.role === "doctor" && (
                                    <View
                                        style={{
                                            marginTop: 14
                                        }}
                                    >
                                        <CustomButton
                                            title="Discharge Patient"
                                            backgroundColor="#dc2626"
                                            onPress={() =>
                                                setDialogVisible(true)
                                            }
                                        />
                                    </View>
                                )
                            }
                        </>
                    )
                }
                
            </ScrollView>

            <ConfirmationDialog
                visible={dialogVisible}
                title="Discharge Patient"
                message="Are you sure you want to discharge this patient?"
                confirmText="Discharge"
                confirmColor="#dc2626"
                onCancel={() =>
                    setDialogVisible(false)
                }
                onConfirm={handleDischarge}
            />

        </Animated.View>
    );
}