import { View, RefreshControl, FlatList, Alert } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import InfoCard from "../components/InfoCard";

import { useState, useEffect,useRef } from "react";

import { getDoctors, deleteDoctor } from "@/services/doctorService";

export default function Doctors() {

    const [
        doctors,
        setDoctors
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

    async function loadDoctors() {
        const data =
            await getDoctors();
        setDoctors(data);
    }
    
    useEffect(() => {
        loadDoctors();
    }, []);

    const [ refreshing, setRefreshing ] = useState(false);

    async function onRefresh() {
        setRefreshing(true);
        await loadDoctors();
        setRefreshing(false);
    };

    function handleDelete(id) {
        Alert.alert(
            "Delete Doctor",
            "Are you sure?",
            [
                {
                    text: "Cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await deleteDoctor(id);
                            await loadDoctors();
                        } catch (error) {
                            console.log(error);
                            Alert.alert(
                                "Error",
                                "Failed to Delete Doctor"
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
                title="Doctors"
                showBack
            />

            <FlatList
                data={doctors}
                keyExtractor={(
                    item, 
                    index
                ) => item.id?.toString()
                    || index.toString()
                }
                renderItem={({ item }) => (
                    <InfoCard
                        title="Doctor Name"
                        subtitle={item.name}
                        isVisible={
                            visibleIds.includes(item.id)
                        }
                        buttonText="View Details"
                        onPress={() =>
                            router.push({
                                pathname: "/doctor-details",
                                params: {
                                    id: item.id
                                }
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