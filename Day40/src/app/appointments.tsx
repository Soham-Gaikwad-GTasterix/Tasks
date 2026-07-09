import { View, RefreshControl, FlatList, Text } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import CustomButton from "@/components/CustomButton";

import { useState, useEffect, useRef } from "react";

import { getAppointments } from "@/services/appointmentService";

export default function Appointments() {

    const [
        appointments,
        setAppointments
    ] = useState([]);

    const [
        visibleIds,
        setVisibleIds
    ] = useState([]);

    const onViewableItemsChanged = useRef(
        ({ viewableItems }) => {
            setVisibleIds(
                prev => [
                    ...new Set([
                        ...prev,
                        ...viewableItems.map(
                            item => item.item.id
                        )
                    ])
                ]
            );
        }
    ).current;

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 70
    };

    async function loadAppointments() {
        const data = await getAppointments();

        const statusOrder = {
            Scheduled: 0,
            Admitted: 1,
            Completed: 2,
            Cancelled: 3
        };

        data.sort((a, b) => {
            const statusDiff =
                (statusOrder[a.status] ?? 99) -
                (statusOrder[b.status] ?? 99);

            if (statusDiff !== 0) {
                return statusDiff;
            }

            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);

            return dateB - dateA;
        });

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
                backgroundColor: "#f4f8fc"
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
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 30
                }}
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 22,
                            padding: 20,
                            marginTop: 18,
                            elevation: 5,
                            shadowColor: "#000",
                            shadowOpacity: 0.08,
                            shadowRadius: 8
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 21,
                                fontWeight: "700",
                                color: "#0f172a"
                            }}
                        >
                            👤 {item.patient}
                        </Text>

                        <Text
                            style={{
                                marginTop: 10,
                                color: "#2563eb",
                                fontSize: 16,
                                fontWeight: "600"
                            }}
                        >
                            📅 {item.date}
                        </Text>

                        <Text
                            style={{
                                marginTop: 4,
                                color: "#475569",
                                fontSize: 16
                            }}
                        >
                            🕒 {item.time}
                        </Text>

                        <View
                            style={{
                                marginTop: 20
                            }}
                        >
                                <CustomButton
                                    title="View Details"
                                    onPress={() =>
                                        router.push({
                                            pathname: "/appointment-details",
                                            params: item
                                        })
                                    }
                                />
                            
                        </View>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#2563eb"]}
                        tintColor="#2563eb"
                    />
                }
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                ListEmptyComponent={
                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 100
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 60
                            }}
                        >
                            📂
                        </Text>
                        <Text
                            style={{
                                marginTop: 12,
                                fontSize: 20,
                                fontWeight: "700",
                                color: "#334155"
                            }}
                        >
                            No Records Found
                        </Text>
                        <Text
                            style={{
                                marginTop: 8,
                                color: "#64748b"
                            }}
                        >
                            Pull down to refresh.
                        </Text>
                    </View>
                }
            />

        </View>
    );
}