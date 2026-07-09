import { View, RefreshControl, FlatList } from "react-native";

import ScreenTitle from "@/components/ScreenTitle";

import InfoCard from "@/components/InfoCard";

import { router } from "expo-router";

import { useEffect, useState, useRef } from "react";

import { getPatients } from "@/services/patientService";

import { getAppointments } from "@/services/appointmentService";

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

            const appointments = await getAppointments();

            const myAppointments = appointments.filter(
                item => item.doctorId === user.doctorId
            );

            const patientNames = [
                ...new Set(
                    myAppointments.map(
                        item => item.patient
                    )
                )
            ];
            
            const allPatients = await getPatients();

            const myPatients = allPatients.filter(
                patient => patientNames.includes(
                    patient.name
                )
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
                marginTop: 30
            }}
        >
            <ScreenTitle
                title="Patients"
            />
        
            <FlatList
                data={patients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <InfoCard
                        title="Patient Name"
                        subtitle={item.name}
                        isVisible={visibleIds.includes(item.id)}
                        buttonText="View Details"
                        onPress={() =>
                            router.push({
                                pathname: "/patient-details",
                                params: {id: item.id}
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
                onViewableItemsChanged={onViewableItemChanged}
                viewabilityConfig={viewabilityConfig}
            />
        </View>
    );
}