import { View, Text, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, Pressable } from "react-native";

import { useState, useEffect } from "react";

import { router, useLocalSearchParams } from "expo-router";

import NavigationHeader from "@/components/NavigationHeader";

import DynamicForm from "@/components/DynamicForm";

import CustomButton from "@/components/CustomButton";

import { updateDoctor } from "@/services/doctorService";

import { updatePatient, getPatients } from "@/services/patientService";

export default function EditDetails() {
    const params = useLocalSearchParams();

    const data = JSON.parse(params.data);

    const [disease, setDisease] = useState(data.disease);

    const currentRoom = (data.roomNo || "").match(/\d+/)?.[0] || "";

    const currentPrefix = currentRoom.charAt(0);

    const floorMap = {
        "0": "General",
        "1": "Semi",
        "2": "ICU",
        "3": "Private",
        "4": "Deluxe"
    };

    const [selectedFloor, setSelectedFloor] = useState(
        floorMap[currentPrefix] || "General"
    );

    const [roomNo, setRoomNo] = useState(currentRoom);

    const [occupiedRooms, setOccupiedRooms] = useState([]);

    useEffect(() => {
        async function loadOccupiedRooms() {
            const patients = await getPatients();

            setOccupiedRooms(
                patients
                    .filter(
                        patient =>
                            patient.status === "Admitted" &&
                            patient.id !== data.id
                    )
                    .map(
                        patient => patient.roomNo
                    )
            );
        }

        if (params.type === "patient") {
            loadOccupiedRooms();
        }
    }, []);

    const roomConfig = {
        General: {
            prefix: 0,
            count: 50
        },
        Semi: {
            prefix: 1,
            count: 20
        },
        ICU: {
            prefix: 2,
            count: 10
        },
        Private: {
            prefix: 3,
            count: 15
        },
        Deluxe: {
            prefix: 4,
            count: 10
        }
    };

    const currentFloor =
        roomConfig[selectedFloor] || roomConfig.General;

    const rooms = Array.from(
        {
            length: currentFloor.count
        },
        (_, index) =>
            `${currentFloor.prefix}${String(index + 1).padStart(2, "0")}`
    );

    function getFields() {
        switch (params.type) {
            case "doctor":
                return [
                    {
                        name: "name",
                        placeholder: "Doctor Name"
                    },
                    {
                        name: "email",
                        placeholder: "Email",
                        keyboardType: "email-address",
                        maxLength: 50
                    },
                    {
                        name: "specialization",
                        placeholder: "Specialization"
                    },
                    {
                        name: "experience",
                        placeholder: "Experience",
                        keyboardType: "numeric",
                        maxLength: 2
                    },
                    {
                        name: "department",
                        placeholder: "Department"
                    },
                    {
                        name: "qualification",
                        placeholder: "Qualification"
                    },
                    {
                        name: "phoneNo",
                        placeholder: "Phone No.",
                        keyboardType: "numeric",
                        maxLength: 10
                    },
                    {
                        name: "photo",
                        placeholder: "Photo",
                        type: "image"
                    }
                ];
        }
    }

    async function handleSubmit(values) {
        if (params.type === "patient") {
            await updatePatient(
                data.id,
                {
                    ...data,
                    disease:
                        params.role === "doctor"
                            ? disease
                            : data.disease,

                    roomNo:
                        params.role === "admin"
                            ? roomNo
                            : data.roomNo
                }
            );
        } else if (params.type === "doctor") {
            await updateDoctor(
                data.id,
                values
            );
        } else {
            return;
        }

        alert("Updated");
        router.back();
    }

    return (
        <KeyboardAvoidingView
            style={{
                flex:1,
                backgroundColor: "#f4f8fc"
            }}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : "height"   
            }
        >
            <View
                style={{
                    paddingBottom: 40,
                    flex: 1
                }}
            >
                <NavigationHeader
                    title={
                        params.type === "patient"
                            ? "Update Patient Details"
                            : "Edit Doctor Details"
                    }
                    showBack
                />
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 20
                    }}
                    style={{
                        margin: 20,
                        backgroundColor: "#fff",
                        borderRadius: 28,
                        elevation: 6,
                        shadowColor: "#000",
                        shadowOpacity: 0.08,
                        shadowRadius: 8,
                        shadowOffset: {
                            width: 0,
                            height: 4
                        }
                    }}
                >
                    {
                        params.type === "patient" ? (
                            <>
                                <Image
                                    source={{
                                        uri: data.photo
                                    }}
                                    style={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 75,
                                        borderWidth: 4,
                                        alignSelf: "center",
                                        marginBottom: 20,
                                        borderColor: "#2563eb",
                                        backgroundColor: "#e0f2fe"
                                    }}
                                />

                                <Text
                                    style={{
                                        fontSize: 28,
                                        fontWeight: "700",
                                        textAlign: "center",
                                        color: "#0f172a",
                                        marginBottom: 24
                                    }}
                                >
                                    {data.name}
                                </Text>

                                {[
                                    ["Patient ID", data.id],
                                    ["Email", data.email],
                                    ["Age", data.age],
                                    ["Gender", data.gender],
                                    ["Admission Date", data.admissionDate],
                                    ["Phone No.", data.phoneNo],
                                    ["Blood Group", data.bloodGroup]
                                ].map(([label, value]) => (
                                    <View
                                        key={label}
                                        style={{
                                            marginBottom: 18
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "#64748b",
                                                fontSize: 14,
                                                marginBottom: 6
                                            }}
                                        >
                                            {label}
                                        </Text>

                                        <TextInput
                                            value={String(value ?? "")}
                                            editable={false}
                                            style={{
                                                backgroundColor: "#f8fafc",
                                                borderWidth: 1,
                                                borderColor: "#e2e8f0",
                                                borderRadius: 12,
                                                padding: 14,
                                                color: "#0f172a"
                                            }}
                                        />
                                    </View>
                                ))}

                                <View
                                    style={{
                                        marginBottom: 18
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#64748b",
                                            marginTop: 8,
                                            marginBottom: 10
                                        }}
                                    >
                                        Select Room
                                    </Text>
                                    
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginBottom: 20
                                        }}
                                    >
                                        {Object.keys(roomConfig).map(floor => (
                                            <Pressable
                                                key={floor}
                                                onPress={() => {
                                                    setSelectedFloor(floor);
                                                    setRoomNo("");
                                                }}
                                                style={{
                                                    flex: 1,
                                                    marginHorizontal: 3,
                                                    paddingVertical: 10,
                                                    borderRadius: 10,
                                                    backgroundColor:
                                                        selectedFloor === floor
                                                            ? "#2563eb"
                                                            : "#e2e8f0",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color:
                                                            selectedFloor === floor
                                                                ? "#fff"
                                                                : "#334155",
                                                        fontWeight: "700"
                                                    }}
                                                >
                                                    {floor}
                                                </Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                    
                                    <Text
                                        style={{
                                            color: "#64748b",
                                            fontSize: 14,
                                            marginBottom: 15,
                                            textAlign: "center"
                                        }}
                                    >
                                        {
                                            occupiedRooms.filter(room =>
                                                room.startsWith(
                                                    String(currentFloor.prefix)
                                                )
                                            ).length
                                        } Occupied • {
                                            currentFloor.count -
                                            occupiedRooms.filter(room =>
                                                room.startsWith(
                                                    String(currentFloor.prefix)
                                                )
                                            ).length
                                        } Available
                                    </Text>
                                    
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            justifyContent: "space-between",
                                            marginBottom: 20
                                        }}
                                    >
                                        {rooms.map(room => {
                                            const occupied =
                                                occupiedRooms.includes(room);
                                    
                                            const selected =
                                                roomNo === room;
                                    
                                            return (
                                                <Pressable
                                                    key={room}
                                                    disabled={
                                                        params.role !== "admin" || occupied
                                                    }
                                                    onPress={() => {
                                                        if (params.role === "admin") {
                                                            setRoomNo(room);
                                                        }
                                                    }}
                                                    style={{
                                                        width: "18%",
                                                        aspectRatio: 1,
                                                        marginBottom: 10,
                                                        borderRadius: 12,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        backgroundColor:
                                                            occupied
                                                                ? "#fecaca"
                                                                : selected
                                                                ? "#2563eb"
                                                                : "#fff",
                                                        borderWidth: 1,
                                                        borderColor:
                                                            occupied
                                                                ? "#dc2626"
                                                                : selected
                                                                ? "#2563eb"
                                                                : "#cbd5e1",
                                                        opacity:
                                                            params.role !== "admin"
                                                                ? 0.6
                                                                : 1
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontWeight: "700",
                                                            color:
                                                                occupied
                                                                    ? "#b91c1c"
                                                                    : selected
                                                                    ? "#fff"
                                                                    : "#0f172a"
                                                        }}
                                                    >
                                                        {room}
                                                    </Text>
                                                </Pressable>
                                            );
                                        })}
                                    </View>
                                    
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            marginBottom: 24
                                        }}
                                    >
                                        <Text>🟢 Available</Text>
                                        <Text>🔵 Selected</Text>
                                        <Text>🔴 Occupied</Text>
                                    </View>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            fontSize: 16,
                                            fontWeight: "700",
                                            color: roomNo ? "#2563eb" : "#64748b",
                                            marginBottom: 20
                                        }}
                                    >
                                        {
                                            roomNo
                                                ? `Selected Room: ${roomNo}`
                                                : "No Room Selected"
                                        }
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        marginBottom: 24
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#64748b",
                                            fontSize: 14,
                                            marginBottom: 6
                                        }}
                                    >
                                        Disease
                                    </Text>

                                    <TextInput
                                        value={disease}
                                        editable={params.role === "doctor"}
                                        onChangeText={setDisease}
                                        multiline
                                        style={{
                                            backgroundColor:
                                                params.role === "doctor"
                                                    ? "#fff"
                                                    : "#f8fafc",
                                            borderWidth: 1,
                                            borderColor: "#2563eb",
                                            borderRadius: 12,
                                            padding: 14,
                                            minHeight: 100,
                                            textAlignVertical: "top",
                                            color: "#0f172a"
                                        }}
                                    />
                                </View>

                                <CustomButton
                                    title="Save Changes"
                                    onPress={() => handleSubmit()}
                                />
                            </>
                        ) : params.type === "doctor" ? (
                            <DynamicForm
                                fields={getFields()}
                                initialValues={data}
                                buttonText="Save Changes"
                                onSubmit={handleSubmit}
                            />
                        ) : null
                    }
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}