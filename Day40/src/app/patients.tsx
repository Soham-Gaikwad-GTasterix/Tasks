import { View, RefreshControl, FlatList, Alert, Text, Image } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import CustomButton from "@/components/CustomButton";

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
                backgroundColor: "#f4f8fc"
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
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 30
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 24,
                            marginTop: 18,
                            padding: 18,
                            elevation: 4,
                            shadowColor: "#000",
                            shadowOpacity: 0.08,
                            shadowRadius: 8,
                            shadowOffset: {
                                width: 0,
                                height: 3
                            },
                            borderLeftWidth: 6,
                            borderLeftColor: item.status === "Admitted"
                                ? "#2563eb"
                                : item.status === "Discharged"
                                ? "#22c55e"
                                : "#f59e0b"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            {
                                item.photo?.trim() ? (
                                    <Image
                                        source={{
                                            uri: item.photo
                                        }}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: 35,
                                            backgroundColor: "#dbeafe",
                                            borderWidth: 2,
                                            borderColor: "#2563eb"
                                        }}
                                    />
                                ) : (
                                    <View
                                        style={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: 35,
                                            backgroundColor: "#dbeafe",
                                            borderWidth: 2,
                                            borderColor: "#2563eb",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 32
                                            }}
                                        >
                                            👤
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
                                        fontSize: 20,
                                        fontWeight: "700",
                                        color: "#0f172a"
                                    }}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        marginTop: 5,
                                        color: "#64748b",
                                        fontSize: 15
                                    }}
                                >
                                    🩸 {item.bloodGroup}
                                </Text>
                                <Text
                                    style={{
                                        marginTop: 2,
                                        color: "#64748b",
                                        fontSize: 15
                                    }}
                                >
                                    🛌🏽 Room {item.roomNo || "--"}
                                </Text>
                            </View>
                            <View
                                style={{
                                    backgroundColor: item.status === "Admitted"
                                        ? "#dbeafe"
                                        : "#dcfce7",
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontWeight: "700",
                                        color: item.status ==="Admitted"
                                            ? "#2563eb"
                                            : "#15803d"
                                    }}
                                >
                                    {item.status}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                marginTop: 20
                            }}
                        >
                            <CustomButton
                                title= "View Details"
                                onPress={() =>
                                    router.push({
                                        pathname: "/patient-details",
                                        params: {
                                            id: item.id
                                        }
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