import { View, TextInput, Text, ImageBackground, StatusBar, Pressable } from "react-native";

import { useState } from "react";

import { router } from "expo-router";

import { login } from "../services/authService";

import { saveSession } from "../storage/authStorage";

import CustomButton from "../components/CustomButton";

import { BlurView } from "expo-blur";

import {
    showSuccess,
    showError
} from "@/services/toastService";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const [
        email,
        setEmail
    ] = useState("");

    const [
        password,
        setPassword
    ] = useState("");

    async function handleLogin() {
        try {

            const data =
                await login(
                    email,
                    password
                );

            await saveSession(
                data.token,
                data.user
            );

            showSuccess("Login Successful");

            if (
                data.user.role === "admin"
            ) {
                router.replace(
                    "/(tabs)"
                );
            } else if (data.user.role === "doctor") {
                router.replace(
                    "/(doctor-tabs)"
                );
            } else if (data.user.role === "patient") {
                router.replace(
                    "/(patient-tabs)"
                );
            } else {
                showError("Unknown user role");
            }

        } catch (error) {

            console.log("Login Error:", error);

            if (error.response) {

                showError(
                    error.response.data?.message ||
                    `Status: ${error.response.status}`
                );

            } else if (error.request) {

                showError("Cannot connect to the server.");

            } else {

                showError(error.message);

            }
        }
    }

    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }}
            resizeMode="cover"
            style={{
                flex: 1
            }}
        >
            <StatusBar
                barStyle="light-content"
            />

            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: 24,
                    backgroundColor: "#00000055"
                }}
            >
                <BlurView
                    intensity={65}
                    tint="light"
                    style={{
                        borderRadius: 30,
                        overflow: "hidden",
                        backgroundColor: "#ffffff66"
                    }}
                >
                    <View
                        style={{
                            padding: 28
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 54,
                                textAlign: "center"
                            }}
                        >
                            🏥
                        </Text>

                        <Text
                            style={{
                                fontSize: 30,
                                fontWeight: "700",
                                textAlign: "center",
                                color: "#0f172a",
                                marginTop: 8
                            }}
                        >
                            Login
                        </Text>

                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: "center",
                                fontWeight: "600",
                                marginBottom: 28,
                                color: "#475569",
                                marginTop: 8
                            }}
                        >
                            Welcome Back
                        </Text>

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#94a3b8"
                            value={email}
                            onChangeText={setEmail}
                            style={{
                                borderWidth: 1,
                                borderRadius: 16,
                                borderColor: "#cbd5e1",
                                backgroundColor: "#fff",
                                padding: 16,
                                marginBottom: 16,
                                color: "#0f172a"
                            }}
                        />

                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: "#cbd5e1",
                                backgroundColor: "#fff",
                                borderRadius: 16,
                                flexDirection: "row",
                                alignItems: "center",
                                paddingRight: 16,
                                marginBottom: 16
                            }}
                        >
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#94a3b8"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                style={{
                                    flex: 1,
                                    color: "#0f172a",
                                    padding: 16,
                                    borderRadius: 12
                                }}
                            />

                            <Text
                                onPress={() =>
                                    setShowPassword(!showPassword)
                                }
                                style={{
                                    color: "#2563eb",
                                    fontWeight: "700",
                                    paddingLeft: 10
                                }}
                            >
                                {
                                    showPassword
                                        ? "Hide"
                                        : "Show"
                                }
                            </Text>
                        </View>

                        <CustomButton
                            title="Login"
                            onPress={handleLogin}
                        />
                    </View>

                    <Text
                        style={{
                            textAlign: "center",
                            marginTop: 24,
                            color: "#64748b",
                            fontSize: 15
                        }}
                    >
                        Don't have an account?
                    </Text>

                    <Pressable
                        onPress={() =>
                            router.push("/register")
                        }
                        style={{
                            marginTop: 12,
                            alignSelf: "center",
                            marginBottom: 28
                        }}
                    >
                        <Text
                            style={{
                                color: "#2563eb",
                                fontSize: 16,
                                fontWeight: "700"
                            }}
                        >
                            Register as Patient
                        </Text>
                    </Pressable>

                </BlurView>
            </View>
        </ImageBackground>
    );
}