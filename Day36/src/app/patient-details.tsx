import { View, Text, Image } from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import Animated, { SlideInRight } from "react-native-reanimated";

import CustomButton from "@/components/CustomButton";

import { useEffect, useState } from "react";

import { getPatients } from "@/services/patientService";

export default function PatientDetails() {
    const { id } = useLocalSearchParams();

    const [patient, setPatient] = useState(null);

    useEffect(() => {
        async function loadPatient() {
            const patients = await getPatients();
            const found = patients.find (
                p => p.id ===id
            );
            setPatient(found);
        }
        loadPatient();
    }, [id]);

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
                title="Patient Details"
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
                        uri: patient?.photo
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
                    Patient ID: {patient?.id}
                </Text>
                <Text>
                    Patient Name: {patient?.name}
                </Text>
                <Text>
                    Email: {patient?.email}
                </Text>
                <Text>
                    Age: {patient?.age}
                </Text>
                <Text>
                    Gender: {patient?.gender}
                </Text>
                <Text>
                    Disease: {patient?.disease}
                </Text>
                <Text>
                    Admission Date: {patient?.date}
                </Text>
                <Text>
                    Phone No.: {patient?.phoneNo}
                </Text>
                <Text>
                    Blood Group: {patient?.bloodGroup}
                </Text>
                <Text>
                    Room No.: {patient?.roomNo}
                </Text>
                <CustomButton
                    title="Edit"
                    onPress={() =>
                        router.push({
                            pathname: "/edit-details",
                            params: {
                                type: "patient",
                                data: JSON.stringify({
                                    photo: patient?.photo,
                                    id: patient?.id,
                                    name: patient?.name,
                                    email: patient?.email,
                                    age: patient?.age,
                                    gender: patient?.gender,
                                    disease: patient?.disease,
                                    date: patient?.date,
                                    phoneNo: patient?.phoneNo,
                                    bloodGroup: patient?.bloodGroup,
                                    roomNo: patient?.roomNo
                                })
                            }
                        })
                    }
                />
            </View>
        </Animated.View>
    );
}