
import jwt_decode from "jwt-decode";
import { ToastMessageError, ToastMessageSuccess } from "../../toastmessage/Toastmessage";
import { adminFail, adminRequest, adminSuccess } from "../reducers/userGetadmin";
import { AdminGetUser } from "../../services/login_services/Login_services";

export const AdminActiongetdata = () => async (dispatch) => {
    try {
        const tokens = localStorage.getItem("accessToken");
        var decoded = jwt_decode(tokens);
        const fors = {
            userid: decoded?.userid
        }

        dispatch(adminRequest());

        if (decoded?.userid) {
            const response = await AdminGetUser(fors);


            if (response) {

                dispatch(adminSuccess(response));
            }


        }











    }
    catch (err) {
        // toast.error(err?.response?.data?.message);
        dispatch(adminFail("Token Expire"));


        ToastMessageError("err")

    }
}

