import { View, RefreshControl, FlatList, Text, Image } from "react-native";

import ScreenTitle from "@/components/ScreenTitle";

import { router } from "expo-router";

import { useEffect, useState, useRef } from "react";

import { getPatients } from "@/services/patientService";

import { getUser } from "@/storage/authStorage";

import CustomButton from "@/components/CustomButton";

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

            const myPatients = allPatients
                .filter(
                    patient => patient.doctorId === user.doctorId
                )
                .sort((a, b) => {
                    if (
                        a.status === "Admitted" &&
                        b.status !== "Admitted"
                    ) {
                        return -1;
                    }

                    if (
                        a.status !== "Admitted" &&
                        b.status === "Admitted"
                    ) {
                        return 1;
                    }

                    return (
                        new Date(b.admissionDate) -
                        new Date(a.admissionDate)
                    );
                });

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
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 22,
                            padding: 18,
                            marginTop: 18,
                            elevation: 5,
                            shadowColor: "#000",
                            shadowOpacity: 0.08,
                            shadowRadius: 8,
                            borderLeftWidth: 6,
                            borderLeftColor:
                                item.status === "Admitted"
                                    ? "#2563eb"
                                    : "#22c55e"
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
                                            width: 70,
                                            height: 70,
                                            borderRadius: 35,
                                            borderWidth: 2,
                                            borderColor: "#2563eb",
                                            backgroundColor: "#dbeafe"
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
                                                fontSize: 30
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
                                        color: "#64748b"
                                    }}
                                >
                                    🩸 {item.bloodGroup}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 2,
                                        color: "#64748b"
                                    }}
                                >
                                    🛏 {item.roomNo}
                                </Text>
                            </View>

                            <View
                                style={{
                                    backgroundColor:
                                        item.status === "Admitted"
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
                                        color:
                                            item.status === "Admitted"
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
                                marginTop: 18
                            }}
                        >
                            <CustomButton
                                title="View Details"
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