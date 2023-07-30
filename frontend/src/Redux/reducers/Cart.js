import { createSlice } from "@reduxjs/toolkit";


const Cart_data = createSlice({
    name: "cart",
    initialState: {
        loading: false,
        Cartdata: []
    },
    reducers: {

        cartRequest(state, action) {
            return {
                loading: true
            }
        },
        cartSuccess(state, action) {
            return {
                loading: false,
                Cartdata: action.payload
            }
        },
        cartFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})


const { actions, reducer } = Cart_data;


export const { cartRequest, cartSuccess, cartFail } = actions;

export default reducer;