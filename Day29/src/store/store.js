import {
    configureStore
} from "@reduxjs/toolkit";

import authReducer from "./authSlice";

import patientReducer from "./patientSlice";

import doctorReducer from "./doctorSlice";

import appointmentReducer from "./appointmentSlice";

export const store =
    configureStore({
        reducer: {
            auth: authReducer,
            patients: patientReducer,
            doctors: doctorReducer,
            appointments: appointmentReducer
        }
    });