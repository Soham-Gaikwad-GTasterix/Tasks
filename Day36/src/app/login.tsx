import { View, TextInput, Text } from "react-native";

import { useState } from "react";

import { router } from "expo-router";

import { login } from "../services/authService";

import { saveToken } from "../storage/authStorage";

import CustomButton from "../components/CustomButton";

export default function Login() {
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
            
            await saveToken(
                data.token
            );

            router.replace(
                "/(tabs)"
            );
        } catch {
            alert(
                "Invalid Credentials"
            );
        }
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 20
            }}
        >
            <Text
                style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    marginBottom: 20
                }}
            >
                Login
            </Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{
                    borderWidth: 1,
                    padding: 12,
                    marginBottom: 12
                }}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={{
                    borderWidth: 1,
                    padding: 12,
                    marginBottom: 20
                }}
            />
            <CustomButton
                title="Login"
                onPress={handleLogin}
            />
        </View>
    );
}