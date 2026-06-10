import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import hospitalApi from "../api/hospitalApi";

export const fetchAppointments =
    createAsyncThunk(
        "appointments/fetchAppointments",
        async () => {
            const response =
                await hospitalApi.get(
                    "appointments"
                );
            return response.data;
        }
    );

export const addAppointment =
    createAsyncThunk(
        "appointments/addAppointment",
        async (appointmentData) => {
            const response =
                await hospitalApi.post(
                    "/appointments",
                    appointmentData
                );
            return response.data;
        }
    );

export const deleteAppointment =
    createAsyncThunk(
        "appointments/deleteAppointment",
        async (id) => {
            await hospitalApi.delete(
                `/appointments/${id}`
            );
            return id;
        }
    );

export const updateAppointment =
    createAsyncThunk(
        "appontments/updateAppointment",
        async (
            updatdAppointment
        ) => {
            const response =
                await hospitalApi.put(
                    `/appointments/${updatdAppointment.id}`,
                    updatdAppointment
                );
            return response.data;
        }
    );

const appointmentSlice =
    createSlice({
        name: "appointments",
        initialState: {
            data: [],
            loading: false,
            error: null
        },

        reducers: {},

        extraReducers:
            (builder)=> {
                builder
                    .addCase(
                        fetchAppointments.pending,
                        (state) => {
                            state.loading = true;

                            state.error = null;
                        }
                    )

                    .addCase(
                        fetchAppointments.fulfilled,
                        (state, action) => {
                            state.loading = false;

                            state.data = action.payload;
                        }
                    )

                    .addCase(
                        fetchAppointments.rejected,
                        (state, action) => {
                            state.loading = false;
                            state.error = action.error.message;
                        }
                    )

                    .addCase(
                        addAppointment.fulfilled,
                        (state, action) => {
                            state.data.push(
                                action.payload
                            );
                        }
                    )

                    .addCase(
                        deleteAppointment.fulfilled,
                        (state, action) => {
                            state.data = state.data.filter(
                                (appointment) =>
                                    appointment.id !== action.payload
                            );
                        }
                    )

                    .addCase(
                        updateAppointment.fulfilled,
                        (state, action) => {
                            state.data = state.data.map(
                                (appointment) =>
                                    appointment.id === action.payload.id
                                        ? action.payload
                                        : appointment
                            );
                        }
                    );
            }
    });

export default
appointmentSlice.reducer;