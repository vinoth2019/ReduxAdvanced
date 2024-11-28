import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {cartIsVisble: false, notification: null},
    reducers: {
        toggle(state){state.cartIsVisble = !state.cartIsVisble},
        notify(state, action){
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
});
export const uiActions = uiSlice.actions;
export default uiSlice;