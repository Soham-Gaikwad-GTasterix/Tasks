import { View, RefreshControl } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import InfoCard from "../components/InfoCard";

import { FlatList } from "react-native";

import { useState } from "react";

export default function Patients() {

    const patients=[
        {
            id: "1",
            name: "Soham",
            email: "soham@test.com",
            age: "26",
            gender: "Male",
            disease: "Flu",
            admissionDate: "2026-06-01",
            phone: "9518462370",
            bloodGroup: "A+",
            roomNumber: "201"
        },
        {
            id: "2",
            name: "Test",
            email: "test@test.com",
            age: "25",
            gender: "Female",
            disease: "Cold",
            admissionDate: "2026-06-02",
            phone: "7891230458",
            bloodGroup: "B+",
            roomNumber: "202"
        },
        {
            id: "3",
            name: "Ketan",
            email: "ketan@test.com",
            age: "25",
            gender: "Male",
            disease: "Flu",
            admissionDate: "2026-06-03",
            phone: "9518462370",
            bloodGroup: "A-",
            roomNumber: "203"
        },
        {
            id: "4",
            name: "Priya",
            email: "priya@test.com",
            age: "27",
            gender: "Female",
            disease: "Cold",
            admissionDate: "2026-06-04",
            phone: "7891230458",
            bloodGroup: "B-",
            roomNumber: "204"
        },
        {
            id: "5",
            name: "Rahul",
            email: "rahul@test.com",
            age: "26",
            gender: "Male",
            disease: "Flu",
            admissionDate: "2026-06-05",
            phone: "9518462370",
            bloodGroup: "AB+",
            roomNumber: "205"
        },
        {
            id: "6",
            name: "Manasi",
            email: "manasi@test.com",
            age: "25",
            gender: "Female",
            disease: "Cold",
            admissionDate: "2026-06-06",
            phone: "7891230458",
            bloodGroup: "AB-",
            roomNumber: "206"
        },
        {
            id: "7",
            name: "Vipul",
            email: "vipul@test.com",
            age: "26",
            gender: "Male",
            disease: "Flu",
            admissionDate: "2026-06-07",
            phone: "9518462370",
            bloodGroup: "O+",
            roomNumber: "207"
        },
        {
            id: "8",
            name: "Gauri",
            email: "gauri@test.com",
            age: "25",
            gender: "Female",
            disease: "Cold",
            admissionDate: "2026-06-08",
            phone: "7891230458",
            bloodGroup: "O-",
            roomNumber: "208"
        },
        {
            id: "9",
            name: "Vishal",
            email: "vishal@test.com",
            age: "26",
            gender: "Male",
            disease: "Flu",
            admissionDate: "2026-06-09",
            phone: "9518462370",
            bloodGroup: "A+",
            roomNumber: "209"
        },
        {
            id: "10",
            name: "Pragati",
            email: "pragati@test.com",
            age: "25",
            gender: "Female",
            disease: "Cold",
            admissionDate: "2026-06-10",
            phone: "7891230458",
            bloodGroup: "B+",
            roomNumber: "210"
        }
    ];

    const [ refreshing, setRefreshing ] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setVisiblePatients(
                patients.slice(0, 3)
            );
            setRefreshing(false);
        }, 1500);
    };

    const [
        visiblePatients,
        setVisiblePatients
    ] = useState(
        patients.slice(0, 3)
    );

    function loadMore(){
        if (
            visiblePatients.length >= patients.length
        ) {
            return;
        }
        const nextPatients =
            patients.slice(
                0,
                visiblePatients.length + 3
            );

        setVisiblePatients(
            nextPatients
        );
    }

    return (
        <View
            style={{
                flex: 1,
                marginTop:30
            }}
        >
            <NavigationHeader
                title="Patients"
                showBack
            />

            <FlatList
                data={visiblePatients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <InfoCard
                        title="Patient Name"
                        subtitle={item.name}
                        buttonText="View Details"
                        onPress={() =>
                            router.push({
                                pathname: "/patient-details",
                                params: item
                            })
                        }
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
            />

        </View>
    );
}