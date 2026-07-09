import { useEffect } from "react";

import { router } from "expo-router";

import { getUser } from "../storage/authStorage";

export default function Index() {
    useEffect(() => {
        async function checkAuth() {
            const user =
                await getUser();

            if (!user) {
                router.replace(
                    "/login"
                );
            } else if (
                user.role === "admin"
            ) {
                router.replace(
                    "/(tabs)"
                );
            } else if (
                user.role === "doctor"
            ) {
                router.replace(
                    "/(doctor-tabs)"
                );
            } else {
                router.replace(
                    "/login"
                );
            }
        }

        checkAuth();

    }, []);

    return null;
    
}