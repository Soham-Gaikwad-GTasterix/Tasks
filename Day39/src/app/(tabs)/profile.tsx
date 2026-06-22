import { View, Text, Image, Alert, Linking } from "react-native";

import ScreenTitle from "../../components/ScreenTitle";

import { router } from "expo-router";

import CustomButton from "@/components/CustomButton";

import { logout } from "@/storage/authStorage";

import { useState, useRef, useEffect } from "react";

import * as ImagePicker from "expo-image-picker";

import { CameraView, useCameraPermissions } from "expo-camera";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {

    const [photo, setPhoto] = useState(null);

    const [showCamera, setShowCamera] = useState(false);

    const cameraRef = useRef(null);

    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        async function loadPhoto() {
            const savedPhoto = await AsyncStorage.getItem("profilePhoto");
            if (savedPhoto) {
                setPhoto(savedPhoto);
            }
        }
        loadPhoto();
    }, []);

    async function savePhoto(uri) {
        setPhoto(uri);
        await AsyncStorage.setItem("profilePhoto", uri);
    }

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1
        });
        if (!result.canceled) {
            setPhoto(
                result.assets[0].uri
            );
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
                <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        padding: 20
                    }}
                >
                    <CustomButton
                        title="Capture Photo"
                        onPress={takePhoto}
                    />
                    <CustomButton
                        title="Close Camera"
                        onPress={() => setShowCamera(false)}
                    />
                </View>
            </CameraView>
        );
    }

    return (
        <View
            style={{
                flex: 1,
                padding: 20
            }}
        >
            <ScreenTitle
                title="Profile"
            />

            <View
                style={{
                    padding: 20,
                    borderWidth: 1,
                    borderRadius: 16,
                    margin: 20
                }}
            >
                <Text>
                    Admin Profile
                </Text>
                {
                    photo ? (
                        <Image
                            source={{uri: photo}}
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 75,
                                alignSelf: "center",
                                marginVertical: 20
                            }}
                        />
                    ): (
                        <View
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 75,
                                backgroundColor: "#e5e7eb",
                                alignSelf: "center",
                                justifyContent: "center",
                                alignItems: "center",
                                marginVertical: 20
                            }}
                        >
                            <Text>No Photo</Text>
                        </View>
                    )
                }
                
                <CustomButton
                    title="Choose Photo"
                    onPress={pickImage}
                />
                <CustomButton
                    title="Take Photo"
                    onPress={openCamera}
                />
                <CustomButton
                    title="Logout"
                    onPress={handleLogout}
                    backgroundColor="#dc2626"
                />
            </View>
        </View>
    );
}