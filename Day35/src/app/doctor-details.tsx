import { View, Text } from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import Animated, { SlideInRight } from "react-native-reanimated";

import CustomButton from "@/components/CustomButton";

export default function DoctorDetails() {
    const {
        id,
        name,
        email,
        specialization,
        experience,
        department,
        qualification,
        phoneNo
    } = useLocalSearchParams();

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
                <Text>
                    Doctor ID: {id}
                </Text>
                <Text>
                    Doctor Name: {name}
                </Text>
                <Text>
                    Email: {email}
                </Text>
                <Text>
                    Specialization: {specialization}
                </Text>
                <Text>
                    Experience: {experience}
                </Text>
                <Text>
                    Department: {department}
                </Text>
                <Text>
                    Qualification: {qualification}
                </Text>
                <Text>
                    Phone No.: {phoneNo}
                </Text>
                <CustomButton
                    title="Edit"
                    onPress={() =>
                        router.push({
                            pathname: "/edit-details",
                            params: {
                                type: "doctor",
                                data: JSON.stringify({
                                    id,
                                    name,
                                    email,
                                    specialization,
                                    experience,
                                    department,
                                    qualification,
                                    phoneNo
                                })
                            }
                        })
                    }
                />
            </View>
        </Animated.View>
    );
}