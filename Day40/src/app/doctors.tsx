import { View, RefreshControl, FlatList, Alert, Text, Image } from "react-native";

import { router } from "expo-router";

import NavigationHeader from "../components/NavigationHeader";

import CustomButton from "@/components/CustomButton";

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
                            borderRadius: 22,
                            padding: 18,
                            marginTop: 18,
                            elevation: 5,
                            shadowColor: "#000",
                            shadowOpacity: 0.08,
                            shadowRadius: 8
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
                                            width: 72,
                                            height: 72,
                                            borderRadius: 36,
                                            borderWidth: 3,
                                            borderColor: "#2563eb",
                                            backgroundColor: "#dbeafe"
                                        }}
                                    />
                                ) : (
                                    <View
                                        style={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: 36,
                                            borderWidth: 3,
                                            borderColor: "#2563eb",
                                            backgroundColor: "#dbeafe",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 34
                                            }}
                                        >
                                            👨🏻‍⚕️
                                        </Text>
                                    </View>
                                )
                            }

                            <View
                                style={{
                                    marginLeft: 16,
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "700",
                                        color: "#0f172a"
                                    }}
                                >
                                    Dr. {item.name}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 6,
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
                                gap: 10,
                                marginTop: 20
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
                                    onPress={() => handleDelete(item.id)}
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

        </View>
    );
}