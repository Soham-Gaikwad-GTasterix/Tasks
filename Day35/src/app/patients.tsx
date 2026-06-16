import { View, RefreshControl, FlatList, Alert } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import InfoCard from "../components/InfoCard";

import { useState, useEffect, useRef } from "react";

import { getPatients, deletePatient } from "@/services/patientService";

export default function Patients() {

    const [
        patients,
        setPatients
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

    async function loadPatients() {
            const data =
                await getPatients();
            setPatients(data);
    }
    
    useEffect(() => {
        loadPatients();
    }, []);

    const [ refreshing, setRefreshing ] = useState(false);

    async function onRefresh() {
        setRefreshing(true);
        await loadPatients();
        setRefreshing(false);
    };

    function handleDelete(id) {
        Alert.alert(
            "Delete Patient",
            "Are you sure?",
            [
                {
                    text: "Cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await deletePatient(id);
                            await loadPatients();
                        } catch (error) {
                            console.log(error);
                            Alert.alert(
                                "Error",
                                "Failed to Delete Patient"
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
                title="Patients"
                showBack
            />

            <FlatList
                data={patients}
                keyExtractor={(
                    item, 
                    index
                ) => item.id?.toString()
                    || index.toString()
                }
                renderItem={({ item }) => (
                    <InfoCard
                        title="Patient Name"
                        subtitle={item.name}
                        isVisible={
                            visibleIds.includes(item.id)
                        }
                        buttonText="View Details"
                        onPress={() =>
                            router.push({
                                pathname: "/patient-details",
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