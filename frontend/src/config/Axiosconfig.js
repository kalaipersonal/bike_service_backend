// import axios from 'axios';
// import { Navigate } from 'react-router-dom';


// const AxiosConfig = axios.create({
//     baseURL: 'http://localhost:8900/bikewash',
//     headers: {
//         Authorization: JSON.parse(localStorage.getItem("accessToken"))
//     }
// });


// AxiosConfig.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// // Add a response interceptor
// AxiosConfig.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     if (response?.status == 401) {
//         localStorage.clear();
//         return <Navigate to="/" />
//     }
//     return response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
// });




// export default AxiosConfig;





import axios from "axios";

import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";


const urlls='http://localhost:8900/bikewash'

axios.interceptors.request.use(
    function (config) {
        if (config) {
            config.url = urlls + config.url;
            return config;
        }
        else {
            const token = localStorage.getItem("accessToken");
            config.url = urlls + config.url;
            var decoded = jwt_decode(token);

            console.log("kalai", decoded)
            if (Date.now() >= decoded.exp * 1000) {
                console.log(decoded, "decoded")
                alert("kalai")
                localStorage.removeItem("accessToken");
                localStorage.removeItem("id");
                window.location.assign("/");
            }

            config.headers = {
                ...config.headers,
                "Content-Type": "application/json",
                Authorization: JSON.parse(token)
            };
            config.withCredentials = true;
            return config;
        }

    },
    function (error) {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        if (error.response.status === 401) {
            return <Navigate
                to={{
                    pathname: "/"
                }}
            />
        } else {
            return Promise.reject(error);
        }
    }
);

const AxiosConfig = axios;

export default AxiosConfig;





