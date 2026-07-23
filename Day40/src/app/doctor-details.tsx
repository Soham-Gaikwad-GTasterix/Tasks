import { View, Text, Image, ScrollView } from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import Animated, { SlideInRight } from "react-native-reanimated";

import CustomButton from "@/components/CustomButton";

import { useState } from "react";

import { getDoctors } from "@/services/doctorService";

import { useFocusEffect } from "expo-router";

import { useCallback } from "react";


export default function DoctorDetails() {
    const { id } = useLocalSearchParams();

    const [doctor, setDoctor] = useState(null);

    useFocusEffect(
        useCallback (() => {
            async function loadDoctor() {
                const doctors = await getDoctors();
                const found = doctors.find(
                    d => d.id === id
                );
                setDoctor(found);
            }
            loadDoctor();
        }, [id])
    );

    if (!doctor) {
        return <Text>Loading...</Text> ;
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
                title="Doctor Details"
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
                        uri: doctor?.photo
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
                    {doctor?.name}
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
                        Doctor ID
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {doctor?.id}
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
                        {doctor?.email}
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
                        Specialization
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {doctor?.specialization}
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
                        Experience
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {doctor?.experience}
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
                        Department
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {doctor?.department}
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
                        Qualification
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: "#0f172a"
                        }}
                    >
                        {doctor?.qualification}
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
                        {doctor?.phoneNo}
                    </Text>
                </View>
                <CustomButton
                    title="Edit"
                    onPress={() =>
                        router.push({
                            pathname: "/edit-details",
                            params: {
                                type: "doctor",
                                data: JSON.stringify({
                                    photo: doctor?.photo,
                                    id: doctor?.id,
                                    name: doctor?.name,
                                    email: doctor?.email,
                                    specialization: doctor?.specialization,
                                    experience: doctor?.experience,
                                    department: doctor?.department,
                                    qualification:doctor?.qualification,
                                    phoneNo: doctor?.phoneNo
                                })
                            }
                        })
                    }
                />
            </ScrollView>
        </Animated.View>
    );
}