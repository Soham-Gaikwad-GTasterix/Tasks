import { View, RefreshControl, FlatList } from "react-native";

import ScreenTitle from "@/components/ScreenTitle";

import InfoCard from "@/components/InfoCard";

import { useEffect, useState, useRef } from "react";

import { getAppointments } from "@/services/appointmentService";

import { getUser } from "@/storage/authStorage";

export default function Schedule() {
    const [appointments, setAppointments] = useState([]);

    const [visibleIds, setVisibleIds] = useState([]);

    const onViewableItemChanged = useRef(
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
        try {
            const user = await getUser();

            const data = await getAppointments();

            const myAppointments = data.filter(
                item => item.doctorId === user.doctorId
            );
            setAppointments(myAppointments);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadAppointments();
    }, []);

    const [refreshing, setRefreshing] = useState(false);

    async function onRefresh() {
        setRefreshing(true);
        await loadAppointments();
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
                title="Schedule"
            />
        
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <InfoCard
                        title={item.patient}
                        subtitle={`${item.date} at ${item.time}`}
                        isVisible={visibleIds.includes(item.id)}
                        buttonText={item.status}
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