import api from "./api";

export async function login(
    email,
    password
) {
    const response =
        await api.post(
            "/login",
            {
                email,
                password
            }
        );
    return response.data;
}

export async function registerPatient(
    patient
) {
    const response = 
        await api.post(
            "/register",
            patient
    );
    return response.data;
}

export async function getPatientById(patientUserId) {

    const response = await api.get(
        `/users/${patientUserId}`
    );

    return response.data;

}