import { createSlice } from "@reduxjs/toolkit";


const admin_data = createSlice({
    name: "admin",
    initialState: {
        loading: false,
        adminuser: []
    },
    reducers: {

        adminRequest(state, action) {
            return {
                loading: true
            }
        },
        adminSuccess(state, action) {
            return {
                loading: false,
                adminuser: action.payload
            }
        },
        adminFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})


const { actions, reducer } = admin_data;


export const { adminRequest, adminSuccess, adminFail } = actions;

export default reducer;