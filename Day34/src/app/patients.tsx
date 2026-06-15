import { View, RefreshControl, FlatList } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import InfoCard from "../components/InfoCard";

import { useState, useEffect } from "react";

import { getPatients } from "@/services/patientService";

export default function Patients() {

    const [
        patients,
        setPatients
    ] = useState([]);

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
            />

        </View>
    );
}