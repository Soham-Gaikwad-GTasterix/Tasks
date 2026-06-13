import { View, Text } from "react-native";

import { useLocalSearchParams } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

export default function PatientDetails() {
    const {
        id,
        name,
        email,
        age,
        gender,
        disease,
        admissionDate,
        phone,
        bloodGroup,
        roomNumber
    } = useLocalSearchParams();

    return (
        <View
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
                    Admission Date: {admissionDate}
                </Text>
                <Text>
                    Phone No.: {phone}
                </Text>
                <Text>
                    Blood Group: {bloodGroup}
                </Text>
                <Text>
                    Room No.: {roomNumber}
                </Text>
            </View>
        </View>
    );
}