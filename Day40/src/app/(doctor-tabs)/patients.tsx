import { View, RefreshControl, FlatList, Text, Alert } from "react-native";

import ScreenTitle from "@/components/ScreenTitle";

import InfoCard from "@/components/InfoCard";

import { router } from "expo-router";

import { useEffect, useState, useRef } from "react";

import { getPatients } from "@/services/patientService";

import { getUser } from "@/storage/authStorage";

export default function DoctorPatients() {
    const [patients, setPatients] = useState([]);

    const [visibleIds, setVisibleIds] = useState([]);

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
        try {
            const user = await getUser();
            if (!user) {
                return;
            }
            const allPatients = await getPatients();

            const myPatients = allPatients.filter(
                patient => patient.doctorId === user.doctorId
            );
            setPatients(myPatients);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadPatients();
    }, []);

    const [refreshing, setRefreshing] = useState(false);

    async function onRefresh() {
        setRefreshing(true);
        await loadPatients();
        setRefreshing(false);
    }

    return (
        <View
            style={{
                flex: 1,
                marginTop: 30,
                paddingHorizontal: 20,
                backgroundColor: "#f4f8fc"
            }}
        >
            <ScreenTitle
                title="My Patients"
            />
        
            <FlatList
                data={patients}
                keyExtractor={(
                    item, 
                    index
                ) => item.id?.toString()
                    || index.toString()
                }
                contentContainerStyle={{
                    paddingBottom: 30
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <InfoCard
                        title={
                            item.status === "Discharged"
                                ? `${item.name} (Discharged)`
                                : item.name
                        }
                        subtitle={`🩸 ${item.bloodGroup} • 🛌🏽 ${item.roomNo} • ${item.status}`}
                        status="Admitted"
                        isVisible={
                            visibleIds.includes(item.id)
                        }
                        buttonText="View Details"
                        onPress={() => {
                            router.push({
                                pathname: "/patient-details",
                                params: {
                                    id: item.id
                                }
                            })
                        }}
                    />
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
                ListHeaderComponent={
                    <View
                        style={{
                            height:10
                        }}
                    />
                }
                ListEmptyComponent={
                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 80
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 60
                            }}
                        >
                            👥
                        </Text>
                        <Text
                            style={{
                                marginTop: 12,
                                fontSize: 20,
                                fontWeight: "700",
                                color: "#334155"
                            }}
                        >
                            No Patients Assigned
                        </Text>
                        <Text
                            style={{
                                marginTop: 8,
                                color: "#64748b"
                            }}
                        >
                            Patients assigned to you will appear here.
                        </Text>
                    </View>
                }
            />
        </View>
    );
}