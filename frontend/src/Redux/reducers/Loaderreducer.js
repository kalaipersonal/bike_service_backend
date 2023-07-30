import { createSlice } from "@reduxjs/toolkit";


const Loader_slice = createSlice({
    name: "loader",
    initialState: {
        loading: false,

    },
    reducers: {
        SetLoader: (state, action) => {
            state.loading = action.payload
        },

    }
})


const { actions, reducer } = Loader_slice;


export const { SetLoader } = actions;

export default reducer;