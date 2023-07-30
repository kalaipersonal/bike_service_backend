import AxiosConfig from "../../config/Axiosconfig"



export function OrderBooking(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.post('/order/create', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function OrderAllBooking(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.post('/order/userorders', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}