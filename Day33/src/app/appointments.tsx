import { View, RefreshControl } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import InfoCard from "../components/InfoCard";

import { FlatList } from "react-native";

import { useState } from "react";

export default function Appointments() {

    const appointments=[
        {
            id: "1",
            name: "Soham",
            doctor: "raj",
            date: "2026-06-01",
            time: "19:23",
            status: "Completed"
        },
        {
            id: "2",
            name: "Test",
            doctor: "raj",
            date: "2026-06-02",
            time: "19:23",
            status: "Scheduled"
        },
        {
            id: "3",
            name: "Ketan",
            doctor: "raj",
            date: "2026-06-03",
            time: "19:23",
            status: "Cancelled"
        },
        {
            id: "4",
            name: "Vipul",
            doctor: "raj",
            date: "2026-06-04",
            time: "19:23",
            status: "Completed"
        },
        {
            id: "5",
            name: "Vishal",
            doctor: "raj",
            date: "2026-06-05",
            time: "19:23",
            status: "Scheduled"
        },
        {
            id: "6",
            name: "Pragati",
            doctor: "raj",
            date: "2026-06-06",
            time: "19:23",
            status: "Cancelled"
        },{
            id: "7",
            name: "Gauri",
            doctor: "raj",
            date: "2026-06-07",
            time: "19:23",
            status: "Completed"
        },
        {
            id: "8",
            name: "Priya",
            doctor: "raj",
            date: "2026-06-08",
            time: "19:23",
            status: "Scheduled"
        },
        {
            id: "9",
            name: "Rahul",
            doctor: "raj",
            date: "2026-06-09",
            time: "19:23",
            status: "Cancelled"
        },
        {
            id: "10",
            name: "Manasi",
            doctor: "raj",
            date: "2026-06-10",
            time: "19:23",
            status: "Cancelled"
        }
    ];

    const [ refreshing, setRefreshing ] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setVisibleAppointments(
                appointments.slice(0, 3)
            );
            setRefreshing(false);
        }, 1500);
    };

    const [
        visibleAppointments,
        setVisibleAppointments
    ] = useState(
        appointments.slice(0, 3)
    );

    function loadMore(){
        if (
            visibleAppointments.length >= appointments.length
        ) {
            return;
        }
        const nextAppointments =
            appointments.slice(
                0,
                visibleAppointments.length + 3
            );

        setVisibleAppointments(
            nextAppointments
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
                title="Appointments"
                showBack
            />

            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <InfoCard
                        title="Patient Name"
                        subtitle={item.name}
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
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
            />

        </View>
    );
}