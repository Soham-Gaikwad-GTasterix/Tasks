import { View, Text, TextInput, Image, KeyboardAvoidingView, ScrollView, Platform, Pressable } from "react-native";

import NavigationHeader from "../components/NavigationHeader";

import CustomButton from "@/components/CustomButton";

import { router, useLocalSearchParams } from "expo-router";

import { createPatient, getPatients } from "../services/patientService";

import { updateAppointment } from "@/services/appointmentService";

import { nanoid } from "nanoid";

import { useState, useEffect } from "react";

import { getPatientById } from "@/services/authService";

import {
    showSuccess,
    showError
} from "@/services/toastService";

export default function AdmitPatient() {

    const { appointment } = useLocalSearchParams();

    const [appointmentData, setAppointmentData] = useState(null);

    const [disease, setDisease] = useState("");

    const [selectedFloor, setSelectedFloor] = useState("General");

    const [roomNo, setRoomNo] = useState("");

    const [bedNo, setBedNo] = useState("");

    const [occupiedSemiBeds, setOccupiedSemiBeds] = useState({});

    const [occupiedRooms, setOccupiedRooms] = useState([]);

    const [loading, setLoading] = useState(false);

    const [patientProfile, setPatientProfile] = useState(null);

    useEffect(() => {

        async function loadPatient() {

            if (!appointment) {
                return;
            }

            const appointmentObj = JSON.parse(
                appointment
            );

            setAppointmentData(
                appointmentObj
            );

            try {

                const profile =
                    await getPatientById(
                        appointmentObj.patientUserId
                    );

                setPatientProfile(profile);

                const patients = await getPatients();

                const admitted = patients.filter(
                    p => p.status === "Admitted"
                );

                setOccupiedRooms(
                    admitted.map(
                        p => p.roomNo
                    )
                );

                const semi = {};

                admitted.forEach(patient => {

                    if (patient.roomNo.startsWith("S")) {

                        if (!semi[patient.roomNo]) {
                            semi[patient.roomNo] = [];
                        }

                        semi[patient.roomNo].push(patient.bedNo);
                    }

                });

                setOccupiedSemiBeds(semi);

            } catch (error) {

                console.log(error);

            }

        }

        loadPatient();

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
        { room: "101", beds: ["A", "B"] },
        { room: "102", beds: ["A", "B"] },
        { room: "103", beds: ["A", "B"] },
        { room: "104", beds: ["A", "B"] },
        { room: "105", beds: ["A", "B"] },

        { room: "106", beds: ["A", "B", "C"] },
        { room: "107", beds: ["A", "B", "C"] },
        { room: "108", beds: ["A", "B", "C"] },
        { room: "109", beds: ["A", "B", "C"] },
        { room: "110", beds: ["A", "B", "C"] }
    ];

    const currentFloor =
        roomConfig[selectedFloor] || roomConfig.General;

    const rooms =
        selectedFloor === "Semi"
            ? semiRooms
            : Array.from(
                {
                    length: currentFloor.count
                },
                (_, index) =>
                    `${currentFloor.prefix}${String(index + 1).padStart(2, "0")}`
            );

    async function handleAdmit() {

        setLoading(true);

        if (!disease.trim()) {
            showError("Please enter the diagnosed disease.");
            setLoading(false);
            return;
        }

        if (!roomNo.trim()) {
            showError("Please select a room.");
            setLoading(false);
            return;
        }

        if (
            selectedFloor === "Semi" &&
            !bedNo
        ) {
            showError("Please select a bed.");
            setLoading(false);
            return;
        }

        if (appointmentData.status === "Completed") {
            showError("This appointment has already been completed.");
            setLoading(false);
            return;
        }

    try {
        
        const patients = await getPatients();

        if (selectedFloor !== "Semi") {

            const roomOccupied = patients.find(
                p =>
                    p.roomNo === roomNo &&
                    p.status === "Admitted"
            );

            if (roomOccupied) {

                showError(
                    `Room ${roomNo} is already assigned to ${roomOccupied.name}.`
                );

                setLoading(false);

                return;
            }

        } else {

            const roomPatients =
                patients.filter(
                    p =>
                        p.roomNo === roomNo &&
                        p.status === "Admitted"
                );

            const limit =
                roomNo <= "105"
                    ? 2
                    : 3;

            if (roomPatients.length >= limit) {

                showError(
                    "This room is already full."
                );

                setLoading(false);

                return;
            }

            if (
                roomPatients.some(
                    p => p.bedNo === bedNo
                )
            ) {

                showError(
                    "Selected bed is already occupied."
                );

                setLoading(false);

                return;
            }

        }

        const alreadyAdmitted = patients.find(
            p => p.appointmentId === appointmentData.id
        );

        if (alreadyAdmitted) {
            showError("This appointment has already been admitted.");
            setLoading(false);
            return;
        }

        await createPatient({

            id: `PAT-${nanoid(8)}`,
            appointmentId: appointmentData.id,
            patientUserId: patientProfile.patientUserId,
            name:patientProfile.name,
            email:patientProfile.email,
            age:patientProfile.age,
            gender:patientProfile.gender,
            phoneNo:patientProfile.phoneNo,
            bloodGroup:patientProfile.bloodGroup,
            photo:patientProfile.photo,
            doctorId:appointmentData.doctorId,
            doctorName:appointmentData.doctor,
            disease,
            roomNo,
            roomType: selectedFloor,
            bedNo:
                selectedFloor === "Semi"
                    ? bedNo
                    : "",
            admissionDate:
                new Date()
                    .toISOString()
                    .split("T")[0],

            dischargeDate: "",
            status: "Admitted"
        });

        await updateAppointment(
            appointmentData.id,
            {
                status: "Completed"
            }
            
        );
        
        setLoading(false);

        showSuccess("Patient admitted successfully.");

        setTimeout(() => {
            router.replace(
                "/(doctor-tabs)/patients"
            );
        }, 1200);
    } catch (error) {
        console.log(error);

        showError("Failed to admit patient.");

        setLoading(false);
    }
}

    if (
        !appointmentData ||
        !patientProfile
    ) {
        return null;
    }

    return(

        <KeyboardAvoidingView
            style={{
                flex: 1
            }}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : "height"   
            }
        >
            <ScrollView                
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 40
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#f4f8fc"
                    }}
                >
                    <NavigationHeader
                        title="Admit Patient"
                        showBack
                    />
                    <View
                        style={{
                            padding: 20
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: 20,
                                padding: 20,
                                elevation: 3
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 22,
                                    fontWeight: "700",
                                    marginBottom: 20,
                                    color: "#0f172a"
                                }}
                            >
                                Patient Details
                            </Text>
                            {
                                patientProfile.photo ? (
                                    <Image
                                        source={{
                                            uri: patientProfile.photo
                                        }}
                                        style={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: 60,
                                            alignSelf: "center",
                                            marginBottom: 20,
                                            borderWidth: 3,
                                            borderColor: "#2563eb"
                                        }}
                                    />
                                ) : null
                            }
                            <Text
                                style={{
                                    color: "#64748b",
                                    marginTop: 8
                                }}
                            >
                                Name
                            </Text>
                            <TextInput
                                value={patientProfile.name}
                                editable={false}
                                selectTextOnFocus={false}
                                style={{
                                    backgroundColor: "#f8fafc",
                                    borderRadius: 12,
                                    padding: 14,
                                    marginTop: 6,
                                    marginBottom: 14
                                }}
                            />
                            <Text
                                style={{
                                    color: "#64748b",
                                    marginTop: 8
                                }}
                            >
                                Email
                            </Text>
                            <TextInput
                                value={patientProfile.email}
                                editable={false}
                                selectTextOnFocus={false}
                                style={{
                                    backgroundColor: "#f8fafc",
                                    borderRadius: 12,
                                    padding: 14,
                                    marginTop: 6,
                                    marginBottom: 14
                                }}
                            />
                            <Text
                                style={{
                                    color: "#64748b",
                                    marginTop: 8
                                }}
                            >
                                Age
                            </Text>
                            <TextInput
                                value={String(patientProfile.age)}
                                editable={false}
                                selectTextOnFocus={false}
                                style={{
                                    backgroundColor: "#f8fafc",
                                    borderRadius: 12,
                                    padding: 14,
                                    marginTop: 6,
                                    marginBottom: 14
                                }}
                            />
                            <Text
                                style={{
                                    color: "#64748b",
                                    marginTop: 8
                                }}
                            >
                                Gender
                            </Text>
                            <TextInput
                                value={patientProfile.gender}
                                editable={false}
                                selectTextOnFocus={false}
                                style={{
                                    backgroundColor: "#f8fafc",
                                    borderRadius: 12,
                                    padding: 14,
                                    marginTop: 6,
                                    marginBottom: 14
                                }}
                            />
                            <Text
                                style={{
                                    color: "#64748b",
                                    marginTop: 8
                                }}
                            >
                                Phone Number
                            </Text>
                            <TextInput
                                value={patientProfile.phoneNo}
                                editable={false}
                                selectTextOnFocus={false}
                                style={{
                                    backgroundColor: "#f8fafc",
                                    borderRadius: 12,
                                    padding: 14,
                                    marginTop: 6,
                                    marginBottom: 14
                                }}
                            />
                            <Text
                                style={{
                                    color: "#64748b",
                                    marginTop: 8
                                }}
                            >
                                Blood Group
                            </Text>
                            <TextInput
                                value={patientProfile.bloodGroup}
                                editable={false}
                                selectTextOnFocus={false}
                                style={{
                                    backgroundColor: "#f8fafc",
                                    borderRadius: 12,
                                    padding: 14,
                                    marginTop: 6,
                                    marginBottom: 14
                                }}
                            />
                            <Text
                                style={{
                                    color: "#64748b",
                                    marginTop: 8
                                }}
                            >
                                Doctor
                            </Text>
                            <TextInput
                                value={appointmentData.doctor}
                                editable={false}
                                selectTextOnFocus={false}
                                style={{
                                    backgroundColor: "#f8fafc",
                                    borderRadius: 12,
                                    padding: 14,
                                    marginTop: 6,
                                    marginBottom: 14
                                }}
                            />
                            <Text
                                style={{
                                    color: "#64748b",
                                    marginTop: 8
                                }}
                            >
                                Disease
                            </Text>
                            <TextInput
                                value={disease}
                                onChangeText={setDisease}
                                placeholder="Enter Disease"
                                style={{
                                    backgroundColor: "#fff",
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: "#dbeafe",
                                    padding: 14,
                                    marginTop: 6,
                                    marginBottom: 16
                                }}
                            />
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
                                                fontWeight: "700"
                                            }}
                                        >
                                            {floor}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>

                            {
                                selectedFloor !== "Semi" ? (

                                    <>
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
                                                        disabled={occupied}
                                                        onPress={() =>
                                                            setRoomNo(room)
                                                        }
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
                                                                    : "#cbd5e1"
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

                                    </>

                                ) : (

                                    <>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                flexWrap: "wrap",
                                                justifyContent: "space-between",
                                                marginBottom: 20
                                            }}
                                        >

                                            {semiRooms.map(room => {

                                                const occupied =
                                                    occupiedSemiBeds[
                                                        room.room
                                                    ] || [];

                                                const full =
                                                    occupied.length ===
                                                    room.beds.length;

                                                return (

                                                    <Pressable
                                                        key={room.room}
                                                        disabled={full}
                                                        onPress={() => {

                                                            setRoomNo(room.room);

                                                            setBedNo("");

                                                        }}
                                                        style={{
                                                            width: "31%",
                                                            paddingVertical: 15,
                                                            marginBottom: 12,
                                                            borderRadius: 14,
                                                            backgroundColor:
                                                                roomNo === room.room
                                                                    ? "#2563eb"
                                                                    : full
                                                                    ? "#fecaca"
                                                                    : "#fff",
                                                            borderWidth: 1,
                                                            borderColor:
                                                                roomNo === room.room
                                                                    ? "#2563eb"
                                                                    : "#cbd5e1",
                                                            alignItems: "center"
                                                        }}
                                                    >

                                                        <Text
                                                            style={{
                                                                fontWeight: "700",
                                                                color:
                                                                    roomNo === room.room
                                                                        ? "#fff"
                                                                        : "#000"
                                                            }}
                                                        >
                                                            {room.room}
                                                        </Text>

                                                        <Text
                                                            style={{
                                                                marginTop: 6,
                                                                color:
                                                                    roomNo === room.room
                                                                        ? "#fff"
                                                                        : "#64748b"
                                                            }}
                                                        >
                                                            {occupied.length}/{room.beds.length} Beds
                                                        </Text>

                                                    </Pressable>

                                                );

                                            })}

                                        </View>

                                        {
                                            roomNo !== "" && (

                                                <>
                                                    <Text
                                                        style={{
                                                            fontWeight: "700",
                                                            marginBottom: 12,
                                                            color: "#475569"
                                                        }}
                                                    >
                                                        Select Bed
                                                    </Text>

                                                    <View
                                                        style={{
                                                            flexDirection: "row",
                                                            justifyContent: "space-around",
                                                            marginBottom: 20
                                                        }}
                                                    >

                                                        {
                                                            semiRooms
                                                                .find(
                                                                    r =>
                                                                        r.room ===
                                                                        roomNo
                                                                )
                                                                ?.beds.map(
                                                                    bed => {

                                                                        const occupied =
                                                                            (
                                                                                occupiedSemiBeds[
                                                                                    roomNo
                                                                                ] || []
                                                                            ).includes(
                                                                                bed
                                                                            );

                                                                        return (

                                                                            <Pressable
                                                                                key={bed}
                                                                                disabled={
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
                                                                                    justifyContent: "center",
                                                                                    alignItems: "center",
                                                                                    backgroundColor:
                                                                                        occupied
                                                                                            ? "#fecaca"
                                                                                            : bedNo ===
                                                                                            bed
                                                                                            ? "#2563eb"
                                                                                            : "#fff",
                                                                                    borderWidth: 1,
                                                                                    borderColor:
                                                                                        "#cbd5e1"
                                                                                }}
                                                                            >

                                                                                <Text
                                                                                    style={{
                                                                                        fontWeight:
                                                                                            "700",
                                                                                        color:
                                                                                            occupied
                                                                                                ? "#dc2626"
                                                                                                : bedNo ===
                                                                                                bed
                                                                                                ? "#fff"
                                                                                                : "#000"
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

                                    </>
                                )
                            }

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
                                        ? selectedFloor === "Semi"
                                            ? `Selected : ${roomNo} (${bedNo || "No Bed"})`
                                            : `Selected Room : ${roomNo}`
                                        : "No Room Selected"
                                }
                            </Text>
                            {
                                appointmentData.status !== "Completed" && (
                                   <CustomButton
                                        title={loading ? "Admitting..." : "Admit Patient"}
                                        onPress={handleAdmit}
                                        disabled={loading}
                                    /> 
                                )
                            }
                                
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}