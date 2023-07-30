
import { loginFail, loginRequest, loginSuccess } from "../reducers/Usergetdata";
import { AdminGetUser, SellerGetcurrentuser } from "../../services/login_services/Login_services";
import jwt_decode from "jwt-decode";
import { ToastMessageError, ToastMessageSuccess } from "../../toastmessage/Toastmessage";

export const LoginActiongetdata = () => async (dispatch) => {
    try {



        const tokens = localStorage.getItem("accessToken");

        // const tokens = localStorage.getItem("userid");
        var decoded = jwt_decode(tokens);

        console.log(decoded, 'decoded')


        const fors = {
            userid: decoded?.userid
        }

        dispatch(loginRequest());




        if (decoded?.userid) {
            const response = await SellerGetcurrentuser(fors);


            if (response) {

                dispatch(loginSuccess(response));
            }







        }











    }
    catch (err) {
        // toast.error(err?.response?.data?.message);
        dispatch(loginFail("Token Expire"));


        ToastMessageError("err")

    }
}

