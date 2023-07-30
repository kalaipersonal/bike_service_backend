
import AxiosConfig from "../../config/Axiosconfig"



export function ProductListEnduser() {

    return new Promise((resolve, reject) => {
        AxiosConfig.get('/customer/allproducts').then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function ProductListEnduserSingle(id) {

    return new Promise((resolve, reject) => {
        AxiosConfig.get(`/customer/singleproducts/${id}`).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}