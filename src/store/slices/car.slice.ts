import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICar} from "../../interfaces/car.interface";


interface ICarState {
    items: ICar[],
    update: ICar | null
}

const initialState: ICarState = {
    items: [],
    update: null
}

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<{ car: ICar }>) => {
            state.items.push({...action.payload.car})
        },

        changeStatus: (state, action:PayloadAction<{ car: ICar }>) => {
            state.items.find(item => item.status === action.payload.car.status);

        },
        delItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        }
    }
})

const carReducer = carSlice.reducer;

export default carReducer;

export const {addItem, changeStatus, delItem} = carSlice.actions;




