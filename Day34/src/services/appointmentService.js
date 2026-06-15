import api from "./api";

export async function getAppointments() {
    const response =
        await api.get(
            "/appointments"
        );
    
    return response.data;
}

export async function createAppointment(appointment) {
    const response =
        await api.post(
            "/appointments",
            appointment
        );
    return response.data;
}