import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:3000",
    timeout: 10000
});

api.interceptors.request.use(
    async (config) => {
        const AsyncStorage = require("@react-native-async-storage/async-storage").default;

        const token = await AsyncStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }
);

export default api;