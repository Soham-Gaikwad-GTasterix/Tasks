import { View, RefreshControl, FlatList, Alert } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import InfoCard from "../components/InfoCard";

import { useState, useEffect, useRef } from "react";

import { getAppointments, deleteAppointment } from "@/services/appointmentService";

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

    function handleDelete(id) {
        Alert.alert(
            "Delete Appointment",
            "Are you sure?",
            [
                {
                    text: "Cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await deleteAppointment(id);
                            await loadAppointments();
                        } catch (error) {
                            console.log(error);
                            Alert.alert(
                                "Error",
                                "Failed to Delete Appointment"
                            );
                        }
                    }
                }
            ]
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
                        isVisible={
                            visibleIds.includes(item.id)
                        }
                        buttonText="View Details"
                        onPress={() =>
                            router.push({
                                pathname: "/appointment-details",
                                params: item
                            })
                        }
                        onDelete={() =>
                            handleDelete(
                                item.id
                            )
                        }                           
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />

        </View>
    );
}