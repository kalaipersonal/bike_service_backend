import AxiosConfig from "../../config/Axiosconfig"



export function CreateWorker(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.post('/workers/create', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function Getallworkers(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.post('/workers/getall', data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function GetallworkersAdmin() {

    return new Promise((resolve, reject) => {
        AxiosConfig.get('/workers/getallworkers').then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function Getsingleworkers(data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.get(`/workers/getsingledata/${data}`).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}


export function GetsingleworkersUpdate(id,data) {

    return new Promise((resolve, reject) => {
        AxiosConfig.put(`/workers/update/${id}`,data).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}
export function Deleteworkers(id) {

    return new Promise((resolve, reject) => {
        AxiosConfig.delete(`/workers/delete/${id}`).then((res) => {
            return resolve(res?.data);
        }).catch((err) => {
            reject(err);
        })
    })
}