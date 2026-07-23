import { View, RefreshControl, FlatList, Text, Image } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import CustomButton from "@/components/CustomButton";

import { useState, useEffect,useRef } from "react";

import { getDoctors, deleteDoctor } from "@/services/doctorService";

import {
    showSuccess,
    showError
} from "@/services/toastService";

import ConfirmationDialog from "@/components/ConfirmationDialog";

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

    const [dialogVisible, setDialogVisible] = useState(false);

    const [selectedDoctorId, setSelectedDoctorId] = useState(null);

    async function handleDelete() {
        try {

            await deleteDoctor(selectedDoctorId);

            await loadDoctors();

            showSuccess(
                "Doctor deleted successfully."
            );

        } catch (error) {

            console.log(error);

            showError(
                "Failed to delete doctor."
            );

        } finally {

            setDialogVisible(false);

            setSelectedDoctorId(null);

        }
    }  

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#f4f8fc"
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
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 30
                }}
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 24,
                            padding: 18,
                            marginTop: 18,
                            elevation: 6,
                            shadowColor: "#000",
                            shadowOpacity: 0.08,
                            shadowRadius: 10,
                            shadowOffset: {
                                width: 0,
                                height: 4
                            }
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            {
                                item.photo ? (
                                    <Image
                                        source={{
                                            uri: item.photo
                                        }}
                                        style={{
                                            width: 76,
                                            height: 76,
                                            borderRadius: 38,
                                            borderWidth: 3,
                                            borderColor: "#2563eb"
                                        }}
                                    />
                                ) : (
                                    <View
                                        style={{
                                            width: 76,
                                            height: 76,
                                            borderRadius: 38,
                                            backgroundColor: "#dbeafe",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderWidth: 3,
                                            borderColor: "#2563eb"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 36
                                            }}
                                        >
                                            👨🏻‍⚕️
                                        </Text>
                                    </View>
                                )
                            }

                            <View
                                style={{
                                    flex: 1,
                                    marginLeft: 16
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 21,
                                        fontWeight: "700",
                                        color: "#0f172a"
                                    }}
                                >
                                    Dr. {item.name}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 5,
                                        color: "#2563eb",
                                        fontSize: 16,
                                        fontWeight: "600"
                                    }}
                                >
                                    🩺 {item.specialization}
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                gap: 10
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <CustomButton
                                    title="View Details"
                                    onPress={() =>
                                        router.push({
                                            pathname: "/doctor-details",
                                            params: {
                                                id: item.id
                                            }
                                        })
                                    }
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <CustomButton
                                    title="Remove"
                                    backgroundColor="#dc2626"
                                    onPress={() => {
                                        setSelectedDoctorId(item.id);
                                        setDialogVisible(true);
                                    }}
                                />
                            </View>
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

            <ConfirmationDialog
                visible={dialogVisible}
                title="Delete Doctor"
                message="Are you sure you want to delete this doctor?"
                confirmText="Delete"
                confirmColor="#dc2626"
                onCancel={() => {
                    setDialogVisible(false);
                    setSelectedDoctorId(null);
                }}
                onConfirm={handleDelete}
            />  

        </View>
    );
}