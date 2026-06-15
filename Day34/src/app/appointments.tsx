import { View, RefreshControl, FlatList } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import InfoCard from "../components/InfoCard";

import { useState, useEffect } from "react";

import { getAppointments } from "@/services/appointmentService";

export default function Appointments() {

    const [
        appointments,
        setAppointments
    ] = useState([]);

    async function loadAppointments() {
        const data =
            await getAppointments();
        setAppointments(data);
    }
    
    useEffect(() => {
        loadAppointments();
    }, []);

    const [ refreshing, setRefreshing ] = useState(false);

    async function onRefresh() {
        setRefreshing(true);
        await loadAppointments();
        setRefreshing(false);
    };

    return (
        <View
            style={{
                flex: 1,
                marginTop:30
            }}
        >
            <NavigationHeader
                title="Appointments"
                showBack
            />

            <FlatList
                data={appointments}
                keyExtractor={(
                    item, 
                    index
                ) => item.id?.toString()
                    || index.toString()
                }
                renderItem={({ item }) => (
                    <InfoCard
                        title="Patient Name"
                        subtitle={item.patient}
                        buttonText="View Details"
                        onPress={() =>
                            router.push({
                                pathname: "/appointment-details",
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