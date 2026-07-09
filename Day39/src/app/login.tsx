import { View, TextInput, Text } from "react-native";

import { useState } from "react";

import { router } from "expo-router";

import { login } from "../services/authService";

import { saveSession } from "../storage/authStorage";

import CustomButton from "../components/CustomButton";

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

            if (
                data.user.role === "admin"
            ) {
                router.replace(
                    "/(tabs)"
                );
            } else {
                router.replace(
                    "/(doctor-tabs)"
                );
            }
            
        } catch (error) {
            console.log("Logi Error: ", error);

            if (error.response) {
                alert(`Status: ${error.response.status}\n` + JSON.stringify(error.response.data));
            } else if (error.request) {
                alert("Network Error: Cannot connect to backend");
            } else {
                alert(error.message);
            }
        }
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 20,
                backgroundColor: "#f1f8ff"
            }}
        >
            <Text
                style={{
                    fontSize: 60,
                    textAlign: "center",
                    marginBottom: 10
                }}
            >
                🏥
            </Text>
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#1e3a8a"
                }}
            >
                Login
            </Text>
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "600",
                    marginBottom: 20,
                    color: "#0f172a"
                }}
            >
                Welcome Back
            </Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor="#555"
                value={email}
                onChangeText={setEmail}
                style={{
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: "#dbeafe",
                    backgroundColor: "#f8fafc",
                    padding: 14,
                    marginBottom: 15
                }}
            />
            <View
                style={{
                    borderWidth: 1,
                    borderColor: "#dbeafe",
                    backgroundColor: "#f8fafc",
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingRight: 14,
                    marginBottom: 20
                }}
            >
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#555"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    style={{
                        flex: 1,
                        color: "#000",
                        padding: 14,
                        borderRadius: 12
                    }}
                />
                <Text
                    onPress={() => setShowPassword(!showPassword)}
                    style={{
                        color: "#2563eb",
                        fontWeight: "600",
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
    );
}