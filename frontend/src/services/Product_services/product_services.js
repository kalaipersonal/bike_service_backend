import AxiosConfig from "../../config/Axiosconfig"



export function Createproduct(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.post('/product/create', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function Getproduct(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.post('/product/getall', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function GetSingleproduct(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.get(`/product/getsingledata/${data}`).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function UpdateSingleproduct(data, content) {

    return new Promise((resolve, reject) => {
        AxiosConfig.put(`/product/update/${data}`, content).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function DeleteSingleproduct(id) {

    return new Promise((resolve, reject) => {
        AxiosConfig.delete(`/product/delete/${id}`).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}