import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./features/AppointmentRedux";


const rootReducer = combineReducers({
    appointment : appointmentReducer,
});

const Store = configureStore({
    reducer : rootReducer
});

export default Store;