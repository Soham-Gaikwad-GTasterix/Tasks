import { View, Text } from "react-native";

import { useLocalSearchParams } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

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
        <View
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
            </View>
        </View>
    );
}