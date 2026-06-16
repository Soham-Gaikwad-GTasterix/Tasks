import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.0.104:3000", //local Address
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