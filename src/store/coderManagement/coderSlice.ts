import {createSlice} from "@reduxjs/toolkit";
import {Messages} from "./types.ts";

const initialState = {
    messages: [] as Messages[]
}

const CoderSlice = createSlice({
    name: 'coder',
    initialState,
    reducers: {
        addMessagesCoder(state, action) {
            const newMessage = action.payload
            state.messages = [...state.messages, newMessage]
        },
        clearWholeContextCoder(state) {
            state.messages = [] as Messages[]
        }
    }
})

export const {addMessagesCoder, clearWholeContextCoder} = CoderSlice.actions
export default CoderSlice.reducer