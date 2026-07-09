import { View, Text, Image, Alert, Pressable, ScrollView } from "react-native";

import ScreenTitle from "../../components/ScreenTitle";

import { router } from "expo-router";

import CustomButton from "@/components/CustomButton";

import { logout, getUser } from "@/storage/authStorage";

import { useState, useRef, useEffect } from "react";

import * as ImagePicker from "expo-image-picker";

import { CameraView, useCameraPermissions } from "expo-camera";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { getDoctors } from "@/services/doctorService";

export default function DoctorProfile() {

    const [doctor, setDoctor] = useState(null);

    const [photo, setPhoto] = useState(null);

    const [showCamera, setShowCamera] = useState(false);

    const cameraRef = useRef(null);

    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        async function loadPhoto() {

            try {
                const currentUser = await getUser();

                const doctors = await getDoctors();

                const currentDoctor = doctors.find(
                    item => item.id === currentUser.doctorId
                );

                setDoctor(currentDoctor);

                if (currentDoctor) {
                    const savedPhoto = await AsyncStorage.getItem(`profilePhoto_${currentDoctor.id}`);
                    if (savedPhoto) {
                        setPhoto(savedPhoto);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        loadPhoto();
    }, []);

    async function savePhoto(uri) {
        if(!doctor) {
            return;
        }
        setPhoto(uri);
        await AsyncStorage.setItem(`profilePhoto_${doctor.id}`, uri);
    }

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1
        });
        if (!result.canceled) {
            await savePhoto(result.assets[0].uri);
        }
    }

    async function openCamera(){
        if (!permission?.granted) {
            const response = await requestPermission();
            if (!response.granted) {
                Alert.alert(
                    "Permission Required",
                    "Camera access is required to takw photos."
                );
                return;
            }
        }
        setShowCamera(true);
    }

    async function takePhoto() {
        if (!cameraRef.current) {
            return;
        }
        try {
            const photoData = await cameraRef.current.takePictureAsync({
                quality: 1
            });
            await savePhoto(photoData.uri);
            setShowCamera(false);
            Alert.alert(
                "Success",
                "Photo captured successfully"
            );
        } catch (error) {
            Alert.alert(
                "Error",
                "Failed to capture photo"
            );
        }
    }

    async function handleLogout() {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        await logout();
                        router.replace(
                            "/login"
                        );
                    }
                }
            ]
        );
    }

    if (showCamera) {
        return (
            <CameraView
                ref={cameraRef}
                style={{
                    flex: 1
                }}
                facing="front"
            >
                <Pressable
                    onPress={() => setShowCamera(false)}
                    style={{
                        position: "absolute",
                        top: 60,
                        right: 24,
                        zIndex: 100,
                        width: 46,
                        height: 46,
                        borderRadius: 23,
                        backgroundColor: "#00000080",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 26,
                            fontWeight: "700"
                        }}
                    >
                        ✕
                    </Text>
                </Pressable>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "center",
                        paddingBottom: 40
                    }}
                >
                    <Pressable
                        onPress={takePhoto}
                        style={{
                            width: 86,
                            height: 86,
                            borderRadius: 43,
                            borderWidth: 5,
                            borderColor: "#fff",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#ffffff26"
                        }}
                    >
                        <View
                            style={{
                                width: 66,
                                height: 66,
                                borderRadius: 33,
                                backgroundColor: "#fff"
                            }}
                        />
                    </Pressable>
                </View>
            </CameraView>
        );
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#f4f8fc"
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 40
                }}
            >
                <ScreenTitle
                    title="Profile"
                />

                <View
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 28,
                        padding: 24,
                        borderWidth: 1,
                        alignItems: "center",
                        elevation: 6,
                        shadowColor: "#000",
                        shadowOpacity: 0.08,
                        shadowRadius: 8,
                        shadowOffset: {
                            width: 0,
                            height: 4
                        },
                        marginTop: 20
                    }}
                >
                    {
                        photo ? (
                            <Image
                                source={{uri: photo}}
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: 70,
                                    borderWidth: 4,
                                    borderColor: "#2563eb",
                                    marginBottom: 18
                                }}
                            />
                        ): (
                            <View
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: 70,
                                    borderWidth: 4,
                                    borderColor: "#2563eb",
                                    backgroundColor: "#dbeafe",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginVertical: 18
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 52
                                    }}
                                >
                                    🧑🏽‍⚕️
                                </Text>
                            </View>
                        )
                    }
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "700",
                            color: "#0f172a"
                        }}
                    >
                        Dr. {doctor?.name}
                    </Text>
                    <Text
                        style={{
                            color: "#64748b",
                            marginTop: 4
                        }}
                    >
                        {doctor?.specialization}
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: 20,
                        backgroundColor: "#fff",
                        borderRadius: 22,
                        padding:20,
                        elevation: 3
                    }}
                >                    
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Email
                    </Text>
                    <Text
                        style={{
                            color: "#0f172a",
                            fontSize: 17,
                            fontWeight: "600",
                            marginBottom: 16
                        }}
                    >
                        {doctor?.email}
                    </Text>
                    
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Department
                    </Text>
                    <Text
                        style={{
                            color: "#0f172a",
                            fontSize: 17,
                            fontWeight: "600",
                            marginBottom: 16
                        }}
                    >
                        {doctor?.department}
                    </Text>

                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Qualification
                    </Text>
                    <Text
                        style={{
                            color: "#0f172a",
                            fontSize: 17,
                            fontWeight: "600",
                            marginBottom: 16
                        }}
                    >
                        {doctor?.qualification}
                    </Text>

                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Experience
                    </Text>
                    <Text
                        style={{
                            color: "#0f172a",
                            fontSize: 17,
                            fontWeight: "600",
                            marginBottom: 16
                        }}
                    >
                        {doctor?.experience}
                    </Text>

                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 14
                        }}
                    >
                        Phone Number
                    </Text> 
                    <Text
                        style={{
                            color: "#0f172a",
                            fontSize: 17,
                            fontWeight: "600",
                            marginBottom: 16
                        }}
                    >
                        {doctor?.phoneNo}
                    </Text>                   
                </View>    

                <Pressable
                    onPress={pickImage}
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 18,
                        marginTop: 24,
                        padding: 18,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        elevation: 3
                    }}
                >
                    <Text
                        style={{
                            fontSize: 17,
                            color: "#0f172a",
                            fontWeight: "600"
                        }}
                    >
                        🖼️ Choose Photo
                    </Text>
                    <Text
                        style={{
                            fontSize: 24,
                            color: "#94a3b8"
                        }}
                    >
                        ›
                    </Text>
                </Pressable>
                    
                <Pressable
                    onPress={openCamera}
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 18,
                        marginTop: 14,
                        padding: 18,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        elevation: 3
                    }}
                >
                    <Text
                        style={{
                            fontSize: 17,
                            color: "#0f172a",
                            fontWeight: "600"
                        }}
                    >
                        📸 Take Photo
                    </Text>
                    <Text
                        style={{
                            fontSize: 24,
                            color: "#94a3b8"
                        }}
                    >
                        ›
                    </Text>
                </Pressable>
                
                <View
                    style={{
                        marginTop: 40
                    }}
                >
                    <CustomButton
                        title="Logout"
                        onPress={handleLogout}
                        backgroundColor="#dc2626"
                    />
                </View>
            </ScrollView>
        </View>
    );
}