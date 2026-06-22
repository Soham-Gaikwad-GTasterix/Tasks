import { useEffect } from "react";

import { router } from "expo-router";

import { getToken } from "../storage/authStorage";

export default function Index() {
    useEffect(() => {
        async function checkAuth() {
            const token =
                await getToken();

            if (token) {
                router.replace(
                    "/(tabs)"
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