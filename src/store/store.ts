import {combineReducers, configureStore} from "@reduxjs/toolkit";
import carReducer from "./slices/car.slice";


const rootReducer = combineReducers({
    car: carReducer
})


export const setupStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
