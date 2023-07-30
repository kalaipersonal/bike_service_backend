import { cartFail, cartRequest, cartSuccess } from "../reducers/Cart"


export const CartActionsdata = (data) => async (dispatch) => {

    dispatch(cartRequest())
    try {

        dispatch(cartSuccess(data));

    } catch (error) {

        dispatch(cartFail("error cart"))

    }
}