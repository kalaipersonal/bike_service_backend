import { createSlice } from "@reduxjs/toolkit";


const Worker_data = createSlice({
    name: "worker",
    initialState: {
        loading: false,
        workers: []
    },
    reducers: {
        workerRequest(state, action) {
            return {
                loading: true
            }
        },
        workerSuccess(state, action) {
            return {
                loading: false,
                workers: action.payload
            }
        },
        workerFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})


const { actions, reducer } = Worker_data;


export const { workerRequest, workerSuccess, workerFail } = actions;

export default reducer;