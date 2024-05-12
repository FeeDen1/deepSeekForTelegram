import {createSlice} from "@reduxjs/toolkit";
import {Messages} from "./types.ts";

const initialState = {
    messages: [] as Messages[]
}

const UsualSlice = createSlice({
    name: 'usual',
    initialState,
    reducers: {
        addMessagesUsual(state, action) {
            const newMessage = action.payload
            state.messages.push(newMessage)
        },
        clearWholeContextUsual(state) {
            state.messages = [] as Messages[]
        }
    }
})

export const {addMessagesUsual, clearWholeContextUsual} = UsualSlice.actions
export default UsualSlice.reducer