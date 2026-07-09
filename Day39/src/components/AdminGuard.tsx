import {
    useState,
    useEffect
} from "react";

import { router } from "expo-router";

import{ getUser } from "@/storage/authStorage";

export default function AdminGuard({
    children
}) {
    const [
        loading,
        setLoading
    ] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser() {
        const user = await getUser();
        if (
            !user || user.role !== "admin"
        ) {
            router.replace(
                "/index"
            );
            return;
        }
        setLoading(false);
    }
    if (loading) {
        return null;
    }
    return children;
}