import { View, Text } from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import Animated, { SlideInRight } from "react-native-reanimated";

import CustomButton from "@/components/CustomButton";

export default function PatientDetails() {
    const {
        id,
        name,
        email,
        age,
        gender,
        disease,
        date,
        phoneNo,
        bloodGroup,
        roomNo
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
                <Text>
                    Patient ID: {id}
                </Text>
                <Text>
                    Patient Name: {name}
                </Text>
                <Text>
                    Email: {email}
                </Text>
                <Text>
                    Age: {age}
                </Text>
                <Text>
                    Gender: {gender}
                </Text>
                <Text>
                    Disease: {disease}
                </Text>
                <Text>
                    Admission Date: {date}
                </Text>
                <Text>
                    Phone No.: {phoneNo}
                </Text>
                <Text>
                    Blood Group: {bloodGroup}
                </Text>
                <Text>
                    Room No.: {roomNo}
                </Text>
                <CustomButton
                    title="Edit"
                    onPress={() =>
                        router.push({
                            pathname: "/edit-details",
                            params: {
                                type: "patient",
                                data: JSON.stringify({
                                    id,
                                    name,
                                    email,
                                    age,
                                    gender,
                                    disease,
                                    date,
                                    phoneNo,
                                    bloodGroup,
                                    roomNo
                                })
                            }
                        })
                    }
                />
            </View>
        </Animated.View>
    );
}