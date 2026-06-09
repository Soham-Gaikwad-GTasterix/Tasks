import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import hospitalApi from "../api/hospitalApi";

export const fetchDoctors =
    createAsyncThunk(
        "doctors/fetchDoctors",
        async () => {
            const response =
                await hospitalApi.get(
                    "/doctors"
                );
            return response.data;
        }
    );

export const addDoctor =
    createAsyncThunk(
        "doctors/addDoctor",
        async (doctorData) => {
            const response =
                await hospitalApi.post(
                    "/doctors",
                    doctorData
                );
            return response.data;
        }
    );
    
export const deleteDoctor =
    createAsyncThunk(
        "doctors/deleteDoctor",
        async (id) => {
            const response =
                await hospitalApi.delete(
                    `/doctors/${id}`
                );
            return id;
        }
    );
    
export const updateDoctor =
    createAsyncThunk(
        "doctors/updateDoctor",
        async (updatedDoctor) => {
            const response =
                await hospitalApi.put(
                    `/doctors/${updatedDoctor.id}`,
                    updatedDoctor
                );
            return response.data;
        }
    );
    
const doctorSlice =
    createSlice({
        name: "doctors",
        initialState: {
            data: [],
            loading: false,
            error: null
        },

        reducers: {},

        extraReducers:
            (builder) => {
                builder
                    .addCase(
                        fetchDoctors.pending,
                        (state) => {
                            state.loading = true;

                            state.error = null;
                        }
                    )

                    .addCase(
                        fetchDoctors.fulfilled,
                        (state, action) => {
                            state.loading = false;

                            state.data = action.payload;
                        }
                    )

                    .addCase(
                        fetchDoctors.rejected,
                        (state, action) => {
                            state.loading = false;

                            state.error = action.error.message;
                        }
                    )

                    .addCase(
                        addDoctor.fulfilled,
                        (state, action) => {
                            state.data.push(
                                action.payload
                            );
                        }
                    )

                    .addCase(
                        deleteDoctor.fulfilled,
                        (state, action) => {
                            state.data = 
                                state.data.filter(
                                    (doctor) =>
                                        doctor.id !== action.payload
                                );
                        }
                    )

                    .addCase(
                        updateDoctor.fulfilled,
                        (state, action) => {
                            state.data =
                                state.data.map(
                                    (doctor) =>
                                        doctor.id === action.payload.id
                                            ? action.payload
                                            : doctor
                                );
                        }
                    );
            }
    });

export default
doctorSlice.reducer;