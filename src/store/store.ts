import {combineReducers, configureStore} from '@reduxjs/toolkit'
import coderSlice from "./coderManagement/coderSlice.ts";
import usualSlice from "./usualManagement/usualSlice.ts";


const rootReducer = combineReducers({
    coder: coderSlice,
    usual: usualSlice,
})

export const store = configureStore({
    reducer: rootReducer,
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch