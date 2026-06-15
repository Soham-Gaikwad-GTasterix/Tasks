import { View, RefreshControl, FlatList } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import InfoCard from "../components/InfoCard";

import { useState, useEffect } from "react";

import { getDoctors } from "@/services/doctorService";

export default function Doctors() {

    const [
        doctors,
        setDoctors
    ] = useState([]);

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