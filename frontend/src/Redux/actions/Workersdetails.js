import { Getallworkers, GetallworkersAdmin } from "../../services/worker_services/workser_services";
import { workerRequest, workerSuccess } from "../reducers/Workerdetails";
import jwt_decode from "jwt-decode";

export const WorkersGetdata = () => async (dispatch) => {
    try {
        const tokens = localStorage.getItem("accessToken");
        var decoded = jwt_decode(tokens);
        const fors = {
            userid: decoded?.userid
        }

        dispatch(workerRequest());


            const response = await GetallworkersAdmin();
            if (response) {
                dispatch(workerSuccess(response));
            }

        











    }
    catch (err) {
        // toast.error(err?.response?.data?.message);
        dispatch(workerRequest("Token Expire"));
    }
}

