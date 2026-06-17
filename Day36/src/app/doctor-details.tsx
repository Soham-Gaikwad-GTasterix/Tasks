import { View, Text, Image } from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import Animated, { SlideInRight } from "react-native-reanimated";

import CustomButton from "@/components/CustomButton";

import { useState, useEffect } from "react";

import { getDoctors } from "@/services/doctorService";

export default function DoctorDetails() {
    const { id } = useLocalSearchParams();

    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        async function loadDoctor() {
            const doctors = await getDoctors();
            const found = doctors.find(
                d => d.id === id
            );
            setDoctor(found);
        }
        loadDoctor();
    }, [id]);

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
                marginTop: 30
            }}
        >
            <NavigationHeader
                title="Doctor Details"
                showBack
            />

            <View
                style={{
                    padding: 20,
                    borderWidth: 1,
                    borderRadius: 16,
                    margin: 20
                }}
            >
                <Image
                    source={{
                        uri: doctor?.photo
                    }}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        alignSelf: "center",
                        marginBottom: 20
                    }}
                />
                <Text>
                    Doctor ID: {doctor?.id}
                </Text>
                <Text>
                    Doctor Name: {doctor?.name}
                </Text>
                <Text>
                    Email: {doctor?.email}
                </Text>
                <Text>
                    Specialization: {doctor?.specialization}
                </Text>
                <Text>
                    Experience: {doctor?.experience}
                </Text>
                <Text>
                    Department: {doctor?.department}
                </Text>
                <Text>
                    Qualification: {doctor?.qualification}
                </Text>
                <Text>
                    Phone No.: {doctor?.phoneNo}
                </Text>
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
            </View>
        </Animated.View>
    );
}