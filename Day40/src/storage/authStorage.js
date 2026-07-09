import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveSession(
    token,
    user
) {
    await AsyncStorage.setItem(
        "token",
        token
    );
    await AsyncStorage.setItem(
        "user",
        JSON.stringify(user)
    );
}

export async function getToken() {
    return await AsyncStorage.getItem("token");
}

export async function getUser() {
    const user = await AsyncStorage.getItem(
        "user"
    );
    return user
        ? JSON.parse(user)
        : null;
}

export async function logout() {
    await AsyncStorage.multiRemove([
        "token",
        "user"
    ]);
}