import { View, RefreshControl } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import InfoCard from "../components/InfoCard";

import { FlatList } from "react-native";

import { useState } from "react";

export default function Doctors() {

    const doctors=[
        {
            id: "1",
            name: "Raj",
            email: "raj@hospital.com",
            specialization: "Surgery",
            experience: "10+",
            department: "Surgery",
            qualification: "MBBS",
            phone: "7891230456"
        }
    ];

    const [ refreshing, setRefreshing ] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    return (
        <View
            style={{
                flex: 1,
                marginTop:30
            }}
        >
            <NavigationHeader
                title="Doctors"
                showBack
            />

            <FlatList
                data={doctors}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <InfoCard
                        title="Doctor Name"
                        subtitle={item.name}
                        buttonText="View Details"
                        onPress={() =>
                            router.push({
                                pathname: "/doctor-details",
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
            />        

        </View>
    );
}