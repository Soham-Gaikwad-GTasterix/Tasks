import{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import hospitalApi from "../api/hospitalApi";

export const fetchPatients =
    createAsyncThunk(
        "patients/fetchPatients",
        async () => {
            const response =
                await hospitalApi.get(
                    "/patients"
                );
            return response.data;
        }
    );

export const addPatient =
    createAsyncThunk(
        "patients/addPatient",
        async (patientData) => {
            const response =
                await hospitalApi.post(
                    "/patients",
                    patientData
                );
            return response.data;
        }
    );

export const deletePatient =
    createAsyncThunk(
        "patients/deletePatient",
        async (id) => {
            const response =
                await hospitalApi.delete(
                    `/patients/${id}`
                );
            return id;
        }
    );

export const updatePatient =
    createAsyncThunk(
        "patients/updatePatient",
        async (updatedPatient) => {
            const response =
                await hospitalApi.put(
                    `/patients/${updatedPatient.id}`,
                    updatedPatient
                );
            return response.data;
        }
    );

const patientSlice =
    createSlice({
        name: "patients",
        initialState: {
            data: [],
            loading: false,
            error: null
        },

        extraReducers:
            (builder) => {
                builder
                    .addCase(
                        fetchPatients.pending,
                        (state) => {
                            state.loading = true;

                            state.error = null;
                        }
                    )

                    .addCase(
                        fetchPatients.fulfilled,
                        (state, action) => {
                            state.loading = false;

                            state.data = action.payload;

                            state.error = null;
                        }
                    )

                    .addCase(
                        fetchPatients.rejected,
                        (state, action) => {
                            state.loading = false;

                            state.error = action.error.message;
                        }
                    )

                    .addCase(
                        updatePatient.fulfilled,
                        (state, action) => {
                            state.data = state.data.map(
                                (patient) =>
                                    patient.id === action.payload.id
                                        ? action.payload
                                        : patient
                            )
                        }
                    )

                    .addCase(
                        addPatient.fulfilled,
                        (state, action) => {
                            state.data.push(
                                action.payload
                            );
                        }
                    )

                    .addCase(
                        deletePatient.fulfilled,
                        (state, action) => {
                            state.data = state.data.filter(
                                (patient) =>
                                patient.id !== action.payload
                            );
                        }
                    );
            }
    });

export default
patientSlice.reducer;