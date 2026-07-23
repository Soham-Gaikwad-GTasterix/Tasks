import { View, Text, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, Pressable } from "react-native";

import { Dropdown } from "react-native-element-dropdown";

import { useState, useEffect } from "react";

import { router, useLocalSearchParams } from "expo-router";

import NavigationHeader from "@/components/NavigationHeader";

import DynamicForm from "@/components/DynamicForm";

import CustomButton from "@/components/CustomButton";

import { updateDoctor, getDoctors } from "@/services/doctorService";

import { updatePatient, getPatients } from "@/services/patientService";

import {
    showSuccess,
    showError
} from "@/services/toastService";

export default function EditDetails() {
    const params = useLocalSearchParams();

    const data = JSON.parse(params.data);

    const [disease, setDisease] = useState(data.disease);

    const [doctors, setDoctors] = useState([]);

    const [doctorId, setDoctorId] = useState(
        data.doctorId || ""
    );

    const [doctorName, setDoctorName] = useState(
        data.doctorName || ""
    );

    const [bedNo, setBedNo] = useState(
        data.bedNo || ""
    );

    const [occupiedSemiBeds, setOccupiedSemiBeds] =
        useState({});

    const currentRoom =
        (data.roomNo || "").match(/\d+/)?.[0] || "";

    const currentPrefix = currentRoom.charAt(0);

    const floorMap = {
        "0": "General",
        "2": "ICU",
        "3": "Private",
        "4": "Deluxe"
    };

    const initialFloor =
        currentRoom.startsWith("1")
            ? "Semi"
            : floorMap[currentPrefix] || "General";

    const [selectedFloor, setSelectedFloor] = useState(initialFloor);

    const [roomNo, setRoomNo] = useState(currentRoom);

    const [occupiedRooms, setOccupiedRooms] = useState([]);

    useEffect(() => {

        async function loadData() {

            if (params.type !== "patient") {
                return;
            }

            const [
                patients,
                doctorList
            ] = await Promise.all([
                getPatients(),
                getDoctors()
            ]);

            setDoctors(doctorList);

            const admitted =
                patients.filter(
                    patient =>
                        patient.status === "Admitted" &&
                        patient.id !== data.id
                );

            setOccupiedRooms(
                admitted.map(
                    patient => patient.roomNo
                )
            );

            const semi = {};

            admitted.forEach(patient => {

                if (
                    patient.roomNo &&
                    patient.roomNo.startsWith("1")
                ) {

                    if (!semi[patient.roomNo]) {
                        semi[patient.roomNo] = [];
                    }

                    if (patient.bedNo) {
                        semi[
                            patient.roomNo
                        ].push(
                            patient.bedNo
                        );
                    }

                }

            });

            setOccupiedSemiBeds(semi);

        }

        loadData();

    }, []);

    const roomConfig = {

        General: {
            prefix: 0,
            count: 50
        },

        Semi: {
            custom: true
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

    const semiRooms = [

        {
            room: "101",
            beds: ["A", "B"]
        },
        {
            room: "102",
            beds: ["A", "B"]
        },
        {
            room: "103",
            beds: ["A", "B"]
        },
        {
            room: "104",
            beds: ["A", "B"]
        },
        {
            room: "105",
            beds: ["A", "B"]
        },

        {
            room: "106",
            beds: ["A", "B", "C"]
        },
        {
            room: "107",
            beds: ["A", "B", "C"]
        },
        {
            room: "108",
            beds: ["A", "B", "C"]
        },
        {
            room: "109",
            beds: ["A", "B", "C"]
        },
        {
            room: "110",
            beds: ["A", "B", "C"]
        }

    ];

    const currentFloor =
        roomConfig[selectedFloor] ||
        roomConfig.General;

    const rooms =
        selectedFloor === "Semi"
            ? semiRooms
            : Array.from(
                {
                    length: currentFloor.count
                },
                (_, index) =>
                    `${currentFloor.prefix}${String(
                        index + 1
                    ).padStart(2, "0")}`
            );
        
    const selectedSemiRoom =
        semiRooms.find(
            room => room.room === roomNo
        );

    const occupiedBeds =
        occupiedSemiBeds[roomNo] || [];

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

        try {

            if (params.type === "patient") {

                if (params.role === "admin") {

                    if (!roomNo) {

                        showError(
                            "Please select a room."
                        );

                        return;
                    }

                    if (
                        selectedFloor === "Semi"
                    ) {

                        if (!bedNo) {

                            showError(
                                "Please select a bed."
                            );

                            return;
                        }

                        const roomPatients =
                            (
                                await getPatients()
                            ).filter(
                                patient =>
                                    patient.id !== data.id &&
                                    patient.status ===
                                        "Admitted" &&
                                    patient.roomNo ===
                                        roomNo
                            );

                        const limit =
                            roomNo <= "105"
                                ? 2
                                : 3;

                        if (
                            roomPatients.length >=
                            limit
                        ) {

                            showError(
                                "This room is already full."
                            );

                            return;
                        }

                        if (
                            roomPatients.some(
                                patient =>
                                    patient.bedNo ===
                                    bedNo
                            )
                        ) {

                            showError(
                                "Selected bed is already occupied."
                            );

                            return;
                        }

                    } else {

                        const roomOccupied =
                            (
                                await getPatients()
                            ).find(
                                patient =>
                                    patient.id !==
                                        data.id &&
                                    patient.status ===
                                        "Admitted" &&
                                    patient.roomNo ===
                                        roomNo
                            );

                        if (roomOccupied) {

                            showError(
                                "Selected room is already occupied."
                            );

                            return;

                        }

                    }

                    await updatePatient(
                        data.id,
                        {
                            ...data,

                            doctorId,

                            doctorName,

                            roomNo,

                            roomType:
                                selectedFloor,

                            bedNo:
                                selectedFloor ===
                                "Semi"
                                    ? bedNo
                                    : "",

                            disease:
                                data.disease
                        }
                    );

                } else {

                    await updatePatient(
                        data.id,
                        {
                            ...data,

                            disease
                        }
                    );

                }

            } else if (
                params.type === "doctor"
            ) {

                await updateDoctor(
                    data.id,
                    values
                );

            } else {

                return;

            }

            showSuccess(
                "Details Updated Successfully"
            );

            router.back();

        } catch (error) {

            console.log(error);

            showError(
                "Failed to Update Details"
            );

        }

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

                                    {
                                        params.role === "admin" && (
                                            <>
                                                <Text
                                                    style={{
                                                        color: "#64748b",
                                                        marginBottom: 8,
                                                        fontSize: 14
                                                    }}
                                                >
                                                    Assigned Doctor
                                                </Text>

                                                <View
                                                    style={{
                                                        marginBottom: 20,
                                                        borderRadius: 18,
                                                        backgroundColor: "#fff",
                                                        elevation: 5,
                                                        shadowColor: "#000",
                                                        shadowOpacity: 0.08,
                                                        shadowRadius: 8,
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 4
                                                        }
                                                    }}
                                                >
                                                    <Dropdown
                                                        style={{
                                                            height: 58,
                                                            borderRadius: 18,
                                                            paddingHorizontal: 18,
                                                            backgroundColor: "#fff"
                                                        }}
                                                        placeholderStyle={{
                                                            color: "#94a3b8",
                                                            fontSize: 16
                                                        }}
                                                        selectedTextStyle={{
                                                            color: "#0f172a",
                                                            fontSize: 16
                                                        }}
                                                        data={doctors.map(doctor => ({
                                                            label: doctor.name,
                                                            value: doctor.id
                                                        }))}
                                                        labelField="label"
                                                        valueField="value"
                                                        placeholder="Select Doctor"
                                                        value={doctorId}
                                                        search
                                                        maxHeight={300}
                                                        activeColor="#dbeafe"
                                                        containerStyle={{
                                                            borderRadius: 18
                                                        }}
                                                        onChange={item => {
                                                            setDoctorId(item.value);

                                                            const selectedDoctor =
                                                                doctors.find(
                                                                    doctor =>
                                                                        doctor.id === item.value
                                                                );

                                                            setDoctorName(
                                                                selectedDoctor?.name || ""
                                                            );
                                                        }}
                                                    />
                                                </View>
                                            </>
                                        )
                                    }

                                    <Text
                                        style={{
                                            color: "#64748b",
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

                                        {
                                            Object.keys(roomConfig).map(
                                                floor => (

                                                    <Pressable
                                                        key={floor}
                                                        onPress={() => {

                                                            setSelectedFloor(
                                                                floor
                                                            );

                                                            setRoomNo("");

                                                            setBedNo("");

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
                                                                fontWeight: "700",
                                                                fontSize: 12
                                                            }}
                                                        >
                                                            {floor}
                                                        </Text>

                                                    </Pressable>

                                                )
                                            )
                                        }

                                    </View>

                                    {
                                        selectedFloor !== "Semi" && (

                                            <>
                                                <Text
                                                    style={{
                                                        color: "#64748b",
                                                        textAlign: "center",
                                                        marginBottom: 15
                                                    }}
                                                >
                                                    {
                                                        occupiedRooms.filter(
                                                            room =>
                                                                room.startsWith(
                                                                    String(
                                                                        currentFloor.prefix
                                                                    )
                                                                )
                                                        ).length
                                                    }
                                                    {" "}Occupied •{" "}
                                                    {
                                                        currentFloor.count -
                                                        occupiedRooms.filter(
                                                            room =>
                                                                room.startsWith(
                                                                    String(
                                                                        currentFloor.prefix
                                                                    )
                                                                )
                                                        ).length
                                                    }
                                                    {" "}Available
                                                </Text>

                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        flexWrap: "wrap",
                                                        justifyContent:
                                                            "space-between",
                                                        marginBottom: 20
                                                    }}
                                                >

                                                    {
                                                        rooms.map(room => {

                                                            const occupied =
                                                                occupiedRooms.includes(
                                                                    room
                                                                );

                                                            const selected =
                                                                roomNo === room;

                                                            return (

                                                                <Pressable
                                                                    key={room}
                                                                    disabled={
                                                                        params.role !==
                                                                            "admin" ||
                                                                        occupied
                                                                    }
                                                                    onPress={() => {

                                                                        setRoomNo(
                                                                            room
                                                                        );

                                                                        setBedNo("");

                                                                    }}
                                                                    style={{
                                                                        width: "18%",
                                                                        aspectRatio: 1,
                                                                        marginBottom: 10,
                                                                        borderRadius: 12,
                                                                        justifyContent:
                                                                            "center",
                                                                        alignItems:
                                                                            "center",
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
                                                                            params.role !==
                                                                            "admin"
                                                                                ? 0.6
                                                                                : 1
                                                                    }}
                                                                >

                                                                    <Text
                                                                        style={{
                                                                            fontWeight:
                                                                                "700",
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

                                                        })
                                                    }

                                                </View>
                                            </>
                                        )
                                    }

                                    {
                                        selectedFloor === "Semi" && (
                                            <>
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: "#64748b",
                                                        marginBottom: 15
                                                    }}
                                                >
                                                    Select a Semi Room
                                                </Text>

                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        flexWrap: "wrap",
                                                        justifyContent: "space-between",
                                                        marginBottom: 20
                                                    }}
                                                >

                                                    {
                                                        semiRooms.map(room => {

                                                            const occupied =
                                                                occupiedSemiBeds[
                                                                    room.room
                                                                ] || [];

                                                            const full =
                                                                occupied.length >=
                                                                room.beds.length;

                                                            const selected =
                                                                room.room === roomNo;

                                                            return (

                                                                <Pressable
                                                                    key={room.room}
                                                                    disabled={
                                                                        params.role !==
                                                                            "admin" ||
                                                                        full
                                                                    }
                                                                    onPress={() => {

                                                                        setRoomNo(
                                                                            room.room
                                                                        );

                                                                        setBedNo("");

                                                                    }}
                                                                    style={{
                                                                        width: "31%",
                                                                        paddingVertical: 16,
                                                                        borderRadius: 14,
                                                                        marginBottom: 12,
                                                                        backgroundColor:
                                                                            full
                                                                                ? "#fecaca"
                                                                                : selected
                                                                                ? "#2563eb"
                                                                                : "#fff",
                                                                        borderWidth: 1,
                                                                        borderColor:
                                                                            full
                                                                                ? "#dc2626"
                                                                                : selected
                                                                                ? "#2563eb"
                                                                                : "#cbd5e1",
                                                                        alignItems: "center",
                                                                        opacity:
                                                                            params.role !==
                                                                            "admin"
                                                                                ? 0.6
                                                                                : 1
                                                                    }}
                                                                >

                                                                    <Text
                                                                        style={{
                                                                            fontWeight: "700",
                                                                            color:
                                                                                full
                                                                                    ? "#b91c1c"
                                                                                    : selected
                                                                                    ? "#fff"
                                                                                    : "#0f172a"
                                                                        }}
                                                                    >
                                                                        {room.room}
                                                                    </Text>

                                                                    <Text
                                                                        style={{
                                                                            marginTop: 6,
                                                                            fontSize: 12,
                                                                            color:
                                                                                full
                                                                                    ? "#b91c1c"
                                                                                    : selected
                                                                                    ? "#dbeafe"
                                                                                    : "#64748b"
                                                                        }}
                                                                    >
                                                                        {
                                                                            occupied.length
                                                                        }
                                                                        /
                                                                        {
                                                                            room.beds.length
                                                                        }
                                                                        Occupied
                                                                    </Text>

                                                                </Pressable>

                                                            );

                                                        })
                                                    }

                                                </View>
                                                    {
                                                        roomNo !== "" && (

                                                            <>
                                                                <Text
                                                                    style={{
                                                                        color: "#64748b",
                                                                        marginBottom: 12,
                                                                        fontWeight: "600"
                                                                    }}
                                                                >
                                                                    Select Bed
                                                                </Text>

                                                                <View
                                                                    style={{
                                                                        flexDirection: "row",
                                                                        justifyContent: "space-evenly",
                                                                        marginBottom: 24
                                                                    }}
                                                                >

                                                                    {
                                                                        selectedSemiRoom?.beds.map(
                                                                            bed => {

                                                                                const occupied =
                                                                                    occupiedBeds.includes(
                                                                                        bed
                                                                                    );

                                                                                const selected =
                                                                                    bedNo === bed;

                                                                                return (

                                                                                    <Pressable
                                                                                        key={bed}
                                                                                        disabled={
                                                                                            params.role !==
                                                                                                "admin" ||
                                                                                            occupied
                                                                                        }
                                                                                        onPress={() =>
                                                                                            setBedNo(
                                                                                                bed
                                                                                            )
                                                                                        }
                                                                                        style={{
                                                                                            width: 70,
                                                                                            height: 70,
                                                                                            borderRadius: 35,
                                                                                            justifyContent:
                                                                                                "center",
                                                                                            alignItems:
                                                                                                "center",
                                                                                            backgroundColor:
                                                                                                occupied
                                                                                                    ? "#fecaca"
                                                                                                    : selected
                                                                                                    ? "#2563eb"
                                                                                                    : "#fff",
                                                                                            borderWidth: 2,
                                                                                            borderColor:
                                                                                                occupied
                                                                                                    ? "#dc2626"
                                                                                                    : selected
                                                                                                    ? "#2563eb"
                                                                                                    : "#cbd5e1",
                                                                                            opacity:
                                                                                                params.role !==
                                                                                                "admin"
                                                                                                    ? 0.6
                                                                                                    : 1
                                                                                        }}
                                                                                    >

                                                                                        <Text
                                                                                            style={{
                                                                                                fontSize: 18,
                                                                                                fontWeight:
                                                                                                    "700",
                                                                                                color:
                                                                                                    occupied
                                                                                                        ? "#b91c1c"
                                                                                                        : selected
                                                                                                        ? "#fff"
                                                                                                        : "#0f172a"
                                                                                            }}
                                                                                        >
                                                                                            {bed}
                                                                                        </Text>

                                                                                    </Pressable>

                                                                                );

                                                                            }
                                                                        )
                                                                    }

                                                                </View>
                                                            </>
                                                        )
                                                    }

                                                    <View
                                                        style={{
                                                            flexDirection: "row",
                                                            justifyContent: "space-around",
                                                            marginBottom: 20
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
                                                            color:
                                                                roomNo
                                                                    ? "#2563eb"
                                                                    : "#64748b",
                                                            marginBottom: 20
                                                        }}
                                                    >
                                                        {
                                                            roomNo
                                                                ? `Selected : ${roomNo}${
                                                                    bedNo
                                                                        ? ` (Bed ${bedNo})`
                                                                        : ""
                                                                }`
                                                                : "No Room Selected"
                                                        }
                                                    </Text>

                                                </>
                                            )
                                        }

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
                                        placeholder="Disease"
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
                                            color: "#0f172a",
                                            opacity:
                                                params.role === "doctor"
                                                    ? 1
                                                    : 0.7
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