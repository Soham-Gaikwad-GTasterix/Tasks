import api from "./api";

export async function getDoctors() {
    const response =
        await api.get(
            "/doctors"
        );
    return response.data;
}

export async function createDoctor(doctor) {
    const response =
        await api.post(
            "/doctors",
            doctor
        );
    return response.data;
}